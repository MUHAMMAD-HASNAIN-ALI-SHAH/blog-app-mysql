import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import useAuthStore from "./store/auth";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";

function App() {
  const { verify } = useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      verify();
    };
    verifyAuth();
  }, [verify]);

  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
