import { useAppDispatch, useAppState } from "@/lib/AppContext";
import { ethereum } from "@/lib/web3.config";
import { FC } from "react";

const Header: FC = () => {
  const { account } = useAppState();
  const dispatch = useAppDispatch();

  const setAccount = (account: string) =>
    dispatch({ type: "SET_ACCOUNT", account });

  const onClickLogIn = async () => {
    try {
      const accounts: any = await ethereum?.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="absolute top-0 right-0 m-4">
      {account ? (
        <button className="border-2 border-black px-2 py-1">
          Welcome! {account.substring(0, 4)}...
          {account.substring(account.length - 4)}
        </button>
      ) : (
        <button
          className="border-2 border-black px-2 py-1"
          onClick={onClickLogIn}
        >
          🦊 MetaMask
        </button>
      )}
    </header>
  );
};

export default Header;
