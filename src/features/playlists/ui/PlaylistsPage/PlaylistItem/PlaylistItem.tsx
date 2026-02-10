import { Button, Card, CardContent } from '@/common/components'
import { PlaylistDescription } from './PlaylistDescription/PlaylistDescription.tsx'
import { PlaylistCover } from './PlaylistCover/PlaylistCover.tsx'
import type { PlaylistData } from '../../../api/playlistsApi.types.ts'
import s from './PlaylistItem.module.css'

type Props = {
  playlist: PlaylistData
  deletePlaylist: (playlistId: string) => void
  editPlaylist: (playlist: PlaylistData) => void
}

export const PlaylistItem = ({ playlist, editPlaylist, deletePlaylist }: Props) => {
  return (
    <Card className={s.card}>
      <CardContent className={s.content}>
        <PlaylistCover playlistId={playlist.id} images={playlist.attributes.images} />
        <PlaylistDescription attributes={playlist.attributes} />
        <div className={s.actions}>
          <Button size={'sm'} onClick={() => deletePlaylist(playlist.id)}>
            delete
          </Button>
          <Button size={'sm'} onClick={() => editPlaylist(playlist)}>
            update
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
