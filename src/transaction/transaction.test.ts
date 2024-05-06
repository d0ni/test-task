import Transaction from "./transaction";
import { IOptions, ITransaction } from "../interfaces";

const mockData: Omit<ITransaction, "fee">[] = [
  {
    date: new Date("2016-01-05"),
    user_id: 1,
    user_type: "natural",
    type: "cash_in",
    operation: { amount: 200.0, currency: "EUR" },
  },
  {
    date: new Date("2016-01-06"),
    user_id: 2,
    user_type: "juridical",
    type: "cash_out",
    operation: { amount: 300.0, currency: "EUR" },
  },
  {
    date: new Date("2016-01-06"),
    user_id: 1,
    user_type: "natural",
    type: "cash_out",
    operation: { amount: 30000, currency: "EUR" },
  },
  {
    date: new Date("2016-01-07"),
    user_id: 1,
    user_type: "natural",
    type: "cash_out",
    operation: { amount: 1000.0, currency: "EUR" },
  },
  {
    date: new Date("2016-01-07"),
    user_id: 1,
    user_type: "natural",
    type: "cash_out",
    operation: { amount: 100.0, currency: "EUR" },
  },
  {
    date: new Date("2016-01-10"),
    user_id: 1,
    user_type: "natural",
    type: "cash_out",
    operation: { amount: 100.0, currency: "EUR" },
  },
  {
    date: new Date("2016-01-10"),
    user_id: 2,
    user_type: "juridical",
    type: "cash_in",
    operation: { amount: 1000000.0, currency: "EUR" },
  },
  {
    date: new Date("2016-01-10"),
    user_id: 3,
    user_type: "natural",
    type: "cash_out",
    operation: { amount: 1000.0, currency: "EUR" },
  },
  {
    date: new Date("2016-02-15"),
    user_id: 1,
    user_type: "natural",
    type: "cash_out",
    operation: { amount: 300.0, currency: "EUR" },
  },
];

const mockOption: IOptions = {
  cashIn: {
    percents: 0.03,
    max: { amount: 5, currency: "EUR" },
  },
  cashOutNatural: {
    percents: 0.3,
    week_limit: { amount: 1000, currency: "EUR" },
  },
  cashOutJuridical: {
    percents: 0.3,
    min: { amount: 0.5, currency: "EUR" },
  },
};

describe("Test transaction class", () => {
  it("should return array equal test result data", () => {
    const bank = new Transaction(mockOption);
    mockData.forEach((item) => bank.addTransaction(item));
    const result = bank.getTransactions().map(({ fee }) => fee);

    expect(result).toEqual([0.06, 0.9, 87.0, 3.0, 0.3, 0.3, 5.0, 0.0, 0.0]);
  });
});
