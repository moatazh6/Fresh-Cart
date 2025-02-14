import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../Context/userContext";
import ResetPassVerify from "../ResetPassVerify/ResetPassVerify";

export default function Login() {
  let { userLogin, setuserLogin } = useContext(userContext);

  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [isloading, setisloading] = useState(false);

  function handleLogin(values) {
    setisloading(true);

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((response) => {
        setisloading(false);
        if (response.data.message === "success") {
          localStorage.setItem("userToken", response.data.token);
          setuserLogin(response.data.token);
          navigate("/");
        }
      })
      .catch((res) => {
        setisloading(false);
        if (res.response) {
          setErrors(res.response.data.message || "An error occurred");
        } else if (res.request) {
          setErrors("Network error. Please check your internet connection.");
        } else {
          setErrors("An unexpected error occurred.");
        }
      });
  }

  let myValdiation = yup.object().shape({
    email: yup.string().email("not valid email").required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "password min is 6"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: myValdiation,
    onSubmit: handleLogin,
  });

  return (
    <>
      <div className={style["login-container"]}>
        {errors ? (
          <div className="w-1/2 mx-auto bg-red-600 text-white font-bold text-center my-4">
            {errors}
          </div>
        ) : null}
        <h2 className="font-bold text-2xl text-center my-4 text-emerald-700">
          Login Now
        </h2>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
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
            <button
              type="submit"
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {isloading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
            </button>
            <Link to={"/register"}>
              <span className="text-blue-500 underline ms-3">
                don't have you have an account? Register Now
              </span>
            </Link>
          </div>
          <div className="flex gap-5 justify-center">
            <Link to={"/ForgetPassword"}>
              <button
                onClick={ResetPassVerify}
                className="bg-red-700 text-white"
              >
                ForgotPassword
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
