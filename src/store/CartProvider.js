import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { listItems: [], cartItems: [], totalAmount: 0 };
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.listItems.concat(action.item);
    const cartItem = state.cartItems;
    const amt = state.totalAmount;
    return {
      listItems: updatedItems,
      cartItems: cartItem,
      totalAmount: amt,
    };
  }

  if (action.type === "UPDATE") {
    const existingItemIndex = state.listItems.findIndex((item) => {
      return item.itemName === action.id;
    });

    const existingItem = state.listItems[existingItemIndex];
    const existingCartItem = state.cartItems[existingItemIndex];
    const amt = state.totalAmount + 1;
    let updatedItems = [];
    let updateCartItems = [];

    if (existingCartItem) {
      const updateCartItem = {
        ...existingCartItem,
        [action.target]: existingCartItem[action.target] + 1,
      };
      updateCartItems = [...state.cartItems];
      updateCartItems[existingItemIndex] = updateCartItem;
    } else {
      if (action.target === "itemSizeS") {
        const newExistingItem = {
          ...existingItem,
          [action.target]: 1,
        };
        updateCartItems = state.cartItems.concat(newExistingItem);
      }
    }

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        [action.target]: existingItem[action.target] - 1,
      };

      updatedItems = [...state.listItems];

      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      listItems: updatedItems,
      cartItems: updateCartItems,
      totalAmount: amt,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (itemobj) => {
    dispatchCartState({ type: "ADD", item: itemobj });
  };

  const updateItemFromCartHandler = (id, target) => {
    dispatchCartState({ type: "UPDATE", id: id, target: target });
  };
  const cartContext = {
    listItems: cartState.listItems,
    totalAmount: cartState.totalAmount,
    cartItems: cartState.cartItems,
    addItem: addItemToCartHandler,
    updateItem: updateItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
