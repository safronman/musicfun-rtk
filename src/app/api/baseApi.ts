import { baseQueryWithReauth } from '@/app/api/baseQueryWithReauth.ts'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Playlist', 'Auth'],
  endpoints: () => ({}),
  baseQuery: baseQueryWithReauth,
})
