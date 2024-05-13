import { Loader } from "react-feather";

export default function LoadingOverlay({ isActive = true }) {
  return (
    isActive && (
      <div className="grid place-items-center fixed z-20 inset-0 px-2 bg-[#fff7] backdrop-blur-sm">
        <div className="flex flex-col gap-6 items-center">
          <Loader
            strokeWidth={1.5}
            width={100}
            height={100}
            className="animate-spin-slow"
          />
          <h2 className="font-kalnia font-bold text-2xl md:text-3xl">
            Please Wait
          </h2>
        </div>
      </div>
    )
  );
}
