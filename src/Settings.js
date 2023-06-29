import { TextInput, View } from "react-native";
import styles from "./styles"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, CheckBox, Icon, Text } from "react-native-elements";

const buses = [30, 31, 32, 33, 34, 35, "36A", "36B", 102, 103, 104, "KST"];

async function saveSettings(allSettings) {
    let allKeys = await AsyncStorage.getAllKeys();
    for(let i = 0; i < allKeys.length; i++) {
        if(!allSettings.hasOwnProperty(allKeys[i])) {
            await AsyncStorage.removeItem(allKeys[i]);
        }
    }
    for(let key in allSettings) {
        await AsyncStorage.setItem(key, allSettings[key].toString());
    }
}

function GetCheckBoxes(props) {
    let favorites = props["favorites"];
    let setFavorites = props["setFavorites"]
    const checkBoxesLeft = [];
    const checkBoxesRight = [];
    const makeCheckbox = (name) => {
        return <CheckBox
            title={name}
            style={styles.checkBox} 
            containerStyle={styles.checkBoxContainer}
            checkedIcon={<Icon type="ionicon" name="checkbox-outline" color={styles.heartyBlue}></Icon>}
            uncheckedIcon={<Icon type="ionicon" name="square-outline" color={styles.heartyBlue}></Icon>}
            checked={favorites[name] == "true" || favorites[name] == true}
            key={name}
            onPress={() => {
                if(favorites[name] == undefined) {
                    setFavorites({...favorites, [name]: true});
                }
                else {
                    setFavorites({...favorites, [name]: !favorites[name]});
                }
                
            }}>
        </CheckBox>
    }
    for(let i = 0; i < buses.length; i++) {
        if(i % 2 == 0) {
            checkBoxesLeft.push(
                makeCheckbox(buses[i].toString())
            );
        }
        else {
            checkBoxesRight.push(
                makeCheckbox(buses[i].toString())
            );
        }
    }
    return (
        <View key="checkBoxesView" style={styles.columnContainer}>
            <View style={styles.column}>{checkBoxesLeft}</View>
            <View style={styles.column}>{checkBoxesRight}</View>
        </View>
    );
}

async function getExistingSettings() {
    let favorites = {};
    let settings = await AsyncStorage.multiGet(await AsyncStorage.getAllKeys());
    for(let i = 0; i < settings.length; i++) {
        favorites[settings[i][0]] = settings[i][1];
    }
    return favorites;
}

export default function Settings() {
    const [favorites, setFavorites] = useState({});
    useEffect(() => {
        async function setExisting() {
            setFavorites(await getExistingSettings());
        }
        setExisting()
    }, []);
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Favorites</Text>
            <GetCheckBoxes favorites={favorites} setFavorites={(favorites) => setFavorites(favorites)}></GetCheckBoxes>
            <Button
                title="Clear Settings"
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.button}
                onPress={async () => {await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys()); setFavorites({})}}></Button>
            <Button
                title="Save"
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.button}
                onPress={() => saveSettings(favorites)}></Button>
        </View>
    );
}