export const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl p-6 shadow-lg border border-gray-200 ${className}`}>
    {children}
  </div>
);