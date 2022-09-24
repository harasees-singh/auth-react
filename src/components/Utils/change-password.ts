import { useContext } from "react";
import AuthContext from "../../store/auth-context";

export const changePassword = (newPassword: string) => {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCkdzvvoTzBF7cPSlkjuB4TULSRIfoFcIw';
    const AuthCTX = useContext(AuthContext);
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            idToken: AuthCTX.token,
            password: newPassword,
            returnSecureToken: false,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then()
}