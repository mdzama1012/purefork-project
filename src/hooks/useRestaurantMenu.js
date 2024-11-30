import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RESTAURANT_MENU_API } from '../utils/constants';

const useRestaurantMenu = () => {
  const [restaurantMenu, setRestaurantMenu] = useState(null);
  const { restaurantId } = useParams();

  useEffect(() => {
    fetch(RESTAURANT_MENU_API + restaurantId)
      .then((response) => response.json())
      .then((response) => setRestaurantMenu(response.data))
      .catch((error) => console.log('Error fetching data:', error));
  }, []);

  return restaurantMenu;
};

export default useRestaurantMenu;
