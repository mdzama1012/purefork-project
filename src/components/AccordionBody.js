import { useDispatch } from 'react-redux';

import { faStar, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { addItem } from '../utils/cartSlice';
import { CDN_URL } from '../utils/constants';

const AccordionBody = ({ category }) => {
  // Handle the Adding of Item to the cart (cart slice)
  const dispatch = useDispatch();
  const handleAddItem = (dish) => {
    dispatch(addItem(dish));
  };

  // Array of dishes with multiple details about the dish.
  const dishes = category?.card?.card?.itemCards?.map((dish) => dish?.card?.info);
  return (
    <div className="px-5">
      {dishes.map((dish) => (
        <div
          key={dish.id}
          className="flex justify-between border-b-[1.5px] p-7 last:border-none"
          data-testid="dish"
        >
          {/* Text content about dish */}
          <div className="w-4/5 pr-5">
            <p className="text-xl font-semibold">{dish.name}</p>
            {dish.finalPrice ? (
              <>
                <span className="tracking-tight text-slate-500 line-through">
                  ₹ {(dish.defaultPrice ?? dish.price) / 100}
                </span>
                <span className="font-semibold tracking-tight"> ₹ {dish.finalPrice / 100}</span>
              </>
            ) : (
              <span className="font-semibold tracking-tight">
                ₹ {(dish.defaultPrice ?? dish.price) / 100}
              </span>
            )}
            <span className="text-xs">
              {dish?.offerTags?.at(0)?.title && (
                <>
                  <FontAwesomeIcon icon={faTag} className="ml-2 text-green-600" />
                  <span className="font-bold tracking-wide text-gray-500">
                    {` ${dish.offerTags[0].title} ${dish.offerTags[0].subTitle}`}
                  </span>
                </>
              )}
            </span>
            <p className="mb-3 mt-2">
              <span className="text-sm font-bold tracking-tight text-green-600">
                <FontAwesomeIcon icon={faStar} />
                {` ${dish?.ratings?.aggregatedRating?.rating ?? 'Un-rated'} `}
              </span>
              <span className="text-sm font-semibold tracking-tight">
                ({dish?.ratings?.aggregatedRating?.ratingCountV2 ?? 0})
              </span>
            </p>
            <p className="line-clamp-2 leading-tight text-slate-500">{dish.description}</p>
          </div>
          {/* Image of the dish */}
          <div className="relative w-1/5">
            <img
              src={`${CDN_URL}${dish.imageId}`}
              className="aspect-square rounded-2xl object-cover drop-shadow-md"
            ></img>
            <button
              className="absolute left-8 top-32 rounded-md border border-green-600 bg-green-50 px-7 py-1 font-extrabold tracking-tight text-green-600 shadow-md hover:bg-green-100"
              onClick={() => handleAddItem(dish)}
            >
              ADD
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionBody;
