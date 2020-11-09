"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
var styles_1 = require("@material-ui/core/styles");
var Typography_1 = require("@material-ui/core/Typography");
var BottomNavigation_1 = require("@material-ui/core/BottomNavigation");
var BottomNavigationAction_1 = require("@material-ui/core/BottomNavigationAction");
var Person_1 = require("@material-ui/icons/Person");
var FavoriteBorder_1 = require("@material-ui/icons/FavoriteBorder");
var NoSsr = react_1.lazy(function () { return Promise.resolve().then(function () { return require("@material-ui/core/NoSsr"); }); });
var Grid = react_1.lazy(function () { return Promise.resolve().then(function () { return require("@material-ui/core/Grid"); }); });
var Box = react_1.lazy(function () { return Promise.resolve().then(function () { return require("@material-ui/core/Box"); }); });
var Tab = react_1.lazy(function () { return Promise.resolve().then(function () { return require("@material-ui/core/Tab"); }); });
var Tabs = react_1.lazy(function () { return Promise.resolve().then(function () { return require("@material-ui/core/Tabs"); }); });
var AppBar = react_1.lazy(function () { return Promise.resolve().then(function () { return require("@material-ui/core/AppBar"); }); });
var TabPanel = function (props) {
    var children = props.children, value = props.value, index = props.index, other = __rest(props, ["children", "value", "index"]);
    return (react_1["default"].createElement("div", __assign({ role: "tabpanel", hidden: value !== index, id: "simple-tabpanel-" + index, "aria-labelledby": "simple-tab-" + index }, other), value === index && (react_1["default"].createElement(Box, { p: 3 },
        react_1["default"].createElement(Typography_1["default"], null, children)))));
};
var a11yProps = function (index) {
    return {
        id: "simple-tab-" + index,
        "aria-controls": "simple-tabpanel-" + index
    };
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
}); });
var XiEcommerce = react_1.memo(function () {
    var classes = useStyles();
    var _a = react_1.useState(0), value = _a[0], setValue = _a[1];
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    var useStyles_BottomNavigation = styles_1.makeStyles({
        stickToBottom: {
            width: "100%",
            position: "fixed",
            bottom: 0,
            backgroundColor: "#354a5f"
        }
    });
    var classes_BottomNavigation = useStyles_BottomNavigation();
    return (react_1["default"].createElement(react_1.Fragment, null,
        react_1["default"].createElement(NoSsr, null,
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1.Fragment, null, "Loading Please Wait....") },
                react_1["default"].createElement(Grid, { container: true, direction: "row", alignItems: "center", justify: "center", style: { minHeight: "10.5vh" } },
                    react_1["default"].createElement("div", { className: classes.root },
                        react_1["default"].createElement(AppBar, { position: "static", style: { backgroundColor: "#354a5f" } },
                            react_1["default"].createElement(Tabs, { value: value, onChange: handleChange, "aria-label": "simple tabs example" },
                                react_1["default"].createElement(Tab, __assign({ label: "Electronics & Appliance" }, a11yProps(0))),
                                react_1["default"].createElement(Tab, __assign({ label: "Books" }, a11yProps(1))),
                                react_1["default"].createElement(Tab, __assign({ label: "Sports" }, a11yProps(2))),
                                react_1["default"].createElement(Tab, __assign({ label: "Fashion" }, a11yProps(3))),
                                react_1["default"].createElement(Tab, __assign({ label: "Home & Living" }, a11yProps(4))),
                                react_1["default"].createElement(Tab, __assign({ label: "Toys & Collectibles" }, a11yProps(5))),
                                react_1["default"].createElement(Tab, __assign({ label: "Health & Essentials" }, a11yProps(6))),
                                react_1["default"].createElement(Tab, __assign({ label: "Groceries" }, a11yProps(7))),
                                react_1["default"].createElement(Tab, __assign({ label: "Top Offers" }, a11yProps(8))))),
                        react_1["default"].createElement(TabPanel, { value: value, index: 0 }, "Electronics & Appliance"),
                        react_1["default"].createElement(TabPanel, { value: value, index: 1 }, "Books"),
                        react_1["default"].createElement(TabPanel, { value: value, index: 2 }, "Sports"),
                        react_1["default"].createElement(TabPanel, { value: value, index: 3 }, "Fashion"),
                        react_1["default"].createElement(TabPanel, { value: value, index: 4 }, "Home & Living"),
                        react_1["default"].createElement(TabPanel, { value: value, index: 5 }, "Toys & Collectibles"),
                        react_1["default"].createElement(TabPanel, { value: value, index: 6 }, "Health & Essentials"),
                        react_1["default"].createElement(TabPanel, { value: value, index: 7 }, "Groceries"),
                        react_1["default"].createElement(TabPanel, { value: value, index: 8 }, "Top Offers"))),
                react_1["default"].createElement(BottomNavigation_1["default"], { showLabels: true, className: classes_BottomNavigation.stickToBottom },
                    react_1["default"].createElement(BottomNavigationAction_1["default"], { style: { color: "#FFFFFF" }, label: "Favorites", icon: react_1["default"].createElement(FavoriteBorder_1["default"], { style: { color: "#FFFFFF" } }) }),
                    react_1["default"].createElement(BottomNavigationAction_1["default"], { style: { color: "#FFFFFF" }, label: "Customer Care", icon: react_1["default"].createElement(Person_1["default"], { style: { color: "#FFFFFF" } }) }))))));
});
exports["default"] = XiEcommerce;
