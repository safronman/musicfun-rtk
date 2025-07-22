import { baseApi } from '@/app/api/baseApi.ts'
import type { AuthTokensResponse, LoginArgs, MeResponseResponse } from './authApi.types.ts'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<MeResponseResponse, void>({
      query: () => `auth/me`,
    }),
    login: build.mutation<AuthTokensResponse, LoginArgs>({
      query: (payload) => ({
        url: `auth/login`,
        method: 'post',
        body: { ...payload, accessTokenTTL: '3m' },
      }),
    }),
  }),
})

export const { useGetMeQuery, useLoginMutation } = authApi

// login
// async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
//   try {
//     const { data } = await queryFulfilled
//     localStorage.setItem(localStorageKeys.refreshToken, data.refreshToken)
//     localStorage.setItem(localStorageKeys.accessToken, data.accessToken)
//     // Инвалидируем ПОСЛЕ сохранения токенов
//     dispatch(authApi.util.invalidateTags(['User']))
//   } catch {}
// },

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
