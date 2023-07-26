import Link from "next/link";

const Home = () => {
  return (
    <>
      <div className="font-bold -mb-4">Select Page</div>
      <Link href="/mint">
        <button className="btn-style w-36">Mint NFT</button>
      </Link>
      <Link href="/my-nft">
        <button className="btn-style w-36">View My NFT</button>
      </Link>
    </>
  );
};

export default Home;
