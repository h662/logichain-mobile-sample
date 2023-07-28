import Link from "next/link";
import { FC } from "react";

const MintSuccessModal: FC = () => {
  return (
    <div className="absolute top-0 -ml-8 bg-black bg-opacity-50 w-full min-h-screen flex justify-center items-center">
      <div className="bg-white w-80 rounded-md py-16 flex flex-col justify-center items-center gap-8">
        <div>NFT mint successful.</div>
        <Link href="/my-nft">
          <button className="btn-style px-4 text-xs">View My NFT</button>
        </Link>
      </div>
    </div>
  );
};

export default MintSuccessModal;
