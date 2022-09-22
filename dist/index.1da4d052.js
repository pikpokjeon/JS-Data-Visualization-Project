// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"iIlfu":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "a3334c4b1da4d052";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"iTPM8":[function(require,module,exports) {
// !TODO : dynamically import when this project is ran by parcel
// import 'regenerator-runtime/runtime' // parcel async/await 에러 해결
var _storeJs = require("./store.js");
var _generateJs = require("./generate.js");
var _updateJs = require("./update.js");
var _eventJs = require("./event.js");
var _definitionJs = require("./definition.js");
var _pipelineJs = require("./pipeline.js");
var _helperJs = require("./helper.js");
const resizeChart = (props, Use)=>(e)=>{
        const _ = Use(props);
        const { width  } = main.getBoundingClientRect();
        const w = width;
        (0, _storeJs.Publish)(_.inputStore, {
            w: width - 100
        });
    };
const initSetPathGroup = (props, Use)=>(a, d)=>{
        const _ = Use(props);
        const { lineType , w  } = _.inputStore;
        const { stop0 , stop1 , stop2 , stop3 , fill , fillG , fillBG , frame , fillPath , pathDefs , path , pathShadow , blur , lineShadow  } = _.$.initPathSVG;
        (0, _helperJs.appendAll)({
            stop0,
            stop1,
            stop2,
            stop3
        }).to(fill);
        props = [
            ...props,
            w,
            d
        ];
        (0, _updateJs.updatePathGroup)(props, Use)(lineType)(w, d);
        (0, _helperJs.appendAll)({
            blur
        }).to(lineShadow);
        (0, _helperJs.appendAll)({
            fillPath
        }).to(frame);
        (0, _helperJs.appendAll)({
            fill,
            frame,
            lineShadow
        }).to(pathDefs);
        (0, _updateJs.updateAll)([
            [
                fillBG,
                {
                    width: w,
                    y: -100
                }
            ],
            [
                pathShadow,
                {
                    filter: "url(#lineShadow)",
                    style: `stroke: #373205, stroke-width:10`,
                    opacity: 1
                }
            ]
        ]);
        (0, _helperJs.appendAll)({
            fillBG
        }).to(fillG);
        (0, _helperJs.appendAll)({
            pathDefs,
            fillG,
            path,
            pathShadow
        }).to(_.$.initSVG["group"]);
    };
// const initTooltipMsg = (props, Use) => (w, d) =>
// {
//     const _ = Use(props)
//     console.log(_)
//     const { msgBlur, msgDefs, msgFilter } = _.$.initPathSVG
//     const { avg, avgV, max, maxV, min, minV, per, perV, msgBox, msgShadow, msgGroup } = _.$.msgSVG
//     updateAll(
//         [
//             [avg, { y: 30 }, 'average'],
//             [max, { y: 60 }, 'max'],
//             [min, { y: 90 }, 'min'],
//             [per, { y: 120 }, 'per'],
//             [avgV, { y: 30, x: 110 }, 'averageV '],
//             [maxV, { y: 60, x: 110 }, 'maxV'],
//             [minV, { y: 90, x: 110 }, 'minV'],
//             [perV, { y: 120, x: 110 }, 'perV'],
//         ])
//     updateAll(
//         [
//             [msgFilter, { width: 200, height: 200 }],
//             [msgBlur, { stdDeviation: '10' }]
//         ]
//     )
//     appendAll({ msgBlur }).to(msgFilter)
//     appendAll({ msgFilter }).to(msgDefs)
//     appendAll({ msgBox, msgShadow, avg, avgV, max, maxV, min, minV, per, perV, }).to(msgGroup)
//     appendAll({ msgDefs, msgGroup }).to(_.$.initSVG['msgG'])
// }
const initSVGLists = (idList, list)=>list.reduce((obj, cur)=>{
        const [svgGroup, groupName] = [
            cur.from,
            cur.as
        ];
        const initList = (0, _generateJs.genSvgList)(`${svgGroup}`).setID(idList);
        initList[Symbol.toStringTag] = groupName;
        Object.assign(obj, {
            [groupName]: initList
        });
        return obj;
    }, {});
const initSVGElements = (obj)=>Object.entries(obj).reduce((elStore, cur)=>{
        const [name, list] = [
            cur[0],
            cur[1]
        ];
        const { w , d  } = (0, _storeJs.inputStore);
        const tempEls = (0, _generateJs.genSvgFromList)(list, w, d).named(name);
        elStore[Symbol.toStringTag] = "$";
        Object.assign(elStore, {
            [name]: {
                ...tempEls
            }
        });
        return elStore;
    }, {});
