(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RQL"] = factory();
	else
		root["RQL"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Query, Parser, QueryTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query */ \"./src/query.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Query\", function() { return _query__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser */ \"./src/parser.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Parser\", function() { return _parser__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _query_tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query-tree */ \"./src/query-tree.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"QueryTree\", function() { return _query_tree__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n\n\n\n\n\n\n//# sourceURL=webpack://RQL/./src/index.js?");

/***/ }),

/***/ "./src/parser.js":
/*!***********************!*\
  !*** ./src/parser.js ***!
  \***********************/
/*! exports provided: default, converters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"converters\", function() { return converters; });\n/* harmony import */ var _rql_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rql-util */ \"./src/rql-util.js\");\n/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ \"./src/query.js\");\n\n\n\nconst operatorMap = {\n  \"=\": \"eq\",\n  \"==\": \"eq\",\n  \">\": \"gt\",\n  \">=\": \"ge\",\n  \"<\": \"lt\",\n  \"<=\": \"le\",\n  \"!=\": \"ne\"\n};\n\nconst commonOperatorMap = {\n  \"and\": \"&\",\n  \"or\": \"|\",\n  \"eq\": \"=\",\n  \"ne\": \"!=\",\n  \"le\": \"<=\",\n  \"ge\": \">=\",\n  \"lt\": \"<\",\n  \"gt\": \">\"\n};\n\nconst autoConverted = {\n  \"true\": true,\n  \"false\": false,\n  \"null\": null,\n  \"undefined\": undefined,\n  \"Infinity\": Infinity,\n  \"-Infinity\": -Infinity\n};\n\nconst converters = {\n  auto: function (string) {\n    if (autoConverted.hasOwnProperty(string)) {\n      return autoConverted[string];\n    }\n    var number = +string;\n    if (isNaN(number) || number.toString() !== string) {\n      /*var isoDate = /^(\\d{4})-(\\d{2})-(\\d{2})T(\\d{2}):(\\d{2}):(\\d{2})(?:\\.(\\d{1,3}))?Z$/.exec(x);\n      if (isoDate) {\n        date = new Date(Date.UTC(+isoDate[1], +isoDate[2] - 1, +isoDate[3], +isoDate[4], +isoDate[5], +isoDate[6], +isoDate[7] || 0));\n      }*/\n      string = decodeURIComponent(string);\n      if (jsonQueryCompatible) {\n        if (string.charAt(0) == \"'\" && string.charAt(string.length - 1) == \"'\") {\n          return JSON.parse('\"' + string.substring(1, string.length - 1) + '\"');\n        }\n      }\n      return string;\n    }\n    return number;\n  },\n  number: function (x) {\n    var number = +x;\n    if (isNaN(number)) {\n      throw new URIError(\"Invalid number \" + number);\n    }\n    return number;\n  },\n  epoch: function (x) {\n    var date = new Date(+x);\n    if (isNaN(date.getTime())) {\n      throw new URIError(\"Invalid date \" + x);\n    }\n    return date;\n  },\n  isodate: function (x) {\n    // four-digit year\n    var date = '0000'.substr(0, 4 - x.length) + x;\n    // pattern for partial dates\n    date += '0000-01-01T00:00:00Z'.substring(date.length);\n    return converters.date(date);\n  },\n  date: function (x) {\n    var isoDate = /^(\\d{4})-(\\d{2})-(\\d{2})T(\\d{2}):(\\d{2}):(\\d{2})(?:\\.(\\d{1,3}))?Z$/.exec(x);\n    var date;\n    if (isoDate) {\n      date = new Date(Date.UTC(+isoDate[1], +isoDate[2] - 1, +isoDate[3], +isoDate[4], +isoDate[5], +isoDate[6], +isoDate[7] || 0));\n    } else {\n      date = new Date(x);\n    }\n    if (isNaN(date.getTime())) {\n      throw new URIError(\"Invalid date \" + x);\n    }\n    return date;\n  },\n  \"boolean\": function (x) {\n    return x === \"true\";\n  },\n  string: function (string) {\n    return decodeURIComponent(string);\n  },\n  re: function (x) {\n    return new RegExp(decodeURIComponent(x), 'i');\n  },\n  RE: function (x) {\n    return new RegExp(decodeURIComponent(x));\n  },\n  glob: function (x) {\n    var s = decodeURIComponent(x).replace(/([\\\\|\\||\\(|\\)|\\[|\\{|\\^|\\$|\\*|\\+|\\?|\\.|\\<|\\>])/g, function (x) { return '\\\\' + x; }).replace(/\\\\\\*/g, '.*').replace(/\\\\\\?/g, '.?');\n    if (s.substring(0, 2) !== '.*') s = '^' + s; else s = s.substring(2);\n    if (s.substring(s.length - 2) !== '.*') s = s + '$'; else s = s.substring(0, s.length - 2);\n    return new RegExp(s, 'i');\n  }\n};\n\nconverters[\"default\"] = converters.auto;\n\nconst primaryKeyName = 'id';\nconst lastSeen = ['sort', 'select', 'values', 'limit'];\nconst jsonQueryCompatible = true;\n\nfunction stringToValue(string, parameters) {\n  var converter = converters[\"default\"];\n  if (string.charAt(0) === \"$\") {\n    var param_index = parseInt(string.substring(1)) - 1;\n    return param_index >= 0 && parameters ? parameters[param_index] : undefined;\n  }\n  if (string.indexOf(\":\") > -1) {\n    var parts = string.split(\":\");\n    converter = converters[parts[0]];\n    if (!converter) {\n      throw new URIError(\"Unknown converter \" + parts[0]);\n    }\n    string = parts.slice(1).join(\":\");\n  }\n  return converter(string);\n}\n\nfunction parse(/*String|Object*/query, parameters) {\n  if (typeof query === \"undefined\" || query === null)\n    query = '';\n  var term = new _query__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  var topTerm = term;\n  topTerm.cache = {}; // room for lastSeen params\n  var topTermName = topTerm.name;\n  topTerm.name = '';\n  if (typeof query === \"object\") {\n    if (query instanceof _query__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n      return query;\n    }\n    for (var i in query) {\n      var term = new _query__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n      topTerm.args.push(term);\n      term.name = \"eq\";\n      term.args = [i, query[i]];\n    }\n    return topTerm;\n  }\n  if (query.charAt(0) == \"?\") {\n    throw new URIError(\"Query must not start with ?\");\n  }\n  if (jsonQueryCompatible) {\n    query = query.replace(/%3C=/g, \"=le=\").replace(/%3E=/g, \"=ge=\").replace(/%3C/g, \"=lt=\").replace(/%3E/g, \"=gt=\");\n  }\n  if (query.indexOf(\"/\") > -1) { // performance guard\n    // convert slash delimited text to arrays\n    query = query.replace(/[\\+\\*\\$\\-:\\w%\\._]*\\/[\\+\\*\\$\\-:\\w%\\._\\/]*/g, function (slashed) {\n      return \"(\" + slashed.replace(/\\//g, \",\") + \")\";\n    });\n  }\n  // convert FIQL to normalized call syntax form\n  query = query.replace(/(\\([\\+\\*\\$\\-:\\w%\\._,]+\\)|[\\+\\*\\$\\-:\\w%\\._]*|)([<>!]?=(?:[\\w]*=)?|>|<)(\\([\\+\\*\\$\\-:\\w%\\._,]+\\)|[\\+\\*\\$\\-:\\w%\\._]*|)/g,\n    //                   <---------       property        -----------><------  operator -----><----------------   value ------------------>\n    function (t, property, operator, value) {\n      if (operator.length < 3) {\n        if (!operatorMap[operator]) {\n          throw new URIError(\"Illegal operator \" + operator);\n        }\n        operator = operatorMap[operator];\n      }\n      else {\n        operator = operator.substring(1, operator.length - 1);\n      }\n      return operator + '(' + property + \",\" + value + \")\";\n    });\n  if (query.charAt(0) == \"?\") {\n    query = query.substring(1);\n  }\n  var leftoverCharacters = query.replace(/(\\))|([&\\|,])?([\\+\\*\\$\\-:\\w%\\._]*)(\\(?)/g,\n    //                               <-closedParan->|<-delim-- propertyOrValue -----(> |\n    function (t, closedParan, delim, propertyOrValue, openParan) {\n      if (delim) {\n        if (delim === \"&\") {\n          setConjunction(\"and\");\n        }\n        if (delim === \"|\") {\n          setConjunction(\"or\");\n        }\n      }\n      if (openParan) {\n        var newTerm = new _query__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        newTerm.name = propertyOrValue;\n        newTerm.parent = term;\n        call(newTerm);\n      }\n      else if (closedParan) {\n        var isArray = !term.name;\n        term = term.parent;\n        if (!term) {\n          throw new URIError(\"Closing paranthesis without an opening paranthesis\");\n        }\n        if (isArray) {\n          term.args.push(term.args.pop().args);\n        }\n      }\n      else if (propertyOrValue || delim === ',') {\n        term.args.push(stringToValue(propertyOrValue, parameters));\n\n        // cache the last seen sort(), select(), values() and limit()\n        if (Object(_rql_util__WEBPACK_IMPORTED_MODULE_0__[\"contains\"])(lastSeen, term.name)) {\n          topTerm.cache[term.name] = term.args;\n        }\n        // cache the last seen id equality\n        if (term.name === 'eq' && term.args[0] === primaryKeyName) {\n          var id = term.args[1];\n          if (id && !(id instanceof RegExp)) id = id.toString();\n          topTerm.cache[primaryKeyName] = id;\n        }\n      }\n      return \"\";\n    });\n  if (term.parent) {\n    throw new URIError(\"Opening paranthesis without a closing paranthesis\");\n  }\n  if (leftoverCharacters) {\n    // any extra characters left over from the replace indicates invalid syntax\n    throw new URIError(\"Illegal character in query string encountered \" + leftoverCharacters);\n  }\n\n  function call(newTerm) {\n    term.args.push(newTerm);\n    term = newTerm;\n    // cache the last seen sort(), select(), values() and limit()\n    if (Object(_rql_util__WEBPACK_IMPORTED_MODULE_0__[\"contains\"])(lastSeen, term.name)) {\n      topTerm.cache[term.name] = term.args;\n    }\n  }\n  function setConjunction(operator) {\n    if (!term.name) {\n      term.name = operator;\n    }\n    else if (term.name !== operator) {\n      throw new Error(\"Can not mix conjunctions within a group, use paranthesis around each set of same conjuctions (& and |)\");\n    }\n  }\n  function removeParentProperty(obj) {\n    // if (obj && obj.args) {\n    //   delete obj.parent;\n    //   var args = obj.args;\n    //   for (var i = 0, l = args.length; i < l; i++) {\n    //     removeParentProperty(args[i]);\n    //   }\n    // }\n    return obj;\n  };\n  removeParentProperty(topTerm);\n  if (!topTerm.name) {\n    topTerm.name = topTermName;\n  }\n  return topTerm;\n};\n\n/* dumps undesirable exceptions to Query().error */\nfunction parseGently() {\n  var terms;\n  try {\n    terms = parse.apply(this, arguments);\n  } catch (err) {\n    terms = new _query__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n    terms.error = err.message;\n  }\n  return terms;\n}\n\nfunction Parser() {}\n\nParser.parseQuery = parse;\nParser.parseGently = parseGently;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Parser);\n\n\n//# sourceURL=webpack://RQL/./src/parser.js?");

