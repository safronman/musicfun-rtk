import { useDeletePlaylistMutation } from '@/features/playlists/api/playlistsApi.ts'
import type { Playlist, UpdatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types.ts'
import { EditPlaylistForm } from '@/features/playlists/ui/PlaylistsPage/EditPlaylistForm/EditPlaylistForm.tsx'
import { PlaylistItem } from '@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import s from './PlaylistsList.module.css'

type Props = {
  playlists: Playlist[]
  isPlaylistsLoading: boolean
}

export const PlaylistsList = ({ playlists, isPlaylistsLoading }: Props) => {
  const [playlistId, setPlaylistId] = useState<string | null>(null)

  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()

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

  return (
    <div className={s.items}>
      {!playlists.length && !isPlaylistsLoading && <h2>Playlists not found</h2>}
      {playlists.map((playlist) => {
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
  )
}
