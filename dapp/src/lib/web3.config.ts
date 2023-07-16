import { MetaMaskSDK } from "@metamask/sdk";
import Web3 from "web3";
import MINT_NFT_ABI from "@/lib/MINT_NFT_ABI.json";

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "Logichain",
    url: "https://logichain.kr",
  },
});

export const ethereum = MMSDK.getProvider();

export const web3 = new Web3(ethereum);

const MINT_NFT_ADDRESS = "0xd7A7C926923c3413F1e8857E2056fbE70f551c0A";

export const contract = new web3.eth.Contract(MINT_NFT_ABI, MINT_NFT_ADDRESS);
