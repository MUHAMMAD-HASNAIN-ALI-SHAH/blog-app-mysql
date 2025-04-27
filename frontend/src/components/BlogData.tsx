import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import useBlogStore from "../store/blog";
import useHomeBlogStore from "../store/home";
import useAuthStore from "../store/auth";
import toast from "react-hot-toast";

const blog = () => {
  const { id } = useParams();
  const blogId = id ? parseInt(id, 10) : null;
  const { like } = useBlogStore();
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [likeStatusLoading, setLikeStatusLoading] = useState<boolean>(false);
  const [likeSatusFailed, setLikeStatusFailed] = useState<boolean>(false);
  const { getBlogData, blog } = useHomeBlogStore();
  const { isAuthenticated } = useAuthStore();

  if (blogId === null || isNaN(blogId)) {
    return <p>Error: Invalid blog ID</p>;
  }

  useEffect(() => {
    useHomeBlogStore.getState().clearStateBlogData();
    getBlogData(blogId);
  }, [id]);

  const fetchLikeStatus = async () => {
    try {
      setLikeStatusLoading(true);
      const response = await axiosInstance.get(`/v2/blog/like/${id}`);
      setLikeStatusLoading(false);
      setLiked(response.data.liked);
    } catch (error) {
      toast.error("Error fetching like status", { duration: 3000 });
      setLikeStatusLoading(false);
      setLikeStatusFailed(true);
    }
  };

  useEffect(() => {
    fetchLikeStatus();
  }, [id]);

  const LikeBlog = async (blogId: number | null) => {
    if (!blogId) return;
    if (!isAuthenticated) {
      toast.error("Please login to like a blog", { duration: 3000 });
      return;
    }
    setLoading(true);
    try {
      await like(blogId);
      await getBlogData(blogId);
      await fetchLikeStatus();
    } catch (error) {
      console.error("Error liking the blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-2 sm:px-0 flex flex-col justify-center items-center mt-5 mb-5">
      <div className="sm:w-[600px] h-full w-full flex flex-col gap-2">
        {blog ? (
          <>
            <img
              src={blog.image}
              alt="Blog Image"
              className="h-[300px] w-full object-cover rounded-lg"
            />
            <h1 className="text-2xl font-bold text-start">{blog.title}</h1>
            <p className="text-sm w-full text-justify md:text-lg">
              {blog.description}
            </p>
            <div className="flex flex-col items-center justify-center">
              {!likeStatusLoading ? (
                !likeSatusFailed ? (
                  <>
                    <button
                      onClick={() => LikeBlog(blog.id)}
                      disabled={loading}
                      className={`ri-heart-3-${
                        liked ? "fill" : "line"
                      } text-2xl cursor-pointer ${loading ? "opacity-50" : ""}`}
                      style={{ pointerEvents: loading ? "none" : "auto" }}
                    ></button>
                    <p>{blog.likes?.length || 0}</p>
                  </>
                ) : (
                  <p className="text-red-500">⚠️ Error fetching like status</p>
                )
              ) : (
                <span className="loading loading-spinner loading-xl"></span>
              )}
            </div>
            <Comments
              id={blogId}
              blogId={blogId}
              comments={blog.comments || []}
            />
          </>
        ) : (
          <div className="flex justify-center items-center h-[80vh]">
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default blog;
