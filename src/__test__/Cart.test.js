import { act } from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import appStore from "../utils/appStore";
import RestaurantMenu from "../components/RestaurantMenu";
import Cart from "../components/Cart";
import Header from "../components/Header";
import MOCK_RESTAURANT_MENU_RESPONSE from "../mocks/restaurantMenuMockResponse.json";
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve(MOCK_RESTAURANT_MENU_RESPONSE),
	})
);

test("Should render restaurant's basic information card", async () => {
	await act(async () => render(<RestaurantMenu />));
	const restaurantName = screen.getByText("KFC");
	expect(restaurantName).toBeInTheDocument();
});

test("Should render all the menu category", async () => {
	await act(async () => render(<RestaurantMenu />));
	const accordionItem = screen.getAllByTestId("accordionItem");
	expect(accordionItem.length).toBe(16);
});

test("Should open the AccordionBody by clicking on the AccordionItem", async () => {
	await act(async () =>
		render(
			<Provider store={appStore}>
				<RestaurantMenu />
			</Provider>
		)
	);
	// Accordion Item = Dish Category.
	const accordionItem = screen.getAllByTestId("accordionItem");
	fireEvent.click(accordionItem[1]);
	const dishList = screen.getAllByTestId("dish");
	expect(dishList.length).toBe(5);
});

test("Should add the dish to cart, by clicking on the ADD button", async () => {
	await act(async () =>
		render(
			<Provider store={appStore}>
				<BrowserRouter>
					<Header />
					<RestaurantMenu />
				</BrowserRouter>
			</Provider>
		)
	);
	// Open the accordion item.
	const accordionItem = screen.getAllByTestId("accordionItem");
	fireEvent.click(accordionItem[1]);
	const addButtonList = screen.getAllByRole("button", { name: "ADD" });
	fireEvent.click(addButtonList[0]);
	const updatedCart = screen.getByText("Cart - 1 items");
	expect(updatedCart).toBeInTheDocument();
});

test("Should add multiple dishes to the cart using ADD button", async () => {
	await act(async () =>
		render(
			<Provider store={appStore}>
				<BrowserRouter>
					<Header />
					<RestaurantMenu />
				</BrowserRouter>
			</Provider>
		)
	);
	// Open the accordion item.
	const accordionItem = screen.getAllByTestId("accordionItem");
	fireEvent.click(accordionItem[1]);
	const addButtonList = screen.getAllByRole("button", { name: "ADD" });
	fireEvent.click(addButtonList[1]);
	fireEvent.click(addButtonList[2]);
	const updatedCart = screen.getByText("Cart - 3 items");
	expect(updatedCart).toBeInTheDocument();
});

test("Should check the added dishes on cart page", async () => {
	await act(async () =>
		render(
			<Provider store={appStore}>
				<Cart />
			</Provider>
		)
	);
	const dishInCart = screen.getAllByTestId("dishInCart");
	expect(dishInCart.length).toBe(3);
});
