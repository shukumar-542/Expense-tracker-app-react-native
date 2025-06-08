import { FlatList, StyleSheet, View } from "react-native"
import ExpensesSummary from "./ExpensesSummary"
import ExpensesList from "./ExpensesList"
import { GlobalStyles } from "../../constants/styles"

const dummyExpenses = [
    {
        id : "e1",
        description:  ' A Pair of shoes',
        amount : 59.99,
        date : new Date("2025-12-19") 
    },
    {
        id : "e2",
        description:  ' A Pair of trousers',
        amount : 59.99,
        date : new Date("2025-01-05") 
    },
    {
        id : "e3",
        description:  ' Some Bananas',
        amount : 59.99,
        date : new Date("2025-12-01") 
    },
    {
        id : "e4",
        description:  'Some Book',
        amount : 59.99,
        date : new Date("2025-12-12") 
    },
    {
        id : "e5",
        description:  'Some Books',
        amount : 59.99,
        date : new Date("2025-12-15") 
    },
]

const ExpensesOutput = ({expenses , expensesPeriod}) => {
  return (
    <View style={styles.container}>
        <ExpensesSummary expenses={dummyExpenses} periodName={expensesPeriod} />
        <ExpensesList expenses={dummyExpenses} />
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 24,
        backgroundColor : GlobalStyles.colors.primary700
    }
})