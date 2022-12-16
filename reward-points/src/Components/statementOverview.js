import { useState } from "react";
import { RewardsOverview } from "./rewardsOverview";

export const StatementOverview = () => {
  const [customerId, setCustomerId] = useState("");
  const [badInputError, setBadInput] = useState(false);
  const [backEndError, setBackEndEror] = useState(false);
  const [rewardsHelperData, setRewardsData] = useState({});
  const [transactionData, setTransactionData] = useState([]);
  const badInputMessage = `Customer not found. Please enter a valid customer Id. Ex: from 1001 ..1009`;
  const backEndErrorMessage = `Unable to reach server. Please make sure that the server is up and running...`;
  const getCustomerStatement = async () => {
    resetErrors();
    const response = await fetch("http://localhost:4000/getTransactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: customerId,
      }),
    }).catch((error) => {
      setBackEndEror(true);
    });
    response.json().then((data) => {
      if (
        data.hasOwnProperty("reason") &&
        data.reason === "Customer Not Found"
      ) {
        setBadInput(true);
      }
      calculateRewards(data);
    });
  };

  const resetErrors = () => {
    setBadInput(false);
    setBackEndEror(false);
  };

  const calculateRewards = async (data) => {
    const rewardsData = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i].transactionType === "debit") {
        let rewards = 0;
        let amount = parseInt(data[i].amount);
        if (amount > 100) {
          rewards = (amount - 100) * 2;
          rewards += 50;
        }
        data[i]["rewardPoints"] = rewards;
        if (!rewardsData.hasOwnProperty(data[i].month)) {
          rewardsData[data[i].month] = {
            amountSpent: amount,
            rewardsEarned: rewards,
          };
        } else {
          rewardsData[data[i].month].amountSpent += amount;
          rewardsData[data[i].month].rewardsEarned += rewards;
        }
      }
    }
    setRewardsData(rewardsData);
    setTransactionData(data);
  };

  return (
    <div>
      <div className="container mt-3">
        <div className="input-group submit-form">
          <input
            type="number"
            maxLength="4"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="form-control"
            placeholder="Customer Id. Ex: 1001"
          />
          <div className="input-group-append">
            <button
              className="btn btn-success"
              onClick={() => getCustomerStatement()}
            >
              Get Statement
            </button>
          </div>
          {badInputError && <span className="error">{badInputMessage}</span>}
          {backEndError && <span className="error">{backEndErrorMessage}</span>}
        </div>
      </div>
      {transactionData.length > 0 && (
        <div class="table-wrapper">
          <div>
            <table className="table table-striped rewards-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Transaction Type</th>
                  <th scope="col">Rewards earned</th>
                </tr>
              </thead>
              <tbody>
                {transactionData.map((transaction) => (
                  <tr key={transactionData.indexOf(transaction)}>
                    <th scope="row">
                      {transactionData.indexOf(transaction) + 1}
                    </th>
                    <td>{transaction.date}</td>
                    <td>${transaction.amount}</td>
                    <td>{transaction.transactionType}</td>
                    {transaction.hasOwnProperty("rewardPoints") ? (
                      <td>{transaction.rewardPoints} points</td>
                    ) : (
                      <td>-</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <RewardsOverview rewardsData={rewardsHelperData} />
          </div>
        </div>
      )}
    </div>
  );
};
