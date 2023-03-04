const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

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

module.exports = { 
    signMessage,
    getAddress,
    recoverKey
}