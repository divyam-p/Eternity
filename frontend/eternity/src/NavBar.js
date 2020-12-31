import './NavBar.css'
import logo from './assets/navbar/logo.png'
import { FiShoppingCart } from 'react-icons/fi'
import { BiSearch } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { useState } from 'react'; 

function NavBar(){ 

    const [value, setValue] = useState(false); 

    const hideAndShowItems = () => { 
        setValue(!value); 
    }
    return (<nav className="navBar">
        <div className="navCenter">
            {
            value===false &&
            <div className="logoClass">
                <img id="logo" src={logo} alt='logo'/>
            </div>
            }
            { 
            value===false && 
            <div className="icons"> 
                <BiSearch onClick={() => hideAndShowItems()} id="searchIcon"/>
                <FaRegUser id="profileIcon"/> 
                <FiShoppingCart id="shopIcon"/>
            </div>
            }
        </div> 
        {
            value===true &&
             <div className="searchBar"> 
                <div> 
                    <input type="text" placeholder="Search..." id="search"></input>
                </div>
                <div>
                    <BiSearch onClick={() => hideAndShowItems()} id="searchIconTwo"/>
                </div>
            </div> 
            }
    </nav>)
}

export default NavBar