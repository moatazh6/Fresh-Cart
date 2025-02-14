import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "./../Context/userContext";
import { CartContext } from "../Context/CartContext";

import logo from "../../assets/images/freshcart-logo.svg";

export default function Navbar() {
  let { numberItems } = useContext(CartContext);
  let { userLogin, setuserLogin } = useContext(userContext);
  let Navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    Navigate("/Login");
  }

  return (
    <>
      <nav className="bg-slate-300 bg-opacity-50 fixed top-0 left-0 right-0 border-gray-200 z-50">
        <div className="flex flex-wrap justify-center gap-3 lg:justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center gap-5">
            <NavLink className="flex items-center space-x-3 rtl:space-x-reverse" to="/">
              <img src={logo} className="h-8" alt="Logo" />
            </NavLink>
            {userLogin != null ? (
              <ul className="flex gap-3">
                <li>
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      isActive ? "bg-emerald-600  text-white p-3" : "bg-transparent  p-3"
                    }
                  >
                    home
                  </NavLink>
                </li>
               
                <li>
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      isActive ? "bg-emerald-600  text-white p-3 rounded-full" : "bg-transparent  p-3"
                    }
                  >
                    products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/wishlist"
                    className={({ isActive }) =>
                      isActive ? "bg-emerald-600  text-white p-3 rounded-full" : "bg-transparent   p-3"
                    }
                  >
                    wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                      isActive ? "bg-emerald-600  text-white p-3 rounded-full" : "bg-transparent   p-3"
                    }
                  >
                    categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/brands"
                    className={({ isActive }) =>
                      isActive ? "bg-emerald-600  text-white p-3 rounded-full" : "bg-transparent  p-3"
                                    }                  >
                    brands
                  </NavLink>
                </li>
                
              </ul>
            ) : null}
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <ul className="flex gap-5">
            <li className="relative">
                  <NavLink
                    to="/cart">
<i className="fa-solid fa-cart-shopping" />
                    <div className="absolute top-[-10px] right-[-10px] size-5 bg-emerald-600 text-white rounded-full flex items-center justify-center">
                      {numberItems}
                    </div>
                  </NavLink>
                </li>
              <li>
                <i className="fab fa-facebook"></i>
              </li>
              <li>
                <i className="fab fa-youtube"></i>
              </li>
              <li>
                <i className="fab fa-instagram"></i>
              </li>
              <li>
                <i className="fab fa-linkedin"></i>
              </li>
              <li>
                <i className="fab fa-x"></i>
              </li>
            </ul>
            {userLogin != null ? (
              <span onClick={signOut}>
                <NavLink to="/Login">SignOut</NavLink>
              </span>
            ) : (
              <>
                <NavLink to="/Login">Login</NavLink>
                <NavLink to="/Register">Register</NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
