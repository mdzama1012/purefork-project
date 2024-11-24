import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import AccordionItem from "./AccordionItem";

const RestaurantMenu = () => {
	const [accordionIndex, setAccordionIndex] = useState(-1);
	// Custom hook
	const restaurantMenu = useRestaurantMenu();
	const restaurantBasicData = restaurantMenu?.cards[2].card?.card?.info;
	// Array of object containing categories of dishes (food).
	const categories =
		restaurantMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
			currCard => {
				return (
					currCard.card.card["@type"] ===
					"type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
				);
			}
		);
	return restaurantMenu === null ? (
		<Shimmer />
	) : (
		<>
			<div className="mx-auto w-1/2 leading-7">
				<h2 className="mb-3 ml-3 text-2xl font-extrabold">
					{restaurantBasicData.name}
				</h2>
				<div className="rounded-3xl border-2 p-8">
					<h3 className="font-bold">
						<FontAwesomeIcon icon={faStar} className="text-green-700" />
						<span> {restaurantBasicData.avgRating}</span>
						<span> ({restaurantBasicData.totalRatingsString})</span>
						<span className="text-gray-500"> &#8226; </span>
						<span> {restaurantBasicData.costForTwoMessage}</span>
					</h3>
					<h3>{restaurantBasicData.cuisines.join(", ")}</h3>
					<h4>
						<span className="tracking-tight">Nearest Outlet: </span>
						{` ${restaurantBasicData.areaName} - ${restaurantBasicData.sla?.lastMileTravelString}`}
					</h4>
					<h4>
						<span className="tracking-tight">Delivery Time: </span>
						{`${restaurantBasicData.sla?.minDeliveryTime} - ${restaurantBasicData.sla?.maxDeliveryTime} minutes`}
					</h4>
				</div>
			</div>
			<div className="mx-auto my-10 flex w-9/12 flex-col justify-center">
				<div className="p-2 text-center text-sm text-slate-500">M E N U</div>
				<hr></hr>
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
			</div>
		</>
	);
};

export default RestaurantMenu;
