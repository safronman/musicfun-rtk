import { Button } from '@/common/components'
import { PlaylistDescription } from './PlaylistDescription/PlaylistDescription.tsx'
import { PlaylistCover } from './PlaylistCover/PlaylistCover.tsx'
import type { PlaylistData } from '../../../api/playlistsApi.types.ts'

type Props = {
  playlist: PlaylistData
  deletePlaylist: (playlistId: string) => void
  editPlaylist: (playlist: PlaylistData) => void
}

export const PlaylistItem = ({ playlist, editPlaylist, deletePlaylist }: Props) => {
  return (
    <div>
      <PlaylistCover playlistId={playlist.id} images={playlist.attributes.images} />
      <PlaylistDescription attributes={playlist.attributes} />
      <Button onClick={() => deletePlaylist(playlist.id)}>delete</Button>
      <Button onClick={() => editPlaylist(playlist)}>update</Button>
    </div>
  )
}
