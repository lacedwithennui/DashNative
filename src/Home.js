import {createStackNavigator} from "@react-navigation/stack";
import LandingPage, {getFavorites} from "./LandingPage";

const Stack = createStackNavigator();

export default function Home() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Landing"
                component={LandingPage}></Stack.Screen>
        </Stack.Navigator>
    );
}
