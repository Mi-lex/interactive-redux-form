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

interface User {
    id: string
    first_name: string
    second_name: string
    middle_name: string
    email: string
}

export interface Employee extends User {
    role: string
}

export interface Manager extends Employee {
    role: 'manager'
}

interface Contact extends User {
    phone?: string
}

interface Customer {
    name: string
    contact?: Contact
}

interface PaymentOperation {
    account_number: string
    organization: string
}

interface Payment {
    payed_by_cash: string
    date: string
    operation?: PaymentOperation
}

interface PaperClip {
    type?: string
    width?: string
    drift: string
}

interface Termo {
    spine_width: string
    flaps_cover: boolean
    flush_with_block: boolean
    braces: boolean
}

interface Spring {
    color: string
    position: string
    cover_block_difference: string
}

interface Packet {
    grommet_color: string
    hands_color: string
}

interface GlueBonding {
    type: string
    position: string
}

interface Special {
    description: string
}

interface PaperJoiner {
    type: PaperJoinerName
    body: PaperClip | Termo | Spring | Packet | GlueBonding | Special | {}
}

interface Package {
    capacity?: number
    type: string
    sample: boolean
    sort: boolean
    label: boolean
    paletting: boolean
    stretch_film: boolean
}

interface Delivery {
    should_be_delivered: boolean
    adress?: string
}

// Post print actions

interface WithType {
    type?: string
}

interface Creasing {
    parts?: string
}

interface BookFolding extends WithType {
    color?: string
}

interface Lamination extends WithType {}

interface Revanishing {
    varnish_type?: string
}

interface Embossing extends WithType {}

interface StampCut {
    name: string
}

interface PostAction {
    type: string
    body?: {}
    elements?: string
    additionals?: string
}

export interface Order {
    id?: number
    created_at: string
    updated_at: string
    important_info?: string
    completion_date?: string
    completion_time?: string

    // implementation details
    is_cut?: string
    circulation?: string
    similar_order_id?: string
    manager?: Manager
    customer?: Customer
    payment?: Payment

    paper_joiner: PaperJoiner
    package?: Package
    delivery?: Delivery
    post_action: PostAction[]
}

export type Action = {
    type: string
    payload?: any
}
