/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/user-agent/index.js":
/*!******************************************!*\
  !*** ./node_modules/user-agent/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nmodule.exports = __webpack_require__(/*! ./lib/user-agent */ \"./node_modules/user-agent/lib/user-agent.js\");\n\n//# sourceURL=webpack:///./node_modules/user-agent/index.js?");

/***/ }),

/***/ "./node_modules/user-agent/lib/user-agent.js":
/*!***************************************************!*\
  !*** ./node_modules/user-agent/lib/user-agent.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/*!\n * user-agent\n * Copyright(c) 2010-2011 TJ Holowaychuk.\n * Authored by TJ Holowaychuk\n * MIT Licensed\n */\n\n/**\n * Library version.\n */\n\nexports.version = '1.0.4'\n\n/**\n * Parse the given user-agent string into an object of usable data.\n *\n * Example:\n *\n *      var userAgent = require('user-agent')\n *      userAgent.parse('Mozilla/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/526.9 (KHTML, like Gecko) Version/4.0dp1 Safari/526.8')\n *      // => { name: 'safari', version: '4.0dp1', os: 'Windows XP', full: '... same string as above ...' }\n *\n * @param  {String} str\n * @return {Object}\n * @api public\n */\n\nexports.parse = function(str) {\n  var agent = { full: str, name: name(str) };\n  agent.version = version(str, agent.name);\n  agent.fullName = agent.name + ' ' + agent.version;\n  agent.os = os(str);\n  return agent;\n};\n\n/**\n * Get the browser version based on the given browser name.\n *\n * @param  {String} str\n * @param  {String} name\n * @return {String}\n * @api private\n */\n\nfunction version(str, name) {\n  if (name === 'safari') name = 'version';\n  if (name){\n\t  return new RegExp(name + '[\\\\/ ]([\\\\d\\\\w\\\\.-]+)', 'i').exec(str) && RegExp.$1 || '';\n  }else{\n\t  var m=str.match(/version[\\/ ]([\\d\\w\\.]+)/i);\n\t  return m && m.length>1 ? m[1] : '';\n  }  \n}\n\n/**\n * Supported operating systems.\n */\n\nvar operatingSystems = {\n    'iPad': /ipad/i\n  , 'iPhone': /iphone/i\n  , 'Windows Vista': /windows nt 6\\.0/i\n  , 'Windows 7': /windows nt 6\\.\\d+/i\n  , 'Windows 2003': /windows nt 5\\.2+/i\n  , 'Windows XP': /windows nt 5\\.1+/i\n  , 'Windows 2000': /windows nt 5\\.0+/i\n  , 'OS X $1.$2': /os x (\\d+)[._](\\d+)/i\n  , 'Linux': /linux/i\n  , 'Googlebot': /googlebot/i\n};\n\nvar osNames = Object.keys(operatingSystems);\n\n/**\n * Get operating system from the given user-agent string.\n *\n * @param  {String} str\n * @return {String}\n * @api private\n */\n\nfunction os(str) {\n  var captures;\n  for (var i = 0, len = osNames.length; i < len; ++i) {\n    if (captures = operatingSystems[osNames[i]].exec(str)) {\n      return ~osNames[i].indexOf('$1')\n        ? osNames[i].replace(/\\$(\\d+)/g, function(_, n){\n          return captures[n]\n        }) : osNames[i];\n    }\n  }\n  return '';\n}\n\n/**\n * Supported browser names.\n */\n\nvar names = [\n   'opera'\n , 'konqueror'\n , 'firefox'\n , 'chrome'\n , 'epiphany'\n , 'safari'\n , 'msie'\n , 'curl'\n];\n\n/**\n * Get browser name for the given user-agent string.\n *\n * @param  {String} str\n * @return {String}\n * @api private\n */\n\nfunction name(str) {\n  str = str.toLowerCase();\n  for (var i = 0, len = names.length; i < len; ++i) {\n    if (str.indexOf(names[i]) !== -1) return names[i];\n  }\n  return '';\n}\n\n\n//# sourceURL=webpack:///./node_modules/user-agent/lib/user-agent.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moniter_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moniter/index */ \"./src/moniter/index.js\");\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/moniter/index.js":
