import { Suspense, lazy, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import About from './components/About';
import BasicLayout from './components/BasicLayout';
import Cart from './components/Cart';
import Home from './components/Home';
import RestaurantMenu from './components/RestaurantMenu';
import Shimmer from './components/Shimmer';
import UserContext from './context/UserContext';
import appStore from './utils/appStore';

// import Grocery from './components/Grocery';
const Grocery = lazy(() => import('./components/Grocery'));

const App_2 = () => {
  const [userData, setUserData] = useState('Guest');

  // Some authentication logic.
  useEffect(() => {
    setTimeout(() => {
      setUserData('Mohd Zama');
    }, 5000);
  }, []);

  // Now to update this new information about user we use <Context.Provider>
  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ username: userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BasicLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route
                path="grocery"
                element={
                  <Suspense fallback={<Shimmer />}>
                    <Grocery />
                  </Suspense>
                }
              />
              <Route path="restaurant/:restaurantId" element={<RestaurantMenu />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </Provider>
  );
};

export default App_2;
