import React from 'react'
import {ImProfile} from "react-icons/im";
import {TbTournament} from "react-icons/tb";
import {BsGraphUp, BsCalendar} from "react-icons/bs";
import {GoGraph} from "react-icons/go";
import {AiOutlineTeam} from "react-icons/ai"
import Title from '../layouts/Title';
import Card from './Card';

const Features = () => {
  return (
    <section
      id="features"
      className="w-full py-20 border-b-[1px] border-b-black"
    >
      <Title title="Features" des="What We Offer" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-20">
        <Card
          title="Performance Tracking"
          des="Monitor your players' shots, passes, and other stats to gain valuable insights and 
          improve their game."
          icon={<ImProfile />}
        />
        <Card
          title="Stat Projection"
          des="Discover future performance insights with Stat Projection, a powerful tool that estimates points, assists,
           and other key stats for your players."
          icon={<BsGraphUp />}
        />
        <Card
          title="Advanced Team Analytics"
          des="Optimize team success with advanced analytics for data-driven decisions on 
          player performance."
          icon={<GoGraph />}
        />
        <Card
          title="Interactive Calendar"
          des="Effortlessly manage your schedule with our interactive calendar that lets you schedule
           games, practices, and more."
          icon={<BsCalendar />}
        />
        <Card
          title="Comparison Software"
          des="Compare and contrast the skills and performance of two players with our intuitive Comparison Software, 
          designed to help you make informed decisions."
          icon={<AiOutlineTeam />}
        />
        <Card
          title="Tournament Browsing"
          des="Explore, join, and create exciting tournaments with Tournament Browsing, a comprehensive platform designed to connect 
          players and enhance competition."
          icon={<TbTournament />}
        />
      </div>
    </section>
  );
}

export default Features