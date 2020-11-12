import React, {useState, useCallback} from 'react'
import TextField from '@material-ui/core/TextField';
import { useStoreActions} from 'easy-peasy'
import {Link, useHistory} from 'react-router-dom'
import { motion } from "framer-motion";

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

export default function SignUp(props){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const registerUser = useStoreActions((actions) => actions.registerUser);
    const history = useHistory();
    
 

    function handleSubmit(e){
        // addTodo(value);
        // setValue("");
        // e.preventDefault();
        console.log("button pressed yo");
    }

    function handleEnter(e){
        if(e.key === 'Enter'){
            handleSubmit(e);
        }
    }

    function handleTyping(data, e){
        if(data === "Username"){
            setUsername(e.target.value);
        }else if(data === "Email"){
            setEmail(e.target.value);
        }else{
            setPassword(e.target.value);
        }
    }
    function goToSignIn(){
        history.push("/Account/SignIn");
    }
    const onSignUpClick = useCallback(
        ()=>registerUser({
            "username": username,
            "email": email,
            "password":password
        })
        .then((res)=>{
            if(res.status === "success"){
                console.log("YAAAY");
                goToSignIn();
            }else{
                console.log(res);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    );
    function SuperButton(){
        return(<Button> variant="contained" onClick={() => onSignUpClick()} color="primary">Sign Up</Button>)
    }
    return (
        <Grid container direction="column" alignItems="center">
            <Grid item>
                <Typography variant="h4">
                    Sign Up
                </Typography>
            </Grid>
            <Grid item>
                <TextField onChange= {(e) =>handleTyping("Username", e)} id="standard-basic" label="Login" />
            </Grid>
            <Grid item>
                <TextField onChange= {(e) =>handleTyping("Email", e)} id="standard-basic" label="Email" /> 
            </Grid>
            <Grid item>
                <TextField onChange= {(e) =>handleTyping("Pasasdfadsword", e)} id="standard-basic" label="Password" />
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={() => onSignUpClick()} color="primary">
                    Sign Up
                </Button>
            </Grid>
            <Grid item>
                <Button onClick={goToSignIn} variant="contained"  color="primary">
                    Back to Sign In
                </Button>
            </Grid>   
        </Grid>
    )
    }

    
