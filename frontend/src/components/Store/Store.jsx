import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import StoreCard from "../Card/StoreCard";
import productService from "../../backendConnect/product";

const Store = ({ category }) => {
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();

  const fetchData = async (page) => {
    try {
      const response = await productService.getAllProducts(page);
      console.log("product Response:", response);
      setProduct((prev) => [...prev, ...response.users]);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const fetchDataCategory = async (page, category) => {
    try {
      const response = await productService.getProductsByCategory(
        category,
        page
      );
      console.log("product Response:", response);
      setProduct((prev) => [...prev, ...response]);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    if (!category) {
      fetchData(page);
    } else {
      fetchDataCategory(page, category);
    }
  }, [page, category]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 100) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setProduct([]); // Clear old products when category or page resets to 1
    setPage(1); // Reset page to 1 when category changes
  }, [category]);

  return (
    <div className="h-full w-full px-8 py-12 bg-amber-100">
      <div className=" w-full ">
        {!product || product.length === 0 ? (
          <div className="flex justify-center items-center h-svh text-3xl">
            Loading...
          </div>
        ) : (
          product.map((item, index) => (
            <div key={index} className="inline-block w-1/2">
              <StoreCard
                id={item._id}
                title={item.title}
                description={item.description}
                oldPrice={item.oldPrice}
                newPrice={item.newPrice}
                image={item.productImage}
              />
            </div>
          ))
        )}
        <p className="text-center text-gray-500">Loading more...</p>
      </div>
    </div>
  );
};

export default Store;
