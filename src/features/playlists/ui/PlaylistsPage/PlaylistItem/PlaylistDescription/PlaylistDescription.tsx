import type { PlaylistAttributes } from '../../../../api/playlistsApi.types.ts'

type Props = {
  attributes: PlaylistAttributes
}

export const PlaylistDescription = ({ attributes }: Props) => {
  return (
    <>
      <div>title: {attributes.title}</div>
      <div>description: {attributes.description}</div>
      <div>userName: {attributes.user.name}</div>
    </>
  )
}
