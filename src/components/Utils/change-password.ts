export const changePassword = (newPassword: string, idToken: string) => {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCkdzvvoTzBF7cPSlkjuB4TULSRIfoFcIw';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            idToken: idToken,
            password: newPassword,
            returnSecureToken: false,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        if(res.ok){

        }
        else{
            return res.json().then( (data) => {
                throw new Error(data.error.message)
            })
        }
    }).catch( (err) => {
        // alert(err.message)
        console.log(err.message)
    })
}