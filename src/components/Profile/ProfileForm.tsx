import { FormEvent, useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import { changePassword } from '../Utils/change-password';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const AuthCTX = useContext(AuthContext);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newPassword = newPasswordRef.current!.value;

        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCkdzvvoTzBF7cPSlkjuB4TULSRIfoFcIw';
        // fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         idToken: AuthCTX.token,
        //         password: newPassword,
        //         returnSecureToken: false,
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then((res) => {

        // }).catch((err) => {
        //     console.log(err.message);
        // })
        changePassword(newPassword, AuthCTX.token);
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' ref={newPasswordRef} />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;