/*!******************************!*\
  !*** ./src/moniter/index.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_jsError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/jsError */ \"./src/moniter/lib/jsError.js\");\n\r\nObject(_lib_jsError__WEBPACK_IMPORTED_MODULE_0__[\"injectJsError\"])();\n\n//# sourceURL=webpack:///./src/moniter/index.js?");

/***/ }),

/***/ "./src/moniter/lib/jsError.js":
/*!************************************!*\
  !*** ./src/moniter/lib/jsError.js ***!
  \************************************/
/*! exports provided: injectJsError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"injectJsError\", function() { return injectJsError; });\n/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/index */ \"./src/moniter/utils/index.js\");\n/* harmony import */ var _utils_getLastEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getLastEvent */ \"./src/moniter/utils/getLastEvent.js\");\n/* harmony import */ var _traker_traker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../traker/traker */ \"./src/moniter/traker/traker.js\");\n\r\n\r\n\r\n// 注入js错误\r\nfunction injectJsError() {\r\n    // 监听全局未捕获错误\r\n    window.addEventListener(\"error\", (err) => {\r\n        console.log(err);\r\n        let lastEvent = Object(_utils_getLastEvent__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(); //获取最后一个交互事件\r\n        // console.log(getLastEvent());\r\n        let log = {\r\n            kind: \"stability\",\r\n            type: err.type,\r\n            errorType: \"jsError\",\r\n            message: err.message,\r\n            filename: err.filename,\r\n            position: `${err.lineno}行${err.colno}列`,\r\n            stack: Object(_utils_index__WEBPACK_IMPORTED_MODULE_0__[\"getline\"])(err.error.stack),\r\n            selector: Object(_utils_index__WEBPACK_IMPORTED_MODULE_0__[\"getSelctor\"])(lastEvent)\r\n        }\r\n        _traker_traker__WEBPACK_IMPORTED_MODULE_2__[\"default\"].send(log);\r\n    }, true);\r\n    // 捕获promise异常\r\n    window.addEventListener(\"unhandledrejection\", function(err) {\r\n        let lastEvent = Object(_utils_getLastEvent__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(); //获取最后一个交互事件\r\n        let message;\r\n        let reason = err.reason;\r\n        let stack, filename, position;\r\n        if (typeof reason === \"string\") {\r\n            message = reason\r\n        } else if (typeof reason === \"object\") {\r\n            message = reason.message\r\n            if (reason.stack) {\r\n                stack = Object(_utils_index__WEBPACK_IMPORTED_MODULE_0__[\"getline\"])(reason.stack);\r\n                let matstr = reason.stack.match(/at\\s+(.+):(\\d+):(\\d+)/);\r\n                filename = matstr[1];\r\n                position = `${matstr[2]}行${matstr[3]}列`;\r\n            }\r\n        }\r\n        let log = {\r\n            kind: \"stability\",\r\n            type: err.type,\r\n            errorType: \"jsError\",\r\n            message,\r\n            stack,\r\n            filename,\r\n            position,\r\n            selector: Object(_utils_index__WEBPACK_IMPORTED_MODULE_0__[\"getSelctor\"])(lastEvent)\r\n        }\r\n\r\n        _traker_traker__WEBPACK_IMPORTED_MODULE_2__[\"default\"].send(log);\r\n    }, true)\r\n\r\n    // 捕获资源加载异常\r\n}\n\n//# sourceURL=webpack:///./src/moniter/lib/jsError.js?");

/***/ }),

