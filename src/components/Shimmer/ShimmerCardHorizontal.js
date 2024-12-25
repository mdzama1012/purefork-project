import { Skeleton } from '@mui/material';

import ShimmerTextCard from './ShimmerTextCard';

const ShimmerCardHorizontal = () => {
  return (
    <div className="flex w-full gap-3">
      <Skeleton animation="pulse" variant="rounded" width="25%" height={100} />
      <ShimmerTextCard />
    </div>
  );
};

export default ShimmerCardHorizontal;
