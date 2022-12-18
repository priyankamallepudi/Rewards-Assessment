import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { StatementOverview } from "../statementOverview";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve()
  })
);

test("should render StatementOverview component", () => {
  render(<StatementOverview />);
  const statementOverviewElement = screen.getByTestId(
    "statement-overview-element"
  );
  const customerSearchInputElement = screen.getByTestId(
    "customer-search-input"
  );
  const customerSearchButtonElement = screen.getByTestId(
    "customer-search-button"
  );
  expect(statementOverviewElement).toBeInTheDocument();
  expect(customerSearchInputElement).toBeInTheDocument();
  expect(customerSearchButtonElement).toBeInTheDocument();
});

test("should call backend api on submit", async () => {
  render(<StatementOverview />);
  const customerSearchInputElement = screen.getByTestId(
    "customer-search-input"
  );
  fireEvent.change(customerSearchInputElement, { target: { value: "1002" } });
  expect(customerSearchInputElement.value).toBe("1002");
  const searchButton = screen.getByTestId("customer-search-button");
  fireEvent.click(searchButton);
  expect(global.fetch).toHaveBeenCalled();
});
