import { Skeleton } from '@mui/material';

const ShimmerTextCard = () => {
  return (
    <div className="h-full w-full">
      <Skeleton animation="wave" width="50%" height="2rem"></Skeleton>
      <Skeleton animation="wave" width="30%" height="1rem"></Skeleton>
      <Skeleton animation="wave" width="100%" height="1rem"></Skeleton>
      <Skeleton animation="wave" width="100%" height="1rem"></Skeleton>
    </div>
  );
};

export default ShimmerTextCard;
