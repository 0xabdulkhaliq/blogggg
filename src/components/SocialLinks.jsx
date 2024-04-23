import { ExternalLink } from "react-feather";

function Link({ link, label }) {
  return (
    <a
      href={link}
      className="underline underline-offset-2 flex items-center gap-1"
    >
      {label}
      <ExternalLink size={15} />
    </a>
  );
}

export default function SocialLinks() {
  return (
    <div className="flex gap-2 justify-evenly align-center mb-7 md:my-3">
      <Link link={""} label={"Github"} />
      <Link link={""} label={"Mail"} />
      <Link link={""} label={"Linkedin"} />
    </div>
  );
}
