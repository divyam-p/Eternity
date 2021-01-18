import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from "../context/UserContext.js"
import { useContext } from 'react'
import Axios from 'axios'
import ErrorMessage from './ErrorMessages.js'
import './Login.css'

export default function Login() {
    const { userData, setUserData } = useContext(UserContext); 
    const history = useHistory();  
    const [error, setError] = useState(); 

    const [email, setEmail] = useState(); 
    const [password, setPassword] = useState(); 

    const register = () => {
        history.push("/register"); 
    }

    const logOut = () => { 
        setUserData({ 
            token: undefined, 
            user: undefined,
        })
        localStorage.setItem("auth-token", ""); 
        history.push("/"); 
    }

    const submit = async (e) => { 
        e.preventDefault(); 
        try{
            const loginUser = {email, password}; 
            const loginRes = await Axios.post("http://localhost:${process.env.PORT}/users/login", loginUser)
            setUserData({ 
                token: loginRes.data.token, 
                user: loginRes.data.user,
            })
            localStorage.setItem("auth-token", loginRes.data.token); 
            history.push("/"); 
        }catch(err){ 
            err.response.data.message && setError(err.response.data.message); 
        }
    }; 

    return (<div>
        { userData.user ? (
            <button onClick={logOut}>LogOut</button>
        ) :  
        (
        <div className="login">
            <h2 id="loginTitle" >Login</h2>
            <div className="error">
                {error && ( <ErrorMessage message={error} clearError={() => setError(undefined)}></ErrorMessage>)}
            </div>
            <form className="loginForm" onSubmit={submit}> 
                <div className="loginEmail">
                    <div>
                        <label htmlFor="loginEmail">Email</label>
                    </div>
                    <input id="loginEmail" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="loginPassword">
                    <div>
                        <label htmlFor="loginPassword">Password</label>
                    </div>
                    <input id="loginPassword" type="password" onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <input id="loginSubmit" type="submit" value="SIGN IN"></input>
            </form>
            <button id="createAccountButton" onClick={register}>Create account</button>
       </div>
        )} </div>
    )
}
