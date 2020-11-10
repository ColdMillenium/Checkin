import React, {useState, useCallback} from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


export default function Account() {

    return (
            <div>
                <Route exact path="/Account">
                    <Redirect from="/" to="Account/SignIn"></Redirect>
                </Route>
                <Route path="/Account/SignIn"><SignIn></SignIn></Route>
                <Route path="/Account/SignUp"><SignUp></SignUp></Route>
            </div>
           
     
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








