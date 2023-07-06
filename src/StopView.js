import { Text, View } from "react-native";
import styles from "./styles"
import { Button } from "react-native-elements";
import { DOMParser } from "react-native-html-parser";
import { useEffect } from "react";
const html = require("./html.html")
import WebView from "react-native-webview";

const document = async () => {
    let response = await fetch("https://dashbus.obaweb.org/tracker/m/?q=" + stopID);
    let html = await response.text();
    // console.log(html)
    // html.replace(/<\s/g, "Less than ");
    let parser = new DOMParser();
	return parser.parseFromString(html, 'text/html');
}

async function getBusesAtStop(stopID) {
    let buses = [];
    let doc = await document();
    let directions = doc.getElementsByClassName("directionAtStop")
    // console.log(directions);
    console.log(directions["0"]["childNodes"]["0"]["firstChild"]["firstChild"]["firstChild"])
    for(let i = 0; i < directions.length; i++) {
        // console.log(directions[i.toString()]["childNodes"]["0"])
    }
    return buses;
}

export default function StopView({route, navigation}) {
    stopID = route.params["stopID"];
    // getBusesAtStop(stopID);
    useEffect(() => {
        
    }, [])
    return (
        // <View style={styles.container}>
            <WebView
                source={{uri: "https://dashbus.obaweb.org/tracker/m/index?q=" + stopID}}
            />
        // </View>
    );
}