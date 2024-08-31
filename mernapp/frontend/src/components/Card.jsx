import React from "react";
// import img1 from "../static/img/lily-banse--YHSwy6uqvk-unsplash.jpg";
import { useCart, useDispatchCart } from "./ContextReducer";

const Card = (props) => {
  const options = props.options;
  let priceOptions;
  if (options) {
    priceOptions = Object.keys(options);
  }
  const handleAddToCart = () => {};
  let foodItem = props.foodItem;
  console.log("FOOD_ITEM_CARD_JSX = ", JSON.stringify(props));
  return (
    <div>
      <div
        className="card mt-3 "
        style={{ width: "19rem", maxHeight: "360px" }}
      >
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            <select className="m-2 h-100  bg-success rounded">
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100  bg-success rounded">
              {priceOptions &&
                priceOptions.map((option, index) => {
                  return (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  );
                })}
            </select>
            <hr></hr>
            <div className="d-inline h-100 fs-5">Total Price</div>
            <hr></hr>
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
