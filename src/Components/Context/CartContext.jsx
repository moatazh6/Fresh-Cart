import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let CartContext = createContext();
let headers = {
  token: localStorage.getItem("userToken"),
};

function addProductToCart(id) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: id },
      { headers }
    )
    .then((res) => res)
    .catch((err) => err);
}

function updateCartQuantity(productId, quantity) {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count: quantity },
      { headers }
    )
    .then((res) => res)
    .catch((err) => err);
}

function removeItem(productId) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers,
    })
    .then((res) => res)
    .catch((err) => err);
}

function checkout(cartId, url, data) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    { shippingAddress: data },
    { headers }
  );
}

function clear() {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
    .then((res) => res)
    .catch((err) => err);
}

export default function CartContextProvider(props) {
  const [cartId, setcartId] = useState(0);
  const [numberItems, setnumberItems] = useState(0);
  const [cartItems, setcartItems] = useState([]);
  async function getLoggedUserCart() {
    try {
      let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      });

      if (res?.data?.status === "success") {
        setcartId(res.data.data._id);
        setnumberItems(res.data.numOfCartItems);
      }
      return res;
    } catch (error) {
      console.error("Error fetching cart data:", error);
      return error;
    }
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCart,
        updateCartQuantity,
        removeItem,
        checkout,
        cartId,
        setnumberItems,
        numberItems,
        clear,
        cartItems,
        setcartItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
