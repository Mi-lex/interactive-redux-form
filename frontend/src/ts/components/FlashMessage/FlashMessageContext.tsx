import { createContext } from 'react'

import { MessageOptions } from './types'

export interface FlashMessageProviderValue {
	show: (options: MessageOptions) => void
}

const FlashMessageContext: React.Context<FlashMessageProviderValue> = createContext(
	{} as FlashMessageProviderValue,
)
export default FlashMessageContext
