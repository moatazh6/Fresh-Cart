import React from "react";
import style from "./ProductDetails.module.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Slider from "react-slick";

export default function ProductDetails() {
  let { id, category } = useParams();
  const [product, setproduct] = useState(null);
  const [relatedProduct, setrelatedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  
  };

  function getProduct(id) {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setproduct(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }

  function getAllProduct() {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter(
          (product) => product.category.name == category
        );
        setrelatedProduct(related);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getProduct(id);
    getAllProduct();
  }, [id, category]);
  return (
    <>
      <div className="row items-center">
        <div className="w-1/4">
          {isLoading ? (
            <div className="sk-cube-grid">
              <div className="sk-cube sk-cube1"></div>
              <div className="sk-cube sk-cube2"></div>
              <div className="sk-cube sk-cube3"></div>
              <div className="sk-cube sk-cube4"></div>
              <div className="sk-cube sk-cube5"></div>
              <div className="sk-cube sk-cube6"></div>
              <div className="sk-cube sk-cube7"></div>
              <div className="sk-cube sk-cube8"></div>
              <div className="sk-cube sk-cube9"></div>
            </div>
          ) : (
            <Slider {...settings}>
              {product?.images?.map((src, index) => (
                <img key={index} src={src} className="w-full" />
              ))}
            </Slider>
          )}
        </div>
        <div className="w-3/4 p-4 ">
          {isLoading ? (
            <p>Loading product details...</p>
          ) : (
            <>
              <h3 className="font-semibold capitalize text-2xl text-black">
                {product?.title}
              </h3>
              <p className="text-gray-700 my-4">{product?.description}</p>
              <h2 className="text-emerald-600 ">{product?.category?.name}</h2>
              <div className="flex justify-between my-5">
                <span className="text-black">{product?.price}EGP</span>
                <span className="text-black">
                  <i className="fas fa-star text-yellow-500"></i>
                  {product?.ratingsAverage}
                </span>
              </div>
              <button className="btn">Add To Cart</button>
            </>
          )}
        </div>
      </div>

      <div className="row">
        {relatedProduct.length > 0 ? (
          relatedProduct.map((product) => (
            <div key={product.id} className="w-1/6">
              <div className="product p-5">
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img src={product.imageCover} className="w-full" />
                  <h5 className=" text-emerald-400">{product.category.name}</h5>
                  <h3 className="mb-3 font-semibold">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between">
                    <span>{product.price}EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-500"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button className="btn">Add To Cart</button>
              </div>
            </div>
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </>
  );
}
