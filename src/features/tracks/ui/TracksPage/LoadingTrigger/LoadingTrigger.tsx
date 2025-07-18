import type { RefObject } from 'react'

type Props = {
  observerRef: RefObject<HTMLDivElement | null>
  isFetchingNextPage: boolean
}

export const LoadingTrigger = ({ observerRef, isFetchingNextPage }: Props) => {
  // This element is observed by IntersectionObserver
  return (
    <div ref={observerRef}>
      {/*<div style={{ height: '20px' }} />` creates an "invisible zone" of 20px at the end of the list,*/}
      {/*when reached, new tracks are automatically loaded. Without dimensions,*/}
      {/*IntersectionObserver wouldn't work correctly.*/}
      {isFetchingNextPage ? <div>Loading more tracks...</div> : <div style={{ height: '20px' }} />}
    </div>
  )
}
