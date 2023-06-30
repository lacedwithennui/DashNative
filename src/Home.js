import {createStackNavigator} from "@react-navigation/stack";
import LandingPage, {getFavorites} from "./LandingPage";
import BusView from "./BusView";
import StopView from "./StopView";

const Stack = createStackNavigator();

export default function Home({navigation}) {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Landing" component={LandingPage}></Stack.Screen>
            <Stack.Screen name="Bus View" component={BusView}></Stack.Screen>
            <Stack.Screen name="Stop View" component={StopView}></Stack.Screen>
        </Stack.Navigator>
        // <LandingPage navigation={navigation}></LandingPage>
    );
}
