import React from "react";
import style from "./Footer.module.css";
import googleplay from "../../assets/images/googleplay.svg"
import amazon from "../../assets/images/Amazon-Pay-logo.svg"
import american from "../../assets/images/american-express.svg"
import masterCard from "../../assets/images/mastercard.svg"
import paypal from '../../assets/images/paypal.svg'
import visa from "../../assets/images/visa.svg"
import appstore from "../../assets/images/appstore.svg"
export default function Footer() {
  return (
    <>
    return (
    <div className="pt-5 pb-4 bg-gray-100 mt-4">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-green-600 mb-5">Get the FreshCart app</h2>
        <p className="text-gray-500">We will send you a link, open it on your phone to download the app</p>
        
        <div className="flex flex-wrap pb-2">
          <div className="w-full md:w-3/4 lg:w-5/6">
            <input 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              placeholder="Enter Email Address"
            />
          </div>
          <div className="w-full md:w-1/4 lg:w-1/6 mt-2 md:mt-0">
            <button 
              type="submit" 
              className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700"
            >
              Share App Link
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-between items-center border-t border-gray-300 py-3">
          <ul className="flex flex-wrap items-center space-x-2 text-center md:text-left">
            <li className="text-sm font-semibold">Payment Partners</li>
            <li><img src={amazon} className="h-6" alt="amazonPayment"/></li>
            <li><img src={american} className="h-6 mx-2" alt="americanExpressPayment"/></li>
            <li><img src={masterCard} className="h-6 mx-2" alt="masterCardPayment"/></li>
            <li><img src={paypal} className="h-6 mx-2" alt="paypalPayment"/></li>
            <li><img src={visa} className="h-6 mx-2" alt="visaPayment"/></li>
          </ul>
          <ul className="flex items-center space-x-2">
            <li className="text-sm font-semibold">Get deliveries with FreshCart</li>
            <li><img src={appstore} alt="appstore-btn" className="h-10"/></li>
            <li><img src={googleplay} alt="googleplay-btn" className="h-10"/></li>
          </ul>
        </div>
        
        <div className="text-center mt-3">
          <span className="text-sm text-gray-500">© 2024 FreshCart E-Commerce. All rights reserved. Made by <span className="text-green-700 font-bold">Moataz Hassan</span></span>
        </div>
      </div>
    </div>
  );


    </>
  )
}