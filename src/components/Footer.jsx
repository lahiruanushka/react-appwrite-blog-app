import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

function Footer() {

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BlogVerse
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} BlogVerse. All rights reserved.
            </p>
            <div className="flex space-x-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200">
              <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                <FaFacebookF />
              </a>
              <a href="/" className="hover:text-blue-400 dark:hover:text-blue-300">
                <FaTwitter />
              </a>
              <a href="/" className="hover:text-pink-600 dark:hover:text-pink-400">
                <FaInstagram />
              </a>
              <a href="/" className="hover:text-blue-700 dark:hover:text-blue-500">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <Disclosure as="div" className="space-y-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between items-center w-full text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200">
                  <span>Company</span>
                  <span className="text-gray-400 dark:text-gray-500">
                    {open ? (
                      <FaChevronUp className="w-4 h-4" />
                    ) : (
                      <FaChevronDown className="w-4 h-4" />
                    )}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="space-y-2 mt-2">
                  <Link
                    to="/"
                    className="block hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                  >
                    Features
                  </Link>
                  <Link
                    to="/"
                    className="block hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/"
                    className="block hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                  >
                    Affiliate Program
                  </Link>
                  <Link
                    to="/"
                    className="block hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                  >
                    Press Kit
                  </Link>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure as="div" className="space-y-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between items-center w-full text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200">
                  <span>Support</span>
                  <span className="text-gray-400 dark:text-gray-500">
                    {open ? (
                      <FaChevronUp className="w-4 h-4" />
                    ) : (
                      <FaChevronDown className="w-4 h-4" />
                    )}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="space-y-2 mt-2">
                  <Link
                    to="/"
                    className="block hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                  >
                    Account
                  </Link>
                  <Link
                    to="/"
                    className="block hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                  >
                    Help
                  </Link>
                  <Link
                    to="/"
                    className="block hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/"
                    className="block hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                  >
                    Customer Support
                  </Link>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure as="div" className="space-y-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between items-center w-full text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200">
                  <span>Legals</span>
                  <span className="text-gray-400 dark:text-gray-500">
                    {open ? (
                      <FaChevronUp className="w-4 h-4" />
                    ) : (
                      <FaChevronDown className="w-4 h-4" />
                    )}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="space-y-2 mt-2">
                  <Link
                    to="/"
                    className="block hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    to="/"
                    className="block hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/"
                    className="block hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                  >
                    Licensing
                  </Link>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <div className="col-span-1 sm:col-span-2 md:col-span-1 space-y-4">
            <h3 className="text-gray-800 dark:text-gray-200 font-medium mb-2">
              Subscribe to our newsletter
            </h3>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-l-lg flex-1 focus:outline-none focus:ring focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Stay up-to-date with the latest news and updates from BlogVerse.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;