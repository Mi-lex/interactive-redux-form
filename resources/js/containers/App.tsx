import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PassportForm from '../pages/PassportForm';
import Orders from '../pages/Orders';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <PassportForm />
                </Route>
                <Route path="/orders" exact>
                    <Orders />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
