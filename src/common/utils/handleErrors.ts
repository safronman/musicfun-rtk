import { isErrorWithDetailArray } from '@/common/utils/isErrorWithDetailArray.ts'
import { isErrorWithProperty } from '@/common/utils/isErrorWithProperty.ts'
import { errorToast } from '@/common/utils/errorToast.ts'
import { trimToMaxLength } from '@/common/utils/trimToMaxLength.ts'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

export const handleErrors = (error: FetchBaseQueryError) => {
  if (error) {
    switch (error.status) {
      case 'FETCH_ERROR':
      case 'PARSING_ERROR':
      case 'CUSTOM_ERROR':
      case 'TIMEOUT_ERROR':
        errorToast(error.error)
        break

      case 400:
        if (isErrorWithDetailArray(error.data)) {
          const errorMessage = error.data.errors[0].detail
          if (errorMessage.includes('refreshToken')) return
          errorToast(trimToMaxLength(errorMessage))
        } else {
          errorToast(JSON.stringify(error.data))
        }
        break

      case 403:
        if (isErrorWithDetailArray(error.data)) {
          errorToast(trimToMaxLength(error.data.errors[0].detail))
        } else {
          errorToast(JSON.stringify(error.data))
        }
        break

      case 404:
        if (isErrorWithProperty(error.data, 'error')) {
          errorToast(error.data.error)
        } else {
          errorToast(JSON.stringify(error.data))
        }
        break

      case 429:
        if (isErrorWithProperty(error.data, 'message')) {
          errorToast(error.data.message)
        } else {
          errorToast(JSON.stringify(error.data))
        }
        break

      default:
        if (error.status >= 500 && error.status < 600) {
          errorToast('Server error occurred. Please try again later.', error)
        } else {
          errorToast('Some error occurred')
        }
    }
  }
}
