import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import About from "./components/About";
import RestaurantMenu from "./components/RestaurantMenu";
import Error from "./components/Error";
import Shimmer from "./components/Shimmer";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import AppNestedRoutes from "./AppNestedRoutes";
import ConnectionStatus from "./components/ConnectionStatus";
// import Grocery from './components/Grocery';

const Grocery = lazy(() => import("./components/Grocery"));

const App = () => {
	const [userData, setUserData] = useState("Guest");

	// Authentication logic here.
	useEffect(() => {
		// Call API with username and password.
		setTimeout(() => {
			setUserData("Mohd Zama");
		}, 5000);
	}, []);

	// Now to update this new information about user we use <Context.Provider>.
	return (
		<Provider store={appStore}>
			<UserContext.Provider value={{ username: userData, setUserData }}>
				<Header />
				<Outlet />
			</UserContext.Provider>
			<Footer />
			<ConnectionStatus />
		</Provider>
	);
};

// Creating a router configuration
const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ index: true, element: <Main /> },
			{ path: "/about", element: <About /> },
			{
				path: "/grocery",
				element: (
					<Suspense fallback={<Shimmer />}>
						<Grocery />
					</Suspense>
				),
			},
			{ path: "/restaurant/:restaurantId", element: <RestaurantMenu /> },
			{
				path: "/cart",
				element: <Cart />,
			},
		],
		errorElement: <Error />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<RouterProvider router={appRouter} />);
// In App_2 we are using another way of creating routes using react-router-dom.
root.render(<AppNestedRoutes />);
