import React from 'react'
import { Button } from '@material-ui/core';
import {useStoreState, useStoreActions} from 'easy-peasy'
import Account from './account/Account'
import TodoList from './checkin/TodoList'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

export default function Main() {
    const authenticated = useStoreState((state) => state.authenticated);
    
    return (<div>
     
     <Router>
      <Switch>
        <Route exact path="/">
          <Redirect from="/" to="/Account"></Redirect>
        </Route>
        <Route path="/Account"><Account></Account></Route>
        {/* <Route path="/app">{
            ()=>{
                if(authenticated){
                    return <TodoList></TodoList>
                }else{
                    return(
                        <Redirect from="/app" to="/SignIn"></Redirect>
                    )
                }
            }
        }</Route> */}
      </Switch>
    </Router>
    </div>);
}

