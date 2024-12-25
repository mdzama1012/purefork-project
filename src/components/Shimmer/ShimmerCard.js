import { Skeleton } from '@mui/material';

const ShimmerCard = () => {
  return (
    <div>
      <Skeleton animation="pulse" variant="rounded" height={175} />
      <Skeleton animation="wave" variant="text" width="90%" />
      <Skeleton animation="wave" variant="text" width="70%" />
      <Skeleton animation="wave" variant="text" width="70%" />
    </div>
  );
};

export default ShimmerCard;
