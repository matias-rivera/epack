import React from 'react';
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
                    <a href='/home'>Track</a>
                </li>
                <li>
                    <a href='/admin'>Admin</a>
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