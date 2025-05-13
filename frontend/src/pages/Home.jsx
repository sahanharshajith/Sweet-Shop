import React from 'react'
import Hero from '../components/Hero'
import OurTeam from '../components/OurTeam';
import PopularItems from '../components/PopularItems';
import BestSeller from '../components/BestSeller';

const Home = () => {
  return (
    <div>
        <Hero />
        <OurTeam />
        <PopularItems />
        <BestSeller />
    </div>
  )
}

export default Home