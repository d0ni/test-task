import {IOptions, ITransaction, ITransactionWithoutFee} from "../interfaces";
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

  // Method to getting array of added transactions
  getTransactions(): ITransaction[] {
    return this.transactions;
  }

  // Method to adding transaction to array
  addTransaction(transaction: ITransactionWithoutFee): ITransaction {
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

  // Method to calculating fee on cash_in operations
  private getCashInCommission(transaction: ITransactionWithoutFee) {
    return calculateCommission(
      transaction.operation.amount,
      this.options.cashIn
    );
  }

  // Method to calculating fee on cash_out operations for juridical users
  private getCashOutJuridicalUserCommission(
    transaction: ITransactionWithoutFee
  ) {
    return calculateCommission(
      transaction.operation.amount,
      this.options.cashOutJuridical
    );
  }

  // Method to calculating fee on cash_out operations for natural users
  private getCashOutNaturalUserCommission(
    transaction: ITransactionWithoutFee
  ) {
    // Find start of week for current date
    const startWeek = getMonday(transaction.date);
    // Find end of week for current date
    const endWeek = getSunday(transaction.date);
    // Filter transactions inRange of startWeek and endWeek
    const filtered = this.transactions.filter(
      (item) =>
        inRange(item.date, startWeek, endWeek) &&
        item.type === CASH_OUT &&
        item.user_type === NATURAL_USER &&
        item.user_id === transaction.user_id
    );

    // Calculate sum of amounts for current week
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
