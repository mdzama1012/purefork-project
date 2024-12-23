import { Skeleton } from '@mui/material';

const ShimmerCard = () => {
  return (
    <div>
      <Skeleton animation="wave" variant="rounded" height={175} />
      <Skeleton animation="wave" variant="text" width="100%" />
      <Skeleton animation="wave" variant="text" width="80%" />
      <Skeleton animation="wave" variant="text" width="80%" />
    </div>
  );
};

export default ShimmerCard;
