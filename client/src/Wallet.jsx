import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1"
import { toHex } from "ethereum-cryptography/utils"
import { useState } from "react";
import { getAddress } from "./scripts/CryptoFunctions";

function Wallet({ address, setAddress, balance, setBalance, setPrivateKey, keyPairs }) {

  const [username, setUsername] = useState("");

  async function onChange(evt) {
    const username = evt.target.value;
    if(!username) return false;
    setUsername(username);

    const userKeyPair = keyPairs.filter( keyPair => keyPair.shortName === username )[0];

    const address = toHex(getAddress(userKeyPair.genPublicKey));
    setAddress(address);
    setPrivateKey(userKeyPair.genPrivateKey);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        {/* Wallet Address */}
        User Name
        <input placeholder="Type your user name" value={username} onChange={onChange}></input>
      </label>
      <div>
        User Address: {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
