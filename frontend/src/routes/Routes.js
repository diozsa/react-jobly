import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../Home";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";

// Routes that require no autho
// Non-existing routes are redirected to /Home

const Routes = ({ login, signup }) => {
    
  console.debug (
    "Routes", `login=${typeof login}`, `register=${typeof register}`,
  );
    
  return (
    <div className="py-5">
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <PrivateRoute exact path="/companies">
          <CompanyList />
        </PrivateRoute>

        <PrivateRoute exact path="/jobs">
          <JobList />
        </PrivateRoute>

        <PrivateRoute exact path="/companies/:handle">
          <CompanyDetail />
        </PrivateRoute>

        {/* <PrivateRoute path="/profile">
          <ProfileForm />
        </PrivateRoute> */}
        
        <Redirect to="/" />

      </Switch>
    </div>
  )
};

export default Routes;