import { Skeleton } from '@mui/material';

const ShimmerMainHeading = () => {
  return (
    <div className="my-3">
      <Skeleton animation="wave" width="80%" height="4rem" />
    </div>
  );
};

export default ShimmerMainHeading;
