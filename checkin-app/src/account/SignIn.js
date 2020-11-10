
import React, {useState, useCallback} from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useStoreActions} from 'easy-peasy'
import {Link} from "react-router-dom";


export default function SignIn(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const loginUser = useStoreActions((actions) => actions.loginUser);
    const setCredentials = useStoreActions((actions)=>actions.setCredentials);
    const setPage = useStoreActions((actions)=>actions.setPage)

    function handleTyping(data, e){
        if(data === "Username"){
            setUsername(e.target.value);
        }else{
            setPassword(e.target.value);
        }
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
                setPage("TODOLIST");
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
    return (<div>
        <form onSubmit={()=>onClickSignIn()} noValidate autoComplete="off">
            <ul>
                <li>
                    <TextField onChange= {(e) =>handleTyping("Username", e)} id="standard-basic" label="Login" />
                </li>
                <li>
                    <TextField onKeyPress={(e)=>{handleEnter(e)}} onChange= {(e) =>handleTyping("Password", e)} id="standard-basic" label="Password" />
                </li> 
            </ul>
        </form>
        <p>{usernameError}</p>
        <p>{passwordError}</p>
        <Button variant="contained" onClick={() => onClickSignIn()} color="primary">Sign In</Button>
        <Button component={Link} to="/SignUp" variant="contained" color="primary">Make an account</Button>
    
       
    </div>)
}