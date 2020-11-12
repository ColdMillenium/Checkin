import React, {useState, useCallback} from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from 'react-router-dom';
import { motion } from "framer-motion"
import Typography from '@material-ui/core/Typography';

const arriveLeft = {
    hidden: { x: "-100vw" },
    visible: { x: "50vw", transition: { duration: 0.5 } }
  };
  const arriveRight = {
    hidden: { x: "100vw" },
    visible: { x: "50vw", transition: { duration: 0.5 } }
  };
export default function Account() {
    const history = useHistory();
    return (
            <div>
                <Typography variant="h2">
                        Welcome to Checkin!
                </Typography>
                <Route exact path="/Account">
                    <Redirect from="/" to="Account/SignIn"></Redirect>
                </Route>
                <Route path="/Account/SignIn">
                        {Appear(SignIn, arriveLeft)} 
                </Route>
                <Route path="/Account/SignUp">
                        {Appear(SignUp, arriveRight)}
                </Route>
            </div>
           
     
    )
    function Appear(Comp, variants){
        return (
        <motion.div variants={variants} initial="hidden" animate="visible">
            <Comp></Comp>
        </motion.div>
        )
    }
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








