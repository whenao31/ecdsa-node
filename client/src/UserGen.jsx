
import returnKeyPair from "./scripts/returnKeyPair";

import { toHex, hexToBytes } from "ethereum-cryptography/utils"

function UserGen( { keyPairs, setKeyPairs } ) {

  async function genUser(evt) {
    evt.preventDefault();

    const keyPairArr = keyPairs;
    keyPairArr.push(returnKeyPair());
    
    setKeyPairs(keyPairArr);
    console.log(keyPairs);
  }

  // TODO: Check why this component is being rendered when the 'Gen User'
  //       button is pressed down
  return (
    <>
      <div className="container wallet">
        <h1>Users Source</h1>
        <ul>
          {
            keyPairs.map( (keyPair) => (
              <li key={keyPair["genPrivateKey"]}>
                PrivateKey: {toHex(keyPair["genPrivateKey"])}
                PublicKey: {toHex(keyPair["genPublicKey"])}
                Name: {keyPair["shortName"]}
              </li>
            ))        
          }
          </ul>
        {/* <div> */}
          {/* <form onSubmit={genUser}>
            <input type="submit" className="button" value="Gen User" />
          </form> */}
        {/* </div> */}
      </div>
    </>
    
  );
}

export default UserGen;
