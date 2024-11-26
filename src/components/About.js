import React, { Component } from "react";
import Shimmer from "./Shimmer";
import { GITHUB_USER_API } from "../utils/constants";
import UserContext from "../utils/UserContext";

class About extends Component {
	constructor() {
		super();

		this.state = {
			teamMembers: [],
		};
	}

	// We can make this function async in order to handle API calls.
	async componentDidMount() {
		const response = await fetch(GITHUB_USER_API + "mdzama1012");
		const responseData = await response.json();
		this.setState({ teamMembers: [responseData] });
	}

	render() {
		const { teamMembers } = this.state;

		return teamMembers.length === 0 ? (
			<Shimmer />
		) : (
			<div className="mx-20 rounded-lg border p-5">
				<UserContext.Consumer>
					{contextData => (
						<h1 className="mb-10 text-center text-4xl font-bold text-slate-800">{`Hello, ${contextData.username} Thanks for Learning About Us`}</h1>
					)}
				</UserContext.Consumer>
				<h1 className="mb-5 text-3xl font-bold">About Us</h1>
				<div className="mb-5 flex flex-col gap-2">
					<p>Welcome to PureFork – Your Trusted Food Delivery Partner!</p>
					<p>
						At PureFork, we believe great food brings people together. Founded
						with the vision of making quality meals accessible, we connect you
						with your favorite restaurants and cuisines, delivering fresh and
						delicious food right to your doorstep.
					</p>
					<p>
						With a seamless app, quick delivery, and a wide variety of options,
						PureFork is here to satisfy your cravings anytime, anywhere.
					</p>
					<p>
						Join us in our mission to make every meal a delightful experience!
					</p>
					<p className="font-bold">PureFork – Fresh, Fast, and Flavorsome.</p>
				</div>
				{/* This will be replaced by team member component */}
				<h1 className="mb-5 text-3xl font-bold">Our Team Members</h1>
				<div>Team Member: {teamMembers[0].name}</div>
			</div>
		);
	}
}

export default About;
