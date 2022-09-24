import React, { useState } from 'react'
type AuthContextShape = {
    token: string;
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}
const AuthContext = React.createContext<AuthContextShape>({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
})
type Props = {
    children: React.ReactNode
}
export const AuthContextProvider: React.FC<Props> = (props) => {

    const [token, setToken] = useState<string>('');

    const userIsLoggedIn = !!token;

    const loginHandler = (token: string) => {
        setToken(token);
    }
    const logoutHandler = () => {
        setToken('');
    }

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