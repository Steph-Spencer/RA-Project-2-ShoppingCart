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
/******/ 	var hotCurrentHash = "0947b2c20770205b16ac"; // eslint-disable-line no-unused-vars
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

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Edward_J_Apostol on 2017-01-28.\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */\n\nvar _BestBuyWebService = __webpack_require__(2);\n\nvar _BestBuyWebService2 = _interopRequireDefault(_BestBuyWebService);\n\nvar _CatalogView = __webpack_require__(3);\n\nvar _CatalogView2 = _interopRequireDefault(_CatalogView);\n\nvar _ShoppingCart = __webpack_require__(4);\n\nvar _ShoppingCart2 = _interopRequireDefault(_ShoppingCart);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar App = function () {\n    function App() {\n        _classCallCheck(this, App);\n\n        this.productData = null; // this will store all our data\n        this.products = null; // stores specifically the products\n        this.catalogView = new _CatalogView2.default(); // this will display our data\n        this.shoppingCart = new _ShoppingCart2.default();\n        // call the initBestBuyWebService to initialize the\n        // BestBuy Web Service and return the data\n        this.initBestBuyWebService();\n    }\n\n    _createClass(App, [{\n        key: 'initBestBuyWebService',\n        value: function initBestBuyWebService() {\n            this.bbws = new _BestBuyWebService2.default();\n            // use your own API key for this (the one from Cody)\n            this.bbws.apiKey = \"SXkiDh8lcFEAqyG6rDmJjlH4\";\n\n            // this uses 'backticks' for long multi-line strings\n            this.bbws.url = 'https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=' + this.bbws.apiKey + '&format=json';\n\n            // pass the reference to this app to store the data\n            this.bbws.getData(this);\n        }\n    }, {\n        key: 'prepCatalog',\n        value: function prepCatalog() {\n            // use this console.log to test the data\n            // console.log(this.productData);\n\n            if (this.productData != null) {\n                // only get the products property (for now)\n                // this code was copied from SimpleHTTPRequest.html\n                this.products = this.bbws.getProducts();\n                console.log(this.products);\n            }\n\n            this.showCatalog();\n        }\n    }, {\n        key: 'showCatalog',\n        value: function showCatalog() {\n            // populate the catalog only if there are products\n            if (this.productData != null) {\n                this.catalogView.addProductsToCarousel(this.products, this);\n                // this.catalogView.showCatalog();\n            }\n        }\n    }]);\n\n    return App;\n}();\n\nexports.default = App;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwLmpzP2E2NzMiXSwibmFtZXMiOlsiQXBwIiwicHJvZHVjdERhdGEiLCJwcm9kdWN0cyIsImNhdGFsb2dWaWV3Iiwic2hvcHBpbmdDYXJ0IiwiaW5pdEJlc3RCdXlXZWJTZXJ2aWNlIiwiYmJ3cyIsImFwaUtleSIsInVybCIsImdldERhdGEiLCJnZXRQcm9kdWN0cyIsImNvbnNvbGUiLCJsb2ciLCJzaG93Q2F0YWxvZyIsImFkZFByb2R1Y3RzVG9DYXJvdXNlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O3FqQkFBQTs7OztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUJBLEc7QUFFakIsbUJBQWE7QUFBQTs7QUFDVCxhQUFLQyxXQUFMLEdBQW1CLElBQW5CLENBRFMsQ0FDZ0I7QUFDekIsYUFBS0MsUUFBTCxHQUFnQixJQUFoQixDQUZTLENBRWE7QUFDdEIsYUFBS0MsV0FBTCxHQUFtQiwyQkFBbkIsQ0FIUyxDQUc2QjtBQUN0QyxhQUFLQyxZQUFMLEdBQW9CLDRCQUFwQjtBQUNBO0FBQ0E7QUFDQSxhQUFLQyxxQkFBTDtBQUNIOzs7O2dEQUVzQjtBQUNuQixpQkFBS0MsSUFBTCxHQUFZLGlDQUFaO0FBQ0E7QUFDQSxpQkFBS0EsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLDBCQUFuQjs7QUFFQTtBQUNBLGlCQUFLRCxJQUFMLENBQVVFLEdBQVYsbUZBQThGLEtBQUtGLElBQUwsQ0FBVUMsTUFBeEc7O0FBRUE7QUFDQSxpQkFBS0QsSUFBTCxDQUFVRyxPQUFWLENBQWtCLElBQWxCO0FBRUg7OztzQ0FFWTtBQUNUO0FBQ0E7O0FBRUEsZ0JBQUcsS0FBS1IsV0FBTCxJQUFrQixJQUFyQixFQUEwQjtBQUN0QjtBQUNBO0FBQ0EscUJBQUtDLFFBQUwsR0FBZ0IsS0FBS0ksSUFBTCxDQUFVSSxXQUFWLEVBQWhCO0FBQ0FDLHdCQUFRQyxHQUFSLENBQVksS0FBS1YsUUFBakI7QUFDSDs7QUFFRCxpQkFBS1csV0FBTDtBQUNIOzs7c0NBRWE7QUFDVjtBQUNBLGdCQUFJLEtBQUtaLFdBQUwsSUFBb0IsSUFBeEIsRUFBOEI7QUFDMUIscUJBQUtFLFdBQUwsQ0FBaUJXLHFCQUFqQixDQUF1QyxLQUFLWixRQUE1QyxFQUFxRCxJQUFyRDtBQUNBO0FBQ0g7QUFDSjs7Ozs7O2tCQTdDZ0JGLEciLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBFZHdhcmRfSl9BcG9zdG9sIG9uIDIwMTctMDEtMjguXG4gKi9cblxuaW1wb3J0IEJlc3RCdXlXZWJTZXJ2aWNlIGZyb20gJy4vQmVzdEJ1eVdlYlNlcnZpY2UnO1xuaW1wb3J0IENhdGFsb2dWaWV3IGZyb20gJy4vQ2F0YWxvZ1ZpZXcnXG5pbXBvcnQgU2hvcHBpbmdDYXJ0IGZyb20gJy4vU2hvcHBpbmdDYXJ0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAge1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5wcm9kdWN0RGF0YSA9IG51bGw7IC8vIHRoaXMgd2lsbCBzdG9yZSBhbGwgb3VyIGRhdGFcbiAgICAgICAgdGhpcy5wcm9kdWN0cyA9IG51bGw7IC8vIHN0b3JlcyBzcGVjaWZpY2FsbHkgdGhlIHByb2R1Y3RzXG4gICAgICAgIHRoaXMuY2F0YWxvZ1ZpZXcgPSBuZXcgQ2F0YWxvZ1ZpZXcoKTsgLy8gdGhpcyB3aWxsIGRpc3BsYXkgb3VyIGRhdGFcbiAgICAgICAgdGhpcy5zaG9wcGluZ0NhcnQgPSBuZXcgU2hvcHBpbmdDYXJ0KCk7XG4gICAgICAgIC8vIGNhbGwgdGhlIGluaXRCZXN0QnV5V2ViU2VydmljZSB0byBpbml0aWFsaXplIHRoZVxuICAgICAgICAvLyBCZXN0QnV5IFdlYiBTZXJ2aWNlIGFuZCByZXR1cm4gdGhlIGRhdGFcbiAgICAgICAgdGhpcy5pbml0QmVzdEJ1eVdlYlNlcnZpY2UoKTtcbiAgICB9XG5cbiAgICBpbml0QmVzdEJ1eVdlYlNlcnZpY2UoKXtcbiAgICAgICAgdGhpcy5iYndzID0gbmV3IEJlc3RCdXlXZWJTZXJ2aWNlKCk7XG4gICAgICAgIC8vIHVzZSB5b3VyIG93biBBUEkga2V5IGZvciB0aGlzICh0aGUgb25lIGZyb20gQ29keSlcbiAgICAgICAgdGhpcy5iYndzLmFwaUtleSA9IFwiU1hraURoOGxjRkVBcXlHNnJEbUpqbEg0XCI7XG5cbiAgICAgICAgLy8gdGhpcyB1c2VzICdiYWNrdGlja3MnIGZvciBsb25nIG11bHRpLWxpbmUgc3RyaW5nc1xuICAgICAgICB0aGlzLmJid3MudXJsID0gYGh0dHBzOi8vYXBpLmJlc3RidXkuY29tL3YxL3Byb2R1Y3RzKChjYXRlZ29yeVBhdGguaWQ9YWJjYXQwNTAyMDAwKSk/YXBpS2V5PSR7dGhpcy5iYndzLmFwaUtleX0mZm9ybWF0PWpzb25gO1xuXG4gICAgICAgIC8vIHBhc3MgdGhlIHJlZmVyZW5jZSB0byB0aGlzIGFwcCB0byBzdG9yZSB0aGUgZGF0YVxuICAgICAgICB0aGlzLmJid3MuZ2V0RGF0YSh0aGlzKTtcblxuICAgIH1cblxuICAgIHByZXBDYXRhbG9nKCl7XG4gICAgICAgIC8vIHVzZSB0aGlzIGNvbnNvbGUubG9nIHRvIHRlc3QgdGhlIGRhdGFcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wcm9kdWN0RGF0YSk7XG5cbiAgICAgICAgaWYodGhpcy5wcm9kdWN0RGF0YSE9bnVsbCl7XG4gICAgICAgICAgICAvLyBvbmx5IGdldCB0aGUgcHJvZHVjdHMgcHJvcGVydHkgKGZvciBub3cpXG4gICAgICAgICAgICAvLyB0aGlzIGNvZGUgd2FzIGNvcGllZCBmcm9tIFNpbXBsZUhUVFBSZXF1ZXN0Lmh0bWxcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdHMgPSB0aGlzLmJid3MuZ2V0UHJvZHVjdHMoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvZHVjdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaG93Q2F0YWxvZygpO1xuICAgIH1cblxuICAgIHNob3dDYXRhbG9nKCkge1xuICAgICAgICAvLyBwb3B1bGF0ZSB0aGUgY2F0YWxvZyBvbmx5IGlmIHRoZXJlIGFyZSBwcm9kdWN0c1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0RGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNhdGFsb2dWaWV3LmFkZFByb2R1Y3RzVG9DYXJvdXNlbCh0aGlzLnByb2R1Y3RzLHRoaXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5jYXRhbG9nVmlldy5zaG93Q2F0YWxvZygpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHAuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Created by Edward_J_Apostol on 2017-01-27.\n */\n\nvar BestBuyWebService = function () {\n    function BestBuyWebService() {\n        _classCallCheck(this, BestBuyWebService);\n\n        this.url = \"\";\n        this.apiKey = \"\";\n        this.productData = null;\n        this.products = null;\n    }\n\n    _createClass(BestBuyWebService, [{\n        key: \"getData\",\n        value: function getData(theApp) {\n            // theApp is a reference to the main app\n            // we can pass information to it, including data\n            // that is returned from this service\n\n            var serviceChannel = new XMLHttpRequest();\n            var url = this.url;\n\n            /*\n            // *** To solve the issue of passing the data back to the main app...\n            // *** and eventually, to catalogView\n            // *** You could the addEventListener to call\n            // *** a different function which will have both\n            // *** the event object and dataPlaceHolder as parameters\n            // *** see http://bit.ly/js-passmoreargsevent\n             */\n\n            serviceChannel.addEventListener(\"readystatechange\", this.resultsPreprocessor(theApp), false);\n            serviceChannel.open(\"GET\", url, true);\n            serviceChannel.send();\n        }\n    }, {\n        key: \"resultsPreprocessor\",\n        value: function resultsPreprocessor(theApp) {\n            /*the addEventListener function near line 29 requires a proper function (an event handler) to be returned so we can create one to be returned.\n            */\n            console.log(theApp); // <-- should be instance of App\n            var thisService = this; // a reference to the instance created from this class\n            var eventHandler = function eventHandler(evt) {\n                thisService.results(evt, theApp);\n            };\n            return eventHandler;\n        }\n    }, {\n        key: \"results\",\n        value: function results(evt, theApp) {\n\n            if (evt.target.readyState == 4 && evt.target.status == 200) {\n                // assign this instance's productData to be the responseText\n                this.productData = evt.target.responseText;\n                // assign the app's productData to be the responseText too\n                theApp.productData = evt.target.responseText;\n                // tell the app to prepare the catalog\n                // there is another way to do it, with custom\n                // events. but this will work for now.\n                theApp.prepCatalog();\n                // console.log(evt.target.responseText);\n                // return evt.target.responseText;\n            }\n        }\n    }, {\n        key: \"getProducts\",\n        value: function getProducts() {\n            // this method explicity gets the products property\n            // from the JSON object. it assumes you have the JSON data\n            if (this.productData != null) {\n                var jsonData = JSON.parse(this.productData);\n                this.products = jsonData.products;\n                return this.products;\n            }\n\n            return; // if we have no data, return nothing\n        }\n    }]);\n\n    return BestBuyWebService;\n}();\n\nexports.default = BestBuyWebService;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQmVzdEJ1eVdlYlNlcnZpY2UuanM/ODQzYyJdLCJuYW1lcyI6WyJCZXN0QnV5V2ViU2VydmljZSIsInVybCIsImFwaUtleSIsInByb2R1Y3REYXRhIiwicHJvZHVjdHMiLCJ0aGVBcHAiLCJzZXJ2aWNlQ2hhbm5lbCIsIlhNTEh0dHBSZXF1ZXN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc3VsdHNQcmVwcm9jZXNzb3IiLCJvcGVuIiwic2VuZCIsImNvbnNvbGUiLCJsb2ciLCJ0aGlzU2VydmljZSIsImV2ZW50SGFuZGxlciIsImV2dCIsInJlc3VsdHMiLCJ0YXJnZXQiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0IiwicHJlcENhdGFsb2ciLCJqc29uRGF0YSIsIkpTT04iLCJwYXJzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0lBSXFCQSxpQjtBQUVqQixpQ0FBYTtBQUFBOztBQUNULGFBQUtDLEdBQUwsR0FBVSxFQUFWO0FBQ0EsYUFBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsYUFBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNIOzs7O2dDQUdPQyxNLEVBQU87QUFDWDtBQUNBO0FBQ0E7O0FBRUEsZ0JBQUlDLGlCQUFpQixJQUFJQyxjQUFKLEVBQXJCO0FBQ0EsZ0JBQUlOLE1BQU0sS0FBS0EsR0FBZjs7QUFFQTs7Ozs7Ozs7O0FBU0FLLDJCQUFlRSxnQkFBZixDQUFnQyxrQkFBaEMsRUFBbUQsS0FBS0MsbUJBQUwsQ0FBeUJKLE1BQXpCLENBQW5ELEVBQW9GLEtBQXBGO0FBQ0FDLDJCQUFlSSxJQUFmLENBQW9CLEtBQXBCLEVBQTBCVCxHQUExQixFQUE4QixJQUE5QjtBQUNBSywyQkFBZUssSUFBZjtBQUNIOzs7NENBRW1CTixNLEVBQU87QUFDdkI7O0FBRUFPLG9CQUFRQyxHQUFSLENBQVlSLE1BQVosRUFIdUIsQ0FHRjtBQUNyQixnQkFBSVMsY0FBYyxJQUFsQixDQUp1QixDQUlDO0FBQ3hCLGdCQUFJQyxlQUFlLFNBQWZBLFlBQWUsQ0FBU0MsR0FBVCxFQUFhO0FBQzVCRiw0QkFBWUcsT0FBWixDQUFvQkQsR0FBcEIsRUFBd0JYLE1BQXhCO0FBQ0gsYUFGRDtBQUdBLG1CQUFPVSxZQUFQO0FBQ0g7OztnQ0FFT0MsRyxFQUFJWCxNLEVBQU87O0FBRWYsZ0JBQUlXLElBQUlFLE1BQUosQ0FBV0MsVUFBWCxJQUF5QixDQUF6QixJQUE4QkgsSUFBSUUsTUFBSixDQUFXRSxNQUFYLElBQXFCLEdBQXZELEVBQTJEO0FBQ3ZEO0FBQ0EscUJBQUtqQixXQUFMLEdBQW1CYSxJQUFJRSxNQUFKLENBQVdHLFlBQTlCO0FBQ0E7QUFDQWhCLHVCQUFPRixXQUFQLEdBQXFCYSxJQUFJRSxNQUFKLENBQVdHLFlBQWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0FoQix1QkFBT2lCLFdBQVA7QUFDQTtBQUNBO0FBQ0g7QUFDSjs7O3NDQUVZO0FBQ1Q7QUFDQTtBQUNBLGdCQUFHLEtBQUtuQixXQUFMLElBQWtCLElBQXJCLEVBQTBCO0FBQ3ZCLG9CQUFJb0IsV0FBV0MsS0FBS0MsS0FBTCxDQUFXLEtBQUt0QixXQUFoQixDQUFmO0FBQ0EscUJBQUtDLFFBQUwsR0FBZ0JtQixTQUFTbkIsUUFBekI7QUFDQSx1QkFBTyxLQUFLQSxRQUFaO0FBQ0Y7O0FBRUQsbUJBVFMsQ0FTRDtBQUNYOzs7Ozs7a0JBckVnQkosaUIiLCJmaWxlIjoiMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBFZHdhcmRfSl9BcG9zdG9sIG9uIDIwMTctMDEtMjcuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVzdEJ1eVdlYlNlcnZpY2V7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnVybCA9XCJcIjtcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBcIlwiO1xuICAgICAgICB0aGlzLnByb2R1Y3REYXRhID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9kdWN0cyA9IG51bGw7XG4gICAgfVxuXG5cbiAgICBnZXREYXRhKHRoZUFwcCl7XG4gICAgICAgIC8vIHRoZUFwcCBpcyBhIHJlZmVyZW5jZSB0byB0aGUgbWFpbiBhcHBcbiAgICAgICAgLy8gd2UgY2FuIHBhc3MgaW5mb3JtYXRpb24gdG8gaXQsIGluY2x1ZGluZyBkYXRhXG4gICAgICAgIC8vIHRoYXQgaXMgcmV0dXJuZWQgZnJvbSB0aGlzIHNlcnZpY2VcblxuICAgICAgICBsZXQgc2VydmljZUNoYW5uZWwgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMudXJsO1xuXG4gICAgICAgIC8qXG4gICAgICAgIC8vICoqKiBUbyBzb2x2ZSB0aGUgaXNzdWUgb2YgcGFzc2luZyB0aGUgZGF0YSBiYWNrIHRvIHRoZSBtYWluIGFwcC4uLlxuICAgICAgICAvLyAqKiogYW5kIGV2ZW50dWFsbHksIHRvIGNhdGFsb2dWaWV3XG4gICAgICAgIC8vICoqKiBZb3UgY291bGQgdGhlIGFkZEV2ZW50TGlzdGVuZXIgdG8gY2FsbFxuICAgICAgICAvLyAqKiogYSBkaWZmZXJlbnQgZnVuY3Rpb24gd2hpY2ggd2lsbCBoYXZlIGJvdGhcbiAgICAgICAgLy8gKioqIHRoZSBldmVudCBvYmplY3QgYW5kIGRhdGFQbGFjZUhvbGRlciBhcyBwYXJhbWV0ZXJzXG4gICAgICAgIC8vICoqKiBzZWUgaHR0cDovL2JpdC5seS9qcy1wYXNzbW9yZWFyZ3NldmVudFxuICAgICAgICAgKi9cblxuICAgICAgICBzZXJ2aWNlQ2hhbm5lbC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLHRoaXMucmVzdWx0c1ByZXByb2Nlc3Nvcih0aGVBcHApLGZhbHNlKTtcbiAgICAgICAgc2VydmljZUNoYW5uZWwub3BlbihcIkdFVFwiLHVybCx0cnVlKTtcbiAgICAgICAgc2VydmljZUNoYW5uZWwuc2VuZCgpO1xuICAgIH1cblxuICAgIHJlc3VsdHNQcmVwcm9jZXNzb3IodGhlQXBwKXtcbiAgICAgICAgLyp0aGUgYWRkRXZlbnRMaXN0ZW5lciBmdW5jdGlvbiBuZWFyIGxpbmUgMjkgcmVxdWlyZXMgYSBwcm9wZXIgZnVuY3Rpb24gKGFuIGV2ZW50IGhhbmRsZXIpIHRvIGJlIHJldHVybmVkIHNvIHdlIGNhbiBjcmVhdGUgb25lIHRvIGJlIHJldHVybmVkLlxuICAgICAgICAqL1xuICAgICAgICBjb25zb2xlLmxvZyh0aGVBcHApOyAvLyA8LS0gc2hvdWxkIGJlIGluc3RhbmNlIG9mIEFwcFxuICAgICAgICBsZXQgdGhpc1NlcnZpY2UgPSB0aGlzOyAvLyBhIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2UgY3JlYXRlZCBmcm9tIHRoaXMgY2xhc3NcbiAgICAgICAgbGV0IGV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uKGV2dCl7XG4gICAgICAgICAgICB0aGlzU2VydmljZS5yZXN1bHRzKGV2dCx0aGVBcHApXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBldmVudEhhbmRsZXJcbiAgICB9O1xuXG4gICAgcmVzdWx0cyhldnQsdGhlQXBwKXtcblxuICAgICAgICBpZiAoZXZ0LnRhcmdldC5yZWFkeVN0YXRlID09IDQgJiYgZXZ0LnRhcmdldC5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgICAgIC8vIGFzc2lnbiB0aGlzIGluc3RhbmNlJ3MgcHJvZHVjdERhdGEgdG8gYmUgdGhlIHJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0RGF0YSA9IGV2dC50YXJnZXQucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgLy8gYXNzaWduIHRoZSBhcHAncyBwcm9kdWN0RGF0YSB0byBiZSB0aGUgcmVzcG9uc2VUZXh0IHRvb1xuICAgICAgICAgICAgdGhlQXBwLnByb2R1Y3REYXRhID0gZXZ0LnRhcmdldC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAvLyB0ZWxsIHRoZSBhcHAgdG8gcHJlcGFyZSB0aGUgY2F0YWxvZ1xuICAgICAgICAgICAgLy8gdGhlcmUgaXMgYW5vdGhlciB3YXkgdG8gZG8gaXQsIHdpdGggY3VzdG9tXG4gICAgICAgICAgICAvLyBldmVudHMuIGJ1dCB0aGlzIHdpbGwgd29yayBmb3Igbm93LlxuICAgICAgICAgICAgdGhlQXBwLnByZXBDYXRhbG9nKCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhldnQudGFyZ2V0LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAvLyByZXR1cm4gZXZ0LnRhcmdldC5yZXNwb25zZVRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQcm9kdWN0cygpe1xuICAgICAgICAvLyB0aGlzIG1ldGhvZCBleHBsaWNpdHkgZ2V0cyB0aGUgcHJvZHVjdHMgcHJvcGVydHlcbiAgICAgICAgLy8gZnJvbSB0aGUgSlNPTiBvYmplY3QuIGl0IGFzc3VtZXMgeW91IGhhdmUgdGhlIEpTT04gZGF0YVxuICAgICAgICBpZih0aGlzLnByb2R1Y3REYXRhIT1udWxsKXtcbiAgICAgICAgICAgbGV0IGpzb25EYXRhID0gSlNPTi5wYXJzZSh0aGlzLnByb2R1Y3REYXRhKTtcbiAgICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IGpzb25EYXRhLnByb2R1Y3RzO1xuICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0cztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjsgLy8gaWYgd2UgaGF2ZSBubyBkYXRhLCByZXR1cm4gbm90aGluZ1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9CZXN0QnV5V2ViU2VydmljZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar CatalogView = function () {\n    function CatalogView() {\n        _classCallCheck(this, CatalogView);\n\n        this.carousel = document.getElementById(\"productroll\");\n        this.theApp = null;\n    }\n\n    _createClass(CatalogView, [{\n        key: \"initCarousel\",\n        value: function initCarousel() {\n            console.log(\"initializing carousel\");\n            $(document).ready(function () {\n                $('.owl-carousel').owlCarousel({\n                    items: 1,\n                    loop: true,\n                    responsive: {\n                        0: {\n                            items: 1\n                        }, //from zero to 600 screen\n                        601: {\n                            items: 2\n                        }, //from 600 to 1050 screen\n                        1050: {\n                            items: 4\n                        } //from 1050 to 1240 screen\n                    }\n\n                });\n            });\n        }\n    }, {\n        key: \"onClickCartButton\",\n        value: function onClickCartButton(theApp) {\n            return function (e) {\n                console.log(e.target.getAttribute(\"data-sku\"));\n                var theSku = e.target.getAttribute(\"data-sku\");\n                theApp.shoppingCart.addItemToCart(theSku);\n            };\n        }\n    }, {\n        key: \"addProductsToCarousel\",\n        value: function addProductsToCarousel(products, theApp) {\n\n            this.theApp = theApp;\n\n            if (products === undefined || products == null) {\n                return; // do not do anything! there is no data\n            }\n\n            for (var p = 0; p < products.length; p++) {\n                var product = products[p];\n                console.log(product);\n                // each product is a product object\n                // use it to create the element\n\n                // create the DIV tag with class 'product-wrapper'\n                var newDiv = document.createElement(\"div\");\n                newDiv.setAttribute(\"class\", \"product-wrapper\");\n\n                // create a new IMG tag. Suggest to add data-sku attribute here too\n                // so that if you 'click' on the image, it would pop up a quick-view\n                // window and you can use the sku.\n                var newImg = document.createElement(\"img\");\n                newImg.setAttribute(\"src\", product.image);\n                newImg.setAttribute(\"alt\", \"\" + product.name); // this works too\n                newImg.setAttribute(\"data-sku\", product.sku);\n\n                // create a new Paragraph to show a manufacturer\n                var newPara = document.createElement(\"p\");\n                newPara.setAttribute(\"class\", \"productmake\");\n                var newParaTextNode = document.createTextNode(product.manufacturer);\n                newPara.appendChild(newParaTextNode);\n\n                // create a new H3 tag to show the name\n                var newH3Tag = document.createElement(\"h3\");\n                var newH3TagTextNode = document.createTextNode(product.name);\n                newH3Tag.appendChild(newH3TagTextNode);\n\n                var newPricePara = document.createElement(\"p\");\n                newPricePara.setAttribute(\"class\", \"price\");\n                var newPriceParaTextNode = document.createTextNode(product.regularPrice);\n                newPricePara.appendChild(newPriceParaTextNode);\n\n                var quickViewButton = document.createElement(\"button\");\n                quickViewButton.setAttribute(\"id\", \"qv_\" + product.sku);\n                quickViewButton.setAttribute(\"data-sku\", product.sku);\n                var quickViewTextNode = document.createTextNode(\"Quick View\");\n                quickViewButton.appendChild(quickViewTextNode);\n\n                var addToCartButton = document.createElement(\"button\");\n                addToCartButton.setAttribute(\"id\", \"cart_\" + product.sku);\n                addToCartButton.setAttribute(\"data-sku\", product.sku);\n                var addToCartTextNode = document.createTextNode(\"Add to Cart\");\n                addToCartButton.appendChild(addToCartTextNode);\n                addToCartButton.addEventListener(\"click\", this.onClickCartButton(this.theApp), false);\n\n                newDiv.appendChild(newImg);\n                newDiv.appendChild(newPara);\n                newDiv.appendChild(newH3Tag);\n                newDiv.appendChild(newPricePara);\n                newDiv.appendChild(quickViewButton);\n                newDiv.appendChild(addToCartButton);\n                this.carousel.appendChild(newDiv);\n            }\n            this.initCarousel();\n        }\n    }]);\n\n    return CatalogView;\n}();\n\nexports.default = CatalogView;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQ2F0YWxvZ1ZpZXcuanM/MDY1YSJdLCJuYW1lcyI6WyJDYXRhbG9nVmlldyIsImNhcm91c2VsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRoZUFwcCIsImNvbnNvbGUiLCJsb2ciLCIkIiwicmVhZHkiLCJvd2xDYXJvdXNlbCIsIml0ZW1zIiwibG9vcCIsInJlc3BvbnNpdmUiLCJlIiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwidGhlU2t1Iiwic2hvcHBpbmdDYXJ0IiwiYWRkSXRlbVRvQ2FydCIsInByb2R1Y3RzIiwidW5kZWZpbmVkIiwicCIsImxlbmd0aCIsInByb2R1Y3QiLCJuZXdEaXYiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwibmV3SW1nIiwiaW1hZ2UiLCJuYW1lIiwic2t1IiwibmV3UGFyYSIsIm5ld1BhcmFUZXh0Tm9kZSIsImNyZWF0ZVRleHROb2RlIiwibWFudWZhY3R1cmVyIiwiYXBwZW5kQ2hpbGQiLCJuZXdIM1RhZyIsIm5ld0gzVGFnVGV4dE5vZGUiLCJuZXdQcmljZVBhcmEiLCJuZXdQcmljZVBhcmFUZXh0Tm9kZSIsInJlZ3VsYXJQcmljZSIsInF1aWNrVmlld0J1dHRvbiIsInF1aWNrVmlld1RleHROb2RlIiwiYWRkVG9DYXJ0QnV0dG9uIiwiYWRkVG9DYXJ0VGV4dE5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwib25DbGlja0NhcnRCdXR0b24iLCJpbml0Q2Fyb3VzZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFDcUJBLFc7QUFFakIsMkJBQWE7QUFBQTs7QUFDVCxhQUFLQyxRQUFMLEdBQWdCQyxTQUFTQyxjQUFULENBQXdCLGFBQXhCLENBQWhCO0FBQ0EsYUFBS0MsTUFBTCxHQUFjLElBQWQ7QUFFSDs7Ozt1Q0FFYTtBQUNWQyxvQkFBUUMsR0FBUixDQUFZLHVCQUFaO0FBQ0RDLGNBQUVMLFFBQUYsRUFBWU0sS0FBWixDQUFrQixZQUFVO0FBQ3hCRCxrQkFBRSxlQUFGLEVBQW1CRSxXQUFuQixDQUErQjtBQUMzQkMsMkJBQU0sQ0FEcUI7QUFFM0JDLDBCQUFLLElBRnNCO0FBRzNCQyxnQ0FBYTtBQUNULDJCQUFFO0FBQ0VGLG1DQUFNO0FBRFIseUJBRE8sRUFHTjtBQUNILDZCQUFJO0FBQ0FBLG1DQUFNO0FBRE4seUJBSkssRUFNTjtBQUNILDhCQUFLO0FBQ0RBLG1DQUFNO0FBREwseUJBUEksQ0FTUDtBQVRPOztBQUhjLGlCQUEvQjtBQWdCSCxhQWpCRDtBQW1CRjs7OzBDQUVpQk4sTSxFQUFPO0FBQ3pCLG1CQUFPLFVBQVNTLENBQVQsRUFBVztBQUNkUix3QkFBUUMsR0FBUixDQUFZTyxFQUFFQyxNQUFGLENBQVNDLFlBQVQsQ0FBc0IsVUFBdEIsQ0FBWjtBQUNBLG9CQUFJQyxTQUFTSCxFQUFFQyxNQUFGLENBQVNDLFlBQVQsQ0FBc0IsVUFBdEIsQ0FBYjtBQUNBWCx1QkFBT2EsWUFBUCxDQUFvQkMsYUFBcEIsQ0FBa0NGLE1BQWxDO0FBQ0gsYUFKRDtBQUtIOzs7OENBQ3lCRyxRLEVBQVNmLE0sRUFBTzs7QUFFbEMsaUJBQUtBLE1BQUwsR0FBY0EsTUFBZDs7QUFFQSxnQkFBSWUsYUFBYUMsU0FBYixJQUEwQkQsWUFBWSxJQUExQyxFQUErQztBQUMzQyx1QkFEMkMsQ0FDbEM7QUFDWjs7QUFFRCxpQkFBSyxJQUFJRSxJQUFFLENBQVgsRUFBY0EsSUFBRUYsU0FBU0csTUFBekIsRUFBaUNELEdBQWpDLEVBQXFDO0FBQ2pDLG9CQUFJRSxVQUFVSixTQUFTRSxDQUFULENBQWQ7QUFDQWhCLHdCQUFRQyxHQUFSLENBQVlpQixPQUFaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFJQyxTQUFTdEIsU0FBU3VCLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBRCx1QkFBT0UsWUFBUCxDQUFvQixPQUFwQixFQUE0QixpQkFBNUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQUlDLFNBQVN6QixTQUFTdUIsYUFBVCxDQUF1QixLQUF2QixDQUFiO0FBQ0FFLHVCQUFPRCxZQUFQLENBQW9CLEtBQXBCLEVBQTJCSCxRQUFRSyxLQUFuQztBQUNBRCx1QkFBT0QsWUFBUCxDQUFvQixLQUFwQixPQUE4QkgsUUFBUU0sSUFBdEMsRUFmaUMsQ0FlYztBQUMvQ0YsdUJBQU9ELFlBQVAsQ0FBb0IsVUFBcEIsRUFBK0JILFFBQVFPLEdBQXZDOztBQUVBO0FBQ0Esb0JBQUlDLFVBQVU3QixTQUFTdUIsYUFBVCxDQUF1QixHQUF2QixDQUFkO0FBQ0FNLHdCQUFRTCxZQUFSLENBQXFCLE9BQXJCLEVBQTZCLGFBQTdCO0FBQ0Esb0JBQUlNLGtCQUFrQjlCLFNBQVMrQixjQUFULENBQXdCVixRQUFRVyxZQUFoQyxDQUF0QjtBQUNBSCx3QkFBUUksV0FBUixDQUFvQkgsZUFBcEI7O0FBRUE7QUFDQSxvQkFBSUksV0FBV2xDLFNBQVN1QixhQUFULENBQXVCLElBQXZCLENBQWY7QUFDQSxvQkFBSVksbUJBQW1CbkMsU0FBUytCLGNBQVQsQ0FBd0JWLFFBQVFNLElBQWhDLENBQXZCO0FBQ0FPLHlCQUFTRCxXQUFULENBQXFCRSxnQkFBckI7O0FBRUEsb0JBQUlDLGVBQWVwQyxTQUFTdUIsYUFBVCxDQUF1QixHQUF2QixDQUFuQjtBQUNBYSw2QkFBYVosWUFBYixDQUEwQixPQUExQixFQUFrQyxPQUFsQztBQUNBLG9CQUFJYSx1QkFBdUJyQyxTQUFTK0IsY0FBVCxDQUF3QlYsUUFBUWlCLFlBQWhDLENBQTNCO0FBQ0FGLDZCQUFhSCxXQUFiLENBQXlCSSxvQkFBekI7O0FBRUEsb0JBQUlFLGtCQUFrQnZDLFNBQVN1QixhQUFULENBQXVCLFFBQXZCLENBQXRCO0FBQ0FnQixnQ0FBZ0JmLFlBQWhCLENBQTZCLElBQTdCLFVBQXdDSCxRQUFRTyxHQUFoRDtBQUNBVyxnQ0FBZ0JmLFlBQWhCLENBQTZCLFVBQTdCLEVBQXdDSCxRQUFRTyxHQUFoRDtBQUNBLG9CQUFJWSxvQkFBb0J4QyxTQUFTK0IsY0FBVCxDQUF3QixZQUF4QixDQUF4QjtBQUNBUSxnQ0FBZ0JOLFdBQWhCLENBQTRCTyxpQkFBNUI7O0FBRUEsb0JBQUlDLGtCQUFrQnpDLFNBQVN1QixhQUFULENBQXVCLFFBQXZCLENBQXRCO0FBQ0FrQixnQ0FBZ0JqQixZQUFoQixDQUE2QixJQUE3QixZQUEwQ0gsUUFBUU8sR0FBbEQ7QUFDQWEsZ0NBQWdCakIsWUFBaEIsQ0FBNkIsVUFBN0IsRUFBd0NILFFBQVFPLEdBQWhEO0FBQ0Esb0JBQUljLG9CQUFvQjFDLFNBQVMrQixjQUFULENBQXdCLGFBQXhCLENBQXhCO0FBQ0FVLGdDQUFnQlIsV0FBaEIsQ0FBNEJTLGlCQUE1QjtBQUNBRCxnQ0FBZ0JFLGdCQUFoQixDQUFpQyxPQUFqQyxFQUF5QyxLQUFLQyxpQkFBTCxDQUF1QixLQUFLMUMsTUFBNUIsQ0FBekMsRUFBNkUsS0FBN0U7O0FBSUFvQix1QkFBT1csV0FBUCxDQUFtQlIsTUFBbkI7QUFDQUgsdUJBQU9XLFdBQVAsQ0FBbUJKLE9BQW5CO0FBQ0FQLHVCQUFPVyxXQUFQLENBQW1CQyxRQUFuQjtBQUNBWix1QkFBT1csV0FBUCxDQUFtQkcsWUFBbkI7QUFDQWQsdUJBQU9XLFdBQVAsQ0FBbUJNLGVBQW5CO0FBQ0FqQix1QkFBT1csV0FBUCxDQUFtQlEsZUFBbkI7QUFDQSxxQkFBSzFDLFFBQUwsQ0FBY2tDLFdBQWQsQ0FBMEJYLE1BQTFCO0FBQ0g7QUFDRyxpQkFBS3VCLFlBQUw7QUFDUDs7Ozs7O2tCQXhHZ0IvQyxXIiwiZmlsZSI6IjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGFsb2dWaWV3e1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5jYXJvdXNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvZHVjdHJvbGxcIik7XG4gICAgICAgIHRoaXMudGhlQXBwID0gbnVsbDtcblxuICAgIH1cblxuICAgIGluaXRDYXJvdXNlbCgpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImluaXRpYWxpemluZyBjYXJvdXNlbFwiKTtcbiAgICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgICAgICAgICAkKCcub3dsLWNhcm91c2VsJykub3dsQ2Fyb3VzZWwoe1xuICAgICAgICAgICAgICAgaXRlbXM6MSxcbiAgICAgICAgICAgICAgIGxvb3A6dHJ1ZSxcbiAgICAgICAgICAgICAgIHJlc3BvbnNpdmUgOiB7XG4gICAgICAgICAgICAgICAgICAgMDp7XG4gICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOjFcbiAgICAgICAgICAgICAgICAgICB9LCAvL2Zyb20gemVybyB0byA2MDAgc2NyZWVuXG4gICAgICAgICAgICAgICAgICAgNjAxOntcbiAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6MlxuICAgICAgICAgICAgICAgICAgIH0sIC8vZnJvbSA2MDAgdG8gMTA1MCBzY3JlZW5cbiAgICAgICAgICAgICAgICAgICAxMDUwOntcbiAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6NFxuICAgICAgICAgICAgICAgICAgIH0gLy9mcm9tIDEwNTAgdG8gMTI0MCBzY3JlZW5cbiAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICB9KTtcbiAgICAgICB9KTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgb25DbGlja0NhcnRCdXR0b24odGhlQXBwKXtcbiAgICByZXR1cm4gZnVuY3Rpb24oZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIpKTtcbiAgICAgICAgbGV0IHRoZVNrdSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIpO1xuICAgICAgICB0aGVBcHAuc2hvcHBpbmdDYXJ0LmFkZEl0ZW1Ub0NhcnQodGhlU2t1KTtcbiAgICB9XG59XG4gICAgYWRkUHJvZHVjdHNUb0Nhcm91c2VsKHByb2R1Y3RzLHRoZUFwcCl7XG5cbiAgICAgICAgdGhpcy50aGVBcHAgPSB0aGVBcHA7XG5cbiAgICAgICAgaWYgKHByb2R1Y3RzID09PSB1bmRlZmluZWQgfHwgcHJvZHVjdHMgPT0gbnVsbCl7XG4gICAgICAgICAgICByZXR1cm4gOyAvLyBkbyBub3QgZG8gYW55dGhpbmchIHRoZXJlIGlzIG5vIGRhdGFcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHA9MDsgcDxwcm9kdWN0cy5sZW5ndGg7IHArKyl7XG4gICAgICAgICAgICBsZXQgcHJvZHVjdCA9IHByb2R1Y3RzW3BdO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvZHVjdCk7XG4gICAgICAgICAgICAvLyBlYWNoIHByb2R1Y3QgaXMgYSBwcm9kdWN0IG9iamVjdFxuICAgICAgICAgICAgLy8gdXNlIGl0IHRvIGNyZWF0ZSB0aGUgZWxlbWVudFxuXG4gICAgICAgICAgICAvLyBjcmVhdGUgdGhlIERJViB0YWcgd2l0aCBjbGFzcyAncHJvZHVjdC13cmFwcGVyJ1xuICAgICAgICAgICAgbGV0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBuZXdEaXYuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcInByb2R1Y3Qtd3JhcHBlclwiKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IElNRyB0YWcuIFN1Z2dlc3QgdG8gYWRkIGRhdGEtc2t1IGF0dHJpYnV0ZSBoZXJlIHRvb1xuICAgICAgICAgICAgLy8gc28gdGhhdCBpZiB5b3UgJ2NsaWNrJyBvbiB0aGUgaW1hZ2UsIGl0IHdvdWxkIHBvcCB1cCBhIHF1aWNrLXZpZXdcbiAgICAgICAgICAgIC8vIHdpbmRvdyBhbmQgeW91IGNhbiB1c2UgdGhlIHNrdS5cbiAgICAgICAgICAgIGxldCBuZXdJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgbmV3SW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCBwcm9kdWN0LmltYWdlKTtcbiAgICAgICAgICAgIG5ld0ltZy5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgYCR7cHJvZHVjdC5uYW1lfWApOyAvLyB0aGlzIHdvcmtzIHRvb1xuICAgICAgICAgICAgbmV3SW1nLnNldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIscHJvZHVjdC5za3UpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBuZXcgUGFyYWdyYXBoIHRvIHNob3cgYSBtYW51ZmFjdHVyZXJcbiAgICAgICAgICAgIGxldCBuZXdQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBuZXdQYXJhLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJwcm9kdWN0bWFrZVwiKTtcbiAgICAgICAgICAgIGxldCBuZXdQYXJhVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwcm9kdWN0Lm1hbnVmYWN0dXJlcik7XG4gICAgICAgICAgICBuZXdQYXJhLmFwcGVuZENoaWxkKG5ld1BhcmFUZXh0Tm9kZSk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBIMyB0YWcgdG8gc2hvdyB0aGUgbmFtZVxuICAgICAgICAgICAgbGV0IG5ld0gzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgICAgICAgbGV0IG5ld0gzVGFnVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwcm9kdWN0Lm5hbWUpO1xuICAgICAgICAgICAgbmV3SDNUYWcuYXBwZW5kQ2hpbGQobmV3SDNUYWdUZXh0Tm9kZSk7XG5cbiAgICAgICAgICAgIGxldCBuZXdQcmljZVBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIG5ld1ByaWNlUGFyYS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwicHJpY2VcIik7XG4gICAgICAgICAgICBsZXQgbmV3UHJpY2VQYXJhVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwcm9kdWN0LnJlZ3VsYXJQcmljZSk7XG4gICAgICAgICAgICBuZXdQcmljZVBhcmEuYXBwZW5kQ2hpbGQobmV3UHJpY2VQYXJhVGV4dE5vZGUpO1xuXG4gICAgICAgICAgICBsZXQgcXVpY2tWaWV3QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIHF1aWNrVmlld0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLGBxdl8ke3Byb2R1Y3Quc2t1fWApO1xuICAgICAgICAgICAgcXVpY2tWaWV3QnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIscHJvZHVjdC5za3UpO1xuICAgICAgICAgICAgbGV0IHF1aWNrVmlld1RleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJRdWljayBWaWV3XCIpO1xuICAgICAgICAgICAgcXVpY2tWaWV3QnV0dG9uLmFwcGVuZENoaWxkKHF1aWNrVmlld1RleHROb2RlKTtcblxuICAgICAgICAgICAgbGV0IGFkZFRvQ2FydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICBhZGRUb0NhcnRCdXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIixgY2FydF8ke3Byb2R1Y3Quc2t1fWApO1xuICAgICAgICAgICAgYWRkVG9DYXJ0QnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIscHJvZHVjdC5za3UpO1xuICAgICAgICAgICAgbGV0IGFkZFRvQ2FydFRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJBZGQgdG8gQ2FydFwiKTtcbiAgICAgICAgICAgIGFkZFRvQ2FydEJ1dHRvbi5hcHBlbmRDaGlsZChhZGRUb0NhcnRUZXh0Tm9kZSk7XG4gICAgICAgICAgICBhZGRUb0NhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5vbkNsaWNrQ2FydEJ1dHRvbih0aGlzLnRoZUFwcCksZmFsc2UpO1xuXG5cblxuICAgICAgICAgICAgbmV3RGl2LmFwcGVuZENoaWxkKG5ld0ltZyk7XG4gICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobmV3UGFyYSk7XG4gICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobmV3SDNUYWcpO1xuICAgICAgICAgICAgbmV3RGl2LmFwcGVuZENoaWxkKG5ld1ByaWNlUGFyYSk7XG4gICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQocXVpY2tWaWV3QnV0dG9uKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChhZGRUb0NhcnRCdXR0b24pO1xuICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5hcHBlbmRDaGlsZChuZXdEaXYpO1xuICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmluaXRDYXJvdXNlbCgpO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0NhdGFsb2dWaWV3LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Created by Edward_J_Apostol on 2017-01-29.\n */\n\nvar ShoppingCart = function () {\n    function ShoppingCart() {\n        _classCallCheck(this, ShoppingCart);\n\n        console.log(\"creating shopping cart\");\n        if (Storage) {\n            // you can create a shoppingCart!\n            this.initShoppingCart();\n        } else {\n            console.log(\"Error! SessionStorage not supported in your browser!\");\n        }\n    }\n\n    _createClass(ShoppingCart, [{\n        key: \"initShoppingCart\",\n        value: function initShoppingCart() {\n            // create the sessionStorage object that will be used\n            // to store the items.\n            console.log(\"finished creating shopping cart\");\n        }\n    }, {\n        key: \"addItemToCart\",\n        value: function addItemToCart(sku) {}\n    }, {\n        key: \"removeItemFromCart\",\n        value: function removeItemFromCart(sku) {\n            // replace value of session data-sku quantity with null//\n\n        }\n    }, {\n        key: \"updateQuantityofItemInCart\",\n        value: function updateQuantityofItemInCart(sky, qty) {}\n    }, {\n        key: \"clearCart\",\n        value: function clearCart() {\n            sessionStorage.clear();\n            // clear the entire cart\n        }\n    }]);\n\n    return ShoppingCart;\n}();\n\nexports.default = ShoppingCart;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU2hvcHBpbmdDYXJ0LmpzPzc5MWEiXSwibmFtZXMiOlsiU2hvcHBpbmdDYXJ0IiwiY29uc29sZSIsImxvZyIsIlN0b3JhZ2UiLCJpbml0U2hvcHBpbmdDYXJ0Iiwic2t1Iiwic2t5IiwicXR5Iiwic2Vzc2lvblN0b3JhZ2UiLCJjbGVhciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0lBSXFCQSxZO0FBRWpCLDRCQUFhO0FBQUE7O0FBQ1RDLGdCQUFRQyxHQUFSLENBQVksd0JBQVo7QUFDQSxZQUFHQyxPQUFILEVBQVc7QUFDUDtBQUNBLGlCQUFLQyxnQkFBTDtBQUNILFNBSEQsTUFJQTtBQUNJSCxvQkFBUUMsR0FBUixDQUFZLHNEQUFaO0FBQ0g7QUFDSjs7OzsyQ0FFaUI7QUFDZDtBQUNBO0FBQ0FELG9CQUFRQyxHQUFSLENBQVksaUNBQVo7QUFDSDs7O3NDQUVhRyxHLEVBQUksQ0FFakI7OzsyQ0FFa0JBLEcsRUFBSTtBQUN4Qjs7QUFFRTs7O21EQUUwQkMsRyxFQUFJQyxHLEVBQUksQ0FFbEM7OztvQ0FFVTtBQUNQQywyQkFBZUMsS0FBZjtBQUNBO0FBQ0g7Ozs7OztrQkFuQ2dCVCxZIiwiZmlsZSI6IjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgRWR3YXJkX0pfQXBvc3RvbCBvbiAyMDE3LTAxLTI5LlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BwaW5nQ2FydHtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRpbmcgc2hvcHBpbmcgY2FydFwiKTtcbiAgICAgICAgaWYoU3RvcmFnZSl7XG4gICAgICAgICAgICAvLyB5b3UgY2FuIGNyZWF0ZSBhIHNob3BwaW5nQ2FydCFcbiAgICAgICAgICAgIHRoaXMuaW5pdFNob3BwaW5nQ2FydCgpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciEgU2Vzc2lvblN0b3JhZ2Ugbm90IHN1cHBvcnRlZCBpbiB5b3VyIGJyb3dzZXIhXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdFNob3BwaW5nQ2FydCgpe1xuICAgICAgICAvLyBjcmVhdGUgdGhlIHNlc3Npb25TdG9yYWdlIG9iamVjdCB0aGF0IHdpbGwgYmUgdXNlZFxuICAgICAgICAvLyB0byBzdG9yZSB0aGUgaXRlbXMuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmluaXNoZWQgY3JlYXRpbmcgc2hvcHBpbmcgY2FydFwiKTtcbiAgICB9XG5cbiAgICBhZGRJdGVtVG9DYXJ0KHNrdSl7XG5cbiAgICB9XG5cbiAgICByZW1vdmVJdGVtRnJvbUNhcnQoc2t1KXtcbiAgIC8vIHJlcGxhY2UgdmFsdWUgb2Ygc2Vzc2lvbiBkYXRhLXNrdSBxdWFudGl0eSB3aXRoIG51bGwvL1xuXG4gICAgfVxuXG4gICAgdXBkYXRlUXVhbnRpdHlvZkl0ZW1JbkNhcnQoc2t5LHF0eSl7XG5cbiAgICB9XG5cbiAgICBjbGVhckNhcnQoKXtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgLy8gY2xlYXIgdGhlIGVudGlyZSBjYXJ0XG4gICAgfVxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TaG9wcGluZ0NhcnQuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);