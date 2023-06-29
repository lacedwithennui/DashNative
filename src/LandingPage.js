import {Button, Icon} from "react-native-elements";
import styles from "./styles";
import {RefreshControl, View} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
var buttons = [];

function getAllBuses(favorites) {
    console.log(favorites);
    const buttons = [];
    for (let i = 0; i < favorites.length; i++) {
        buttons.push(
            <Button
                key={favorites[i].toString()}
                title={favorites[i].toString()}
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.button}></Button>
        );
    }
    return buttons;
}

export async function getFavorites() {
    let favoritesArray = [];
    let allStorage = await AsyncStorage.multiGet(await AsyncStorage.getAllKeys());
    for (let i = 0; i < allStorage.length; i++) {
        if (allStorage[i][1] == "true") {
            favoritesArray.push(allStorage[i][0]);
        }
    }
    buttons = (getAllBuses(favoritesArray.sort()));
}

export function HeaderLeft() {
    return (
        <Button
            type="transparent"
            icon={() => <Icon name="sync" type="ionicon" iconStyle={styles.headerLeftIcon} color={styles.offWhite}/>}
            onPress={async () => {
                await getFavorites();
            }}
            // title="Refresh Favorites"
            titleStyle={styles.headerLeftTitle}>
        </Button>
    );
}

export default function LandingPage({navigation}) {
    const [favorites, setFavorites] = useState({});
    const [buttons, setButtons] = useState([]);

    useEffect(() => {
        // async function getFavorites() {
        //     let favoritesArray = [];
        //     let allStorage = await AsyncStorage.multiGet(await AsyncStorage.getAllKeys());
        //     for (let i = 0; i < allStorage.length; i++) {
        //         setFavorites({...favorites, [allStorage[i][0].toString()]: allStorage[i][1]});
        //         if (allStorage[i][1] == "true") {
        //             favoritesArray.push(allStorage[i][0]);
        //         }
        //     }
        //     setButtons(getAllBuses(favoritesArray.sort()));
        // }
        getFavorites();
        navigation.setOptions({
            headerLeft: () => (
                <Button
                    type="transparent"
                    icon={() => <Icon name="sync" type="ionicon" iconStyle={styles.headerLeftIcon} color={styles.offWhite}/>}
                    onPress={async () => {
                        await getFavorites();
                    }}
                    // title="Refresh Favorites"
                    titleStyle={styles.headerLeftTitle}></Button>
            )
        });
    }, []);

    return (
        <View style={styles.container}>
            {buttons}
        </View>
    );
}
