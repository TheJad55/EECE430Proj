import React from "react";
import jsImg from "../../assets/images/playerIMG/js.jpg";
import teamLogo from "../../assets/images/playerIMG/teamLogo.png";

const CoachProfile = () => {
  const coach = {
    imageUrl: jsImg,
    name: "John Smith",
    age: 45,
    team: "Boston Celtics",
    position: "Head Coach",
    yearsOfExperience: 20,
    education: "Bachelor's degree in Sports Management",
    championships: 2,
    teamColor: "#2F5233",
  };

  return (
    <div className="content-center mx-auto flex justify-center">
      <div className="w-2/3">
        <div className="w-full">
          <div className="flex flex-col items-center"></div>
          <div
            className="shadow-shadowOne rounded-lg p-8 shadow-md w-full mx-auto my-10 flex"
            style={{ backgroundColor: coach.teamColor }}
          >
            <div className="w-1/2">
              <img
                className="rounded-lg object-cover w-full h-96"
                src={coach.imageUrl}
                alt={coach.name}
              />
            </div>
            <div className="w-1/2 ml-12">
              <h2 className="text-4xl font-semibold mb-6">{coach.name}</h2>
              <p className="text-xl mb-2">
                <strong>Age:</strong> {coach.age}
              </p>
              <p className="text-xl mb-2">
                <strong>Team:</strong> {coach.team}
              </p>
              <p className="text-xl mb-2">
                <strong>Position:</strong> {coach.position}
              </p>
              <p className="text-xl mb-2">
                <strong>Years of Experience:</strong> {coach.yearsOfExperience}
              </p>
              <p className="text-xl mb-2">
                <strong>Education:</strong> {coach.education}
              </p>
              <p className="text-xl mb-2">
                <strong>Championships:</strong> {coach.championships}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 flex items-end justify-center mb-10">
        <img className="h-96" src={teamLogo} alt={coach.team} />
      </div>
    </div>
  );
};

export default CoachProfile;
