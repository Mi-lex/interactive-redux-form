import { PaperJoinerName, PostPrintActionName } from './types/order'

export const status = { UNPROCESSABLE_ENTITY: 422, UNAUTHORIZED: 401 }

export const paperJoinersNames: PaperJoinerName[] = [
	'paper_clip',
	'termo',
	'spring',
	'packet',
	'glue_bonding',
	'binding',
	'paper_file',
	'special',
]

export const postPrintActionNames: PostPrintActionName[] = [
	'creasing',
	'book_folding',
	'lamination',
	'revarnishing',
	'embossing',
	'stamp_cut',
	'perforation',
	'hot_stamp',
]

export const printOptions = [
	{
		name: 'Без печати',
		value: 'none',
	},
	{
		name: 'офсет',
		value: 'ofs',
	},
	{
		name: 'цифровая',
		value: 'digit',
	},
	{
		name: 'уф-принтер',
		value: 'ultr',
	},
	{
		name: 'плоттер',
		value: 'plot',
	},
]

export const paymentOrgOptions = [
	{
		value: 'et',
		name: 'эталон',
	},
	{
		value: 'st',
		name: 'стандарт',
	},
	{
		value: 'pr',
		name: 'прессцентр',
	},
]

export const packageOptions = [
	{
		value: 'box',
		name: 'коробка',
	},
	{
		value: 'pac',
		name: 'пачка',
	},
]

export const paperClipTypeOptions = [
	{
		value: 'file',
		name: 'файловая',
	},
	{
		value: 'oval',
		name: 'овальная',
	},
]

export const positionOptions = [
	{
		value: 'left',
		name: 'слева',
	},
	{
		value: 'top',
		name: 'сверху',
	},
]
export const laminationOptions = [
	{
		value: 'glos',
		name: 'глянцевый',
	},
	{
		value: 'matt',
		name: 'матовый',
	},
	{
		value: 'soft',
		name: 'софт-тач',
	},
]

export const bookfoldingOptions = [
	{
		value: 'eu',
		name: 'евро',
	},
	{
		value: 'gar',
		name: 'гармошка',
	},
	{
		value: 'win',
		name: 'оконная',
	},
]

export const varnishOptions = [
	{
		value: 'glos',
		name: 'глянцевый',
	},
	{
		value: 'matt',
		name: 'матовый',
	},
	{
		value: 'soft',
		name: 'софт-тач',
	},
]

export const foilOptions = [
	{
		value: 'gls',
		name: 'глянцевая',
	},
	{
		value: 'mat',
		name: 'матовая',
	},
	{
		value: 'hol',
		name: 'голографическая',
	},
]
