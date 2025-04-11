import React from "react";
import { useState, useEffect } from "react";
import productService from "../../backendConnect/product";
import ViewCard from "../Card/ViewCard";
import ImageSlider from "../utils/ImageSlider";
import { useNavigate } from "react-router";

const Female = ({ category, page, limit, className }) => {
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await productService.getProductsByCategory(
        category,
        page,
        limit
      );
      console.log("product Response:", response);
      setProduct(response); // Update state with the resolved data
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category, page, limit]);

  return (
    <section>
      <div className=" flex gap-4 h-124 bg-cyan-900 py-8 px-12 ">
        <div className="w-1/2 h-108 ">
          <div className="border-b-2 border-amber-50 h-10 w-full rounded-b-[50%] shadow-2xl shadow-amber-50"></div>
          <div className="flex justify-around h-[80%] items-center  ">
            {!product || product.length === 0 ? (
              <div className="">Loading...</div>
            ) : (
              product.map((item, index) => (
                <div key={index} className="">
                  <ViewCard
                    key={index} // Add a unique key for each item
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
          <div className="border-t-2 border-amber-50 h-10 w-full rounded-t-[50%] inset-shadow-sm inset-shadow-amber-50"></div>
        </div>

        <div className="flex flex-col justify-between w-1/2 h-full  ">
          <h1 className="text-cyan-200 bg-cyan-900 text-4xl p-4 text-right uppercase">
            {category}{" "}
          </h1>
          <div className="flex justify-center items-center h-124  ">
            <div className=" content-center h-76 w-36 px-2 inset-shadow-sm inset-shadow-amber-50 rounded-l-2xl">
              <ImageSlider
                category={category}
                sNum={1}
                className={"h-0.9 w-0.9 "}
              />
            </div>
            <div className="content-center border-0.5 h-full w-48 px-2 relative z-20 shadow-2xl shadow-blue-200 rounded-2xl">
              <ImageSlider
                category={category}
                sNum={2}
                className={"h-0.9 w-full "}
              />
            </div>
            <div className="content-center border-0.5 h-76 w-36 py-2 inset-shadow-sm inset-shadow-amber-50 shadow-2xl rounded-r-2xl">
              <ImageSlider
                category={category}
                sNum={3}
                className={
                  "h-0.9 w-0.9 transition-transform duration-800 ease-in-out "
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          className="uppercase text-2xl w-full tracking-widest h-20 bg-gray-400 hover:bg-gray-500"
          onClick={() => navigate(`/${category}`)}
        >
          {" "}
          {category} Section {`>>`}
        </button>
      </div>
    </section>
  );
};

export default Female;
