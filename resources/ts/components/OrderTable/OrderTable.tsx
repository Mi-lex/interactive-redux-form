import React from 'react'
import TablePagination from '@material-ui/core/TablePagination'
import MaterialTable, { MTableToolbar } from 'material-table'
import Paper, { PaperProps } from '@material-ui/core/Paper'
import tableIcons from './tableIcons'
import { Data } from './data'
import ruLocale from 'date-fns/locale/ru'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import LinearProgress from '@material-ui/core/LinearProgress'

type Props = {
    data: Data
    pending: boolean
}

type TableState = {
    paging: boolean
}

class OrderTable extends React.Component<Props, TableState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            paging: true,
        }
    }

    showAll = () => {
        this.setState({
            paging: false,
        })
    }

    render() {
        return (
            <MaterialTable
                components={{
                    Container: (props: PaperProps) => <Paper {...props} elevation={0} />,
                    Toolbar: props => (
                        <>
                            <PageHeader>
                                <MTableToolbar {...props} />
                            </PageHeader>
                            {this.props.pending && <LinearProgress color="secondary" />}
                        </>
                    ),
                    Pagination: props => (
                        <TablePagination
                            {...props}
                            rowsPerPageOptions={[
                                ...props.rowsPerPageOptions,
                                { value: this.props.data.length ? this.props.data.length : -1, label: 'все' },
                            ]}
                            onChangeRowsPerPage={event => {
                                if (Number(event.target.value) === -1) {
                                    this.showAll()
                                } else {
                                    props.onChangeRowsPerPage(event)
                                }
                            }}
                        />
                    ),
                }}
                icons={tableIcons}
                title="Таблица заказов"
                columns={[
                    {
                        title: 'Номер',
                        field: 'id',
                        type: 'numeric',
                        cellStyle: {
                            width: '20px',
                            maxWidth: 20,
                        },
                        headerStyle: {
                            maxWidth: 20,
                        },
                        render: rowData => <Link to={`passport/${rowData.id}`}>{rowData.id}</Link>,
                    },
                    {
                        title: 'Название',
                        field: 'name',
                        cellStyle: {
                            whiteSpace: 'nowrap',
                        },
                    },
                    { title: 'Тип', field: 'type' },
                    { title: 'Менеджер', field: 'managerSecondName' },
                    { title: 'Клиент', field: 'customerName' },
                    { title: 'Организация', field: 'paymentOrgType' },
                    {
                        title: 'Оформлен',
                        field: 'createdAt',
                        type: 'date',
                        cellStyle: {
                            width: '30px',
                            maxWidth: 30,
                        },
                        headerStyle: {
                            maxWidth: 30,
                        },
                    },
                    {
                        title: 'Завершен',
                        field: 'completionDate',
                        type: 'date',
                        cellStyle: {
                            width: '30px',
                            maxWidth: 30,
                        },
                        headerStyle: {
                            maxWidth: 30,
                        },
                    },
                ]}
                data={this.props.data}
                options={{
                    headerStyle: {
                        borderBottom: 'none',
                        color: '#caccce',
                    },
                    filtering: true,
                    paging: this.state.paging,
                    pageSize: 30,
                    pageSizeOptions: [30, 60, 120],
                    searchFieldStyle: {
                        color: 'white',
                    },
                }}
                localization={{
                    body: {
                        dateTimePickerLocalization: ruLocale,
                        emptyDataSourceMessage: 'Нет записей для отображения',
                        addTooltip: '',
                        deleteTooltip: '',
                        editTooltip: '',
                        filterRow: {
                            filterTooltip: 'Фильтровать',
                        },
                    },
                    pagination: {
                        labelDisplayedRows: ` {from}-{to} из {count}`,
                        labelRowsSelect: 'строк',
                        labelRowsPerPage: 'Строк на странице',
                        firstAriaLabel: 'Первая страница',
                        firstTooltip: 'Первая страница',
                        previousAriaLabel: 'Предыдущая страница',
                        previousTooltip: 'Предыдущая страница',
                        nextAriaLabel: 'Следующая страница',
                        nextTooltip: 'Следующая страница',
                        lastAriaLabel: 'Последняя страница',
                        lastTooltip: 'Последняя страница',
                    },
                    toolbar: {
                        searchTooltip: 'Поиск',
                        searchPlaceholder: 'Поиск',
                    },
                }}
            />
        )
    }
}

export default OrderTable
