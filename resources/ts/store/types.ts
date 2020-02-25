import icons from '../assets/icons'

export type IconName = keyof typeof icons

export type ElementSize = 'sm' | 'md' | 'big'

export enum PaperJoiners {
    paper_clip= 'Скрепка',
    termo = 'Термо',
    spring = 'Пружина',
    packet = 'Пакет',
    glue_bonding = 'Проклейка',
    binding = 'Переплет',
    file = 'Папка',
    special = 'Спец. обр.',
}

export type PaperJoinerName = keyof typeof PaperJoiners

interface Option {
    value: string
    label: string
}

type Options = Option[]

export type InputOptions = {
    [key: string]: Options
}

export enum PostPrintActions {
    lamitation = 'Ламинировать',
    revanishing = 'Лакировать',
    embossing = 'Тиснить фольгой',
    stampCut = 'Вырубить штампом',
    creasing = 'Биговать',
    bookFolding = 'Фальцевать',
    perforation = 'Перфорация',
    hotStamp = 'Конгрев',
}

export type PostPrintActionName = keyof typeof PostPrintActions
