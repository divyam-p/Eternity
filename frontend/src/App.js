import './App.css'
import NavBar from './navigationBar/NavBar.js'
import SlideShow from './home/SlideShow.js'
import listOfImages from './home/defaultSlides.js'
import AddProduct from './home/AddProduct.js'
import Products from './home/Products.js' 
import listOfProducts from './home/defaultProducts.js'
import Login from './loginAndRegister/Login.js'
import Register from './loginAndRegister/Register.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom' 
import UserContext from './context/UserContext'
import React, {useState, useEffect } from 'react'
import Axios from 'axios'

function App() {
  const [userData, setUserData] = useState({ 
    token: undefined, 
    user: undefined,
  }); 

  //can't have async function inside useEffect so have to create a function inside the function 
  //inside useEffet 
  useEffect(() => { 
    const checkLoggedIn = async () => { 
      let token = localStorage.getItem("auth-token"); 
      //when the website it run for the first time, the token is null  
      if(token === null){ 
        localStorage.setItem("auth-token", ""); 
        token = ""; 
      }
      const tokenRes = await Axios.post("http://localhost:5000/users/tokenIsValid", null, {headers: {"x-auth-token": token}}); 
      if(tokenRes.data){ 
        const userRes = await Axios.get("http://localhost:5000/users/", {headers: {"x-auth-token": token}}); 
        setUserData({ 
          token, 
          user: userRes.data,
        })
      }

    }
    checkLoggedIn(); 
  }, []); 

  return (
    <div className="main">
      <BrowserRouter>
        <UserContext.Provider value={{userData, setUserData}}>
          <NavBar/>
          <Switch>
            <Route exact path="/">
              <SlideShow slides={listOfImages}/>
              <AddProduct />
              <Products products={listOfProducts}/> 
            </Route>
            <Route path="/login"> 
              <Login/> 
            </Route> 
            <Route path="/Register">
              <Register/> 
            </Route>
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>     
    </div>
  );
}

export default App;