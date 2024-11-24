import AccordionBody from "./AccordionBody";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const AccordionItem = ({
	category,
	showAccordionContent,
	setAccordionIndex,
}) => {
	return (
		<div className="mb-3 rounded-md border shadow-sm">
			<div
				className="flex cursor-pointer justify-between px-5 py-3 hover:bg-slate-100"
				onClick={() => setAccordionIndex()}
				data-testid="accordionItem"
			>
				<span className="font-bold">
					{category?.card?.card?.title} (
					{category?.card?.card?.itemCards?.length})
				</span>
				<span>
					{showAccordionContent ? (
						<FontAwesomeIcon icon={faChevronUp} />
					) : (
						<FontAwesomeIcon icon={faChevronDown} />
					)}
				</span>
			</div>
			{showAccordionContent && <AccordionBody category={category} />}
		</div>
	);
};

export default AccordionItem;
