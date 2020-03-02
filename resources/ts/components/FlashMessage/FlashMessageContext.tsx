import { createContext } from 'react'

export interface FlashMessageProviderValue {
    /**
     * Display a message with this FlashMessage.
     * @param {string} message message to display
     * @param {string} [action] label for the action button
     * @param {function} [handleAction] click handler for the action button
     */
    showMessage: (message: string, action?: string, handleAction?: () => void) => void
}

const FlashMessageContext: React.Context<FlashMessageProviderValue> = createContext(null)
export default FlashMessageContext
