import { FormEvent, useRef } from 'react';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
    const newPasswordRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newPassword = newPasswordRef.current!.value;
    }
    return (
        <form className={classes.form}>
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