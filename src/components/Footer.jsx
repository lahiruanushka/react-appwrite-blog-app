import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center">
              <Logo width="100px" className="text-gray-800" />
            </Link>
            <p>
              &copy; {new Date().getFullYear()} BlogVerse. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="/" className="text-gray-500 hover:text-gray-800">
                <FaFacebookF />
              </a>
              <a href="/" className="text-gray-500 hover:text-gray-800">
                <FaTwitter />
              </a>
              <a href="/" className="text-gray-500 hover:text-gray-800">
                <FaInstagram />
              </a>
              <a href="/" className="text-gray-500 hover:text-gray-800">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">Company</h3>
            <ul className="space-y-2 mt-2">
              <li>
                <Link to="/" className="hover:text-gray-800">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-800">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-800">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-800">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">Support</h3>
            <ul className="space-y-2 mt-2">
              <li>
                <Link to="/" className="hover:text-gray-800">
                  Account
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-800">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-800">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-800">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">Legals</h3>
            <ul className="space-y-2 mt-2">
              <li>
                <Link to="/" className="hover:text-gray-800">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-800">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-800">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-gray-800 font-medium mb-4">
              Subscribe to our newsletter
            </h3>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l-lg flex-1 focus:outline-none focus:ring focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm mt-2 text-gray-500">
              Stay up-to-date with the latest news and updates from BlogVerse.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
