import { Expense } from "@/pages/Expenses";

const generateSampleDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

// Define category colors for consistency across the app
export const categoryColors: Record<string, string> = {
  Travel: "#3B82F6",
  Food: "#10B981",
  Supplies: "#F59E0B",
  Equipment: "#6366F1",
  Software: "#EC4899",
  Subscription: "#8B5CF6",
  Entertainment: "#F97316",
  Transportation: "#14B8A6",
  Accommodation: "#6366F1",
  "Office Supplies": "#EF4444",
  Other: "#6B7280"
};

const createSampleExpense = (
  id: string,
  daysAgo: number,
  type: "work" | "private",
  category: string,
  description: string,
  amount: number,
  currency: string,
  conversionRate: number,
  paymentMethod: string,
  reimbursable: boolean
): Expense => ({
  id,
  date: generateSampleDate(daysAgo),
  type,
  category,
  description: `[SAMPLE] ${description}`,  // Make samples clearly identifiable
  amount,
  currency,
  convertedAmount: amount * conversionRate,
  conversionRate,
  paymentMethod,
  reimbursable,
  isLocked: false,
  createdAt: generateSampleDate(daysAgo),
  updatedAt: generateSampleDate(daysAgo),
});

export const sampleExpenseReports = [
  {
    name: "International Business Trip",
    expenses: [
      createSampleExpense(
        "sample-1",
        5,
        "work",
        "Travel",
        "Flight to New York (Business Class)",
        1200,
        "USD",
        10.45,
        "Corporate Card",
        true
      ),
      createSampleExpense(
        "sample-2",
        5,
        "work",
        "Accommodation",
        "Hilton Hotel - 3 nights",
        900,
        "USD",
        10.45,
        "Corporate Card",
        true
      ),
      createSampleExpense(
        "sample-3",
        4,
        "work",
        "Food",
        "Client Dinner at Michelin Star Restaurant",
        400,
        "USD",
        10.45,
        "Corporate Card",
        true
      )
    ]
  },
  {
    name: "Office Setup Expenses",
    expenses: [
      createSampleExpense(
        "sample-4",
        15,
        "work",
        "Equipment",
        "Standing Desk and Ergonomic Chair",
        12000,
        "SEK",
        1,
        "Corporate Card",
        true
      ),
      createSampleExpense(
        "sample-5",
        15,
        "work",
        "Software",
        "Annual Adobe Creative Cloud License",
        5999,
        "SEK",
        1,
        "Bank Transfer",
        true
      ),
      createSampleExpense(
        "sample-6",
        15,
        "work",
        "Office Supplies",
        "Premium Stationery Set",
        1499,
        "SEK",
        1,
        "Corporate Card",
        true
      )
    ]
  },
  {
    name: "Mixed Travel Expenses",
    expenses: [
      createSampleExpense(
        "sample-7",
        2,
        "private",
        "Entertainment",
        "Weekend Theater Show",
        850,
        "SEK",
        1,
        "Personal Card",
        false
      ),
      createSampleExpense(
        "sample-8",
        2,
        "work",
        "Transportation",
        "Airport Express Train",
        299,
        "SEK",
        1,
        "Cash",
        true
      ),
      createSampleExpense(
        "sample-9",
        1,
        "work",
        "Food",
        "Team Lunch Meeting",
        1200,
        "SEK",
        1,
        "Corporate Card",
        true
      )
    ]
  },
  {
    name: "European Conference Trip",
    expenses: [
      createSampleExpense(
        "sample-10",
        10,
        "work",
        "Travel",
        "Flight to Berlin (Economy Plus)",
        450,
        "EUR",
        11.35,
        "Corporate Card",
        true
      ),
      createSampleExpense(
        "sample-11",
        9,
        "work",
        "Accommodation",
        "Hotel Europa - Conference Rate",
        600,
        "EUR",
        11.35,
        "Corporate Card",
        true
      ),
      createSampleExpense(
        "sample-12",
        8,
        "private",
        "Entertainment",
        "Berlin Museum Pass",
        35,
        "EUR",
        11.35,
        "Personal Card",
        false
      ),
      createSampleExpense(
        "sample-13",
        8,
        "work",
        "Transportation",
        "Taxi to Conference Center",
        45,
        "EUR",
        11.35,
        "Cash",
        true
      )
    ]
  }
];