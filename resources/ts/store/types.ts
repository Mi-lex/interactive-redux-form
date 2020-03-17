import { PaperJoiners, PostPrintActions } from './enums'
import { ForkEffect } from 'redux-saga/effects'
import icons from '../assets/icons'

export type IconName = keyof typeof icons

export type ElementSize = 'sm' | 'md' | 'big'

type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T
}

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
    organization: { name: string }
    date: string
}

interface Payment {
    payed_by_cash: string
    operation?: PaymentOperation
}

interface PaperClip {
    auto?: boolean
    manual?: boolean
    type?: string
    width?: number
    drift?: number
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

type PaperJoinerBody = PaperClip | Termo | Spring | Packet | GlueBonding | Special | {}

interface PaperJoiner {
    type: PaperJoinerName
    body: PaperJoinerBody & { id: number }
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
    address?: string
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

interface Revarnishing {
    varnish_type?: string
}

interface Embossing extends WithType {}

interface StampCut {
    name: string
}

// Причина в том , что у нас есть post action body в виде всяких ламинаций, лакировак , биговок и т.д
// Когда данные приходят с сервера, то этот body находится внутри свойства body
// В форме они хранятся в виде PostAction в перемешку

interface PostAction {
    type?: PostPrintActionName
    elements?: string
}

type PostActionBody = Creasing | BookFolding | Lamination | Revarnishing | Embossing | StampCut | {}

export type FormPostAction = PostAction &
    PostActionBody & {
        additional?: string[] | string
    }

export interface FetchedPostAction extends PostAction {
    body?: PostActionBody & { id: number }
    additional?: string
}

interface OrderElement {
    name?: string
    stripes?: number
    material?: string
    print_type?: string
    brightness?: string
    color_interpretation?: string
}

export interface Order {
    id?: number
    name?: string
    type?: string
    created_at?: string
    updated_at?: string
    important_info?: string
    completion_date?: string
    completion_time?: string

    // implementation details
    is_cut?: string
    circulation?: string
    is_similar_order?: boolean
    similar_order_id?: string
    manager?: Manager
    customer?: Customer
    payment?: Payment

    elements?: OrderElement[]

    package?: Package
    delivery?: Delivery
}

export interface FormOrder extends Order {
    paper_joiner?: PartialRecord<PaperJoinerName, PaperJoinerBody>
    post_actions?: PartialRecord<PostPrintActionName, FormPostAction>

    paper_joiner_checks?: PartialRecord<PaperJoinerName, boolean>
    post_actions_checks?: PartialRecord<PostPrintActionName, boolean>
}

export interface FetchedOrder extends Order {
    paper_joiner?: PaperJoiner
    post_actions?: FetchedPostAction[]
}

export type Action = {
    type: string
    payload?: any
}

export type SagaType = () => Generator<ForkEffect<never>, void, unknown>
