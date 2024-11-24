import { Holiday } from './types';

export const westernHolidays: Holiday[] = [
  {
    name: "New Year's Day",
    date: new Date(new Date().getFullYear(), 0, 1),
    countries: ["USA", "UK", "Sweden"],
    description: "The first day of the year in the Gregorian calendar, celebrated worldwide with fireworks and festivities."
  },
  {
    name: "Valentine's Day",
    date: new Date(new Date().getFullYear(), 1, 14),
    countries: ["USA", "UK", "Sweden"],
    description: "A celebration of love and affection, observed in many countries around the world."
  },
  {
    name: "Christmas Eve",
    date: new Date(new Date().getFullYear(), 11, 24),
    countries: ["Sweden", "USA", "UK"],
    description: "Known as 'Julafton' in Sweden where it's the main Christmas celebration. Also widely celebrated in the USA and UK."
  },
  {
    name: "Christmas Day",
    date: new Date(new Date().getFullYear(), 11, 25),
    countries: ["USA", "UK", "Sweden"],
    description: "A major Christian holiday celebrating the birth of Jesus Christ, widely celebrated across many cultures."
  },
  {
    name: "New Year's Eve",
    date: new Date(new Date().getFullYear(), 11, 31),
    countries: ["USA", "UK", "Sweden", "Japan", "Vietnam"],
    description: "Known as 'Nyårsafton' in Sweden, 'Ōmisoka' in Japan, and celebrated worldwide as the last day of the year."
  }
];