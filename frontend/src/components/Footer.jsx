import React from 'react';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {

  return (
    <footer className="bg-[#1a2e50] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="text-center">
          <h3 className="font-bold mb-4 relative inline-block">
            Company
            <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-0.5 bg-red-500"></span>
          </h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-red-300">About Us</a></li>
            <li><a href="#" className="hover:text-red-300">Contact Us</a></li>
            <li><a href="#" className="hover:text-red-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-red-300">Terms & condition</a></li>
          </ul>
        </div>

        <div className="text-center">
          <h3 className="font-bold mb-4 relative inline-block">
            Opening
            <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-0.5 bg-red-500"></span>
          </h3>
          <ul className="space-y-2">
            <li>Monday - Sunday 08AM - 08PM</li>
            <li>Poya Day 08AM - 06PM</li>
          </ul>
        </div>

        <div className="text-center">
          <h3 className="font-bold mb-4 relative inline-block">
            Closed
            <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-0.5 bg-red-500"></span>
          </h3>
          <ul className="space-y-2">
            <li>February 4th (closed)</li>
            <li>April 14th & 15th (closed)</li>
            <li>May 1st (closed)</li>
          </ul>
        </div>

        <div className="text-center">
          <h3 className="font-bold mb-4 relative inline-block">
            Contact Us
            <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-0.5 bg-red-500"></span>
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-center">
              <Mail size={16} className="mr-2" />
              <a href="mailto:sweethut.lk@gmail.com" className="hover:text-red-300">sweethut.lk@gmail.com</a>
            </li>
            <li className="flex items-center justify-center">
              <Phone size={16} className="mr-2" />
              <a href="tel:0112886565" className="hover:text-red-300">0112 886 565</a>
            </li>
            <li className="flex items-center justify-center">
              <Phone size={16} className="mr-2" />
              <a href="tel:0715500680" className="hover:text-red-300">0715500680</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        <a href="#" className="w-8 h-8 border border-white rounded-sm flex items-center justify-center hover:bg-white hover:text-[#0f1b33] transition-colors">
          <span className="sr-only">Facebook</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 320 512">
            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
          </svg>
        </a>
        <a href="#" className="w-8 h-8 border border-white rounded-sm flex items-center justify-center hover:bg-white hover:text-[#0f1b33] transition-colors">
          <span className="sr-only">Twitter</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 512 512">
            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
          </svg>
        </a>
        <a href="#" className="w-8 h-8 border border-white rounded-sm flex items-center justify-center hover:bg-white hover:text-[#0f1b33] transition-colors">
          <span className="sr-only">Google</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 488 512">
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
          </svg>
        </a>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <a href="#" className="text-yellow-500 hover:text-yellow-300">Home</a>
        <a href="#" className="text-yellow-500 hover:text-yellow-300">Cookies</a>
        <a href="#" className="text-yellow-500 hover:text-yellow-300">Help</a>
        <a href="#" className="text-yellow-500 hover:text-yellow-300">FAQ</a>
      </div>

      <div className="text-center">
        <p>© Copyright All Rights Reserved: Visual Soft</p>
      </div>
    </footer>
  );
}