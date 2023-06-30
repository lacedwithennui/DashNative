import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import /* LandingPage, */ Home from "./src/LandingPage";
import Settings from "./src/Settings";
import AllBusesNav from "./src/AllBuses"
import styles from "./src/styles.scss";
// import Home from "./src/Home";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerStyle: {backgroundColor: styles.cornflower},
                    headerTitleStyle: {color: styles.offWhite, fontWeight: "bold"},
                    tabBarStyle: {backgroundColor: styles.cornflower},
                    tabBarActiveTintColor: styles.offWhite,
                    tabBarInactiveTintColor: styles.thursday,
                    unmountOnBlur: true
                }}>
                <Tab.Screen options={{tabBarIcon: ({color, size}) => <Icon name="home-sharp" type="ionicon" color={color} />}} name="Home" component={Home} />
                <Tab.Screen
                    options={{tabBarIcon: ({color, size}) => <Icon name="bus-sharp" type="ionicon" color={color} />}}
                    name="All Buses"
                    component={AllBusesNav}
                />
                <Tab.Screen
                    options={{tabBarIcon: ({color, size}) => <Icon name="settings-sharp" type="ionicon" color={color} />}}
                    name="Settings"
                    component={Settings}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}