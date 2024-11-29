import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faStar } from "@fortawesome/free-solid-svg-icons";
import { CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const OrderSummery = ({ dishList }) => {
	return (
		<div className="h-[80vh] w-3/5 overflow-auto">
			{dishList.length === 0 ? (
				<div className="flex h-full items-center justify-center">
					<div>
						<h1 className="my-3 text-3xl font-bold text-red-600">
							Cart Empty 🫙
						</h1>
						<p className="font-mono text-xl text-slate-600">
							Add Some Dishes to Cart Now!
						</p>
					</div>
				</div>
			) : (
				dishList.map(dish => (
					<div
						key={dish.id}
						className="flex justify-between border-b-2 p-5 last:border-none"
						data-testid="dishInCart"
					>
						{/* Image of the dish */}
						<div className="w-1/5">
							<img
								src={`${CDN_URL}${dish.imageId}`}
								className="aspect-square rounded-xl object-cover shadow-md"
							></img>
						</div>
						{/* Text content about dish */}
						<div className="w-3/4">
							<p className="text-xl font-semibold">{dish.name}</p>
							{dish.finalPrice ? (
								<>
									<span className="tracking-tight text-slate-500 line-through">
										₹ {(dish.defaultPrice ?? dish.price) / 100}
									</span>
									<span className="font-semibold tracking-tight">
										{" "}
										₹ {dish.finalPrice / 100}
									</span>
								</>
							) : (
								<span className="font-semibold tracking-tight">
									₹ {(dish.defaultPrice ?? dish.price) / 100}
								</span>
							)}
							<span className="text-xs">
								{dish?.offerTags?.at(0)?.title && (
									<>
										<FontAwesomeIcon
											icon={faTag}
											className="ml-2 text-green-600"
										/>
										<span className="font-bold tracking-wide text-gray-500">
											{` ${dish.offerTags[0].title} ${dish.offerTags[0].subTitle}`}
										</span>
									</>
								)}
							</span>
							<p className="mb-3 mt-2">
								<span className="text-sm font-bold tracking-tight text-green-600">
									<FontAwesomeIcon icon={faStar} />
									{` ${dish?.ratings?.aggregatedRating?.rating ?? "Un-rated"} `}
								</span>
								<span className="text-sm font-semibold tracking-tight">
									({dish?.ratings?.aggregatedRating?.ratingCountV2 ?? 0})
								</span>
							</p>
							<p className="line-clamp-2 leading-tight text-slate-500">
								{dish.description}
							</p>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default OrderSummery;
