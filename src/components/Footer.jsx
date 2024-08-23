import SocialLinks from "./SocialLinks";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-y border-y-gray-400 py-6 w-full md:flex flex-col gap-6 md:flex-row-reverse md:justify-between md:px-8">
      <div className="md:flex md:flex-row-reverse items-center gap-5">
        <div className="hidden md:flex md:gap-3 justify-evenly align-center">
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
        <div className="hidden md:block border border-r-gray-400 h-8"></div>
        <SocialLinks />
      </div>
      <div className="flex justify-center items-center flex-col gap-3 md:items-start">
        <p className="heading text-3xl">Blogggg.</p>
        <p>&copy; Copyright 2024 - 0xabdulkhaliq</p>
      </div>
    </footer>
  );
}
