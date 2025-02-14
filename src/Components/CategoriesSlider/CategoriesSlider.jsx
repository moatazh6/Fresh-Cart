import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const [Categories, setCategories] = useState([]);
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <h2 className="text-gray-600 font-semibold my-4 capitalize flex ms-5">
        shop popular Categories
      </h2>
      <Slider {...settings}>
        {Categories.map((Categories) => (
          <div key={Categories.data?.data._id}>
            <img
              src={Categories.image}
              className="w-full h-[200px] object-cover"
              alt=""
            />
            <h4 className="text-black">{Categories.name}</h4>
          </div>
        ))}
      </Slider>
    </>
  );
}
