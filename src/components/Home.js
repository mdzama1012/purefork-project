// Recommended Import Order:
// 1. React imports (e.g., useEffect, useState, etc.)
// 2. Third-party libraries (e.g., axios, lodash, react-router-dom, etc.)
// 3. Absolute imports from your project (if using absolute paths, e.g., src/components/...)
// 4. Local utility/constants imports (e.g., import { API_URL } from '../utils/constants';)
// 5. Local components (e.g., import Header from './Header';)
// 6. Stylesheets (import './App.css';)
// Note: Separate each group with a blank line to improve readability.

import { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { RESTAURANT_API } from "../utils/constants";
import Shimmer from "./Shimmer";
import RestaurantCard, { restaurantCardOffer } from "./RestaurantCard";
import useInternetStatus from "../hooks/useInternetStatus";
import UserContext from "../context/UserContext";

const Home = () => {
	// Local state variable - Super powerful variable given by React.
	const [originalRestaurants, setOriginalRestaurants] = useState([]); // Reason why this is a state rather then a normal JS variable.
	const [allRestaurants, setAllRestaurants] = useState([]);
	const [filteredRestaurants, setFilteredRestaurants] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [filters, setFilters] = useState([
		{ active: false, name: "Fast Delivery" },
		{ active: false, name: "Rating 4.5+" },
		{ active: false, name: "Pure Veg" },
		{ active: false, name: "Low to High" },
		{ active: false, name: "High to Low" },
	]);

	// Using a logged in user context for greeting.
	const userData = useContext(UserContext);

	// Using custom hook to handle web application when there is no internet connection.
	const isOnline = useInternetStatus();

	// Using a higher order component.
	const RestaurantCardOffer = restaurantCardOffer(RestaurantCard);

	useEffect(() => {
		fetchRestaurants();
	}, []);

	useEffect(() => {
		setFilteredRestaurants(
			allRestaurants.filter(restaurant => {
				let filterTest = true;
				filters.forEach(filter => {
					if (filter.active)
						switch (filter.name) {
							case "Fast Delivery":
								filterTest &&= restaurant.sla.deliveryTime <= 25;
								break;
							case "Rating 4.5+":
								filterTest &&= restaurant.avgRating >= 4.5;
								break;
							case "Pure Veg":
								filterTest &&= restaurant.veg;
								break;
						}
				});
				return filterTest;
			})
		);
	}, [filters]);

	const fetchRestaurants = async () => {
		try {
			const res = await fetch(RESTAURANT_API);
			const resData = await res.json();
			// Array of info object of each restaurant.
			let restaurantArray =
				resData.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map(
					restaurant => restaurant.info
				);
			setAllRestaurants(restaurantArray);
			setFilteredRestaurants(restaurantArray);
			setOriginalRestaurants(restaurantArray);
		} catch (error) {
			console.log("Error fetching data: ");
			console.log(error);
		}
	};

	const toggleFilter = index => {
		if (
			filters[index].name === "Low to High" ||
			filters[index].name === "High to Low"
		) {
			setAllRestaurants(
				filters[index].active
					? originalRestaurants
					: allRestaurants.toSorted((restaurantA, restaurantB) => {
							const costStringA = restaurantA.costForTwo.split(" ")[0];
							const costA = +costStringA.slice(1);
							const costStringB = restaurantB.costForTwo.split(" ")[0];
							const costB = +costStringB.slice(1);
							return filters[index].name === "Low to High"
								? costA - costB
								: costB - costA;
						})
			);
		}
		setFilters(
			filters.map((filter, currIndex) => {
				if (index === currIndex) filter.active = 1 ^ filter.active;
				return filter;
			})
		);
	};

	// Conditional rendering
	return allRestaurants.length === 0 ? (
		// Shimmer effect for better UX
		<Shimmer />
	) : (
		<div className={`mx-auto w-4/5 ${isOnline ? "grayscale-0" : "grayscale"}`}>
			{/* Just for learning purpose (Learning React Context) */}

			{/* <h1 className="mb-10 text-center font-mono text-4xl font-bold tracking-tight text-slate-800">{`Hello, Good Morning ${userData.username}`}</h1> */}

			{/* Just for learning purpose (Learning React Context) */}
			<div className="mb-5 flex gap-5">
				<input
					data-testid="searchField"
					type="text"
					placeholder="Search Restaurants, Cuisines and Dishes..."
					value={searchText}
					onChange={event => setSearchText(event.target.value)}
					autoComplete="off"
					className="grow rounded-sm border p-4 font-semibold outline-none"
				/>
				<button
					type="submit"
					className="transition-colors hover:text-orange-500"
					onClick={() => {
						setFilteredRestaurants(
							allRestaurants.filter(
								restaurant =>
									restaurant.name
										.toLowerCase()
										.indexOf(searchText.toLowerCase()) !== -1 ||
									restaurant.cuisines
										.join("")
										.toLowerCase()
										.indexOf(searchText.toLowerCase()) !== -1
							)
						);
					}}
				>
					<FontAwesomeIcon icon={faSearch} className="h-7 w-7" />
				</button>
				{/* Just for learning purpose (Learning React Context) */}

				{/* <input
					type="text"
					id="context-learn"
					name="context-learn"
					placeholder="Learning React Context..."
					value={userData.username}
					onInput={event => userData.setUserData(event.target.value)}
					autoComplete="off"
					className="grow rounded-sm border-[1.5px] p-3 font-semibold focus:outline-none"
				/> */}

				{/* Just for learning purpose (Learning React Context) */}
			</div>
			<div className="sticky top-0 z-10 bg-white py-4">
				<h2 className="mb-2 ml-2 text-2xl font-bold">
					Restaurants with online food delivery
				</h2>
				<div className="flex gap-1">
					{filters.map((filter, index) => (
						<div
							key={index}
							className={
								(filter.active ? "border-slate-400 bg-slate-200 " : "") +
								"cursor-pointer rounded-full border-[1.5px] border-slate-300 px-3 py-1 tracking-tighter"
							}
							onClick={() => toggleFilter(index)}
						>
							{filter.name}
						</div>
					))}
				</div>
			</div>
			<div className="grid grid-cols-4 gap-5">
				{
					// Giving index as a key prop is not recommended (even in react documentations).
					filteredRestaurants.map(restaurant => (
						<Link
							key={restaurant.id}
							to={`/restaurant/${restaurant.id}`}
							className="transition-transform hover:scale-95"
						>
							{restaurant.aggregatedDiscountInfoV3 ? (
								<RestaurantCardOffer restaurantData={restaurant} />
							) : (
								<RestaurantCard restaurantData={restaurant} />
							)}
						</Link>
					))
				}
			</div>
		</div>
	);
};

export default Home;
