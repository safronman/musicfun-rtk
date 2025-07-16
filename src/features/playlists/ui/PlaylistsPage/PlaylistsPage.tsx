import { Pagination } from '@/common/components'
import { useDebounceValue } from '@/common/hooks'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { Playlist, UpdatePlaylistArgs } from '../../api/playlistsApi.types.ts'
import { EditPlaylistForm } from './EditPlaylistForm/EditPlaylistForm.tsx'
import { PlaylistItem } from './PlaylistItem/PlaylistItem.tsx'
import { useDeletePlaylistMutation, useFetchPlaylistsQuery } from '../../api/playlistsApi.ts'
import { CreatePlaylistForm } from './CreatePlaylistForm/CreatePlaylistForm.tsx'
import s from './PlaylistsPage.module.css'

export const PlaylistsPage = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)

  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()

  const [search, setSearch] = useState('')
  const debounceSearch = useDebounceValue(search)

  const { data, isLoading } = useFetchPlaylistsQuery({ search: debounceSearch, pageNumber: currentPage, pageSize })

  const [deletePlaylist] = useDeletePlaylistMutation()

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure you want to delete the playlist?')) {
      deletePlaylist(playlistId)
    }
  }

  const editPlaylistHandler = (playlist: Playlist | null) => {
    if (playlist) {
      setPlaylistId(playlist.id)
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map((t) => t.id),
      })
    } else {
      setPlaylistId(null)
    }
  }

  const changePageSize = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input
        type="search"
        placeholder={'Search playlist by title'}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <div className={s.items}>
        {!data?.data.length && !isLoading && <h2>Playlists not found</h2>}
        {data?.data.map((playlist) => {
          const isEditing = playlistId === playlist.id

          return (
            <div className={s.item} key={playlist.id}>
              {isEditing ? (
                <EditPlaylistForm
                  playlistId={playlistId}
                  handleSubmit={handleSubmit}
                  register={register}
                  editPlaylist={editPlaylistHandler}
                  setPlaylistId={setPlaylistId}
                />
              ) : (
                <PlaylistItem
                  playlist={playlist}
                  deletePlaylist={deletePlaylistHandler}
                  editPlaylist={editPlaylistHandler}
                />
              )}
            </div>
          )
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={changePageSize}
      />
    </div>
  )
}
