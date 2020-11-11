import React, {useRef} from 'react'
import { Button } from '@material-ui/core';
import {useStoreState, useStoreActions} from 'easy-peasy'
import Account from './account/Account'
import TodoList from './checkin/TodoList'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {motion} from 'framer-motion'


export default function Main() {
    const authenticated = useStoreState((state) => state.authenticated);
    const constraintsRef = useRef(null);
    return (<div>
     
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
    <motion.div
      ref={constraintsRef}
      style={{ background: "green", width: 200, height: 200 }}
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        style={{ background: "red", width: 100, height: 100 }}
      />
    </motion.div>
    </div>);
}

