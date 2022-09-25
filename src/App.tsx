import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';

function App() {
    const AuthCTX = useContext(AuthContext);
    const loggedIn = AuthCTX.isLoggedIn;

    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                {!loggedIn && <Route path='/auth'>
                    <AuthPage />
                </Route>}
                <Route path='/profile'>
                    {loggedIn && <UserProfile />}
                    {!loggedIn && <Redirect to='/auth' />}
                </Route>
                <Route path='*'>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;