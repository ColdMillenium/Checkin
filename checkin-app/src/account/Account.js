import React, {useState, useCallback} from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'


export default function Account() {

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








