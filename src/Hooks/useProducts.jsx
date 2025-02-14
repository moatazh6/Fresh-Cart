import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const getRecentProducts = async () => {
  const response = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/products"
  );
  return response.data;
};

export default function useProducts() {
  return useQuery({
    queryKey: ["recentproducts"],
    queryFn: getRecentProducts,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    retry: 3,
    gcTime: 4000,
  });
}
