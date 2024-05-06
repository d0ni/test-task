import { createReadStream } from "fs";
import { parse } from "jsonstream";
require("dotenv").config();

import Transaction from "./transaction/transaction";
import { ITransaction } from "./interfaces";
import Options from "./options/options";

const stream = createReadStream("input.json", { encoding: "utf-8" });

(async () => {
  const options = await Options.initialize();

  const transaction = new Transaction(options);

  stream
    .pipe(parse("*"))
    .on("data", (data: Omit<ITransaction, "fee">) => {
      const currentTransaction = transaction.addTransaction(data);
      console.log(currentTransaction.fee.toFixed(2));
    })
    .on("error", console.error);
})();
