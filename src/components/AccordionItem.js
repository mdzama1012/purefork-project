import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AccordionBody from './AccordionBody';

const AccordionItem = ({
  category,
  showAccordionContent,
  setAccordionIndex,
}) => {
  return (
    <div className="mb-3 rounded border shadow">
      <button
        className="flex w-full cursor-pointer justify-between px-4 py-3 hover:bg-slate-100"
        onClick={() => setAccordionIndex()}
        data-testid="accordionItem"
      >
        <span className="font-bold">
          {category?.card?.card?.title}
          <span className="font-mono">
            ({category?.card?.card?.itemCards?.length})
          </span>
        </span>
        <span>
          {showAccordionContent ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </span>
      </button>
      {showAccordionContent && <AccordionBody category={category} />}
    </div>
  );
};

export default AccordionItem;
