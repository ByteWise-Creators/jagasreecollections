import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import classNames from "classnames";

import Login from "../components/Login";
import Signup from "../components/Signup";

import { IoCloseOutline } from "react-icons/io5";
import verified from "../assets/icons/verified.png";
import Button from "../components/Button";

const Auth = ({ closeFunction }) => {
  const user = localStorage.getItem("_userAuthToken");
  const [isLogin, setIsLogin] = useState(true);
  const [isLogout, setIsLogout] = useState(false);

  const activeClass = useCallback(
    (bool) =>
      classNames(
        `relative before-underline ${bool ? "before:w-full" : "before:w-0"}`
      ),
    []
  );

  const logout = () => {
    setIsLogout(true);
    setTimeout(() => {
      localStorage.clear("_userAuthToken");
      closeFunction();
    }, 1500);
  };

  return (
    <>
      <IoCloseOutline
        className="absolute cursor-pointer top-3 right-3 text-neutral-300 size-12 sm:size-14 p-1 animate-fromRight"
        onClick={closeFunction}
      />
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed bottom-0 left-0 flex flex-col items-center w-screen min-h-[65vh] bg-white/95 py-8 cursor-auto"
      >
        <h1 className="text-center font-heading font-semibold text-4xl md:text-5xl text-text mb-3">
          {user ? "Already logged in" : "Login / Signup"}
        </h1>
        <div className="p-6 bg-transparent w-full sx:w-96">
          {user ? (
            <div className="flex flex-col items-center justify-center gap-8">
              {isLogout && (
                <p className="text-2xl font-heading text-green-500">
                  Log out successfully
                </p>
              )}
              <img
                src={verified}
                className="size-28 md:size-32"
                alt="verified user"
              />
              <Button onClick={logout} size="lg">
                Logout
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-around mb-4">
                <button
                  className={`py-1 px-3 font-heading font-semibold text-xl text-gray-500 ${activeClass(
                    isLogin
                  )}`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button
                  className={`py-1 px-3 font-heading font-semibold text-xl text-gray-500 ${activeClass(
                    !isLogin
                  )}`}
                  onClick={() => setIsLogin(false)}
                >
                  Signup
                </button>
              </div>
              {isLogin ? (
                <Login setIsLogin={setIsLogin} closeFunction={closeFunction} />
              ) : (
                <Signup setIsLogin={setIsLogin} closeFunction={closeFunction} />
              )}
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

Auth.propTypes = {
  closeFunction: PropTypes.func.isRequired,
};

export default Auth;
