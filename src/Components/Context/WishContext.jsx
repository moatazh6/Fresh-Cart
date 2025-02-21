import { createContext } from "react";
import axios from "axios";

export let WishContext = createContext();

export default function WishContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addProductToWish(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        { headers }
      )
      .then((res) => res.data) 
      .catch((err) => err);
  }

  function getWishList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => res.data) 
      .catch((err) => err);
  }
  function getDeleteWishList(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      })
      .then((res) => res) 
      .catch((err) => err);
  }

  return (
    <WishContext.Provider
      value={{ addProductToWish, getWishList, getDeleteWishList }}
    >
      {props.children}
    </WishContext.Provider>
  );
}