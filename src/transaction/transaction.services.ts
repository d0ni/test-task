import { roundFee } from "./transaction.utils";
import { IOption, ITransaction } from "../interfaces";

/**
 * Calculates commission based on transaction amount and option parameters.
 * @param {number} amount - The amount of the transaction.
 * @param {IOption} option - The option object containing commission parameters.
 * @param {number} [sum] - The sum of previous transactions (optional).
 * @returns {number} The calculated commission.
 */

export function calculateCommission(
  amount: ITransaction["operation"]["amount"],
  option: IOption,
  sum?: number
): number {
  let fee = roundFee((amount / 100) * option.percents);

  if (option.hasOwnProperty("week_limit")) {
    // How many free of charge user have on this week
    const freeLost = Math.max(0, option.week_limit.amount - sum);
    // How user charge over free of charge week limit
    const feeAmount = Math.max(0, amount - freeLost);
    fee = roundFee((feeAmount / 100) * option.percents);
  }

  if (option.hasOwnProperty("min") && fee < option.min.amount) {
    return option.min.amount;
  }

  if (option.hasOwnProperty("max") && fee > option.max.amount) {
    return option.max.amount;
  }

  return fee;
}
