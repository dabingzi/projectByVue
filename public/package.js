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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/Greeter.js":
/*!************************!*\
  !*** ./app/Greeter.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// import vue from 'vue'\r\n// import defaultText from './tsconfig.json'\r\n\r\nvar defaultText=__webpack_require__(/*! ./tsconfig.json */ \"./app/tsconfig.json\");\r\n\r\nmodule.exports=function () {\r\n    var template= document.createElement('p');\r\n    template.textContent=\"hello,this a Vue project\";\r\n    // template.textContent=defaultText.compilerOptions;\r\n    return template;\r\n};\r\n\r\n\r\n// Vue.component('hello-world', {\r\n//     methods: {\r\n//         method () {\r\n//             console.log('clicked')\r\n//         }\r\n//     },\r\n//     render () {\r\n//         return (\r\n//             <div>\r\n//                 <a href=\"/\" onClick:prevent={this.method} />\r\n//             </div>\r\n//     )\r\n//     }\r\n// });\r\n//\r\n// export default 'hello-world'//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvR3JlZXRlci5qcz9iNDEzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FBRUEsZ0JBQWdCLG1CQUFPLENBQUMsNENBQWlCOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELFlBQVk7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EiLCJmaWxlIjoiLi9hcHAvR3JlZXRlci5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB2dWUgZnJvbSAndnVlJ1xyXG4vLyBpbXBvcnQgZGVmYXVsdFRleHQgZnJvbSAnLi90c2NvbmZpZy5qc29uJ1xyXG5cclxudmFyIGRlZmF1bHRUZXh0PXJlcXVpcmUoJy4vdHNjb25maWcuanNvbicpO1xyXG5cclxubW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHRlbXBsYXRlPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICB0ZW1wbGF0ZS50ZXh0Q29udGVudD1cImhlbGxvLHRoaXMgYSBWdWUgcHJvamVjdFwiO1xyXG4gICAgLy8gdGVtcGxhdGUudGV4dENvbnRlbnQ9ZGVmYXVsdFRleHQuY29tcGlsZXJPcHRpb25zO1xyXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xyXG59O1xyXG5cclxuXHJcbi8vIFZ1ZS5jb21wb25lbnQoJ2hlbGxvLXdvcmxkJywge1xyXG4vLyAgICAgbWV0aG9kczoge1xyXG4vLyAgICAgICAgIG1ldGhvZCAoKSB7XHJcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGlja2VkJylcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9LFxyXG4vLyAgICAgcmVuZGVyICgpIHtcclxuLy8gICAgICAgICByZXR1cm4gKFxyXG4vLyAgICAgICAgICAgICA8ZGl2PlxyXG4vLyAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9cIiBvbkNsaWNrOnByZXZlbnQ9e3RoaXMubWV0aG9kfSAvPlxyXG4vLyAgICAgICAgICAgICA8L2Rpdj5cclxuLy8gICAgIClcclxuLy8gICAgIH1cclxuLy8gfSk7XHJcbi8vXHJcbi8vIGV4cG9ydCBkZWZhdWx0ICdoZWxsby13b3JsZCciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./app/Greeter.js\n");

/***/ }),

/***/ "./app/main.js":
/*!*********************!*\
  !*** ./app/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// import vue form 'vue';\r\n// import contentFromgreeter from './Greeter.js'\r\n\r\n const contentFromgreeter= __webpack_require__(/*! ./Greeter.js */ \"./app/Greeter.js\");\r\ndocument.querySelector(\"#helloWord\").appendChild(contentFromgreeter());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvbWFpbi5qcz9mMTYxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FBRUEsMkJBQTJCLG1CQUFPLENBQUMsc0NBQWM7QUFDakQiLCJmaWxlIjoiLi9hcHAvbWFpbi5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB2dWUgZm9ybSAndnVlJztcclxuLy8gaW1wb3J0IGNvbnRlbnRGcm9tZ3JlZXRlciBmcm9tICcuL0dyZWV0ZXIuanMnXHJcblxyXG4gY29uc3QgY29udGVudEZyb21ncmVldGVyPSByZXF1aXJlKFwiLi9HcmVldGVyLmpzXCIpO1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlbGxvV29yZFwiKS5hcHBlbmRDaGlsZChjb250ZW50RnJvbWdyZWV0ZXIoKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./app/main.js\n");

/***/ }),

/***/ "./app/tsconfig.json":
/*!***************************!*\
  !*** ./app/tsconfig.json ***!
  \***************************/
/*! exports provided: compilerOptions, default */
/***/ (function(module) {

eval("module.exports = {\"compilerOptions\":\"hello,this a Vue project\"};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL2FwcC90c2NvbmZpZy5qc29uLmpzIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./app/tsconfig.json\n");

/***/ })

/******/ });