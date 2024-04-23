import { Frown } from "react-feather";

export default function ServiceUnavailable() {
  return (
    <div className="px-4 mb-8">
      <div className="flex text-red-500 py-8 px-2 max-w-lg flex-col justify-center items-center gap-5 outline outline-1 outline-red-500 mx-auto">
        <Frown size={90} strokeOpacity={0.8} strokeWidth={1} />
        <h2 className="text-center text-lg">
          Sorry, the service is currently unavailable.{" "}
          <span className="block"></span> Please try again later.
        </h2>
      </div>
    </div>
  );
}
