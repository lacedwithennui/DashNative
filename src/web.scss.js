import colors from "./colors.scss"

const webStyles = `
body {
    padding-top: 15px;
    width: 100%
}

#topbar, #footer, #searchPanel, .direction-jump, #mapExpander {
    display: none;
}

a {
    color: ` + colors.heartyBlue + `;
    font-weight: bold;
}

.directionForRoute, .route {
    margin-top: 0px;
}

.directionAnchor {
    display: block;
    height: 0px;
    width: 0px;
}

.stopHeader {
    background-color: transparent;
}

#refresh {
    background: ` + colors.dashYellow + `;
    box-shadow: none;
    border: none;
}

#refresh a {
    color: #0054A4;
    text-shadow: none;
    font-weight: bold;
}

.stopsOnRoute {
    background-color: ` + colors.dashYellow + `;
}

.routeHeader {
    border: none;
}

.arrivalsOnRoute li {
    // background-image: url("https://static.vecteezy.com/system/resources/previews/018/931/177/original/black-bus-icon-png.png");
    background-image: none;
    padding-left: 0px;
    background-size: 15px;
    margin-left: 5px;
}
`;

export default webStyles;