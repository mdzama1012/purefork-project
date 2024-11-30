import React from 'react';

import { faStar, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CDN_URL } from '../utils/constants';

const OrderSummery = ({ dishList }) => {
  return (
    <section className="h-[75vh] w-3/5 overflow-auto">
      {dishList.length === 0 ? (
        <div className="flex h-[75vh] items-center justify-center">
          <div>
            <h1 className="mb-3 text-2xl font-bold text-red-500">
              Cart Empty 🫙
            </h1>
            <p className="font-mono text-slate-500">
              Add Some Dishes to Cart Now!
            </p>
          </div>
        </div>
      ) : (
        dishList.map((dish) => (
          <section
            key={dish.id}
            className="flex justify-between border-b-2 p-5 last:border-none"
            data-testid="dishInCart"
          >
            {/* Image of the dish */}
            <figure className="w-1/5">
              <img
                src={`${CDN_URL}${dish.imageId}`}
                className="aspect-square rounded-xl object-cover shadow-md"
              />
            </figure>
            {/* Text content about dish */}
            <section className="w-3/4">
              <p className="text-xl font-semibold">{dish.name}</p>
              {dish.finalPrice ? (
                <>
                  <span className="tracking-tight text-slate-500 line-through">
                    ₹ {(dish.defaultPrice ?? dish.price) / 100}
                  </span>
                  <span className="font-semibold tracking-tight">
                    {' '}
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
                  {` ${dish?.ratings?.aggregatedRating?.rating ?? 'Un-rated'} `}
                </span>
                <span className="text-sm font-semibold tracking-tight">
                  ({dish?.ratings?.aggregatedRating?.ratingCountV2 ?? 0})
                </span>
              </p>
              <p className="line-clamp-2 leading-tight text-slate-500">
                {dish.description}
              </p>
            </section>
          </section>
        ))
      )}
    </section>
  );
};

export default OrderSummery;
