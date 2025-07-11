import { useDeletePlaylistMutation, useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi.ts'
import { CreatePlaylistForm } from '@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx'
import s from './PlaylistsPage.module.css'

export const PlaylistsPage = () => {
  const { data } = useFetchPlaylistsQuery()
  const [deletePlaylist] = useDeletePlaylistMutation()

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Вы уверены, что хотите удалить плейлист?')) {
      deletePlaylist(playlistId)
    }
  }

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <div className={s.items}>
        {data?.data.map((playlist) => {
          return (
            <div className={s.item} key={playlist.id}>
              <div>title: {playlist.attributes.title}</div>
              <div>description: {playlist.attributes.description}</div>
              <div>userName: {playlist.attributes.user.name}</div>
              <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