/***/ }),

/***/ "./src/query-tree.js":
/*!***************************!*\
  !*** ./src/query-tree.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return QueryTree; });\n/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query */ \"./src/query.js\");\n\n\n/**\n * Performs CRUD operations on a query tree\n */\nclass QueryTree {\n  \n  constructor(root, options) { \n    const theOptions = options || {};\n    this._options = theOptions;\n    this._options.containers = theOptions.containers || [];\n    this._root = root || new _query__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('and');\n  }\n\n  /**\n   * VIP queries are nodes that can have only one child and are immediate children of root.\n   * \n   * @param query \n   */\n  __isContainerQuery(query) {\n    return this._options.containers.indexOf(query.name) > -1;\n  }\n\n  __hasContainers() {\n    return this._options.containers.length > 0;\n  }\n\n  /**\n   * When a query node has only one argument, it will be removed from the parent and its\n   * children will adopted by the parent\n   * \n   * @param query \n   */\n  __adoptChildren(query) {\n    let parent = query.parent;\n    if (parent) {\n      const index = parent.args.indexOf(query);\n\n      if (index > -1) {          \n        parent.args.splice(index, 1);\n        query.args.forEach(child => child.parent = parent);\n        parent.args.splice.apply(parent.args, [index, 0].concat(query.args));\n\n        if (parent.args.length < 2) {\n          if (!this.__isContainerQuery(parent)) {\n            this.__adoptChildren(parent);\n          } else if (parent.args.length === 0) {\n            this.__deleteContainerQuery(parent);\n          }\n        }        \n      }\n\n    }\n  }\n\n  /**\n   * Adds a query to the given parent, if no parent is given, the query will be added to the root.\n   * \n   * @param {*} parent \n   * @param {*} query \n   */\n  addQuery(parent, query) {\n    let theParent = parent == null ? this._root : parent;   \n    theParent.args = (theParent.args || []).concat(query);\n    query.parent = theParent;\n  }\n  \n  /**\n   * Finds the parent and adds a new query.\n   * \n   * @param fnCriteria - criteria to find the parent\n   * @param query \n   */\n  findAndAddQuery(fnCriteria, query) {\n    const parent = this.search(fnCriteria);\n    if (parent) {\n      this.addQuery(parent, query);\n      return;\n    }\n\n    console.error(\"Could not find parent query to add child.\");\n  }\n\n  /**\n   * Find an exisgting query and update/replace its args\n   * \n   * @param fnCriteria - criteria to find the query\n   * @param newArgs - new values\n   */\n  findAndUpdateQuery(fnCriteria, newArgs) {\n    let target = this.search(fnCriteria);\n    if (target) {\n      target.args = newArgs;\n      return;\n    }\n\n    console.error(\"Could not find query to delete.\");\n  }\n\n  __deleteContainerQuery(query) {\n    let parent = query.parent;\n    if (parent && this.__isContainerQuery(query)) {\n      const index = parent.args.indexOf(query);\n      if (index > -1) {\n        parent.args.splice(index, 1);\n        query.parent = null;\n      }\n    }\n  }\n\n  /**\n   * Deletes the input query from the tree.\n   * \n   * @param query \n   */\n  deleteQuery(query) {\n    let parent = query.parent;\n    if (!parent) return;\n\n    const index = parent.args.indexOf(query);\n    \n    if (index > -1) {\n      parent.args.splice(index, 1);\n      query.parent = null;\n\n      if (parent.args.length < 2) {\n        if (this.__isContainerQuery(parent)) {\n          if (parent.args.length < 1) {\n            this.__deleteContainerQuery(parent);\n          }\n        } else {\n          this.__adoptChildren(parent);\n        }        \n      }\n    }\n  }\n\n  /**\n   * FInd an existing query and deletes it.\n   * \n   * @param fnCriteria - criteria to find the query\n   */\n  findAndDeleteQuery(fnCriteria) {\n    const query = this.search(fnCriteria);\n    if (query) {\n      this.deleteQuery(query);\n      return;\n    }\n\n    console.error(\"Could not find query to delete.\")\n  }\n\n    \n  /**\n   * Traverses the Query tree and calls the visitor callback.\n   * \n   * @param fnVisitor - visitor callback must be of the form : (query) => {...}\n   */\n\n  visit(fnVisitor) {\n    function __visit(query) {\n      if (!query || !(query instanceof _query__WEBPACK_IMPORTED_MODULE_0__[\"default\"])) {\n        return;\n      };\n\n      fnVisitor.call(this, query);\n            \n      let i = 0;\n      let args = query.args || [];\n\n      for (; i < args.length; i++) {\n        __visit.call(this, args[i]);\n      }\n\n    }\n    \n    __visit.call(this, this._root);    \n  }\n  \n  /**\n   * Searches the Query tree by applying the input filter.\n   * If filter function returns true, the corresponding query is returned, null otherwise\n   * \n   * @param fnCriteria - applied to each query node and must be of the form : (name, args, parent) => <criteria>\n   */\n\n  search(fnCriteria) {\n    function __search(query) {\n      if (!query || !(query instanceof _query__WEBPACK_IMPORTED_MODULE_0__[\"default\"])) {\n        return null;\n      };\n\n      if (fnCriteria.apply(this, [query.name, query.args, query.parent])) {\n        return query;\n      }\n      \n      let i = 0;\n      let found = null;    \n      let args = query.args || [];\n\n      for (; i < args.length && !found; i++) {\n        found = __search.apply(this, [args[i]]);\n      }\n\n      return found;\n    }\n    \n    return __search.apply(this, [this._root]);    \n  }\n\n  serialize() {\n    return _query__WEBPACK_IMPORTED_MODULE_0__[\"default\"].serializeArgs(this._root, ',');\n  }\n\n  asTree(query) {\n    return new QueryTree(query, this.options);\n  }\n\n  get root() {\n    return this._root;\n  }\n\n  set root(value) {\n    this._root = value;\n  }\n}\n\n\n//# sourceURL=webpack://RQL/./src/query-tree.js?");

