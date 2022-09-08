import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'
import Logo from '../Images/icon-left-font.png'

const Header = () => {
    const X = 1;
    if (X === 0) {
        return (

            <header>
                <div className='logo'>
                    <Link to="/home"> <img src={Logo} alt="groupomania"></img></Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/user"> </Link></li>
                    </ul>
                </nav>
            </header>

        );
    } else {
        return (
            <header>
                <div className='logo'>
                    <Link to="/home"> <img src={Logo} alt="groupomania"></img></Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/login"> Login</Link></li>
                        <li><Link to="/signup"> Inscription</Link></li>
                    </ul>
                </nav>
            </header>
        );
    };
};

export default Header