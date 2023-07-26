import { contract } from "@/lib/web3.config";
import axios from "axios";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface NftCardProps {
  tokenId: number;
}

const NftCard: FC<NftCardProps> = ({ tokenId }) => {
  const [metadata, setMetadata] = useState<{
    name: string;
    description: string;
    image: string;
  }>();

  const getMetadata = async () => {
    try {
      // @ts-expect-error
      const contractRes = await contract.methods.tokenURI(tokenId).call();

      if (typeof contractRes !== "string") return;

      const metadataRes = await axios.get(contractRes);

      setMetadata(metadataRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMetadata();
  }, []);

  return (
    <li className="w-full flex border border-black p-2 rounded-md gap-2">
      {metadata && (
        <>
          <Image
            src={metadata.image}
            width={150}
            height={150}
            alt={metadata.name}
          />
          <div className="flex flex-col mx-4">
            <div className="mt-2 text-xs text-gray-500">Name</div>
            <div>{metadata.name}</div>
            <div className="mt-4 text-xs text-gray-500">Description</div>
            <div>{metadata.description}</div>
          </div>
        </>
      )}
    </li>
  );
};

export default NftCard;
