import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** Component used for private routes.
 *
 * If there is a valid currentUser in Context the children 
 * component is rendered.
 * If no user is present, redirects to login form.
 */

function PrivateRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);

  console.debug(
    "PrivateRoute",
    "exact=", exact,
    "path=", path,
    "currentUser=", currentUser,
  );

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;
