import { render, screen, act, fireEvent } from "@testing-library/react";
import Main from "../components/Main";
import MOCK_RESPONSE from "../../mocks/restaurantsMockResponse.json";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
	return Promise.resolve({
		json: () => {
			return Promise.resolve(MOCK_RESPONSE);
		},
	});
});

test("Should render search input field and search button", async () => {
	// When ever using state updates or fetch inside the component wrap it in the act() method.
	await act(async () =>
		render(
			<BrowserRouter>
				<Main />
			</BrowserRouter>
		)
	);
	const searchBtn = screen.getByRole("button");
	const searchField = screen.getByRole("textbox");
	expect(searchBtn).toBeInTheDocument();
	expect(searchField).toBeInTheDocument();
});

test("Should filter restaurants, offering pizza using search functionality", async () => {
	await act(async () =>
		render(
			<BrowserRouter>
				<Main />
			</BrowserRouter>
		)
	);

	// Check the restaurant cards before search.
	const restaurantsBeforeSearch = screen.getAllByTestId("restaurantCard");

	expect(restaurantsBeforeSearch.length).toBe(20);

	// Another ways of extracting the search input field.
	const searchField = screen.getByTestId("searchField");
	const searchBtn = screen.getByRole("button");

	// Enter "pizza" in the search input field.
	fireEvent.change(searchField, { target: { value: "pizza" } });

	// Click on the search button.
	fireEvent.click(searchBtn);

	// Check the filtered restaurant cards.
	const restaurantsAfterSearch = screen.getAllByTestId("restaurantCard");

	// Should have 3 restaurant cards.
	expect(restaurantsAfterSearch.length).toBe(3);
});