const initSVGListObj = initSVGLists((0, _definitionJs.svgIdList), [
    {
        from: "singleSVG",
        as: "initSVG"
    },
    {
        from: "pathGroup",
        as: "initPathSVG"
    },
    {
        from: "tooltipMsgGroup",
        as: "msgSVG"
    }, 
]);
const initParams = [
    resizeChart,
    (0, _helperJs.inputData),
    (0, _helperJs._id),
    (0, _helperJs._name),
    (0, _helperJs.appendAll),
    (0, _generateJs.genSize),
    (0, _generateJs.genElement),
    (0, _pipelineJs.getElement),
    (0, _generateJs.genAttr),
    (0, _updateJs.updateAttr),
    (0, _updateJs.updateAll),
    (0, _storeJs.Publish),
    (0, _storeJs.inputStore),
    (0, _storeJs.chartStore),
    (0, _storeJs.optionStore),
    (0, _eventJs.onMove),
    (0, _eventJs.onChangeInput),
    (0, _eventJs.onChangeLineType),
    (0, _updateJs.updatePath),
    (0, _updateJs.updateTexts),
    (0, _updateJs.updateTooltip),
    (0, _updateJs.updateDataInputBox),
    (0, _updateJs.updateTooltipMsg),
    (0, _generateJs.genSvgList),
    (0, _generateJs.genPath),
    initSVGElements(initSVGListObj),
    initSetPathGroup,
    (0, _generateJs.genSvgFromList),
    (0, _definitionJs.DOMEventAttr),
    (0, _definitionJs.svgDefinition),
    (0, _helperJs.appendAll),
    (0, _updateJs.updatePathGroup),
    (0, _eventJs.setEvents),
    (0, _generateJs.genRandomChartData),
    (0, _pipelineJs.pipe),
    (0, _helperJs.getLineType)
];
const init = (props, Use)=>{
    const _ = Use(props);
    const resizeChartEvent = resizeChart(props, Use);
    window.addEventListener("resize", resizeChartEvent);
    let { w , d , dLabel  } = _.inputStore;
    const { lineType  } = _.optionStore;
    dLabel = d.map((_, i)=>2010 + i);
    (0, _storeJs.Publish)(_.inputStore, {
        w: w,
        d: d,
        dLabel: d.map((_, i)=>2010 + i)
    });
    const [svgArea, svg] = [
        (0, _helperJs._id)("svg-area"),
        _.$.initSVG["svg"]
    ];
    (0, _helperJs._id)("data-list").value = d.join(",");
    svgArea.appendChild(svg);
    delete _.$.initSVG["svg"];
    const onMoveprops = [
        (0, _updateJs.updateAttr),
        (0, _generateJs.genSize),
        (0, _generateJs.genAttr),
        (0, _helperJs._id),
        _.$,
        _.$.initSVG,
        _.$.initPathSVG,
        (0, _helperJs.inputData),
        (0, _eventJs.setEvents),
        (0, _storeJs.Publish),
        (0, _storeJs.chartStore),
        (0, _storeJs.inputStore),
        (0, _storeJs.optionStore)
    ];
    const mouseOn = ()=>{
        svg.addEventListener("mousemove", (0, _eventJs.onMove)(onMoveprops, Use));
    };
    const mouseOut = ()=>{
        svg.removeEventListener("mousemove", (0, _eventJs.onMove)(onMoveprops, Use));
    };
    _.DOMEventAttr["svg"] = _.DOMEventAttr["svg"].map((e)=>{
        if (e.event === "mouseenter") e.func = mouseOn;
        if (e.event === "mouseleave") e.func = mouseOut;
        return e;
    });
    (0, _helperJs.appendAll)(_.$.initSVG).to(svg);
    _.$.initSVG = {
        svg,
        ..._.$.initSVG
    };
    (0, _eventJs.setEvents)(props, Use).addAll(_.DOMEventAttr);
    (0, _updateJs.updateTooltip)(props, Use)(w, d, dLabel);
    (0, _updateJs.updateTooltipMsg)(props, Use)(w, d);
    if (lineType) initSetPathGroup(props, Use)(w, d);
};
init(initParams, (0, _helperJs.copyParams));

},{"./store.js":"l1o1w","./generate.js":"74vEP","./update.js":"jHqHu","./event.js":"fgkuj","./definition.js":"iAAnT","./pipeline.js":"9r3NM","./helper.js":"8X4G4"}],"l1o1w":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "chartStore", ()=>chartStore);
parcelHelpers.export(exports, "inputStore", ()=>inputStore);
parcelHelpers.export(exports, "optionStore", ()=>optionStore);
parcelHelpers.export(exports, "Publish", ()=>Publish);
const chartStore = {
    lastIdx: -1,
    x: -1,
    selectedStartIdx: -1,
    selectedEndIdx: -1,
    selectedIdx: [
        -1,
        -1
    ],
    selectedRangeData: [],
    unitToShow: 1,
    unitGap: -1,
    memo: [],
    isStreaming: false
};
chartStore[Symbol.toStringTag] = "chartStore";
const inputStore = {
    w: 1400,
    d: [
        0,
        230,
        120,
        -450,
        -200,
        1600,
        0,
        600,
        -1500,
        200,
        0,
        -1200,
        -800,
        800,
        0
    ],
    d_label: -1,
    d_memo: -1,
    lineType: "default"
};
inputStore[Symbol.toStringTag] = "inputStore";
const optionStore = {
    fullRangeLine: true,
    isFocusLine: true,
    isTooltip: true,
    isTooltipBox: true,
    barType: false,
    lineType: true,
    plotType: false,
    barDefault: true,
    contrast: false,
    plotDefault: true,
    volume: false
};
optionStore[Symbol.toStringTag] = "optionStore";
/**
 * 
 * @param {*} store 데이터를 등록 할 대상 객체 
 * @param {*} obj  등록할 데이터 객체
 */ const Publish = (store, obj)=>{
    for (const [key, value] of Array.from(Object.entries(obj)))Reflect.set(store, key, value);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"74vEP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "genAttr", ()=>genAttr);
parcelHelpers.export(exports, "genSize", ()=>genSize);
parcelHelpers.export(exports, "genPath", ()=>genPath);
parcelHelpers.export(exports, "genElement", ()=>genElement);
parcelHelpers.export(exports, "genSvgFromList", ()=>genSvgFromList);
parcelHelpers.export(exports, "genSvgList", ()=>genSvgList);
parcelHelpers.export(exports, "genRandomChartData", ()=>genRandomChartData);
var _definitionJs = require("./definition.js");
var _pipelineJs = require("./pipeline.js");
var _updateJs = require("./update.js");
const genSize = (w, d)=>{
    const [height, margin] = [
        250,
        100
    ];
    const unitX = (w - margin) / d.length;
    const gap = unitX / d.length;
    const [maxData, minData] = [
        Math.max(...Array.from(d)),
        Math.min(...Array.from(d))
    ];
    const MAX = Math.max(maxData, Math.abs(minData));
    const SUM = maxData + Math.abs(minData);
    const unitY = height / MAX;
    return {
        d: d.length,
        gap,
        unitX,
        unitY,
        margin,
        MAX,
        SUM,
        maxData,
        minData,
        leftMargin: 155,
        width: w,
        eventArea: {
            width: w,
            height: 750
        },
        data: {
            text: {
                width: 30,
                height: 50
            }
        },
        msgBox: {
            width: 200,
            height: 150
        },
        line: 1,
        x: (i)=>Math.floor(unitX * i) + margin,
        y: (v)=>margin + (MAX - v) * unitY,
        idx: (x)=>Math.floor((x - w / d.length) / unitX)
    };
};
const genElement = (type, attr, animate)=>{
    type = document.createElementNS("http://www.w3.org/2000/svg", type);
    for (const [t, v] of Object.entries(attr))type.setAttributeNS(null, t, v);
    return type;
};
const genAttr = (w, d, i, v)=>{
    const s = genSize(w, d);
    const h = s.eventArea.height;
    const color = {
        bg: "#141d31",
        default: "white",
        focus: "red",
        purple: "#9f57ff",
        blue: "#00f3ff"
    };
    const style = {
        line: `stroke: ${color.default}; stroke-width: ${s.line};`,
        opacity: (n)=>`opacity: ${n}`
    };
    const svg = {
        width: w,
        height: h,
        style: `overflow:visible, ${style.opacity(0.8)}`
    };
    const list = {
        g: {
            width: w,
            height: h,
            style: "overflow:visible"
        },
        gBox: {},
        path: {
            stroke: color.default,
            fill: "transparent",
            strokeWidth: 10
        },
        focusLine: {
            attributeName: "stroke-width",
            attributeType: "XML",
            values: "3;1;3;1",
            dur: "2s",
            repeatCount: "5"
        },
        moveX: {
            x1: s.x(i),
            x2: s.x(i)
        },
        moveY: {
            y1: s.y(i),
            y2: s.y(i)
        },
        eventArea: {
            ...svg,
            style: style.opacity(0.2)
        },
        lineH: {
            x1: 0,
            y1: s.y(v),
            x2: s.width,
            y2: s.y(v),
            style: style.line + style.opacity(0.3)
        },
        lineV: {
            x1: s.x(i),
            y1: -h,
            x2: s.x(i),
            y2: h * 2,
            style: style.line
        },
        borderLine: {
            x1: s.x(i),
            y1: -h,
            x2: s.x(i),
            y2: h * 2,
            style: style.line + " stroke-dasharray:5,5;" + style.opacity(0.5)
        },
        label: {
            x: s.x(i),
            y: h - 30,
            fill: color.default,
            "dominant-baseline": "start",
            "text-anchor": "middle",
            "font-family": "Roboto"
        },
        dataText: {
            x: 40,
            y: s.y(v),
            fill: color.default,
            "dominant-baseline": "end",
            "text-anchor": "middle",
            "font-family": "Roboto"
        },
        plot: {
            cx: s.x(i),
            cy: s.y(v),
            r: 5,
            fill: "white"
        },
        stop0: {
            offset: "0%",
            style: "stop-color: #9bffc9; stop-opacity: 1"
        },
        stop1: {
            offset: "30%",
            style: "stop-color: white; stop-opacity: 0.8"
        },
        stop2: {
            offset: "50%",
            style: "stop-color: #00f0ff; stop-opacity: 0.2"
        },
        stop3: {
            offset: "100%",
            style: "stop-color:#4b00ff; stop-opacity: 0"
        },
        linearGradient: {
            //fill
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "100%"
        },
        fillG: {
            "clip-path": "url(#frame)"
        },
        fillBG: {
            x: 0,
            y: 700,
            width: w,
            height: 700,
            fill: "url(#fill)"
        },
        clipPath: {
        },
        fillPath: {
            // filter: 'url(#lineShadow)',
            fill: color.default
        },
        defs: {},
        filter: {
            x: "0",
            y: "-10",
            width: "14",
            height: "14"
        },
        feGaussianBlur: {
            stdDeviation: "2.5"
        },
        msgTitle: {
            x: 30,
            y: 30,
            fill: color.default,
            "dominant-baseline": "start",
            "text-anchor": "start",
            "font-family": "Roboto"
        },
        msgValue: {
            x: 70,
            y: 30,
            fill: color.default,
            "dominant-baseline": "start",
            "text-anchor": "start",
            "font-family": "Roboto"
        },
        msgBox: {
            x: 0,
            y: 0,
            width: s.msgBox.width,
            height: s.msgBox.height,
            fill: color.bg,
            style: "opacity:0.65;stroke:black;stroke-width:1"
        },
        msgShadow: {
            x: 0,
            y: 0,
            width: s.msgBox.width,
            height: s.msgBox.height,
            fill: "black",
            filter: "url(#msgFilter)",
            style: "opacity:0.4",
            stroke: 1
        },
        msgGroup: {
            transform: `translate(100,100)`
        },
        bar: {
            x: s.x(i),
            y: s.y(v),
            width: 7,
            height: 10,
            fill: color.default,
            rx: 10,
            ry: 10
        }
    };
    return {
        svg,
        color,
        style,
        ...list
    };
};
// const genElById = (w, d, i, v) => (attr,info,id) =>
// {
//     const el = getElement(w, d, i, v)(attr, info.type, id)
//     updateAttr(el, { id: id, name: info.name })
//     return el
// }
const genSvgFromList = (list, w, d, i, v)=>{
    const createdSVG = {};
    let temp = undefined;
    // ! TODO: need to simplify the logic
    for (const [name, info] of Object.values(list)){
        if (info.id) {
            if (Array.isArray(info.id)) {
                for (const id of info.id){
                    if (Array.isArray(info.attr)) for (const attr of info.attr){
                        temp = (0, _pipelineJs.getElement)(w, d, i, v)(attr, info.type, id);
                        (0, _updateJs.updateAttr)(temp, {
                            id: id,
                            name: info.name
                        });
                        createdSVG[attr] = temp;
                    }
                    else {
                        temp = (0, _pipelineJs.getElement)(w, d, i, v)(info.attr, info.type, id);
                        (0, _updateJs.updateAttr)(temp, {
                            id: id,
                            name: info.name
                        });
                        createdSVG[id] = temp;
                    }
                }
                continue;
            }
        }
        temp = (0, _pipelineJs.getElement)(w, d, i, v)(info.attr, info.type);
        (0, _updateJs.updateAttr)(temp, {
            id: info.id,
            name: info.name
        });
        createdSVG[name] = temp;
    }
    // createdSVG[Symbol.toStringTag] = name
    // return createdSVG
    return {
        named: (name)=>{
            createdSVG[Symbol.toStringTag] = name;
            return createdSVG;
        }
    };
};
/**
 * @param {*} d 차트 데이터배열
 * @param {*} type 라인타입
 * step 선 (x1,y1)((x1+x2)/2,y1)((x1+x2)/2,y2)(x2,y2)
 */ const genPath = (d, type)=>(size)=>{
        let prev = [];
        const path = d.reduce((acc, cur, i)=>{
            const [a, b] = [
                size.x(i),
                size.y(cur)
            ];
            const midX = (prev[0] + a) / 2;
            if (i > 0 && type !== "default") {
                acc += type === "step" ? ` ${midX} ${prev[1]}` : i === 1 ? `C ${midX} ${prev[1]}` : "S";
                acc += ` ${midX} ${b}`;
            }
            acc += ` ${a} ${b}`;
            prev = [
                a,
                b
            ];
            return acc;
        }, "M");
        return {
            path: path,
            fill: path + ` V 700 H 100Z`
        };
    };
const genSvgList = (target)=>{
    return {
        setID: (ids)=>Object.entries((0, _definitionJs.svgDefinition)(ids)[target])
    };
};
const genRandomChartData = (size)=>{
    const a = size.minData - Math.floor(1000 - Math.random() * 1000);
    const b = Math.floor(Math.random() * 1000);
    return (size.maxData + a + b) * 1.5;
};

},{"./definition.js":"iAAnT","./pipeline.js":"9r3NM","./update.js":"jHqHu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iAAnT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "svgDefinition", ()=>svgDefinition);
parcelHelpers.export(exports, "svgIdList", ()=>svgIdList);
parcelHelpers.export(exports, "DOMEventAttr", ()=>DOMEventAttr);
var _eventJs = require("./event.js");
const svgDefinition = (id)=>{
    const singleSVG = {
        svg: {
            type: "svg",
            attr: "svg",
            id: id.svg,
            name: id.svg
        },
        eventArea: {
            type: "rect",
            attr: "eventArea",
            id: id.eventArea,
            name: "eventArea"
        },
        lineH: {
            type: "line",
            attr: "lineH",
            id: id.lineH,
            name: "line"
        },
        lineV: {
            type: "line",
            attr: "lineV",
            id: id.lineV,
            name: "lineV"
        },
        borderLine: {
            type: "line",
            attr: "borderLine",
            id: id.borderLine,
            name: "line"
        },
        g: {
            type: "g",
            attr: "g",
            id: id.g,
            name: "g"
        }
    };
    singleSVG[Symbol.toStringTag] = "singleSVG";
    const tooltipGroup = {
        label: {
            type: "text",
            attr: "label",
            id: id.label,
            name: "label"
        },
        dataText: {
            type: "text",
            attr: "dataText",
            id: id.dataText,
            name: "dataText"
        },
        plot: {
            type: "circle",
            attr: "plot",
            id: id.plot,
            name: "plot"
        },
        gBox: {
            type: "g",
            attr: "g",
            id: id.gBox,
            name: "gBox"
        }
    };
    tooltipGroup[Symbol.toStringTag] = "tooltipGroup";
    const pathGroup = {
        stop: {
            type: "stop",
            attr: id.stop,
            id: id.stop,
            name: "stop"
        },
        linearGradient: {
            type: "linearGradient",
            attr: "linearGradient",
            id: id.linearGradient,
            name: "linearGradient"
        },
        fillG: {
            type: "g",
            attr: "fillG",
            id: id.fillG,
            name: "fillG"
        },
        fillBG: {
            type: "rect",
            attr: "fillBG",
            id: id.fillBG,
            name: "fillBG"
        },
        clipPath: {
            type: "clipPath",
            attr: "clipPath",
            id: id.clipPath,
            name: "clipPath"
        },
        fillPath: {
            type: "path",
            attr: "fillPath",
            id: id.fillPath,
            name: "fillPath"
        },
        defs: {
            type: "defs",
            attr: "defs",
            id: id.defs,
            name: "defs"
        },
        path: {
            type: "path",
            attr: "path",
            id: id.path,
            name: "path"
        },
        filter: {
            type: "filter",
            attr: "filter",
            id: id.filter,
            name: "filter"
        },
        feGaussianBlur: {
            type: "feGaussianBlur",
            attr: "feGaussianBlur",
            id: id.feGaussianBlur,
            name: "feGaussianBlur"
        }
    };
    pathGroup[Symbol.toStringTag] = "pathGroup";
    const tooltipMsgGroup = {
        msgTitle: {
            type: "text",
            attr: "msgTitle",
            id: id.msgTitle,
            name: "msgText"
        },
        msgValue: {
            type: "text",
            attr: "msgValue",
            id: id.msgValue,
            name: "msgText"
        },
        msgBox: {
            type: "rect",
            attr: "msgBox",
            id: id.msgBox,
            name: "msgBox"
        },
        msgShadow: {
            type: "rect",
            attr: "msgShadow",
            id: id.msgShadow,
            name: "msgShadow"
        },
        msgGroup: {
            type: "g",
            attr: "msgGroup",
            id: id.msgGroup,
            name: "msgGroup"
        }
    };
    tooltipMsgGroup[Symbol.toStringTag] = "tooltipMsgGroup";
    const barGroup = {
        bar: {
            type: "rect",
            attr: "bar",
            id: id.bar,
            name: "bar"
        }
    };
    barGroup[Symbol.toStringTag] = "barGroup";
    return {
        singleSVG,
        tooltipGroup,
        pathGroup,
        tooltipMsgGroup,
        barGroup
    };
};
svgDefinition[Symbol.toStringTag] = "svgDefinition";
/**
 * 하나의 요소에는 고유한 id값 하나를 가지기에,
 * 해당 요소를 여러개 만들어야 한다면, 복수로 나열해준다.
 */ const svgIdList = {
    svg: [
        "svg"
    ],
    eventArea: [
        "eventArea"
    ],
    fillBG: [
        "fillBG"
    ],
    lineH: [
        "lineH"
    ],
    lineV: [
        "lineV"
    ],
    g: [
        "g",
        "group",
        "msgG"
    ],
    path: [
        "path",
        "pathShadow"
    ],
    defs: [
        "pathDefs",
        "msgDefs"
    ],
    borderLine: [
        "left",
        "right"
    ],
    linearGradient: [
        "fill"
    ],
    clipPath: [
        "frame"
    ],
    stop: [
        "stop0",
        "stop1",
        "stop2",
        "stop3"
    ],
    fillPath: [
        "fillPath"
    ],
    filter: [
        "lineShadow",
        "msgFilter"
    ],
    feGaussianBlur: [
        "blur",
        "msgBlur"
    ],
    msgTitle: [
        "maxT",
        "minT",
        "avgT",
        "perT"
    ],
    msgValue: [
        "maxV",
        "minV",
        "avgV",
        "perV"
    ],
    msgBox: [
        "msgBox"
    ],
    msgShadow: [
        "msgShadow"
    ],
    msgGroup: [
        "msgGroup"
    ]
};
svgIdList[Symbol.toStringTag] = "svgIdList";
/**
 * 추가할 이벤트리스너 정의
 */ const DOMEventAttr = {
    "svg": [
        {
            event: "mouseenter",
            func: undefined,
            isAdded: false
        },
        {
            event: "mouseleave",
            func: undefined,
            isAdded: false
        },
        {
            event: "click",
            func: (0, _eventJs.onSelectPeriod),
            isAdded: false
        }
    ],
    "width": [
        {
            event: "input",
            func: (0, _eventJs.onChangeInput),
            isAdded: false
        }, 
    ],
    "data-list": [
        {
            event: "input",
            func: (0, _eventJs.onChangeInput),
            isAdded: false
        }, 
    ],
    "radio": [
        {
            event: "click",
            func: (0, _eventJs.onChangeLineType),
            isAdded: false
        }
    ],
    "add": [
        {
            event: "click",
            func: (0, _eventJs.onChangeInput),
            isAdded: false
        }
    ],
    "stream": [
        {
            event: "click",
            func: (0, _eventJs.startStream),
            isAdded: false
        }
    ],
    "checkbox": [
        {
            event: "click",
            func: (0, _eventJs.selectOption)("checkbox"),
            isAdded: false
        }
    ],
    "type-checkbox": [
        {
            event: "click",
            func: (0, _eventJs.selectOption)("type-checkbox"),
            isAdded: false
        }
    ],
    "bar-radio": [
        {
            event: "click",
            func: (0, _eventJs.selectOption)("bar-radio"),
            isAdded: false
        }
    ],
    "plot-radio": [
        {
            event: "click",
            func: (0, _eventJs.selectOption)("plot-radio"),
            isAdded: false
        }
    ]
};
DOMEventAttr[Symbol.toStringTag] = "DOMEventAttr";

},{"./event.js":"fgkuj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fgkuj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setEvents", ()=>setEvents);
parcelHelpers.export(exports, "onChangeLineType", ()=>onChangeLineType);
parcelHelpers.export(exports, "onChangeInput", ()=>onChangeInput);
parcelHelpers.export(exports, "onSelectPeriod", ()=>onSelectPeriod);
parcelHelpers.export(exports, "startStream", ()=>startStream);
parcelHelpers.export(exports, "onMove", ()=>onMove);
parcelHelpers.export(exports, "showTooltipMsg", ()=>showTooltipMsg);
parcelHelpers.export(exports, "selectOption", ()=>selectOption);
var _updateJs = require("./update.js");
/**
 * @param {*} list DOM에 적용할 DOMEventAttr 리스트
 * @param {*} event 삭제할 이벤트리스너 이름
 * @param {*} target 삭제할 이벤트리스너 대상
 */ const setEvents = (props, Use)=>{
    const _ = Use(props);
    const addAll = (list)=>Array.from(Object.entries(list)).reduce((acc, cur)=>{
            const [target, events] = [
                cur[0],
                cur[1]
            ];
            const _events = [];
            _._name(target).forEach((node)=>events.forEach((e)=>{
                    if (e.func) {
                        node.addEventListener(e.event, e.func(props, Use, target));
                        e.isAdded = true;
                    }
                    _events.push({
                        ...e
                    });
                }));
            return Object.assign(acc, Object.assign({}, {
                ...cur
            }));
        }, {
            ...list
        });
    return {
        addAll
    };
};
const onChangeLineType = (props, Use)=>(e)=>{
        const _ = Use(props);
        const typeNodeList = _._name("radio");
        const { w , d  } = _.inputStore;
        const lineType = _.getLineType(typeNodeList);
        _.Publish(_.inputStore, {
            lineType
        });
        props = [
            w,
            d,
            ...props
        ];
        _.updatePathGroup(props, Use)(lineType)(w, d);
        _.updateTooltip(props, Use)(w, d, d.map((e, i)=>2010 + i));
        return lineType;
    };
