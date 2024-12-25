import useFetch from '../hooks/useFetch';
import { GITHUB_USER_API, TEAM_MEMBERS_API } from '../utils/constants';

import ShimmerTeamMemberCard from './Shimmer/ShimmerTeamMemberCard';

const TeamMemberCard = (props) => {
  const { memberData } = props;
  const {
    data: userData,
    loading,
    error,
  } = useFetch(TEAM_MEMBERS_API + memberData.id);

  console.log(userData);

  return loading ? (
    <ShimmerTeamMemberCard />
  ) : error ? (
    <Error />
  ) : (
    <article className="flex flex-col items-center gap-3 pt-14">
      <img
        src={userData.avatar}
        alt="Team member"
        className="h-[50vh] rounded-xl border border-slate-300 shadow"
      />
      <h3 className="text-xl">{userData.name}</h3>
    </article>
  );
};

export default TeamMemberCard;
