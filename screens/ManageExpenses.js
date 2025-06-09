import { useContext, useLayoutEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense } from "../util/http";

const ManageExpenses = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
  const editedExpenseId = route?.params?.expenseId;

  const isEditing = !!editedExpenseId;

  const selectExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId)
  // console.log(selectExpense);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = (expenseData) => {
    if (isEditing) {
      expensesCtx.updateExpense({
        id: editedExpenseId,
        expensesData: expenseData,
      });
    } else {
      storeExpense(expenseData)
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm submitButtonLabel={isEditing ? "Update" : "ADD"} onCancel={cancelHandler} onSubmit={confirmHandler} defaultValue={selectExpense}  />
     
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            size={36}
            icon="trash"
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 24,
  },
 
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
