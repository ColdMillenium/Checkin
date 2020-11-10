import React, {useState, useCallback} from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


export default function Account() {

    return (
    <Router>
        <Switch>
            <Route exact path="/">
                <Redirect from="/" to="/SignIn"></Redirect>
            </Route>
            <Route path="/SignIn"><SignIn></SignIn></Route>
            <Route path="/SignUp"><SignUp></SignUp></Route>
        </Switch>
    </Router>
    )
    // if(page === 'SIGN UP'){
    //     return (
    //         <div>
    //             <SignUp goToSignIn={()=> setPage("SIGN IN")}></SignUp>
    //         </div>
    //     )
    // }else{
    //     return  (
    //         <div>
    //             <SignIn goToSignUp={()=> setPage("SIGN UP")}></SignIn>
    //         </div>
    //     )
    // }
    
}








