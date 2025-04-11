import React from "react";
import { useState, useEffect } from "react";
import productService from "../../backendConnect/product";
import PreviewCard from "../Card/ViewCard";
import ImageSlider from "../utils/ImageSlider";
import { useNavigate } from "react-router";

const Latest = ({ page, limit, className }) => {
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await productService.getAllProducts(page, limit);
      console.log("product Response:", response);
      setProduct(response); // Update state with the resolved data
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  return (
    <section>
      <div className="flex w-full bg-gray-200 px-8 gap-10 items-center justify-around">
        {!product || product.length === 0 ? (
          <div className="">Loading...</div>
        ) : (
          product.users.map((item, index) => (
            <div key={index}>
              <PreviewCard // Add a unique key for each item
                index={index}
                title={item.title}
                oldPrice={item.oldPrice}
                newPrice={item.newPrice}
                image={item.productImage}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Latest;
