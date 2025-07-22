import { baseApi } from '@/app/api/baseApi.ts'
import { baseQuery } from '@/app/api/baseQuery.ts'
import { AUTH_KEYS } from '@/common/constants'
import { handleErrors, isTokens } from '@/common/utils'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

// Create a new mutex to manage concurrent refresh token requests
const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  // Wait for any ongoing refresh token operation to finish (if mutex is locked)
  await mutex.waitForUnlock()

  // Perform the original API request
  let result = await baseQuery(args, api, extraOptions)

  // If the request failed with a 401 Unauthorized error
  if (result.error && result.error.status === 401) {
    // Check if mutex is not already locked (i.e., no other refresh in progress)
    if (!mutex.isLocked()) {
      // Lock the mutex so only one refresh request is processed at a time
      const release = await mutex.acquire()
      try {
        const refreshToken = localStorage.getItem(AUTH_KEYS.refreshToken)

        const refreshResult = await baseQuery(
          { url: '/auth/refresh', method: 'post', body: { refreshToken } },
          api,
          extraOptions,
        )

        if (refreshResult.data && isTokens(refreshResult.data)) {
          localStorage.setItem(AUTH_KEYS.accessToken, refreshResult.data.accessToken)
          localStorage.setItem(AUTH_KEYS.refreshToken, refreshResult.data.refreshToken)
          // Retry the original request with the new access token
          result = await baseQuery(args, api, extraOptions)
        } else {
          // If refresh failed, trigger logout
          // @ts-expect-error
          api.dispatch(baseApi.endpoints.logout.initiate())
        }
      } finally {
        // Always release the mutex after refreshing is done
        release()
      }
    } else {
      // If a refresh is already in progress, wait for it to fini
      await mutex.waitForUnlock()
      // Retry the original request after tokens have been refreshed
      result = await baseQuery(args, api, extraOptions)
    }
  }

  // Handle all errors except 401 Unauthorized (which are handled above)
  if (result.error && result.error.status !== 401) {
    handleErrors(result.error)
  }

  return result
}
