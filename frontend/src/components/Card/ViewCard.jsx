import React from "react";
import { FaCartPlus } from "react-icons/fa";

const ViewCard = ({ title, oldPrice, newPrice, image }) => {
  return (
    <div className="flex flex-col items-center justify-between w-40 h-60 bg-white rounded-xl shadow-lg overflow-hidden border border-cyan-600">
      <div className="w-full h-3/5 p-2">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>

      <div className="w-full bg-[#00d5ff6f] h-1/3 flex flex-col justify-around px-4 py-2">
        <h1 className="text-lg font-semibold text-center uppercase">{title}</h1>

        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="line-through text-black/50 text-sm">
              ₹{oldPrice}
            </span>
            <span className="text-xl font-bold">₹{newPrice}</span>
          </div>
          <span className="text-blue-600 cursor-pointer">
            <FaCartPlus className="h-full w-6" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
