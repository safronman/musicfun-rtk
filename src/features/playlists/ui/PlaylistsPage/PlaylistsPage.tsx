import { useDebounceValue } from '@/common/hooks'
import { type ChangeEvent, useState } from 'react'
import { useFetchPlaylistsQuery } from '../../api/playlistsApi.ts'
import { PlaylistsList } from './PlaylistsList/PlaylistsList.tsx'
import { PlaylistsPagination } from './PlaylistsPagination/PlaylistsPagination.tsx'
import { PlaylistsPageSizeSelect } from './PlaylistsPageSizeSelect/PlaylistsPageSizeSelect.tsx'
import s from './PlaylistsPage.module.css'

export const PlaylistsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)

  const [search, setSearch] = useState('')
  const debounceSearch = useDebounceValue(search)

  const { data, isLoading } = useFetchPlaylistsQuery({ search: debounceSearch, pageNumber: currentPage, pageSize })
  const pagesCount = data?.meta.pagesCount || 1

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
      <input type="search" placeholder={'Search playlist by title'} onChange={searchPlaylistHandler} />
      <PlaylistsList playlists={data?.data || []} isPlaylistsLoading={isLoading} />
      <div className={s.controls}>
        <PlaylistsPagination currentPage={currentPage} pagesCount={pagesCount} setCurrentPage={setCurrentPage} />
        <PlaylistsPageSizeSelect pageSize={pageSize} changePageSize={changePageSizeHandler} />
      </div>
    </div>
  )
}
