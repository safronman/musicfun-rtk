import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  ShadcnPagination,
} from '@/common/components'
import { getPaginationPages } from '@/common/utils'

type Props = {
  currentPage: number
  pagesCount: number
  setCurrentPage: (page: number) => void
}

export const PlaylistsPagination = ({ currentPage, pagesCount, setCurrentPage }: Props) => {
  const pages = getPaginationPages(currentPage, pagesCount)

  if (pagesCount <= 1) return null

  return (
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
  )
}
