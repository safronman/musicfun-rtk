import { PlaylistDescription } from './PlaylistDescription/PlaylistDescription.tsx'
import { PlaylistCover } from './PlaylistCover/PlaylistCover.tsx'
import type { Playlist } from '../../../api/playlistsApi.types.ts'

type Props = {
  playlist: Playlist
  deletePlaylist: (playlistId: string) => void
  editPlaylist: (playlist: Playlist) => void
}

export const PlaylistItem = ({ playlist, editPlaylist, deletePlaylist }: Props) => {
  return (
    <div>
      <PlaylistCover playlistId={playlist.id} images={playlist.attributes.images} />
      <PlaylistDescription attributes={playlist.attributes} />
      <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
      <button onClick={() => editPlaylist(playlist)}>update</button>
    </div>
  )
}
