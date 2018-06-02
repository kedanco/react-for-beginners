import React from "react";
import PropTypes from "prop-types";

// remember to pass props!

const Login = props => (
	<nav className="login">
		<h2>Login here</h2>
		<p>sign in to manage your store's inventory.</p>
		<button className="github" onClick={() => props.authenticate("Github")}>
			Log In With GithHub
		</button>
		<button className="twitter" onClick={() => props.authenticate("Twitter")}>
			Log In With Twitter
		</button>
		<button className="facebook" onClick={() => props.authenticate("Facebook")}>
			Log In With Facebook
		</button>
	</nav>
);

// Inside a stateless function, there is no this.
// Hence you can only use props.authenticate, exclude 'this'

Login.propTypes = {
	authenticate: PropTypes.func.isRequired
};

export default Login;
