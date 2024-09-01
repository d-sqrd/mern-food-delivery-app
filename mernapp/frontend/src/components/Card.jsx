import React, { useEffect, useRef, useState } from "react";
// import img1 from "../static/img/lily-banse--YHSwy6uqvk-unsplash.jpg";
import { useCart, useDispatchCart } from "./ContextReducer";

const Card = (props) => {
  const { foodItem, options } = props;
  const priceRef = useRef();
  let dispatch = useDispatchCart();
  let data = useCart();
  console.log("FOOD_ITEM_CARD_JSX = ", foodItem?.CategoryName);
  let priceOptions;
  if (options) {
    priceOptions = Object.keys(options);
  }

  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState("");
  const handleAddToCart = async () => {
    await dispatch({
      type: "ADD",
      id: foodItem?._id,
      name: foodItem?.name,
      img: foodItem?.img,
      price: foodItem?.price,
      quantity: quantity,
      size: size,
    });
    console.log("DATA", data);
  };
  // let foodItem = props.foodItem;
  let finalPrice = quantity * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div
        className="card mt-3 "
        style={{ width: "19rem", maxHeight: "360px" }}
      >
        <img
          src={foodItem?.img}
          // src={props.imgSrc}
          className="card-img-top"
          alt="..."
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          {/* <h5 className="card-title">{props.foodName}</h5> */}
          <h5 className="card-title">{foodItem?.name}</h5>
          <div className="container w-100">
            <select
              className="m-2 h-100  bg-success rounded"
              onChange={(e) => setQuantity(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100  bg-success rounded"
              onChange={(e) => setSize(e.target.value)}
              ref={priceRef}
            >
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
            <div className="d-inline h-100 fs-5">
              Total Price = {finalPrice}
            </div>
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
