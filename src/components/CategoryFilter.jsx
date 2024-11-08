const CategoryFilter = ({ categories }) => {
  return (
    <div className="my-8">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Filter by Category
      </h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
