export type PlaylistsResponse = {
  data: Playlist[]
  meta: Meta
}

export type Playlist = {
  id: string
  type: 'playlists'
  attributes: PlaylistAttributes
}

export type PlaylistAttributes = {
  title: string
  description: string
  addedAt: string
  updatedAt: string
  order: number
  tags: Tag[]
  images: Images
  user: User
  currentUserReaction: CurrentUserReaction
  dislikesCount: number
  likesCount: number
}

export type Tag = {
  id: string
  name: string
}

export type Images = {
  main: Cover[]
}

export type Cover = {
  type: 'original' | 'medium' | 'thumbnail'
  width: number
  height: number
  fileSize: number
  url: string
}

export type User = {
  id: string
  name: string
}

export type Meta = {
  page: number
  pageSize: number
  totalCount: number
  pagesCount: number
}

export const CurrentUserReaction = {
  Like: 1,
  Dislike: -1,
  None: 0,
} as const

export type CurrentUserReaction = (typeof CurrentUserReaction)[keyof typeof CurrentUserReaction]
