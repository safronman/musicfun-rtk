import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi.ts'
import { CreatePlaylistForm } from '@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx'
import s from './PlaylistsPage.module.css'

export const PlaylistsPage = () => {
  const { data } = useFetchPlaylistsQuery()

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <div className={s.items}>
        {data?.data.map((tl) => {
          return (
            <div className={s.item}>
              <div>title: {tl.attributes.title}</div>
              <div>description: {tl.attributes.description}</div>
              <div>userName: {tl.attributes.user.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
