import { useAuth } from "../context/AuthenticationContext";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Authenticate({ action }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    if (!usernameRef.current || !passwordRef.current) {
      if (!usernameRef.current) setUsernameError("Field cannot be empty");
      if (!passwordRef.current) setPasswordError("Field cannot be empty");
      return;
    }
    if (usernameError && usernameRef.current) setUsernameError(false);
    if (passwordError && passwordRef.current) setPasswordError(false);

    auth(action, usernameRef.current, passwordRef.current)
      .then(() => navigate("/", { replace: true }))
      .catch((error) => {
        error.message.split(" ")[1] === "password"
          ? setPasswordError("Incorrect password")
          : setUsernameError("Incorrect username");
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-kalnia text-4xl md:text-5xl">{action}</h1>

      <form
        className="my-5 flex flex-col gap-4 w-11/12 max-w-xl"
        onSubmit={submitForm}
      >
        <div>
          <label htmlFor="username" className="block font-bold md:text-base">
            Username
          </label>
          <input
            type="text"
            name="username"
            onChange={(e) => {
              usernameRef.current = e.target.value;
            }}
            placeholder="eg: 0xabdulkhalid"
            className="p-2 mt-1 bg-gray-100 w-full outline outline-1 outline-gray-400 text-gray-800 rounded text-base"
          />
          {usernameError && (
            <p className="m-2 font-bold mb-0 text-red-700">* {usernameError}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block font-bold md:text-base">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              passwordRef.current = e.target.value;
            }}
            placeholder="XXXXXXXX"
            className="p-2 mt-1 bg-gray-100 w-full outline outline-1 outline-gray-400 text-gray-800 rounded text-base"
          />
          {passwordError && (
            <p className="m-2 font-bold mb-0 text-red-700">* {passwordError}</p>
          )}
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
