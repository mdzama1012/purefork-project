import RestaurantCard from "../components/RestaurantCard";
import MOCK_DATA from "../../mocks/restaurantDataMock.json";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

test("Should render the RestaurantCard component with props data", () => {
	// We will use concept of mock data here.
	render(<RestaurantCard restaurantData={MOCK_DATA} />);

	const restaurantName = screen.getByText(
		"Leon's - Burgers & Wings (Leon Grill)"
	);
	expect(restaurantName).toBeInTheDocument();
});

test("Should render the RestaurantCard component with deals label", () => {});
