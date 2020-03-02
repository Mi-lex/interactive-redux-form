import { createContext } from 'react'
import { MessageOptions } from './FlashMessageProvider'

export interface FlashMessageProviderValue {
    show: (options: MessageOptions) => void
}

const FlashMessageContext: React.Context<FlashMessageProviderValue> = createContext(null)
export default FlashMessageContext
