import 'svgxuse';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PassportForm from '../pages/PassportForm';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <PassportForm />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
