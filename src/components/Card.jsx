import { Link } from "react-router-dom";

export default function Card({ date, title, description, cover, id }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-xl mx-auto outline-1 outline bg-gray-50 outline-gray-400 md:max-w-96 lg:max-w-md">
      <div className="p-3 text-xs border-b border-b-gray-400">
        <p>{formattedDate}</p>
      </div>
      <h2 className="heading text-2xl capitalize p-3 py-4">{title}</h2>
      <img className="max-h-36 w-full object-cover card" src={cover} alt="" />
      <p className="p-3">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime placeat
        enim excepturi est voluptates! Error soluta nulla ipsam repudiandae illo
        architecto numquam obcaecati assumenda sapiente consequatur.
      </p>
      <Link
        className="p-3 w-max float-right pt-1 block text-right underline underline-offset-4"
        to={`post/${id}`}
      >
        Read ---&gt;
      </Link>
    </div>
  );
}
