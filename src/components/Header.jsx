import { ChevronUp, ChevronDown } from "react-feather";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthenticationContext";

function Navbar() {
  const { user, loading, logout } = useAuth();

  return (
    <div className="bg-gray-50 p-3 outline outline-1 outline-gray-400 md:outline-none md:p-0 md:flex items-center">
      {loading ? (
        <div className="flex gap-4 justify-center mt-4 md:m-0 items-center animate-pulse">
          <div className="w-8 h-8 rounded-full bg-gray-800 shadow-md"></div>
          <div className="w-32 h-5 bg-gray-800 shadow-md"></div>
        </div>
      ) : user ? (
        <div className="flex flex-col md:flex-row mt-4 justify-around items-center gap-3 md:m-0 md:gap-6">
          <div className="flex gap-2 items-center">
            <img
              src="https://github.com/0xabdulkhaliq.png"
              alt=""
              className="w-8 h-8 rounded-full bg-gray-800 shadow-md"
            />
            <p className="font-bold tracking-wider">0xabdulkhaliq</p>
          </div>

          <hr className="my-3 w-full md:hidden" />

          <div className="flex gap-3 w-full text-center md:justify-end">
            {user.isAdmin && (
              <Link
                to={"/admin"}
                className="heading block w-full px-6 py-1 pb-2 bg-gray-100 outline outline-1 outline-gray-400 md:w-auto"
              >
                Admin Portal
              </Link>
            )}

            <button
              onClick={logout}
              className="heading w-full px-6 py-1 pb-2 bg-gray-100 outline outline-1 outline-gray-400 md:w-auto"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-evenly gap-3">
          <Link
            to={"/login"}
            className="heading w-full px-4 py-1 bg-gray-100 outline outline-1 outline-gray-400 md:pb-2"
          >
            Login
          </Link>
          <Link
            to={"/signup"}
            className="heading w-full px-4 py-1 bg-gray-100 outline outline-1 outline-gray-400 md:pb-2"
          >
            Signup
          </Link>
        </div>
      )}

      <hr className="w-full mt-6 border-gray-300 md:hidden" />
      <div className="flex gap-2 mt-5 my-2 justify-evenly align-center md:hidden">
        <Link to={"/"} className="underline underline-offset-2">
          Home
        </Link>
        <Link to={"/blog"} className="underline underline-offset-2">
          Blog
        </Link>
        <Link to={"/about"} className="underline underline-offset-2">
          About
        </Link>
      </div>
    </div>
  );
}

export default function Header() {
  const [isNavOpen, setNavOpen] = useState(false);

  return (
    <>
      <header className="sticky flex justify-between items-center top-0 z-20 w-full border-y border-y-gray-400 p-3 bg-gray-50">
        <Link className="heading text-2xl" to={"/"}>
          Blogggg.
        </Link>
        <div className="hidden md:block">
          <Navbar />
        </div>
      </header>
      <div
        className={`w-full bottom-0 z-20 fixed shadow-lg transition-transform duration-300 translate-y-full md:hidden ${
          isNavOpen && "transform-none"
        }`}
      >
        <button
          className="p-2 bg-gray-50 absolute -top-10 right-0 rounded-full rounded-b-none border border-gray-400 border-b-gray-50"
          onClick={() => setNavOpen(!isNavOpen)}
        >
          {isNavOpen ? <ChevronDown /> : <ChevronUp />}
        </button>
        <Navbar />
      </div>
      <div
        className={`fixed z-10 inset-0 bg-[#0005] backdrop-blur-sm opacity-0 transition-opacity duration-200 invisible md:hidden ${
          isNavOpen && "!visible opacity-100"
        }`}
      ></div>
    </>
  );
}
