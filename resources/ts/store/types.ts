import icons from '../assets/icons';

export type IconName = keyof typeof icons;

export type ElementSize = 'sm' | 'md' | 'big';

export enum PaperJoiners {
    paperClip = 'Скрепка',
    termo = 'Термо',
    spring = 'Пружина',
    packet = 'Пакет',
    splice = 'Склейка',
    binding = 'Переплет',
    file = 'Папка',
    special = 'Спец. обр.'
}

export type PaperJoinerName = keyof typeof PaperJoiners;

interface Option {
    value: string;
    label: string;
}

type Options = Option[];

export type InputOptions = {
    [key: string]: Options;
};
