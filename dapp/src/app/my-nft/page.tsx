"use client";

import BackButton from "@/components/BackButton";
import NftCard from "@/components/NftCard";
import { useAppState } from "@/lib/AppContext";
import { contract } from "@/lib/web3.config";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const MyNft: NextPage = () => {
  const [tokenIds, setTokenIds] = useState<number[]>();

  const { account } = useAppState();

  const getMyNfts = async () => {
    try {
      // @ts-expect-error
      const res: bigint[] = await contract.methods.getAllNfts(account).call();

      const temp = res.map((v) => Number(v));

      setTokenIds(temp);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!account) return;

    getMyNfts();
  }, [account]);

  return (
    <>
      <BackButton href="/" pageName="Back" />
      {account ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
          {tokenIds?.reverse().map((v, i) => (
            <NftCard key={i} tokenId={v} />
          ))}
        </ul>
      ) : (
        <div>Not Connected 🦊MetaMask Wallet!</div>
      )}
    </>
  );
};

export default MyNft;
