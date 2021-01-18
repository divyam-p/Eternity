import React from 'react'
import { useState , useContext } from 'react'
import UserContext from "../context/UserContext"
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import ErrorMessage from './ErrorMessages'
import './Register.css'

export default function Register() {
    const [email, setEmail] = useState(); 
    const [password, setPassword] = useState(); 
    const [passwordCheck, setPasswordCheck] = useState(); 
    const [displayName, setDisplayName] = useState(); 
    const [error, setError] = useState(); 
    
    const {setUserData} = useContext(UserContext); 
    const history = useHistory();

    const login = () => {
        history.push("/login"); 
    }

    const submit = async (e) => { 
        e.preventDefault(); 
        try{ 
            const newUser = {email, password, passwordCheck, displayName }; 
            await Axios.post("users/register", newUser); 
            const loginRes = await Axios.post("users/login", { 
                email, 
                password,
            })
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
    return (
        <div className="register">
            <h2 id="registerTitle">Create Account</h2>
            <div className="error">
                {error && ( <ErrorMessage message={error} clearError={() => setError(undefined)}></ErrorMessage>)}
            </div>
            <form className="registerForm" onSubmit={submit}> 
                <div className="registerEmail">
                    <div>
                        <label htmlFor="registerEmail">Email</label>
                    </div>
                    <input id="registerEmail" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="registerPassword">
                    <div>
                        <label htmlFor="registerPassword">Password</label>
                    </div>
                    <input id="registerPassword" type="password" onChange={(e) => setPassword(e.target.value)}></input>
                    <input id="registerPasswordAgain" type="password" placeholder="Verify password" onChange={(e) => setPasswordCheck(e.target.value)}></input>
                </div>

                <div className="registerDisplayName">
                    <div>
                        <label htmlFor="registerDisplayName">Display Name</label>
                    </div>
                    <input id="registerDisplayName" onChange={(e) => setDisplayName(e.target.value)}></input>
                </div>

                <input id="registerSubmit" type="submit" value="Create"></input>
            </form>
            <button id="loginButton" onClick={login}>login</button>
        </div>
    )
}
