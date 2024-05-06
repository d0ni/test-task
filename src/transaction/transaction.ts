import { IOptions, ITransaction } from "../interfaces";
import { CASH_IN, CASH_OUT, JURIDICAL_USER, NATURAL_USER } from "../constants";
import { calculateCommission } from "./transaction.services";
import { getMonday, getSunday, inRange } from "./transaction.utils";

export default class Transaction {
  private readonly transactions: ITransaction[];
  private options: IOptions;

  constructor(options: IOptions) {
    this.transactions = [];
    this.options = options;
  }

  getTransactions(): ITransaction[] {
    return this.transactions;
  }

  addTransaction(transaction: Omit<ITransaction, "fee">): ITransaction {
    let fee: number;
    if (transaction.type === CASH_IN) {
      fee = this.getCashInCommission(transaction);
    }

    if (
      transaction.type === CASH_OUT &&
      transaction.user_type === JURIDICAL_USER
    ) {
      fee = this.getCashOutJuridicalUserCommission(transaction);
    }

    if (
      transaction.type === CASH_OUT &&
      transaction.user_type === NATURAL_USER
    ) {
      fee = this.getCashOutNaturalUserCommission(transaction);
    }

    const newTransaction = { ...transaction, fee };
    this.transactions.push(newTransaction);

    return newTransaction;
  }

  private getCashInCommission(transaction: Omit<ITransaction, "fee">) {
    return calculateCommission(
      transaction.operation.amount,
      this.options.cashIn
    );
  }

  private getCashOutJuridicalUserCommission(
    transaction: Omit<ITransaction, "fee">
  ) {
    return calculateCommission(
      transaction.operation.amount,
      this.options.cashOutJuridical
    );
  }

  private getCashOutNaturalUserCommission(
    transaction: Omit<ITransaction, "fee">
  ) {
    const startWeek = getMonday(transaction.date);
    const endWeek = getSunday(transaction.date);
    const filtered = this.transactions.filter(
      (item) =>
        inRange(item.date, startWeek, endWeek) &&
        item.type === CASH_OUT &&
        item.user_type === NATURAL_USER &&
        item.user_id === transaction.user_id
    );

    const sum = filtered.reduce(
      (res, value) => res + value.operation.amount,
      0
    );

    return calculateCommission(
      transaction.operation.amount,
      this.options.cashOutNatural,
      sum
    );
  }
}
