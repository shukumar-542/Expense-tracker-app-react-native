import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context"
import { getDateMinusDays } from "../util/date"

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext)
  const recentExpenses = expensesCtx.expenses.filter((expense) =>{
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today , 7)
    const expenseDate = new Date(expense.date);
    return  expenseDate >= date7DaysAgo && expenseDate <= today;
  })
  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 days"}/>
  )
}

export default RecentExpenses