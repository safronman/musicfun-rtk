import { Button, Input } from '@/common/components'
import defaultCover from '@/assets/images/default-playlist-cover.png'
import type { Images } from '@/common/types'
import { errorToast } from '@/common/utils/errorToast.ts'
import {
  useDeletePlaylistCoverMutation,
  useUploadPlaylistCoverMutation,
} from '@/features/playlists/api/playlistsApi.ts'
import { type ChangeEvent, useRef, useState } from 'react'
import s from './PlaylistCover.module.css'

type Props = {
  playlistId: string
  images: Images
}

export const PlaylistCover = ({ images, playlistId }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFileName, setSelectedFileName] = useState('')
  const originalCover = images.main?.find((img) => img.type === 'original')
  const src = originalCover ? originalCover?.url : defaultCover

  const [uploadCover] = useUploadPlaylistCoverMutation()
  const [deleteCover] = useDeletePlaylistCoverMutation()

  const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const maxSize = 5 * 1024 * 1024
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

    const file = event.target.files?.[0]
    if (!file) return
    setSelectedFileName(file.name)

    if (file.size > maxSize) {
      errorToast(`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB.`)
    }

    if (!allowedTypes.includes(file.type)) {
      errorToast('Only JPEG, PNG or GIF images are allowed')
    }

    uploadCover({ playlistId, file })
  }

  const deleteCoverHandler = () => deleteCover({ playlistId })
  const openFileDialogHandler = () => fileInputRef.current?.click()

  return (
    <div className={s.coverBlock}>
      <img src={src} alt={'cover'} className={s.cover} />
      <div className={s.uploadRow}>
        <Button type={'button'} size={'sm'} variant={'outline'} onClick={openFileDialogHandler}>
          choose file
        </Button>
        <span className={s.fileName}>{selectedFileName || 'no file chosen'}</span>
      </div>
      <Input
        ref={fileInputRef}
        className={s.hiddenFileInput}
        type="file"
        accept="image/jpeg,image/png,image/gif"
        onChange={uploadCoverHandler}
      />
      {originalCover && (
        <Button size={'sm'} variant={'secondary'} onClick={() => deleteCoverHandler()}>
          delete cover
        </Button>
      )}
    </div>
  )
}
