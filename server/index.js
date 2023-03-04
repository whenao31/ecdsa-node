const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { recoverKey, getAddress } = require("../server/scripts/CryptoFunctions");
const { toHex, hexToBytes } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const TRANSACTION_MESSAGE = 'send funds transaction';

const balances = {
  "975382999d712bdeed4bf10480536294899c2064": 100,
  "4a62aa7a68fa1e8264dd46b121f3edb131c4a7b3": 50,
  "2ccdaa4afad4b334280995fcf7d47ad5884185b8": 75,
};

app.get("/balance/:address", async (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  
  const { signature, recoverybit, recipient, amount } = req.body;

  // Recover the sender's public key from client-side sent message with signature
  const recovered = await recoverKey(TRANSACTION_MESSAGE, hexToBytes(signature), recoverybit);
  // Get the sender address from the public key
  const sender = toHex(getAddress(recovered));
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
