import React from 'react';
import { FaUserTie, FaUtensils, FaShoppingCart, FaHeadset } from 'react-icons/fa';

const features = [
  {
    icon: <FaUserTie size={36} className="text-red-600" />,
    title: 'Master Chefs',
    description: 'Delicious Food with Expert Chefs',
    isHighlighted: false,
  },
  {
    icon: <FaUtensils size={36} className="text-red-600" />,
    title: 'Quality Food',
    description: 'Foods as Per the Prescribed Standard',
    isHighlighted: true,
  },
  {
    icon: <FaShoppingCart size={36} className="text-red-600" />,
    title: 'Online Order',
    description: 'Online food Delivery Facility',
    isHighlighted: false,
  },
  {
    icon: <FaHeadset size={36} className="text-red-600" />,
    title: '24/7 Service',
    description: 'Relish our sweets with the assurance of anytime',
    isHighlighted: false,
  },
];

const ServiceFeatures = () => {
  return (
    <section className="py-12 px-6 md:px-16 bg-[#e4e4e4]">
      {/* Section Title */}
      <div className="flex justify-center mb-10">
        <h2 className="text-red-600 text-2xl font-semibold border-t border-b border-red-500 inline-block px-4 py-1">
          Services
        </h2>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-md p-6 shadow-md transition-transform transform hover:scale-105 bg-white hover:bg-yellow-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
            <p className="text-sm text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceFeatures;
