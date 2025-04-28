import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'

export const getRtkApiMessage = (error: FetchBaseQueryError | SerializedError) => {
  let err = 'Unexpected error'

  if ('data' in error) {
    if(error.data && typeof error.data === 'object' && 'message' in error.data ) {
      err = error.data.message as string
    } else {
      err = `${error.data}`
    }
  } else if ('status' in error) {
    err = `Network error or HTTP error: ${error.status}`
  } else if ('message' in error) {
    // if SerializedError
    if (error.message) {
      err = error.message
    }
  } else {
    err = `Unexpected error type: ${error}`
  }

  return err
}