import { useState, useRef, useContext } from 'react';
import React from 'react';
import classes from './AuthForm.module.css'
import LoadingSpinner from '../UI/LoadingSpinner';
import {useHistory} from 'react-router-dom'
import AuthContext from '../../store/auth-context';
const AuthForm: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const history = useHistory();
    const AuthCTX = useContext(AuthContext);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        event.preventDefault();

        const enteredEmail = emailRef.current!.value;
        const enteredPassword = passwordRef.current!.value;

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkdzvvoTzBF7cPSlkjuB4TULSRIfoFcIw';
        // login url

        if (!isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkdzvvoTzBF7cPSlkjuB4TULSRIfoFcIw';
        }

        // sign up
        const _ = fetch(
            url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                setIsLoading(false);

                if (res.ok) {
                    // ..
                    return res.json();
                }
                else {
                    return res.json().then((data) => {
                        // console.log(data);
                        let errorMessage = 'Authentication Failed';
                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message;
                        }
                        throw new Error(errorMessage);
                    })
                }
            }).then((data) => {
                // console.log(data);
                AuthCTX.login(data.idToken);
                history.replace('/')
            }).catch((err) => {
                alert(err.message);
            });
    }


    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={passwordRef} />
                </div>
                <div className={classes.actions}>
                    {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                    {isLoading && <LoadingSpinner />}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;