import React from "react";
import { FaCartPlus } from "react-icons/fa";

const ViewCard = ({ title, oldPrice, newPrice, image }) => {
  return (
    <div className="flex flex-col items-center justify-between w-40 h-60 bg-white rounded-xl shadow-lg overflow-hidden border-1 border-cyan-600">
      <div className="w-full h-full p-2">
        <img src={image} alt={title} className="w-80 h-90 object-contain" />
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
          <span className="cursor-pointer">
            <FaCartPlus />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
