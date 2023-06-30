import { View } from "react-native";
import { Button } from "react-native-elements";
import styles from "./styles"
import { createStackNavigator } from "@react-navigation/stack";
import BusView from "./BusView";
import StopView from "./StopView";

function getAllBuses(navigation) {
    const buses = [30, 31, 32, 33, 34, 35, "36A", "36B", 102, 103, 104, "KST"];
    const buttons = [];
    for (let i = 0; i < buses.length; i++) {
        buttons.push(
            <Button
                key={buses[i].toString()}
                title={buses[i].toString()}
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.button}
                onPress={() => navigation.navigate("Bus View", {busID: buses[i].toString()})}></Button>
        );
    }
    return buttons;
}

function AllBuses({navigation}) {
    return (
        <View style={styles.container}>
            {getAllBuses(navigation)}
        </View>
    )
}

const Stack = createStackNavigator();

export default function AllBusesNav({navigation}) {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="All Bus" component={AllBuses}></Stack.Screen>
            <Stack.Screen name="Bus View" component={BusView}></Stack.Screen>
            <Stack.Screen name="Stop View" component={StopView}></Stack.Screen>
        </Stack.Navigator>
    );
}
