// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/transition/barba.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = e() : "function" == typeof define && define.amd ? define("Barba", [], e) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.Barba = e() : t.Barba = e();
}(this, function () {
  return function (t) {
    function e(r) {
      if (n[r]) return n[r].exports;
      var i = n[r] = {
        exports: {},
        id: r,
        loaded: !1
      };
      return t[r].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports;
    }

    var n = {};
    return e.m = t, e.c = n, e.p = "http://localhost:8080/dist", e(0);
  }([function (t, e, n) {
    "function" != typeof Promise && (window.Promise = n(1));
    var r = {
      version: "1.0.0",
      BaseTransition: n(4),
      BaseView: n(6),
      BaseCache: n(8),
      Dispatcher: n(7),
      HistoryManager: n(9),
      Pjax: n(10),
      Prefetch: n(13),
      Utils: n(5)
    };
    t.exports = r;
  }, function (t, e, n) {
    (function (e) {
      !function (n) {
        function r() {}

        function i(t, e) {
          return function () {
            t.apply(e, arguments);
          };
        }

        function o(t) {
          if ("object" != _typeof(this)) throw new TypeError("Promises must be constructed via new");
          if ("function" != typeof t) throw new TypeError("not a function");
          this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], h(t, this);
        }

        function s(t, e) {
          for (; 3 === t._state;) {
            t = t._value;
          }

          return 0 === t._state ? void t._deferreds.push(e) : (t._handled = !0, void l(function () {
            var n = 1 === t._state ? e.onFulfilled : e.onRejected;
            if (null === n) return void (1 === t._state ? a : c)(e.promise, t._value);
            var r;

            try {
              r = n(t._value);
            } catch (t) {
              return void c(e.promise, t);
            }

            a(e.promise, r);
          }));
        }

        function a(t, e) {
          try {
            if (e === t) throw new TypeError("A promise cannot be resolved with itself.");

            if (e && ("object" == _typeof(e) || "function" == typeof e)) {
              var n = e.then;
              if (e instanceof o) return t._state = 3, t._value = e, void u(t);
              if ("function" == typeof n) return void h(i(n, e), t);
            }

            t._state = 1, t._value = e, u(t);
          } catch (e) {
            c(t, e);
          }
        }

        function c(t, e) {
          t._state = 2, t._value = e, u(t);
        }

        function u(t) {
          2 === t._state && 0 === t._deferreds.length && l(function () {
            t._handled || p(t._value);
          });

          for (var e = 0, n = t._deferreds.length; e < n; e++) {
            s(t, t._deferreds[e]);
          }

          t._deferreds = null;
        }

        function f(t, e, n) {
          this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = n;
        }

        function h(t, e) {
          var n = !1;

          try {
            t(function (t) {
              n || (n = !0, a(e, t));
            }, function (t) {
              n || (n = !0, c(e, t));
            });
          } catch (t) {
            if (n) return;
            n = !0, c(e, t);
          }
        }

        var d = setTimeout,
            l = "function" == typeof e && e || function (t) {
          d(t, 0);
        },
            p = function p(t) {
          "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t);
        };

        o.prototype.catch = function (t) {
          return this.then(null, t);
        }, o.prototype.then = function (t, e) {
          var n = new this.constructor(r);
          return s(this, new f(t, e, n)), n;
        }, o.all = function (t) {
          var e = Array.prototype.slice.call(t);
          return new o(function (t, n) {
            function r(o, s) {
              try {
                if (s && ("object" == _typeof(s) || "function" == typeof s)) {
                  var a = s.then;
                  if ("function" == typeof a) return void a.call(s, function (t) {
                    r(o, t);
                  }, n);
                }

                e[o] = s, 0 === --i && t(e);
              } catch (t) {
                n(t);
              }
            }

            if (0 === e.length) return t([]);

            for (var i = e.length, o = 0; o < e.length; o++) {
              r(o, e[o]);
            }
          });
        }, o.resolve = function (t) {
          return t && "object" == _typeof(t) && t.constructor === o ? t : new o(function (e) {
            e(t);
          });
        }, o.reject = function (t) {
          return new o(function (e, n) {
            n(t);
          });
        }, o.race = function (t) {
          return new o(function (e, n) {
            for (var r = 0, i = t.length; r < i; r++) {
              t[r].then(e, n);
            }
          });
        }, o._setImmediateFn = function (t) {
          l = t;
        }, o._setUnhandledRejectionFn = function (t) {
          p = t;
        }, "undefined" != typeof t && t.exports ? t.exports = o : n.Promise || (n.Promise = o);
      }(this);
    }).call(e, n(2).setImmediate);
  }, function (t, e, n) {
    (function (t, r) {
      function i(t, e) {
        this._id = t, this._clearFn = e;
      }

      var o = n(3).nextTick,
          s = Function.prototype.apply,
          a = Array.prototype.slice,
          c = {},
          u = 0;
      e.setTimeout = function () {
        return new i(s.call(setTimeout, window, arguments), clearTimeout);
      }, e.setInterval = function () {
        return new i(s.call(setInterval, window, arguments), clearInterval);
      }, e.clearTimeout = e.clearInterval = function (t) {
        t.close();
      }, i.prototype.unref = i.prototype.ref = function () {}, i.prototype.close = function () {
        this._clearFn.call(window, this._id);
      }, e.enroll = function (t, e) {
        clearTimeout(t._idleTimeoutId), t._idleTimeout = e;
      }, e.unenroll = function (t) {
        clearTimeout(t._idleTimeoutId), t._idleTimeout = -1;
      }, e._unrefActive = e.active = function (t) {
        clearTimeout(t._idleTimeoutId);
        var e = t._idleTimeout;
        e >= 0 && (t._idleTimeoutId = setTimeout(function () {
          t._onTimeout && t._onTimeout();
        }, e));
      }, e.setImmediate = "function" == typeof t ? t : function (t) {
        var n = u++,
            r = !(arguments.length < 2) && a.call(arguments, 1);
        return c[n] = !0, o(function () {
          c[n] && (r ? t.apply(null, r) : t.call(null), e.clearImmediate(n));
        }), n;
      }, e.clearImmediate = "function" == typeof r ? r : function (t) {
        delete c[t];
      };
    }).call(e, n(2).setImmediate, n(2).clearImmediate);
  }, function (t, e) {
    function n() {
      h && u && (h = !1, u.length ? f = u.concat(f) : d = -1, f.length && r());
    }

    function r() {
      if (!h) {
        var t = s(n);
        h = !0;

        for (var e = f.length; e;) {
          for (u = f, f = []; ++d < e;) {
            u && u[d].run();
          }

          d = -1, e = f.length;
        }

        u = null, h = !1, a(t);
      }
    }

    function i(t, e) {
      this.fun = t, this.array = e;
    }

    function o() {}

    var s,
        a,
        c = t.exports = {};
    !function () {
      try {
        s = setTimeout;
      } catch (t) {
        s = function s() {
          throw new Error("setTimeout is not defined");
        };
      }

      try {
        a = clearTimeout;
      } catch (t) {
        a = function a() {
          throw new Error("clearTimeout is not defined");
        };
      }
    }();
    var u,
        f = [],
        h = !1,
        d = -1;
    c.nextTick = function (t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {
        e[n - 1] = arguments[n];
      }
      f.push(new i(t, e)), 1 !== f.length || h || s(r, 0);
    }, i.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, c.title = "browser", c.browser = !0, c.env = {}, c.argv = [], c.version = "", c.versions = {}, c.on = o, c.addListener = o, c.once = o, c.off = o, c.removeListener = o, c.removeAllListeners = o, c.emit = o, c.binding = function (t) {
      throw new Error("process.binding is not supported");
    }, c.cwd = function () {
      return "/";
    }, c.chdir = function (t) {
      throw new Error("process.chdir is not supported");
    }, c.umask = function () {
      return 0;
    };
  }, function (t, e, n) {
    var r = n(5),
        i = {
      oldContainer: void 0,
      newContainer: void 0,
      newContainerLoading: void 0,
      extend: function extend(t) {
        return r.extend(this, t);
      },
      init: function init(t, e) {
        var n = this;
        return this.oldContainer = t, this._newContainerPromise = e, this.deferred = r.deferred(), this.newContainerReady = r.deferred(), this.newContainerLoading = this.newContainerReady.promise, this.start(), this._newContainerPromise.then(function (t) {
          n.newContainer = t, n.newContainerReady.resolve();
        }), this.deferred.promise;
      },
      done: function done() {
        this.oldContainer.parentNode.removeChild(this.oldContainer), this.newContainer.style.visibility = "visible", this.deferred.resolve();
      },
      start: function start() {}
    };
    t.exports = i;
  }, function (t, e) {
    var n = {
      getCurrentUrl: function getCurrentUrl() {
        return window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
      },
      cleanLink: function cleanLink(t) {
        return t.replace(/#.*/, "");
      },
      xhrTimeout: 5e3,
      xhr: function xhr(t) {
        var e = this.deferred(),
            n = new XMLHttpRequest();
        return n.onreadystatechange = function () {
          if (4 === n.readyState) return 200 === n.status ? e.resolve(n.responseText) : e.reject(new Error("xhr: HTTP code is not 200"));
        }, n.ontimeout = function () {
          return e.reject(new Error("xhr: Timeout exceeded"));
        }, n.open("GET", t), n.timeout = this.xhrTimeout, n.setRequestHeader("x-barba", "yes"), n.send(), e.promise;
      },
      extend: function extend(t, e) {
        var n = Object.create(t);

        for (var r in e) {
          e.hasOwnProperty(r) && (n[r] = e[r]);
        }

        return n;
      },
      deferred: function deferred() {
        return new function () {
          this.resolve = null, this.reject = null, this.promise = new Promise(function (t, e) {
            this.resolve = t, this.reject = e;
          }.bind(this));
        }();
      },
      getPort: function getPort(t) {
        var e = "undefined" != typeof t ? t : window.location.port,
            n = window.location.protocol;
        return "" != e ? parseInt(e) : "http:" === n ? 80 : "https:" === n ? 443 : void 0;
      }
    };
    t.exports = n;
  }, function (t, e, n) {
    var r = n(7),
        i = n(5),
        o = {
      namespace: null,
      extend: function extend(t) {
        return i.extend(this, t);
      },
      init: function init() {
        var t = this;
        r.on("initStateChange", function (e, n) {
          n && n.namespace === t.namespace && t.onLeave();
        }), r.on("newPageReady", function (e, n, r) {
          t.container = r, e.namespace === t.namespace && t.onEnter();
        }), r.on("transitionCompleted", function (e, n) {
          e.namespace === t.namespace && t.onEnterCompleted(), n && n.namespace === t.namespace && t.onLeaveCompleted();
        });
      },
      onEnter: function onEnter() {},
      onEnterCompleted: function onEnterCompleted() {},
      onLeave: function onLeave() {},
      onLeaveCompleted: function onLeaveCompleted() {}
    };
    t.exports = o;
  }, function (t, e) {
    var n = {
      events: {},
      on: function on(t, e) {
        this.events[t] = this.events[t] || [], this.events[t].push(e);
      },
      off: function off(t, e) {
        t in this.events != !1 && this.events[t].splice(this.events[t].indexOf(e), 1);
      },
      trigger: function trigger(t) {
        if (t in this.events != !1) for (var e = 0; e < this.events[t].length; e++) {
          this.events[t][e].apply(this, Array.prototype.slice.call(arguments, 1));
        }
      }
    };
    t.exports = n;
  }, function (t, e, n) {
    var r = n(5),
        i = {
      data: {},
      extend: function extend(t) {
        return r.extend(this, t);
      },
      set: function set(t, e) {
        this.data[t] = e;
      },
      get: function get(t) {
        return this.data[t];
      },
      reset: function reset() {
        this.data = {};
      }
    };
    t.exports = i;
  }, function (t, e) {
    var n = {
      history: [],
      add: function add(t, e) {
        e || (e = void 0), this.history.push({
          url: t,
          namespace: e
        });
      },
      currentStatus: function currentStatus() {
        return this.history[this.history.length - 1];
      },
      prevStatus: function prevStatus() {
        var t = this.history;
        return t.length < 2 ? null : t[t.length - 2];
      }
    };
    t.exports = n;
  }, function (t, e, n) {
    var r = n(5),
        i = n(7),
        o = n(11),
        s = n(8),
        a = n(9),
        c = n(12),
        u = {
      Dom: c,
      History: a,
      Cache: s,
      cacheEnabled: !0,
      transitionProgress: !1,
      ignoreClassLink: "no-barba",
      start: function start() {
        this.init();
      },
      init: function init() {
        var t = this.Dom.getContainer(),
            e = this.Dom.getWrapper();
        e.setAttribute("aria-live", "polite"), this.History.add(this.getCurrentUrl(), this.Dom.getNamespace(t)), i.trigger("initStateChange", this.History.currentStatus()), i.trigger("newPageReady", this.History.currentStatus(), {}, t, this.Dom.currentHTML), i.trigger("transitionCompleted", this.History.currentStatus()), this.bindEvents();
      },
      bindEvents: function bindEvents() {
        document.addEventListener("click", this.onLinkClick.bind(this)), window.addEventListener("popstate", this.onStateChange.bind(this));
      },
      getCurrentUrl: function getCurrentUrl() {
        return r.cleanLink(r.getCurrentUrl());
      },
      goTo: function goTo(t) {
        window.history.pushState(null, null, t), this.onStateChange();
      },
      forceGoTo: function forceGoTo(t) {
        window.location = t;
      },
      load: function load(t) {
        var e,
            n = r.deferred(),
            i = this;
        return e = this.Cache.get(t), e || (e = r.xhr(t), this.Cache.set(t, e)), e.then(function (t) {
          var e = i.Dom.parseResponse(t);
          i.Dom.putContainer(e), i.cacheEnabled || i.Cache.reset(), n.resolve(e);
        }, function () {
          i.forceGoTo(t), n.reject();
        }), n.promise;
      },
      getHref: function getHref(t) {
        if (t) return t.getAttribute && "string" == typeof t.getAttribute("xlink:href") ? t.getAttribute("xlink:href") : "string" == typeof t.href ? t.href : void 0;
      },
      onLinkClick: function onLinkClick(t) {
        for (var e = t.target; e && !this.getHref(e);) {
          e = e.parentNode;
        }

        if (this.preventCheck(t, e)) {
          t.stopPropagation(), t.preventDefault(), i.trigger("linkClicked", e, t);
          var n = this.getHref(e);
          this.goTo(n);
        }
      },
      preventCheck: function preventCheck(t, e) {
        if (!window.history.pushState) return !1;
        var n = this.getHref(e);
        return !(!e || !n) && !(t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey) && (!e.target || "_blank" !== e.target) && window.location.protocol === e.protocol && window.location.hostname === e.hostname && r.getPort() === r.getPort(e.port) && !(n.indexOf("#") > -1) && (!e.getAttribute || "string" != typeof e.getAttribute("download")) && r.cleanLink(n) != r.cleanLink(location.href) && !e.classList.contains(this.ignoreClassLink);
      },
      getTransition: function getTransition() {
        return o;
      },
      onStateChange: function onStateChange() {
        var t = this.getCurrentUrl();
        if (this.transitionProgress && this.forceGoTo(t), this.History.currentStatus().url === t) return !1;
        this.History.add(t);
        var e = this.load(t),
            n = Object.create(this.getTransition());
        this.transitionProgress = !0, i.trigger("initStateChange", this.History.currentStatus(), this.History.prevStatus());
        var r = n.init(this.Dom.getContainer(), e);
        e.then(this.onNewContainerLoaded.bind(this)), r.then(this.onTransitionEnd.bind(this));
      },
      onNewContainerLoaded: function onNewContainerLoaded(t) {
        var e = this.History.currentStatus();
        e.namespace = this.Dom.getNamespace(t), i.trigger("newPageReady", this.History.currentStatus(), this.History.prevStatus(), t, this.Dom.currentHTML);
      },
      onTransitionEnd: function onTransitionEnd() {
        this.transitionProgress = !1, i.trigger("transitionCompleted", this.History.currentStatus(), this.History.prevStatus());
      }
    };
    t.exports = u;
  }, function (t, e, n) {
    var r = n(4),
        i = r.extend({
      start: function start() {
        this.newContainerLoading.then(this.finish.bind(this));
      },
      finish: function finish() {
        document.body.scrollTop = 0, this.done();
      }
    });
    t.exports = i;
  }, function (t, e) {
    var n = {
      dataNamespace: "namespace",
      wrapperId: "barba-wrapper",
      containerClass: "barba-container",
      currentHTML: document.documentElement.innerHTML,
      parseResponse: function parseResponse(t) {
        this.currentHTML = t;
        var e = document.createElement("div");
        e.innerHTML = t;
        var n = e.querySelector("title");
        return n && (document.title = n.textContent), this.getContainer(e);
      },
      getWrapper: function getWrapper() {
        var t = document.getElementById(this.wrapperId);
        if (!t) throw new Error("Barba.js: wrapper not found!");
        return t;
      },
      getContainer: function getContainer(t) {
        if (t || (t = document.body), !t) throw new Error("Barba.js: DOM not ready!");
        var e = this.parseContainer(t);
        if (e && e.jquery && (e = e[0]), !e) throw new Error("Barba.js: no container found");
        return e;
      },
      getNamespace: function getNamespace(t) {
        return t && t.dataset ? t.dataset[this.dataNamespace] : t ? t.getAttribute("data-" + this.dataNamespace) : null;
      },
      putContainer: function putContainer(t) {
        t.style.visibility = "hidden";
        var e = this.getWrapper();
        e.appendChild(t);
      },
      parseContainer: function parseContainer(t) {
        return t.querySelector("." + this.containerClass);
      }
    };
    t.exports = n;
  }, function (t, e, n) {
    var r = n(5),
        i = n(10),
        o = {
      ignoreClassLink: "no-barba-prefetch",
      init: function init() {
        return !!window.history.pushState && (document.body.addEventListener("mouseover", this.onLinkEnter.bind(this)), void document.body.addEventListener("touchstart", this.onLinkEnter.bind(this)));
      },
      onLinkEnter: function onLinkEnter(t) {
        for (var e = t.target; e && !i.getHref(e);) {
          e = e.parentNode;
        }

        if (e && !e.classList.contains(this.ignoreClassLink)) {
          var n = i.getHref(e);

          if (i.preventCheck(t, e) && !i.Cache.get(n)) {
            var o = r.xhr(n);
            i.Cache.set(n, o);
          }
        }
      }
    };
    t.exports = o;
  }]);
});
},{}],"node_modules/animejs/lib/anime.min.js":[function(require,module,exports) {
var define;
/*
 * anime.js v3.0.1
 * (c) 2019 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */

!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):n.anime=e()}(this,function(){"use strict";var n={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},e={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},r=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective"],t={CSS:{},springs:{}};function a(n,e,r){return Math.min(Math.max(n,e),r)}function o(n,e){return n.indexOf(e)>-1}function i(n,e){return n.apply(null,e)}var u={arr:function(n){return Array.isArray(n)},obj:function(n){return o(Object.prototype.toString.call(n),"Object")},pth:function(n){return u.obj(n)&&n.hasOwnProperty("totalLength")},svg:function(n){return n instanceof SVGElement},inp:function(n){return n instanceof HTMLInputElement},dom:function(n){return n.nodeType||u.svg(n)},str:function(n){return"string"==typeof n},fnc:function(n){return"function"==typeof n},und:function(n){return void 0===n},hex:function(n){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(n)},rgb:function(n){return/^rgb/.test(n)},hsl:function(n){return/^hsl/.test(n)},col:function(n){return u.hex(n)||u.rgb(n)||u.hsl(n)},key:function(r){return!n.hasOwnProperty(r)&&!e.hasOwnProperty(r)&&"targets"!==r&&"keyframes"!==r}};function s(n){var e=/\(([^)]+)\)/.exec(n);return e?e[1].split(",").map(function(n){return parseFloat(n)}):[]}function c(n,e){var r=s(n),o=a(u.und(r[0])?1:r[0],.1,100),i=a(u.und(r[1])?100:r[1],.1,100),c=a(u.und(r[2])?10:r[2],.1,100),f=a(u.und(r[3])?0:r[3],.1,100),l=Math.sqrt(i/o),d=c/(2*Math.sqrt(i*o)),p=d<1?l*Math.sqrt(1-d*d):0,v=1,h=d<1?(d*l-f)/p:-f+l;function g(n){var r=e?e*n/1e3:n;return r=d<1?Math.exp(-r*d*l)*(v*Math.cos(p*r)+h*Math.sin(p*r)):(v+h*r)*Math.exp(-r*l),0===n||1===n?n:1-r}return e?g:function(){var e=t.springs[n];if(e)return e;for(var r=0,a=0;;)if(1===g(r+=1/6)){if(++a>=16)break}else a=0;var o=r*(1/6)*1e3;return t.springs[n]=o,o}}function f(n,e){void 0===n&&(n=1),void 0===e&&(e=.5);var r=a(n,1,10),t=a(e,.1,2);return function(n){return 0===n||1===n?n:-r*Math.pow(2,10*(n-1))*Math.sin((n-1-t/(2*Math.PI)*Math.asin(1/r))*(2*Math.PI)/t)}}function l(n){return void 0===n&&(n=10),function(e){return Math.round(e*n)*(1/n)}}var d=function(){var n=11,e=1/(n-1);function r(n,e){return 1-3*e+3*n}function t(n,e){return 3*e-6*n}function a(n){return 3*n}function o(n,e,o){return((r(e,o)*n+t(e,o))*n+a(e))*n}function i(n,e,o){return 3*r(e,o)*n*n+2*t(e,o)*n+a(e)}return function(r,t,a,u){if(0<=r&&r<=1&&0<=a&&a<=1){var s=new Float32Array(n);if(r!==t||a!==u)for(var c=0;c<n;++c)s[c]=o(c*e,r,a);return function(n){return r===t&&a===u?n:0===n||1===n?n:o(f(n),t,u)}}function f(t){for(var u=0,c=1,f=n-1;c!==f&&s[c]<=t;++c)u+=e;var l=u+(t-s[--c])/(s[c+1]-s[c])*e,d=i(l,r,a);return d>=.001?function(n,e,r,t){for(var a=0;a<4;++a){var u=i(e,r,t);if(0===u)return e;e-=(o(e,r,t)-n)/u}return e}(t,l,r,a):0===d?l:function(n,e,r,t,a){for(var i,u,s=0;(i=o(u=e+(r-e)/2,t,a)-n)>0?r=u:e=u,Math.abs(i)>1e-7&&++s<10;);return u}(t,u,u+e,r,a)}}}(),p=function(){var n=["Quad","Cubic","Quart","Quint","Sine","Expo","Circ","Back","Elastic"],e={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,.335],[.6,-.28,.735,.045],f],Out:[[.25,.46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],[.075,.82,.165,1],[.175,.885,.32,1.275],function(n,e){return function(r){return 1-f(n,e)(1-r)}}],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],function(n,e){return function(r){return r<.5?f(n,e)(2*r)/2:1-f(n,e)(-2*r+2)/2}}]},r={linear:[.25,.25,.75,.75]},t=function(t){e[t].forEach(function(e,a){r["ease"+t+n[a]]=e})};for(var a in e)t(a);return r}();function v(n,e){if(u.fnc(n))return n;var r=n.split("(")[0],t=p[r],a=s(n);switch(r){case"spring":return c(n,e);case"cubicBezier":return i(d,a);case"steps":return i(l,a);default:return u.fnc(t)?i(t,a):i(d,t)}}function h(n){try{return document.querySelectorAll(n)}catch(n){return}}function g(n,e){for(var r=n.length,t=arguments.length>=2?arguments[1]:void 0,a=[],o=0;o<r;o++)if(o in n){var i=n[o];e.call(t,i,o,n)&&a.push(i)}return a}function m(n){return n.reduce(function(n,e){return n.concat(u.arr(e)?m(e):e)},[])}function y(n){return u.arr(n)?n:(u.str(n)&&(n=h(n)||n),n instanceof NodeList||n instanceof HTMLCollection?[].slice.call(n):[n])}function b(n,e){return n.some(function(n){return n===e})}function x(n){var e={};for(var r in n)e[r]=n[r];return e}function M(n,e){var r=x(n);for(var t in n)r[t]=e.hasOwnProperty(t)?e[t]:n[t];return r}function w(n,e){var r=x(n);for(var t in e)r[t]=u.und(n[t])?e[t]:n[t];return r}function k(n){return u.rgb(n)?(r=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e=n))?"rgba("+r[1]+",1)":e:u.hex(n)?(t=n.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(n,e,r,t){return e+e+r+r+t+t}),a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),"rgba("+parseInt(a[1],16)+","+parseInt(a[2],16)+","+parseInt(a[3],16)+",1)"):u.hsl(n)?function(n){var e,r,t,a=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(n)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(n),o=parseInt(a[1],10)/360,i=parseInt(a[2],10)/100,u=parseInt(a[3],10)/100,s=a[4]||1;function c(n,e,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?n+6*(e-n)*r:r<.5?e:r<2/3?n+(e-n)*(2/3-r)*6:n}if(0==i)e=r=t=u;else{var f=u<.5?u*(1+i):u+i-u*i,l=2*u-f;e=c(l,f,o+1/3),r=c(l,f,o),t=c(l,f,o-1/3)}return"rgba("+255*e+","+255*r+","+255*t+","+s+")"}(n):void 0;var e,r,t,a}function C(n){var e=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(n);if(e)return e[2]}function O(n,e){return u.fnc(n)?n(e.target,e.id,e.total):n}function P(n,e){return n.getAttribute(e)}function I(n,e,r){if(b([r,"deg","rad","turn"],C(e)))return e;var a=t.CSS[e+r];if(!u.und(a))return a;var o=document.createElement(n.tagName),i=n.parentNode&&n.parentNode!==document?n.parentNode:document.body;i.appendChild(o),o.style.position="absolute",o.style.width=100+r;var s=100/o.offsetWidth;i.removeChild(o);var c=s*parseFloat(e);return t.CSS[e+r]=c,c}function B(n,e,r){if(e in n.style){var t=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),a=n.style[e]||getComputedStyle(n).getPropertyValue(t)||"0";return r?I(n,a,r):a}}function D(n,e){return u.dom(n)&&!u.inp(n)&&(P(n,e)||u.svg(n)&&n[e])?"attribute":u.dom(n)&&b(r,e)?"transform":u.dom(n)&&"transform"!==e&&B(n,e)?"css":null!=n[e]?"object":void 0}function T(n){if(u.dom(n)){for(var e,r=n.style.transform||"",t=/(\w+)\(([^)]*)\)/g,a=new Map;e=t.exec(r);)a.set(e[1],e[2]);return a}}function F(n,e,r,t){var a,i=o(e,"scale")?1:0+(o(a=e,"translate")||"perspective"===a?"px":o(a,"rotate")||o(a,"skew")?"deg":void 0),u=T(n).get(e)||i;return r&&(r.transforms.list.set(e,u),r.transforms.last=e),t?I(n,u,t):u}function N(n,e,r,t){switch(D(n,e)){case"transform":return F(n,e,t,r);case"css":return B(n,e,r);case"attribute":return P(n,e);default:return n[e]||0}}function A(n,e){var r=/^(\*=|\+=|-=)/.exec(n);if(!r)return n;var t=C(n)||0,a=parseFloat(e),o=parseFloat(n.replace(r[0],""));switch(r[0][0]){case"+":return a+o+t;case"-":return a-o+t;case"*":return a*o+t}}function E(n,e){if(u.col(n))return k(n);var r=C(n),t=r?n.substr(0,n.length-r.length):n;return e&&!/\s/g.test(n)?t+e:t}function L(n,e){return Math.sqrt(Math.pow(e.x-n.x,2)+Math.pow(e.y-n.y,2))}function S(n){for(var e,r=n.points,t=0,a=0;a<r.numberOfItems;a++){var o=r.getItem(a);a>0&&(t+=L(e,o)),e=o}return t}function j(n){if(n.getTotalLength)return n.getTotalLength();switch(n.tagName.toLowerCase()){case"circle":return o=n,2*Math.PI*P(o,"r");case"rect":return 2*P(a=n,"width")+2*P(a,"height");case"line":return L({x:P(t=n,"x1"),y:P(t,"y1")},{x:P(t,"x2"),y:P(t,"y2")});case"polyline":return S(n);case"polygon":return r=(e=n).points,S(e)+L(r.getItem(r.numberOfItems-1),r.getItem(0))}var e,r,t,a,o}function q(n,e){var r=e||{},t=r.el||function(n){for(var e=n.parentNode;u.svg(e)&&(e=e.parentNode,u.svg(e.parentNode)););return e}(n),a=t.getBoundingClientRect(),o=P(t,"viewBox"),i=a.width,s=a.height,c=r.viewBox||(o?o.split(" "):[0,0,i,s]);return{el:t,viewBox:c,x:c[0]/1,y:c[1]/1,w:i/c[2],h:s/c[3]}}function $(n,e){function r(r){void 0===r&&(r=0);var t=e+r>=1?e+r:0;return n.el.getPointAtLength(t)}var t=q(n.el,n.svg),a=r(),o=r(-1),i=r(1);switch(n.property){case"x":return(a.x-t.x)*t.w;case"y":return(a.y-t.y)*t.h;case"angle":return 180*Math.atan2(i.y-o.y,i.x-o.x)/Math.PI}}function X(n,e){var r=/-?\d*\.?\d+/g,t=E(u.pth(n)?n.totalLength:n,e)+"";return{original:t,numbers:t.match(r)?t.match(r).map(Number):[0],strings:u.str(n)||e?t.split(r):[]}}function Y(n){return g(n?m(u.arr(n)?n.map(y):y(n)):[],function(n,e,r){return r.indexOf(n)===e})}function Z(n){var e=Y(n);return e.map(function(n,r){return{target:n,id:r,total:e.length,transforms:{list:T(n)}}})}function Q(n,e){var r=x(e);if(/^spring/.test(r.easing)&&(r.duration=c(r.easing)),u.arr(n)){var t=n.length;2===t&&!u.obj(n[0])?n={value:n}:u.fnc(e.duration)||(r.duration=e.duration/t)}var a=u.arr(n)?n:[n];return a.map(function(n,r){var t=u.obj(n)&&!u.pth(n)?n:{value:n};return u.und(t.delay)&&(t.delay=r?0:e.delay),u.und(t.endDelay)&&(t.endDelay=r===a.length-1?e.endDelay:0),t}).map(function(n){return w(n,r)})}function V(n,e){var r=[],t=e.keyframes;for(var a in t&&(e=w(function(n){for(var e=g(m(n.map(function(n){return Object.keys(n)})),function(n){return u.key(n)}).reduce(function(n,e){return n.indexOf(e)<0&&n.push(e),n},[]),r={},t=function(t){var a=e[t];r[a]=n.map(function(n){var e={};for(var r in n)u.key(r)?r==a&&(e.value=n[r]):e[r]=n[r];return e})},a=0;a<e.length;a++)t(a);return r}(t),e)),e)u.key(a)&&r.push({name:a,tweens:Q(e[a],n)});return r}function z(n,e){var r;return n.tweens.map(function(t){var a=function(n,e){var r={};for(var t in n){var a=O(n[t],e);u.arr(a)&&1===(a=a.map(function(n){return O(n,e)})).length&&(a=a[0]),r[t]=a}return r.duration=parseFloat(r.duration),r.delay=parseFloat(r.delay),r}(t,e),o=a.value,i=u.arr(o)?o[1]:o,s=C(i),c=N(e.target,n.name,s,e),f=r?r.to.original:c,l=u.arr(o)?o[0]:f,d=C(l)||C(c),p=s||d;return u.und(i)&&(i=f),a.from=X(l,p),a.to=X(A(i,l),p),a.start=r?r.end:0,a.end=a.start+a.delay+a.duration+a.endDelay,a.easing=v(a.easing,a.duration),a.isPath=u.pth(o),a.isColor=u.col(a.from.original),a.isColor&&(a.round=1),r=a,a})}var H={css:function(n,e,r){return n.style[e]=r},attribute:function(n,e,r){return n.setAttribute(e,r)},object:function(n,e,r){return n[e]=r},transform:function(n,e,r,t,a){if(t.list.set(e,r),e===t.last||a){var o="";t.list.forEach(function(n,e){o+=e+"("+n+") "}),n.style.transform=o}}};function G(n,e){Z(n).forEach(function(n){for(var r in e){var t=O(e[r],n),a=n.target,o=C(t),i=N(a,r,o,n),u=A(E(t,o||C(i)),i),s=D(a,r);H[s](a,r,u,n.transforms,!0)}})}function R(n,e){return g(m(n.map(function(n){return e.map(function(e){return function(n,e){var r=D(n.target,e.name);if(r){var t=z(e,n),a=t[t.length-1];return{type:r,property:e.name,animatable:n,tweens:t,duration:a.end,delay:t[0].delay,endDelay:a.endDelay}}}(n,e)})})),function(n){return!u.und(n)})}function W(n,e){var r=n.length,t=function(n){return n.timelineOffset?n.timelineOffset:0},a={};return a.duration=r?Math.max.apply(Math,n.map(function(n){return t(n)+n.duration})):e.duration,a.delay=r?Math.min.apply(Math,n.map(function(n){return t(n)+n.delay})):e.delay,a.endDelay=r?a.duration-Math.max.apply(Math,n.map(function(n){return t(n)+n.duration-n.endDelay})):e.endDelay,a}var J=0;var K,U=[],_=[],nn=function(){function n(){K=requestAnimationFrame(e)}function e(e){var r=U.length;if(r){for(var t=0;t<r;){var a=U[t];if(a.paused){var o=U.indexOf(a);o>-1&&(U.splice(o,1),r=U.length)}else a.tick(e);t++}n()}else K=cancelAnimationFrame(K)}return n}();function en(r){void 0===r&&(r={});var t,o=0,i=0,u=0,s=0,c=null;function f(n){var e=window.Promise&&new Promise(function(n){return c=n});return n.finished=e,e}var l,d,p,v,h,m,y,b,x=(d=M(n,l=r),p=M(e,l),v=V(p,l),h=Z(l.targets),m=R(h,v),y=W(m,p),b=J,J++,w(d,{id:b,children:[],animatables:h,animations:m,duration:y.duration,delay:y.delay,endDelay:y.endDelay}));f(x);function k(){var n=x.direction;"alternate"!==n&&(x.direction="normal"!==n?"normal":"reverse"),x.reversed=!x.reversed,t.forEach(function(n){return n.reversed=x.reversed})}function C(n){return x.reversed?x.duration-n:n}function O(){o=0,i=C(x.currentTime)*(1/en.speed)}function P(n,e){e&&e.seek(n-e.timelineOffset)}function I(n){for(var e=0,r=x.animations,t=r.length;e<t;){var o=r[e],i=o.animatable,u=o.tweens,s=u.length-1,c=u[s];s&&(c=g(u,function(e){return n<e.end})[0]||c);for(var f=a(n-c.start-c.delay,0,c.duration)/c.duration,l=isNaN(f)?1:c.easing(f),d=c.to.strings,p=c.round,v=[],h=c.to.numbers.length,m=void 0,y=0;y<h;y++){var b=void 0,M=c.to.numbers[y],w=c.from.numbers[y]||0;b=c.isPath?$(c.value,l*M):w+l*(M-w),p&&(c.isColor&&y>2||(b=Math.round(b*p)/p)),v.push(b)}var k=d.length;if(k){m=d[0];for(var C=0;C<k;C++){d[C];var O=d[C+1],P=v[C];isNaN(P)||(m+=O?P+O:P+" ")}}else m=v[0];H[o.type](i.target,o.property,m,i.transforms),o.currentValue=m,e++}}function B(n){x[n]&&!x.passThrough&&x[n](x)}function D(n){var e=x.duration,r=x.delay,l=e-x.endDelay,d=C(n);x.progress=a(d/e*100,0,100),x.reversePlayback=d<x.currentTime,t&&function(n){if(x.reversePlayback)for(var e=s;e--;)P(n,t[e]);else for(var r=0;r<s;r++)P(n,t[r])}(d),!x.began&&x.currentTime>0&&(x.began=!0,B("begin"),B("loopBegin")),d<=r&&0!==x.currentTime&&I(0),(d>=l&&x.currentTime!==e||!e)&&I(e),d>r&&d<l?(x.changeBegan||(x.changeBegan=!0,x.changeCompleted=!1,B("changeBegin")),B("change"),I(d)):x.changeBegan&&(x.changeCompleted=!0,x.changeBegan=!1,B("changeComplete")),x.currentTime=a(d,0,e),x.began&&B("update"),n>=e&&(i=0,x.remaining&&!0!==x.remaining&&x.remaining--,x.remaining?(o=u,B("loopComplete"),B("loopBegin"),"alternate"===x.direction&&k()):(x.paused=!0,x.completed||(x.completed=!0,B("loopComplete"),B("complete"),!x.passThrough&&"Promise"in window&&(c(),f(x)))))}return x.reset=function(){var n=x.direction;x.passThrough=!1,x.currentTime=0,x.progress=0,x.paused=!0,x.began=!1,x.changeBegan=!1,x.completed=!1,x.changeCompleted=!1,x.reversePlayback=!1,x.reversed="reverse"===n,x.remaining=x.loop,t=x.children;for(var e=s=t.length;e--;)x.children[e].reset();(x.reversed&&!0!==x.loop||"alternate"===n&&1===x.loop)&&x.remaining++,I(0)},x.set=function(n,e){return G(n,e),x},x.tick=function(n){u=n,o||(o=u),D((u+(i-o))*en.speed)},x.seek=function(n){D(C(n))},x.pause=function(){x.paused=!0,O()},x.play=function(){x.paused&&(x.completed&&x.reset(),x.paused=!1,U.push(x),O(),K||nn())},x.reverse=function(){k(),O()},x.restart=function(){x.reset(),x.play()},x.reset(),x.autoplay&&x.play(),x}function rn(n,e){for(var r=e.length;r--;)b(n,e[r].animatable.target)&&e.splice(r,1)}return"undefined"!=typeof document&&document.addEventListener("visibilitychange",function(){document.hidden?(U.forEach(function(n){return n.pause()}),_=U.slice(0),U=[]):_.forEach(function(n){return n.play()})}),en.version="3.0.1",en.speed=1,en.running=U,en.remove=function(n){for(var e=Y(n),r=U.length;r--;){var t=U[r],a=t.animations,o=t.children;rn(e,a);for(var i=o.length;i--;){var u=o[i],s=u.animations;rn(e,s),s.length||u.children.length||o.splice(i,1)}a.length||o.length||t.pause()}},en.get=N,en.set=G,en.convertPx=I,en.path=function(n,e){var r=u.str(n)?h(n)[0]:n,t=e||100;return function(n){return{property:n,el:r,svg:q(r),totalLength:j(r)*(t/100)}}},en.setDashoffset=function(n){var e=j(n);return n.setAttribute("stroke-dasharray",e),e},en.stagger=function(n,e){void 0===e&&(e={});var r=e.direction||"normal",t=e.easing?v(e.easing):null,a=e.grid,o=e.axis,i=e.from||0,s="first"===i,c="center"===i,f="last"===i,l=u.arr(n),d=l?parseFloat(n[0]):parseFloat(n),p=l?parseFloat(n[1]):0,h=C(l?n[1]:n)||0,g=e.start||0+(l?d:0),m=[],y=0;return function(n,e,u){if(s&&(i=0),c&&(i=(u-1)/2),f&&(i=u-1),!m.length){for(var v=0;v<u;v++){if(a){var b=c?(a[0]-1)/2:i%a[0],x=c?(a[1]-1)/2:Math.floor(i/a[0]),M=b-v%a[0],w=x-Math.floor(v/a[0]),k=Math.sqrt(M*M+w*w);"x"===o&&(k=-M),"y"===o&&(k=-w),m.push(k)}else m.push(Math.abs(i-v));y=Math.max.apply(Math,m)}t&&(m=m.map(function(n){return t(n/y)*y})),"reverse"===r&&(m=m.map(function(n){return o?n<0?-1*n:-n:Math.abs(y-n)}))}return g+(l?(p-d)/y:d)*(Math.round(100*m[e])/100)+h}},en.timeline=function(n){void 0===n&&(n={});var r=en(n);return r.duration=0,r.add=function(t,a){var o=U.indexOf(r),i=r.children;function s(n){n.passThrough=!0}o>-1&&U.splice(o,1);for(var c=0;c<i.length;c++)s(i[c]);var f=w(t,M(e,n));f.targets=f.targets||n.targets;var l=r.duration;f.autoplay=!1,f.direction=r.direction,f.timelineOffset=u.und(a)?l:A(a,l),s(r),r.seek(f.timelineOffset);var d=en(f);s(d),i.push(d);var p=W(i,n);return r.delay=p.delay,r.endDelay=p.endDelay,r.duration=p.duration,r.seek(0),r.reset(),r.autoplay&&r.play(),r},r},en.easing=v,en.penner=p,en.random=function(n,e){return Math.floor(Math.random()*(e-n+1))+n},en});
},{}],"js/transition/transition.js":[function(require,module,exports) {
var Barba = require("./barba");

var anime = require("animejs/lib/anime.min.js");

window.onload = function () {
  Barba.Pjax.start();
  Barba.Prefetch.init();
};

var FadeTransition = Barba.BaseTransition.extend({
  start: function start() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */
    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this));
  },
  fadeOut: function fadeOut() {
    var transitionPrromise = new Promise(function (resolve) {
      var morph = anime.timeline({
        loop: false,
        easing: "linear"
      }).add({
        targets: ".a",
        d: [{
          value: "M0,16 C47,445 112,659 195,659 C327,659 238,135 505,135 C698,135 596,515 728,515 C859,515 780,221 900,221 C1011,221 925,801 1077,801 C1182,801 1223,541 1200,21 L1200,0 L0,0 L0,16 Z"
        }, {
          value: "M0,920 C47,920 112,920 195,920 C327,920 401,920 505,920 C605,920 638,920 728,920 C818,920 844,920 900,920 C960,920 1001,920 1077,920 C1138,920 1178,920 1200,920 L1200,0 L0,0 L0,920 Z"
        }],
        duration: 1000,
        complete: function complete() {
          var textval = document.querySelector(".text");
          textval.style.display = "flex";
          var list = document.getElementsByClassName("barba-container")[1];
          var atrset = list.getAttribute("data-name");
          textval.textContent = atrset;
        }
      }).add({
        targets: ".text",
        opacity: [0.3, 1],
        translateY: [-50, 0],
        deley: 500,
        duration: 700
      }).add({
        targets: ".text ",
        duration: 700,
        complete: function complete() {
          resolve();
          document.querySelector(".text").style.display = "none";
          document.querySelector(".text").innerHTML = "";
          console.log("resolved");
        }
      }).add({
        targets: ".a",
        d: [{
          value: "M0,16 C47,445 112,659 195,659 C327,659 238,135 505,135 C698,135 596,515 728,515 C859,515 780,221 900,221 C1011,221 925,801 1077,801 C1182,801 1223,541 1200,21 L1200,0 L0,0 L0,16 Z"
        }, {
          value: "M0,0 C46,0 112,0 195,0 C327,0 401,0 505,0 C605,0 638,0 728,0 C818,0 844,0 900.3125,0 C960,0 1001,0 1077,0 C1138,0 1178,0 1200,0 L1200,0 L0,0 L0,0 Z"
        }],
        durtion: 1000,
        autoplay: true
      });
    });
    return transitionPrromise;
  },
  fadeIn: function fadeIn() {
    console.log("new container added");
    var newWrap = this.newContainer;
    var oldWrap = this.oldContainer;

    var _that = this;

    newWrap.style.visibility = "visible";
    oldWrap.style.display = "none";

    _that.done();

    console.log("All finished");
  }
});
/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function () {
  return FadeTransition;
};
},{"./barba":"js/transition/barba.js","animejs/lib/anime.min.js":"node_modules/animejs/lib/anime.min.js"}],"js/navigation/navhandler.js":[function(require,module,exports) {
var btn = document.querySelector(".nav__btn");
var overlay = document.querySelector(".nav__overlay");
var navUl = document.querySelector(".nav__ul");
var list = document.querySelectorAll(".nav__ul__li");
var links = document.querySelectorAll(".nav__a");
btn.addEventListener('click', function () {
  btn.classList.toggle("toogle");
  overlay.classList.toggle("block");
  navUl.classList.toggle("block");
  list.forEach(function (item, index) {
    item.style.animation = "movelink 1.4s ease  ".concat(index / 5, "s");
  });
});
links.forEach(function (link) {
  link.addEventListener('click', function () {
    setTimeout(function () {
      overlay.classList.toggle("block");
      navUl.classList.toggle("block");
    }, 1100);
    btn.classList.toggle("toogle");
  });
});
},{}],"js/index/index.js":[function(require,module,exports) {
"use strict";

require("../transition/transition");

require("../navigation/navhandler");
},{"../transition/transition":"js/transition/transition.js","../navigation/navhandler":"js/navigation/navhandler.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58492" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index/index.js"], null)
//# sourceMappingURL=/index.875e13e2.map