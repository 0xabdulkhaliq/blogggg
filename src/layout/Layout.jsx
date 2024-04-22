import Home from "../pages/Home";
import { GitHub, Mail, Linkedin } from "react-feather";

export default function Layout() {
  return (
    <div className="bg-gray-50 text-gray-800 text-sm">
      <header className="sticky top-0 z-10 w-full border-y border-y-gray-400 p-3 bg-gray-50">
        <p className="heading text-2xl">Blogggg.</p>
      </header>
      <Home />
      <footer className="border-y border-y-gray-400 py-6 w-full flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 justify-evenly align-center">
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
          <div className="flex gap-8 justify-center align-center py-3">
            <a href="#" aria-label="Github">
              <GitHub size={20} />
            </a>
            <a href="#" aria-label="Mail">
              <Mail size={20} />
            </a>
            <a href="#" aria-label="Linkedin">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col gap-3">
          <p className="heading text-3xl">Blogggg.</p>
          <p>&copy; Copyright 2024 - 0xabdulkhalid</p>
        </div>
      </footer>
    </div>
  );
}
