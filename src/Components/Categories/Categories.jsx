import { useEffect, useState } from "react";
import axios from "axios";
import CategoryDetails from "./../SubCategory/SubCategory";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        setCategories(res.data.data);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-green-600">
        Categories
      </h1>
      <ul className="list-none flex flex-wrap gap-6 justify-center">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li
              key={category._id}
              className="text-center cursor-pointer"
              onClick={() => setSelectedCategory(category._id)}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full object-cover h-48"
              />
              <p className="text-lg text-gray-900 mt-2">{category.name}</p>
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
          </div>
        )}
      </ul>

      {selectedCategory && <CategoryDetails categoryId={selectedCategory} />}
    </div>
  );
}
