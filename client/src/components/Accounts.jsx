import { useEffect, useState } from "react";
import "./Main.css";

function Accounts(props) {
  const [allAccounts, setallAccounts] = useState([]);
  const [providers, setproviders] = useState("None");
  const [mainAccount, setmainAccount] = useState("None");
  const [accountBal, setaccountBal] = useState(0);
  useEffect(() => {
    async function getAllAccounts() {
      try {
        setproviders("Ganache");
        const accounts = await props.web3.eth.getAccounts();
        setallAccounts(accounts);
      } catch (error) {
        setproviders("Not Connected");
      }
    }
    props.web3 && getAllAccounts();
  }, [props.web3]);
  const selectAcc = async () => {
    let selected = document.querySelector("#selectNumber").value;
    if (selected && selected !== "Select An Account") {
      props.setAddress(selected);
      setmainAccount(selected);
      const accBalance = await props.web3.eth.getBalance(selected);
      const inEther = props.web3.utils.fromWei(accBalance, "ether");
      setaccountBal(inEther);
    }
  };

  //getAllAccounts();
  return (
    <>
      <form className="label1" id="myForm">
        <label htmlFor="selectNumber">Select an account</label>
        <select className="innerBox" id="selectNumber" onChange={selectAcc}>
          <option>Select An Account </option>
          {allAccounts.map((address) => {
            return (
              <>
                <option key={address.id}>{address}</option>
              </>
            );
          })}
        </select>
      </form>
      <span className="conAc">Connected Account: {mainAccount}</span>

      <br></br>
      <span className="acBal">Account Balance:{accountBal} ether</span>
      <br></br>
      <span className="provider">Provider : {providers}</span>
    </>
  );
}

export default Accounts;
