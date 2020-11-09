"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var root_1 = require("../../store/selectors/root");
var Reusable_1 = require("../Reusable/Reusable");
var XiEcommerce = react_1.lazy(function () { return Promise.resolve().then(function () { return require("../Ecommerce/Ecommerce"); }); });
var SurveyPage = react_1.lazy(function () { return Promise.resolve().then(function () { return require("../Survey/Survey"); }); });
var NoSsr = react_1.lazy(function () { return Promise.resolve().then(function () { return require("@material-ui/core/NoSsr"); }); });
/**
 * Component - MainPage
 * @description
 * Component for Main Page
 */
var MainPage = react_1.memo(function () {
    //Selector
    var MainSelector = root_1["default"]().MainSelector;
    var select = react_redux_1.useSelector(MainSelector);
    //Selection Mode
    var ClickIconText = react_1.useCallback(function (data) {
        var i;
        for (i in data) {
            switch (i) {
                case "Ecommerce":
                    if (data[i]) {
                        return react_1["default"].createElement(XiEcommerce, null);
                    }
                    break;
                case "DevOps":
                    break;
                case "Mail":
                    break;
                case "Survey":
                    if (data[i]) {
                        return react_1["default"].createElement(SurveyPage, null);
                    }
                    break;
                default:
                    break;
            }
        }
    }, []);
    //Generate Component
    return (react_1["default"].createElement(react_1.Fragment, null,
        react_1["default"].createElement(NoSsr, null,
            react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(react_1.Fragment, null,
                    react_1["default"].createElement(Reusable_1.XgBusyIndicator, null)) }, ClickIconText(select)))));
});
exports["default"] = MainPage;
