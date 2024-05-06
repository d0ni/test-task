import { IOption, IOptions } from "../interfaces";
import { calculateCommission } from "./transaction.services";
import { CASH_IN, CASH_OUT, JURIDICAL_USER, NATURAL_USER } from "../constants";

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

describe(`Test calculateCommission type=${CASH_IN} services`, () => {
  it("should return - 0.06", () => {
    expect(calculateCommission(200.0, mockOption.cashIn)).toEqual(0.06);
  });

  it("should return - 5", () => {
    expect(calculateCommission(1000000.0, mockOption.cashIn)).toEqual(5);
  });
});

describe(`Test calculateCommission type=${CASH_OUT} user_type=${NATURAL_USER} services`, () => {
  it("should return - 87", () => {
    expect(calculateCommission(30000, mockOption.cashOutNatural, 0)).toEqual(
      87
    );
  });

  it("should return - 3", () => {
    expect(calculateCommission(1000, mockOption.cashOutNatural, 30000)).toEqual(
      3
    );
  });
});

describe(`Test calculateCommission type=${CASH_OUT} user_type=${JURIDICAL_USER} services`, () => {
  it("should return - 0.9", () => {
    expect(calculateCommission(300, mockOption.cashOutJuridical)).toEqual(0.9);
  });

  it("should return - 0.5", () => {
    expect(calculateCommission(50, mockOption.cashOutJuridical)).toEqual(0.5);
  });
});

describe(`Test calculateCommission services with custom options`, () => {
  const customOptionLimitMin: IOption = {
    percents: 0.3,
    week_limit: { amount: 1000, currency: "EUR" },
    min: { amount: 0.5, currency: "EUR" },
  };

  it("should return - 0.5", () => {
    expect(calculateCommission(1000, customOptionLimitMin, 0)).toEqual(0.5);
  });

  const customOptionLimitMax: IOption = {
    percents: 0.3,
    week_limit: { amount: 1000, currency: "EUR" },
    max: { amount: 5, currency: "EUR" },
  };

  it("should return - 5", () => {
    expect(calculateCommission(20000, customOptionLimitMax, 1000)).toEqual(5);
  });

  const customOptionMinMax: IOption = {
    percents: 0.3,
    min: { amount: 0.7, currency: "EUR" },
    max: { amount: 8, currency: "EUR" },
  };

  it("should return - 0.7", () => {
    expect(calculateCommission(50, customOptionMinMax)).toEqual(0.7);
  });

  it("should return - 8", () => {
    expect(calculateCommission(50000, customOptionMinMax)).toEqual(8);
  });
});
