import type { RootState } from '@/app/model/store.ts'
import { useSelector } from 'react-redux'

export const useGlobalLoading = () => {
  return useSelector((state: RootState) => {
    // Get all active requests from RTK Query API
    const queries = Object.values(state.baseApi.queries || {})
    const mutations = Object.values(state.baseApi.mutations || {})

    // Check if there are any active requests (status 'pending')
    const hasActiveQueries = queries.some((query) => query?.status === 'pending')
    const hasActiveMutations = mutations.some((mutation) => mutation?.status === 'pending')

    return hasActiveQueries || hasActiveMutations
  })
}
