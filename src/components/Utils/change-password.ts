export const changePassword = async (newPassword: string, idToken: string, redirect: () => void) => {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCkdzvvoTzBF7cPSlkjuB4TULSRIfoFcIw';
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            idToken: idToken,
            password: newPassword,
            returnSecureToken: false,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    if(response.ok){
        console.log(data);
        redirect()
    }
    else {
        alert(data.error.message);
    }
    // .then((res) => {
    //     if(res.ok){

    //     }
    //     else{
    //         return res.json().then( (data) => {
    //             throw new Error(data.error.message)
    //         })
    //     }
    // }).catch( (err) => {
    //     // alert(err.message)
    //     console.log(err.message)
    // })
}