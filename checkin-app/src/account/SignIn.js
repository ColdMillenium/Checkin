
import React, {useState, useCallback} from 'react'
import { useStoreActions} from 'easy-peasy'
import {Link, useHistory} from "react-router-dom";
import {motion} from 'framer-motion'

import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

export default function SignIn(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const history = useHistory(); 

    const loginUser = useStoreActions((actions) => actions.loginUser);
    const setCredentials = useStoreActions((actions)=>actions.setCredentials);


    function handleTyping(data, e){
        if(data === "Username"){
            setUsername(e.target.value);
        }else{
            setPassword(e.target.value);
        }
    }

    function goToApp(){
        history.push('/app');
    }
    function goToSignUp(){
        history.push('/Account/SignUp');
    }
    function onClickSignIn(e){
        console.log(username);
        console.log(password);
        loginUser({
            username:username,
            password:password
        }).then((res)=>{
            console.log(res);
            if(res.status === "fail"){
                if('username' in res.error){

                    console.log("boop");
                    setUsernameError(res.error.username);
                }
                if('password' in res.error){
                    console.log('booopy');
                    setPasswordError(res.error.password);
                }
            }else{
                setCredentials(res)
                goToApp();
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    function handleEnter(e){
        if(e.key === 'Enter'){
            onClickSignIn();
        }
    }


    return (
        <Grid container direction="column" alignItems="center">
            <Grid item>
            <Typography variant="h4">
                Sign In
            </Typography>
            </Grid>
            <Grid item>
                <TextField onChange= {(e) =>handleTyping("Username", e)} id="standard-basic" label="Login" />
            </Grid>
            <Grid item>
                <TextField onKeyPress={(e)=>{handleEnter(e)}} onChange= {(e) =>handleTyping("Password", e)} id="standard-basic" label="Password" />
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={() => onClickSignIn()} color="primary">
                    Sign In
                </Button>
            </Grid>
            <Grid item>
                <Button onClick={goToSignUp} variant="contained" color="primary">
                    Make an account
                </Button>
            </Grid>
            <Grid item>
                <p>{usernameError}</p>
                <p>{passwordError}</p>
            </Grid>
        </Grid>
    )
}