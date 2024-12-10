import { Suspense, lazy, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import About from './components/About';
import BasicLayout from './components/BasicLayout';
import Cart from './components/Cart';
import Error from './components/Error';
import Home from './components/Home';
import Loading from './components/Loading';
import RestaurantMenu from './components/RestaurantMenu';
import UserContext from './context/UserContext';
import appStore from './utils/appStore';

// import Grocery from './components/Grocery';
const Grocery = lazy(() => import('./components/Grocery'));

const App = () => {
  const [userData, setUserData] = useState('Guest');

  // Authentication logic here.
  useEffect(() => {
    // Call API with username and password.
    setTimeout(() => {
      setUserData('Mohd Zama');
    }, 5000);
  }, []);

  // Now to update this new information about user we use <Context.Provider>.
  return (
    <Provider store={appStore}>
      {/* Binding the context with state variable. */}
      <UserContext.Provider value={{ username: userData, setUserData }}>
        <RouterProvider router={appRouter}></RouterProvider>
      </UserContext.Provider>
    </Provider>
  );
};

// Creating a router configuration
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/about', element: <About /> },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/grocery',
        element: (
          <Suspense fallback={<Loading />}>
            <Grocery />
          </Suspense>
        ),
      },
      { path: '/restaurant/:restaurantId', element: <RestaurantMenu /> },
    ],
    errorElement: <Error />,
  },
]);

export default App;
