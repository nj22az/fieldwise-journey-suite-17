type Holiday = {
  name: string;
  date: Date;
  country: string;
  description: string;
};

export const HOLIDAYS: Holiday[] = [
  // USA Holidays
  {
    name: "New Year's Day",
    date: new Date(new Date().getFullYear(), 0, 1),
    country: "USA",
    description: "The first day of the year in the Gregorian calendar."
  },
  {
    name: "Independence Day",
    date: new Date(new Date().getFullYear(), 6, 4),
    country: "USA",
    description: "Commemorates the Declaration of Independence of the United States."
  },
  {
    name: "Thanksgiving",
    date: new Date(new Date().getFullYear(), 10, 24),
    country: "USA",
    description: "A national holiday celebrating the harvest and blessings of the past year."
  },
  // UK Holidays
  {
    name: "Boxing Day",
    date: new Date(new Date().getFullYear(), 11, 26),
    country: "UK",
    description: "Traditionally when servants and tradespeople would receive gifts from their employers."
  },
  {
    name: "Bank Holiday",
    date: new Date(new Date().getFullYear(), 7, 28),
    country: "UK",
    description: "A public holiday in the United Kingdom."
  },
  // Swedish Holidays
  {
    name: "Midsummer's Day",
    date: new Date(new Date().getFullYear(), 5, 24),
    country: "Sweden",
    description: "Traditional celebration of the summer solstice."
  },
  {
    name: "Lucia Day",
    date: new Date(new Date().getFullYear(), 11, 13),
    country: "Sweden",
    description: "Festival of lights celebrating Saint Lucy."
  },
  // Japanese Holidays
  {
    name: "Coming of Age Day",
    date: new Date(new Date().getFullYear(), 0, 8),
    country: "Japan",
    description: "Celebrates those who have reached the age of 20."
  },
  {
    name: "Children's Day",
    date: new Date(new Date().getFullYear(), 4, 5),
    country: "Japan",
    description: "Celebrates children's personalities and their happiness."
  },
  // Vietnamese Holidays
  {
    name: "Tết",
    date: new Date(new Date().getFullYear(), 0, 22),
    country: "Vietnam",
    description: "Vietnamese New Year celebration."
  },
  {
    name: "Independence Day",
    date: new Date(new Date().getFullYear(), 8, 2),
    country: "Vietnam",
    description: "Commemorates Vietnam's declaration of independence from France."
  }
  // Add more holidays as needed
];