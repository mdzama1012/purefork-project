import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Shimmer = () => {
  return (
    <section className="flex h-[75vh] items-center justify-center">
      <FontAwesomeIcon
        icon={faSpinner}
        className="animate-spin text-3xl text-orange-600"
      />
      <h1 className="ml-3 text-xl font-bold text-blue-600">Fetching Request</h1>
    </section>
  );
};

export default Shimmer;
