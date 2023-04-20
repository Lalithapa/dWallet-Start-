import { useState } from "react";
import "./Main.css";

function SendEther(props) {
  const [receipt, setreceipt] = useState([]);
  const [toggle, settoggle] = useState(false);
  async function sendEthers(event) {
    event.preventDefault();
    debugger;
    const _to = document.querySelector("#to").value;
    const _amt = document.querySelector("#value").value;
    await props.web3.eth
      .sendTransaction({
        from: props.accounts,
        to: _to,
        value: props.web3.utils.toWei(_amt, "ether"),
      })
      .then(function (receipt) {
        setreceipt(receipt);
        settoggle(true);
        console.log(receipt, "dsf");
      });
  }
  return (
    <>
      <form className="box" onSubmit={sendEthers}>
        <p className="label">
          <label htmlFor="to">Enter Receiver's Address</label>
          <input className="receiver" type="text" id="to"></input>
        </p>

        <p className="label">
          <label htmlFor="value">Enter Amount to Send (Ether)</label>
          <input className="receiver" type="text" id="value"></input>
        </p>
        <button className="btn" type="submit">
          Send
        </button>
      </form>
      <div className="box">
        <div className="json">
          <h3>JSON RESPONSE</h3>
          <code>
            {toggle &&
              JSON.stringify(
                receipt,
                ["transactionHash", "blockNumber", "from", "status"],
                1
              )}
          </code>
        </div>
      </div>
    </>
  );
}

export default SendEther;
