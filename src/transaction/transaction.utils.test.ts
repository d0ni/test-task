import { getMonday, getSunday, inRange, roundFee } from "./transaction.utils";

describe("Test roundFee utils", () => {
  it("should return - 2.63", () => {
    expect(roundFee(2.631)).toEqual(2.63);
  });

  it("should return - 3.80", () => {
    expect(roundFee(3.798)).toEqual(3.8);
  });
});

describe("Test getMonday utils", () => {
  it("should return - 2022-02-14", () => {
    const date = new Date("2022-02-15");
    const monday = new Date("2022-02-14");

    expect(getMonday(date)).toEqual(monday);
  });
});

describe("Test getSunday utils", () => {
  it("should return - 2022-02-20", () => {
    const date = new Date("2022-02-15");
    const sunday = new Date("2022-02-20");

    expect(getSunday(date)).toEqual(sunday);
  });
});

describe("Test inRange utils", () => {
  it("should return - true", () => {
    const date = new Date("2022-02-15");
    const start = new Date("2022-02-14");
    const end = new Date("2022-02-20");

    expect(inRange(date, start, end)).toEqual(true);
  });

  it("should return - false", () => {
    const date = new Date("2022-02-12");
    const start = new Date("2022-02-14");
    const end = new Date("2022-02-20");

    expect(inRange(date, start, end)).toEqual(false);
  });
});
