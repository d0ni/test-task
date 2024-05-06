import {
  isMonday,
  previousMonday,
  isSunday,
  nextSunday,
  isWithinInterval,
} from "date-fns";

/**
 * Retrieves the Monday of the week for a given date.
 * @param {Date | string} d - The input date.
 * @returns {Date} The Monday of the week containing the input date.
 */
export function getMonday(d: Date | string): Date {
  const date = new Date(d);

  if (isMonday(date)) {
    return date;
  }

  return previousMonday(date);
}

/**
 * Retrieves the Sunday of the week for a given date.
 * @param {Date | string} d - The input date.
 * @returns {Date} The Sunday of the week containing the input date.
 */
export function getSunday(d: Date | string): Date {
  const date = new Date(d);

  if (isSunday(date)) {
    return date;
  }

  return nextSunday(date);
}

/**
 * Checks if a date falls within a specified range.
 * @param {Date | string} d - The date to check.
 * @param {Date} startDate - The start date of the range (inclusive).
 * @param {Date} endDate - The end date of the range (inclusive).
 * @returns {boolean} True if the date falls within the range, false otherwise.
 */
export function inRange(
  d: Date | string,
  startDate: Date,
  endDate: Date
): boolean {
  const date = new Date(d);

  return isWithinInterval(date, {
    start: startDate,
    end: endDate,
  });
}

/**
 * Rounds a number to two decimal places.
 * @param {number} v - The number to round.
 * @returns {number} The rounded number.
 */
export function roundFee(v: number): number {
  return Math.round(v * 1e2) / 1e2;
}
