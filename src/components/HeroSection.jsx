import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-200">
            Welcome to
            <span className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BlogVerse
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover the latest trends and insights in the blogosphere.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
