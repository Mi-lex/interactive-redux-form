import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Orders from '../pages/Orders'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import ruLocale from 'date-fns/locale/ru'
import DateFnsUtils from '@date-io/date-fns'
import Passport from '../pages/Passport'
import PassportV2 from '../pages/Passport.v2'
import Container from '@material-ui/core/Container'
import PageHeader from '../components/PageHeader'
import Drawer from '@material-ui/core/Drawer'
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
                        <Route path="/" exact>
                            <Passport />
                        </Route>
                        <Route path="/passport" exact>
                            <PassportV2 />
                        </Route>
                    </MuiPickersUtilsProvider>
                </Switch>
            </Container>
        </Router>
    )
}

export default App
