import { useState, useEffect, useContext } from "react";
import { CartContext } from "../Context/CartContext";
import toast from "./../../../node_modules/react-hot-toast/src/index";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [currentId, setCurrentId] = useState(0);
  const [loading, setLoading] = useState(false);

  let {
    addProductToCart,
    setnumberItems,
    numberItems,
    cartItems,
    setcartItems,
    removeItem,
  } = useContext(CartContext);

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);

    let updatedCart = [...cartItems];
    let existingProduct = updatedCart.find((item) => item.id == id);

    if (existingProduct) {
      existingProduct.quantity += 1;
      setcartItems(updatedCart);
      toast.success("Product quantity increased in cart!");
    } else {
      let res = await addProductToCart(id);

      if (res.data.status === "success") {
        const newProduct = { ...res.data.product, quantity: 1 };
        setcartItems([...updatedCart, newProduct]);
        setnumberItems(numberItems + 1);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    }

    setLoading(false);
  }
  async function deleteItem(productId) {
    setLoading(true);

    let res = await removeItem(productId);
    if (res.data.status == "success") {
      if (wishlist.find((item) => item.id === productId) && wishlist.length > 1)
        if (cartItems.find((item) => item.id === productId))
          cartItems.find((item) => item.id === productId).quantity -= 1;

      if (cartItems.find((item) => item.id === productId) <= 0)
        setnumberItems((prev) => prev - 1);

      setcartItems((prevCart) =>
        prevCart.filter((item) => item.id !== productId)
      );

      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.id !== productId)
      );

      toast.success("Item removed successfully!");
    } else {
      toast.error("Error removing item!");
    }

    setLoading(false);
  }

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-green-500">
        Wishlist <i className="fas fa-heart text-lime-700"></i>
      </h1>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-md text-center"
            >
              <img src={product.imageCover} className="w-full mb-2" />
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-gray-700">
                  {product.title}
                </h3>
                <p className="text-gray-500">{product.price}EGP</p>
              </div>
              <button
                className="btn mt-2"
                onClick={() => addToCart(product.id)}
              >
                {loading && currentId === product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add To Cart"
                )}
              </button>
              <span
                onClick={() => deleteItem(product.id)}
                href="#"
                className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
              >
                Remove
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No items in wishlist.</p>
      )}
    </div>
  );
}