// d 입력배열, w 너비, radio 라인타입 사용자 입력값 업데이트 파이프라인
// 1. 데이터를 전부 가져옴
// 2. 데이터 변경시 업데이트가 이뤄져야 하는 부분 적용
// 3. 스토어에 데이터 업데이트
const onChangeInput = (props, Use, target)=>(e)=>{
        const _ = Use(props);
        const { w  } = _.inputStore;
        const d = _.inputData(_._id("data-list"));
        const { lineType  } = _.inputStore;
        const { isStreaming  } = _.chartStore;
        let d_label = _.inputData(_._id("data-list")).map((d, i)=>2010 + i);
        const memo = d.map((e)=>1);
        _.Publish(_.chartStore, {
            memo
        });
        const size = _.genSize(w, d);
        const random = _.genRandomChartData(size);
        const lastLabel = d_label[d_label.lenght - 1] + 1;
        if (target === "add" && !isStreaming) {
            d.push(Math.floor(random)), d_label.push(lastLabel);
            memo.push(1), _.Publish(_.chartStore, {
                memo
            });
            _.Publish(_.inputStore, {
                w,
                d,
                d_label
            });
        }
        let d_memo = d.map((e)=>1);
        // const [prev, cur] = [size.x(0), size.x(1)]
        const gap = (memo)=>{
            for(let i = 1; i < memo.length; i++)if (memo[i] === 1) {
                const [prev, cur] = [
                    size.x(0),
                    size.x(i)
                ];
                return cur - prev;
            }
        };
        function unit() {
            let count = 1;
            for(let i = 1; i < d_memo.length; i++){
                if (gap(d_memo) < 45) count += 1;
                else count -= 1;
                break;
            }
            return count;
        }
        console.log(gap(d_memo), unit());
        d_memo = d_memo.reduce((acc, cur, i)=>{
            // if (gap(d_memo) > 45) cur = 0
            // else if (i % unit() !== 0)
            // {
            //     cur = 1
            // }
            acc.push(cur);
            return acc;
        }, []);
        console.log(d_memo);
        props = [
            ...props,
            w,
            d
        ];
        _.Publish(_.inputStore, {
            w,
            d,
            d_label
        });
        _.updateDataInputBox(props, Use)(d);
        _.updateTooltip(props, Use)(w, d, d_label);
        _.updatePathGroup(props, Use)(lineType)(w, d);
    };
