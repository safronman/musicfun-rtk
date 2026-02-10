import { Button } from '@/common/components'
import { useUpdatePlaylistMutation } from '@/features/playlists/api/playlistsApi.ts'
import type { UpdatePlaylistFormValues } from '@/features/playlists/api/playlistsApi.types.ts'
import { type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister } from 'react-hook-form'

type Props = {
  playlistId: string
  register: UseFormRegister<UpdatePlaylistFormValues>
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistFormValues>
  editPlaylist: (playlist: null) => void
  setPlaylistId: (playlistId: null) => void
}

export const EditPlaylistForm = ({ playlistId, handleSubmit, register, editPlaylist, setPlaylistId }: Props) => {
  const [updatePlaylist] = useUpdatePlaylistMutation()

  const onSubmit: SubmitHandler<UpdatePlaylistFormValues> = (data) => {
    if (!playlistId) return
    updatePlaylist({ playlistId, body: { data: { type: 'playlists', attributes: data } } })
    setPlaylistId(null)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'} />
      </div>
      <div>
        <input {...register('description')} placeholder={'description'} />
      </div>
      <Button type={'submit'}>save</Button>
      <Button type={'button'} onClick={() => editPlaylist(null)}>
        cancel
      </Button>
    </form>
  )
}
