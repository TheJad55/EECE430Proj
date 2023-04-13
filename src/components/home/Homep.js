import React from 'react';
import Banner from '../banner/Banner';
import Features from '../features/Features';
import Testimonial from '../tesimonial/Testimonial';
import Contact from '../contact/Contact';
import Navbar from '../navbar/Navbar';


const Homep = () => {
    return (
      <div className="w-full h-auto bg-bodyColor text-lightText ">
        <Navbar />

        <div className="max-w-screen-xl mx-auto">
        <Banner />
        <Features />
        <Testimonial/>
        <Contact/>
      </div>
      </div>
    );
  }
  
  export default Homep;