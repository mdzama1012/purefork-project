import { useState } from 'react';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useRestaurantMenu from '../hooks/useRestaurantMenu';

import AccordionItem from './AccordionItem';
import Error from './Error';
import Loading from './Loading';

const RestaurantMenu = () => {
  const [accordionIndex, setAccordionIndex] = useState(-1);
  // Custom hook
  const { data: restaurantMenu, loading, error } = useRestaurantMenu();
  const restaurantBasicData = restaurantMenu?.data?.cards[2].card?.card?.info;
  // Array of object containing categories of dishes (food).
  const categories =
    restaurantMenu?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (currCard) => {
        return (
          currCard.card.card['@type'] ===
          'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
        );
      }
    );
  return loading ? (
    <Loading />
  ) : error ? (
    <Error />
  ) : (
    <main>
      <section className="mx-auto mb-10 w-1/2 leading-7">
        <h1 className="mb-3 ml-3 text-2xl font-bold">
          {restaurantBasicData.name}
        </h1>
        <article className="rounded-xl border-2 border-slate-200 p-8">
          <h2 className="font-mono font-semibold">
            <FontAwesomeIcon icon={faStar} className="text-xl text-green-600" />
            <span> {restaurantBasicData.avgRating}</span>
            <span> ({restaurantBasicData.totalRatingsString})</span>
            <span className="text-gray-500"> &#8226; </span>
            <span> {restaurantBasicData.costForTwoMessage}</span>
          </h2>
          <h3>{restaurantBasicData.cuisines.join(', ')}</h3>
          <h3>
            <span className="tracking-tight">Nearest Outlet: </span>
            {` ${restaurantBasicData.areaName} - ${restaurantBasicData.sla?.lastMileTravelString}`}
          </h3>
          <h3>
            <span className="tracking-tight">Delivery Time: </span>
            {`${restaurantBasicData.sla?.minDeliveryTime} - ${restaurantBasicData.sla?.maxDeliveryTime} minutes`}
          </h3>
        </article>
      </section>
      <section className="mx-auto flex w-9/12 flex-col justify-center">
        <div className="text-center font-mono uppercase">Menu</div>
        {/* Accordion */}
        <div className="mx-auto my-5 w-4/5">
          {categories.map((category, index) => (
            <AccordionItem
              key={category?.card?.card?.title}
              category={category}
              showAccordionContent={accordionIndex === index}
              setAccordionIndex={() =>
                setAccordionIndex(accordionIndex === index ? -1 : index)
              }
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default RestaurantMenu;
