import { useCallback, useEffect, useRef } from 'react'
import { useFetchTracksInfiniteQuery } from '../../api/tracksApi.ts'
import s from './TracksPage.module.css'

export const TracksPage = () => {
  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useFetchTracksInfiniteQuery()

  // Creates a reference to the DOM element that will be the "trigger" for auto-loading
  const observerRef = useRef<HTMLDivElement>(null)

  const pages = data?.pages.flatMap((page) => page.data) || []

  const loadMoreHandler = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetching, fetchNextPage])

  useEffect(() => {
    // IntersectionObserver monitors elements and reports how visible they are in the viewport
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    const observer = new IntersectionObserver(
      (entries) => {
        // entries - observed element
        if (entries.length > 0 && entries[0].isIntersecting) {
          loadMoreHandler()
        }
      },
      {
        root: null, // Tracking relative to the browser window (viewport). null = entire screen
        rootMargin: '100px', // Start loading 100px before the element appears
        threshold: 0.1, // Trigger when 10% of the element becomes visible
      },
    )

    const currentObserverRef = observerRef.current
    if (currentObserverRef) {
      // starts observing the element
      observer.observe(currentObserverRef)
    }

    // Cleanup function - stops observing when component unmounts
    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef)
      }
    }
  }, [loadMoreHandler])

  return (
    <div>
      <h1>Tracks page</h1>
      <div className={s.list}>
        {pages.map((track) => {
          const { title, user, attachments } = track.attributes

          return (
            <div key={track.id} className={s.item}>
              <div>
                <p>Title: {title}</p>
                <p>Name: {user.name}</p>
              </div>
              {attachments.length ? <audio controls src={attachments[0].url} /> : 'no file'}
            </div>
          )
        })}
      </div>

      {hasNextPage && (
        // This element is observed by IntersectionObserver
        <div ref={observerRef}>
          {/*<div style={{ height: '20px' }} />` creates an "invisible zone" of 20px at the end of the list,*/}
          {/*when reached, new tracks are automatically loaded. Without dimensions,*/}
          {/*IntersectionObserver wouldn't work correctly.*/}
          {isFetchingNextPage ? <div>Loading more tracks...</div> : <div style={{ height: '20px' }} />}
        </div>
      )}

      {!hasNextPage && pages.length > 0 && <p>Nothing more to load</p>}
    </div>
  )
}
