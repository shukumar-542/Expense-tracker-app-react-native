import {  StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import Button from "./Button";

const ErrorOverlay = ({message , onConfirm}) => {
  return (
    <View style={styles.container}>
        <Text style={[styles.text , styles.title]}>An Error Occurred!</Text>
        <Text style={styles.message}>{message}</Text>
        <Button onPress={onConfirm}>Okay</Button>
    </View>
  )
}

export default ErrorOverlay;


const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        padding : 24,
        backgroundColor : GlobalStyles.colors.primary700
    },
    text : {
        textAlign : 'center',
        marginBottom : 2,

    },
    title : {
        fontSize : 20,
        fontWeight : "bold",
        color : 'white'
    },
    message : {
        fontSize : 20,
        fontWeight : 'bold',
        color : "white"
    }
})