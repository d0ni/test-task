import { ITransactionWithoutFee } from "./interfaces";

// Function for testing format of data from input
export function isTransactionInterface(
  obj: any
): obj is ITransactionWithoutFee {
  return (
    obj instanceof Object &&
    "date" in obj &&
    typeof obj.date === "string" &&
    "user_id" in obj &&
    typeof obj.user_id === "number" &&
    "user_type" in obj &&
    typeof obj.user_type === "string" &&
    (obj.user_type === "natural" || obj.user_type === "juridical") &&
    "type" in obj &&
    typeof obj.type === "string" &&
    (obj.type === "cash_in" || obj.type === "cash_out") &&
    "operation" in obj &&
    typeof obj.operation === "object" &&
    "amount" in obj.operation &&
    typeof obj.operation.amount === "number" &&
    "currency" in obj.operation &&
    typeof obj.operation.currency === "string"
  );
}
