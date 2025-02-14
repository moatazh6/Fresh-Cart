import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";

export default function RecentProducts() {
  let { data, isError, error, isLoading } = useProducts();
  let { addProductToCart, setnumberItems, numberItems } =
    useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function toggleWishlist(product) {
    let updatedWishlist;
    if (wishlist.some((item) => item.id === product.id)) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      toast.success("Removed from wishlist");
    } else {
      updatedWishlist = [...wishlist, product];
      toast.success("Added to wishlist");
    }
    setWishlist(updatedWishlist);
  }

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    let res = await addProductToCart(id);
    if (res.data.status === "success") {
      setnumberItems(numberItems + 1);
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
    setLoading(false);
  }

  if (isError) {
    return <h3>{error}</h3>;
  }

  if (isLoading) {
    return (
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
    );
  }

  return (
    <div className="row">
      {data?.data.map((product) => (
        <div key={product.id} className="w-1/6">
          <div className="product p-5 relative">
            <Link to={`productdetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} className="w-full" />
              <h5 className="text-emerald-400">{product.category.name}</h5>
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
            <div className="relative">
              <button
                className="btn mt-2"
                onClick={() => addToCart(product.id)}
              >
                <i className="fa-solid fa-cart-shopping" />

                {loading && currentId == product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add To Cart"
                )}
              </button>
              <i
                className="absolute top-3 right-0 cursor-pointer text-red-500 text-2xl"
                onClick={() => toggleWishlist(product)}
              >
                {wishlist.some((item) => item.id === product.id) ? (
                  <i className="fas fa-heart text-red-500"></i>
                ) : (
                  <i className="fas fa-heart text-black"></i>
                )}
              </i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
