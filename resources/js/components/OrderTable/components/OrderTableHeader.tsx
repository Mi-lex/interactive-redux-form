import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Order, Data } from '../types';
import useStyles from '../theme';

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    align: string;
}

const headCells: HeadCell[] = [
    { id: 'id', align: 'left', disablePadding: false, label: 'Номер заказа' },
    { id: 'orderName', align: 'left', disablePadding: false, label: 'Название' },
    { id: 'manager', align: 'left', disablePadding: false, label: 'Менеджер' },
    { id: 'client', align: 'left', disablePadding: false, label: 'Клиент' },
    { id: 'organization', align: 'left', disablePadding: false, label: 'Организация' },
    { id: 'type', align: 'left', disablePadding: false, label: 'Тип заказа' },
    { id: 'date', align: 'right', disablePadding: false, label: 'Дата приема' },
];

interface Props {
    classes: ReturnType<typeof useStyles>;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export default function OrderTableHeader(props: Props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
