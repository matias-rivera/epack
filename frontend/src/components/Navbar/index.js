import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'


const Navbar = () => {
    return ( 
        <>
        <nav>
            <input id="nav-toggle" type="checkbox"/>
            <div className='nav__logo'>
                <strong>E</strong>PACK
            </div>
            <ul className='nav__links'>
                <li>
                    <Link className='nav__link' to='/'>Track</Link>
                </li>
                <li>
                    <Link className='nav__link' to='/login'>Login</Link>
                </li>
                <li>
                    <Link className='nav__link' to='/admin'>Admin</Link>
                </li>
            </ul>
            <label for="nav-toggle" class="icon-burger">
                <div class="nav__line"></div>
                <div class="nav__line"></div>
                <div class="nav__line"></div>
            </label>
        </nav>
        
        </>
     );
}
 
export default Navbar;