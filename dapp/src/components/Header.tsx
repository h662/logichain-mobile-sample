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
    <header className="bg-main px-4 py-2 flex justify-between items-center ">
      <div className="text-white tracking-wider font-semibold">
        Track chain 문서 인식기
      </div>
      <div className="text-xs">
        {account ? (
          <button className="btn-style-reverse px-4">
            Welcome! {account.substring(0, 4)}...
            {account.substring(account.length - 4)}
          </button>
        ) : (
          <button
            className="btn-style-reverse font-semibold px-4"
            onClick={onClickLogIn}
          >
            🦊 MetaMask
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
