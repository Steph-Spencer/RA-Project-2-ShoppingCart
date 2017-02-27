/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "60e5356fa61be8832ecb"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _App = __webpack_require__(1);\n\nvar _App2 = _interopRequireDefault(_App);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar app = new _App2.default(); /**\n                                * Created by Edward_J_Apostol on 2016-08-29.\n                                */\n// this is where the \"main\" section of your app begins.\n// its like a launch pad, where you bring all your other classes\n// together for use.\n\n\n/* all the code that could be written here has\nbeen encapsulated (moved) into an 'App' class. the 'App' class\nis the application (i.e. your web site, the shopping cart project)\nitself. This is done for organization and cleanliness in code.\nSo now you only see two lines here in index.js\n *///# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6WyJhcHAiXSwibWFwcGluZ3MiOiI7O0FBY0E7Ozs7OztBQUVBLElBQUlBLE1BQU0sbUJBQVYsQyxDQWhCQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQSIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IEVkd2FyZF9KX0Fwb3N0b2wgb24gMjAxNi0wOC0yOS5cbiAqL1xuLy8gdGhpcyBpcyB3aGVyZSB0aGUgXCJtYWluXCIgc2VjdGlvbiBvZiB5b3VyIGFwcCBiZWdpbnMuXG4vLyBpdHMgbGlrZSBhIGxhdW5jaCBwYWQsIHdoZXJlIHlvdSBicmluZyBhbGwgeW91ciBvdGhlciBjbGFzc2VzXG4vLyB0b2dldGhlciBmb3IgdXNlLlxuXG5cbi8qIGFsbCB0aGUgY29kZSB0aGF0IGNvdWxkIGJlIHdyaXR0ZW4gaGVyZSBoYXNcbmJlZW4gZW5jYXBzdWxhdGVkIChtb3ZlZCkgaW50byBhbiAnQXBwJyBjbGFzcy4gdGhlICdBcHAnIGNsYXNzXG5pcyB0aGUgYXBwbGljYXRpb24gKGkuZS4geW91ciB3ZWIgc2l0ZSwgdGhlIHNob3BwaW5nIGNhcnQgcHJvamVjdClcbml0c2VsZi4gVGhpcyBpcyBkb25lIGZvciBvcmdhbml6YXRpb24gYW5kIGNsZWFubGluZXNzIGluIGNvZGUuXG5TbyBub3cgeW91IG9ubHkgc2VlIHR3byBsaW5lcyBoZXJlIGluIGluZGV4LmpzXG4gKi9cbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuXG5sZXQgYXBwID0gbmV3IEFwcCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Edward_J_Apostol on 2017-01-28.\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */\n\nvar _BestBuyWebService = __webpack_require__(2);\n\nvar _BestBuyWebService2 = _interopRequireDefault(_BestBuyWebService);\n\nvar _CatalogView = __webpack_require__(3);\n\nvar _CatalogView2 = _interopRequireDefault(_CatalogView);\n\nvar _ShoppingCart = __webpack_require__(4);\n\nvar _ShoppingCart2 = _interopRequireDefault(_ShoppingCart);\n\nvar _ShoppingCartView = __webpack_require__(5);\n\nvar _ShoppingCartView2 = _interopRequireDefault(_ShoppingCartView);\n\nvar _QuickView = __webpack_require__(6);\n\nvar _QuickView2 = _interopRequireDefault(_QuickView);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar App = function () {\n    function App() {\n        _classCallCheck(this, App);\n\n        this.productData = null; // this will store all our data\n        this.products = null; // stores specifically the products\n        this.catalogView = new _CatalogView2.default(); // this will display our data\n        this.shoppingCart = new _ShoppingCart2.default();\n        // call the initBestBuyWebService to initialize the\n        // BestBuy Web Service and return the data\n        this.initBestBuyWebService();\n        this.shoppingCartView = new _ShoppingCartView2.default();\n        this.quickView = new _QuickView2.default();\n    }\n\n    _createClass(App, [{\n        key: 'initBestBuyWebService',\n        value: function initBestBuyWebService() {\n            this.bbws = new _BestBuyWebService2.default();\n            // use your own API key for this (the one from Cody)\n            this.bbws.apiKey = \"SXkiDh8lcFEAqyG6rDmJjlH4\";\n\n            // this uses 'backticks' for long multi-line strings\n            this.bbws.url = 'https://api.bestbuy.com/v1/products(condition=new&color=silver&(categoryPath.id=abcat0502000))?apiKey=' + this.bbws.apiKey + '&format=json';\n\n            // pass the reference to this app to store the data\n            this.bbws.getData(this);\n        }\n    }, {\n        key: 'prepCatalog',\n        value: function prepCatalog() {\n            // use this console.log to test the data\n            // console.log(this.productData);\n\n            if (this.productData != null) {\n                // only get the products property (for now)\n                // this code was copied from SimpleHTTPRequest.html\n                this.products = this.bbws.getProducts();\n                console.log(this.products);\n            }\n\n            this.showCatalog();\n        }\n    }, {\n        key: 'showCatalog',\n        value: function showCatalog() {\n            // populate the catalog only if there are products\n            if (this.productData != null) {\n                this.catalogView.addProductsToCarousel(this.products, this);\n                // this.catalogView.showCatalog();\n            }\n        }\n    }]);\n\n    return App;\n}();\n\nexports.default = App;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwLmpzP2E2NzMiXSwibmFtZXMiOlsiQXBwIiwicHJvZHVjdERhdGEiLCJwcm9kdWN0cyIsImNhdGFsb2dWaWV3Iiwic2hvcHBpbmdDYXJ0IiwiaW5pdEJlc3RCdXlXZWJTZXJ2aWNlIiwic2hvcHBpbmdDYXJ0VmlldyIsInF1aWNrVmlldyIsImJid3MiLCJhcGlLZXkiLCJ1cmwiLCJnZXREYXRhIiwiZ2V0UHJvZHVjdHMiLCJjb25zb2xlIiwibG9nIiwic2hvd0NhdGFsb2ciLCJhZGRQcm9kdWN0c1RvQ2Fyb3VzZWwiXSwibWFwcGluZ3MiOiI7Ozs7OztxakJBQUE7Ozs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVxQkEsRztBQUVqQixtQkFBYTtBQUFBOztBQUNULGFBQUtDLFdBQUwsR0FBbUIsSUFBbkIsQ0FEUyxDQUNnQjtBQUN6QixhQUFLQyxRQUFMLEdBQWdCLElBQWhCLENBRlMsQ0FFYTtBQUN0QixhQUFLQyxXQUFMLEdBQW1CLDJCQUFuQixDQUhTLENBRzZCO0FBQ3RDLGFBQUtDLFlBQUwsR0FBb0IsNEJBQXBCO0FBQ0E7QUFDQTtBQUNBLGFBQUtDLHFCQUFMO0FBQ0MsYUFBS0MsZ0JBQUwsR0FBd0IsZ0NBQXhCO0FBQ0EsYUFBS0MsU0FBTCxHQUFpQix5QkFBakI7QUFDSjs7OztnREFFc0I7QUFDbkIsaUJBQUtDLElBQUwsR0FBWSxpQ0FBWjtBQUNBO0FBQ0EsaUJBQUtBLElBQUwsQ0FBVUMsTUFBVixHQUFtQiwwQkFBbkI7O0FBRUE7QUFDQSxpQkFBS0QsSUFBTCxDQUFVRSxHQUFWLDhHQUF5SCxLQUFLRixJQUFMLENBQVVDLE1BQW5JOztBQUVBO0FBQ0EsaUJBQUtELElBQUwsQ0FBVUcsT0FBVixDQUFrQixJQUFsQjtBQUVIOzs7c0NBRVk7QUFDVDtBQUNBOztBQUVBLGdCQUFHLEtBQUtWLFdBQUwsSUFBa0IsSUFBckIsRUFBMEI7QUFDdEI7QUFDQTtBQUNBLHFCQUFLQyxRQUFMLEdBQWdCLEtBQUtNLElBQUwsQ0FBVUksV0FBVixFQUFoQjtBQUNBQyx3QkFBUUMsR0FBUixDQUFZLEtBQUtaLFFBQWpCO0FBQ0g7O0FBRUQsaUJBQUthLFdBQUw7QUFDSDs7O3NDQUVhO0FBQ1Y7QUFDQSxnQkFBSSxLQUFLZCxXQUFMLElBQW9CLElBQXhCLEVBQThCO0FBQzFCLHFCQUFLRSxXQUFMLENBQWlCYSxxQkFBakIsQ0FBdUMsS0FBS2QsUUFBNUMsRUFBcUQsSUFBckQ7QUFDQTtBQUNIO0FBQ0o7Ozs7OztrQkEvQ2dCRixHIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgRWR3YXJkX0pfQXBvc3RvbCBvbiAyMDE3LTAxLTI4LlxuICovXG5cbmltcG9ydCBCZXN0QnV5V2ViU2VydmljZSBmcm9tICcuL0Jlc3RCdXlXZWJTZXJ2aWNlJztcbmltcG9ydCBDYXRhbG9nVmlldyBmcm9tICcuL0NhdGFsb2dWaWV3JztcbmltcG9ydCBTaG9wcGluZ0NhcnQgZnJvbSAnLi9TaG9wcGluZ0NhcnQnO1xuaW1wb3J0IFNob3BwaW5nQ2FydFZpZXcgZnJvbSAnLi9qcy9TaG9wcGluZ0NhcnRWaWV3JztcbmltcG9ydCBRdWlja1ZpZXcgZnJvbSAnLi9qcy9RdWlja1ZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAge1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5wcm9kdWN0RGF0YSA9IG51bGw7IC8vIHRoaXMgd2lsbCBzdG9yZSBhbGwgb3VyIGRhdGFcbiAgICAgICAgdGhpcy5wcm9kdWN0cyA9IG51bGw7IC8vIHN0b3JlcyBzcGVjaWZpY2FsbHkgdGhlIHByb2R1Y3RzXG4gICAgICAgIHRoaXMuY2F0YWxvZ1ZpZXcgPSBuZXcgQ2F0YWxvZ1ZpZXcoKTsgLy8gdGhpcyB3aWxsIGRpc3BsYXkgb3VyIGRhdGFcbiAgICAgICAgdGhpcy5zaG9wcGluZ0NhcnQgPSBuZXcgU2hvcHBpbmdDYXJ0KCk7XG4gICAgICAgIC8vIGNhbGwgdGhlIGluaXRCZXN0QnV5V2ViU2VydmljZSB0byBpbml0aWFsaXplIHRoZVxuICAgICAgICAvLyBCZXN0QnV5IFdlYiBTZXJ2aWNlIGFuZCByZXR1cm4gdGhlIGRhdGFcbiAgICAgICAgdGhpcy5pbml0QmVzdEJ1eVdlYlNlcnZpY2UoKTtcbiAgICAgICAgIHRoaXMuc2hvcHBpbmdDYXJ0VmlldyA9IG5ldyBTaG9wcGluZ0NhcnRWaWV3KCk7XG4gICAgICAgICB0aGlzLnF1aWNrVmlldyA9IG5ldyBRdWlja1ZpZXcoKTtcbiAgICB9XG5cbiAgICBpbml0QmVzdEJ1eVdlYlNlcnZpY2UoKXtcbiAgICAgICAgdGhpcy5iYndzID0gbmV3IEJlc3RCdXlXZWJTZXJ2aWNlKCk7XG4gICAgICAgIC8vIHVzZSB5b3VyIG93biBBUEkga2V5IGZvciB0aGlzICh0aGUgb25lIGZyb20gQ29keSlcbiAgICAgICAgdGhpcy5iYndzLmFwaUtleSA9IFwiU1hraURoOGxjRkVBcXlHNnJEbUpqbEg0XCI7XG5cbiAgICAgICAgLy8gdGhpcyB1c2VzICdiYWNrdGlja3MnIGZvciBsb25nIG11bHRpLWxpbmUgc3RyaW5nc1xuICAgICAgICB0aGlzLmJid3MudXJsID0gYGh0dHBzOi8vYXBpLmJlc3RidXkuY29tL3YxL3Byb2R1Y3RzKGNvbmRpdGlvbj1uZXcmY29sb3I9c2lsdmVyJihjYXRlZ29yeVBhdGguaWQ9YWJjYXQwNTAyMDAwKSk/YXBpS2V5PSR7dGhpcy5iYndzLmFwaUtleX0mZm9ybWF0PWpzb25gO1xuXG4gICAgICAgIC8vIHBhc3MgdGhlIHJlZmVyZW5jZSB0byB0aGlzIGFwcCB0byBzdG9yZSB0aGUgZGF0YVxuICAgICAgICB0aGlzLmJid3MuZ2V0RGF0YSh0aGlzKTtcblxuICAgIH1cblxuICAgIHByZXBDYXRhbG9nKCl7XG4gICAgICAgIC8vIHVzZSB0aGlzIGNvbnNvbGUubG9nIHRvIHRlc3QgdGhlIGRhdGFcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wcm9kdWN0RGF0YSk7XG5cbiAgICAgICAgaWYodGhpcy5wcm9kdWN0RGF0YSE9bnVsbCl7XG4gICAgICAgICAgICAvLyBvbmx5IGdldCB0aGUgcHJvZHVjdHMgcHJvcGVydHkgKGZvciBub3cpXG4gICAgICAgICAgICAvLyB0aGlzIGNvZGUgd2FzIGNvcGllZCBmcm9tIFNpbXBsZUhUVFBSZXF1ZXN0Lmh0bWxcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdHMgPSB0aGlzLmJid3MuZ2V0UHJvZHVjdHMoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvZHVjdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaG93Q2F0YWxvZygpO1xuICAgIH1cblxuICAgIHNob3dDYXRhbG9nKCkge1xuICAgICAgICAvLyBwb3B1bGF0ZSB0aGUgY2F0YWxvZyBvbmx5IGlmIHRoZXJlIGFyZSBwcm9kdWN0c1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0RGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNhdGFsb2dWaWV3LmFkZFByb2R1Y3RzVG9DYXJvdXNlbCh0aGlzLnByb2R1Y3RzLHRoaXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5jYXRhbG9nVmlldy5zaG93Q2F0YWxvZygpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHAuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Created by Edward_J_Apostol on 2017-01-27.\n */\n\nvar BestBuyWebService = function () {\n    function BestBuyWebService() {\n        _classCallCheck(this, BestBuyWebService);\n\n        this.url = \"\";\n        this.apiKey = \"\";\n        this.productData = null;\n        this.products = null;\n    }\n\n    _createClass(BestBuyWebService, [{\n        key: \"getData\",\n        value: function getData(theApp) {\n            // theApp is a reference to the main app\n            // we can pass information to it, including data\n            // that is returned from this service\n\n            var serviceChannel = new XMLHttpRequest();\n            var url = this.url;\n\n            /*\n            // *** To solve the issue of passing the data back to the main app...\n            // *** and eventually, to catalogView\n            // *** You could the addEventListener to call\n            // *** a different function which will have both\n            // *** the event object and dataPlaceHolder as parameters\n            // *** see http://bit.ly/js-passmoreargsevent\n             */\n\n            serviceChannel.addEventListener(\"readystatechange\", this.resultsPreprocessor(theApp), false);\n            serviceChannel.open(\"GET\", url, true);\n            serviceChannel.send();\n        }\n    }, {\n        key: \"resultsPreprocessor\",\n        value: function resultsPreprocessor(theApp) {\n            /*the addEventListener function near line 29 requires a proper function (an event handler) to be returned so we can create one to be returned.\n            */\n            console.log(theApp); // <-- should be instance of App\n            var thisService = this; // a reference to the instance created from this class\n            var eventHandler = function eventHandler(evt) {\n                thisService.results(evt, theApp);\n            };\n            return eventHandler;\n        }\n    }, {\n        key: \"results\",\n        value: function results(evt, theApp) {\n\n            if (evt.target.readyState == 4 && evt.target.status == 200) {\n                // assign this instance's productData to be the responseText\n                this.productData = evt.target.responseText;\n                // assign the app's productData to be the responseText too\n                theApp.productData = evt.target.responseText;\n                // tell the app to prepare the catalog\n                // there is another way to do it, with custom\n                // events. but this will work for now.\n                theApp.prepCatalog();\n                // console.log(evt.target.responseText);\n                // return evt.target.responseText;\n            }\n        }\n    }, {\n        key: \"getProducts\",\n        value: function getProducts() {\n            // this method explicity gets the products property\n            // from the JSON object. it assumes you have the JSON data\n            if (this.productData != null) {\n                var jsonData = JSON.parse(this.productData);\n                this.products = jsonData.products;\n                return this.products;\n            }\n\n            return; // if we have no data, return nothing\n        }\n    }]);\n\n    return BestBuyWebService;\n}();\n\nexports.default = BestBuyWebService;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQmVzdEJ1eVdlYlNlcnZpY2UuanM/ODQzYyJdLCJuYW1lcyI6WyJCZXN0QnV5V2ViU2VydmljZSIsInVybCIsImFwaUtleSIsInByb2R1Y3REYXRhIiwicHJvZHVjdHMiLCJ0aGVBcHAiLCJzZXJ2aWNlQ2hhbm5lbCIsIlhNTEh0dHBSZXF1ZXN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc3VsdHNQcmVwcm9jZXNzb3IiLCJvcGVuIiwic2VuZCIsImNvbnNvbGUiLCJsb2ciLCJ0aGlzU2VydmljZSIsImV2ZW50SGFuZGxlciIsImV2dCIsInJlc3VsdHMiLCJ0YXJnZXQiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0IiwicHJlcENhdGFsb2ciLCJqc29uRGF0YSIsIkpTT04iLCJwYXJzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0lBSXFCQSxpQjtBQUVqQixpQ0FBYTtBQUFBOztBQUNULGFBQUtDLEdBQUwsR0FBVSxFQUFWO0FBQ0EsYUFBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsYUFBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNIOzs7O2dDQUdPQyxNLEVBQU87QUFDWDtBQUNBO0FBQ0E7O0FBRUEsZ0JBQUlDLGlCQUFpQixJQUFJQyxjQUFKLEVBQXJCO0FBQ0EsZ0JBQUlOLE1BQU0sS0FBS0EsR0FBZjs7QUFFQTs7Ozs7Ozs7O0FBU0FLLDJCQUFlRSxnQkFBZixDQUFnQyxrQkFBaEMsRUFBbUQsS0FBS0MsbUJBQUwsQ0FBeUJKLE1BQXpCLENBQW5ELEVBQW9GLEtBQXBGO0FBQ0FDLDJCQUFlSSxJQUFmLENBQW9CLEtBQXBCLEVBQTBCVCxHQUExQixFQUE4QixJQUE5QjtBQUNBSywyQkFBZUssSUFBZjtBQUNIOzs7NENBRW1CTixNLEVBQU87QUFDdkI7O0FBRUFPLG9CQUFRQyxHQUFSLENBQVlSLE1BQVosRUFIdUIsQ0FHRjtBQUNyQixnQkFBSVMsY0FBYyxJQUFsQixDQUp1QixDQUlDO0FBQ3hCLGdCQUFJQyxlQUFlLFNBQWZBLFlBQWUsQ0FBU0MsR0FBVCxFQUFhO0FBQzVCRiw0QkFBWUcsT0FBWixDQUFvQkQsR0FBcEIsRUFBd0JYLE1BQXhCO0FBQ0gsYUFGRDtBQUdBLG1CQUFPVSxZQUFQO0FBQ0g7OztnQ0FFT0MsRyxFQUFJWCxNLEVBQU87O0FBRWYsZ0JBQUlXLElBQUlFLE1BQUosQ0FBV0MsVUFBWCxJQUF5QixDQUF6QixJQUE4QkgsSUFBSUUsTUFBSixDQUFXRSxNQUFYLElBQXFCLEdBQXZELEVBQTJEO0FBQ3ZEO0FBQ0EscUJBQUtqQixXQUFMLEdBQW1CYSxJQUFJRSxNQUFKLENBQVdHLFlBQTlCO0FBQ0E7QUFDQWhCLHVCQUFPRixXQUFQLEdBQXFCYSxJQUFJRSxNQUFKLENBQVdHLFlBQWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0FoQix1QkFBT2lCLFdBQVA7QUFDQTtBQUNBO0FBQ0g7QUFDSjs7O3NDQUVZO0FBQ1Q7QUFDQTtBQUNBLGdCQUFHLEtBQUtuQixXQUFMLElBQWtCLElBQXJCLEVBQTBCO0FBQ3ZCLG9CQUFJb0IsV0FBV0MsS0FBS0MsS0FBTCxDQUFXLEtBQUt0QixXQUFoQixDQUFmO0FBQ0EscUJBQUtDLFFBQUwsR0FBZ0JtQixTQUFTbkIsUUFBekI7QUFDQSx1QkFBTyxLQUFLQSxRQUFaO0FBQ0Y7O0FBRUQsbUJBVFMsQ0FTRDtBQUNYOzs7Ozs7a0JBckVnQkosaUIiLCJmaWxlIjoiMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBFZHdhcmRfSl9BcG9zdG9sIG9uIDIwMTctMDEtMjcuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVzdEJ1eVdlYlNlcnZpY2V7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnVybCA9XCJcIjtcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBcIlwiO1xuICAgICAgICB0aGlzLnByb2R1Y3REYXRhID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9kdWN0cyA9IG51bGw7XG4gICAgfVxuXG5cbiAgICBnZXREYXRhKHRoZUFwcCl7XG4gICAgICAgIC8vIHRoZUFwcCBpcyBhIHJlZmVyZW5jZSB0byB0aGUgbWFpbiBhcHBcbiAgICAgICAgLy8gd2UgY2FuIHBhc3MgaW5mb3JtYXRpb24gdG8gaXQsIGluY2x1ZGluZyBkYXRhXG4gICAgICAgIC8vIHRoYXQgaXMgcmV0dXJuZWQgZnJvbSB0aGlzIHNlcnZpY2VcblxuICAgICAgICBsZXQgc2VydmljZUNoYW5uZWwgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMudXJsO1xuXG4gICAgICAgIC8qXG4gICAgICAgIC8vICoqKiBUbyBzb2x2ZSB0aGUgaXNzdWUgb2YgcGFzc2luZyB0aGUgZGF0YSBiYWNrIHRvIHRoZSBtYWluIGFwcC4uLlxuICAgICAgICAvLyAqKiogYW5kIGV2ZW50dWFsbHksIHRvIGNhdGFsb2dWaWV3XG4gICAgICAgIC8vICoqKiBZb3UgY291bGQgdGhlIGFkZEV2ZW50TGlzdGVuZXIgdG8gY2FsbFxuICAgICAgICAvLyAqKiogYSBkaWZmZXJlbnQgZnVuY3Rpb24gd2hpY2ggd2lsbCBoYXZlIGJvdGhcbiAgICAgICAgLy8gKioqIHRoZSBldmVudCBvYmplY3QgYW5kIGRhdGFQbGFjZUhvbGRlciBhcyBwYXJhbWV0ZXJzXG4gICAgICAgIC8vICoqKiBzZWUgaHR0cDovL2JpdC5seS9qcy1wYXNzbW9yZWFyZ3NldmVudFxuICAgICAgICAgKi9cblxuICAgICAgICBzZXJ2aWNlQ2hhbm5lbC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLHRoaXMucmVzdWx0c1ByZXByb2Nlc3Nvcih0aGVBcHApLGZhbHNlKTtcbiAgICAgICAgc2VydmljZUNoYW5uZWwub3BlbihcIkdFVFwiLHVybCx0cnVlKTtcbiAgICAgICAgc2VydmljZUNoYW5uZWwuc2VuZCgpO1xuICAgIH1cblxuICAgIHJlc3VsdHNQcmVwcm9jZXNzb3IodGhlQXBwKXtcbiAgICAgICAgLyp0aGUgYWRkRXZlbnRMaXN0ZW5lciBmdW5jdGlvbiBuZWFyIGxpbmUgMjkgcmVxdWlyZXMgYSBwcm9wZXIgZnVuY3Rpb24gKGFuIGV2ZW50IGhhbmRsZXIpIHRvIGJlIHJldHVybmVkIHNvIHdlIGNhbiBjcmVhdGUgb25lIHRvIGJlIHJldHVybmVkLlxuICAgICAgICAqL1xuICAgICAgICBjb25zb2xlLmxvZyh0aGVBcHApOyAvLyA8LS0gc2hvdWxkIGJlIGluc3RhbmNlIG9mIEFwcFxuICAgICAgICBsZXQgdGhpc1NlcnZpY2UgPSB0aGlzOyAvLyBhIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2UgY3JlYXRlZCBmcm9tIHRoaXMgY2xhc3NcbiAgICAgICAgbGV0IGV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uKGV2dCl7XG4gICAgICAgICAgICB0aGlzU2VydmljZS5yZXN1bHRzKGV2dCx0aGVBcHApXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBldmVudEhhbmRsZXJcbiAgICB9O1xuXG4gICAgcmVzdWx0cyhldnQsdGhlQXBwKXtcblxuICAgICAgICBpZiAoZXZ0LnRhcmdldC5yZWFkeVN0YXRlID09IDQgJiYgZXZ0LnRhcmdldC5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgICAgIC8vIGFzc2lnbiB0aGlzIGluc3RhbmNlJ3MgcHJvZHVjdERhdGEgdG8gYmUgdGhlIHJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0RGF0YSA9IGV2dC50YXJnZXQucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgLy8gYXNzaWduIHRoZSBhcHAncyBwcm9kdWN0RGF0YSB0byBiZSB0aGUgcmVzcG9uc2VUZXh0IHRvb1xuICAgICAgICAgICAgdGhlQXBwLnByb2R1Y3REYXRhID0gZXZ0LnRhcmdldC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAvLyB0ZWxsIHRoZSBhcHAgdG8gcHJlcGFyZSB0aGUgY2F0YWxvZ1xuICAgICAgICAgICAgLy8gdGhlcmUgaXMgYW5vdGhlciB3YXkgdG8gZG8gaXQsIHdpdGggY3VzdG9tXG4gICAgICAgICAgICAvLyBldmVudHMuIGJ1dCB0aGlzIHdpbGwgd29yayBmb3Igbm93LlxuICAgICAgICAgICAgdGhlQXBwLnByZXBDYXRhbG9nKCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhldnQudGFyZ2V0LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAvLyByZXR1cm4gZXZ0LnRhcmdldC5yZXNwb25zZVRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQcm9kdWN0cygpe1xuICAgICAgICAvLyB0aGlzIG1ldGhvZCBleHBsaWNpdHkgZ2V0cyB0aGUgcHJvZHVjdHMgcHJvcGVydHlcbiAgICAgICAgLy8gZnJvbSB0aGUgSlNPTiBvYmplY3QuIGl0IGFzc3VtZXMgeW91IGhhdmUgdGhlIEpTT04gZGF0YVxuICAgICAgICBpZih0aGlzLnByb2R1Y3REYXRhIT1udWxsKXtcbiAgICAgICAgICAgbGV0IGpzb25EYXRhID0gSlNPTi5wYXJzZSh0aGlzLnByb2R1Y3REYXRhKTtcbiAgICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IGpzb25EYXRhLnByb2R1Y3RzO1xuICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0cztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjsgLy8gaWYgd2UgaGF2ZSBubyBkYXRhLCByZXR1cm4gbm90aGluZ1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9CZXN0QnV5V2ViU2VydmljZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar CatalogView = function () {\n    function CatalogView() {\n        _classCallCheck(this, CatalogView);\n\n        this.carousel = document.getElementById(\"productroll\");\n        this.theApp = null;\n    }\n\n    _createClass(CatalogView, [{\n        key: \"initCarousel\",\n        value: function initCarousel() {\n            console.log(\"initializing carousel\");\n            $(document).ready(function () {\n                $('.owl-carousel').owlCarousel({\n                    items: 1,\n                    loop: true,\n                    responsive: {\n                        0: {\n                            items: 1\n                        }, //from zero to 600 screen\n                        601: {\n                            items: 2\n                        }, //from 600 to 1050 screen\n                        1050: {\n                            items: 4\n                        } //from 1050 to 1240 screen\n                    }\n\n                });\n            });\n        }\n    }, {\n        key: \"onClickCartButton\",\n        value: function onClickCartButton(theApp) {\n            return function (e) {\n                console.log(e.target.getAttribute(\"data-sku\"));\n                var theSku = e.target.getAttribute(\"data-sku\");\n                alert(\"Yay! A snazzy gadget was added to your cart.\");\n                theApp.shoppingCart.addItemToCart(theSku);\n            };\n        }\n    }, {\n        key: \"addProductsToCarousel\",\n        value: function addProductsToCarousel(products, theApp) {\n\n            this.theApp = theApp;\n\n            if (products === undefined || products == null) {\n                return; // do not do anything! there is no data\n            }\n\n            for (var p = 0; p < products.length; p++) {\n                var product = products[p];\n                console.log(product);\n                // each product is a product object\n                // use it to create the element\n\n                // create the DIV tag with class 'product-wrapper'\n                var newDiv = document.createElement(\"div\");\n                newDiv.setAttribute(\"class\", \"product-wrapper\");\n\n                // create a new IMG tag. Suggest to add data-sku attribute here too\n                // so that if you 'click' on the image, it would pop up a quick-view\n                // window and you can use the sku.\n                var newImg = document.createElement(\"div\");\n                newImg.setAttribute(\"style\", \"background-image: url('\" + product.image + \"');height:200px; background-size:contain;background-repeat:no-repeat;background-position:center;\");\n                newImg.setAttribute(\"alt\", \"\" + product.name); // this works too\n                newImg.setAttribute(\"data-sku\", product.sku);\n                // create a set attribute \"style\" `\n\n                var hr = document.createElement(\"hr\");\n\n                // create a new Paragraph to show a manufacturer\n                var newPara = document.createElement(\"p\");\n                newPara.setAttribute(\"class\", \"productmake\");\n                var newParaTextNode = document.createTextNode(product.manufacturer);\n                newPara.appendChild(newParaTextNode);\n\n                // create a new H3 tag to show the name\n                var newH3Tag = document.createElement(\"h3\");\n                var newH3TagTextNode = document.createTextNode(product.name);\n                newH3Tag.appendChild(newH3TagTextNode);\n\n                var newPricePara = document.createElement(\"p\");\n                newPricePara.setAttribute(\"class\", \"price\");\n                var newPriceParaTextNode = document.createTextNode(\"$\" + product.regularPrice);\n                newPricePara.appendChild(newPriceParaTextNode);\n\n                var quickViewButton = document.createElement(\"button\");\n                quickViewButton.setAttribute(\"id\", \"qv_\" + product.sku);\n                quickViewButton.setAttribute(\"data-sku\", product.sku);\n                quickViewButton.setAttribute(\"class\", \"quickViewButton\");\n                var quickViewTextNode = document.createTextNode(\"Quick View\");\n                quickViewButton.appendChild(quickViewTextNode);\n\n                var addToCartButton = document.createElement(\"button\");\n                addToCartButton.setAttribute(\"id\", \"cart_\" + product.sku);\n                addToCartButton.setAttribute(\"data-sku\", product.sku);\n                addToCartButton.setAttribute(\"class\", \"addToCartButton\");\n                var addToCartTextNode = document.createTextNode(\"Add to Cart\");\n                addToCartButton.appendChild(addToCartTextNode);\n                addToCartButton.addEventListener(\"click\", this.onClickCartButton(this.theApp), false);\n\n                newDiv.appendChild(newImg);\n                newDiv.appendChild(hr);\n                newDiv.appendChild(newPara);\n                newDiv.appendChild(newH3Tag);\n                newDiv.appendChild(newPricePara);\n                newDiv.appendChild(quickViewButton);\n                newDiv.appendChild(addToCartButton);\n                this.carousel.appendChild(newDiv);\n            }\n            this.initCarousel();\n        }\n    }]);\n\n    return CatalogView;\n}();\n\nexports.default = CatalogView;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQ2F0YWxvZ1ZpZXcuanM/MDY1YSJdLCJuYW1lcyI6WyJDYXRhbG9nVmlldyIsImNhcm91c2VsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRoZUFwcCIsImNvbnNvbGUiLCJsb2ciLCIkIiwicmVhZHkiLCJvd2xDYXJvdXNlbCIsIml0ZW1zIiwibG9vcCIsInJlc3BvbnNpdmUiLCJlIiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwidGhlU2t1IiwiYWxlcnQiLCJzaG9wcGluZ0NhcnQiLCJhZGRJdGVtVG9DYXJ0IiwicHJvZHVjdHMiLCJ1bmRlZmluZWQiLCJwIiwibGVuZ3RoIiwicHJvZHVjdCIsIm5ld0RpdiIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJuZXdJbWciLCJpbWFnZSIsIm5hbWUiLCJza3UiLCJociIsIm5ld1BhcmEiLCJuZXdQYXJhVGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsIm1hbnVmYWN0dXJlciIsImFwcGVuZENoaWxkIiwibmV3SDNUYWciLCJuZXdIM1RhZ1RleHROb2RlIiwibmV3UHJpY2VQYXJhIiwibmV3UHJpY2VQYXJhVGV4dE5vZGUiLCJyZWd1bGFyUHJpY2UiLCJxdWlja1ZpZXdCdXR0b24iLCJxdWlja1ZpZXdUZXh0Tm9kZSIsImFkZFRvQ2FydEJ1dHRvbiIsImFkZFRvQ2FydFRleHROb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uQ2xpY2tDYXJ0QnV0dG9uIiwiaW5pdENhcm91c2VsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQ3FCQSxXO0FBRWpCLDJCQUFhO0FBQUE7O0FBQ1QsYUFBS0MsUUFBTCxHQUFnQkMsU0FBU0MsY0FBVCxDQUF3QixhQUF4QixDQUFoQjtBQUNBLGFBQUtDLE1BQUwsR0FBYyxJQUFkO0FBRUg7Ozs7dUNBRWE7QUFDVkMsb0JBQVFDLEdBQVIsQ0FBWSx1QkFBWjtBQUNEQyxjQUFFTCxRQUFGLEVBQVlNLEtBQVosQ0FBa0IsWUFBVTtB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IGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuY2Fyb3VzZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2R1Y3Ryb2xsXCIpO1xuICAgICAgICB0aGlzLnRoZUFwcCA9IG51bGw7XG5cbiAgICB9XG5cbiAgICBpbml0Q2Fyb3VzZWwoKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJpbml0aWFsaXppbmcgY2Fyb3VzZWxcIik7XG4gICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgJCgnLm93bC1jYXJvdXNlbCcpLm93bENhcm91c2VsKHtcbiAgICAgICAgICAgICAgIGl0ZW1zOjEsXG4gICAgICAgICAgICAgICBsb29wOnRydWUsXG4gICAgICAgICAgICAgICByZXNwb25zaXZlIDoge1xuICAgICAgICAgICAgICAgICAgIDA6e1xuICAgICAgICAgICAgICAgICAgICAgICBpdGVtczoxXG4gICAgICAgICAgICAgICAgICAgfSwgLy9mcm9tIHplcm8gdG8gNjAwIHNjcmVlblxuICAgICAgICAgICAgICAgICAgIDYwMTp7XG4gICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOjJcbiAgICAgICAgICAgICAgICAgICB9LCAvL2Zyb20gNjAwIHRvIDEwNTAgc2NyZWVuXG4gICAgICAgICAgICAgICAgICAgMTA1MDp7XG4gICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOjRcbiAgICAgICAgICAgICAgICAgICB9IC8vZnJvbSAxMDUwIHRvIDEyNDAgc2NyZWVuXG4gICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgfSk7XG4gICAgICAgfSk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIG9uQ2xpY2tDYXJ0QnV0dG9uKHRoZUFwcCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGUpe1xuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNrdVwiKSk7XG4gICAgICAgIGxldCB0aGVTa3UgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNrdVwiKTtcbiAgICAgICAgYWxlcnQoXCJZYXkhIEEgc25henp5IGdhZGdldCB3YXMgYWRkZWQgdG8geW91ciBjYXJ0LlwiKVxuICAgICAgICB0aGVBcHAuc2hvcHBpbmdDYXJ0LmFkZEl0ZW1Ub0NhcnQodGhlU2t1KTtcbiAgICB9XG59XG4gICAgYWRkUHJvZHVjdHNUb0Nhcm91c2VsKHByb2R1Y3RzLHRoZUFwcCl7XG5cbiAgICAgICAgdGhpcy50aGVBcHAgPSB0aGVBcHA7XG5cbiAgICAgICAgaWYgKHByb2R1Y3RzID09PSB1bmRlZmluZWQgfHwgcHJvZHVjdHMgPT0gbnVsbCl7XG4gICAgICAgICAgICByZXR1cm4gOyAvLyBkbyBub3QgZG8gYW55dGhpbmchIHRoZXJlIGlzIG5vIGRhdGFcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHA9MDsgcDxwcm9kdWN0cy5sZW5ndGg7IHArKyl7XG4gICAgICAgICAgICBsZXQgcHJvZHVjdCA9IHByb2R1Y3RzW3BdO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvZHVjdCk7XG4gICAgICAgICAgICAvLyBlYWNoIHByb2R1Y3QgaXMgYSBwcm9kdWN0IG9iamVjdFxuICAgICAgICAgICAgLy8gdXNlIGl0IHRvIGNyZWF0ZSB0aGUgZWxlbWVudFxuXG4gICAgICAgICAgICAvLyBjcmVhdGUgdGhlIERJViB0YWcgd2l0aCBjbGFzcyAncHJvZHVjdC13cmFwcGVyJ1xuICAgICAgICAgICAgbGV0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBuZXdEaXYuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcInByb2R1Y3Qtd3JhcHBlclwiKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IElNRyB0YWcuIFN1Z2dlc3QgdG8gYWRkIGRhdGEtc2t1IGF0dHJpYnV0ZSBoZXJlIHRvb1xuICAgICAgICAgICAgLy8gc28gdGhhdCBpZiB5b3UgJ2NsaWNrJyBvbiB0aGUgaW1hZ2UsIGl0IHdvdWxkIHBvcCB1cCBhIHF1aWNrLXZpZXdcbiAgICAgICAgICAgIC8vIHdpbmRvdyBhbmQgeW91IGNhbiB1c2UgdGhlIHNrdS5cbiAgICAgICAgICAgIGxldCBuZXdJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICBuZXdJbWcuc2V0QXR0cmlidXRlKFwic3R5bGVcIixgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcke3Byb2R1Y3QuaW1hZ2V9Jyk7aGVpZ2h0OjIwMHB4OyBiYWNrZ3JvdW5kLXNpemU6Y29udGFpbjtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YCk7XG4gICAgICAgICAgIG5ld0ltZy5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgYCR7cHJvZHVjdC5uYW1lfWApOyAvLyB0aGlzIHdvcmtzIHRvb1xuICAgICAgICAgICAgbmV3SW1nLnNldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIscHJvZHVjdC5za3UpO1xuICAgICAgICAgICAgLy8gY3JlYXRlIGEgc2V0IGF0dHJpYnV0ZSBcInN0eWxlXCIgYFxuXG4gICAgICAgICAgICBsZXQgaHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIik7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBQYXJhZ3JhcGggdG8gc2hvdyBhIG1hbnVmYWN0dXJlclxuICAgICAgICAgICAgbGV0IG5ld1BhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIG5ld1BhcmEuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcInByb2R1Y3RtYWtlXCIpO1xuICAgICAgICAgICAgbGV0IG5ld1BhcmFUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHByb2R1Y3QubWFudWZhY3R1cmVyKTtcbiAgICAgICAgICAgIG5ld1BhcmEuYXBwZW5kQ2hpbGQobmV3UGFyYVRleHROb2RlKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IEgzIHRhZyB0byBzaG93IHRoZSBuYW1lXG4gICAgICAgICAgICBsZXQgbmV3SDNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgICAgICBsZXQgbmV3SDNUYWdUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHByb2R1Y3QubmFtZSk7XG4gICAgICAgICAgICBuZXdIM1RhZy5hcHBlbmRDaGlsZChuZXdIM1RhZ1RleHROb2RlKTtcblxuICAgICAgICAgICAgbGV0IG5ld1ByaWNlUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgbmV3UHJpY2VQYXJhLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJwcmljZVwiKTtcbiAgICAgICAgICAgIGxldCBuZXdQcmljZVBhcmFUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiJFwiK3Byb2R1Y3QucmVndWxhclByaWNlKTtcbiAgICAgICAgICAgIG5ld1ByaWNlUGFyYS5hcHBlbmRDaGlsZChuZXdQcmljZVBhcmFUZXh0Tm9kZSk7XG5cbiAgICAgICAgICAgIGxldCBxdWlja1ZpZXdCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgcXVpY2tWaWV3QnV0dG9uLnNldEF0dHJpYnV0ZShcImlkXCIsYHF2XyR7cHJvZHVjdC5za3V9YCk7XG4gICAgICAgICAgICBxdWlja1ZpZXdCdXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIixwcm9kdWN0LnNrdSk7XG4gICAgICAgICAgICBxdWlja1ZpZXdCdXR0b24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcInF1aWNrVmlld0J1dHRvblwiKVxuICAgICAgICAgICAgbGV0IHF1aWNrVmlld1RleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJRdWljayBWaWV3XCIpO1xuICAgICAgICAgICAgcXVpY2tWaWV3QnV0dG9uLmFwcGVuZENoaWxkKHF1aWNrVmlld1RleHROb2RlKTtcblxuICAgICAgICAgICAgbGV0IGFkZFRvQ2FydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICBhZGRUb0NhcnRCdXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIixgY2FydF8ke3Byb2R1Y3Quc2t1fWApO1xuICAgICAgICAgICAgYWRkVG9DYXJ0QnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIscHJvZHVjdC5za3UpO1xuICAgICAgICAgICAgYWRkVG9DYXJ0QnV0dG9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJhZGRUb0NhcnRCdXR0b25cIilcbiAgICAgICAgICAgIGxldCBhZGRUb0NhcnRUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiQWRkIHRvIENhcnRcIik7XG4gICAgICAgICAgICBhZGRUb0NhcnRCdXR0b24uYXBwZW5kQ2hpbGQoYWRkVG9DYXJ0VGV4dE5vZGUpO1xuICAgICAgICAgICAgYWRkVG9DYXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMub25DbGlja0NhcnRCdXR0b24odGhpcy50aGVBcHApLGZhbHNlKTtcblxuXG5cbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChuZXdJbWcpO1xuICAgICAgICAgICAgbmV3RGl2LmFwcGVuZENoaWxkKGhyKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChuZXdQYXJhKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChuZXdIM1RhZyk7XG4gICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobmV3UHJpY2VQYXJhKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChxdWlja1ZpZXdCdXR0b24pO1xuICAgICAgICAgICAgbmV3RGl2LmFwcGVuZENoaWxkKGFkZFRvQ2FydEJ1dHRvbik7XG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLmFwcGVuZENoaWxkKG5ld0Rpdik7XG4gICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW5pdENhcm91c2VsKCk7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQ2F0YWxvZ1ZpZXcuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Created by Edward_J_Apostol on 2017-01-29.\n */\n\nvar ShoppingCart = function () {\n  function ShoppingCart() {\n    _classCallCheck(this, ShoppingCart);\n\n    console.log(\"creating shopping cart\");\n    if (Storage) {\n      // you can create a shoppingCart!\n      //this.initShoppingCart();\n    } else {\n      console.log(\"Error! SessionStorage not supported in your browser!\");\n    }\n  }\n\n  /*initShoppingCart(sku){\n          if (sessionStorage.getItem(sku) !== \"undefined\") {\n          if (sessionStorage.quantity) {\n          sessionStorage.quantity = Number(sessionStorage.quantity)+1;\n           } else { sessionStorage.quantity = 0;\n      }\n  }*/\n\n  //    console.log(\"finished creating shopping cart\");\n  //}\n\n  _createClass(ShoppingCart, [{\n    key: \"addItemToCart\",\n    value: function addItemToCart(sku) {\n      console.log(\"hello\");\n      console.log(sku);\n\n      //let theSku = sku;\n      sku = sku.toString();\n      console.log(sessionStorage.getItem(sku));\n      if (parseInt(sessionStorage.getItem(sku)) > 0) {\n        sessionStorage.setItem(sku, parseInt(sessionStorage.getItem(sku)) + 1);\n      } else {\n        sessionStorage.setItem(sku, 1);\n      }\n    }\n  }, {\n    key: \"updateQuantityofItemInCart\",\n    value: function updateQuantityofItemInCart(sku, qty) {\n      //Let sessions\n\n    }\n  }, {\n    key: \"removeItemFromCart\",\n    value: function removeItemFromCart(sku) {}\n    // replace value of session sku quantity with null//\n\n    // clearCart(){\n    //   $(document).on('click', '#clearcart',function(evt){\n    //    console.log(\"I don't want this shit!\");\n    //         storage.clear();         \n    //   });\n\n  }]);\n\n  return ShoppingCart;\n}();\n\n//}\n\n\nexports.default = ShoppingCart;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU2hvcHBpbmdDYXJ0LmpzPzc5MWEiXSwibmFtZXMiOlsiU2hvcHBpbmdDYXJ0IiwiY29uc29sZSIsImxvZyIsIlN0b3JhZ2UiLCJza3UiLCJ0b1N0cmluZyIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsInBhcnNlSW50Iiwic2V0SXRlbSIsInF0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0lBSXFCQSxZO0FBRWpCLDBCQUFhO0FBQUE7O0FBQ1RDLFlBQVFDLEdBQVIsQ0FBWSx3QkFBWjtBQUNBLFFBQUdDLE9BQUgsRUFBVztBQUNQO0FBQ0E7QUFDSCxLQUhELE1BSUE7QUFDSUYsY0FBUUMsR0FBUixDQUFZLHNEQUFaO0FBQ0g7QUFDSjs7QUFFRjs7Ozs7Ozs7QUFRQztBQUNBOzs7O2tDQUVjRSxHLEVBQUk7QUFDaEJILGNBQVFDLEdBQVIsQ0FBWSxPQUFaO0FBQ0FELGNBQVFDLEdBQVIsQ0FBWUUsR0FBWjs7QUFFQztBQUNBQSxZQUFNQSxJQUFJQyxRQUFKLEVBQU47QUFDQUosY0FBUUMsR0FBUixDQUFZSSxlQUFlQyxPQUFmLENBQXVCSCxHQUF2QixDQUFaO0FBQ0EsVUFBSUksU0FBU0YsZUFBZUMsT0FBZixDQUF1QkgsR0FBdkIsQ0FBVCxJQUF1QyxDQUEzQyxFQUE4QztBQUM3Q0UsdUJBQWVHLE9BQWYsQ0FBdUJMLEdBQXZCLEVBQTRCSSxTQUFTRixlQUFlQyxPQUFmLENBQXVCSCxHQUF2QixDQUFULElBQXdDLENBQXBFO0FBRUEsT0FIRCxNQUdPO0FBQ0pFLHVCQUFlRyxPQUFmLENBQXVCTCxHQUF2QixFQUE0QixDQUE1QjtBQUVEO0FBQ0o7OzsrQ0FFMEJBLEcsRUFBSU0sRyxFQUFJO0FBQ2pDOztBQUVEOzs7dUNBRWtCTixHLEVBQUksQ0FHdEI7QUFGRjs7QUFJQTtBQUNFO0FBQ0M7QUFDTDtBQUNFOzs7Ozs7O0FBS0g7OztrQkEzRHFCSixZIiwiZmlsZSI6IjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgRWR3YXJkX0pfQXBvc3RvbCBvbiAyMDE3LTAxLTI5LlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BwaW5nQ2FydHtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRpbmcgc2hvcHBpbmcgY2FydFwiKTtcbiAgICAgICAgaWYoU3RvcmFnZSl7XG4gICAgICAgICAgICAvLyB5b3UgY2FuIGNyZWF0ZSBhIHNob3BwaW5nQ2FydCFcbiAgICAgICAgICAgIC8vdGhpcy5pbml0U2hvcHBpbmdDYXJ0KCk7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yISBTZXNzaW9uU3RvcmFnZSBub3Qgc3VwcG9ydGVkIGluIHlvdXIgYnJvd3NlciFcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgIC8qaW5pdFNob3BwaW5nQ2FydChza3Upe1xuICAgICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShza3UpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5xdWFudGl0eSkge1xuICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5xdWFudGl0eSA9IE51bWJlcihzZXNzaW9uU3RvcmFnZS5xdWFudGl0eSkrMTtcbiAgICAgICAgICAgIH0gZWxzZSB7IHNlc3Npb25TdG9yYWdlLnF1YW50aXR5ID0gMDtcbiAgICAgICB9XG4gICB9Ki9cblxuICAgIC8vICAgIGNvbnNvbGUubG9nKFwiZmluaXNoZWQgY3JlYXRpbmcgc2hvcHBpbmcgY2FydFwiKTtcbiAgICAvL31cblxuICAgIGFkZEl0ZW1Ub0NhcnQoc2t1KXtcbiAgICAgIGNvbnNvbGUubG9nKFwiaGVsbG9cIik7XG4gICAgICBjb25zb2xlLmxvZyhza3UpO1xuXG4gICAgICAgLy9sZXQgdGhlU2t1ID0gc2t1O1xuICAgICAgIHNrdSA9IHNrdS50b1N0cmluZygpO1xuICAgICAgIGNvbnNvbGUubG9nKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc2t1KSk7XG4gICAgICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc2t1KSkgPjApIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShza3UsIHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc2t1KSkgKyAxKTtcblxuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShza3UsIDEpO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgIH0gICAgICAgICAgICAgICBcbiAgICB9XG5cbiAgICB1cGRhdGVRdWFudGl0eW9mSXRlbUluQ2FydChza3UscXR5KXtcbiAgICAgIC8vTGV0IHNlc3Npb25zXG5cbiAgICB9XG5cbiAgICByZW1vdmVJdGVtRnJvbUNhcnQoc2t1KXtcbiAgIC8vIHJlcGxhY2UgdmFsdWUgb2Ygc2Vzc2lvbiBza3UgcXVhbnRpdHkgd2l0aCBudWxsLy9cblxuICAgIH1cblxuICAgLy8gY2xlYXJDYXJ0KCl7XG4gICAgIC8vICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNjbGVhcmNhcnQnLGZ1bmN0aW9uKGV2dCl7XG4gICAgICAvLyAgICBjb25zb2xlLmxvZyhcIkkgZG9uJ3Qgd2FudCB0aGlzIHNoaXQhXCIpO1xuIC8vICAgICAgICAgc3RvcmFnZS5jbGVhcigpOyAgICAgICAgIFxuICAgLy8gICB9KTtcbiAgXG4gICAgfVxuXG5cbi8vfVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1Nob3BwaW5nQ2FydC5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ShoppingCartView = function () {\n  function ShoppingCartView() {\n    _classCallCheck(this, ShoppingCartView);\n\n    console.log(\"making a shopping cart\");\n    this.cart = document.getElementById(\"viewcart\");\n    //this.products = theApp.bestBuyWebService.getProducts\n    this.initShoppingCartView();\n  }\n\n  _createClass(ShoppingCartView, [{\n    key: \"initShoppingCartView\",\n    value: function initShoppingCartView() {\n      $(document).on('click', '#cart', function (evt) {\n        console.log(\"I clicked the cart!\");\n        this.showCartPopUp();\n        $(\"#viewcart\").toggle();\n        $(\".overlay\").toggle();\n      });\n      $(document).on('click', '#close, .overlay', function (evt) {\n        console.log(\"I clicked the damn cart!\");\n        $(\"#viewcart\").toggle();\n        $(\".overlay\").toggle();\n      });\n    }\n  }, {\n    key: \"showCartPopUp\",\n    value: function showCartPopUp() {\n      var ViewCart = $('#viewcart');\n      var output = \"\";\n      if (sessionStorage.length == 0) {\n        return;\n      }\n      for (var i = 0; i < sessionStorage.length; i++) {\n        var currentSku = sessionStorage.key(i);\n        var currentQty = sessionStorage.getItem(currentSku);\n        for (var p = 0; p < this.Products.length; p++) {\n          var currentProduct = products[p];\n          var productSku = currentProduct.sku;\n          productSku = productSku.toString();\n          if (productSku == currentSku) {\n            console.log(\"final layer matched items : \" + productSku + \" : \" + currentSku);\n            var img = currentProduct.image;\n            var make = currentProduct.manufacturer;\n            var name = currentProduct.name;\n            var price = currentProduct.price;\n            output += \"\\n        <div id=\\\"close\\\" class=\\\"close\\\">close (x)</div>\\n          <h3>your cart</h3>\\n        <div>\\n        <div id=\\\"cart-product-img\\\" src=\\\"\" + img + \"\\\" alt=\\\"\" + name + \"\\\"></div>\\n        <div id=\\\"cart-make-name flex\\\">\\n          <p id=\\\"cart-make\\\">\" + make + \"</p>\\n          <p id=\\\"cart-name\\\">\" + name + \"</p>\\n        </div>\\n        <div id=\\\"cart-price\\\">\" + price + \"</div>\\n        <div id=\\\"cart-quantity\\\">\\n          <p>quantity</p>\\n          <input id=\\\"increment\\\" type=\\\"button\\\" name=\\\"increment\\\" value=\\\"+\\\">\\n          <input id=\\\"quantity-field\\\" type=\\\"text\\\" name=\\\"quantity\\\" value=1>\\n          <input id=\\\"decrement\\\" type=\\\"button\\\" name=\\\"decrement\\\" value=\\\"-\\\">\\n        </div>\\n        <div id=\\\"cart-update-remove-buttons\\\">\\n          <input id=\\\"update\\\" type=\\\"button\\\" name=\\\"update\\\" value=\\\"Update\\\">\\n          <input id=\\\"remove\\\" type=\\\"button\\\" name=\\\"remove\\\" Value=\\\"Remove\\\">\\n        </div>\\n        <hr>\\n        <input id=\\\"clearcart\\\" type=\\\"button\\\" name=\\\"clearcart\\\" value=\\\"clear cart\\\">\\n        <input id=\\\"checkout\\\" type=\\\"button\\\" name=\\\"checkout\\\" value=\\\"checkout\\\">\\n      </div>\\n      \";\n          }\n          $('#viewcart').html(output);\n          //ViewCart.append(output); \n        }\n      }\n    }\n  }]);\n\n  return ShoppingCartView;\n}();\n\nexports.default = ShoppingCartView;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvU2hvcHBpbmdDYXJ0Vmlldy5qcz81YjBhIl0sIm5hbWVzIjpbIlNob3BwaW5nQ2FydFZpZXciLCJjb25zb2xlIiwibG9nIiwiY2FydCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbml0U2hvcHBpbmdDYXJ0VmlldyIsIiQiLCJvbiIsImV2dCIsInNob3dDYXJ0UG9wVXAiLCJ0b2dnbGUiLCJWaWV3Q2FydCIsIm91dHB1dCIsInNlc3Npb25TdG9yYWdlIiwibGVuZ3RoIiwiaSIsImN1cnJlbnRTa3UiLCJrZXkiLCJjdXJyZW50UXR5IiwiZ2V0SXRlbSIsInAiLCJQcm9kdWN0cyIsImN1cnJlbnRQcm9kdWN0IiwicHJvZHVjdHMiLCJwcm9kdWN0U2t1Iiwic2t1IiwidG9TdHJpbmciLCJpbWciLCJpbWFnZSIsIm1ha2UiLCJtYW51ZmFjdHVyZXIiLCJuYW1lIiwicHJpY2UiLCJodG1sIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCQSxnQjtBQUVqQiw4QkFBYTtBQUFBOztBQUNUQyxZQUFRQyxHQUFSLENBQVksd0JBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVlDLFNBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBWjtBQUNBO0FBQ0EsU0FBS0Msb0JBQUw7QUFFSDs7OzsyQ0FHc0I7QUFDcEJDLFFBQUVILFFBQUYsRUFBWUksRUFBWixDQUFlLE9BQWYsRUFBd0IsT0FBeEIsRUFBZ0MsVUFBU0MsR0FBVCxFQUFhO0FBQzNDUixnQkFBUUMsR0FBUixDQUFZLHFCQUFaO0FBQ0MsYUFBS1EsYUFBTDtBQUNESCxVQUFFLFdBQUYsRUFBZUksTUFBZjtBQUNBSixVQUFFLFVBQUYsRUFBY0ksTUFBZDtBQUNILE9BTEM7QUFNQUosUUFBRUgsUUFBRixFQUFZSSxFQUFaLENBQWUsT0FBZixFQUF3QixrQkFBeEIsRUFBMkMsVUFBU0MsR0FBVCxFQUFhO0FBQ3REUixnQkFBUUMsR0FBUixDQUFZLDBCQUFaO0FBQ0FLLFVBQUUsV0FBRixFQUFlSSxNQUFmO0FBQ0FKLFVBQUUsVUFBRixFQUFjSSxNQUFkO0FBQ0gsT0FKQztBQUtIOzs7b0NBRWU7QUFDZixVQUFJQyxXQUFXTCxFQUFFLFdBQUYsQ0FBZjtBQUNBLFVBQUlNLFNBQVMsRUFBYjtBQUNBLFVBQUlDLGVBQWVDLE1BQWYsSUFBeUIsQ0FBN0IsRUFBZ0M7QUFDOUI7QUFDRDtBQUNELFdBQUssSUFBSUMsSUFBRSxDQUFYLEVBQWNBLElBQUlGLGVBQWVDLE1BQWpDLEVBQXlDQyxHQUF6QyxFQUE2QztBQUMzQyxZQUFJQyxhQUFhSCxlQUFlSSxHQUFmLENBQW1CRixDQUFuQixDQUFqQjtBQUNBLFlBQUlHLGFBQWFMLGVBQWVNLE9BQWYsQ0FBdUJILFVBQXZCLENBQWpCO0FBQ0YsYUFBSyxJQUFJSSxJQUFFLENBQVgsRUFBY0EsSUFBRyxLQUFLQyxRQUFMLENBQWNQLE1BQS9CLEVBQXVDTSxHQUF2QyxFQUEyQztBQUN6QyxjQUFJRSxpQkFBaUJDLFNBQVNILENBQVQsQ0FBckI7QUFDQSxjQUFJSSxhQUFhRixlQUFlRyxHQUFoQztBQUNBRCx1QkFBYUEsV0FBV0UsUUFBWCxFQUFiO0FBQ0EsY0FBR0YsY0FBY1IsVUFBakIsRUFBNEI7QUFDMUJoQixvQkFBUUMsR0FBUixDQUFZLGlDQUErQnVCLFVBQS9CLEdBQTBDLEtBQTFDLEdBQWdEUixVQUE1RDtBQUNBLGdCQUFJVyxNQUFNTCxlQUFlTSxLQUF6QjtBQUNBLGdCQUFJQyxPQUFPUCxlQUFlUSxZQUExQjtBQUNBLGdCQUFJQyxPQUFPVCxlQUFlUyxJQUExQjtBQUNBLGdCQUFJQyxRQUFRVixlQUFlVSxLQUEzQjtBQUNBcEIsZ0xBSWtDZSxHQUpsQyxpQkFJK0NJLElBSi9DLDJGQU1zQkYsSUFOdEIsNENBT3NCRSxJQVB0Qiw2REFTdUJDLEtBVHZCO0FBeUJEO0FBQ0QxQixZQUFFLFdBQUYsRUFBZTJCLElBQWYsQ0FBb0JyQixNQUFwQjtBQUNBO0FBQ0Q7QUFFQTtBQUVEOzs7Ozs7a0JBNUVpQmIsZ0IiLCJmaWxlIjoiNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BwaW5nQ2FydFZpZXd7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIm1ha2luZyBhIHNob3BwaW5nIGNhcnRcIik7XG4gICAgICAgIHRoaXMuY2FydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlld2NhcnRcIik7XG4gICAgICAgIC8vdGhpcy5wcm9kdWN0cyA9IHRoZUFwcC5iZXN0QnV5V2ViU2VydmljZS5nZXRQcm9kdWN0c1xuICAgICAgICB0aGlzLmluaXRTaG9wcGluZ0NhcnRWaWV3KCk7XG5cbiAgICB9XG5cblxuICAgIGluaXRTaG9wcGluZ0NhcnRWaWV3KCkge1xuICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjY2FydCcsZnVuY3Rpb24oZXZ0KXtcbiAgICAgICBcdFx0Y29uc29sZS5sb2coXCJJIGNsaWNrZWQgdGhlIGNhcnQhXCIpO1xuICAgICAgICAgIHRoaXMuc2hvd0NhcnRQb3BVcCgpO1xuICAgICAgICBcdCQoXCIjdmlld2NhcnRcIikudG9nZ2xlKCk7IFxuICAgICAgICBcdCQoXCIub3ZlcmxheVwiKS50b2dnbGUoKTsgICAgICAgICBcbiAgICBcdH0pO1xuICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjY2xvc2UsIC5vdmVybGF5JyxmdW5jdGlvbihldnQpe1xuICAgICAgIFx0XHRjb25zb2xlLmxvZyhcIkkgY2xpY2tlZCB0aGUgZGFtbiBjYXJ0IVwiKTtcbiAgICAgICAgXHQkKFwiI3ZpZXdjYXJ0XCIpLnRvZ2dsZSgpOyBcbiAgICAgICAgXHQkKFwiLm92ZXJsYXlcIikudG9nZ2xlKCk7ICAgICAgICAgXG4gICAgXHR9KTtcbiAgIH1cblxuICAgc2hvd0NhcnRQb3BVcCAoKXtcbiAgICBsZXQgVmlld0NhcnQgPSAkKCcjdmlld2NhcnQnKTtcbiAgICBsZXQgb3V0cHV0ID0gXCJcIjtcbiAgICBpZiAoc2Vzc2lvblN0b3JhZ2UubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChsZXQgaT0wOyBpIDwgc2Vzc2lvblN0b3JhZ2UubGVuZ3RoOyBpKyspe1xuICAgICAgbGV0IGN1cnJlbnRTa3UgPSBzZXNzaW9uU3RvcmFnZS5rZXkoaSk7XG4gICAgICBsZXQgY3VycmVudFF0eSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oY3VycmVudFNrdSk7XG4gICAgZm9yIChsZXQgcD0wOyBwPCB0aGlzLlByb2R1Y3RzLmxlbmd0aDsgcCsrKXtcbiAgICAgIGxldCBjdXJyZW50UHJvZHVjdCA9IHByb2R1Y3RzW3BdO1xuICAgICAgbGV0IHByb2R1Y3RTa3UgPSBjdXJyZW50UHJvZHVjdC5za3U7XG4gICAgICBwcm9kdWN0U2t1ID0gcHJvZHVjdFNrdS50b1N0cmluZygpO1xuICAgICAgaWYocHJvZHVjdFNrdSA9PSBjdXJyZW50U2t1KXtcbiAgICAgICAgY29uc29sZS5sb2coXCJmaW5hbCBsYXllciBtYXRjaGVkIGl0ZW1zIDogXCIrcHJvZHVjdFNrdStcIiA6IFwiK2N1cnJlbnRTa3UpO1xuICAgICAgICBsZXQgaW1nID0gY3VycmVudFByb2R1Y3QuaW1hZ2U7XG4gICAgICAgIGxldCBtYWtlID0gY3VycmVudFByb2R1Y3QubWFudWZhY3R1cmVyO1xuICAgICAgICBsZXQgbmFtZSA9IGN1cnJlbnRQcm9kdWN0Lm5hbWU7XG4gICAgICAgIGxldCBwcmljZSA9IGN1cnJlbnRQcm9kdWN0LnByaWNlO1xuICAgICAgICBvdXRwdXQrPWBcbiAgICAgICAgPGRpdiBpZD1cImNsb3NlXCIgY2xhc3M9XCJjbG9zZVwiPmNsb3NlICh4KTwvZGl2PlxuICAgICAgICAgIDxoMz55b3VyIGNhcnQ8L2gzPlxuICAgICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGlkPVwiY2FydC1wcm9kdWN0LWltZ1wiIHNyYz1cIiR7aW1nfVwiIGFsdD1cIiR7bmFtZX1cIj48L2Rpdj5cbiAgICAgICAgPGRpdiBpZD1cImNhcnQtbWFrZS1uYW1lIGZsZXhcIj5cbiAgICAgICAgICA8cCBpZD1cImNhcnQtbWFrZVwiPiR7bWFrZX08L3A+XG4gICAgICAgICAgPHAgaWQ9XCJjYXJ0LW5hbWVcIj4ke25hbWV9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBpZD1cImNhcnQtcHJpY2VcIj4ke3ByaWNlfTwvZGl2PlxuICAgICAgICA8ZGl2IGlkPVwiY2FydC1xdWFudGl0eVwiPlxuICAgICAgICAgIDxwPnF1YW50aXR5PC9wPlxuICAgICAgICAgIDxpbnB1dCBpZD1cImluY3JlbWVudFwiIHR5cGU9XCJidXR0b25cIiBuYW1lPVwiaW5jcmVtZW50XCIgdmFsdWU9XCIrXCI+XG4gICAgICAgICAgPGlucHV0IGlkPVwicXVhbnRpdHktZmllbGRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJxdWFudGl0eVwiIHZhbHVlPTE+XG4gICAgICAgICAgPGlucHV0IGlkPVwiZGVjcmVtZW50XCIgdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJkZWNyZW1lbnRcIiB2YWx1ZT1cIi1cIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJjYXJ0LXVwZGF0ZS1yZW1vdmUtYnV0dG9uc1wiPlxuICAgICAgICAgIDxpbnB1dCBpZD1cInVwZGF0ZVwiIHR5cGU9XCJidXR0b25cIiBuYW1lPVwidXBkYXRlXCIgdmFsdWU9XCJVcGRhdGVcIj5cbiAgICAgICAgICA8aW5wdXQgaWQ9XCJyZW1vdmVcIiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cInJlbW92ZVwiIFZhbHVlPVwiUmVtb3ZlXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aHI+XG4gICAgICAgIDxpbnB1dCBpZD1cImNsZWFyY2FydFwiIHR5cGU9XCJidXR0b25cIiBuYW1lPVwiY2xlYXJjYXJ0XCIgdmFsdWU9XCJjbGVhciBjYXJ0XCI+XG4gICAgICAgIDxpbnB1dCBpZD1cImNoZWNrb3V0XCIgdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJjaGVja291dFwiIHZhbHVlPVwiY2hlY2tvdXRcIj5cbiAgICAgIDwvZGl2PlxuICAgICAgYDtcbiAgICAgIH1cbiAgICAgICQoJyN2aWV3Y2FydCcpLmh0bWwob3V0cHV0KTtcbiAgICAgIC8vVmlld0NhcnQuYXBwZW5kKG91dHB1dCk7IFxuICAgIH1cbiAgICBcbiAgICB9XG5cbiAgIH1cblxuIH1cbiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvU2hvcHBpbmdDYXJ0Vmlldy5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar QuickView = function () {\n    function QuickView() {\n        _classCallCheck(this, QuickView);\n\n        console.log(\"Let's do a quickview of some gadget\");\n        this.quickview = document.getElementById(\"quickview\");\n\n        this.initQuickView();\n    }\n\n    _createClass(QuickView, [{\n        key: \"initQuickView\",\n        value: function initQuickView() {\n\n            $(document).on('click', '.quickViewButton', function (evt) {\n                console.log(\"Let the preview begin!\");\n                $(\"#quickview\").toggle();\n                $(\".qv-overlay\").toggle();\n            });\n\n            $(document).on('click', '#qv-close', '.qv-overlay', function (evt) {\n                console.log(\"Give me the quickview!\");\n                $(\"#quickview\").toggle();\n                $(\".qv-overlay\").toggle();\n            });\n        }\n    }]);\n\n    return QuickView;\n}();\n\nexports.default = QuickView;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvUXVpY2tWaWV3LmpzPzkzNWYiXSwibmFtZXMiOlsiUXVpY2tWaWV3IiwiY29uc29sZSIsImxvZyIsInF1aWNrdmlldyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbml0UXVpY2tWaWV3IiwiJCIsIm9uIiwiZXZ0IiwidG9nZ2xlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCQSxTO0FBRWpCLHlCQUFhO0FBQUE7O0FBQ1RDLGdCQUFRQyxHQUFSLENBQVkscUNBQVo7QUFDQSxhQUFLQyxTQUFMLEdBQWlCQyxTQUFTQyxjQUFULENBQXdCLFdBQXhCLENBQWpCOztBQUVBLGFBQUtDLGFBQUw7QUFFSDs7Ozt3Q0FFYzs7QUFFZkMsY0FBRUgsUUFBRixFQUFZSSxFQUFaLENBQWUsT0FBZixFQUF3QixrQkFBeEIsRUFBMkMsVUFBU0MsR0FBVCxFQUFhO0FBQ25EUix3QkFBUUMsR0FBUixDQUFZLHdCQUFaO0FBQ0FLLGtCQUFFLFlBQUYsRUFBZ0JHLE1BQWhCO0FBQ0FILGtCQUFFLGFBQUYsRUFBaUJHLE1BQWpCO0FBQ0osYUFKRDs7QUFNREgsY0FBRUgsUUFBRixFQUFZSSxFQUFaLENBQWUsT0FBZixFQUF3QixXQUF4QixFQUFxQyxhQUFyQyxFQUFtRCxVQUFTQyxHQUFULEVBQWE7QUFDMURSLHdCQUFRQyxHQUFSLENBQVksd0JBQVo7QUFDQUssa0JBQUUsWUFBRixFQUFnQkcsTUFBaEI7QUFDQUgsa0JBQUUsYUFBRixFQUFpQkcsTUFBakI7QUFDSCxhQUpIO0FBS0E7Ozs7OztrQkF2QmtCVixTIiwiZmlsZSI6IjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBRdWlja1ZpZXd7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxldCdzIGRvIGEgcXVpY2t2aWV3IG9mIHNvbWUgZ2FkZ2V0XCIpO1xuICAgICAgICB0aGlzLnF1aWNrdmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicXVpY2t2aWV3XCIpO1xuXG4gICAgICAgIHRoaXMuaW5pdFF1aWNrVmlldygpO1xuXG4gICAgfVxuICAgIFxuICAgIGluaXRRdWlja1ZpZXcoKXtcbiAgICAgXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5xdWlja1ZpZXdCdXR0b24nLGZ1bmN0aW9uKGV2dCl7XG4gICAgICAgXHRcdGNvbnNvbGUubG9nKFwiTGV0IHRoZSBwcmV2aWV3IGJlZ2luIVwiKTtcbiAgICAgICAgXHQkKFwiI3F1aWNrdmlld1wiKS50b2dnbGUoKTsgXG4gICAgICAgIFx0JChcIi5xdi1vdmVybGF5XCIpLnRvZ2dsZSgpOyAgICAgICAgIFxuICAgIH0pO1xuICAgICAgIFxuICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNxdi1jbG9zZScsICcucXYtb3ZlcmxheScsZnVuY3Rpb24oZXZ0KXtcbiAgICAgICBcdFx0Y29uc29sZS5sb2coXCJHaXZlIG1lIHRoZSBxdWlja3ZpZXchXCIpO1xuICAgICAgICBcdCQoXCIjcXVpY2t2aWV3XCIpLnRvZ2dsZSgpOyBcbiAgICAgICAgXHQkKFwiLnF2LW92ZXJsYXlcIikudG9nZ2xlKCk7ICAgICAgICAgXG4gICAgXHR9KTtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9RdWlja1ZpZXcuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);