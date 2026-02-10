import { Button } from '@/common/components'
import { useCreatePlaylistMutation } from '@/features/playlists/api/playlistsApi.ts'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './CreatePlaylistForm.module.css'
import type { CreatePlaylistFormValues } from '@/features/playlists/api/playlistsApi.types.ts'
import { createPlaylistFormSchema } from '@/features/playlists/model/playlists.schemas.ts'

export const CreatePlaylistForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePlaylistFormValues>({
    resolver: zodResolver(createPlaylistFormSchema),
    defaultValues: {
      data: {
        attributes: {
          title: '',
          description: '',
        },
      },
    },
  })

  const [createPlaylist] = useCreatePlaylistMutation()
  const titleError = errors.data?.attributes?.title?.message
  const descriptionError = errors.data?.attributes?.description?.message

  const onSubmit: SubmitHandler<CreatePlaylistFormValues> = (formData) => {
    createPlaylist({ data: { type: 'playlists', attributes: formData.data.attributes } }).then(() => {
      reset()
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new playlist</h2>
      <div>
        <input {...register('data.attributes.title')} placeholder={'title'} />
        {titleError && <span className={s.error}>{titleError}</span>}
      </div>
      <div>
        <input {...register('data.attributes.description')} placeholder={'description'} />
        {descriptionError && <span className={s.error}>{descriptionError}</span>}
      </div>
      <Button>create playlist</Button>
    </form>
  )
}
