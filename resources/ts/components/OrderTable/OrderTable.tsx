import React from 'react'
import MaterialTable from 'material-table'
import tableIcons from './tableIcons'
import { data } from './data'
import ruLocale from 'date-fns/locale/ru'

class OrderTable extends React.Component {
    render() {
        return (
            <MaterialTable
                icons={tableIcons}
                title="Таблица заказов"
                columns={[
                    {
                        title: 'Номер',
                        field: 'id',
                        type: 'numeric',
                        cellStyle: {
                            width: '20px !important',
                            maxWidth: 20,
                        },
                        headerStyle: {
                            width: '20px !important',
                            maxWidth: 20,
                        },
                    },
                    {
                        title: 'Название',
                        field: 'name',
                        cellStyle: {
                            whiteSpace: 'nowrap',
                        },
                    },
                    { title: 'Тип', field: 'type' },
                    { title: 'Менеджер', field: 'manager' },
                    { title: 'Клиент', field: 'client' },
                    { title: 'Организация', field: 'organization' },
                    {
                        title: 'Оформлен',
                        field: 'createdAt',
                        type: 'date',
                        cellStyle: {
                            width: '30px !important',
                            maxWidth: 30,
                        },
                        headerStyle: {
                            width: '30px !important',
                            maxWidth: 30,
                        },
                    },
                    {
                        title: 'Завершен',
                        field: 'finishedAt',
                        type: 'date',
                        cellStyle: {
                            width: '30px !important',
                            maxWidth: 30,
                        },
                        headerStyle: {
                            width: '30px !important',
                            maxWidth: 30,
                        },
                    },
                ]}
                data={data}
                options={{
                    filtering: true,
                    pageSize: 5,
                    pageSizeOptions: [5, 25, 50, 100],
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
