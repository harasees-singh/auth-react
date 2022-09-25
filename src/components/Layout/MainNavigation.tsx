import { useContext } from 'react';
import { Link, Router } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    const AuthCTX = useContext(AuthContext);
    const { isLoggedIn } = AuthCTX;

    const logoutHandler = () => {
        AuthCTX.logout();   
        // add navigation guards

    }
    return (
        <header className={classes.header}>


            <nav>
                <ul>
                    {!isLoggedIn && <li>
                        <Link to='/auth'>Login</Link>
                    </li>}
                    {isLoggedIn && <li>
                        <Link to='/profile'>Profile</Link>
                    </li>}
                    {isLoggedIn && <li>
                        <button onClick={logoutHandler}>Logout</button>
                    </li>}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;