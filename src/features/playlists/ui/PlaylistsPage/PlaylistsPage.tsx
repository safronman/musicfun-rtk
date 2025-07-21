import { Pagination } from '@/common/components'
import { useDebounceValue } from '@/common/hooks'
import { toast } from 'react-toastify'
import { PlaylistsList } from './PlaylistsList/PlaylistsList.tsx'
import { type ChangeEvent, useEffect, useState } from 'react'
import { useFetchPlaylistsQuery } from '../../api/playlistsApi.ts'
import { CreatePlaylistForm } from './CreatePlaylistForm/CreatePlaylistForm.tsx'
import s from './PlaylistsPage.module.css'

export const PlaylistsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)

  const [search, setSearch] = useState('')
  const debounceSearch = useDebounceValue(search)

  const { data, isLoading, error } = useFetchPlaylistsQuery({
    search: debounceSearch,
    pageNumber: currentPage,
    pageSize,
  })

  useEffect(() => {
    if (!error) return
    if ('status' in error) {
      // FetchBaseQueryError
      const errMsg = 'error' in error ? error.error : (error.data as { error: string }).error
      toast(errMsg, { type: 'error', theme: 'colored' })
    } else {
      // SerializedError
      toast(error.message || 'Some error occurred', { type: 'error', theme: 'colored' })
    }
  }, [error])

  const changePageSizeHandler = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
    setCurrentPage(1)
  }

  if (isLoading) return <h1>Skeleton loader...</h1>

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input type="search" placeholder={'Search playlist by title'} onChange={searchPlaylistHandler} />
      <PlaylistsList playlists={data?.data || []} isPlaylistsLoading={isLoading} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={changePageSizeHandler}
      />
    </div>
  )
}
