import {ScrollView, Text, View} from "react-native";
import styles from "./styles";
import webStyles from "./web.scss.js";
import {Button} from "react-native-elements";
import {useEffect, useState} from "react";
import WebView from "react-native-webview";
// import {DOMParser} from "react-native-html-parser";
let DOMParser = require("react-native-html-parser").DOMParser;

async function getBusStops(busID) {
    let webID = "71_" + busID;
    let stops = [];
    let response = await fetch("https://dashbus.obaweb.org/tracker/m/?q=" + webID);
    let html = await response.text();
    html = html.replace(/<\s/g, "Less than ");
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    let listItems;
    if (doc.getElementsByClassName("directionForRoute")["0"]["childNodes"]["1"]["tagName"] != "ul") {
        listItems = doc.getElementsByClassName("directionForRoute")["1"]["childNodes"]["2"]["childNodes"];
    } else {
        listItems = doc.getElementsByClassName("directionForRoute")["1"]["childNodes"]["1"]["childNodes"];
    }
    for (let i = 0; i < listItems.length; i++) {
        let aTag;
        if (listItems[i.toString()]["childNodes"]["0"]["tagName"] != "a") {
            aTag = listItems[i.toString()]["childNodes"]["0"]["childNodes"]["0"];
        } else {
            aTag = listItems[i.toString()]["childNodes"]["0"];
        }
        if (typeof aTag["0"] != undefined) {
            let stopID = aTag["attributes"]["0"]["value"].replace(/\/tracker\/.{0,}\?q=/g, "");
            // console.log(stopID);
            let stopName = aTag["childNodes"]["0"]["data"];
            stops.push({stopID, stopName});
            // console.log(stops[i])
        } else {
            console.log(aTag);
        }
    }
    return stops;
}

//Note: make async?
async function busStopButtons(busID, navigation) {
    let stops = await getBusStops(busID);
    let buttons = [];

    for (let i = 0; i < stops.length; i++) {
        buttons.push(
            <Button
                key={stops[i].stopID}
                title={stops[i].stopName}
                buttonStyle={styles.stopButton}
                titleStyle={styles.stopButtonTitle}
                type="clear"
                onPress={() => navigation.navigate("Stop View", {stopID: stops[i].stopID})}></Button>
        );
        // console.log("Pushed button with stopID " + stops[i].stopID)
    }

    return <View>{buttons}</View>;
}

export default function BusView({route, navigation}) {
    busID = route.params["busID"];
    stops = getBusStops(busID);
    // console.log(webStyles)
    const removeHeader = `

        setInterval(() => {
            if(document.querySelectorAll('.direction-link')) {
                    const directionAnchors = document.querySelectorAll('.direction-link');
                    directionAnchors.forEach((dAnchor) => {
                        dAnchor.innerHTML = dAnchor.innerHTML.trim();
                        dAnchor.innerHTML = dAnchor.innerHTML.slice(1);
                        dAnchor.innerHTML = "T" + dAnchor.innerHTML
                        dAnchor.style.marginLeft = "0px";
                    })
            }
            let arrivalsOL = document.querySelectorAll(".arrivalsOnRoute");
            arrivalsOL.forEach((ol) => {
                if(ol.children[0].children[0].innerHTML.indexOf("🚌") == -1) {
                    ol.children[0].children[0].innerHTML = "&#128652; " + ol.children[0].children[0].innerHTML
                }
            });
            var uls = document.querySelectorAll('ul.stopsOnRoute');

            // Loop through each unordered list
            uls.forEach(function(list) {
                // Get all list items within the current list
                var lis = list.querySelectorAll('li');

                // Loop through each list item
                lis.forEach(function(item) {
                    // Get the first child of the list item
                    var firstChild = item.firstChild;

                    // Check if the first child is an anchor tag
                    if(firstChild.tagName === 'A') {
                        // Check if the innerHTML of the anchor tag is all uppercase
                        if (firstChild.innerHTML === firstChild.innerHTML.toUpperCase()) {
                            // Convert the innerHTML to Title Case
                            var words = firstChild.innerHTML.toLowerCase().split(' ');
                            var titleCase = words.map(function(word) {
                            return word.charAt(0).toUpperCase() + word.slice(1);
                            }).join(' ');

                            // Assign the new title case value to the innerHTML of the anchor tag
                            firstChild.innerHTML = titleCase;
                        }
                    }
                    // If the first child is a strong tag, check if it contains an anchor tag
                    else if(firstChild.tagName === 'STRONG') {
                        var anchorTag = firstChild.querySelector('a');
                        if(anchorTag !== null) {
                            // Check if the innerHTML of the anchor tag is all uppercase
                            if (anchorTag.innerHTML === anchorTag.innerHTML.toUpperCase()) {
                                // Convert the innerHTML to Title Case
                                var words = anchorTag.innerHTML.toLowerCase().split(' ');
                                var titleCase = words.map(function(word) {
                                    return word.charAt(0).toUpperCase() + word.slice(1);
                                }).join(' ');

                                // Assign the new title case value to the innerHTML of the anchor tag
                                anchorTag.innerHTML = titleCase;
                            }
                        }
                    }
                });
            });
        }, 100);
        (function() {
            var styleTag = document.createElement('style');
            styleTag.innerHTML = \`${webStyles}\`;
            document.getElementsByTagName('head')[0].appendChild(styleTag);
        })();
    `;
    let [buttons, setButtons] = useState(<View></View>);

    useEffect(() => {
        async function setButtonVals() {
            setButtons(await busStopButtons(busID, navigation));
        }
        setButtonVals();
    }, []);
    return (
        // <View style={styles.container}>
        //     <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
        //         <Text style={styles.label}>Bus: {busID}</Text>
        //         {/* <Button
        //             title={"Stop: " + busID + " Windsor Ave"}
        //             buttonStyle={styles.button}
        //             titleStyle={styles.buttonTitle}
        //             onPress={() => navigation.navigate("Stop View", {stopID: "40001"})}></Button> */}
        //         {buttons}
        //     </ScrollView>
        // </View>
        <WebView
            source={{uri: "https://dashbus.obaweb.org/tracker/m/index?q=71_" + busID}}
            injectedJavaScript={removeHeader}
            originWhitelist={["*"]}
            javaScriptEnabled={true}
            onMessage={(event) => console.log(JSON.parse(event.nativeEvent.data).message)}
            injectedJavaScriptForMainFrameOnly={false}
            allowsBackForwardNavigationGestures
            pullToRefreshEnabled
            scalesPageToFit
            decelerationRate="normal"
            overScrollMode="never"
            directionalLockEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
        />
    );
}
