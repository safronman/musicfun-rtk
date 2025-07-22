import { baseApi } from '@/app/api/baseApi.ts'
import { AUTH_KEYS } from '@/common/constants/constants.ts'
import type { AuthTokensResponse, LoginArgs, MeResponse } from './authApi.types.ts'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<MeResponse, void>({
      query: () => `auth/me`,
      providesTags: ['Auth'],
    }),
    login: build.mutation<AuthTokensResponse, LoginArgs>({
      query: (payload) => ({
        url: `auth/login`,
        method: 'post',
        body: { ...payload, accessTokenTTL: '3m' },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        localStorage.setItem(AUTH_KEYS.accessToken, data.accessToken)
        localStorage.setItem(AUTH_KEYS.refreshToken, data.refreshToken)
        // Invalidate after saving tokens
        dispatch(authApi.util.invalidateTags(['Auth']))
      },
    }),
  }),
})

export const { useGetMeQuery, useLoginMutation } = authApi

// logout: build.mutation<void, void>({
//   query: () => ({
//     url: `${authEndpoint}/logout`,
//     method: 'POST',
//     body: {
//       refreshToken: localStorage.getItem(localStorageKeys.refreshToken)!,
//     },
//   }),
//   async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
//     try {
//       await queryFulfilled
//       localStorage.removeItem(localStorageKeys.accessToken)
//       localStorage.removeItem(localStorageKeys.refreshToken)
//       await dispatch(authApi.util.resetApiState())
//     } catch {}
//   },
//   invalidatesTags: ['User'],
// }),
