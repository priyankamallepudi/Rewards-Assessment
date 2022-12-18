export const RewardsOverview = ({ rewardsData }) => {
  const months = Object.keys(rewardsData);
  console.log(rewardsData);
  let totalSpent = 0;
  let totalEarned = 0;
  months.forEach((month) => {
    totalSpent += rewardsData[month].amountSpent;
    totalEarned += rewardsData[month].rewardsEarned;
  });
  return (
    <table className="table table-bordered rewards-table">
      <thead>
        <tr>
          <th scope="col">Month</th>
          <th scope="col">Amount Spent</th>
          <th scope="col">Rewards Earned</th>
        </tr>
      </thead>
      <tbody>
        {months.map((month, i) => (
          <tr key={i}>
            <th scope="row">{month}</th>
            <td>${rewardsData[month].amountSpent}</td>
            <td>{rewardsData[month].rewardsEarned} points</td>
          </tr>
        ))}
        <tr>
          <th scope="row">Total</th>
          <td>${totalSpent}</td>
          <td>{totalEarned} points</td>
        </tr>
      </tbody>
    </table>
  );
};
