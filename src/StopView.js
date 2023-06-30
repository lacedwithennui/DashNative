import { Text, View } from "react-native";
import styles from "./styles"
import { Button } from "react-native-elements";

export default function StopView({route, navigation}) {
    stopID = route.params["stopID"]
    return (
        <View style={styles.container}>
            <Text>Stop: {stopID}</Text>
            <Button
                buttonStyle={styles.button}
                titleStyle={styles.buttonTitle}
                title="Go To Bus"
                onPress={() => navigation.navigate("Bus View", {busID: "33"})}></Button>
        </View>
    );
}