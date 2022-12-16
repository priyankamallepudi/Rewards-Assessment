const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
const transactionData = JSON.parse(
  fs.readFileSync("./transactions.json", "utf8")
);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.post("/getTransactions", (req, res) => {
  const customerId = req.body.customerId;
  if (transactionData.hasOwnProperty(customerId)) {
    res.send(transactionData[customerId]);
  } else {
    res.status(404).send({ reason: "Customer Not Found" });
  }
});

app.listen(4000, () => {
  console.log("Listening server on port 4000");
});