/***/ "./src/moniter/traker/traker.js":
/*!**************************************!*\
  !*** ./src/moniter/traker/traker.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nlet endpoint = \"cn-huhehaote.log.aliyuncs.com\";\r\nlet project = \"hzmmoniter\";\r\nlet logstoreName = \"moniter-store\";\r\nconst userAgent = __webpack_require__(/*! user-agent */ \"./node_modules/user-agent/index.js\");\r\n\r\nlet extraDate = {\r\n    title: document.title,\r\n    url: location.href,\r\n    timeStamp: Date.now(),\r\n    userAgent: userAgent.parse(navigator.userAgent).name\r\n}\r\nlet url = `http://${project}.${endpoint}/logstores/${logstoreName}/track`;\r\nclass sendTraker {\r\n    constructor() {\r\n        this.url = url; //错误信息提交地址\r\n        this.xhr = new XMLHttpRequest();\r\n\r\n    }\r\n    send(data = {}) {\r\n        let log = {\r\n            ...data,\r\n            ...extraDate\r\n        }\r\n        console.log(log);\r\n\r\n        for (const key in log) {\r\n            if (typeof log[key] === 'number') {\r\n                log[key] = `${log[key] }`\r\n            }\r\n        }\r\n        let logs = {\r\n            __logs__: [log]\r\n        }\r\n        let body = JSON.stringify(logs);\r\n        this.xhr.open(\"POST\", this.url, true);\r\n        this.xhr.setRequestHeader(\"content-type\", \"application/json\");\r\n        this.xhr.setRequestHeader(\"x-log-apiversion\", \"0.6.0\");\r\n        this.xhr.setRequestHeader(\"x-log-bodyrawsize\", body.length);\r\n        this.xhr.onload = () => {\r\n            console.log(\"捕获成功+1\");\r\n\r\n        }\r\n        this.xhr.onerror = (e) => {\r\n            console.log(\"error\", e);\r\n        }\r\n        this.xhr.send(body);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (new sendTraker());\n\n//# sourceURL=webpack:///./src/moniter/traker/traker.js?");

/***/ }),

/***/ "./src/moniter/utils/getLastEvent.js":
/*!*******************************************!*\
  !*** ./src/moniter/utils/getLastEvent.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nlet lastEvent;\r\n['click', '', 'keydown', 'mouseover', 'touchstart', 'mousedown'].forEach(eventType => {\r\n    document.addEventListener(eventType, (event) => {\r\n        lastEvent = event\r\n    }, {\r\n        capture: true, //该事件在捕获阶段执行\r\n        passive: true //不阻止默认事件\r\n    })\r\n})\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\r\n    return lastEvent\r\n});\n\n//# sourceURL=webpack:///./src/moniter/utils/getLastEvent.js?");

/***/ }),

/***/ "./src/moniter/utils/index.js":
/*!************************************!*\
  !*** ./src/moniter/utils/index.js ***!
  \************************************/
/*! exports provided: getline, getSelctor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getline\", function() { return getline; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSelctor\", function() { return getSelctor; });\n// 获取错误的 stack 数据\r\n\r\n/**\r\n * \r\n * @param {errorEvent 对象error属性的stack值} str \r\n */\r\nfunction getline(str) {\r\n    str = str.split(/\\s* at\\s*/g);\r\n    str.shift();\r\n    return str.join('^');\r\n}\r\n\r\n\r\n\r\n\r\n// 该函数会根据 event的path进行处理\r\n// 0: button  1: div.content  2: div# container 3: body\r\n\r\n/**\r\n * \r\n * @param {*最后一个交互事件} event \r\n */\r\nfunction getSelctor(event) {\r\n    if (!event) {\r\n        return ''\r\n    }\r\n    let path = event.path;\r\n    if (Array.isArray(path)) {\r\n        let selector = path.reverse().filter(item => {\r\n            // return item.toString() !== '[object Window]' && item.toString() !== '[object HTMLDocument]'\r\n            return item !== window && item !== document\r\n        }).map(dom => {\r\n            if (dom.id) {\r\n                return `#${dom.id}`\r\n            } else if (dom.className) {\r\n                return `.${dom.className}`\r\n            } else {\r\n                return `${dom.tagName}`\r\n            }\r\n        }).join('  ')\r\n        // console.log(selector);\r\n        return selector\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/moniter/utils/index.js?");

/***/ })

/******/ });