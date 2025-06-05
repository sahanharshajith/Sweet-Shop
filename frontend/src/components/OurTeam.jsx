import React from 'react';
import { assets } from '../assets/assets';  

const features = [
  {
    icon: <img src={assets.profile} alt="Profile Icon" className="w-30 h-30 rounded-full shadow-lg border-4 border-red-400 hover:scale-110 transition-transform duration-300" />,
    name: 'Amila Wickramasinghe',
    description: 'Director',
    isHighlighted: false,
  },
  {
    icon: <img src={assets.profile} alt="Profile Icon" className="w-30 h-30 rounded-full shadow-lg border-4 border-yellow-500 hover:scale-110 transition-transform duration-300" />,
    name: 'S.H.D. Thakshila',
    description: 'Director',
    isHighlighted: true,
  },
  {
    icon: <img src={assets.profile} alt="Profile Icon" className="w-30 h-30 rounded-full shadow-lg border-4 border-blue-400 hover:scale-110 transition-transform duration-300" />,
    name: 'Ramesh',
    description: 'Head Chef',
    isHighlighted: false,
  },
  {
    icon: <img src={assets.profile} alt="Profile Icon" className="w-30 h-30 rounded-full shadow-lg border-4 border-green-400 hover:scale-110 transition-transform duration-300" />,
    name: 'Nirosha',
    description: 'Administrator',
    isHighlighted: false,
  },
];

const OurTeam = () => {
  return (
    <section className="py-12 px-6 md:px-16 bg-[#a5a5a5] text-center">
      <div className="flex justify-center mb-10">
        <h2 className="text-red-600 text-2xl font-semibold border-t border-b border-red-500 inline-block px-4 py-1">
          Team Members
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-md p-6 shadow-md transition-transform transform hover:scale-105 bg-white"
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-1">{feature.name}</h3>
            <p className="text-sm text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurTeam;
