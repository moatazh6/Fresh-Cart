import { useContext } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";

export default function Products() {
  let { addProductToCart, getLoggedUserCart } = useContext(CartContext);

  let { data, isError, error, isLoading } = useProducts();

  if (isError) {
    return <h3>{error}</h3>;
  }
  if (isLoading) {
    return <div>
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
    </div>;
  }

  async function handleAddToCart(productId) {
    let res = await addProductToCart(productId);

    if (res?.data?.status === "success") {
      await getLoggedUserCart();
      toast.success("Product added to cart!");
    } else {
      toast.error("Failed to add product!");
    }
  }

  return (
    <>
      <div className="row">
        {data?.data?.map((product) => (
          <div key={product.id} className="w-1/6">
            {" "}
            <div className="product p-5">
              <Link to={`productdetails/${product.id}/${product.category.name}`}
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
              <button
                className="btn "
                onClick={() => handleAddToCart(product.id)}
              >
                <i className="fa-solid fa-cart-shopping" />

                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
