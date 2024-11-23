import { Expense } from "@/pages/Expenses";

const generateSampleDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

export const sampleExpenseReports = [
  {
    name: "Business Trip Report",
    expenses: [
      {
        id: "sample-1",
        date: generateSampleDate(5),
        type: "work",
        category: "Travel",
        description: "Flight to Stockholm",
        amount: 2500,
        currency: "SEK",
        convertedAmount: 2500,
        conversionRate: 1,
        paymentMethod: "Corporate Card",
        reimbursable: true,
        isLocked: false,
        createdAt: generateSampleDate(5),
        updatedAt: generateSampleDate(5),
      },
      {
        id: "sample-2",
        date: generateSampleDate(5),
        type: "work",
        category: "Accommodation",
        description: "Hotel - 2 nights",
        amount: 3200,
        currency: "SEK",
        convertedAmount: 3200,
        conversionRate: 1,
        paymentMethod: "Corporate Card",
        reimbursable: true,
        isLocked: false,
        createdAt: generateSampleDate(5),
        updatedAt: generateSampleDate(5),
      },
      {
        id: "sample-3",
        date: generateSampleDate(4),
        type: "work",
        category: "Meals",
        description: "Client Dinner",
        amount: 850,
        currency: "SEK",
        convertedAmount: 850,
        conversionRate: 1,
        paymentMethod: "Corporate Card",
        reimbursable: true,
        isLocked: false,
        createdAt: generateSampleDate(4),
        updatedAt: generateSampleDate(4),
      }
    ]
  },
  {
    name: "Monthly Office Expenses",
    expenses: [
      {
        id: "sample-4",
        date: generateSampleDate(15),
        type: "work",
        category: "Office Supplies",
        description: "Printer Paper",
        amount: 299,
        currency: "SEK",
        convertedAmount: 299,
        conversionRate: 1,
        paymentMethod: "Cash",
        reimbursable: true,
        isLocked: false,
        createdAt: generateSampleDate(15),
        updatedAt: generateSampleDate(15),
      },
      {
        id: "sample-5",
        date: generateSampleDate(15),
        type: "work",
        category: "Software",
        description: "Adobe Creative Cloud",
        amount: 599,
        currency: "SEK",
        convertedAmount: 599,
        conversionRate: 1,
        paymentMethod: "Credit Card",
        reimbursable: true,
        isLocked: false,
        createdAt: generateSampleDate(15),
        updatedAt: generateSampleDate(15),
      }
    ]
  },
  {
    name: "Mixed Expenses Report",
    expenses: [
      {
        id: "sample-6",
        date: generateSampleDate(2),
        type: "private",
        category: "Entertainment",
        description: "Cinema Tickets",
        amount: 240,
        currency: "SEK",
        convertedAmount: 240,
        conversionRate: 1,
        paymentMethod: "Debit Card",
        reimbursable: false,
        isLocked: false,
        createdAt: generateSampleDate(2),
        updatedAt: generateSampleDate(2),
      },
      {
        id: "sample-7",
        date: generateSampleDate(1),
        type: "work",
        category: "Transportation",
        description: "Taxi to Meeting",
        amount: 450,
        currency: "SEK",
        convertedAmount: 450,
        conversionRate: 1,
        paymentMethod: "Cash",
        reimbursable: true,
        isLocked: false,
        createdAt: generateSampleDate(1),
        updatedAt: generateSampleDate(1),
      }
    ]
  },
  {
    name: "International Trip Report",
    expenses: [
      {
        id: "sample-8",
        date: generateSampleDate(10),
        type: "work",
        category: "Travel",
        description: "Flight to London",
        amount: 250,
        currency: "GBP",
        convertedAmount: 3312.50,
        conversionRate: 13.25,
        paymentMethod: "Corporate Card",
        reimbursable: true,
        isLocked: false,
        createdAt: generateSampleDate(10),
        updatedAt: generateSampleDate(10),
      },
      {
        id: "sample-9",
        date: generateSampleDate(9),
        type: "work",
        category: "Meals",
        description: "Restaurant - London",
        amount: 45,
        currency: "GBP",
        convertedAmount: 596.25,
        conversionRate: 13.25,
        paymentMethod: "Corporate Card",
        reimbursable: true,
        isLocked: false,
        createdAt: generateSampleDate(9),
        updatedAt: generateSampleDate(9),
      }
    ]
  }
];