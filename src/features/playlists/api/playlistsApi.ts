import type { CreatePlaylistArgs, Playlist, PlaylistsResponse } from '@/features/playlists/api/playlistsApi.types.ts'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
      return headers
    },
  }),
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => ({
        method: 'get',
        url: `playlists`,
      }),
    }),
    createPlaylist: build.mutation<{ data: Playlist }, CreatePlaylistArgs>({
      query: (body) => ({
        url: 'playlists',
        method: 'post',
        body,
      }),
    }),
    deletePlaylist: build.mutation<void, string>({
      query: (playlistId) => ({
        url: `playlists/${playlistId}`,
        method: 'delete',
      }),
    }),
  }),
})

export const { useFetchPlaylistsQuery, useCreatePlaylistMutation, useDeletePlaylistMutation } = playlistsApi
