import React, { Component } from 'react';

// import UserContext from '../context/UserContext';
import {
  GITHUB_USERS_API,
  GITHUB_USER_API,
  TEAM_MEMBERS_API,
} from '../utils/constants';

import Loading from './Loading';
import ShimmerTeamMemberCard from './Shimmer/ShimmerTeamMemberCard';
import TeamMemberCard from './TeamMemberCard';

class About extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      error: false,
      teamMembers: [],
    };
  }

  // We can make this function async in order to handle API calls.
  async componentDidMount() {
    try {
      const response = await fetch(TEAM_MEMBERS_API);
      const responseData = await response.json();
      this.setState({ teamMembers: responseData });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, error, teamMembers } = this.state;
    return (
      <div className="mx-20">
        {/* Example: How to use context in a class component */}
        {/* <UserContext.Consumer>
          {(contextData) => (
            <h1 className="mb-10 text-center text-4xl font-bold text-slate-800">{`Hello, ${contextData.username} Thanks for Learning About Us`}</h1>
          )}
        </UserContext.Consumer>
         */}
        <h1 className="mb-6 text-center text-3xl font-bold">About PureFork</h1>
        <div className="mx-auto w-2/3 italic">
          <p className="mb-3">
            Welcome to PureFork – Your Trusted Food Delivery Partner!
          </p>
          <p className="mb-3">
            At PureFork, we believe great food brings people together. Founded
            with the vision of making quality meals accessible, we connect you
            with your favorite restaurants and cuisines, delivering fresh and
            delicious food right to your doorstep.
          </p>
          <p className="mb-3">
            With a seamless app, quick delivery, and a wide variety of options,
            PureFork is here to satisfy your cravings anytime, anywhere.
          </p>
          <p className="mb-3">
            Join us in our mission to make every meal a delightful experience!
          </p>
          <p className="mb-3 font-bold">
            PureFork – Fresh, Fast, and Flavorsome.
          </p>
        </div>
        <hr className="mx-auto my-6 w-4/5" />
        {/* This will be replaced by team member component */}
        <h2 className="text-center text-3xl font-bold">Team Members</h2>
        <div className="flex flex-wrap justify-evenly">
          {loading ? (
            Array.from({ length: 3 }, () => <ShimmerTeamMemberCard />)
          ) : error ? (
            <Error />
          ) : (
            teamMembers
              .slice(0, 3)
              .map((member) => (
                <TeamMemberCard key={member.id} memberData={member} />
              ))
          )}
        </div>
      </div>
    );
  }
}

export default About;
