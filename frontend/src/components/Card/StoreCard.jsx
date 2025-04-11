import React from "react";
import { FaCartPlus } from "react-icons/fa";

const StoreCard = ({ id, image, title, description, oldPrice, newPrice }) => {
  return (
    <div>
      <div className="px-4 py-2 flex rounded-2xl ">
        <div className="w-1/3 h-full p-2 rounded-l-2xl border-l-3 border-l-blue-300 bg-amber-200">
          <img src={image} alt={title} className="h-30 w-full object-contain" />
        </div>

        <div className="flex w-2/3 flex-col py-4 px-8 items-between justify-between border-r-3 border-blue-300 bg-cyan-100 rounded-r-2xl border-1 ">
          <h1 className="text-lg font-semibold text-center uppercase underline">
            {title}
          </h1>
          <span>{description}</span>
          <div className="flex gap-8 w-auto">
            <div className=" flex justify-start gap-4 items-center w-full">
              <span className="line-through text-black/50 text-sm">
                ₹{oldPrice}
              </span>
              <span className="text-xl font-bold">₹{newPrice}</span>
            </div>
            <button className="px-8 h-10 flex border-2 border-emerald-400 bg-green-400 hover:bg-[#66d866ba] hover:text-white rounded-2xl">
              <FaCartPlus className="h-full w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
