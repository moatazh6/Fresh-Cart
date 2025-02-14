import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthoContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { forgotPassword } = useContext(AuthContext); 
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    forgotPassword(email).then((res) => {
      if (res.status === "success") {
        setMessage("Check your email for the reset link.");
      } else {
        setMessage(res.message || "Something went wrong.");
      }
});
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
      {message && <p className="text-green-600 text-center">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Link to={"/resetPassVerify"}>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white p-2 rounded"
          >
            Send Reset Link
          </button>
        </Link>
      </form>
    </div>
  );
}
