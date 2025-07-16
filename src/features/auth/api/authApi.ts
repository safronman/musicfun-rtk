import { baseApi } from '@/app/api/baseApi.ts'
import type { MeResponseResponse } from './authApi.types.ts'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<MeResponseResponse, void>({
      query: () => `auth/me`,
    }),
  }),
})

export const { useGetMeQuery } = authApi
