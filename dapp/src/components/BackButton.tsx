import Link from "next/link";
import { FC } from "react";

interface BackButtonProps {
  href: string;
  pageName: string;
}

const BackButton: FC<BackButtonProps> = ({ href, pageName }) => {
  return (
    <Link href={href}>
      <button className="font-bold">〈 {pageName}</button>
    </Link>
  );
};

export default BackButton;
