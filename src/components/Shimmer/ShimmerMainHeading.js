import { Skeleton } from '@mui/material';

const ShimmerMainHeading = () => {
  return (
    <div className="my-4">
      <Skeleton animation="pulse" width="60%" height="4rem" />
    </div>
  );
};

export default ShimmerMainHeading;
