import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ShadcnPagination,
} from '@/common/components'
import { useDebounceValue } from '@/common/hooks'
import { getPaginationPages } from '@/common/utils'
import { type ChangeEvent, useState } from 'react'
import { useFetchPlaylistsQuery } from '../../api/playlistsApi.ts'
import { PlaylistsList } from './PlaylistsList/PlaylistsList.tsx'
import s from './PlaylistsPage.module.css'

export const PlaylistsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)

  const [search, setSearch] = useState('')
  const debounceSearch = useDebounceValue(search)

  const { data, isLoading } = useFetchPlaylistsQuery({ search: debounceSearch, pageNumber: currentPage, pageSize })
  const pagesCount = data?.meta.pagesCount || 1
  const pages = getPaginationPages(currentPage, pagesCount)

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
      {pagesCount > 1 && (
        <ShadcnPagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
              />
            </PaginationItem>
            {pages.map((page, idx) => (
              <PaginationItem key={page === '...' ? `ellipsis-${idx}` : page}>
                {page === '...' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault()
                      if (page !== currentPage) setCurrentPage(Number(page))
                    }}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                className={currentPage === pagesCount ? 'pointer-events-none opacity-50' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < pagesCount) setCurrentPage(currentPage + 1)
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </ShadcnPagination>
      )}
      <div className={'flex items-center gap-2'}>
        <span>Show</span>
        <Select value={String(pageSize)} onValueChange={(value) => changePageSizeHandler(Number(value))}>
          <SelectTrigger className={'w-[80px]'}>
            <SelectValue placeholder={'Page size'} />
          </SelectTrigger>
          <SelectContent>
            {[2, 4, 8, 16, 32].map((size) => (
              <SelectItem value={String(size)} key={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>per page</span>
      </div>
    </div>
  )
}
