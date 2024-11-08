import PostCard from "./PostCard";

const FeaturedPosts = ({ posts }) => {
  return (
    <div className="my-12">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
        Featured Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.$id}>
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
