"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/layout",{

/***/ "(app-pages-browser)/./app/dashboard/layout.tsx":
/*!**********************************!*\
  !*** ./app/dashboard/layout.tsx ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DashboardLayout)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _layout_vertical_SidebarContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout/vertical/SidebarContext */ \"(app-pages-browser)/./app/dashboard/layout/vertical/SidebarContext.tsx\");\n/* harmony import */ var _layout_vertical_sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layout/vertical/sidebar/Sidebar */ \"(app-pages-browser)/./app/dashboard/layout/vertical/sidebar/Sidebar.tsx\");\n/* harmony import */ var _layout_vertical_header_Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layout/vertical/header/Header */ \"(app-pages-browser)/./app/dashboard/layout/vertical/header/Header.tsx\");\n// app/dashboard/layout.tsx\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst DashboardContent = (param)=>{\n    let { children } = param;\n    _s();\n    const { isSidebarOpen, toggleSidebar } = (0,_layout_vertical_SidebarContext__WEBPACK_IMPORTED_MODULE_2__.useSidebar)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex w-full min-h-screen bg-gray-50 font-pretendard\",\n        children: [\n            isSidebarOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300 lg:hidden\",\n                onClick: toggleSidebar,\n                \"aria-hidden\": \"true\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\bitcamp\\\\Documents\\\\hc_next new\\\\SKYC\\\\app\\\\dashboard\\\\layout.tsx\",\n                lineNumber: 16,\n                columnNumber: 9\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"page-wrapper flex w-full\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_vertical_sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\bitcamp\\\\Documents\\\\hc_next new\\\\SKYC\\\\app\\\\dashboard\\\\layout.tsx\",\n                        lineNumber: 24,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"body-wrapper w-full min-h-screen transition-all duration-300 \".concat(isSidebarOpen ? 'lg:pl-64' : ''),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_vertical_header_Header__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\bitcamp\\\\Documents\\\\hc_next new\\\\SKYC\\\\app\\\\dashboard\\\\layout.tsx\",\n                                lineNumber: 30,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                                className: \"pt-16 px-6\",\n                                onClick: ()=>isSidebarOpen && toggleSidebar(),\n                                children: children\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\bitcamp\\\\Documents\\\\hc_next new\\\\SKYC\\\\app\\\\dashboard\\\\layout.tsx\",\n                                lineNumber: 33,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\bitcamp\\\\Documents\\\\hc_next new\\\\SKYC\\\\app\\\\dashboard\\\\layout.tsx\",\n                        lineNumber: 25,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\bitcamp\\\\Documents\\\\hc_next new\\\\SKYC\\\\app\\\\dashboard\\\\layout.tsx\",\n                lineNumber: 23,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\bitcamp\\\\Documents\\\\hc_next new\\\\SKYC\\\\app\\\\dashboard\\\\layout.tsx\",\n        lineNumber: 13,\n        columnNumber: 5\n    }, undefined);\n};\n_s(DashboardContent, \"Chw6y5Em+IB0fH3bTAOj3FtGYxg=\", false, function() {\n    return [\n        _layout_vertical_SidebarContext__WEBPACK_IMPORTED_MODULE_2__.useSidebar\n    ];\n});\n_c = DashboardContent;\nfunction DashboardLayout(param) {\n    let { children } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_vertical_SidebarContext__WEBPACK_IMPORTED_MODULE_2__.SidebarProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(DashboardContent, {\n            children: children\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\bitcamp\\\\Documents\\\\hc_next new\\\\SKYC\\\\app\\\\dashboard\\\\layout.tsx\",\n            lineNumber: 49,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\bitcamp\\\\Documents\\\\hc_next new\\\\SKYC\\\\app\\\\dashboard\\\\layout.tsx\",\n        lineNumber: 48,\n        columnNumber: 5\n    }, this);\n}\n_c1 = DashboardLayout;\nvar _c, _c1;\n$RefreshReg$(_c, \"DashboardContent\");\n$RefreshReg$(_c1, \"DashboardLayout\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9kYXNoYm9hcmQvbGF5b3V0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkJBQTJCOzs7QUFHRDtBQUNxRDtBQUN2QjtBQUNIO0FBRXJELE1BQU1LLG1CQUFtQjtRQUFDLEVBQUVDLFFBQVEsRUFBaUM7O0lBQ25FLE1BQU0sRUFBRUMsYUFBYSxFQUFFQyxhQUFhLEVBQUUsR0FBR04sMkVBQVVBO0lBRW5ELHFCQUNFLDhEQUFDTztRQUFJQyxXQUFVOztZQUVaSCwrQkFDQyw4REFBQ0U7Z0JBQ0NDLFdBQVU7Z0JBQ1ZDLFNBQVNIO2dCQUNUSSxlQUFZOzs7Ozs7MEJBSWhCLDhEQUFDSDtnQkFBSUMsV0FBVTs7a0NBQ2IsOERBQUNQLHdFQUFPQTs7Ozs7a0NBQ1IsOERBQUNNO3dCQUNDQyxXQUFXLGdFQUVWLE9BRENILGdCQUFnQixhQUFhOzswQ0FHL0IsOERBQUNILHNFQUFNQTs7Ozs7MENBR1AsOERBQUNTO2dDQUFLSCxXQUFVO2dDQUFhQyxTQUFTLElBQU1KLGlCQUFpQkM7MENBQzFERjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTWI7R0EvQk1EOztRQUNxQ0gsdUVBQVVBOzs7S0FEL0NHO0FBaUNTLFNBQVNTLGdCQUFnQixLQUl2QztRQUp1QyxFQUN0Q1IsUUFBUSxFQUdULEdBSnVDO0lBS3RDLHFCQUNFLDhEQUFDTCw0RUFBZUE7a0JBQ2QsNEVBQUNJO3NCQUFrQkM7Ozs7Ozs7Ozs7O0FBR3pCO01BVndCUSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxiaXRjYW1wXFxEb2N1bWVudHNcXGhjX25leHQgbmV3XFxTS1lDXFxhcHBcXGRhc2hib2FyZFxcbGF5b3V0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAvZGFzaGJvYXJkL2xheW91dC50c3hcclxuJ3VzZSBjbGllbnQnO1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgU2lkZWJhclByb3ZpZGVyLCB1c2VTaWRlYmFyIH0gZnJvbSAnLi9sYXlvdXQvdmVydGljYWwvU2lkZWJhckNvbnRleHQnO1xyXG5pbXBvcnQgU2lkZWJhciBmcm9tICcuL2xheW91dC92ZXJ0aWNhbC9zaWRlYmFyL1NpZGViYXInO1xyXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vbGF5b3V0L3ZlcnRpY2FsL2hlYWRlci9IZWFkZXInO1xyXG5cclxuY29uc3QgRGFzaGJvYXJkQ29udGVudCA9ICh7IGNoaWxkcmVuIH06IHsgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZSB9KSA9PiB7XHJcbiAgY29uc3QgeyBpc1NpZGViYXJPcGVuLCB0b2dnbGVTaWRlYmFyIH0gPSB1c2VTaWRlYmFyKCk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggdy1mdWxsIG1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwIGZvbnQtcHJldGVuZGFyZFwiPlxyXG4gICAgICB7Lyog66qo67CU7J287JeQ7IScIOyYpOuyhOugiOydtCAqL31cclxuICAgICAge2lzU2lkZWJhck9wZW4gJiYgKFxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgYmctYmxhY2sgYmctb3BhY2l0eS01MCB6LTEwIHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi0zMDAgbGc6aGlkZGVuXCJcclxuICAgICAgICAgIG9uQ2xpY2s9e3RvZ2dsZVNpZGViYXJ9XHJcbiAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2Utd3JhcHBlciBmbGV4IHctZnVsbFwiPlxyXG4gICAgICAgIDxTaWRlYmFyIC8+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtgYm9keS13cmFwcGVyIHctZnVsbCBtaW4taC1zY3JlZW4gdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwICR7XHJcbiAgICAgICAgICAgIGlzU2lkZWJhck9wZW4gPyAnbGc6cGwtNjQnIDogJydcclxuICAgICAgICAgIH1gfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxIZWFkZXIgLz5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgey8qIOKblCDsl6zquLAhISBIZWFkZXIg64aS7J20IDY0cHjrp4ztgbwg7Jes67CxIOykmOyVvCDslYgg6rK57LmoICovfVxyXG4gICAgICAgICAgPG1haW4gY2xhc3NOYW1lPVwicHQtMTYgcHgtNlwiIG9uQ2xpY2s9eygpID0+IGlzU2lkZWJhck9wZW4gJiYgdG9nZ2xlU2lkZWJhcigpfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgPC9tYWluPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEYXNoYm9hcmRMYXlvdXQoe1xyXG4gIGNoaWxkcmVuLFxyXG59OiB7XHJcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcclxufSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8U2lkZWJhclByb3ZpZGVyPlxyXG4gICAgICA8RGFzaGJvYXJkQ29udGVudD57Y2hpbGRyZW59PC9EYXNoYm9hcmRDb250ZW50PlxyXG4gICAgPC9TaWRlYmFyUHJvdmlkZXI+XHJcbiAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJTaWRlYmFyUHJvdmlkZXIiLCJ1c2VTaWRlYmFyIiwiU2lkZWJhciIsIkhlYWRlciIsIkRhc2hib2FyZENvbnRlbnQiLCJjaGlsZHJlbiIsImlzU2lkZWJhck9wZW4iLCJ0b2dnbGVTaWRlYmFyIiwiZGl2IiwiY2xhc3NOYW1lIiwib25DbGljayIsImFyaWEtaGlkZGVuIiwibWFpbiIsIkRhc2hib2FyZExheW91dCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/dashboard/layout.tsx\n"));

/***/ })

});