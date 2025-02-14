import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryDetails({ categoryId }) {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    axios
      .get("https://ecommerce.routemisr.com/api/v1/subcategories")
      .then((res) => {

        const filteredSubCategories = res.data.data.filter(
          (sub) => sub.category === categoryId
        );

        setSubCategories(filteredSubCategories);
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
    return (
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
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
        Subcategories
      </h1>

      {subCategories.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {subCategories.map((sub) => (
            <div
              key={sub._id}
              className="border p-4 rounded-lg shadow-md text-center"
            >
              <h3 className="text-lg font-semibold text-gray-700">
                {sub.name}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No subcategories available.</p>
      )}
    </div>
  );
}
