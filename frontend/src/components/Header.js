import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './header.css'
import Logo from '@/Images/icon-left-font.png'
import { accountService } from "@/_services/account.service";
// import { LoginContext } from '@/_utils/Context';






const Header = () => {
    useEffect(() => {
    })
    // const { Logon } = useContext(LoginContext)

    if (accountService.isLogged()) {
        const token = accountService.tokenDecode(accountService.getToken())
        return (

            <header>
                <div className='logo'>
                    <Link to="/home"> <img src={Logo} alt="groupomania"></img></Link>
                </div>
                <nav>
                    <ul>
                        <li>{token.nom + ' ' + token.prenom}</li>
                        <li onClick={accountService.logout}><Link to="/auth/login">Logout</Link></li>
                    </ul>
                    {/* <button onClick={accountService.logout()}><Link to="/auth/login">Logout</Link></button> */}
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
                        <li><Link to="auth/login"> Login</Link></li>
                        <li><Link to="auth/signup"> Inscription</Link></li>
                    </ul>
                </nav>
            </header>
        );
    };
};

export default Header