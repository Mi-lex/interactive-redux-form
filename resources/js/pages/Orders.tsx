import React from 'react';
import Container from '@material-ui/core/Container';
import PageHeader from '../components/PageHeader';
import OrderTable from '../components/OrderTable/OrderTable';

const Orders = () => {
    return (
        <Container maxWidth="xl">
            <PageHeader />
            <OrderTable />
        </Container>
    );
};

export default Orders;
