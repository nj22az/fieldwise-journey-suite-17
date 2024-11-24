import { Holiday } from './types';

export const asianHolidays: Holiday[] = [
  {
    name: "Lunar New Year",
    date: new Date(new Date().getFullYear(), 0, 22), // Date varies yearly
    countries: ["Vietnam", "Japan"],
    description: "Known as 'Tết' in Vietnam and celebrated across many Asian countries. A major festival marking the lunar new year."
  },
  {
    name: "Mid-Autumn Festival",
    date: new Date(new Date().getFullYear(), 8, 29),
    countries: ["Vietnam", "Japan"],
    description: "A harvest festival celebrated with mooncakes, lanterns, and family gatherings. Known as 'Tsukimi' in Japan."
  }
];