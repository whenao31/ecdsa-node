import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import UserGen from "./UserGen";
import { hexToBytes } from "ethereum-cryptography/utils"

const initialUsersKeys = [
  {
    genPrivateKey: hexToBytes("59f217e3dfc256923a74a18cd1a59c12ae805b1ec24648e1d29a17ff60eec919"), 
    genPublicKey: hexToBytes("04f5f3ef9d43f37a840c28107c7bc3a90f7e8744cf6cbbb56d6ac8fe8cb9f569d8c6e8f6d897e5f34c97ccf79e049aa4ea4372818bb8adde0516f42d71d62e6bcf"),
    shortName: "amethyst_comparative_dragon"
  },
  {
    genPrivateKey: hexToBytes("9c6f7e501bb26f94007b34202e5268f2f5be63f804e39810c4da371ec87000b1"), 
    genPublicKey: hexToBytes("04d184324d17210dd05488a17dd9aa935840b0a0854570ff031b1b30011696ef0dc3070c466a747ea1840b501eea8d3a296daefedba2b07d6dee738d9aafa8503d"),
    shortName: "gold_drunk_possum"
  },
  {
    genPrivateKey: hexToBytes("c8c738f64d1161ae99323e51b988fe0cfdd85aaf7a662a21c8f900681991e6d1"), 
    genPublicKey: hexToBytes("0423009a5126d1338ff72de445c1eaee6f953b175959717cda741de699f3f1ec9f86c56d5951a013396b5b746615d04d2f5681eaed3777931927b6a50122299096"),
    shortName: "brown_secondary_hawk"
  },
];

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [keyPairs, setKeyPairs] = useState(initialUsersKeys);

  return (
    <div className="app">
      <UserGen keyPairs={keyPairs} setKeyPairs={setKeyPairs}/>
      <Wallet
        balance={balance}
        setBalance={setBalance}
        setPrivateKey={setPrivateKey}
        address={address}
        setAddress={setAddress}
        keyPairs={keyPairs}
      />
      <Transfer setBalance={setBalance} privateKey={privateKey} address={address} />
    </div>
  );
}

export default App;
