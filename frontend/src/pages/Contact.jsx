import { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import SubscribeBox from '../components/SubscribeBox';
import toast, { Toaster } from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.subject.trim() &&
      formData.message.trim()
    ) {
      toast.success('Your message has been sent!Our team will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      toast.error('Please fill in all fields.');
    }
  };
  
  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-[#a5a5a5] min-h-screen p-4 md:p-8 flex flex-col items-center">
        <h2 className="text-red-600 text-2xl font-semibold border-t border-b border-red-500 inline-block px-4 py-1 mb-6">
          Contact Us
        </h2>
        <div className="max-w-6xl w-full mx-auto bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-3xl font-bold text-gray-900">Contact For Any Query</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* Contact Info */}
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1">
                  <h2 className="text-xl font-medium text-red-500 relative inline-block">
                    General
                    <span className="absolute left-0 right-0 h-0.5 bg-red-500 -bottom-1"></span>
                  </h2>
                  <div className="flex items-center mt-3">
                    <Phone className="text-red-500 mr-2" size={20} />
                    <span className="text-gray-700">0112 345 678</span>
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-medium text-red-500 relative inline-block">
                    Technical
                    <span className="absolute left-0 right-0 h-0.5 bg-red-500 -bottom-1"></span>
                  </h2>
                  <div className="flex items-center mt-3">
                    <Mail className="text-red-500 mr-2" size={20} />
                    <span className="text-gray-700">fluffydelights.lk@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="w-full h-48 md:h-72 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.6657771585938!2d72.86329616936628!3d19.209794908052633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7125144ba69%3A0x6fe1beff7b3205b5!2sFluffy%20Delights!5e0!3m2!1sen!2slk!4v1749144224183!5m2!1sen!2slk"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Fluffy Delights by U Location"
                ></iframe>
              </div>
            </div>

            <div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="7"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                ></textarea>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                >
                  SEND MESSAGE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubscribeBox />
    </>
  );
}