const resizeChart = ()=>{
    const { width  } = main.getBoundingClientRect();
};
const onSelectPeriod = (props, Use, target)=>(e)=>{
        const _ = Use(props);
        const { w , d  } = _.inputStore;
        const size = _.genSize(w, d);
        const attr = _.genAttr(w, d);
        const { lastIdx , selectedStartIdx , selectedEndIdx , selectedIdx  } = _.chartStore;
        const [x, y] = [
            size.x(lastIdx),
            size.y(d[lastIdx])
        ];
        const maxY = y + size.msgBox.height + size.data.text.height;
        const maxX = y + size.msgBox.width;
        const unit = y / d.length;
        const offsetY = maxY + size.data.text.height * 3 > 750 ? y - unit - size.msgBox.height : y + unit;
        const visibility = (v)=>({
                style: `visibility: ${v}`
            });
        if (selectedStartIdx < 0) {
            _.Publish(_.chartStore, {
                selectedStartIdx: lastIdx
            });
            _.updateAll([
                [
                    _.$.initPathSVG["fillBG"],
                    {
                        x: 0,
                        width: x
                    }
                ],
                [
                    _.$.initSVG["left"],
                    {
                        x1: x,
                        x2: x,
                        style: attr.borderLine.style
                    }
                ],
                [
                    _.$.msgSVG["msgGroup"],
                    {
                        transform: `translate(${x - size.msgBox.width / 2},${offsetY})`,
                        ...visibility("visible")
                    }, 
                ], 
            ]);
        } else if (selectedEndIdx < 0) {
            const [minIdx, maxIdx] = [
                Math.min(lastIdx, selectedStartIdx),
                Math.max(lastIdx, selectedStartIdx), 
            ];
            const selectedWidth = size.x(maxIdx) - size.x(minIdx);
            const [start, last] = [
                size.x(selectedStartIdx),
                size.idx(e.layerX)
            ];
            const isSelectReverse = last - maxIdx < 0;
            const [offsetX, reversedOffsetX] = [
                start + selectedWidth / 3,
                start - selectedWidth / 2, 
            ];
            _.Publish(_.chartStore, {
                selectedStartIdx: minIdx,
                selectedEndIdx: maxIdx
            });
            _.updateAll([
                [
                    _.$.initPathSVG["fillBG"],
                    {
                        x: isSelectReverse ? size.x(last) : start,
                        width: selectedWidth
                    }, 
                ],
                [
                    _.$.initSVG["left"],
                    {
                        x1: start,
                        x2: start
                    }
                ],
                [
                    _.$.initSVG["right"],
                    {
                        x1: isSelectReverse ? size.x(last) : start + selectedWidth,
                        x2: isSelectReverse ? size.x(last) : start + selectedWidth,
                        style: attr.borderLine.style
                    }, 
                ],
                [
                    _.$.msgSVG["msgGroup"],
                    {
                        transform: `translate(${isSelectReverse ? reversedOffsetX : offsetX},${offsetY})`,
                        style: `visibility: visible`
                    }, 
                ], 
            ]);
            (0, _updateJs.updateSelectedData)(props, Use)(d, minIdx, maxIdx);
            (0, _updateJs.updateTooltipMsg)(props, Use)(w, d);
        } else {
            _.Publish(_.chartStore, {
                selectedEndIdx: -1,
                selectedStartIdx: -1
            });
            const initializeAttr = {
                x1: -1,
                x2: -1,
                style: "display: none"
            };
            _.updateAll([
                [
                    _.$.initPathSVG["fillBG"],
                    {
                        width: _.inputStore["w"],
                        x: 0
                    }
                ],
                [
                    _.$.initSVG["left"],
                    {
                        ...initializeAttr
                    }
                ],
                [
                    _.$.initSVG["right"],
                    {
                        ...initializeAttr
                    }
                ],
                [
                    _.$.msgSVG["msgGroup"],
                    {
                        style: "visibility: hidden"
                    }
                ], 
            ]);
        }
    };
