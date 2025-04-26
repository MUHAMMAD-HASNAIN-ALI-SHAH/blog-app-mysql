import { useEffect } from "react";
import useHomeBlogStore from "../store/home";
import { useNavigate } from "react-router-dom";

const HomeBlogs = () => {
  const { blogs, getBlogs } = useHomeBlogStore();
  const navigate = useNavigate();

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  const openDetails = (id: number) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Blogs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="card bg-base-100 w-full border border-base-200 rounded-2xl shadow-lg"
            >
              <figure className="h-[180px]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </figure>

              <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold">
                  {blog.title}
                </h2>

                <p className="text-gray-600 text-sm">
                  {blog.description.length > 100
                    ? `${blog.description.substring(0, 100)}...`
                    : blog.description}
                </p>

                <div className="card-actions justify-end mt-2">
                  <button
                    onClick={() => blog.id !== null && openDetails(blog.id)}
                    className="btn btn-error btn-sm"
                  >
                    Show Blog
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 w-full text-center">No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default HomeBlogs;
