import * as secp from "ethereum-cryptography/secp256k1"
import { toHex } from "ethereum-cryptography/utils"
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';


const returnKeyPair = () => {
    const privateKey = secp.utils.randomPrivateKey();
    //console.log(`private key: ${toHex(privateKey)}`);

    const publicKey = secp.getPublicKey(privateKey);
    //console.log(`public key: ${toHex(publicKey)}`);

    const shortName = uniqueNamesGenerator({
        dictionaries: [colors, adjectives, animals]
      });

    return {
        genPrivateKey: privateKey, 
        genPublicKey: publicKey,
        shortName
    };
}

export default returnKeyPair; 