const startStream = (props, Use, target)=>(e)=>{
        const _ = Use(props);
        const [wth, main1] = [
            _._id("width"),
            _._id("main")
        ];
        let time = _.inputData(_._id("time"));
        let w = _.inputStore.w;
        let d = _.inputData(_._id("data-list"));
        let d_memo = d.map((e)=>1);
        let d_label = d.map((_, i)=>Number(2010) + i);
        const updateBox = ({ i , arr , arr_memo , arr_label , w , props  })=>new Promise((res)=>{
                arr_label.push(arr_label[arr_label.length - 1] + 1);
                arr_label.shift();
                props = [
                    ...props,
                    arr
                ];
                _.updateTooltip(props, Use)(w, arr, arr_label);
                return res({
                    i
                });
            });
        const checkIfTimeOver = ({ i  })=>{
            if (i >= time - 1) _.Publish(_.chartStore, {
                isStreaming: false
            });
        };
        const updateTargetToSort = (i, delay, round, random, arr, arr_memo, arr_label, w, props)=>new Promise((res)=>{
                return setTimeout(()=>{
                    const { lineType  } = _.inputStore;
                    arr.push(random);
                    d_memo.push(0);
                    arr.shift();
                    d_memo.shift();
                    props = [
                        ...props,
                        arr,
                        w
                    ];
                    _.updateDataInputBox(props, Use)(arr);
                    _.updatePathGroup(props, Use)(lineType)(w, arr);
                    res({
                        i,
                        delay,
                        round,
                        random,
                        arr,
                        d_memo,
                        arr_label,
                        w,
                        props
                    });
                }, delay * (i + 1));
            });
        const toDelayUpdate = async (i, delay, round, random, arr, arr_memo, arr_label, w, props)=>{
            await updateTargetToSort(i, delay, round, random, arr, arr_memo, arr_label, w, props).then(updateBox).then(checkIfTimeOver);
        };
        const stream = (time)=>{
            let temp_d = [
                ...d
            ];
            let round = -1;
            const size = _.genSize(w, d);
            _.Publish(_.chartStore, {
                isStreaming: true
            });
            for(let i = 0; i < time; i++){
                const random = _.genRandomChartData(size);
                props = [
                    w,
                    temp_d,
                    ...props
                ];
                round += 1;
                toDelayUpdate(i, 500, round, random, temp_d, d_memo, d_label, w, props);
            }
        };
        const { isStreaming  } = _.chartStore;
        if (!isStreaming) stream(time);
    };
