import { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import RestaurantMenu from "./components/RestaurantMenu";
import Error from "./components/Error";
import Shimmer from "./components/Shimmer";
import UserContext from "./context/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import BasicLayout from "./components/BasicLayout";

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
		path: "/",
		element: <BasicLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "/about", element: <About /> },
			{
				path: "/cart",
				element: <Cart />,
			},
			{
				path: "/grocery",
				element: (
					<Suspense fallback={<Shimmer />}>
						<Grocery />
					</Suspense>
				),
			},
			{ path: "/restaurant/:restaurantId", element: <RestaurantMenu /> },
		],
		errorElement: <Error />,
	},
]);

export default App;
