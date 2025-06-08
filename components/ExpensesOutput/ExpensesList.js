import { FlatList, Text } from 'react-native'
import ExpenseItem from './ExpenseItem'

function renderExpensesItems (itemData){

    return <ExpenseItem {...itemData.item} />
}

const ExpensesList = ({expenses}) => {
  return (
    <FlatList data={expenses} renderItem={renderExpensesItems} keyExtractor={(item)=> item.id} />
  )
}

export default ExpensesList