"use client";

import AppProvider from "@/lib/AppContext";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { useEffect } from "react";
import { ethereum, web3 } from "@/lib/web3.config";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const checkNetwork = async () => {
    try {
      if (ethereum?.networkVersion !== process.env.NEXT_PUBLIC_CHAIN_ID) {
        await ethereum?.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Mumbai",
              chainId: web3.utils.numberToHex(
                Number(process.env.NEXT_PUBLIC_CHAIN_ID)
              ),
              nativeCurrency: {
                name: "MATIC",
                decimals: 18,
                symbol: "MATIC",
              },
              rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
            },
          ],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkNetwork();
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Logichain NFT</title>
      </head>
      <body className={inter.className}>
        <AppProvider>
          <div className="max-w-screen-sm mx-auto relative">
            <Header />
            <main className="min-h-screen flex flex-col justify-start items-start gap-8 p-8">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
