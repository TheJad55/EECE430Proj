import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { testimonialTwo } from "../../assets";

const ContactCoachLeft = () => {
    const player = {
        name: "LeBron James",
        age: 38,
        team: "Los Angeles Lakers",
        position: "Small Forward",
        height: "6'3\"",
        weight: "180 lbs",
        college: "St. Vincent-St. Mary High School",
      };
  return (
    <div className="w-full lgl:w-[35%] h-full bg-gradient-to-r from-[#1e2024] to-[#23272b] p-4 lgl:p-8 rounded-lg shadow-shadowOne flex flex-col gap-8 justify-center">
      <img
        className="w-full h-64 object-cover rounded-lg mb-2"
        src={testimonialTwo}
        alt="testimonialTwo"
      />
      <div className="flex flex-col gap-4">
        <h3 className="text-3xl font-bold text-white">{player.name}</h3>
        <p className="text-lg font-normal text-gray-400">
          Age: {player.age}
        </p>
        <p className="text-base text-gray-400 tracking-wide">
        Position: {player.position}
        </p>
        <p className="text-base text-gray-400 flex items-center gap-2">
          Height: {player.height}
        </p>
        <p className="text-base text-gray-400 flex items-center gap-2">
          Weight: {player.weight}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-base uppercase font-titleFont mb-4">Find me in</h2>
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
  );
}

export default ContactCoachLeft