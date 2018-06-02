import React from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
	static propTypes = {
		fishes: PropTypes.object,
		updateFish: PropTypes.func,
		deleteFish: PropTypes.func,
		loadSampleFishes: PropTypes.func
	};

	state = {
		uid: null,
		owner: null
	};

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.authHandler({ user });
			}
		});
	}

	authHandler = async authData => {
		// 1. Look up current store in firebase database
		const store = await base.fetch(this.props.storeId, { context: this });
		console.log(store);
		// 2. Claim it if there is no owner
		if (!store.owner) {
			// Save it as our own
			await base.post(`${this.props.storeId}/owner`, {
				data: authData.user.uid //email also possible
			});
		}
		// 3. Set the state of inventory component to reflect current user
		this.setState({
			uid: authData.user.uid,
			owner: store.owner || authData.user.uid
		});
	};

	authenticate = provider => {
		// Store authProvider instead of creating separate var for each provider
		const authProvider = new firebase.auth[`${provider}AuthProvider`](); //dynamic auth.
		firebaseApp
			.auth()
			.signInWithPopup(authProvider)
			.then(this.authHandler); //connect to Auth portion
	};

	logout = async () => {
		console.log("Logging Out!");
		await firebase.auth().signOut();
		this.setState({ uid: null });
	};

	render() {
		const logout = <button onClick={this.logout}>Log Out!</button>;

		// 1. check if user is logged in
		if (!this.state.uid) {
			return <Login authenticate={this.authenticate} />;
		}

		// 2. Check if they are not owner of the store
		if (this.state.uid !== this.state.owner) {
			return (
				<div>
					<p>Sorry you are not the owner!</p>
					{logout}
				</div>
			);
		}

		// 3. Owner, just render inventory
		return (
			<div className="inventory">
				<h2>Inventory!!</h2>
				{logout}
				{Object.keys(this.props.fishes).map(key => (
					<EditFishForm
						key={key}
						index={key}
						fish={this.props.fishes[key]}
						updateFish={this.props.updateFish}
						deleteFish={this.props.deleteFish}
					/>
				))}
				<AddFishForm addFish={this.props.addFish} />

				<button onClick={this.props.loadSampleFishes}>
					Load Sample Fishes
				</button>
			</div>
		);
	}
}

export default Inventory;
