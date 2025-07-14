import { useUploadPlaylistCoverMutation } from '@/features/playlists/api/playlistsApi.ts'
import type { ChangeEvent } from 'react'
import type { Playlist } from '../../../api/playlistsApi.types.ts'
import defaultCover from '@/assets/images/default-playlist-cover.png'
import s from './PlaylistItem.module.css'

type Props = {
  playlist: Playlist
  deletePlaylist: (playlistId: string) => void
  editPlaylist: (playlist: Playlist) => void
}

export const PlaylistItem = ({ playlist, editPlaylist, deletePlaylist }: Props) => {
  const originalCover = playlist.attributes.images.main?.find((img) => img.type === 'original')
  const src = originalCover ? originalCover?.url : defaultCover

  const [uploadCover] = useUploadPlaylistCoverMutation()

  const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const maxSize = 5 * 1024 * 1024
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > maxSize) {
      alert(`Файл слишком большой (макс. ${Math.round(maxSize / 1024)} КБ)`)
      return
    }

    if (!allowedTypes.includes(file.type)) {
      alert('Разрешены только изображения JPEG, PNG или GIF')
      return
    }

    uploadCover({ playlistId: playlist.id, file })
  }

  return (
    <div>
      <img src={src} alt={'cover'} width={'100px'} className={s.cover} />
      <input type="file" accept="image/jpeg,image/png,image/gif" onChange={uploadCoverHandler} />
      <div>title: {playlist.attributes.title}</div>
      <div>description: {playlist.attributes.description}</div>
      <div>userName: {playlist.attributes.user.name}</div>
      <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
      <button onClick={() => editPlaylist(playlist)}>update</button>
    </div>
  )
}
