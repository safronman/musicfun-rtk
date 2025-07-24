import { currentUserReactionSchema, imagesSchema, tagSchema, userSchema } from '@/common/schemas'
import * as z from 'zod/mini'

export const createPlaylistSchema = z.object({
  title: z
    .string()
    .check(z.minLength(1, 'The title length must be more than 1 character'))
    .check(z.maxLength(100, 'The title length must be less than 100 characters')),
  description: z.string().check(z.maxLength(1000, 'The description length must be less than 1000 characters.')),
})

export const playlistMetaSchema = z.object({
  page: z.int().check(z.positive()),
  pageSize: z.int().check(z.positive()),
  totalCount: z.int().check(z.positive()),
  pagesCount: z.int().check(z.positive()),
})

export const playlistAttributesSchema = z.object({
  title: z.string(),
  description: z.string(),
  addedAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  order: z.int(),
  dislikesCount: z.int().check(z.nonnegative()),
  likesCount: z.int().check(z.nonnegative()),
  tags: z.array(tagSchema),
  images: imagesSchema,
  user: userSchema,
  currentUserReaction: currentUserReactionSchema,
})

export const playlistDataSchema = z.object({
  id: z.string(),
  type: z.literal('playlists'),
  attributes: playlistAttributesSchema,
})

export const playlistsResponseSchema = z.object({
  data: z.array(playlistDataSchema),
  meta: playlistMetaSchema,
})
