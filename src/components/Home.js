import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Skeleton } from '@mui/material';

import NoRestaurantFound from '../components/NoRestaurantFound';
// import UserContext from '../context/UserContext';
import useInternetStatus from '../hooks/useInternetStatus';
import { RESTAURANT_API } from '../utils/constants';

import Loading from './Loading';
import RestaurantCard, { restaurantCardOffer } from './RestaurantCard';
import ShimmerCard from './Shimmer/ShimmerCard';

const Home = () => {
  const restaurants = useRef([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // State those who change filtered restaurants state
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState([
    { active: false, name: 'Fast Delivery' },
    { active: false, name: 'Rating 4.5+' },
    { active: false, name: 'Pure Veg' },
    { active: false, name: 'Low to High' },
    { active: false, name: 'High to Low' },
  ]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  // Using custom hook to handle web application when there is no internet connection.
  const isOnline = useInternetStatus();

  // Using a logged-in user context for greeting heading
  // const userData = useContext(UserContext);

  useEffect(() => fetchRestaurants(), []);

  useEffect(() => {
    // Manage filtering of restaurant.
    setFilteredRestaurants(() => {
      // Deep copy of restaurant.
      const restaurantCopy = structuredClone(restaurants.current);
      if (filters[3].active) {
        // Sort the restaurants by price (low to high)
        restaurantCopy.sort((restaurantA, restaurantB) => {
          const costA = +restaurantA.costForTwo.split(' ')[0].slice(1);
          const costB = +restaurantB.costForTwo.split(' ')[0].slice(1);
          return costA - costB;
        });
      } else if (filters[4].active) {
        // Sort the restaurants by price (high to low)
        restaurantCopy.sort((restaurantA, restaurantB) => {
          const costA = +restaurantA.costForTwo.split(' ')[0].slice(1);
          const costB = +restaurantB.costForTwo.split(' ')[0].slice(1);
          return costB - costA;
        });
      }
      return restaurantCopy.filter((restaurant) => {
        let passed = true;
        filters.forEach((filter) => {
          if (!filter.active) return true;
          switch (filter.name) {
            case 'Fast Delivery':
              passed &&= restaurant.sla.deliveryTime <= 25;
              break;
            case 'Rating 4.5+':
              passed &&= restaurant.avgRating >= 4.5;
              break;
            case 'Pure Veg':
              passed &&= true;
              break;
            default:
              break;
          }
        });
        return passed;
      });
    });
  }, [filters, restaurants.current]);

  const fetchRestaurants = () => {
    fetch(RESTAURANT_API)
      .then((response) => response.json())
      .then((responseData) => {
        restaurants.current =
          responseData.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map(
            (restaurant) => restaurant.info
          );
      })
      .catch((error) => {
        console.log('Error fetching restaurant: ' + error.message);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  const toggleFilter = (activeIndex) => {
    setFilters(
      filters.map((filter, index) =>
        index === activeIndex
          ? { active: !filter.active, name: filter.name }
          : filter
      )
    );
  };

  // Using a higher order component (HOC)
  const RestaurantCardOffer = restaurantCardOffer(RestaurantCard);

  return error ? (
    <Error />
  ) : (
    <main className={`mx-auto w-4/5 ${isOnline ? 'grayscale-0' : 'grayscale'}`}>
      {/* Just for learning purpose (Learning React Context) */}

      {/* <h1 className="mb-10 text-center font-mono text-4xl font-bold tracking-tight text-slate-800">{`Hello, Good Morning ${userData.username}`}</h1> */}

      {/* Just for learning purpose (Learning React Context) */}
      <form className="mb-5 flex gap-5">
        <input
          data-testid="searchField"
          type="text"
          placeholder="Search Restaurants, Cuisines and Dishes..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          autoComplete="off"
          className="grow rounded border p-4 outline-none"
        />
        <button
          type="submit"
          className="transition-colors hover:text-orange-600"
          onClick={(event) => {
            event.preventDefault();
            setFilteredRestaurants(
              restaurants.current.filter(
                (restaurant) =>
                  restaurant.name
                    .toLowerCase()
                    .indexOf(searchText.toLowerCase()) !== -1 ||
                  restaurant.cuisines
                    .join('')
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
      </form>
      <aside className="sticky top-0 z-10 bg-white py-3">
        <h2 className="mb-2 ml-2 text-xl font-bold">
          Restaurants with online food delivery
        </h2>
        <section>
          {filters.map((filter, index) => (
            <button
              key={index}
              className={
                (filter.active ? 'active-filter-btn ' : '') +
                'filter-btn mr-1 px-3 py-1 last:m-0'
              }
              onClick={() => toggleFilter(index)}
            >
              {filter.name}
            </button>
          ))}
        </section>
      </aside>
      {filteredRestaurants.length && !loading === 0 ? (
        <NoRestaurantFound />
      ) : (
        <section className="grid grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 20 }, (_, index) => (
                <ShimmerCard key={index} />
              ))
            : // Giving index as a key prop is not recommended (even in react documentations).
              filteredRestaurants.map((restaurant) => (
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
              ))}
        </section>
      )}
    </main>
  );
};

export default Home;
