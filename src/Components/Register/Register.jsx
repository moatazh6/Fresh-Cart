import React, { useContext, useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "./../Context/userContext";

export default function Register() {
  let { userLogin, setuserLogin } = useContext(userContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [isloading, setisloading] = useState(false);

  function handleRegister(values) {
    setisloading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        setisloading(false);
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          setuserLogin(res.data.token);
          navigate("/");
        }
      })
      .catch((res) => {
        setisloading(false);
        setErrors(res.response.data.message);
      });
  }

  let myValdiation = yup.object().shape({
    name: yup
      .string()
      .min(3, "min length is 3")
      .max(10, "max length is 10")
      .required("name is required"),
    email: yup.string().email("not valid email").required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "password min is 6"),
    rePassword: yup.string().oneOf([yup.ref("password")], "Not matched"),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, "Phone not valid"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: myValdiation,
    onSubmit: handleRegister,
  });

  return (
    <>
      {errors ? (
        <div className="w-1/2 mx-auto bg-red-600 text-white font-bold text-center my-4">
          {errors}
        </div>
      ) : null}
      <h2 className="font-bold text-2xl text-center my-4 text-emerald-700">
        Register
      </h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Name
          </label>
          {formik.errors.name && formik.touched.name ? (
            <div className="text-red-500 text-sm my-2">
              {formik.errors.name}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div className="text-red-500 text-sm my-2">
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div className="text-red-500 text-sm my-2">
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Your Password
          </label>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="text-red-500 text-sm my-2">
              {formik.errors.rePassword}
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
            Enter Your Phone
          </label>
          {formik.errors.phone && formik.touched.phone ? (
            <div className="text-red-500 text-sm my-2">
              {formik.errors.phone}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <button
            type="submit"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {isloading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
          <Link to={"/login"}>
            <span className="text-blue-500 underline">
              do you have an account? Login Now
            </span>
          </Link>
        </div>
      </form>
    </>
  );
}
