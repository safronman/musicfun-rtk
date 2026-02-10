import type { PlaylistAttributes } from '../../../../api/playlistsApi.types.ts'
import s from './PlaylistDescription.module.css'

type Props = {
  attributes: PlaylistAttributes
}

export const PlaylistDescription = ({ attributes }: Props) => {
  return (
    <div className={s.description}>
      <div>title: {attributes.title}</div>
      <div>description: {attributes.description ?? ''}</div>
      <div>userName: {attributes.user.name}</div>
    </div>
  )
}
