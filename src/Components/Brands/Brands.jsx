import  { useEffect, useState } from "react";
import axios from "axios";

export default function Brands() {
  const [Brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => setBrands(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-green-600">
        Brands
      </h1>
      <ul className="list-none flex flex-wrap gap-6 justify-center">
        {Brands.length > 0 ? (
          Brands.map((brand) => (
            <li
              key={brand._id}
              className="text-center hover:shadow-green-600 hover:shadow-lg "
            >
              <button
                onClick={() => setSelectedBrand(brand)}
                className="bg-white border-black"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="object-contain rounded-lg "
                />
                <p className="text-lg text-gray-900 mt-2 ">{brand.name}</p>
              </button>
            </li>
          ))
        ) : (
          <div>
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
          </div>
        )}
      </ul>

      {selectedBrand && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelectedBrand(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96 relative "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-green-600 "
              onClick={() => setSelectedBrand(null)}
            >
              <i className="fa-solid fa-x" />
            </button>
            <div className="flex items-center gap-4 justify-between border-b-2 ">
              <h2 className="text-2xl font-bold text-green-600 ms-7">
                {selectedBrand.name}
              </h2>
              <img
                src={selectedBrand.image}
                alt={selectedBrand.name}
                className="w-full h-24 object-contain mt-5 "
              />
            </div>
            <p className="text-gray-500 mt-2 absolute bottom-24 ms-7">
              {selectedBrand.slug}
            </p>
            <button
              className=" ms-64 mt-4 px-4 py-2 bg-gray-700 text-white rounded"
              onClick={() => setSelectedBrand(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
