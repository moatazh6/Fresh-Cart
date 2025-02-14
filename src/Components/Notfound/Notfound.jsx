import React from "react";
import style from "./Notfound.module.css";
import errror from "../../assets/images/error.svg";
export default function Notfound() {
  return (
    <>
      <div className="flex justify-center mt-12">
        <img src={errror} alt="" />
      </div>
    </>
  );
}
