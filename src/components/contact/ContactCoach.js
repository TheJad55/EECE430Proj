import React, { useState } from "react";
import Title from "../layouts/Title";
import ContactCoachLeft from "./ContactCoachLeft";

const ContactCoach = () => {
  const [playerName, setPlayerName] = useState("");
  const [points, setPoints] = useState("");
  const [rebounds, setRebounds] = useState("");
  const [assists, setAssists] = useState("");
  const [steals, setSteals] = useState("");
  const [blocks, setBlocks] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const isInteger = (str) => {
    const num = parseInt(str, 10);
    return !isNaN(num) && str === String(num);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (playerName === "") {
      setErrMsg("Player name is required!");
    } else if (!points || !isInteger(points)) {
      setErrMsg("Points must be an integer!");
    } else if (!rebounds || !isInteger(rebounds)) {
      setErrMsg("Rebounds must be an integer!");
    } else if (!assists || !isInteger(assists)) {
      setErrMsg("Assists must be an integer!");
    } else if (!steals || !isInteger(steals)) {
      setErrMsg("Steals must be an integer!");
    } else if (!blocks || !isInteger(blocks)) {
      setErrMsg("Blocks must be an integer!");
    } else {
      setSuccessMsg(
        `Player stats for ${playerName} have been submitted successfully!`
      );
      setErrMsg("");
      setPlayerName("");
      setPoints("");
      setRebounds("");
      setAssists("");
      setSteals("");
      setBlocks("");
    }
  };
  return (
    <section
      id="Player"
      className="w-full py-20 border-b-[1px] border-b-black"
    >
      <div className="w-full">
        <div className="w-full h-auto flex flex-col lgl:flex-row justify-between">
          <ContactCoachLeft />
          <div className="w-full lgl:w-[60%] h-full py-10 bg-gradient-to-r from-[#1e2024] to-[#23272b] flex flex-col gap-8 p-4 lgl:p-8 rounded-lg shadow-shadowOne">
            <form className="w-full flex flex-col gap-4 lgl:gap-6 py-2 lgl:py-5">
              {errMsg && (
                <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-orange-500 text-base tracking-wide animate-bounce">
                  {errMsg}
                </p>
              )}
              {successMsg && (
                <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce">
                  {successMsg}
                </p>
              )}
              <div className="w-full flex flex-col lgl:flex-row gap-10">
                <div className="w-full lgl:w-1/2 flex flex-col gap-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wide">
                    Player Name
                  </p>
                  <input
                    onChange={(e) => setPlayerName(e.target.value)}
                    value={playerName}
                    className={`${
                    errMsg === "Player name is required!" && "outline-designColor"
                    } contactInput`}
                    type="text"
                    />

                </div>
                <div className="w-full lgl:w-1/2 flex flex-col gap-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wide">
                    Game Number
                  </p>
                  <input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    className={`${
                      errMsg === "Phone number is required!" &&
                      "outline-designColor"
                    } contactInput`}
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Points
                </p>
                <input
                onChange={(e) => setPoints(e.target.value)}
                value={points}
                className={`${
                errMsg === "Points must be an integer!" && "outline-designColor"
                } contactInput`}
                type="text"
                />

              </div>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Rebounds
                </p>
                <input
                onChange={(e) => setRebounds(e.target.value)}
                value={rebounds}
                className={`${
                errMsg === "Rebounds must be an integer!" && "outline-designColor"
                } contactInput`}
                type="text"
                />

              </div>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                 Assists
                </p>
                <input
                onChange={(e) => setAssists(e.target.value)}
                value={assists}
                className={`${
                    errMsg === "Assists must be an integer!" && "outline-designColor"
                } contactInput`}
                type="text"
                />
                </div>
                <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                 Steals
                </p>
                <input
                onChange={(e) => setSteals(e.target.value)}
                value={steals}
                className={`${
                    errMsg === "Steals must be an integer!" && "outline-designColor"
                } contactInput`}
                type="text"
                />
                </div>
                 <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                 Blocks
                </p>
                <input
                onChange={(e) => setBlocks(e.target.value)}
                value={blocks}
                className={`${
                    errMsg === "Blocks must be an integer!" && "outline-designColor"
                } contactInput`}
                type="text"
                />
              </div>
              {/* Add Upload Stats button */}
              <button
              onClick={handleSend}
              className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white text-base py-2 px-4 lgl:px-6 rounded-lg shadow-shadowOne hover:shadow-shadowTwo transition duration-300 ease-in-out focus:outline-none"
            >
              Upload Stats
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
  );
}

export default ContactCoach;