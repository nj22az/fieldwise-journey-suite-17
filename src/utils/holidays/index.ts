import { Holiday } from './types';
import { westernHolidays } from './westernHolidays';
import { asianHolidays } from './asianHolidays';

export const HOLIDAYS: Holiday[] = [...westernHolidays, ...asianHolidays];