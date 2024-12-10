import { act } from 'react';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import Home from '../components/Home';
import MOCK_RESPONSE from '../mocks/restaurantsMockResponse.json';

// Faking an API call.
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_RESPONSE);
    },
  });
});

test('Should render search input field and search button', async () => {
  // When ever using state updates or fetch inside the component wrap it in the act() method.
  await act(async () =>
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  );
  const searchBtn = screen.getAllByRole('button');
  const searchField = screen.getByRole('textbox');
  expect(searchBtn[0]).toBeInTheDocument();
  expect(searchField).toBeInTheDocument();
});

test('Should render all 20 restaurants', async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  );
  const restaurantsList = screen.getAllByTestId('restaurantCard');
  expect(restaurantsList.length).toBe(20);
});

test('Should filter the restaurant that offers pizza, using search functionality', async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  );
  // Another way of selecting search field.
  const searchField = screen.getByTestId('searchField');
  const searchBtn = screen.getAllByRole('button');

  // Enter "pizza" in search field and click on search button.
  fireEvent.change(searchField, { target: { value: 'pizza' } });
  fireEvent.click(searchBtn[0]);

  // After the search, number of restaurant card must be 3.
  const restaurantsAfterSearch = screen.getAllByTestId('restaurantCard');
  expect(restaurantsAfterSearch.length).toBe(3);
});

test('Should filter the restaurant that offers burger, using search functionality', async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  );
  const searchField = screen.getByTestId('searchField');
  const searchBtn = screen.getAllByRole('button');

  // Enter "burger" in search field and click on search button.
  fireEvent.change(searchField, { target: { value: 'burger' } });
  fireEvent.click(searchBtn[0]);

  // After the search, number of restaurant card must be 2.
  const restaurantsAfterSearch = screen.getAllByTestId('restaurantCard');
  expect(restaurantsAfterSearch.length).toBe(2);
});

test('Should render the RestaurantCard component with offer label', async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  );
  const restaurantWithOfferLabel = screen.getAllByTestId('offerLabel');
  expect(restaurantWithOfferLabel.length).toBe(17);
});
