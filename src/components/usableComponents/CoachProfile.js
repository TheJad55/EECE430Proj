import React, { useState, useEffect } from "react";
import jsImg from "../../assets/images/playerIMG/js.jpg";
import profilePhotox from "../../assets/images/playerIMG/profilePhotox.png";
import bouncepp from "../../assets/images/playerIMG/bouncepp.png";

const CoachProfile = () => {
  const [coach, setCoach] = useState(null);

  useEffect(() => {
    const fetchCoachDetails = async () => {
      const accessToken = sessionStorage.getItem("access_token");

      if (accessToken) {
        const response = await fetch("http://127.0.0.1:8000/teams/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const coachData = await response.json();
          setCoach(coachData);
        }
      }
    };

    fetchCoachDetails();
  }, []);

  if (!coach) {
    return <div>Loading...</div>;
  }

  return (
    <section
      id="profile2"
      className="w-full py-20 border-b-[1px] border-b-black"
    >
      <h1 className="text-6xl font-bold text-white text-center mb-5">
        Welcome to your profile
      </h1>
      <h2 className="text-6xl font-bold text-designColor capitalize text-center mb-5">
        {coach.TeamManagerFirstname} {coach.TeamManagerLastname}
      </h2>
      <div className="content-center mx-auto flex justify-center">
        <div className="w-2/3">
          <div className="w-full">
            <div className="flex flex-col items-center bg-grey-700"></div>
            <div
              className="shadow-shadowOne rounded-lg p-8 shadow-md w-full mx-auto my-10 flex bg-grey-800"            >
              <div className="w-1/3">
                <img
                className="rounded-lg object-cover w-full h-96"
                src={bouncepp} // Replace this with a coach image fetched from the API if needed
                  alt={
                    coach.TeamManagerFirstname + " " + coach.TeamManagerLastname
                  }
                />
              </div>
              <div className="w-1/2 ml-12">
                <h2 className="text-4xl font-semibold mb-6">
                  {coach.TeamManagerFirstname} {coach.TeamManagerLastname}
                </h2>
                <p className="text-xl mb-5">
                  <strong>Team:</strong> {coach.TeamName}
                </p>
                <p className="text-xl mb-5">
                  <strong>Email:</strong> {coach.TeamManagerEmail}
                </p>
                <p className="text-xl mb-5">
                  <strong>Country:</strong> {coach.Country}
                </p>
                <p className="text-xl mb-5">
                  <strong>Games Won:</strong> {coach.GamesWon}
                </p>
                <p className="text-xl mb-5">
                  <strong>Games Lost:</strong> {coach.GamesLost}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 flex items-end justify-center mb-10">
          <img className="h-96" src={profilePhotox} alt={coach.TeamName} />
        </div>
      </div>
    </section>
  );
};

export default CoachProfile;
