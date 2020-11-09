import React, {useState, useCallback} from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useStoreActions} from 'easy-peasy'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
    
      },
    },
  }));

export default function Auth() {

    const [page, setPage] = useState('SIGN IN');
    if(page === 'SIGN UP'){
        return (
            <div>
                <SignUp goToSignIn={()=> setPage("SIGN IN")}></SignUp>
            </div>
        )
    }else{
        return  (
            <div>
                <SignIn goToSignUp={()=> setPage("SIGN UP")}></SignIn>
            </div>
        )
    }
    
}
function SignIn(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const classes = useStyles();
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
        <form onSubmit={()=>onClickSignIn()}className={classes.root} noValidate autoComplete="off">
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
        <Button variant="contained" onClick={() => props.goToSignUp()} color="primary">Make an account</Button>
    </div>)
}

function SignUp(props){
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const registerUser = useStoreActions((actions) => actions.registerUser);

 

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

    const onSignUpClick = useCallback(
        ()=>registerUser({
            "username": username,
            "email": email,
            "password":password
        })
        .then((res)=>{
            if(res.status === "success"){
                console.log("YAAAY");
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
            <form className={classes.root} noValidate autoComplete="off">
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
            <Button variant="contained" onClick={() => props.goToSignIn()} color="primary">Back to Sign In</Button>
        </div>
    )
    }





