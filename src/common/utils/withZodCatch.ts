import { errorToast } from '@/common/utils/errorToast.ts'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { z, type ZodType } from 'zod'

export const withZodCatch = <T extends ZodType>(schema: T) => ({
  responseSchema: schema,
  catchSchemaFailure: (err: unknown): FetchBaseQueryError => {
    if (err instanceof z.ZodError) {
      errorToast('Zod error. Details in the console', err.issues)
    }
    return {
      status: 'CUSTOM_ERROR',
      error: 'Schema validation failed',
    }
  },
})
