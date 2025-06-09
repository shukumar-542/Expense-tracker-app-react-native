import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValue,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue ? defaultValue?.amount?.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValue ? defaultValue?.date?.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue?.description : " ",
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((current) => {
      return {
        ...current,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const parseDate = (dateString) => {
    const [year, month, day] = dateString?.split("-");
    return new Date(+year, +month - 1, +day);
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: parseDate(inputs?.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData?.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData?.date.toString() !== "Invalid Date";
    const descriptionsIsValid = expenseData?.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionsIsValid) {
      // Alert.alert("Invalid Input" , "Please Check your input value!")
      setInputs((currInputs) => {
        return {
          amount: { value: currInputs.amount?.value, isValid: amountIsValid },
          date: { value: currInputs.date?.value, isValid: dateIsValid },
          description: {
            value: currInputs.description?.value,
            isValid: descriptionsIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label={"Amount"}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (text) => inputChangeHandler("amount", text),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label={"Date"}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (text) => inputChangeHandler("date", text),
            value: inputs.date.value,
          }}
        />
      </View>

      <Input
        label={"Description"}
        textInputConfig={{
          multiline: true,
          // autoCorrect : false
          onChangeText: (text) => inputChangeHandler("description", text),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>{"Please check entire data"}</Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode={"flat"} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;
const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
