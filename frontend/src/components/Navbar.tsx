import { Link } from "react-router-dom";
import useAuthStore from "../store/auth";
import { Modal } from "@mantine/core";
import { useState } from "react";
import SearchBlogs from "./SearchBlogs";
import { useMediaQuery } from "@mantine/hooks";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import Authentication from "./Authentication";

const Navbar = () => {
  const { isAuthenticated, logout, isAuthenticatedLoading } = useAuthStore();
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery("(max-width: 50em)");
  const [signinOpen, signinFunction] = useDisclosure(false);

  const logoutButton = () => {
    logout();
  };

  const open = () => setOpened(true);
  const close = () => setOpened(false);

  return (
    <>
      <Drawer
        opened={signinOpen}
        onClose={signinFunction.close}
        title="Authentication"
      >
        <Authentication close={signinFunction.close} />
      </Drawer>
      <div className="w-full shadow-lg">
        <div className="w-full md:w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto h-full z-50">
          <div className="navbar bg-base-100 h-full">
            <div className="flex-1">
              <p className="btn btn-ghost text-xl">
                <Link to={"/"}>Bloggy</Link>
              </p>
            </div>
            <div className="flex gap-3">
              <Modal
                opened={opened}
                onClose={close}
                title="Search Blogs"
                fullScreen={isMobile}
                size={"lg"}
                centered
              >
                <SearchBlogs onClose={close} />
              </Modal>
              <input
                onClick={open}
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto hidden sm:block"
              />
              <div>
                {isAuthenticatedLoading ? (
                  <>
                    <div className="flex justify-center items-center h-full">
                      <button className="btn btn-primary"><span className="loading loading-dots loading-md"></span></button>
                      
                    </div>
                  </>
                ) : (
                  <>
                    {isAuthenticated ? (
                      <div className="flex gap-3">
                        <Link to={"/dashboard"} className="btn btn-primary">
                          Dashboard
                        </Link>
                        <button
                          onClick={logoutButton}
                          className="btn btn-primary"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={signinFunction.open}
                        className="btn btn-primary"
                      >
                        Signin
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
