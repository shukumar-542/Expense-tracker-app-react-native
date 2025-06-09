import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { useContext, useEffect } from "react"
import { ExpensesContext } from "../store/expenses-context"
import { getDateMinusDays } from "../util/date"
import { fetchExpenses } from "../util/http"

const RecentExpenses = () => {
  // const [fetchedExpenses , setFetchExpenses] = useState([])

  const expensesCtx = useContext(ExpensesContext)

  useEffect(()=>{
    async function getExpenses(){
     const expenses =  await fetchExpenses()
     expensesCtx.setExpenses(expenses)
    //  setFetchExpenses(expenses)
    }
    getExpenses()
    
  },[])

  const recentExpenses = expensesCtx.expenses.filter((expense) =>{
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today , 7)
    const expenseDate = new Date(expense.date);
    return  expenseDate >= date7DaysAgo && expenseDate <= today;
  })
  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 days"} fallbackText={"No Expenses register last 7 days"}/>
  )
}

export default RecentExpenses