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
    name: "Martin Luther King Jr. Day",
    date: new Date(new Date().getFullYear(), 0, 15),
    country: "USA",
    description: "Honors the civil rights leader's birthday and legacy."
  },
  {
    name: "Valentine's Day",
    date: new Date(new Date().getFullYear(), 1, 14),
    country: "USA",
    description: "A celebration of love and affection."
  },
  {
    name: "Presidents' Day",
    date: new Date(new Date().getFullYear(), 1, 19),
    country: "USA",
    description: "Honors American presidents, particularly Washington and Lincoln."
  },
  {
    name: "Independence Day",
    date: new Date(new Date().getFullYear(), 6, 4),
    country: "USA",
    description: "Commemorates the Declaration of Independence of the United States."
  },
  {
    name: "Halloween",
    date: new Date(new Date().getFullYear(), 9, 31),
    country: "USA",
    description: "A celebration of all things spooky with costumes and trick-or-treating."
  },
  {
    name: "Thanksgiving",
    date: new Date(new Date().getFullYear(), 10, 24),
    country: "USA",
    description: "A national holiday celebrating the harvest and blessings of the past year."
  },
  {
    name: "Christmas Eve",
    date: new Date(new Date().getFullYear(), 11, 24),
    country: "USA",
    description: "The evening before Christmas Day, often celebrated with family gatherings."
  },
  {
    name: "Christmas Day",
    date: new Date(new Date().getFullYear(), 11, 25),
    country: "USA",
    description: "Christian celebration of the birth of Jesus Christ, widely celebrated secular holiday."
  },
  {
    name: "New Year's Eve",
    date: new Date(new Date().getFullYear(), 11, 31),
    country: "USA",
    description: "The last day of the year, celebrated with parties and fireworks."
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
  {
    name: "Guy Fawkes Night",
    date: new Date(new Date().getFullYear(), 10, 5),
    country: "UK",
    description: "Commemorates the failed Gunpowder Plot with bonfires and fireworks."
  },
  {
    name: "Remembrance Day",
    date: new Date(new Date().getFullYear(), 10, 11),
    country: "UK",
    description: "Commemorates those who died in the line of duty."
  },

  // Swedish Holidays
  {
    name: "Trettondedag jul",
    date: new Date(new Date().getFullYear(), 0, 6),
    country: "Sweden",
    description: "Epiphany, celebrating the arrival of the three wise men."
  },
  {
    name: "Påskafton",
    date: new Date(new Date().getFullYear(), 3, 8),
    country: "Sweden",
    description: "Easter Eve, celebrated with traditional foods and Easter eggs."
  },
  {
    name: "Valborgsmässoafton",
    date: new Date(new Date().getFullYear(), 3, 30),
    country: "Sweden",
    description: "Walpurgis Night, celebrating the arrival of spring with bonfires."
  },
  {
    name: "Midsommarafton",
    date: new Date(new Date().getFullYear(), 5, 24),
    country: "Sweden",
    description: "Midsummer's Eve, one of the most important holidays with maypole dancing and celebrations."
  },
  {
    name: "Alla helgons dag",
    date: new Date(new Date().getFullYear(), 10, 4),
    country: "Sweden",
    description: "All Saints' Day, remembering the dead and visiting graves."
  },
  {
    name: "Lucia",
    date: new Date(new Date().getFullYear(), 11, 13),
    country: "Sweden",
    description: "Saint Lucy's Day, festival of lights with processions and singing."
  },
  {
    name: "Julafton",
    date: new Date(new Date().getFullYear(), 11, 24),
    country: "Sweden",
    description: "Christmas Eve, the main day of Christmas celebration in Sweden with gift-giving and traditional foods."
  },
  {
    name: "Juldagen",
    date: new Date(new Date().getFullYear(), 11, 25),
    country: "Sweden",
    description: "Christmas Day, usually spent with family and enjoying Christmas leftovers."
  },
  {
    name: "Nyårsafton",
    date: new Date(new Date().getFullYear(), 11, 31),
    country: "Sweden",
    description: "New Year's Eve, celebrated with fireworks and champagne."
  },

  // Japanese Holidays
  {
    name: "Coming of Age Day",
    date: new Date(new Date().getFullYear(), 0, 8),
    country: "Japan",
    description: "Celebrates those who have reached the age of 20."
  },
  {
    name: "Setsubun",
    date: new Date(new Date().getFullYear(), 1, 3),
    country: "Japan",
    description: "Bean-throwing festival to drive away evil spirits."
  },
  {
    name: "Hinamatsuri",
    date: new Date(new Date().getFullYear(), 2, 3),
    country: "Japan",
    description: "Girls' Day, celebrating young girls with special dolls and festivities."
  },
  {
    name: "Hanami Season",
    date: new Date(new Date().getFullYear(), 3, 1),
    country: "Japan",
    description: "Cherry blossom viewing season, exact dates vary by region."
  },
  {
    name: "Children's Day",
    date: new Date(new Date().getFullYear(), 4, 5),
    country: "Japan",
    description: "Celebrates children's personalities and their happiness."
  },
  {
    name: "Tanabata",
    date: new Date(new Date().getFullYear(), 6, 7),
    country: "Japan",
    description: "Star Festival celebrating the meeting of deities Orihime and Hikoboshi."
  },
  {
    name: "Obon",
    date: new Date(new Date().getFullYear(), 7, 15),
    country: "Japan",
    description: "Buddhist custom to honor the spirits of ancestors."
  },
  {
    name: "Shichi-Go-San",
    date: new Date(new Date().getFullYear(), 10, 15),
    country: "Japan",
    description: "Festival celebrating children aged 3, 5, and 7."
  },
  {
    name: "Ōmisoka",
    date: new Date(new Date().getFullYear(), 11, 31),
    country: "Japan",
    description: "New Year's Eve, traditionally spent eating toshikoshi soba and visiting temples."
  },

  // Vietnamese Holidays
  {
    name: "Tết",
    date: new Date(new Date().getFullYear(), 0, 22),
    country: "Vietnam",
    description: "Vietnamese New Year celebration, most important holiday of the year."
  },
  {
    name: "Hung Kings Festival",
    date: new Date(new Date().getFullYear(), 3, 21),
    country: "Vietnam",
    description: "Commemorates the Hung Kings, legendary founders of Vietnam."
  },
  {
    name: "Reunification Day",
    date: new Date(new Date().getFullYear(), 3, 30),
    country: "Vietnam",
    description: "Marks the fall of Saigon and the reunification of Vietnam."
  },
  {
    name: "Independence Day",
    date: new Date(new Date().getFullYear(), 8, 2),
    country: "Vietnam",
    description: "Commemorates Vietnam's declaration of independence from France."
  },
  {
    name: "Mid-Autumn Festival",
    date: new Date(new Date().getFullYear(), 8, 29),
    country: "Vietnam",
    description: "Traditional harvest festival, celebrated with lanterns and mooncakes."
  },
  {
    name: "Vietnamese New Year's Eve",
    date: new Date(new Date().getFullYear(), 11, 31),
    country: "Vietnam",
    description: "Preparation for Tết, with family gatherings and special ceremonies."
  }
];