import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';

import { data } from './data';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

class OrderTable extends React.Component {
    render() {
        return (
            <MaterialTable
                icons={tableIcons}
                title="Таблица заказов"
                columns={[
                    { title: 'Номер', field: 'id', type: 'numeric' },
                    { title: 'Название', field: 'name' },
                    { title: 'Тип', field: 'type' },
                    { title: 'Менеджер', field: 'manager' },
                    { title: 'Клиент', field: 'client' },
                    { title: 'Организация', field: 'organization' },
                    { title: 'Оформлен', field: 'createdAt', type: 'date' },
                    { title: 'Завершен', field: 'finishedAt', type: 'date' },
                ]}
                data={data}
                options={{
                    filtering: true,
                    pageSize: 5,
                    pageSizeOptions: [5, 25, 50, 100],
                }}
                localization={{
                    body: {
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
        );
    }
}

export default OrderTable;
