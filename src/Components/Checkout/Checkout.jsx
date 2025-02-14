import { useContext } from "react";
import { useFormik } from "formik";
import { CartContext } from "../Context/CartContext";

export default function Checkout() {
  let { cartId } = useContext(CartContext);
  let { checkout } = useContext(CartContext);

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () => handleCheckout(cartId, `http://localhost:5173`),
  });
  async function handleCheckout(cartId, url) {
    let { data } = await checkout(cartId, url, formik.values);
    window.location.href = data.session.url;
  }

  return (
    <>
      <h2 className="font-bold text-2xl text-center my-4 text-emerald-700">
        Checkout Now
      </h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your details
          </label>
          {formik.errors.details && formik.touched.details ? (
            <div className="text-red-500 text-sm my-2">
              {formik.errors.details}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your phone
          </label>
          {formik.errors.phone && formik.touched.phone ? (
            <div className="text-red-500 text-sm my-2">
              {formik.errors.phone}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your city
          </label>
          {formik.errors.city && formik.touched.city ? (
            <div className="text-red-500 text-sm my-2">
              {formik.errors.city}
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <button
            type="submit"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Checkout
          </button>
        </div>
      </form>
    </>
  );
}
