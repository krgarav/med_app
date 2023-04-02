import React, { useContext } from "react";
import Card from "../UI/Card";
import classes from "./ListData.module.css";
import CartContext from "../../store/cart-context";
const ListData = (props) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (item1) => {
    const id = item1.currentTarget.parentNode.firstChild.textContent;
    cartCtx.updateItem(id, "itemSizeS");
  };

  const listLength = cartCtx.listItems.length;
  const cartItems = cartCtx.listItems.map((item) => {
    return (
      <li key={item.itemName}>
        <div className={classes.box}>
          <span className={classes.name}>{item.itemName}</span>
          <span className={classes.desc}>{item.itemDescription}</span>
          <span>{item.itemPrice}</span>
          <button onClick={addToCartHandler}>
            {" "}
            <input
              type="number"
              min="1"
              max="10"
              step="1"
              defaultValue="1"
            ></input>{" "}
            Add to Cart
          </button>
        </div>
      </li>
    );
  });

  return (
    <React.Fragment>
      {listLength > 0 && (
        <Card className={classes.wrap}>
          <ul>{cartItems}</ul>
        </Card>
      )}
    </React.Fragment>
  );
};

export default ListData;
