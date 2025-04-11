import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { ImageSlider, Male, Female, Latest, Footer } from "../index.js";

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");

  return (
    <>
      <section>
        <div className="relative flex items-center h-svh w-full bg-zinc-600">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 h-svh mt-6 "
            style={{ backgroundImage: "url('./heroBg.jpg')" }}
          >
            <div className="absolute inset-0 bg-[#00000098]"></div>
          </div>

          {/* Text on top */}
          <div className="relative z-10 w-full h-full flex flex-wrap justify-between text-cyan-50 ">
            <div className="flex flex-col justify-center h-full w-1/2 px-20">
              <h1 className="text-7xl mb-8">Kapre</h1>
              <h2 className="text-6xl"> A place for your dreams </h2>

              <button
                className="bg-emerald-500 border-2 border-emerald-600 rounded-md w-48 mt-4 text-2xl py-2 px-4
                hover:bg-emerald-700"
                onClick={() => navigate("/store")}
              >
                Shop now {`>>`}
              </button>
            </div>
            <div className="flex justify-center w-1/2 h-full">
              <div className=" h-140 w-auto pt-8">
                <ImageSlider
                  category={"mainImg"}
                  sNum={1}
                  className={"h-full w-auto"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-center bg-gray-500 border-t-1 pt-12 gap-1 text-lg">
          <button
            className={`pt-2 px-12 rounded-t-2xl ${
              activeTab === "new"
                ? "bg-gray-200 text-black"
                : "bg-gray-400 text-white"
            }`}
            onClick={() => setActiveTab("new")}
          >
            New Arrival
          </button>

          <button
            className={` pt-2 px-12 rounded-t-2xl ${
              activeTab === "latest"
                ? " bg-gray-200 text-black"
                : "bg-gray-400 text-white"
            }`}
            onClick={() => setActiveTab("latest")}
          >
            Bestseller
          </button>
        </div>

        {activeTab === "latest" ? (
          <div className={`flex h-80 py-8 w-full justify-center bg-gray-200 `}>
            <Latest limit={5} page={1} />
          </div>
        ) : (
          <div className={`flex h-80 py-8 w-full justify-center bg-gray-200 `}>
            <Latest limit={5} page={1} />
          </div>
        )}

        <div>
          <button
            className="uppercase text-2xl w-full tracking-widest h-20 bg-gray-400 hover:bg-gray-500"
            onClick={() => navigate(`/shop`)}
          >
            {" "}
            go to shop {`>>`}
          </button>
        </div>
      </section>

      <Male category={"men"} page={1} limit={1} />

      <Female category={"women"} page={1} limit={1} />

      <Male category={"children"} page={1} limit={3} />

      <section>
        <div className="flex flex-col h-68 justify-between items-center gap-4 py-12 text-xl bg-cyan-100">
          <p>***********</p>
          <h1 className="tracking-widest">Float like a breeze in chiffon,</h1>
          <h1 className="tracking-wide">Glow like sunshine in silk,</h1>
          <h1 className="tracking-widest">Be the dream, wear the magic.</h1>
          <p>***********</p>
        </div>
      </section>
      <section>
        <div className="flex flex-col h-68 justify-between items-center py-12">
          <p>***********</p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
