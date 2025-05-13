import React from 'react'
import Hero from '../components/Hero'
import OurTeam from '../components/OurTeam';
import PopularItems from '../components/PopularItems';
import BestSeller from '../components/BestSeller';
import SubscribeBox from '../components/SubscribeBox';

const Home = () => {
  return (
    <div>
        <Hero />
        <PopularItems />
        <BestSeller />
        <OurTeam />
        <SubscribeBox />
    </div>
  )
}

export default Home