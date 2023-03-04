import * as secp from "ethereum-cryptography/secp256k1"
import { keccak256 } from "ethereum-cryptography/keccak"
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils"

function hashMessage(message) {
    return keccak256(utf8ToBytes(message))
}

async function signMessage(msg, PRIVATE_KEY) {
    return await secp.sign(hashMessage(msg), PRIVATE_KEY, { recovered: true });
}

async function recoverKey(message, signature, recoveryBit) {
    return await secp.recoverPublicKey(hashMessage(message), signature, recoveryBit)
}

function getAddress(publicKey) {
    return keccak256( publicKey.slice(1,) ).slice(-20)
}

export { 
    signMessage,
    getAddress,
    recoverKey
}