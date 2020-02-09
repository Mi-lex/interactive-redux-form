import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import OrderTableHeader from './components/OrderTableHeader';
import OrderTableToolbar from './components/OrderTableToolbar';
import useStyles from './theme';
import { Data, Order } from './types';

function createData(
    id: number,
    orderName: string,
    manager: string,
    client: string,
    organization: string,
    type: string,
    date: string,
): Data {
    return { id, orderName, manager, client, organization, type, date };
}

const rows = [
    createData(1, 'Нихао Москва Пекин', 'Иванов Иван Иванович', 'Эффект', 'ПрессЦентр', 'Меню', '02.07.19'),
    createData(2, 'Котята', 'Пупкин Иван Иванович', 'Закат', 'Виомедиа', 'Календарь', '05.07.19'),
    createData(3, 'Черные занавески', 'Пакеткина Анна Витальевна', 'Русал', 'Озеро', 'Банер', '06.07.19'),
    createData(4, 'Белые ночи', 'Никулин Денис Алексеевич', 'Ускорение', 'Новатэк', 'Визитка', '09.07.19'),
    createData(5, 'Осторожно злая собака', 'Кузько Алексей Петрович', 'Служба', 'Евраз', 'Табличка', '10.07.19'),
    createData(6, 'Американский психопат', 'Гречкина Екатерина Викторовна', 'Тайна', 'Магнит', 'Визитка', '02.08.19'),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

export default function OrderTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <OrderTableToolbar />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="orders table"
                    >
                        <OrderTableHeader
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(row => {
                                    return (
                                        <TableRow hover tabIndex={-1} key={row.id}>
                                            <TableCell align="left" component="th" scope="row">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left">{row.orderName}</TableCell>
                                            <TableCell align="left">{row.manager}</TableCell>
                                            <TableCell align="left">{row.client}</TableCell>
                                            <TableCell align="left">{row.organization}</TableCell>
                                            <TableCell align="left">{row.type}</TableCell>
                                            <TableCell align="right">{row.date}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Убрать отступы"
            />
        </div>
    );
}
