import { useCreatePlaylistMutation } from '@/features/playlists/api/playlistsApi.ts'
import type { CreatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types.ts'
import { createPlaylistSchema } from '@/features/playlists/model/playlists.schemas.ts'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './CreatePlaylistForm.module.css'

export const CreatePlaylistForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePlaylistArgs>({
    resolver: zodResolver(createPlaylistSchema),
    defaultValues: {
      data: {
        type: 'playlists',
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

  const onSubmit: SubmitHandler<CreatePlaylistArgs> = (data) => {
    createPlaylist(data).then(() => {
      reset()
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new playlist</h2>
      <input type="hidden" {...register('data.type')} />
      <div>
        <input {...register('data.attributes.title')} placeholder={'title'} />
        {titleError && <span className={s.error}>{titleError}</span>}
      </div>
      <div>
        <input {...register('data.attributes.description')} placeholder={'description'} />
        {descriptionError && <span className={s.error}>{descriptionError}</span>}
      </div>
      <button>create playlist</button>
    </form>
  )
}
