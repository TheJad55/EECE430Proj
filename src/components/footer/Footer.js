import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { logo } from "../../assets/index";

const Footer = () => {
  return (
    <div className=" w-full py-20 h-auto border-b-[1px] border-b-black grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-4 gap-8">
      <div className="w-full h-full flex flex-col gap-8">
        <img className="w-32" src={logo} alt="logo" />
        <div className="flex gap-4">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="bannerIcon">
            <FaFacebookF />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer" className="bannerIcon">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="bannerIcon">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

<div className="w-full h-full">
  <h3 className="text-xl uppercase text-designColor tracking-wider">
    RESOURCES
  </h3>
  <ul className="flex flex-col gap-4 font-titleFont font-medium py-6 overflow-hidden">
    <li>
      <a href="https://github.com" target="_blank" rel="noreferrer">
        <span className="w-full text-lg relative hover:text-designColor duration-300 group cursor-pointer">
          GitHub
          <span className="w-full h-[1px] bg-designColor inline-flex absolute left-0 -bottom-1 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300"></span>
        </span>
      </a>
    </li>
    <li>
      <a href="https://stackoverflow.com" target="_blank" rel="noreferrer">
        <span className="w-full text-lg relative hover:text-designColor duration-300 group cursor-pointer">
          StackOverflow
          <span className="w-full h-[1px] bg-designColor inline-flex absolute left-0 -bottom-1 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300"></span>
        </span>
      </a>
    </li>
    <li>
      <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
        <span className="w-full text-lg relative hover:text-designColor duration-300 group cursor-pointer">
          Youtube
          <span className="w-full h-[1px] bg-designColor inline-flex absolute left-0 -bottom-1 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300"></span>
        </span>
      </a>
    </li>
    <li>
      <a href="https://tailwindcss.com" target="_blank" rel="noreferrer">
        <span className="w-full text-lg relative hover:text-designColor duration-300 group cursor-pointer">
          Tailwind
          <span className="w-full h-[1px] bg-designColor inline-flex absolute left-0 -bottom-1 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300"></span>
        </span>
      </a>
    </li>
    <li>
      <a href="https://www.djangoproject.com" target="_blank" rel="noreferrer">
        <span className="w-full text-lg relative hover:text-designColor duration-300 group cursor-pointer">
          Django
          <span className="w-full h-[1px] bg-designColor inline-flex absolute left-0 -bottom-1 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300"></span>
        </span>
      </a>
    </li>
  </ul>
</div>

      <div className="w-full h-full">
        <h3 className="text-xl uppercase text-designColor tracking-wider">
          DEVELOPERS
        </h3>
        <ul className="flex flex-col gap-4 font-titleFont font-medium overflow-hidden py-6">
          <li>
            <span className="w-full text-lg relative hover:text-designColor duration-300 group cursor-pointer">
              Jad Sassine
              <span className="w-full h-[1px] bg-designColor inline-flex absolute left-0 -bottom-1 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300"></span>
            </span>
          </li>
          <li>
            <span className="w-full text-lg relative hover:text-designColor duration-300 group cursor-pointer">
              Carl Aziz
              <span className="w-full h-[1px] bg-designColor inline-flex absolute left-0 -bottom-1 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300"></span>
            </span>
          </li>
          <li>
            <span className="w-full text-lg relative hover:text-designColor duration-300 group cursor-pointer">
              Nemer Abdel Amir
              <span className="w-full h-[1px] bg-designColor inline-flex absolute left-0 -bottom-1 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300"></span>
            </span>
          </li>
          <li>
            <span className="w-full text-lg relative hover:text-designColor duration-300 group cursor-pointer">
              Karim Shammas
              <span className="w-full h-[1px] bg-designColor inline-flex absolute left-0 -bottom-1 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300"></span>
            </span>
          </li>
          <li>
            <span className="w-full text-lg relative hover:text-designColor duration-300 group cursor-pointer">
              Mohammad Sabbagh
              <span className="w-full h-[1px] bg-designColor inline-flex absolute left-0 -bottom-1 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300"></span>
            </span>
          </li>
          <li>
            <span className="w-full text-lg relative hover:text-designColor duration-300 group cursor-pointer">
              Jad Oueida
              <span className="w-full h-[1px] bg-designColor inline-flex absolute left-0 -bottom-1 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300"></span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
