import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderSummery from "./OrderSummery";
import UserContext from "../utils/UserContext";
import { useContext } from "react";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
	const dishList = useSelector(store => store.cart.dish);
	const { username } = useContext(UserContext);
	const dispatch = useDispatch();
	return (
		<div className="container mx-auto w-3/4">
			<div className="flex justify-between">
				<h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-800">
					🛒{"  "}
					{username}'s Cart
				</h1>
				<button
					className="my-1 rounded-md border-[1.5px] border-orange-500 bg-transparent px-3 text-sm font-bold tracking-tight hover:bg-orange-50"
					onClick={() => {
						dispatch(clearCart());
					}}
				>
					CLEAR CART
				</button>
			</div>
			<hr className="mb-4"></hr>
			<OrderSummery dishList={dishList} />
		</div>
	);
};

export default Cart;
