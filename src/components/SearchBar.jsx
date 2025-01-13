import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch, isSearching }) => {
  return (
    <div className="relative w-full sm:w-96 mx-auto mb-8">
      <input
        type="text"
        placeholder="Search articles..."
        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 pr-12 rounded-lg shadow-md w-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        {isSearching ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400" />
        ) : (
          <FaSearch className="text-gray-400 dark:text-gray-500" />
        )}
      </div>
    </div>
  );
};

export default SearchBar;