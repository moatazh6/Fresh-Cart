import { useEffect, useState } from "react";
import axios from "axios";

export default function LatestOrder() {
  const [latestOrder, setLatestOrder] = useState(null);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);

  async function getLatestOrder() {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    const res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/orders/",
      {
        headers: { Authorization: 'Bearer ${token}' },
      }
    );

    if (res.data.data?.length > 0) {
      const sortedOrders = res.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      const lastOrder = sortedOrders[0];
      setLatestOrder(lastOrder);
      setTotalOrderPrice(lastOrder.totalOrderPrice);
    }
  }

  useEffect(() => {
    getLatestOrder();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Latest Order</h2>

      {latestOrder ? (
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-md shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Total:{" "}
              <span className="text-emerald-600">
                ${totalOrderPrice.toFixed(2)}
              </span>
            </h3>
       
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {latestOrder.cartItems?.map((item, i) => (
              <div
                key={i}
                className="p-4 border rounded-md bg-white shadow-sm text-center"
              >
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="w-32 h-32 object-contain mx-auto mb-3"
                />
                <p className="font-medium text-lg mb-2">{item.product.title}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price: ${item.price}</span>
                  <span className="text-gray-600">Quantity: {item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-red-600 text-center text-lg font-semibold">
          No Orders Found       
           </p>
      )}
    </div>
  );
}