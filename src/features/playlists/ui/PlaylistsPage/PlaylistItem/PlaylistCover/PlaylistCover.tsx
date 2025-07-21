import defaultCover from '@/assets/images/default-playlist-cover.png'
import type { Images } from '@/common/types'
import { errorToast } from '@/common/utils/errorToast.ts'
import {
  useDeletePlaylistCoverMutation,
  useUploadPlaylistCoverMutation,
} from '@/features/playlists/api/playlistsApi.ts'
import type { ChangeEvent } from 'react'
import s from './PlaylistCover.module.css'

type Props = {
  playlistId: string
  images: Images
}

export const PlaylistCover = ({ images, playlistId }: Props) => {
  const originalCover = images.main?.find((img) => img.type === 'original')
  const src = originalCover ? originalCover?.url : defaultCover

  const [uploadCover] = useUploadPlaylistCoverMutation()
  const [deleteCover] = useDeletePlaylistCoverMutation()

  const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const maxSize = 5 * 1024 * 1024
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > maxSize) {
      errorToast(`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB.`)
    }

    if (!allowedTypes.includes(file.type)) {
      errorToast('Only JPEG, PNG or GIF images are allowed')
    }

    uploadCover({ playlistId, file })
  }

  const deleteCoverHandler = () => deleteCover({ playlistId })

  return (
    <div>
      <img src={src} alt={'cover'} width={'100px'} className={s.cover} />
      <input type="file" accept="image/jpeg,image/png,image/gif" onChange={uploadCoverHandler} />
      {originalCover && <button onClick={() => deleteCoverHandler()}>delete cover</button>}
    </div>
  )
}
