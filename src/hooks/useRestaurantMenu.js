import { useParams } from 'react-router-dom';

import { RESTAURANT_MENU_API } from '../utils/constants';

import useFetch from './useFetch';

const useRestaurantMenu = () => {
  const { restaurantId } = useParams();
  return useFetch(RESTAURANT_MENU_API + restaurantId);
};

export default useRestaurantMenu;
