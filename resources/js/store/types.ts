import icons from '../assets/icons';

export type IconName = keyof typeof icons;

export type ElementSize = 'sm' | 'md' | 'big';

export enum FixingPapersType {
    paperClip = 'Скрепка',
    termo = 'Термо',
    spring = 'Пружина',
    packet = 'Пакет',
    splice = 'Склейка',
    binding = 'Переплет',
    file = 'Папка',
}

export type FixingPapersTypeString = keyof typeof FixingPapersType;

interface Option {
    value: string;
    label: string;
}

type Options = Option[];

export type InputOptions = {
    [key: string]: Options;
};
