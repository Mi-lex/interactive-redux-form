export type Order = 'asc' | 'desc';

export interface Data {
    id: number;
    orderName: string;
    manager: string;
    client: string;
    organization: string;
    type: string;
    date: string;
}
