import React from "react";

function Carousel() {
  return (
    <>
      <div
        id="carouselExample"
        className="carousel slide fullscreen-carousel"
        data-bs-ride="carousel"
        data-bs-interval="2000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="carousel1.png"
              className="d-block w-100 carousel-img"
              alt="Slide 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="carousel2.png"
              className="d-block w-100 carousel-img"
              alt="Slide 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="carousel3.png"
              className="d-block w-100 carousel-img"
              alt="Slide 3"
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
    </>
  );
}

export default Carousel;
