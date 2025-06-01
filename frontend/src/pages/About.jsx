import React from 'react';
import { assets } from '../assets/assets';
import SubscribeBox from '../components/SubscribeBox';

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
          Welcome to <span role="img" aria-label="cake">🎂</span> <span className="text-blue-900">Fluffy Delights</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img src={assets.cakeImage} alt="Cake" className="w-48 h-48 object-cover rounded shadow-lg" />
            <img src={assets.starSweetImage} alt="Star sweet" className="w-48 h-48 object-cover rounded shadow-lg" />
            <img src={assets.banana} alt="Citrus sweet" className="w-48 h-48 object-cover rounded shadow-lg" />
            <img src={assets.chocolate_marble} alt="Logo" className="w-48 h-48 object-cover rounded shadow-lg" />
          </div>

          <div className="md:w-1/2 text-gray-700 text-lg leading-relaxed md:text-left">
            <p className="mb-4 text-center">
              Where every cake is a celebration and every slice tells a story. <br />
              At Fluffy Delights, we're passionate about baking cakes that not only taste divine but also create unforgettable moments. From rich chocolate layers to delicately frosted fruit cakes, we blend the finest ingredients with timeless techniques and modern flair.
            </p>
            <p className="mb-4 text-center">
              Whether it’s a birthday, wedding, or just a craving for something sweet, our cakes are handcrafted to bring joy to every occasion. Step into Fluffy Delights — where cake dreams come true, one slice at a time.
            </p>

            <div className="flex flex-col md:flex-row justify-center md:justify-start gap-8 text-center mt-10 ml-0 md:ml-20">
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
      <SubscribeBox />
    </>
  );
};



export default AboutUs;
