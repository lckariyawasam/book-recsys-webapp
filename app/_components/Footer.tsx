// components/Footer.tsx
import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 py-8">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="bg-yellow-500 rounded-full p-2">
            {/* Replace with your actual logo */}
            <span className="text-white font-bold text-xl">Logo</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12">
          <div>
            <h3 className="font-semibold mb-2">Product</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-800">Features</a></li>
              <li><a href="#" className="hover:text-gray-800">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-800">Blog</a></li>
              <li><a href="#" className="hover:text-gray-800">User guides</a></li>
              <li><a href="#" className="hover:text-gray-800">Webinars</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Community</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-800">Developers</a></li>
              <li><a href="#" className="hover:text-gray-800">Users</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Company</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-800">About</a></li>
              <li><a href="#" className="hover:text-gray-800">Join us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Support</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-800">Help center</a></li>
              <li><a href="#" className="hover:text-gray-800">Chat support</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 flex flex-col items-center md:flex-row md:justify-between">
        <div className="text-sm text-gray-500 mb-4 md:mb-0">
          © 2022 Brand, Inc. • <a href="#" className="hover:text-gray-800">Privacy</a> • <a href="#" className="hover:text-gray-800">Terms</a> • <a href="#" className="hover:text-gray-800">Sitemap</a>
        </div>
        <div className="flex space-x-4">
          <a href="#">
            <Image src="/twitter-icon.png" alt="Twitter" width={24} height={24} />
          </a>
          <a href="#">
            <Image src="/facebook-icon.png" alt="Facebook" width={24} height={24} />
          </a>
          <a href="#">
            <Image src="/linkedin-icon.png" alt="LinkedIn" width={24} height={24} />
          </a>
          <a href="#">
            <Image src="/youtube-icon.png" alt="YouTube" width={24} height={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
