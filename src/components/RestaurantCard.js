import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { CDN_URL } from "../utils/constants";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const RestaurantCard = ({ restaurantData }) => {
	const userData = useContext(UserContext);
	// Deconstructing the restaurant data.
	const { cloudinaryImageId, name, cuisines, avgRating, sla, areaName } =
		restaurantData;
	return (
		<div data-testid="restaurantCard" className="w-60 leading-6">
			<img
				className="h-40 w-full rounded-2xl object-cover"
				src={`${CDN_URL}${cloudinaryImageId}`}
				alt="Restaurant Image Not Available"
			/>
			<div className="p-2">
				<h3 className="truncate text-lg font-bold">{name}</h3>
				<h4 className="font-medium">
					<FontAwesomeIcon icon={faStar} className="text-green-600" />
					<span>
						{" "}
						{avgRating === undefined ? "Un-rated" : avgRating.toFixed(1)}
					</span>
					<span className="text-gray-500"> &#8226; </span>
					<span>
						{sla.slaString === undefined ? "Not Determined" : sla.slaString}
					</span>
				</h4>
				<h4 className="truncate tracking-tight text-slate-500">
					{cuisines.join(" | ")}
				</h4>
				<h4 className="truncate tracking-tight text-slate-500">{areaName}</h4>
			</div>
		</div>
	);
};

export const restaurantCardOffer = RestaurantCard => {
	return ({ restaurantData }) => {
		// Using the Nullish Coalescing Operator (??)
		const offerHeader = restaurantData.aggregatedDiscountInfoV3?.header ?? "";
		const offerSubHeader =
			restaurantData.aggregatedDiscountInfoV3?.subHeader ?? "";
		const labelText = `${offerHeader} ${offerHeader === "ITEMS" ? offerSubHeader : ""}`;
		return (
			<div className="relative">
				<span
					data-testid="offerLabel"
					className="absolute left-0 top-32 rounded-r-full bg-blue-600 px-2 text-sm font-semibold tracking-tighter text-white shadow-md"
				>
					{labelText}
				</span>
				<RestaurantCard restaurantData={{ ...restaurantData }} />
			</div>
		);
	};
};

export default RestaurantCard;
