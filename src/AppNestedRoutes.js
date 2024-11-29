import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import UserContext from "./utils/UserContext";
import Main from "./components/Main";
import About from "./components/About";
import BasicLayout from "./components/BasicLayout";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import Shimmer from "./components/Shimmer";

// import Grocery from './components/Grocery';
// Code splitting (lazy loading)
const Grocery = lazy(() => import("./components/Grocery"));

const AppNestedRoutes = () => {
	const [userData, setUserData] = useState("Guest");

	// Some authentication logic.
	useEffect(() => {
		setTimeout(() => {
			setUserData("Mohd Zama");
		}, 5000);
	}, []);

	// Now to update this new information about user we use <Context.Provider>
	return (
		<Provider store={appStore}>
			<UserContext.Provider value={{ username: userData, setUserData }}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<BasicLayout />}>
							<Route index element={<Main />} />
							<Route path="about" element={<About />} />
							<Route
								path="grocery"
								element={
									<Suspense fallback={<Shimmer />}>
										<Grocery />
									</Suspense>
								}
							/>
							<Route
								path="restaurant/:restaurantId"
								element={<RestaurantMenu />}
							/>
							<Route path="cart" element={<Cart />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</UserContext.Provider>
		</Provider>
	);
};

export default AppNestedRoutes;