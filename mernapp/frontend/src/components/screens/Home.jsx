import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Card from "../Card";
import Carousel from "../Carousel";
import img1 from "../../static/img/lily-banse--YHSwy6uqvk-unsplash.jpg";
import img2 from "../../static/img/pexels-chetanvlad-1752506.jpg";
import img3 from "../../static/img/pexels-sheenawood-574111.jpg";

const Home = () => {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/fooddata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log(`FOOD_DATA_RES = ${JSON.stringify(response)}`);
    setFoodCategory(response.foodCategory);
    setFoodItems(response.foodItems);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      {/* <Carousel /> */}
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src={img1}
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={img2}
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={img3}
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCategory
          ? foodCategory.map((category, index1) => {
              return (
                <div className="row mb-3">
                  <div key={index1} className="fs- m-3">
                    {category.CategoryName}
                  </div>
                  <hr />
                  {foodItems ? (
                    foodItems
                      .filter(
                        (foodItem) =>
                          foodItem.CategoryName === category.CategoryName &&
                          foodItem.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      )
                      .map((filteredFoodItem, index2) => {
                        return (
                          <div
                            key={index2}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            {/* <div>{filteredFoodItem.name}</div> */}
                            {/* <Card
                              foodName={filteredFoodItem.name}
                              options={filteredFoodItem.options[0]}
                              imgSrc={filteredFoodItem.img}
                            /> */}
                            <Card
                              foodItem={filteredFoodItem}
                              options={filteredFoodItem.options[0]}
                              imgSrc={filteredFoodItem.img}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No such food exists</div>
                  )}
                </div>
              );
            })
          : ""}
        <Card />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
