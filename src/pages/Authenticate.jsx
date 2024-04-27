export default function Authenticate({ action }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-kalnia text-4xl md:text-5xl">{action}</h1>

      <form className="my-5 flex flex-col gap-4 w-11/12 max-w-xl">
        <div>
          <label htmlFor="username" className="block font-bold md:text-base">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="eg: 0xabdulkhalid"
            className="p-2 mt-1 bg-gray-100 w-full outline outline-1 outline-gray-400 text-gray-800 rounded text-base"
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-bold md:text-base">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="XXXXXXXX"
            className="p-2 mt-1 bg-gray-100 w-full outline outline-1 outline-gray-400 text-gray-800 rounded text-base"
          />
        </div>

        <button
          type="submit"
          className="bg-gray-800 mt-2 cursor-pointer text-white text-sm block px-4 py-3 uppercase tracking-wider font-bold shadow-md rounded-md transition-[transform,background] duration-500 hover:bg-gray-600 active:scale-90"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
