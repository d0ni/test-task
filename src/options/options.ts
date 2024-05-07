import {IOptions} from "../interfaces";
import {api} from "../api";

export default class Options implements IOptions {
  cashIn;
  cashOutNatural;
  cashOutJuridical;

  constructor(props: IOptions) {
    this.cashIn = props.cashIn;
    this.cashOutNatural = props.cashOutNatural;
    this.cashOutJuridical = props.cashOutJuridical;
  }

  // function for initialize options from API
  static async initialize() {
    const options = await Promise.all([
      api({
        method: "GET",
        url: "/cash-in",
      }),
      api({
        method: "GET",
        url: "/cash-out-natural",
      }),
      api({
        method: "GET",
        url: "/cash-out-juridical",
      }),
    ]).then(([cashIn, cashOutNatural, cashOutJuridical]) => ({
      cashIn,
      cashOutNatural,
      cashOutJuridical,
    }));
    return new Options(options);
  }
}
