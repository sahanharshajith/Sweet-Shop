import React from 'react';
import { assets } from '../assets/assets';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <>
      <section className="bg-[#e4e4e4] py-12 px-6 md:px-16 text-center">

        <div className="flex justify-center mb-6">
          <h2 className="text-red-600 text-2xl font-semibold border-t border-b border-red-500 inline-block px-4 py-1">
            About Us
          </h2>
        </div>

        <div className="text-4xl font-bold mb-6 text-gray-800">
          Welcome to <span role="img" aria-label="fork and knife">🍴</span> <span className="text-blue-900">Sweet Hut</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img src={assets.cakeImage} alt="Cake" className="w-48 h-48 object-cover rounded shadow-lg" />
            <img src={assets.starSweetImage} alt="Star sweet" className="w-48 h-48 object-cover rounded shadow-lg" />
            <img src={assets.citrusImage} alt="Citrus sweet" className="w-48 h-48 object-cover rounded shadow-lg" />
            <img src={assets.logoImage} alt="Logo" className="w-48 h-48 object-cover rounded shadow-lg" />
          </div>

          <div className="md:w-1/2 text-gray-700 text-lg leading-relaxed md:text-left">
            <p className="mb-4 text-center">
              Where every confectionery creation tells a story of indulgence and joy.
              Established with a passion for crafting exquisite sweets, we pride
              ourselves on using the finest ingredients and traditional recipes to
              create a delightful array of treats.
            </p>
            <p className="mb-4 text-center">
              Our commitment to quality and creativity ensures that each visit to Sweet
              Hut is a delightful experience, where sweetness meets perfection. Join us
              in savoring the moments, one delicious bite at a time.
            </p>

            <div className="flex justify-center md:justify-start gap-15 text-center mt-10 ml-20">
              <div>
                <div className="text-red-600 text-4xl font-bold">10</div>
                <div className="uppercase text-sm text-gray-500">Years of</div>
                <div className="font-semibold">Experience</div>
              </div>
              <div>
                <div className="text-red-600 text-4xl font-bold">30000 +</div>
                <div className="uppercase text-sm text-gray-500">Regular</div>
                <div className="font-semibold">Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};



export default AboutUs;
