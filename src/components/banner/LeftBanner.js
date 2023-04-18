import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaReact } from "react-icons/fa";
import { SiTailwindcss, SiFigma, SiNextdotjs } from "react-icons/si";

const LeftBanner = () => {
  const [text] = useTypewriter({
    words: ["Management Tool.", "Virtual Organizer.", "Prediction Software."],
    loop: true,
    typeSpeed: 20,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });
  return (
    <div className="w-full lgl:w-1/2 flex flex-col gap-20">
      <div className="flex flex-col gap-5">
        <h4 className=" text-lg font-normal">WELCOME TO BOUNCE</h4>
        <h1 className="text-6xl font-bold text-white">
          All-<span className="text-designColor capitalize">In-One</span>
        </h1>
        <h2 className="text-4xl font-bold text-white">
          Basketball <span>{text}</span>
          <Cursor
            cursorBlinking="false"
            cursorStyle="|"
            cursorColor="#f79f2a"
          />
        </h2>
        <p className="text-base font-bodyFont leading-6 tracking-wide">
          Track your player's performance with our innovative player statistics
          tracking and forecasting feature! Organize your games, trainings and
          more using our user-friendly software!
        </p>
      </div>
      <div className="flex flex-col xl:flex-row gap-6 lgl:gap-0 justify-between">
        <div>
          <h2 className="text-base uppercase font-titleFont mb-4">
            Find us in
          </h2>
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
      </div>
    </div>
  );
};

export default LeftBanner;
