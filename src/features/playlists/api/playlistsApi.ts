import type { CreatePlaylistArgs, Playlist, PlaylistsResponse } from '@/features/playlists/api/playlistsApi.types.ts'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
  }),
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => {
        return {
          method: 'get',
          url: `playlists`,
        }
      },
    }),
    createPlaylist: build.mutation<{ data: Playlist }, CreatePlaylistArgs>({
      query: (body) => ({
        url: 'playlists',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useFetchPlaylistsQuery, useCreatePlaylistMutation } = playlistsApi
