import React, {useRef} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import 'fontsource-roboto'

import Account from './account/Account'
import TodoList from './checkin/TodoList'




//------------V----- App Styling ---------------V------//




const theme = createMuiTheme({
    palette: {
        primary: {
            main:"#6a89cc"
        },
        secondary:{
            main:"#b8e994"
        }
    }
})
//------------V----- High Level App Routing ---------------V------//
export default function Main() {
    const authenticated = useStoreState((state) => state.authenticated);
    const constraintsRef = useRef(null);
    return (
    <ThemeProvider theme={theme}> 
        <Router>
        <Switch>
            <Route exact path="/">
            <Redirect from="/" to="/Account"></Redirect>
            </Route>
            <Route path="/Account"><Account></Account></Route>
            <Route path="/app">{
                ()=>{
                    if(authenticated){
                        return <TodoList></TodoList>
                    }else{
                        return(
                            <Redirect from="/app" to="/Account"></Redirect>
                        )
                    }
                }
            }</Route>
        </Switch>
        </Router>
        <hr />
    </ThemeProvider>);
}

