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
      <div className="p-3 min-h-36 flex flex-col justify-between bg-gray-50 rounded-lg shadow-lg w-full max-w-sm">
        <p className="font-kalnia text-2xl md:text-3xl">Are you sure ?</p>

        <div className="flex justify-between text-white font-bold">
          <button
            onClick={() => toggleVisibility(false)}
            className="transition-[background,transform] bg-blue-500 rounded-md px-2 py-1 hover:bg-blue-600 active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={() => confirmFunction(modalVisibility)}
            className="transition-[background,transform] bg-red-500 rounded-md px-2 py-1 hover:bg-red-600 active:scale-95"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
