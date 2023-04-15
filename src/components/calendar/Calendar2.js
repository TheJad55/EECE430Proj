import Calendar from "./Calendar.jsx";
import Navbar from '../navbar/Navbar';

const Calendar2 = () => {
    return (
      <div className="w-full h-auto bg-bodyColor text-lightText ">
        <Navbar />

        <div className="max-w-screen-xl mx-auto">
        <Calendar />
      </div>
      </div>
    );
  }
  
  export default Calendar2;