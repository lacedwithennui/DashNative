import { View } from "react-native";
import { Button } from "react-native-elements";
import styles from "./styles"

function getAllBuses() {
    const buses = [30, 31, 32, 33, 34, 35, "36A", "36B", 102, 103, 104, "KST"];
    const buttons = [];
    for (let i = 0; i < buses.length; i++) {
        buttons.push(
            <Button
                key={buses[i].toString()}
                title={buses[i].toString()}
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.button}></Button>
        );
    }
    return buttons;
}

export default function AllBuses({navigation}) {
    return (
        <View style={styles.container}>
            {getAllBuses()}
        </View>
    )
}