export type Row = {
    name: string;
    id: number;
    type: string;
    managerSecondName: string;
    customerName: string;
    paymentOrgType: string;
    createdAt: string;
    completionDate: string;
};

export type Data = Row[];