const onMove = (props, Use, target)=>(e)=>{
        const _ = Use(props);
        const [w, d] = [
            _.inputStore["w"],
            _.inputData(_._id("data-list"))
        ];
        const size = _.genSize(w, d);
        const attr = _.genAttr(w, d);
        let idx = size.idx(e.layerX);
        let value = d[idx];
        let idxAfter = undefined;
        if (idx !== _.chartStore["lastIdx"]) {
            _.Publish(_.chartStore, {
                lastIdx: idx,
                x: e.layerX
            });
            if (value !== undefined) (0, _updateJs.updateAll)([
                [
                    _._id(`plot-${idx}${value}`),
                    {
                        fill: attr.color.purple
                    }
                ],
                [
                    _._id(`label-${idx}${value}`),
                    {
                        fill: attr.color.purple
                    }
                ],
                [
                    _._id(`data-${idx}${value}`),
                    {
                        fill: attr.color.purple
                    }
                ], 
            ]);
            idxAfter = size.idx(e.layerX);
            value = d[idxAfter];
        } else if (idx === idxAfter) (0, _updateJs.updateAll)([
            [
                _._id(`plot-${idx}${value}`),
                {
                    fill: "white"
                }
            ],
            [
                _._id(`label-${idx}${value}`),
                {
                    fill: "white"
                }
            ],
            [
                _._id(`data-${idx}${value}`),
                {
                    fill: "white"
                }
            ], 
        ]);
        if (_.optionStore["isFocusLine"]) _.updateAttr(_.$.initSVG["lineV"], {
            x1: e.layerX,
            x2: e.layerX
        });
        else _.updateAttr(_.$.initSVG["lineV"], {
            x1: -1,
            x2: -1
        });
    };
