import { isValidInputTimeValue } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react'
let logoutTimer: NodeJS.Timeout;

type AuthContextShape = {
    token: string;
    isLoggedIn: boolean;
    login: (token: string, expTime: Date) => void;
    logout: () => void;
}
type RetrieveToken = {
    token: string;
    duration: number;
}
const AuthContext = React.createContext<AuthContextShape>({
    token: '',
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
})
type Props = {
    children: React.ReactNode
}

const calculateRemainingTime = (expirationTime: Date) => {
    const curTime = new Date().getTime(); // in milliseconds
    const adjExpirationTime = expirationTime.getTime();
    const remainingTime = adjExpirationTime - curTime;

    return remainingTime;
}
const retrieveStoredToken = (): RetrieveToken => {
    const initialToken = localStorage.getItem('token');
    const storedExpirationTime = localStorage.getItem('expirationTime');

    let ExpTime = new Date(0);

    if(storedExpirationTime) ExpTime = new Date(storedExpirationTime);

    const remainingTime = calculateRemainingTime(ExpTime);

    if(remainingTime <= 60000){
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('token');
        return {
            token: '',
            duration: 0,
        };
    }
    return {
        token: initialToken || '',
        duration: remainingTime,
    }
}
export const AuthContextProvider: React.FC<Props> = (props) => {
    const {token: initialToken, duration} = retrieveStoredToken();

    const [token, setToken] = useState<string>(initialToken || '');

    const userIsLoggedIn = !!token;
    
    const logoutHandler = () => {
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime')

        if(logoutTimer){
            clearTimeout(logoutTimer);
        }
    }
    const loginHandler = (token: string, expirationTime: Date) => {
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime.toISOString());

        setToken(token);

        const remainingTime = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    }

    useEffect( () => {
        if(initialToken){
            console.log(duration);
            setTimeout(logoutHandler, duration);
        }
    }, [initialToken, duration, logoutHandler])

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }


    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;