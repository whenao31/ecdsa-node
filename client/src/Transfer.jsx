import { useState } from "react";
import { signMessage } from "./scripts/CryptoFunctions";
import server from "./server";
import { toHex } from "ethereum-cryptography/utils"

const TRANSACTION_MESSAGE = 'send funds transaction';

function Transfer({ address, privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const [signedMessage, recoveryBit] = await signMessage(TRANSACTION_MESSAGE, privateKey);
    
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        signature: toHex(signedMessage),
        recoverybit: recoveryBit,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
      setSendAmount(0);
      setRecipient("");
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
