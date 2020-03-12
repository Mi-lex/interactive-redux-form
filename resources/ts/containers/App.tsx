import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Drawer from '@material-ui/core/Drawer'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import ruLocale from 'date-fns/locale/ru'
import DateFnsUtils from '@date-io/date-fns'
import Orders from '../pages/Orders'
import Passport from '../pages/Passport'
import PageHeader from '../components/PageHeader'
import SideList from '../components/SideList'

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
                        <Route path="/orders" exact>
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
