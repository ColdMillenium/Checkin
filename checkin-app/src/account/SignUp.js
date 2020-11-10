import React, {useState, useCallback} from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useStoreActions} from 'easy-peasy'
import {Link, useHistory} from 'react-router-dom'

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
    return (
        <div>
            <form  noValidate autoComplete="off">
                <ul>
                    <li>
                        <TextField onChange= {(e) =>handleTyping("Username", e)} id="standard-basic" label="Login" />
                    </li>
                    <li>
                        <TextField onChange= {(e) =>handleTyping("Email", e)} id="standard-basic" label="Email" />
                    </li>
                    <li>
                        <TextField onChange= {(e) =>handleTyping("Pasasdfadsword", e)} id="standard-basic" label="Password" />
                    </li> 
                </ul>
            </form>
            <Button variant="contained" onClick={() => onSignUpClick()} color="primary">Sign Up</Button>
            <Button onClick={goToSignIn} variant="contained"  color="primary">Back to Sign In</Button>
        </div>
    )
    }
