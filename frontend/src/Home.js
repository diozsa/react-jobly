import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./auth/UserContext";

// Homepage - routed at "/" in "routes/Routes.js"

const Home = () => {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

	return (
		<div>
			<div className="container text-center">
				<h1 className="pt-5 mb-4 font-weight-bold">Jobly</h1>
				{currentUser ?
					<h2>
						Welcome Back, {currentUser.firstName || currentUser.username}!
					</h2>
					: (
						<div>
							<p className="lead">
								Log in or Sign Up to see all jobs available.
							</p>
							<Link
								className="btn btn-primary font-weight-bold px-3 mx-2"
								to="/login">
								Log in
							</Link>
							<Link className="btn btn-primary font-weight-bold px-3 mx-2"
								to="/signup">
								Sign up
							</Link>
						</div>
					)}
			</div>
		</div>
	)
}
export default Home;