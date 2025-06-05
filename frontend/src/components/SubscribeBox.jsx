import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const SubscribeBox = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    } else {
      toast.error('Please enter a valid email.');
    }
  };

  return (
    <div className='bg-[#a5a5a5] text-gray-700 pt-2 pb-10 px-4'>
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Want us to email you occasionally with Fluffy Delights news?
        </h2>
        <form
          className="flex flex-col sm:flex-row max-w-md mx-auto gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow p-2 rounded border border-gray-300 bg-white text-black outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 font-semibold rounded transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto text-center text-sm text-gray-600 px-4">
        <p>
          Discover Sri Lanka's favorite cake haven – <strong>Fluffy Delights</strong>! From rich, decadent cakes to delicate cupcakes, we craft every treat with love and the finest ingredients. Indulge in heavenly bakes that blend classic flavors with a modern twist – only at Fluffy Delights.
        </p>
      </div>
    </div>
  );
};

export default SubscribeBox;
