import React, { useState, useEffect } from "react";

import ContactCoachLeft from "./ContactCoachLeft";

const ContactCoach = () => {
  const [usernames, setUsernames] = useState([]);
  const [gameIds, setGameIds] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [points, setPoints] = useState("");
  const [rebounds, setRebounds] = useState("");
  const [assists, setAssists] = useState("");
  const [steals, setSteals] = useState("");
  const [blocks, setBlocks] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    async function fetchUsernames() {
      try {
        const response = await fetch("http://127.0.0.1:8000/getteamates/team", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        });
        const data = await response.json();
        console.log("Fetched usernames:", data);
        if (Array.isArray(data)) {
          setUsernames(data);
        }
      } catch (error) {
        console.error(`Error fetching usernames: ${error}`);
      }
    }

    async function fetchGameIds() {
      try {
        const response = await fetch("http://127.0.0.1:8000/games");
        const data = await response.json();
        setGameIds(data);
      } catch (error) {
        console.error(`Error fetching game ids: ${error}`);
      }
    }

    fetchUsernames();
    fetchGameIds();
  }, [token]);

  const isInteger = (str) => {
    const num = parseInt(str, 10);
    return !isNaN(num) && str === String(num);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (selectedUsername === "") {
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
      try {
        const response = await fetch("http://127.0.0.1:8000/stats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            player: selectedUsername,
            game_number: selectedGameId,
            points: parseInt(points),
            assists: parseInt(assists),
            rebounds: parseInt(rebounds),
            steals: parseInt(steals),
            blocks: parseInt(blocks),
          }),
        });

        if (response.ok) {
          setSuccessMsg(
            `Player stats for ${selectedUsername} have been submitted successfully!`
          );
          setErrMsg("");
          setSelectedUsername("");
          setSelectedGameId(null);
          setPoints("");
          setRebounds("");
          setAssists("");
          setSteals("");
          setBlocks("");
        } else {
          // Handle error
          console.error(`Error submitting data: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error submitting data: ${error}`);
      }
    }
  };

  return (
    <section id="add" className="w-full py-20 border-b-[1px] border-b-black">
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
                  <select
                    onChange={(e) => setSelectedUsername(e.target.value)}
                    value={selectedUsername}
                    className="contactInput"
                  >
                    <option value="">Select a player</option>
                    {usernames.map((username, index) => (
                      <option key={index} value={username}>
                        {username}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full lgl:w-1/2 flex flex-col gap-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wide">
                    Game Number
                  </p>
                  <select
                    onChange={(e) => setSelectedGameId(e.target.value)}
                    value={selectedGameId}
                    className="contactInput"
                  >
                    <option value="">Select a game</option>
                    {gameIds.map((gameId, index) => (
                      <option key={index} value={gameId}>
                        {gameId}
                      </option>
                    ))}
                  </select>
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
                    errMsg === "Points must be an integer!" &&
                    "outline-designColor"
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
                    errMsg === "Rebounds must be an integer!" &&
                    "outline-designColor"
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
                    errMsg === "Assists must be an integer!" &&
                    "outline-designColor"
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
                    errMsg === "Steals must be an integer!" &&
                    "outline-designColor"
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
                    errMsg === "Blocks must be an integer!" &&
                    "outline-designColor"
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
};

export default ContactCoach;
