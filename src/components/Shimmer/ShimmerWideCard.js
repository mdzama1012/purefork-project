import { Skeleton } from '@mui/material';

import ShimmerTextCard from './ShimmerTextCard';

const ShimmerWideCard = () => {
  return (
    <div className="mb-3 flex w-full items-start gap-3">
      <Skeleton animation="wave" variant="rounded" width="20%" height={100} />
      <ShimmerTextCard />
    </div>
  );
};

export default ShimmerWideCard;
