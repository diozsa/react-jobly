import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./api";
import Navbar from './routes/Navbar';
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";
import Routes from "./routes/Routes";
import useLocalStorage from "./hooks/useLocalStorage";
import Loading from './Loading';


// Key name for token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";


/** Jobly application.
 *
 * - infoLoaded: shows spinner for "loading..."
 *   until user data has been pulled from API
 *   
 * - currentUser: user obj from API. This is the logged in status.
 *   This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read
 *   from localStorage and synced to API via the useLocalStorage hook.
 *
 */

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
  );

  /**
   * User loaded from API. When user is logged in with a token
   * the function runs.
   * Functions also runs at logout, when setting token to null
  */
  
  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    /**
     * For the spinner <Loading />
     * set infoLoaded to false while async getCurrentUser runs
     * once the data is fetched, this will be set back to false.
     */

    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);


  /** Signup.
 * Automatically logs user in (set token) upon signup.
 */
  
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }


  // Login
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  // logout
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return <Loading />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
        <div className="App">
          <Navbar logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
