import React from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserContext from '../context/UserContext';
import { clearCart } from '../utils/cartSlice';

import OrderSummery from './OrderSummery';

const Cart = () => {
  const dishList = useSelector((store) => store.cart.dish);
  const { username } = useContext(UserContext);
  const dispatch = useDispatch();
  return (
    <section className="container mx-auto w-3/4">
      <header className="flex justify-between">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-800">
          🛒 {username}'s Cart
        </h1>
        <button
          className="rounded border-2 border-orange-600 px-4 font-mono hover:bg-orange-500 hover:text-white"
          onClick={() => {
            dispatch(clearCart());
          }}
        >
          CLEAR CART
        </button>
      </header>
      <OrderSummery dishList={dishList} />
    </section>
  );
};

export default Cart;
