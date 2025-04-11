import React from "react";
import { SlSocialTwitter } from "react-icons/sl";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="relative flex items-center h-svh w-full bg-zinc-600">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 h-120 mt-10"
            style={{ backgroundImage: "url('./footerImg.jpg')" }}
          >
            <div className="absolute inset-0 bg-[#00000077]"></div>
          </div>

          {/* Text on top */}
          <div className="relative z-10 w-full h-full flex flex-wrap justify-between text-cyan-50 gap-4 ">
            <div>
              <img src="" alt="Logo" />
              <h1>Kapre</h1>
            </div>
            <div>
              <SlSocialTwitter />
              <FaSquareWhatsapp />
              <FaFacebook />
              <AiFillInstagram />
            </div>
            <div className="flex ">
              <div className="flex gap-8 px-12 items-center ">
                <ul>
                  <h1>ABOUT US</h1>
                  <li>OUR STORIES</li>
                  <li>CAREER</li>
                  <li>REVIEWS</li>
                  <li>POSTS</li>
                </ul>
                <ul>
                  <h1>CONNECT</h1>
                  <li>MY ACCOUNT</li>
                  <li>FIND MY STORE</li>
                  <li>EVENTS</li>
                  <li>RETAILERS</li>
                  <li>AFFILIATE PROGRAM</li>
                </ul>

                <ul>
                  <h1>HELP</h1>
                  <li>FAQ</li>
                  <li>FIT GUIDE</li>
                  <li>PRODUCT CARE</li>
                  <li>RETURN & EXCHANGES POLICY</li>
                  <li>START A RETURN</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
