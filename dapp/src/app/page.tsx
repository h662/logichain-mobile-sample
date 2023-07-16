import Link from "next/link";

const Home = () => {
  return (
    <>
      <Link href="/mint">
        <button className="btn-style">Mint NFT</button>
      </Link>
      <Link href="/my-nft">
        <button className="btn-style">View My NFT</button>
      </Link>
    </>
  );
};

export default Home;
