require("dotenv").config();

import Transaction from "./transaction/transaction";
import Options from "./options/options";
import { isTransactionInterface } from "./checkInputData";

(async () => {
  const options = await Options.initialize();
  const transaction = new Transaction(options);

  const stringArgArr = process.argv.slice(2);

  // Check if data provided
  if (!stringArgArr.length) {
    console.error("Data for calculating not provided");
    return;
  }

  try {
    const arrayInputData: any[] = JSON.parse(stringArgArr[0]);

    // Check if every data from array in correct format
    const resultOfTestingData = arrayInputData.every((data) =>
      isTransactionInterface(data)
    );

    // Throw if some data from array in incorrect format
    if (!resultOfTestingData) {
      console.error("Data has incorrect format");
      return;
    }

    // Add Transaction and log result of calculating fee
    arrayInputData.forEach((data) => {
      const currentTransaction = transaction.addTransaction(data);
      console.log(currentTransaction.fee.toFixed(2));
    });
  } catch (e) {
    console.error("Wrong data format");
  }
})();
