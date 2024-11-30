import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import RestaurantCard, {
  restaurantCardOffer,
} from '../components/RestaurantCard';
import MOCK_DATA from '../mocks/restaurantDataMock.json';

test('Should render the RestaurantCard component with props data', () => {
  // We will use concept of mock data here.
  render(<RestaurantCard restaurantData={MOCK_DATA} />);

  const restaurantName = screen.getByText(
    "Leon's - Burgers & Wings (Leon Grill)"
  );
  expect(restaurantName).toBeInTheDocument();
});
