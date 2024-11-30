import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import Header from '../components/Header';
import appStore from '../utils/appStore';

test('Should render the Header component', () => {
  // We need to provide the store to the header.
  // render(<Header />);
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  // const loginBtn = screen.getAllByRole('button');
  // expect(loginBtn.length).toBe(1);

  const loginBtn = screen.getByRole('button', { name: 'SignIn' });
  expect(loginBtn).toBeInTheDocument();
});

test('Should render the Header component with 0 items in cart', () => {
  render(
    <Provider store={appStore}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );

  // We can also use regex inside the getByText string.
  const cartItems = screen.getByText('Cart - 0');
  expect(cartItems).toBeInTheDocument();
});

test('Should change the Login button to Logout when clicked', () => {
  render(
    <Provider store={appStore}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );

  const loginBtn = screen.getByRole('button', { name: 'SignIn' });
  fireEvent.click(loginBtn);
  const logoutBtn = screen.getByRole('button', { name: 'SignOut' });
  expect(logoutBtn).toBeInTheDocument();
});
