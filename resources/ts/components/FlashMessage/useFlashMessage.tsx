import React from 'react'

import SnackbarContext from './FlashMessageContext'

export default function useSnackbar() {
    return React.useContext(SnackbarContext)
}
