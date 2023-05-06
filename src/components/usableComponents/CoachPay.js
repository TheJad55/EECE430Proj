import React, { useState, useEffect } from "react";

const CoachPay = () => {
  const [usernames, setUsernames] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteErrMsg, setDeleteErrMsg] = useState("");
  const [deleteSuccessMsg, setDeleteSuccessMsg] = useState("");
  const [selectedUsernameToDelete, setSelectedUsernameToDelete] = useState("");

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

    fetchUsernames();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (selectedUsername === "") {
      setErrMsg("Player name is required!");
    } else if (!amount || isNaN(parseFloat(amount))) {
      setErrMsg("Amount must be a number!");
    } else {
      try {
        const response = await fetch(`http://127.0.0.1:8000/coachpay/${selectedUsername}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            username: selectedUsername,
            PaymentAmount: parseFloat(amount),
          }),
        });
  
        if (response.ok) {
          setSuccessMsg(
        `Payment of ${amount} for ${selectedUsername} has been added to the account!`
          );
          setErrMsg("");
          setSelectedUsername("");
          setAmount("");
        } else {
          // Handle error
          console.error(`Error submitting data: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error submitting data: ${error}`);
      }
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    if (selectedUsernameToDelete === "") {
      setDeleteErrMsg("Player name is required!");
    } else {
      try {
        const response = await fetch(`http://127.0.0.1:8000/user/${selectedUsernameToDelete}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDeleteSuccessMsg(data);
          setDeleteErrMsg("");
          setSelectedUsernameToDelete("");
        } else {
          const error = await response.json();
          setDeleteErrMsg(error);
          setDeleteSuccessMsg("");
        }
      } catch (error) {
        console.error(`Error deleting user: ${error}`);
      }
    }
  };

  return (
    <section id="coach-pay" className="w-full py-20 border-b-[1px] border-b-black">
      <div className="w-full">
        <div className="w-full h-auto flex flex-col lg:flex-row justify-between">
          <div className="w-full lg:w-1/2 h-full py-10 bg-gradient-to-r from-[#1e2024] to-[#23272b] flex flex-col gap-8 p-4 lg:p-8 rounded-lg shadow-shadowOne mb-4 lg:mb-0 lg:mr-4">
            <form className="w-full flex flex-col gap-4 lg:gap-6 py-2 lg:py-5">
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
              <div className="w-full flex flex-col gap-4">
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
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Amount
                </p>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  className={`${
                    errMsg === "Amount must be a number!" &&
                    "outline-designColor"
                  } contactInput`}
                  type="text"
                />
              </div>
              <button
                onClick={handleSend}
                className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white text-base py-2 px-4 lg:px-6 rounded-lg shadow-shadowOne hover:shadow-shadowTwo transition duration-300 ease-in-out focus:outline-none"
              >
                Submit Payment
              </button>
            </form>
          </div>
          <div className="w-full lgl:w-[60%] h-full py-10 bg-gradient-to-r from-[#1e2024] to-[#23272b] flex flex-col gap-8 p-4 lgl:p-8 rounded-lg shadow-shadowOne">
      <form className="w-full flex flex-col gap-4 lgl:gap-6 py-2 lgl:py-5">
        {deleteErrMsg && (
          <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-orange-500 text-base tracking-wide animate-bounce">
            {deleteErrMsg}
          </p>
        )}
        {deleteSuccessMsg && (
          <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce">
            {deleteSuccessMsg}
          </p>
        )}
        <div className="w-full flex flex-col gap-4">
          <p className="text-sm text-gray-400 uppercase tracking-wide">
            Player Name
          </p>
          <select
            onChange={(e) => setSelectedUsernameToDelete(e.target.value)}
            value={selectedUsernameToDelete}
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
        <button
          onClick={handleDelete}
          className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white text-base py-2 px-4 lgl:px-6 rounded-lg shadow-shadowOne hover:shadow-shadowTwo transition duration-300 ease-in-out focus:outline-none"
        >
          Remove Player
        </button>
      </form>
    </div>
          </div>
        </div>
    </section>
  );
  
};

export default CoachPay;
