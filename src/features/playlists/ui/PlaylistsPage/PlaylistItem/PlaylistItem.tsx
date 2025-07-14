import type { Playlist } from '../../../api/playlistsApi.types.ts'

type Props = {
  playlist: Playlist
  deletePlaylist: (playlistId: string) => void
  editPlaylist: (playlist: Playlist) => void
}

export const PlaylistItem = ({ playlist, editPlaylist, deletePlaylist }: Props) => {
  return (
    <div>
      <div>title: {playlist.attributes.title}</div>
      <div>description: {playlist.attributes.description}</div>
      <div>userName: {playlist.attributes.user.name}</div>
      <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
      <button onClick={() => editPlaylist(playlist)}>update</button>
    </div>
  )
}
