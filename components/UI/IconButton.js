import { Pressable, StyleSheet, View } from "react-native"
import  { Ionicons } from "@expo/vector-icons"

const IconButton = ({icon , size={size}, color , onPress}) => {
  return (
    <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed}>
        <View style={styles.buttonContainer}>
            <Ionicons name={icon} color={color} size={size} />
        </View>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
    buttonContainer : {
        borderRadius : 24,
        padding : 6,
        marginHorizontal : 8,
        marginVertical : 6
    },
    pressed : {
        opacity : 0.75,
    }
})