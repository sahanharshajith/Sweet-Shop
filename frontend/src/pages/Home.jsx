import React from 'react'
import Hero from '../components/Hero'
import Footer from '../components/Footer';
import OurTeam from '../components/OurTeam';
import PopularItems from '../components/PopularItems';

const Home = () => {
  return (
    <div>
        <Hero />
        <OurTeam />
        <PopularItems />
        <Footer />
    </div>
  )
}

export default Home