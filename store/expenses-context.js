import { createContext, useReducer } from "react";

const dummyExpenses = [
  {
    id: "e1",
    description: "A Pair of shoes",
    amount: 69.99,
    date: new Date("2025-06-05"),
  },
  {
    id: "e2",
    description: "A Pair of trousers",
    amount: 66.99,
    date: new Date("2025-06-05"),
  },
  {
    id: "e3",
    description: "Some Bananas",
    amount: 59.99,
    date: new Date("2025-06-04"),
  },
  {
    id: "e4",
    description: "Some Book",
    amount: 59.99,
    date: new Date("2025-12-12"),
  },
  {
    id: "e5",
    description: "Some Books",
    amount: 59.99,
    date: new Date("2025-12-15"),
  },
  {
    id: "e6",
    description: "Some Mobile",
    amount: 59.99,
    date: new Date("2025-12-15"), // fixed invalid date (was 13 month)
  },
  {
    id: "e7",
    description: "Some Books",
    amount: 59.99,
    date: new Date("2025-12-15"),
  },
  {
    id: "e8",
    description: "Some Books",
    amount: 59.99,
    date: new Date("2025-12-15"),
  },
  {
    id: "e9",
    description: "Some Books",
    amount: 59.99,
    date: new Date("2025-12-15"),
  },
];

// Create context with default structure (optional)
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toISOString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpenseContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, dummyExpenses);

  // Define functions first
  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense({ id, expensesData }) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expensesData } });
  }

  // Then assign them to the context value
  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpenseContextProvider;
