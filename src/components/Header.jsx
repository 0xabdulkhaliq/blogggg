import { ArrowDown, ArrowUp } from "react-feather";
import { useState } from "react";

function Navbar() {
  return (
    <div className="bg-gray-50 p-3 outline outline-1 outline-gray-400 md:outline-none md:p-0 md:flex items-center">
      <div className="flex justify-evenly gap-3">
        <button className="heading w-full px-4 py-1 bg-gray-100 outline outline-1 outline-gray-400 md:pb-2">
          Login
        </button>
        <button className="heading w-full px-4 py-1 bg-gray-100 outline outline-1 outline-gray-400 md:pb-2">
          Signup
        </button>
      </div>

      <div className="flex gap-2 mt-5 justify-evenly align-center md:hidden">
        <a href="#" className="underline underline-offset-2">
          Home
        </a>
        <a href="#" className="underline underline-offset-2">
          Blog
        </a>
        <a href="#" className="underline underline-offset-2">
          About
        </a>
      </div>
    </div>
  );
}

export default function Header() {
  const [isNavOpen, setNavOpen] = useState(false);

  return (
    <>
      <header className="sticky flex justify-between items-center top-0 z-20 w-full border-y border-y-gray-400 p-3 bg-gray-50">
        <p className="heading text-2xl">Blogggg.</p>
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
          {isNavOpen ? <ArrowDown /> : <ArrowUp />}
        </button>
        <Navbar />
      </div>
      <div
        className={`fixed inset-0 bg-[#0005] backdrop-blur-sm opacity-0 transition-opacity duration-200 invisible md:hidden ${
          isNavOpen && "!visible opacity-100"
        }`}
      ></div>
    </>
  );
}