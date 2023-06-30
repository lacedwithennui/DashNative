import { ScrollView, Text, View } from "react-native";
import styles from "./styles"
import { Button } from "react-native-elements";
import { useEffect, useState } from "react";
// import {DOMParser} from "react-native-html-parser";
let DOMParser = require("react-native-html-parser").DOMParser

async function getBusStops(busID) {
    let webID = "71_" + busID
    let stops = [];
    let response = await fetch("https://dashbus.obaweb.org/tracker/m/?q=" + webID);
    let html = await response.text();
    html.replace(/<\s/g, "Less than ");
    // console.log(html)
    let parser = new DOMParser();
	let doc = parser.parseFromString(html, 'text/html');
    let listItems;
    if(doc.getElementsByClassName("directionForRoute")["0"]["childNodes"]["1"]["tagName"] != "ul") {
        listItems = doc.getElementsByClassName("directionForRoute")["0"]["childNodes"]["2"]["childNodes"]
    }
    else {
        listItems = doc.getElementsByClassName("directionForRoute")["0"]["childNodes"]["1"]["childNodes"]
    }
    for(let i = 0; i < listItems.length; i++) {
        let aTag;
        if(listItems[i.toString()]["childNodes"]["0"]["tagName"] != "a") {
            aTag = listItems[i.toString()]["childNodes"]["0"]["childNodes"]["0"];
        }
        else {
            aTag = listItems[i.toString()]["childNodes"]["0"];
        }
        if(typeof(aTag["0"]) != undefined) {
            let stopID = aTag["attributes"]["0"]["value"].replace("/tracker/m/index?q=", "");
            let stopName = aTag["childNodes"]["0"]["data"]
            stops.push({stopID, stopName});
            // console.log(stops[i])
        }
        else {
            console.log(aTag)
        }
    }
    return stops;
}

//Note: make async?
async function busStopButtons(busID) {
    let stops = await getBusStops(busID);
    let buttons = [];

    for (let i = 0; i < stops.length; i++) {
        buttons.push(
            <Button key={stops[i].stopID} title={stops[i].stopName} buttonStyle={styles.stopButton} titleStyle={styles.stopButtonTitle}>
            </Button>
        )
        // console.log("Pushed button with stopID " + stops[i].stopID)
    }

    return <View>{buttons}</View>;
}

export default function BusView({route, navigation}) {
    busID = route.params["busID"];
    stops = getBusStops(busID);
    let [buttons, setButtons] = useState(<View></View>);

    useEffect(() => {
        async function setButtonVals() {
            setButtons(await busStopButtons(busID));
        }
        setButtonVals();
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.label}>Bus: {busID}</Text>
                {/* <Button
                    title={"Stop: " + busID + " Windsor Ave"}
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonTitle}
                    onPress={() => navigation.navigate("Stop View", {stopID: "40001"})}></Button> */}
                {buttons}
            </ScrollView>
        </View>
    );
}