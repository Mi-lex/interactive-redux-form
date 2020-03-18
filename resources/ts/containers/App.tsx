import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'
import Container from '@material-ui/core/Container'
import Drawer from '@material-ui/core/Drawer'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import ruLocale from 'date-fns/locale/ru'

import PageHeader from '../components/PageHeader'
import SideList from '../components/SideList'
import Orders from '../pages/Orders'
import Passport from '../pages/Passport'

const App: React.FC = () => {
    const [isOpen, setDrawerState] = React.useState(false)

    const closeDrawer = (): void => {
        setDrawerState(false)
    }

    const toggleDrawer = (): void => {
        setDrawerState(!isOpen)
    }

    return (
        <Router>
            <Drawer open={isOpen} onClose={closeDrawer}>
                <SideList closeDrawer={closeDrawer} />
            </Drawer>
            <Container maxWidth="xl">
                <PageHeader toggleDrawer={toggleDrawer} />
                <Switch>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                        <Route path="/" exact>
                            <Orders />
                        </Route>
                        <Route path="/passport/:id?" exact>
                            <Passport />
                        </Route>
                    </MuiPickersUtilsProvider>
                </Switch>
            </Container>
        </Router>
    )
}

export default App
