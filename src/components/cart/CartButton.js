import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Button from "../UI/button";
import classes from "./CartButton.module.css";
const CartButton = (props) => {
  const cartCtx = useContext(CartContext);

  return (
    <div>
      <Button onClick={props.onClick}>
        Cart <span className={classes.quantity}>  {cartCtx.totalAmount}</span>
      </Button>
    </div>
  );
};
export default CartButton;
