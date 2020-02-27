import { PaperJoiners, PostPrintActions } from './enums'
import icons from '../assets/icons'

export type IconName = keyof typeof icons

export type ElementSize = 'sm' | 'md' | 'big'

interface Option {
    label: string
    value: string
}

type Options = Option[]

export type InputOptions = {
    [key: string]: Options
}

export type PaperJoinerName = keyof typeof PaperJoiners
export type PostPrintActionName = keyof typeof PostPrintActions
