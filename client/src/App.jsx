import { useState, useEffect } from "react";
import Web3 from "web3";
import Welcome from "./components/Welcome.jsx";
import Accounts from "./components/Accounts.jsx";
import SendEther from "./components/SendEther.jsx";
import "./App.css";

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setaccounts] = useState(null);

  const setAddress = (address) => {
    setaccounts(address);
  };
  useEffect(() => {
    const init = async () => {
      try {
        const web3 = new Web3("HTTP://127.0.0.1:7545");
        setWeb3(web3);
        // console.log(state);
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);
  return (
    <div className="Flex">
      <div className="welMargin">
        <Welcome />
      </div>
      <div className="Account">
        <Accounts setAddress={setAddress} web3={web3} />
      </div>

      <div>
        <SendEther accounts={accounts} web3={web3} />
      </div>
    </div>
  );
}
export default App;
