export interface IOperation {
  amount: number;
  currency: 'EUR';
}

export interface ITransaction {
  date: Date;
  user_id: number;
  user_type: 'natural' | 'juridical';
  type: 'cash_in' | 'cash_out';
  operation: IOperation;
  fee: number
}

export interface IOption {
  percents: number,
  min?: IOperation,
  max?: IOperation,
  week_limit?: IOperation,
}

export interface IOptions {
  cashIn: IOption,
  cashOutNatural: IOption,
  cashOutJuridical: IOption,
}
