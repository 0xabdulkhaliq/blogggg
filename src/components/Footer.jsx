import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="border-y border-y-gray-400 py-6 w-full md:flex flex-col gap-6 md:flex-row-reverse md:justify-between md:px-8">
      <div className="md:flex md:flex-row-reverse items-center gap-6">
        <div className="hidden md:flex gap-2 justify-evenly align-center">
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
        <div className="hidden md:block border border-r-gray-400 h-8"></div>
        <SocialLinks />
      </div>
      <div className="flex justify-center items-center flex-col gap-3 md:items-start">
        <p className="heading text-3xl">Blogggg.</p>
        <p>&copy; Copyright 2024 - 0xabdulkhalid</p>
      </div>
    </footer>
  );
}
