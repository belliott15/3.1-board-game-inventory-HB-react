import { useState, useEffect } from 'react';
import { getUser } from './services/fetch-utils';
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
  Redirect,
} from 'react-router-dom';
import AuthPage from './AuthPage';
import DetailPage from './DetailPage';
import ListPage from './ListPage';
import CreatePage from './CreatePage';

import './App.css';
import { logout } from './services/fetch-utils';

export default function App() {
  // You'll need to track the user in state
  const [email, setEmail] = useState();
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  // add a useEffect to get the user and inject the user object into state on load
  useEffect(() => {
    const user = getUser();
    setUser(user);
    // if (user) {
    //   setEmail(user.user.email);
    //   setToken(user.access_token_token);
    //   setUser(user);
    // }
  }, []);
  async function handleLogout() {
    // call the logout function
    await logout();
    setEmail('');
    setToken('');
    // clear the user in state
    setUser('');
  }

  return (
    <Router>
      <div className='App'>
        <header>
          {/* if there is a user in state, render out a link to the board games list, the create page, and add a button to let the user logout */}
          {user && token ? 
            <nav>
              <ul className='navigation'>
                <li>
                  <NavLink to="/board-games">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/create">Board Games</NavLink>
                </li>
                <li>
                  <p>Welcome {email}</p>
                  <button onClick={handleLogout}>Log out</button>
                </li>
              </ul>
            </nav> 
            : 
            <AuthPage />
          }
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              {/* if there is a user, redirect to the board games list. Otherwise, render the auth page. Note that the AuthPage will need a function called setUser that can set the user state in App.js */}
              {token ? <Redirect to='/board-games' /> 
                : <AuthPage setEmail={setEmail} setToken={setToken}/>}
            </Route>
            <Route exact path='/board-games'>
              {/* if there is a user, render the board games list. Otherwise, redirect to the home route/auth page */}
              {token ? <ListPage /> : <Redirect to='/' />}
            </Route>
            <Route exact path="/board-games/:id">
              {/* if there is a user, render the detail page. Otherwise, redirect to the home route/auth page */}
              {token ? <DetailPage /> : <Redirect to='/' />}
            </Route>
            <Route exact path="/create">
              {/* if there is a user, render the create page. Otherwise, redirect to the home route/auth page */}
              {token ? <CreatePage /> : <Redirect to='/' />}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}