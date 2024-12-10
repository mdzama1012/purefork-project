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
    <section className="mx-auto w-3/4">
      <header className="mb-4 flex items-baseline justify-between">
        <h1 className="text-3xl font-bold text-slate-800">
          🛒 {username}'s Cart
        </h1>
        <button
          className="secondary-btn hover:primary-btn px-3 py-1"
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
