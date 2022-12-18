import { render, screen, cleanup } from "@testing-library/react";
import { RewardsOverview } from "../rewardsOverview";

const rewardsData = {
  December: {
    amountSpent: 339,
    rewardsEarned: 528,
  },
  November: {
    amountSpent: 1624,
    rewardsEarned: 2468,
  },
  October: {
    amountSpent: 1437,
    rewardsEarned: 2124,
  },
};
test("it should render rewards overview component", () => {
  const { getByText } = render(<RewardsOverview rewardsData={rewardsData} />);
  expect(getByText("November")).toBeTruthy();
  expect(getByText("October")).toBeTruthy();
  expect(getByText("December")).toBeTruthy();
  expect(getByText("Month")).toBeTruthy();
  expect(getByText("Amount Spent")).toBeTruthy();
  expect(getByText("Rewards Earned")).toBeTruthy();

  expect(getByText("$339")).toBeTruthy();
  expect(getByText("$1624")).toBeTruthy();
  expect(getByText("$1437")).toBeTruthy();
  expect(getByText("528 points")).toBeTruthy();
  expect(getByText("2468 points")).toBeTruthy();
  expect(getByText("2124 points")).toBeTruthy();
});