const showTooltipMsg = (props, Use)=>(e)=>{};
const selectOption = (type)=>(props, Use)=>(e)=>{
            const _ = Use(props);
            const selectedNodes = _._name(type);
            const { w , d  } = _.inputStore;
            Array.from(selectedNodes).reduce((options, cur)=>{
                const name = cur.value.split("-").reduce((words, word, i)=>{
                    let w = word.split("");
                    w[0] = i > 0 ? word[0].toUpperCase() : word[0].toLowerCase();
                    words += w.join("");
                    return words;
                }, "");
                Reflect.set(options, name, cur.checked);
                return options;
            }, _.optionStore);
            console.log(_.optionStore);
            onMove(props, Use)(e);
            _.updatePathGroup(props, Use)(_.inputStore["lineType"])(w, d);
            _.updateTooltip(props, Use)(w, d, d.map((_, i)=>2010 + i));
        };

},{"./update.js":"jHqHu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jHqHu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "updateAttr", ()=>updateAttr);
parcelHelpers.export(exports, "updateAll", ()=>updateAll);
parcelHelpers.export(exports, "updatePath", ()=>updatePath);
parcelHelpers.export(exports, "updatePathGroup", ()=>updatePathGroup);
parcelHelpers.export(exports, "updateTooltip", ()=>updateTooltip);
parcelHelpers.export(exports, "updateDataInputBox", ()=>updateDataInputBox);
parcelHelpers.export(exports, "updateTooltipMsg", ()=>updateTooltipMsg);
parcelHelpers.export(exports, "updateSelectedData", ()=>updateSelectedData);
var _utilsJs = require("./utils.js");
const updateAttr = (el, attr, text)=>{
    for (const [t, v] of Object.entries(attr))el.setAttribute(t, v);
    if ((0, _utilsJs.Is)["string"](text)) el.textContent = text;
    return el;
};
const updateAll = (...updates)=>{
    for (const [el, attr, text] of Array.from(...updates))updateAttr(el, attr, text);
};
const updatePath = (el, d)=>el.setAttribute("d", `${d}`);
const updateDataInputBox = (props, Use)=>(d)=>{
        const _ = Use(props);
        _._id("data-list").value = `${d}`;
    };
// Pathgroup 배열이나 객체를 넘기도록 변경
const updatePathGroup = (props, Use)=>(type)=>(w, d)=>{
            const _ = Use(props);
            const size = _.genSize(w, d);
            const genPath = _.genPath(d, type)(size);
            const { lineType  } = _.optionStore;
            const { path , pathShadow , fillPath  } = _.$.initPathSVG;
            _.updatePath(path, genPath.path);
            _.updatePath(pathShadow, genPath.path);
            _.updatePath(fillPath, genPath.fill);
            if (!lineType) {
                const hidden = {
                    style: "visibility:hidden"
                };
                _.updateAll([
                    [
                        path,
                        hidden
                    ],
                    [
                        pathShadow,
                        hidden
                    ],
                    [
                        fillPath,
                        hidden
                    ], 
                ]);
            } else _.updateAll([
                [
                    path,
                    {
                        style: "visibility:visible"
                    }
                ],
                [
                    pathShadow,
                    {
                        style: "visibility:visible"
                    }
                ],
                [
                    fillPath,
                    {
                        style: "visibility:visible"
                    }
                ], 
            ]);
        };
const updateTooltip = (props, Use)=>(w, d, dLabel)=>{
        const _ = Use(props);
        const g = _.$.initSVG["g"];
        const size = _.genSize(w, d);
        const { barType , plotType , barDefault , contrast , volume  } = _.optionStore;
        const temp = [
            ...d
        ];
        const sorted = temp.sort((a, b)=>a - b);
        const data_memo = sorted.reduce((prev, cur, i)=>{
            if (i === 0) prev.push(cur);
            else {
                for(let idx = i; idx > -1; idx--)if (prev[idx] !== null) {
                    if (Math.abs(prev[idx] - Math.abs(cur)) < 130) prev[idx] = null;
                    break;
                }
            }
            return prev;
        }, [
            ...temp
        ]);
        while(g.firstChild)g.removeChild(g.firstChild);
        let prevData = -1;
        for (const [i, value] of Array.from(Object.entries(d))){
            const [t1id, t2id, pid, gid, bid] = [
                "label",
                "data",
                "plot",
                "g",
                "bar"
            ].map((e)=>`${e}-${i}${value}`);
            const list = _.genSvgList("tooltipGroup").setID({
                gBox: gid,
                label: t1id,
                dataText: t2id,
                plot: pid
            });
            const list2 = _.genSvgList("barGroup").setID({
                bar: bid
            });
            const { plot , label , gBox , dataText  } = _.genSvgFromList(list, w, d, i, value).named("tooltipSVG");
            const { bar  } = _.genSvgFromList(list2, w, d, i, value).named("barSVG");
            updateAttr(bar, {
                id: bid
            });
            label.textContent = dLabel[i];
            dataText.textContent = value;
            const gap = size.y(value) - prevData;
            if (barType) {
                if (gap > 0) updateAttr(bar, {
                    fill: "#003cff",
                    y: prevData
                });
                else updateAttr(bar, {
                    fill: "#ff007bf7"
                });
                if (i > 0 && contrast) updateAttr(bar, {
                    height: Math.abs(gap)
                });
                else if (i > 0 && barDefault) {
                    const h = Math.abs(gap);
                    updateAttr(bar, {
                        width: size.gap * 7,
                        height: h,
                        y: 700 - h,
                        x: size.x(i) - size.gap * 3.5
                    });
                }
                gBox.appendChild(bar);
            }
            if (plotType) {
                if (volume) {
                    const max = size.y(size.MAX);
                    const unit = Math.abs(max - size.y(value) / 10);
                    updateAttr(plot, {
                        r: unit * unit / max
                    });
                }
            }
            prevData = size.y(value);
            _.appendAll({
                label,
                dataText,
                plot
            }).to(gBox);
            if (!_.optionStore["isTooltip"] && g.firstChild) updateAttr(plot, {
                style: "visibility:hidden"
            });
            else updateAttr(plot, {
                style: "visibility:visible"
            });
            gBox.appendChild(plot);
            g.appendChild(gBox);
        }
    };
const updateSelectedData = (props, Use)=>(d, minIdx, maxIdx)=>{
        const _ = Use(props);
        const rangeArr = d.filter((_, i)=>i >= minIdx && i <= maxIdx);
        const [min, max] = [
            Math.min(...rangeArr),
            Math.max(...rangeArr)
        ];
        const avg = Math.floor(rangeArr.reduce((acc, cur)=>acc + cur) / rangeArr.length);
        const [startData, endData] = [
            rangeArr[0] === 0 ? 1 : rangeArr[0],
            rangeArr[rangeArr.length - 1] === 0 ? 1 : rangeArr[rangeArr.length - 1]
        ];
        const rangePer = Math.floor(endData * 100 / (endData + startData));
        const data = {
            rangeArr,
            min,
            max,
            avg,
            startData,
            endData,
            rangePer
        };
        _.Publish(_.chartStore, {
            selectedRangeData: data
        });
    };
const updateTooltipMsg = (props, Use)=>(w, d)=>{
        const _ = Use(props);
        const { msgBlur , msgDefs , msgFilter  } = _.$.initPathSVG;
        const { avgT , avgV , maxT , maxV , minT , minV , perT , perV , msgBox , msgShadow , msgGroup  } = _.$.msgSVG;
        const { selectedRangeData  } = _.chartStore;
        const { rangeArr , min , max , avg , startData , endData , rangePer  } = selectedRangeData;
        _.updateAll([
            [
                avgT,
                {
                    y: 30
                },
                "avg"
            ],
            [
                maxT,
                {
                    y: 60
                },
                "max"
            ],
            [
                minT,
                {
                    y: 90
                },
                "min"
            ],
            [
                perT,
                {
                    y: 120
                },
                "per"
            ],
            [
                avgV,
                {
                    y: 30,
                    x: 110
                },
                avg ?? "Select Range"
            ],
            [
                maxV,
                {
                    y: 60,
                    x: 110
                },
                max
            ],
            [
                minV,
                {
                    y: 90,
                    x: 110
                },
                min
            ],
            [
                perV,
                {
                    y: 120,
                    x: 110
                },
                rangePer + "%"
            ], 
        ]);
        _.updateAll([
            [
                msgFilter,
                {
                    width: 200,
                    height: 200
                }
            ],
            [
                msgBlur,
                {
                    stdDeviation: "10"
                }
            ]
        ]);
        _.appendAll({
            msgBlur
        }).to(msgFilter);
        _.appendAll({
            msgFilter
        }).to(msgDefs);
        _.appendAll({
            msgBox,
            msgShadow,
            avgT,
            avgV,
            maxT,
            maxV,
            minT,
            minV,
            perT,
            perV
        }).to(msgGroup);
        _.appendAll({
            msgDefs,
            msgGroup
        }).to(_.$.initSVG["msgG"]);
    };

},{"./utils.js":"cjCpq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cjCpq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Is", ()=>Is);
const typeOf = [
    "number",
    "function",
    "string",
    "undefined",
    "symbol",
    "object"
];
const initType = {
    array: (d)=>Array.isArray(d),
    null: (d)=>d === null,
    svg: (svg)=>svg instanceof SVGElement,
    html: (el)=>/<\/?[a-z][\s\S]*>/i.test(el)
};
const Is = typeOf.reduce((typeObj, type)=>Object.assign(typeObj, {
        [type]: (d)=>typeof d === type
    }), {
    ...initType
}) // true
 // const a = is['array']( [2, 3, 4, 5,] )
