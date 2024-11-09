const Button = ({ children, isLoading, ...props }) => {
  return (
    <button
      {...props}
      className={`
        w-full px-4 py-3 text-sm font-semibold text-white
        bg-blue-500 hover:bg-blue-600 
        dark:bg-blue-600 dark:hover:bg-blue-700
        rounded-lg transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-800
        disabled:opacity-50 disabled:cursor-not-allowed
        ${props.className || ''}
      `}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </div>
      ) : children}
    </button>
  );
};

export default Button;