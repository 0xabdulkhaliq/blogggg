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
    <div className="flex justify-evenly align-center mb-7 md:my-3 md:gap-3">
      <Link link={"https://github.com/0xabdulkhaliq/"} label={"Github"} />
      <Link link={"mailto:0xabdulkhaliq@gmail.com"} label={"Mail"} />
      <Link
        link={"https://www.linkedin.com/in/0xabdulkhaliq/"}
        label={"Linkedin"}
      />
    </div>
  );
}
