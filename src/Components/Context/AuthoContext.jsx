import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function forgotPassword(email) {
    return axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email,
      })
      .then((res) => res.data)
      .catch((err) => err.response.data);
  }

  function resetPassword(email, newPassword) {
    return axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email,
        newPassword,
      })
      .then((res) => res.data)
      .catch((err) => err.response.data);
  }

  

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
