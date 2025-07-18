import type { RootState } from '@/app/model/store.ts'
import { playlistsApi } from '@/features/playlists/api/playlistsApi.ts'
import { useSelector } from 'react-redux'

// List of endpoints to exclude from the global indicator
const excludedEndpoints = [
  playlistsApi.endpoints.fetchPlaylists.name,
  // You can add other endpoints here if needed
]

export const useGlobalLoading = () => {
  return useSelector((state: RootState) => {
    // Get all active requests from RTK Query API
    const queries = Object.values(state.baseApi.queries || {})
    const mutations = Object.values(state.baseApi.mutations || {})

    // Check if there are any active requests (status 'pending')
    const hasActiveQueries = queries.some((query) => {
      return query?.status === 'pending' && !excludedEndpoints.includes(query.endpointName)
    })

    const hasActiveMutations = mutations.some((mutation) => {
      return mutation?.status === 'pending' && !excludedEndpoints.includes(mutation.endpointName)
    })

    return hasActiveQueries || hasActiveMutations
  })
}
