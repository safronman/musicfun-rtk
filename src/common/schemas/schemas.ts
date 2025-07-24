import * as z from 'zod/mini'
import { CurrentUserReaction } from '@/common/enums'

export const tagSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const coverSchema = z.object({
  type: z.literal(['original', 'medium', 'thumbnail']),
  width: z.int().check(z.positive()),
  height: z.int().check(z.positive()),
  fileSize: z.int().check(z.positive()),
  url: z.string(),
})

export const imagesSchema = z.object({
  main: z.array(coverSchema),
})

export const currentUserReactionSchema = z.enum(CurrentUserReaction)
