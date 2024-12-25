import { Skeleton } from '@mui/material';

import ShimmerTextCard from './ShimmerTextCard';

const ShimmerTeamMemberCard = () => {
  return (
    <div className="py-14">
      <Skeleton variant="rectangular" width="50vh" height="50vh" />
      <div className="mx-auto my-1 w-1/2">
        <Skeleton variant="text" width="100%" />
      </div>
    </div>
  );
};

export default ShimmerTeamMemberCard;
