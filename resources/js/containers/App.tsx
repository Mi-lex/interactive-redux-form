import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PassportForm from '../pages/PassportForm';
import Orders from '../pages/Orders';
import PageHeader from '../components/PageHeader';
import Container from '@material-ui/core/Container';
import { Drawer } from '@material-ui/core';
import SideList from '../components/SideList';

const App: React.FC = () => {
    const [isOpen, setDrawerState] = React.useState(false);

    const closeDrawer = () => {
        setDrawerState(false);
    };

    const toggleDrawer = () => {
        setDrawerState(!isOpen);
    };

    return (
        <Router>
            <Drawer open={isOpen} onClose={closeDrawer}>
                <SideList closeDrawer={closeDrawer} />
            </Drawer>
            <Container maxWidth="xl">
                <PageHeader toggleDrawer={toggleDrawer} />
                <Switch>
                    <Route path="/" exact>
                        <PassportForm />
                    </Route>
                    <Route path="/orders" exact>
                        <Orders />
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
};

export default App;
