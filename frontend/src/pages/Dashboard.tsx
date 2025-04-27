import DashboardData from "../components/DashboardData";
import { useEffect } from "react";
import useBlogStore from "../store/blog";
import DashboardBlogs from "../components/DashboardBlogs";

const Dashboard = () => {

  const { getBlogs } = useBlogStore();

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return (
    <div className="w-full mt-1">
      <div className="w-full md:w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
        <DashboardData />
        <DashboardBlogs />
      </div>
    </div>
  );
};

export default Dashboard;
