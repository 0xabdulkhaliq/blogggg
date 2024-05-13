import { AlertCircle } from "react-feather";

export default function ConfirmationModal({
  modalVisibility,
  toggleVisibility,
  confirmFunction,
}) {
  return (
    <div
      className={`grid place-items-center fixed z-20 inset-0 px-2 bg-[#0005] backdrop-blur-sm opacity-0 transition-opacity duration-200 invisible ${
        modalVisibility && "!visible opacity-100"
      }`}
    >
      <div className="p-3 pt-8 min-h-36 flex flex-col justify-between items-center bg-gray-50 rounded-lg shadow-lg w-full gap-3 max-w-sm">
        <AlertCircle
          className="text-red-500"
          strokeWidth={1.2}
          width={100}
          height={100}
        />
        <p className="font-kalnia text-2xl md:text-3xl">Are you sure ?</p>

        <div className="w-full mt-6 flex justify-between font-bold">
          <button
            onClick={() => toggleVisibility(false)}
            className="outline outline-1 transition-[background,transform] outline-indigo-400 bg-indigo-200 rounded py-2 px-4 hover:bg-indigo-300 text-indigo-800 hover:outline-indigo-500 hover:scale-110 active:scale-90"
          >
            Cancel
          </button>
          <button
            onClick={() => confirmFunction(modalVisibility)}
            className="outline outline-1 transition-[background,transform] outline-red-400 bg-red-200 rounded-md py-2 px-4 hover:bg-red-300 text-red-800 hover:outline-red-500 hover:scale-110 active:scale-90"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
