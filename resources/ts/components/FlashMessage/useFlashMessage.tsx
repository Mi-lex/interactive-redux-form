import React from 'react'

import FlashMessageContext from './FlashMessageContext'

export default function useFlashMessage() {
    return React.useContext(FlashMessageContext)
}
