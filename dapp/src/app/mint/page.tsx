"use client";

import axios from "axios";
import { NextPage } from "next";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";

import BackButton from "@/components/BackButton";
import { contract } from "@/lib/web3.config";
import { useAppState } from "@/lib/AppContext";
import MintSuccessModal from "@/components/MintSuccessModal";

const MyNft: NextPage = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [jsonHash, setJsonHash] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { account } = useAppState();

  const onChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;

    setImageFile(e.target.files[0]);
  };

  const onSubmitIpfs: FormEventHandler = async (e) => {
    try {
      e.preventDefault();

      if (!imageFile || !name || !description) return;

      setIsLoading(true);

      const imageFormData = new FormData();

      imageFormData.append("file", imageFile);
      imageFormData.append(
        "pinataMetadata",
        JSON.stringify({
          name: `${name}_image`,
        })
      );
      imageFormData.append(
        "pinataOptions",
        JSON.stringify({
          cidVersion: 0,
        })
      );

      const imageRes = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_KEY}`,
          },
        }
      );

      const jsonFormData = new FormData();
      const jsonToString = JSON.stringify({
        name,
        description,
        image: `${process.env.NEXT_PUBLIC_PINATA_URL}/${imageRes.data.IpfsHash}`,
      });
      const stringToBlob = new Blob([jsonToString], {
        type: "application/json",
      });
      const blobToFile = new File([stringToBlob], `${name}.json`, {
        type: "application/json",
      });
      jsonFormData.append("file", blobToFile);
      jsonFormData.append(
        "pinataMetadata",
        JSON.stringify({
          name: `${name}_json`,
        })
      );
      jsonFormData.append(
        "pinataOptions",
        JSON.stringify({
          cidVersion: 0,
        })
      );

      const jsonRes = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        jsonFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_KEY}`,
          },
        }
      );

      if (jsonRes.status !== 200) return;

      setJsonHash(jsonRes.data.IpfsHash);

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  const onClickMint = async () => {
    try {
      if (!account) return;

      setIsLoading(true);

      const res = await contract.methods
        .mintNft(
          // @ts-expect-error
          `${process.env.NEXT_PUBLIC_PINATA_URL}/${jsonHash}`
        )
        .send({ from: account });

      if (Number(res.status) !== 1) return;

      setIsLoading(false);
      setIsOpenModal(true);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="text-3xl">Loading...</div>
      ) : (
        <>
          <BackButton href="/" pageName="Back" />

          {jsonHash ? (
            <div className="flex flex-col gap-4 items-center">
              <div className="text-2xl">IPFS upload is successful.</div>
              <button className="btn-style" onClick={onClickMint}>
                Mint
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={onSubmitIpfs}>
              <label
                className="btn-style text-center truncate px-2"
                htmlFor="imageFile"
              >
                {imageFile ? imageFile.name : "Choose image."}
              </label>
              <input
                className="hidden"
                id="imageFile"
                type="file"
                onChange={onChangeImageFile}
              />
              <input
                className="btn-style px-2"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="btn-style px-2"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input className="btn-style" type="submit" value="Upload IPFS" />
            </form>
          )}
        </>
      )}
      {isOpenModal && <MintSuccessModal />}
    </>
  );
};

export default MyNft;
