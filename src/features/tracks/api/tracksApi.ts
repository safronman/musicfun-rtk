import { baseApi } from '@/app/api/baseApi.ts'
import type { FetchTracksArgs, FetchTracksResponse } from './tracksApi.types.ts'

export const tracksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchTracks: build.infiniteQuery<FetchTracksResponse, FetchTracksArgs, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
          return lastPageParam + 1
        },
      },
      query: ({ queryArg }) => ({ url: 'playlists/tracks', params: queryArg }),
    }),
  }),
})

export const { useFetchTracksInfiniteQuery } = tracksApi
