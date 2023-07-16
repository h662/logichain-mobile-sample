import Link from "next/link";
import { FC } from "react";

interface BackButtonProps {
  href: string;
  pageName: string;
}

const BackButton: FC<BackButtonProps> = ({ href, pageName }) => {
  return (
    <Link href={href}>
      <button className="font-bold absolute top-0 left-0 m-4">
        〈 {pageName}
      </button>
    </Link>
  );
};

export default BackButton;
