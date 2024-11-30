import { faFaceFrown } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NoRestaurantFound = () => {
  return (
    <div className="h-[50vh] py-12">
      <section>
        <h2 className="mx-auto mb-5 text-center text-4xl">
          <FontAwesomeIcon icon={faFaceFrown} />
        </h2>
        <p className="text-center text-gray-600">
          Sorry, we couldn't find any restaurants that match your criteria.
        </p>
      </section>
    </div>
  );
};

export default NoRestaurantFound;