;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9r3NM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// 앨리먼트 생성 트리 구조 변경 해보기
parcelHelpers.export(exports, "getElement", ()=>getElement);
parcelHelpers.export(exports, "pipe", ()=>pipe);
var _generateJs = require("./generate.js");
// 함수 파일 이동 해야 함
const getElement = (w, arr, i, v)=>(target, type)=>(0, _generateJs.genElement)(type, (0, _generateJs.genAttr)(w, arr, i, v)[target]);
const pipe = (initVal, ...fns)=>fns.reduce((returned, fn)=>fn(returned), initVal);

},{"./generate.js":"74vEP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8X4G4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "appendAll", ()=>appendAll);
parcelHelpers.export(exports, "inputData", ()=>inputData);
parcelHelpers.export(exports, "copyParams", ()=>copyParams);
/**
 * DOM Selector
 */ const _id = (id)=>document.getElementById(id);
const _name = (name)=>document.getElementsByName(name);
const _class = (className, target)=>target ? target.getElementsByClassName(className) : document.getElementsByClassName(className);
/**
 * Check if its not attribute
 * @param {*} value It could be either attribute or element
 */ const isChildren = (value)=>Array.isArray(value) || typeof value === "string" || "nodeName" in value || "tagName" in value;
/**
 * Predefined DOM constructor creation helper function
 * It returns an element constructor 
 * ends up creatin elements in the DOM tree
 */ /**
 * 
 * @param {*} type SVG or HTML
 * @param {*} tag 
 * @param {*} defaultProps 
 */ const alias = (type)=>(tag, defaultProps)=>{
        const cons = (attr, children)=>{
            isChildren(attr);
        };
    };
const gatherElement = (type)=>(el, children)=>{
        if (children === undefined) return el;
        if (!Array.isArray(children)) children = [
            children
        ];
        for (const c of children){
            // c is a string content like in p, span or button
            if (typeof c === "string") el.appendChild(document.createTextNode(c));
            else if (Array.isArray(c)) withElement(el, c);
            else el.appendChild(c);
        }
        return el;
    };
/**
 * Pipeline function that
 * creates an actual DOM element
 */ /**
 * @param {*} list 추가할 복수의 svg 요소
 * @param {*} target 타겟이 되는 요소
 */ const appendAll = (list)=>{
    return {
        to: (target)=>{
            for (const [key, el] of Object.entries(list))target.appendChild(el);
        }
    };
};
let inputData = (el)=>{
    return el.value.indexOf(",") > -1 ? el.value.split(",").map((_)=>Number(_)) : Number(el.value);
};
/**
 * @param {*} params 여러 함수에서 공통적으로 사용할 함수, 요소, 변수들의 변경사항을 복사
 */ const copyParams = (params)=>{
    const copied = {};
    for (const variable of params){
        if (typeof variable === "number") copied["w"] = variable;
        else if (Array.isArray(variable)) copied["d"] = variable;
        else if (variable[Symbol.toStringTag]) copied[variable[Symbol.toStringTag]] = variable;
        else if (variable.name === undefined) copied[variable.tagName] = variable;
        else if (typeof variable === "function") copied[variable.name] = variable;
    }
    return copied;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["iIlfu","iTPM8"], "iTPM8", "parcelRequire5dbf")

//# sourceMappingURL=index.1da4d052.js.map
