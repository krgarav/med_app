import React, { useContext, useRef } from "react";
import Input from "../UI/input";
import Button from "../UI/button";
import classes from "./InputItemForm.module.css";
import CartContext from "../../store/cart-context";
const InputItemForm = (props) => {
  const cartCtx = useContext(CartContext);
  const productName = useRef();
  const productDescription = useRef();
  const productPrice = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const itemName = productName.current.value;
    const itemPrice = productPrice.current.value;
    const itemDescription = productDescription.current.value;

    const itemobj = {
      itemName: itemName,
      itemPrice: itemPrice,
      itemDescription: itemDescription,
    };
    cartCtx.addItem(itemobj);
  };
  return (
    <div className={classes.box}>
      <h1>Med App</h1>
      <form onSubmit={submitHandler}>
        <span className={classes["input-items"]}>
          <span>
            <Input ref={productName} label="Medicine Name" type="text" />
          </span>
          <span>
            {" "}
            <Input ref={productDescription} label="Description" type="text" />
          </span>
          <span>
            {" "}
            <Input ref={productPrice} label="Price" type="number" />
          </span>
        </span>

        <Button>Add Product</Button>
      </form>
    </div>
  );
};

export default InputItemForm;