/***/ }),

/***/ "./src/query.js":
/*!**********************!*\
  !*** ./src/query.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rql_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rql-util */ \"./src/rql-util.js\");\n/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser */ \"./src/parser.js\");\n\n \n\nconst knownOperators = [\"sort\", \"match\", \"in\", \"out\", \"or\", \"and\", \"select\", \"contains\", \"excludes\", \"values\", \"limit\", \"distinct\", \"recurse\", \"aggregate\", \"between\", \"sum\", \"mean\", \"max\", \"min\", \"count\", \"first\", \"one\", \"eq\", \"ne\", \"le\", \"ge\", \"lt\", \"gt\"];\nconst knownScalarOperators = [\"mean\", \"sum\", \"min\", \"max\", \"count\", \"first\", \"one\"];\nconst arrayMethods = [\"forEach\", \"reduce\", \"map\", \"filter\", \"indexOf\", \"some\", \"every\"];\n\nfunction when(value, callback) { callback(value) };\n\nfunction serializeArgs(array, delimiter) {\n  var results = [];\n  for (var i = 0, l = array.length; i < l; i++) {\n    results.push(queryToString(array[i]));\n  }\n  return results.join(delimiter);\n}\n\nfunction queryToString(part) {\n  if (part instanceof Array) {\n    return \"(\" + serializeArgs(part, \",\") + \")\";\n  }\n  if (part && part.name && part.args) {\n    return [\n      part.name, \"(\", serializeArgs(part.args, \",\"), \")\"\n    ].join(\"\");\n  }\n  return encodeValue(part);\n}\n\nfunction encodeString(s) {\n  if (typeof s === \"string\") {\n    s = encodeURIComponent(s);\n    if (s.match(/[\\(\\)]/)) {\n      s = s.replace(\"(\", \"%28\").replace(\")\", \"%29\");\n    };\n  }\n  return s;\n}\n\nfunction encodeValue(val) {\n  var encoded;\n  if (val === null) val = 'null';\n  if (val !== _parser__WEBPACK_IMPORTED_MODULE_1__[\"converters\"][\"default\"](\"\" + (\n    val.toISOString && val.toISOString() || val.toString()\n  ))) {\n    var type = typeof val;\n    if (val instanceof RegExp) {\n      // TODO: control whether to we want simpler glob() style\n      val = val.toString();\n      var i = val.lastIndexOf(\"/\");\n      type = val.substring(i).indexOf('i') >= 0 ? \"re\" : \"RE\";\n      val = encodeString(val.substring(1, i));\n      encoded = true;\n    }\n    if (type === \"object\") {\n      type = \"epoch\";\n      val = val.getTime();\n      encoded = true;\n    }\n    if (type === \"string\") {\n      val = encodeString(val);\n      encoded = true;\n    }\n    val = [type, val].join(\":\");\n  }\n  if (!encoded && typeof val === \"string\") val = encodeString(val);\n  return val;\n}\n\nfunction Query(name, args) {\n  this.name = name || \"and\";\n  this.args = args || [];\n}\n\nQuery.prototype.toString = function () {\n  return this.name === \"and\" ?\n    serializeArgs(this.args, \"&\") :\n    queryToString(this);\n};\n\nQuery.serializeArgs = function(query, separator) {\n  return query.name === \"and\" ?\n    serializeArgs(query.args, separator ? separator : '&') :\n    queryToString(query);\n}\n\nfunction updateQueryMethods() {\n  Object(_rql_util__WEBPACK_IMPORTED_MODULE_0__[\"each\"])(knownOperators, function (name) {\n    Query.prototype[name] = function () {\n      var newQuery = new Query();\n      newQuery.executor = this.executor;\n      var newTerm = new Query(name);\n      newTerm.args = Array.prototype.slice.call(arguments);\n      newQuery.args = this.args.concat([newTerm]);\n      return newQuery;\n    };\n  });\n  Object(_rql_util__WEBPACK_IMPORTED_MODULE_0__[\"each\"])(knownScalarOperators, function (name) {\n    Query.prototype[name] = function () {\n      var newQuery = new Query();\n      newQuery.executor = this.executor;\n      var newTerm = new Query(name);\n      newTerm.args = Array.prototype.slice.call(arguments);\n      newQuery.args = this.args.concat([newTerm]);\n      return newQuery.executor(newQuery);\n    };\n  });\n  Object(_rql_util__WEBPACK_IMPORTED_MODULE_0__[\"each\"])(arrayMethods, function (name) {\n    // this makes no guarantee of ensuring that results supports these methods\n    Query.prototype[name] = function () {\n      var args = arguments;\n      return when(this.executor(this), function (results) {\n        return results[name].apply(results, args);\n      });\n    };\n  });\n\n};\n\nupdateQueryMethods();\n\n/* recursively iterate over query terms calling 'fn' for each term */\nQuery.prototype.walk = function (fn, options) {\n  options = options || {};\n  function walk(name, terms) {\n    terms = terms || [];\n\n    var i = 0, l = terms.length, term, args, func, newTerm;\n\n    for (; i < l; i++) {\n      term = terms[i];\n      if (term == null) {\n        term = {};\n      }\n      func = term.name;\n      args = term.args;\n      if (!func || !args) {\n        continue;\n      }\n      if (args[0] instanceof Query) {\n        walk.call(this, func, args);\n      }\n      else {\n        newTerm = fn.call(this, func, args);\n        if (newTerm && newTerm.name && newTerm.ags) {\n          terms[i] = newTerm;\n        }\n      }\n    }\n  }\n  walk.call(this, this.name, this.args);\n};\n\n/* append a new term */\nQuery.prototype.push = function (term) {\n  this.args.push(term);\n  return this;\n};\n\n/* disambiguate query */\nQuery.prototype.normalize = function (options) {\n  options = options || {};\n  options.primaryKey = options.primaryKey || 'id';\n  options.map = options.map || {};\n  var result = {\n    original: this,\n    sort: [],\n    limit: [Infinity, 0, Infinity],\n    skip: 0,\n    limit: Infinity,\n    select: [],\n    values: false\n  };\n  var plusMinus = {\n    // [plus, minus]\n    sort: [1, -1],\n    select: [1, 0]\n  };\n  function normal(func, args) {\n    // cache some parameters\n    if (func === 'sort' || func === 'select') {\n      result[func] = args;\n      var pm = plusMinus[func];\n      result[func + 'Arr'] = result[func].map(function (x) {\n        if (x instanceof Array) x = x.join('.');\n        var o = {};\n        var a = /([-+]*)(.+)/.exec(x);\n        o[a[2]] = pm[(a[1].charAt(0) === '-') * 1];\n        return o;\n      });\n      result[func + 'Obj'] = {};\n      result[func].forEach(function (x) {\n        if (x instanceof Array) x = x.join('.');\n        var a = /([-+]*)(.+)/.exec(x);\n        result[func + 'Obj'][a[2]] = pm[(a[1].charAt(0) === '-') * 1];\n      });\n    } else if (func === 'limit') {\n      // validate limit() args to be numbers, with sane defaults\n      var limit = args;\n      result.skip = +limit[1] || 0;\n      limit = +limit[0] || 0;\n      if (options.hardLimit && limit > options.hardLimit)\n        limit = options.hardLimit;\n      result.limit = limit;\n      result.needCount = true;\n    } else if (func === 'values') {\n      // N.B. values() just signals we want array of what we select()\n      result.values = true;\n    } else if (func === 'eq') {\n      // cache primary key equality -- useful to distinguish between .get(id) and .query(query)\n      var t = typeof args[1];\n      //if ((args[0] instanceof Array ? args[0][args[0].length-1] : args[0]) === options.primaryKey && ['string','number'].indexOf(t) >= 0) {\n      if (args[0] === options.primaryKey && ('string' === t || 'number' === t)) {\n        result.pk = String(args[1]);\n      }\n    }\n    // cache search conditions\n    //if (options.known[func])\n    // map some functions\n\t\t/*if (options.map[func]) {\n\t\t\tfunc = options.map[func];\n\t\t}*/\n  }\n  this.walk(normal);\n  return result;\n};\n\n/**\n * Custom 'instanceof' to circumvent the issue of '<obj> instanceof Query' returning false. This happens when two client code import the 'rql' library differently.\n * NOTE: This is not supported in Internet Explorer.\n */\nObject.defineProperty(Query, Symbol.hasInstance, {\n  value: function(instance) {\n    return instance && instance.constructor.name === 'Query' && instance.hasOwnProperty('name') && instance.hasOwnProperty('args');\n  }\n})\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Query);\n\n//# sourceURL=webpack://RQL/./src/query.js?");

/***/ }),

/***/ "./src/rql-util.js":
/*!*************************!*\
  !*** ./src/rql-util.js ***!
  \*************************/
/*! exports provided: contains, each */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"contains\", function() { return contains; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"each\", function() { return each; });\nfunction contains(array, item) {\n  for (var i = 0, l = array.length; i < l; i++) {\n    if (array[i] === item) {\n      return true;\n    }\n  }\n}\n\nfunction each(array, callback) {\n  var emit, result;\n  if (callback.length > 1) {\n    // can take a second param, emit\n    result = [];\n    emit = function (value) {\n      result.push(value);\n    };\n  }\n  for (var i = 0, l = array.length; i < l; i++) {\n    if (callback(array[i], emit)) {\n      return result || true;\n    }\n  }\n  return result;\n}\n\n\n\n//# sourceURL=webpack://RQL/./src/rql-util.js?");

/***/ })

/******/ });
});