import { useContext, useEffect, useState } from "react";
import toast from "./../../../node_modules/react-hot-toast/src/index";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getLoggedUserCart,
    updateCartQuantity,
    removeItem,
    setnumberItems,
    numberItems,
    clear,
  } = useContext(CartContext);
  const [CartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  async function cartItem() {
    let res = await getLoggedUserCart();

    if (res.data.status == "success") {
      setCartDetails(res.data.data);
      setLoading(false);
    }
  }

  async function UpdateItem(id, count) {
    if (count == 0) {
      deleteItem(id);
    } else {
      let res = await updateCartQuantity(id, count);
      if (res.data.status == "success") {
        setCartDetails(res.data.data);
        toast.success("Cart updated successfully");
      } else {
        toast.success("error updating");
      }
    }
  }
  async function deleteItem(productId) {
    let res = await removeItem(productId);
    if (res.data.status == "success") {
      setnumberItems(numberItems - 1);
      setCartDetails(res.data.data);
      toast.success("Cart updated successfully");
    } else {
      toast.success("error updating");
    }
  }

  async function clearCart() {
    let res = await clear();

    if (res.data.message == "success") {
      setCartDetails(null);
      setnumberItems(0);

      toast.success("Cart cleared successfully");
    } else {
      toast.success("error clearing");
    }
  }

  useEffect(() => {
    cartItem();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1" />
          <div className="sk-cube sk-cube2" />
          <div className="sk-cube sk-cube3" />
          <div className="sk-cube sk-cube4" />
          <div className="sk-cube sk-cube5" />
          <div className="sk-cube sk-cube6" />
          <div className="sk-cube sk-cube7" />
          <div className="sk-cube sk-cube8" />
          <div className="sk-cube sk-cube9" />
        </div>
        ;
      </div>
    );
  }

  return (
    <>
      {CartDetails?.products.length > 0 ? (
        <>
          <h2 className="text-center text-2xl text-emerald-600 font-bold capitalize my-4">
            Total Price: {CartDetails?.totalCartPrice}
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {CartDetails?.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                          onClick={() => {
                            UpdateItem(product.product.id, product.count - 1);
                          }}
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span>{product.count}</span>
                        </div>
                        <button
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                          onClick={() => {
                            UpdateItem(product.product.id, product.count + 1);
                          }}
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price * product.count}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => deleteItem(product.product.id)}
                        href="#"
                        className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700 transition"
            >
              Clear 🗑️
            </button>
            <Link to={`/checkout`}>
              <button className="btn my-3">Checkout</button>
            </Link>
          </div>
        </>
      ) : (
        <h1 className="text-3xl text-red-800 font-bold my-8 text-center">
          {" "}
          There is not items To show
        </h1>
      )}
    </>
  );
}
