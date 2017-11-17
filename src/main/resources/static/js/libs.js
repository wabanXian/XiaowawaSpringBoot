/*!
* Velocity.js: Accelerated JavaScript animation.
* @version 0.10.1
* @docs http://VelocityJS.org
* @license Copyright 2014 Julian Shapiro. MIT License: http://en.wikipedia.org/wiki/MIT_License
*/
!function (e, t, r, a) {
    function o(e) {
        for (var t = -1, r = e ? e.length : 0, a = []; ++t < r;) {
            var o = e[t];
            o && a.push(o)
        }
        return a
    }

    function i(e) {
        var t = $.data(e, c);
        return null === t ? a : t
    }

    function n(e) {
        return function (t) {
            return Math.round(t * e) * (1 / e)
        }
    }

    function s(e, t) {
        var r = e;
        return m.isString(e) ? y.Easings[e] || (r = !1) : r = m.isArray(e) && 1 === e.length ? n.apply(null, e) : m.isArray(e) && 2 === e.length ? x.apply(null, e.concat([t])) : m.isArray(e) && 4 === e.length ? v.apply(null, e) : !1, r === !1 && (r = y.Easings[y.defaults.easing] ? y.defaults.easing : g), r
    }

    function l(e) {
        if (e) for (var t = (new Date).getTime(), r = 0, o = y.State.calls.length; o > r; r++) if (y.State.calls[r]) {
            var n = y.State.calls[r], s = n[0], c = n[2], p = n[3];
            p || (p = y.State.calls[r][3] = t - 16);
            for (var g = Math.min((t - p) / c.duration, 1), d = 0, f = s.length; f > d; d++) {
                var v = s[d], x = v.element;
                if (i(x)) {
                    var S = !1;
                    c.display && "none" !== c.display && b.setPropertyValue(x, "display", c.display), c.visibility && "hidden" !== c.visibility && b.setPropertyValue(x, "visibility", c.visibility);
                    for (var V in v) if ("element" !== V) {
                        var P = v[V], w, T = m.isString(P.easing) ? y.Easings[P.easing] : P.easing;
                        if (w = 1 === g ? P.endValue : P.startValue + (P.endValue - P.startValue) * T(g), P.currentValue = w, b.Hooks.registered[V]) {
                            var C = b.Hooks.getRoot(V), k = i(x).rootPropertyValueCache[C];
                            k && (P.rootPropertyValue = k)
                        }
                        var E = b.setPropertyValue(x, V, P.currentValue + (0 === parseFloat(w) ? "" : P.unitType), P.rootPropertyValue, P.scrollData);
                        b.Hooks.registered[V] && (i(x).rootPropertyValueCache[C] = b.Normalizations.registered[C] ? b.Normalizations.registered[C]("extract", null, E[1]) : E[1]), "transform" === E[0] && (S = !0)
                    }
                    c.mobileHA && i(x).transformCache.translate3d === a && (i(x).transformCache.translate3d = "(0px, 0px, 0px)", S = !0), S && b.flushTransformCache(x)
                }
            }
            c.display && "none" !== c.display && (y.State.calls[r][2].display = !1), c.visibility && "hidden" !== c.visibility && (y.State.calls[r][2].visibility = !1), c.progress && c.progress.call(n[1], n[1], g, Math.max(0, p + c.duration - t), p), 1 === g && u(r)
        }
        y.State.isTicking && (y.mock ? l(!0) : h(l))
    }

    function u(e, t) {
        if (!y.State.calls[e]) return !1;
        for (var r = y.State.calls[e][0], o = y.State.calls[e][1], n = y.State.calls[e][2], s = y.State.calls[e][4], l = !1, u = 0, c = r.length; c > u; u++) {
            var p = r[u].element;
            if (t || n.loop || ("none" === n.display && b.setPropertyValue(p, "display", n.display), "hidden" === n.visibility && b.setPropertyValue(p, "visibility", n.visibility)), ($.queue(p)[1] === a || !/\.velocityQueueEntryFlag/i.test($.queue(p)[1])) && i(p)) {
                i(p).isAnimating = !1, i(p).rootPropertyValueCache = {};
                var g = !1;
                $.each(i(p).transformCache, function (e, t) {
                    var r = /^scale/.test(e) ? 1 : 0;
                    new RegExp("^\\(" + r + "[^.]").test(t) && (g = !0, delete i(p).transformCache[e])
                }), n.mobileHA && (g = !0, delete i(p).transformCache.translate3d), g && b.flushTransformCache(p), b.Values.removeClass(p, "velocity-animating")
            }
            if (!t && n.complete && !n.loop && u === c - 1) try {
                n.complete.call(o, o)
            } catch (d) {
                setTimeout(function () {
                    throw d
                }, 1)
            }
            s && n.loop !== !0 && s(o), n.loop !== !0 || t || y.animate(p, "reverse", {
                loop: !0,
                delay: n.delay
            }), n.queue !== !1 && $.dequeue(p, n.queue)
        }
        y.State.calls[e] = !1;
        for (var f = 0, h = y.State.calls.length; h > f; f++) if (y.State.calls[f] !== !1) {
            l = !0;
            break
        }
        l === !1 && (y.State.isTicking = !1, delete y.State.calls, y.State.calls = [])
    }

    var c = "velocity", p = 400, g = "swing", d = function () {
        if (r.documentMode) return r.documentMode;
        for (var e = 7; e > 4; e--) {
            var t = r.createElement("div");
            if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length) return t = null, e
        }
        return a
    }(), f = function () {
        var e = 0;
        return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function (t) {
            var r = (new Date).getTime(), a;
            return a = Math.max(0, 16 - (r - e)), e = r + a, setTimeout(function () {
                t(r + a)
            }, a)
        }
    }(), h = t.requestAnimationFrame || f, m = {
        isString: function (e) {
            return "string" == typeof e
        }, isArray: Array.isArray || function (e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }, isFunction: function (e) {
            return "[object Function]" === Object.prototype.toString.call(e)
        }, isNode: function (e) {
            return e && e.nodeType
        }, isNodeList: function (e) {
            return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== a && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0)
        }, isWrapped: function (e) {
            return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e))
        }, isSVG: function (e) {
            return t.SVGElement && e instanceof SVGElement
        }, isEmptyObject: function (e) {
            var t;
            for (t in e) return !1;
            return !0
        }
    }, $ = t.jQuery || e.Velocity && e.Velocity.Utilities;
    if (!$) throw new Error("Velocity: Either jQuery or Velocity's jQuery shim must first be loaded.");
    if (e.Velocity !== a && !e.Velocity.Utilities) throw new Error("Velocity: Namespace is occupied.");
    if (7 >= d) {
        if (t.jQuery) return void(t.jQuery.fn.velocity = t.jQuery.fn.animate);
        throw new Error("Velocity: For IE<=7, Velocity falls back to jQuery, which must first be loaded.")
    }
    if (8 === d && !t.jQuery) throw new Error("Velocity: For IE8, Velocity requires jQuery to be loaded. (Velocity's jQuery shim does not work with IE8.)");
    var y = e.Velocity = e.velocity = $.extend({
        State: {
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            isAndroid: /Android/i.test(navigator.userAgent),
            isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
            isChrome: t.chrome,
            isFirefox: /Firefox/i.test(navigator.userAgent),
            prefixElement: r.createElement("div"),
            prefixMatches: {},
            scrollAnchor: null,
            scrollPropertyLeft: null,
            scrollPropertyTop: null,
            isTicking: !1,
            calls: []
        },
        CSS: {},
        Utilities: t.jQuery,
        Sequences: {},
        Easings: {},
        Promise: t.Promise,
        defaults: {
            queue: "",
            duration: p,
            easing: g,
            begin: null,
            complete: null,
            progress: null,
            display: null,
            loop: !1,
            delay: !1,
            mobileHA: !0,
            _cacheValues: !0
        },
        animate: function () {
        },
        mock: !1,
        version: {major: 0, minor: 10, patch: 1},
        debug: !1
    }, t.Velocity);
    t.pageYOffset !== a ? (y.State.scrollAnchor = t, y.State.scrollPropertyLeft = "pageXOffset", y.State.scrollPropertyTop = "pageYOffset") : (y.State.scrollAnchor = r.documentElement || r.body.parentNode || r.body, y.State.scrollPropertyLeft = "scrollLeft", y.State.scrollPropertyTop = "scrollTop"), y.State.isMobile || r.hidden === a || r.addEventListener("visibilitychange", function () {
        r.hidden ? (h = function (e) {
            return setTimeout(function () {
                e(!0)
            }, 16)
        }, l()) : h = t.requestAnimationFrame || f
    });
    var v = function () {
        function e(e, t) {
            return 1 - 3 * t + 3 * e
        }

        function t(e, t) {
            return 3 * t - 6 * e
        }

        function r(e) {
            return 3 * e
        }

        function a(a, o, i) {
            return ((e(o, i) * a + t(o, i)) * a + r(o)) * a
        }

        function o(a, o, i) {
            return 3 * e(o, i) * a * a + 2 * t(o, i) * a + r(o)
        }

        return function (e, t, r, i) {
            function n(t) {
                for (var i = t, n = 0; 8 > n; ++n) {
                    var s = o(i, e, r);
                    if (0 === s) return i;
                    var l = a(i, e, r) - t;
                    i -= l / s
                }
                return i
            }

            if (4 !== arguments.length) return !1;
            for (var s = 0; 4 > s; ++s) if ("number" != typeof arguments[s] || isNaN(arguments[s]) || !isFinite(arguments[s])) return !1;
            return e = Math.min(e, 1), r = Math.min(r, 1), e = Math.max(e, 0), r = Math.max(r, 0), function (o) {
                return e === t && r === i ? o : a(n(o), t, i)
            }
        }
    }(), x = function () {
        function e(e) {
            return -e.tension * e.x - e.friction * e.v
        }

        function t(t, r, a) {
            var o = {x: t.x + a.dx * r, v: t.v + a.dv * r, tension: t.tension, friction: t.friction};
            return {dx: o.v, dv: e(o)}
        }

        function r(r, a) {
            var o = {dx: r.v, dv: e(r)}, i = t(r, .5 * a, o), n = t(r, .5 * a, i), s = t(r, a, n),
                l = 1 / 6 * (o.dx + 2 * (i.dx + n.dx) + s.dx), u = 1 / 6 * (o.dv + 2 * (i.dv + n.dv) + s.dv);
            return r.x = r.x + l * a, r.v = r.v + u * a, r
        }

        return function a(e, t, o) {
            var i = {x: -1, v: 0, tension: null, friction: null}, n = [0], s = 0, l = 1e-4, u = .016, c, p, g;
            for (e = parseFloat(e) || 500, t = parseFloat(t) || 20, o = o || null, i.tension = e, i.friction = t, c = null !== o, c ? (s = a(e, t), p = s / o * u) : p = u; ;) if (g = r(g || i, p), n.push(1 + g.x), s += 16, !(Math.abs(g.x) > l && Math.abs(g.v) > l)) break;
            return c ? function (e) {
                return n[e * (n.length - 1) | 0]
            } : s
        }
    }();
    !function () {
        y.Easings.linear = function (e) {
            return e
        }, y.Easings.swing = function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }, y.Easings.spring = function (e) {
            return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
        }, y.Easings.ease = v(.25, .1, .25, 1), y.Easings["ease-in"] = v(.42, 0, 1, 1), y.Easings["ease-out"] = v(0, 0, .58, 1), y.Easings["ease-in-out"] = v(.42, 0, .58, 1);
        var e = {};
        $.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (t, r) {
            e[r] = function (e) {
                return Math.pow(e, t + 2)
            }
        }), $.extend(e, {
            Sine: function (e) {
                return 1 - Math.cos(e * Math.PI / 2)
            }, Circ: function (e) {
                return 1 - Math.sqrt(1 - e * e)
            }, Elastic: function (e) {
                return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
            }, Back: function (e) {
                return e * e * (3 * e - 2)
            }, Bounce: function (e) {
                for (var t, r = 4; e < ((t = Math.pow(2, --r)) - 1) / 11;) ;
                return 1 / Math.pow(4, 3 - r) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
            }
        }), $.each(e, function (e, t) {
            y.Easings["easeIn" + e] = t, y.Easings["easeOut" + e] = function (e) {
                return 1 - t(1 - e)
            }, y.Easings["easeInOut" + e] = function (e) {
                return .5 > e ? t(2 * e) / 2 : 1 - t(-2 * e + 2) / 2
            }
        })
    }();
    var b = y.CSS = {
        RegEx: {
            isHex: /^#([A-f\d]{3}){1,2}$/i,
            valueUnwrap: /^[A-z]+\((.*)\)$/i,
            wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
            valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
        },
        Lists: {
            colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
            transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
            transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
        },
        Hooks: {
            templates: {
                textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                backgroundPosition: ["X Y", "0% 0%"],
                transformOrigin: ["X Y Z", "50% 50% 0px"],
                perspectiveOrigin: ["X Y", "50% 50%"]
            }, registered: {}, register: function () {
                for (var e = 0; e < b.Lists.colors.length; e++) b.Hooks.templates[b.Lists.colors[e]] = ["Red Green Blue Alpha", "255 255 255 1"];
                var t, r, a;
                if (d) for (t in b.Hooks.templates) {
                    r = b.Hooks.templates[t], a = r[0].split(" ");
                    var o = r[1].match(b.RegEx.valueSplit);
                    "Color" === a[0] && (a.push(a.shift()), o.push(o.shift()), b.Hooks.templates[t] = [a.join(" "), o.join(" ")])
                }
                for (t in b.Hooks.templates) {
                    r = b.Hooks.templates[t], a = r[0].split(" ");
                    for (var e in a) {
                        var i = t + a[e], n = e;
                        b.Hooks.registered[i] = [t, n]
                    }
                }
            }, getRoot: function (e) {
                var t = b.Hooks.registered[e];
                return t ? t[0] : e
            }, cleanRootPropertyValue: function (e, t) {
                return b.RegEx.valueUnwrap.test(t) && (t = t.match(b.Hooks.RegEx.valueUnwrap)[1]), b.Values.isCSSNullValue(t) && (t = b.Hooks.templates[e][1]), t
            }, extractValue: function (e, t) {
                var r = b.Hooks.registered[e];
                if (r) {
                    var a = r[0], o = r[1];
                    return t = b.Hooks.cleanRootPropertyValue(a, t), t.toString().match(b.RegEx.valueSplit)[o]
                }
                return t
            }, injectValue: function (e, t, r) {
                var a = b.Hooks.registered[e];
                if (a) {
                    var o = a[0], i = a[1], n, s;
                    return r = b.Hooks.cleanRootPropertyValue(o, r), n = r.toString().match(b.RegEx.valueSplit), n[i] = t, s = n.join(" ")
                }
                return r
            }
        },
        Normalizations: {
            registered: {
                clip: function (e, t, r) {
                    switch (e) {
                        case"name":
                            return "clip";
                        case"extract":
                            var a;
                            return b.RegEx.wrappedValueAlreadyExtracted.test(r) ? a = r : (a = r.toString().match(b.RegEx.valueUnwrap), a = a ? a[1].replace(/,(\s+)?/g, " ") : r), a;
                        case"inject":
                            return "rect(" + r + ")"
                    }
                }, opacity: function (e, t, r) {
                    if (8 >= d) switch (e) {
                        case"name":
                            return "filter";
                        case"extract":
                            var a = r.toString().match(/alpha\(opacity=(.*)\)/i);
                            return r = a ? a[1] / 100 : 1;
                        case"inject":
                            return t.style.zoom = 1, parseFloat(r) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")"
                    } else switch (e) {
                        case"name":
                            return "opacity";
                        case"extract":
                            return r;
                        case"inject":
                            return r
                    }
                }
            }, register: function () {
                9 >= d || y.State.isGingerbread || (b.Lists.transformsBase = b.Lists.transformsBase.concat(b.Lists.transforms3D));
                for (var e = 0; e < b.Lists.transformsBase.length; e++) !function () {
                    var t = b.Lists.transformsBase[e];
                    b.Normalizations.registered[t] = function (e, r, o) {
                        switch (e) {
                            case"name":
                                return "transform";
                            case"extract":
                                return i(r).transformCache[t] === a ? /^scale/i.test(t) ? 1 : 0 : i(r).transformCache[t].replace(/[()]/g, "");
                            case"inject":
                                var n = !1;
                                switch (t.substr(0, t.length - 1)) {
                                    case"translate":
                                        n = !/(%|px|em|rem|vw|vh|\d)$/i.test(o);
                                        break;
                                    case"scal":
                                    case"scale":
                                        y.State.isAndroid && i(r).transformCache[t] === a && 1 > o && (o = 1), n = !/(\d)$/i.test(o);
                                        break;
                                    case"skew":
                                        n = !/(deg|\d)$/i.test(o);
                                        break;
                                    case"rotate":
                                        n = !/(deg|\d)$/i.test(o)
                                }
                                return n || (i(r).transformCache[t] = "(" + o + ")"), i(r).transformCache[t]
                        }
                    }
                }();
                for (var e = 0; e < b.Lists.colors.length; e++) !function () {
                    var t = b.Lists.colors[e];
                    b.Normalizations.registered[t] = function (e, r, o) {
                        switch (e) {
                            case"name":
                                return t;
                            case"extract":
                                var i;
                                if (b.RegEx.wrappedValueAlreadyExtracted.test(o)) i = o; else {
                                    var n, s = {
                                        black: "rgb(0, 0, 0)",
                                        blue: "rgb(0, 0, 255)",
                                        gray: "rgb(128, 128, 128)",
                                        green: "rgb(0, 128, 0)",
                                        red: "rgb(255, 0, 0)",
                                        white: "rgb(255, 255, 255)"
                                    };
                                    /^[A-z]+$/i.test(o) ? n = s[o] !== a ? s[o] : s.black : b.RegEx.isHex.test(o) ? n = "rgb(" + b.Values.hexToRgb(o).join(" ") + ")" : /^rgba?\(/i.test(o) || (n = s.black), i = (n || o).toString().match(b.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                }
                                return 8 >= d || 3 !== i.split(" ").length || (i += " 1"), i;
                            case"inject":
                                return 8 >= d ? 4 === o.split(" ").length && (o = o.split(/\s+/).slice(0, 3).join(" ")) : 3 === o.split(" ").length && (o += " 1"), (8 >= d ? "rgb" : "rgba") + "(" + o.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                        }
                    }
                }()
            }
        },
        Names: {
            camelCase: function (e) {
                return e.replace(/-(\w)/g, function (e, t) {
                    return t.toUpperCase()
                })
            }, SVGAttribute: function (e) {
                var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                return (d || y.State.isAndroid && !y.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e)
            }, prefixCheck: function (e) {
                if (y.State.prefixMatches[e]) return [y.State.prefixMatches[e], !0];
                for (var t = ["", "Webkit", "Moz", "ms", "O"], r = 0, a = t.length; a > r; r++) {
                    var o;
                    if (o = 0 === r ? e : t[r] + e.replace(/^\w/, function (e) {
                            return e.toUpperCase()
                        }), m.isString(y.State.prefixElement.style[o])) return y.State.prefixMatches[e] = o, [o, !0]
                }
                return [e, !1]
            }
        },
        Values: {
            hexToRgb: function (e) {
                var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, a;
                return e = e.replace(t, function (e, t, r, a) {
                    return t + t + r + r + a + a
                }), a = r.exec(e), a ? [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)] : [0, 0, 0]
            }, isCSSNullValue: function (e) {
                return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
            }, getUnitType: function (e) {
                return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
            }, getDisplayType: function (e) {
                var t = e.tagName.toString().toLowerCase();
                return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : "block"
            }, addClass: function (e, t) {
                e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t
            }, removeClass: function (e, t) {
                e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ")
            }
        },
        getPropertyValue: function (e, r, o, n) {
            function s(e, r) {
                function o() {
                    u && b.setPropertyValue(e, "display", "none")
                }

                var l = 0;
                if (8 >= d) l = $.css(e, r); else {
                    var u = !1;
                    if (/^(width|height)$/.test(r) && 0 === b.getPropertyValue(e, "display") && (u = !0, b.setPropertyValue(e, "display", b.Values.getDisplayType(e))), !n) {
                        if ("height" === r && "border-box" !== b.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                            var c = e.offsetHeight - (parseFloat(b.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingBottom")) || 0);
                            return o(), c
                        }
                        if ("width" === r && "border-box" !== b.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                            var p = e.offsetWidth - (parseFloat(b.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingRight")) || 0);
                            return o(), p
                        }
                    }
                    var g;
                    g = i(e) === a ? t.getComputedStyle(e, null) : i(e).computedStyle ? i(e).computedStyle : i(e).computedStyle = t.getComputedStyle(e, null), (d || y.State.isFirefox) && "borderColor" === r && (r = "borderTopColor"), l = 9 === d && "filter" === r ? g.getPropertyValue(r) : g[r], ("" === l || null === l) && (l = e.style[r]), o()
                }
                if ("auto" === l && /^(top|right|bottom|left)$/i.test(r)) {
                    var f = s(e, "position");
                    ("fixed" === f || "absolute" === f && /top|left/i.test(r)) && (l = $(e).position()[r] + "px")
                }
                return l
            }

            var l;
            if (b.Hooks.registered[r]) {
                var u = r, c = b.Hooks.getRoot(u);
                o === a && (o = b.getPropertyValue(e, b.Names.prefixCheck(c)[0])), b.Normalizations.registered[c] && (o = b.Normalizations.registered[c]("extract", e, o)), l = b.Hooks.extractValue(u, o)
            } else if (b.Normalizations.registered[r]) {
                var p, g;
                p = b.Normalizations.registered[r]("name", e), "transform" !== p && (g = s(e, b.Names.prefixCheck(p)[0]), b.Values.isCSSNullValue(g) && b.Hooks.templates[r] && (g = b.Hooks.templates[r][1])), l = b.Normalizations.registered[r]("extract", e, g)
            }
            return /^[\d-]/.test(l) || (l = i(e) && i(e).isSVG && b.Names.SVGAttribute(r) ? /^(height|width)$/i.test(r) ? e.getBBox()[r] : e.getAttribute(r) : s(e, b.Names.prefixCheck(r)[0])), b.Values.isCSSNullValue(l) && (l = 0), y.debug >= 2 && console.log("Get " + r + ": " + l), l
        },
        setPropertyValue: function (e, r, a, o, n) {
            var s = r;
            if ("scroll" === r) n.container ? n.container["scroll" + n.direction] = a : "Left" === n.direction ? t.scrollTo(a, n.alternateValue) : t.scrollTo(n.alternateValue, a); else if (b.Normalizations.registered[r] && "transform" === b.Normalizations.registered[r]("name", e)) b.Normalizations.registered[r]("inject", e, a), s = "transform", a = i(e).transformCache[r]; else {
                if (b.Hooks.registered[r]) {
                    var l = r, u = b.Hooks.getRoot(r);
                    o = o || b.getPropertyValue(e, u), a = b.Hooks.injectValue(l, a, o), r = u
                }
                if (b.Normalizations.registered[r] && (a = b.Normalizations.registered[r]("inject", e, a), r = b.Normalizations.registered[r]("name", e)), s = b.Names.prefixCheck(r)[0], 8 >= d) try {
                    e.style[s] = a
                } catch (c) {
                    y.debug && console.log("Browser does not support [" + a + "] for [" + s + "]")
                } else i(e) && i(e).isSVG && b.Names.SVGAttribute(r) ? e.setAttribute(r, a) : e.style[s] = a;
                y.debug >= 2 && console.log("Set " + r + " (" + s + "): " + a)
            }
            return [s, a]
        },
        flushTransformCache: function (e) {
            function t(t) {
                return parseFloat(b.getPropertyValue(e, t))
            }

            var r = "";
            if ((d || y.State.isAndroid && !y.State.isChrome) && i(e).isSVG) {
                var a = {
                    translate: [t("translateX"), t("translateY")],
                    skewX: [t("skewX")],
                    skewY: [t("skewY")],
                    scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")],
                    rotate: [t("rotateZ"), 0, 0]
                };
                $.each(i(e).transformCache, function (e) {
                    /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), a[e] && (r += e + "(" + a[e].join(" ") + ") ", delete a[e])
                })
            } else {
                var o, n;
                $.each(i(e).transformCache, function (t) {
                    return o = i(e).transformCache[t], "transformPerspective" === t ? (n = o, !0) : (9 === d && "rotateZ" === t && (t = "rotate"), void(r += t + o + " "))
                }), n && (r = "perspective" + n + " " + r)
            }
            b.setPropertyValue(e, "transform", r)
        }
    };
    b.Hooks.register(), b.Normalizations.register(), y.animate = function () {
        function e() {
            return f ? k.promise || null : h
        }

        function n() {
            function e(e) {
                function c(e, t) {
                    var r = a, o = a, i = a;
                    return m.isArray(e) ? (r = e[0], !m.isArray(e[1]) && /^[\d-]/.test(e[1]) || m.isFunction(e[1]) || b.RegEx.isHex.test(e[1]) ? i = e[1] : (m.isString(e[1]) && !b.RegEx.isHex.test(e[1]) || m.isArray(e[1])) && (o = t ? e[1] : s(e[1], u.duration), e[2] !== a && (i = e[2]))) : r = e, t || (o = o || u.easing), m.isFunction(r) && (r = r.call(n, w, P)), m.isFunction(i) && (i = i.call(n, w, P)), [r || 0, o, i]
                }

                function p(e, t) {
                    var r, a;
                    return a = (t || 0).toString().toLowerCase().replace(/[%A-z]+$/, function (e) {
                        return r = e, ""
                    }), r || (r = b.Values.getUnitType(e)), [a, r]
                }

                function f() {
                    var e = {
                            parent: n.parentNode,
                            position: b.getPropertyValue(n, "position"),
                            fontSize: b.getPropertyValue(n, "fontSize")
                        }, a = e.position === j.lastPosition && e.parent === j.lastParent,
                        o = e.fontSize === j.lastFontSize && e.parent === j.lastParent;
                    j.lastParent = e.parent, j.lastPosition = e.position, j.lastFontSize = e.fontSize, null === j.remToPx && (j.remToPx = parseFloat(b.getPropertyValue(r.body, "fontSize")) || 16), null === j.vwToPx && (j.vwToPx = parseFloat(t.innerWidth) / 100, j.vhToPx = parseFloat(t.innerHeight) / 100);
                    var s = {
                        overflowX: null,
                        overflowY: null,
                        boxSizing: null,
                        width: null,
                        minWidth: null,
                        maxWidth: null,
                        height: null,
                        minHeight: null,
                        maxHeight: null,
                        paddingLeft: null
                    }, l = {}, u = 10;
                    if (l.remToPx = j.remToPx, l.vwToPx = j.vwToPx, l.vhToPx = j.vhToPx, d && !i(n).isSVG) var c = /^auto$/i.test(n.currentStyle.width),
                        p = /^auto$/i.test(n.currentStyle.height);
                    a && o || (i(n).isSVG || (s.overflowX = b.getPropertyValue(n, "overflowX"), s.overflowY = b.getPropertyValue(n, "overflowY"), s.boxSizing = b.getPropertyValue(n, "boxSizing"), s.minWidth = b.getPropertyValue(n, "minWidth"), s.maxWidth = b.getPropertyValue(n, "maxWidth") || "none", s.minHeight = b.getPropertyValue(n, "minHeight"), s.maxHeight = b.getPropertyValue(n, "maxHeight") || "none", s.paddingLeft = b.getPropertyValue(n, "paddingLeft")), s.width = b.getPropertyValue(n, "width", null, !0), s.height = b.getPropertyValue(n, "height", null, !0)), a ? (l.percentToPxRatioWidth = j.lastPercentToPxWidth, l.percentToPxRatioHeight = j.lastPercentToPxHeight) : (i(n).isSVG || (b.setPropertyValue(n, "overflowX", "hidden"), b.setPropertyValue(n, "overflowY", "hidden"), b.setPropertyValue(n, "boxSizing", "content-box"), b.setPropertyValue(n, "minWidth", u + "%"), b.setPropertyValue(n, "maxWidth", u + "%"), b.setPropertyValue(n, "minHeight", u + "%"), b.setPropertyValue(n, "maxHeight", u + "%")), b.setPropertyValue(n, "width", u + "%"), b.setPropertyValue(n, "height", u + "%")), o ? l.emToPx = j.lastEmToPx : i(n).isSVG || b.setPropertyValue(n, "paddingLeft", u + "em"), a || (l.percentToPxRatioWidth = j.lastPercentToPxWidth = (parseFloat(b.getPropertyValue(n, "width", null, !0)) || 1) / u, l.percentToPxRatioHeight = j.lastPercentToPxHeight = (parseFloat(b.getPropertyValue(n, "height", null, !0)) || 1) / u), o || (l.emToPx = j.lastEmToPx = (parseFloat(b.getPropertyValue(n, "paddingLeft")) || 1) / u);
                    for (var g in s) null !== s[g] && b.setPropertyValue(n, g, s[g]);
                    return i(n).isSVG || (d ? (c && b.setPropertyValue(n, "width", "auto"), p && b.setPropertyValue(n, "height", "auto")) : (b.setPropertyValue(n, "height", "auto"), s.height !== b.getPropertyValue(n, "height", null, !0) && b.setPropertyValue(n, "height", s.height), b.setPropertyValue(n, "width", "auto"), s.width !== b.getPropertyValue(n, "width", null, !0) && b.setPropertyValue(n, "width", s.width))), y.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), n), l
                }

                if (u.begin && 0 === w) try {
                    u.begin.call(x, x)
                } catch (h) {
                    setTimeout(function () {
                        throw h
                    }, 1)
                }
                if ("scroll" === E) {
                    var v = /^x$/i.test(u.axis) ? "Left" : "Top", T = parseFloat(u.offset) || 0, C, F, H;
                    u.container ? u.container.jquery || m.isNode(u.container) ? (u.container = u.container[0] || u.container, C = u.container["scroll" + v], H = C + $(n).position()[v.toLowerCase()] + T) : u.container = null : (C = y.State.scrollAnchor[y.State["scrollProperty" + v]], F = y.State.scrollAnchor[y.State["scrollProperty" + ("Left" === v ? "Top" : "Left")]], H = $(n).offset()[v.toLowerCase()] + T), g = {
                        scroll: {
                            rootPropertyValue: !1,
                            startValue: C,
                            currentValue: C,
                            endValue: H,
                            unitType: "",
                            easing: u.easing,
                            scrollData: {container: u.container, direction: v, alternateValue: F}
                        }, element: n
                    }, y.debug && console.log("tweensContainer (scroll): ", g.scroll, n)
                } else if ("reverse" === E) {
                    if (!i(n).tweensContainer) return void $.dequeue(n, u.queue);
                    "none" === i(n).opts.display && (i(n).opts.display = "block"), "hidden" === i(n).opts.visibility && (i(n).opts.visibility = "visible"), i(n).opts.loop = !1, i(n).opts.begin = null, i(n).opts.complete = null, V.easing || delete u.easing, V.duration || delete u.duration, u = $.extend({}, i(n).opts, u);
                    var A = $.extend(!0, {}, i(n).tweensContainer);
                    for (var N in A) if ("element" !== N) {
                        var R = A[N].startValue;
                        A[N].startValue = A[N].currentValue = A[N].endValue, A[N].endValue = R, m.isEmptyObject(V) || (A[N].easing = u.easing), y.debug && console.log("reverse tweensContainer (" + N + "): " + JSON.stringify(A[N]), n)
                    }
                    g = A
                } else if ("start" === E) {
                    var A;
                    i(n).tweensContainer && i(n).isAnimating === !0 && (A = i(n).tweensContainer), $.each(S, function (e, t) {
                        if (RegExp("^" + b.Lists.colors.join("$|^") + "$").test(e)) {
                            var r = c(t, !0), o = r[0], i = r[1], n = r[2];
                            if (b.RegEx.isHex.test(o)) {
                                for (var s = ["Red", "Green", "Blue"], l = b.Values.hexToRgb(o), u = n ? b.Values.hexToRgb(n) : a, p = 0; p < s.length; p++) S[e + s[p]] = [l[p], i, u ? u[p] : u];
                                delete S[e]
                            }
                        }
                    });
                    for (var z in S) {
                        var M = c(S[z]), q = M[0], W = M[1], G = M[2];
                        z = b.Names.camelCase(z);
                        var X = b.Hooks.getRoot(z), Y = !1;
                        if (i(n).isSVG || b.Names.prefixCheck(X)[1] !== !1 || b.Normalizations.registered[X] !== a) {
                            (u.display && "none" !== u.display || u.visibility && "hidden" !== u.visibility) && /opacity|filter/.test(z) && !G && 0 !== q && (G = 0), u._cacheValues && A && A[z] ? (G === a && (G = A[z].endValue + A[z].unitType), Y = i(n).rootPropertyValueCache[X]) : b.Hooks.registered[z] ? G === a ? (Y = b.getPropertyValue(n, X), G = b.getPropertyValue(n, z, Y)) : Y = b.Hooks.templates[X][1] : G === a && (G = b.getPropertyValue(n, z));
                            var B, O, I, Q = !1;
                            B = p(z, G), G = B[0], I = B[1], B = p(z, q), q = B[0].replace(/^([+-\/*])=/, function (e, t) {
                                return Q = t, ""
                            }), O = B[1], G = parseFloat(G) || 0, q = parseFloat(q) || 0;
                            var U;
                            if ("%" === O && (/^(fontSize|lineHeight)$/.test(z) ? (q /= 100, O = "em") : /^scale/.test(z) ? (q /= 100, O = "") : /(Red|Green|Blue)$/i.test(z) && (q = q / 100 * 255, O = "")), /[\/*]/.test(Q)) O = I; else if (I !== O && 0 !== G) if (0 === q) O = I; else {
                                U = U || f();
                                var D = /margin|padding|left|right|width|text|word|letter/i.test(z) || /X$/.test(z) ? "x" : "y";
                                switch (I) {
                                    case"%":
                                        G *= "x" === D ? U.percentToPxRatioWidth : U.percentToPxRatioHeight;
                                        break;
                                    case"px":
                                        break;
                                    default:
                                        G *= U[I + "ToPx"]
                                }
                                switch (O) {
                                    case"%":
                                        G *= 1 / ("x" === D ? U.percentToPxRatioWidth : U.percentToPxRatioHeight);
                                        break;
                                    case"px":
                                        break;
                                    default:
                                        G *= 1 / U[O + "ToPx"]
                                }
                            }
                            switch (Q) {
                                case"+":
                                    q = G + q;
                                    break;
                                case"-":
                                    q = G - q;
                                    break;
                                case"*":
                                    q = G * q;
                                    break;
                                case"/":
                                    q = G / q
                            }
                            g[z] = {
                                rootPropertyValue: Y,
                                startValue: G,
                                currentValue: G,
                                endValue: q,
                                unitType: O,
                                easing: W
                            }, y.debug && console.log("tweensContainer (" + z + "): " + JSON.stringify(g[z]), n)
                        } else y.debug && console.log("Skipping [" + X + "] due to a lack of browser support.")
                    }
                    g.element = n
                }
                g.element && (b.Values.addClass(n, "velocity-animating"), L.push(g), i(n).tweensContainer = g, i(n).opts = u, i(n).isAnimating = !0, w === P - 1 ? (y.State.calls.length > 1e4 && (y.State.calls = o(y.State.calls)), y.State.calls.push([L, x, u, null, k.resolver]), y.State.isTicking === !1 && (y.State.isTicking = !0, l())) : w++)
            }

            var n = this, u = $.extend({}, y.defaults, V), g = {};
            if (i(n) === a && $.data(n, c, {
                    isSVG: m.isSVG(n),
                    isAnimating: !1,
                    computedStyle: null,
                    tweensContainer: null,
                    rootPropertyValueCache: {},
                    transformCache: {}
                }), parseFloat(u.delay) && u.queue !== !1 && $.queue(n, u.queue, function (e) {
                    y.velocityQueueEntryFlag = !0, i(n).delayTimer = {
                        setTimeout: setTimeout(e, parseFloat(u.delay)),
                        next: e
                    }
                }), y.mock === !0) u.duration = 1; else switch (u.duration.toString().toLowerCase()) {
                case"fast":
                    u.duration = 200;
                    break;
                case"normal":
                    u.duration = p;
                    break;
                case"slow":
                    u.duration = 600;
                    break;
                default:
                    u.duration = parseFloat(u.duration) || 1
            }
            u.easing = s(u.easing, u.duration), u.begin && !m.isFunction(u.begin) && (u.begin = null), u.progress && !m.isFunction(u.progress) && (u.progress = null), u.complete && !m.isFunction(u.complete) && (u.complete = null), u.display && (u.display = u.display.toString().toLowerCase(), "auto" === u.display && (u.display = y.CSS.Values.getDisplayType(n))), u.visibility && (u.visibility = u.visibility.toString().toLowerCase()), u.mobileHA = u.mobileHA && y.State.isMobile && !y.State.isGingerbread, u.queue === !1 ? u.delay ? setTimeout(e, u.delay) : e() : $.queue(n, u.queue, function (t, r) {
                return r === !0 ? (k.promise && k.resolver(x), !0) : (y.velocityQueueEntryFlag = !0, void e(t))
            }), "" !== u.queue && "fx" !== u.queue || "inprogress" === $.queue(n)[0] || $.dequeue(n)
        }

        var g = arguments[0] && ($.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || m.isString(arguments[0].properties)),
            f, h, v, x, S, V;
        if (m.isWrapped(this) ? (f = !1, v = 0, x = this, h = this) : (f = !0, v = 1, x = g ? arguments[0].elements : arguments[0]), x = m.isWrapped(x) ? [].slice.call(x) : x) {
            g ? (S = arguments[0].properties, V = arguments[0].options) : (S = arguments[v], V = arguments[v + 1]);
            var P = m.isArray(x) || m.isNodeList(x) ? x.length : 1, w = 0;
            if ("stop" !== S && !$.isPlainObject(V)) {
                var T = v + 1;
                V = {};
                for (var C = T; C < arguments.length; C++) !m.isArray(arguments[C]) && /^\d/.test(arguments[C]) ? V.duration = parseFloat(arguments[C]) : m.isString(arguments[C]) || m.isArray(arguments[C]) ? V.easing = arguments[C] : m.isFunction(arguments[C]) && (V.complete = arguments[C])
            }
            var k = {promise: null, resolver: null, rejecter: null};
            f && y.Promise && (k.promise = new y.Promise(function (e, t) {
                k.resolver = e, k.rejecter = t
            }));
            var E;
            switch (S) {
                case"scroll":
                    E = "scroll";
                    break;
                case"reverse":
                    E = "reverse";
                    break;
                case"stop":
                    $.each(m.isNode(x) ? [x] : x, function (e, t) {
                        i(t) && i(t).delayTimer && (clearTimeout(i(t).delayTimer.setTimeout), i(t).delayTimer.next && i(t).delayTimer.next(), delete i(t).delayTimer)
                    });
                    var F = [];
                    return $.each(y.State.calls, function (e, t) {
                        t && $.each(m.isNode(t[1]) ? [t[1]] : t[1], function (t, r) {
                            $.each(m.isNode(x) ? [x] : x, function (t, a) {
                                if (a === r) {
                                    if (i(a) && $.each(i(a).tweensContainer, function (e, t) {
                                            t.endValue = t.currentValue
                                        }), V === !0 || m.isString(V)) {
                                        var o = m.isString(V) ? V : "";
                                        $.each($.queue(a, o), function (e, t) {
                                            m.isFunction(t) && t(null, !0)
                                        }), $.queue(a, o, [])
                                    }
                                    F.push(e)
                                }
                            })
                        })
                    }), $.each(F, function (e, t) {
                        u(t, !0)
                    }), k.promise && k.resolver(x), e();
                default:
                    if (!$.isPlainObject(S) || m.isEmptyObject(S)) {
                        if (m.isString(S) && y.Sequences[S]) {
                            var H = V.duration, A = V.delay || 0;
                            return V.backwards === !0 && (x = (x.jquery ? [].slice.call(x) : x).reverse()), $.each(x, function (e, t) {
                                parseFloat(V.stagger) ? V.delay = A + parseFloat(V.stagger) * e : m.isFunction(V.stagger) && (V.delay = A + V.stagger.call(t, e, P)), V.drag && (V.duration = parseFloat(H) || (/^(callout|transition)/.test(S) ? 1e3 : p), V.duration = Math.max(V.duration * (V.backwards ? 1 - e / P : (e + 1) / P), .75 * V.duration, 200)), y.Sequences[S].call(t, t, V || {}, e, P, x, k.promise ? k : a)
                            }), e()
                        }
                        var N = "Velocity: First argument (" + S + ") was not a property map, a known action, or a registered sequence. Aborting.";
                        return k.promise ? k.rejecter(new Error(N)) : console.log(N), e()
                    }
                    E = "start"
            }
            var j = {
                lastParent: null,
                lastPosition: null,
                lastFontSize: null,
                lastPercentToPxWidth: null,
                lastPercentToPxHeight: null,
                lastEmToPx: null,
                remToPx: null,
                vwToPx: null,
                vhToPx: null
            }, L = [];
            $.each(m.isNode(x) ? [x] : x, function (e, t) {
                m.isNode(t) && n.call(t)
            });
            var R = $.extend({}, y.defaults, V), z;
            if (R.loop = parseInt(R.loop), z = 2 * R.loop - 1, R.loop) for (var M = 0; z > M; M++) {
                var q = {delay: R.delay};
                M === z - 1 && (q.display = R.display, q.visibility = R.visibility, q.complete = R.complete), y.animate(x, "reverse", q)
            }
            return e()
        }
    };
    var S = t.jQuery || t.Zepto;
    S && (S.fn.velocity = y.animate, S.fn.velocity.defaults = y.defaults), "undefined" != typeof define && define.amd ? define(function () {
        return y
    }) : "undefined" != typeof module && module.exports && (module.exports = y), $.each(["Down", "Up"], function (e, t) {
        y.Sequences["slide" + t] = function (e, r, a, o, i, n) {
            var s = $.extend({}, r), l = {
                height: null,
                marginTop: null,
                marginBottom: null,
                paddingTop: null,
                paddingBottom: null,
                overflow: null,
                overflowX: null,
                overflowY: null
            }, u = s.begin, c = s.complete, p = !1;
            null !== s.display && (s.display = "Down" === t ? s.display || "auto" : s.display || "none"), s.begin = function () {
                function r() {
                    l.height = parseFloat(y.CSS.getPropertyValue(e, "height")), e.style.height = "auto", parseFloat(y.CSS.getPropertyValue(e, "height")) === l.height && (p = !0), y.CSS.setPropertyValue(e, "height", l.height + "px")
                }

                if ("Down" === t) {
                    l.overflow = [y.CSS.getPropertyValue(e, "overflow"), 0], l.overflowX = [y.CSS.getPropertyValue(e, "overflowX"), 0], l.overflowY = [y.CSS.getPropertyValue(e, "overflowY"), 0], e.style.overflow = "hidden", e.style.overflowX = "visible", e.style.overflowY = "hidden", r();
                    for (var a in l) if (!/^overflow/.test(a)) {
                        var o = y.CSS.getPropertyValue(e, a);
                        "height" === a && (o = parseFloat(o)), l[a] = [o, 0]
                    }
                } else {
                    r();
                    for (var a in l) {
                        var o = y.CSS.getPropertyValue(e, a);
                        "height" === a && (o = parseFloat(o)), l[a] = [0, o]
                    }
                    e.style.overflow = "hidden", e.style.overflowX = "visible", e.style.overflowY = "hidden"
                }
                u && u.call(e, e)
            }, s.complete = function (e) {
                var r = "Down" === t ? 0 : 1;
                p === !0 ? l.height[r] = "auto" : l.height[r] += "px";
                for (var a in l) e.style[a] = l[a][r];
                c && c.call(e, e), n && n.resolver(i || e)
            }, y.animate(e, l, s)
        }
    }), $.each(["In", "Out"], function (e, t) {
        y.Sequences["fade" + t] = function (e, r, a, o, i, n) {
            var s = $.extend({}, r), l = {opacity: "In" === t ? 1 : 0};
            if (a !== o - 1) s.complete = s.begin = null; else {
                var u = s.complete;
                s.complete = function () {
                    u && u.call(e, e), n && n.resolver(i || e)
                }
            }
            null !== s.display && (s.display = s.display || ("In" === t ? "auto" : "none")), y.animate(this, l, s)
        }
    })
}(window.jQuery || window.Zepto || window, window, document);
/*!
 * Glide.js
 * Version: 1.0.65
 * Simple, lightweight and fast jQuery slider
 * Author: @JedrzejChalubek
 * Site: http://jedrzejchalubek.com/
 * Licensed under the MIT license
 */
!function (t, i, s, e) {
    function n(i, s) {
        var e = this;
        return this.options = t.extend({}, a, s), this.currentSlide = 0, this.cssSupport = this.css.isSupported("transition") && this.css.isSupported("transform") ? !0 : !1, this.offset = this.options.circular ? 2 : 0, this.options.beforeInit.call(this), this.parent = i, this.init(), this.play(), this.options.afterInit.call(this), {
            current: function () {
                return -e.currentSlide + 1
            }, reinit: function () {
                e.init()
            }, destroy: function () {
                e.destroy()
            }, play: function () {
                e.play()
            }, pause: function () {
                e.pause()
            }, next: function (t) {
                e.slide(1, !1, t)
            }, prev: function (t) {
                e.slide(-1, !1, t)
            }, jump: function (t, i) {
                e.slide(t - 1, !0, i)
            }, nav: function (t) {
                e.navigation.wrapper && e.navigation.wrapper.remove(), e.options.navigation = t ? t : e.options.navigation, e.navigation()
            }, arrows: function (t) {
                e.arrows.wrapper && e.arrows.wrapper.remove(), e.options.arrows = t ? t : e.options.arrows, e.arrows()
            }
        }
    }

    var o = "glide", a = {
        autoplay: 4e3,
        hoverpause: !0,
        circular: !0,
        transition: "slide",
        animationDuration: 500,
        animationTimingFunc: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
        arrows: !0,
        arrowsWrapperClass: "slider__arrows",
        arrowMainClass: "slider__arrows-item",
        arrowRightClass: "slider__arrows-item--right",
        arrowRightText: "next",
        arrowLeftClass: "slider__arrows-item--left",
        arrowLeftText: "prev",
        navigation: !0,
        navigationCenter: !0,
        navigationClass: "slider__nav",
        navigationItemClass: "slider__nav-item",
        navigationCurrentItemClass: "slider__nav-item--current",
        keyboard: !0,
        touchDistance: 60,
        beforeInit: function () {
        },
        afterInit: function () {
        },
        beforeTransition: function () {
        },
        afterTransition: function () {
        }
    };
    n.prototype.build = function () {
        this.bindings(), this.slides.length > 1 && (this.options.arrows && this.arrows(), this.options.navigation && this.navigation()), this.events()
    }, n.prototype.circular = function () {
        this.firstClone = this.slides.filter(":first-child").clone().width(this.slides.spread), this.lastClone = this.slides.filter(":last-child").clone().width(this.slides.spread), this.wrapper.append(this.firstClone).prepend(this.lastClone).width(this.parent.width() * (this.slides.length + 2)).trigger("clearTransition").trigger("setTranslate", [-this.slides.spread])
    }, n.prototype.navigation = function () {
        this.navigation.items = {}, this.navigation.wrapper = t("<div />", {"class": this.options.navigationClass}).appendTo(this.options.navigation === !0 ? this.parent : this.options.navigation);
        for (var i = 0; i < this.slides.length; i++) this.navigation.items[i] = t("<div />", {
            href: "#",
            "class": this.options.navigationItemClass,
            "data-distance": i
        }).appendTo(this.navigation.wrapper);
        this.navigation.items[0].addClass(this.options.navigationCurrentItemClass), this.options.navigationCenter && this.navigation.wrapper.css({
            left: "50%",
            width: this.navigation.wrapper.children().outerWidth(!0) * this.navigation.wrapper.children().length,
            "margin-left": -(this.navigation.wrapper.outerWidth(!0) / 2)
        })
    }, n.prototype.arrows = function () {
        this.arrows.wrapper = t("<div />", {"class": this.options.arrowsWrapperClass}).appendTo(this.options.arrows === !0 ? this.parent : this.options.arrows), this.arrows.right = t("<a />", {
            href: "#",
            "class": this.options.arrowMainClass + " " + this.options.arrowRightClass,
            "data-distance": "1",
            html: this.options.arrowRightText
        }).appendTo(this.arrows.wrapper), this.arrows.left = t("<a />", {
            href: "#",
            "class": this.options.arrowMainClass + " " + this.options.arrowLeftClass,
            "data-distance": "-1",
            html: this.options.arrowLeftText
        }).appendTo(this.arrows.wrapper)
    }, n.prototype.bindings = function () {
        var i = this, s = this.options, e = this.css.getPrefix();
        this.wrapper.bind({
            setTransition: function () {
                t(this).css(e + "transition", e + "transform " + s.animationDuration + "ms " + s.animationTimingFunc)
            }, clearTransition: function () {
                t(this).css(e + "transition", "none")
            }, setTranslate: function (s, n) {
                i.cssSupport ? t(this).css(e + "transform", "translate3d(" + n + "px, 0px, 0px)") : t(this).css("margin-left", n)
            }
        })
    }, n.prototype.events = function () {
        this.options.touchDistance && this.parent.on({
            "touchstart MSPointerDown": t.proxy(this.events.touchstart, this),
            "touchmove MSPointerMove": t.proxy(this.events.touchmove, this),
            "touchend MSPointerUp": t.proxy(this.events.touchend, this)
        }), this.arrows.wrapper && t(this.arrows.wrapper).children().on("click touchstart", t.proxy(this.events.arrows, this)), this.navigation.wrapper && t(this.navigation.wrapper).children().on("click touchstart", t.proxy(this.events.navigation, this)), this.options.keyboard && t(s).on("keyup.glideKeyup", t.proxy(this.events.keyboard, this)), this.options.hoverpause && this.parent.on("mouseover mouseout", t.proxy(this.events.hover, this)), t(i).on("resize", t.proxy(this.events.resize, this))
    }, n.prototype.events.navigation = function (i) {
        this.wrapper.attr("disabled") || (i.preventDefault(), this.slide(t(i.currentTarget).data("distance"), !0))
    }, n.prototype.events.arrows = function (i) {
        this.wrapper.attr("disabled") || (i.preventDefault(), this.slide(t(i.currentTarget).data("distance"), !1))
    }, n.prototype.events.keyboard = function (t) {
        this.wrapper.attr("disabled") || (39 === t.keyCode && this.slide(1), 37 === t.keyCode && this.slide(-1))
    }, n.prototype.events.hover = function (t) {
        this.pause(), "mouseout" === t.type && this.play()
    }, n.prototype.events.resize = function () {
        this.dimensions(), this.slide(0)
    }, n.prototype.disableEvents = function () {
        this.wrapper.attr("disabled", !0)
    }, n.prototype.enableEvents = function () {
        this.wrapper.attr("disabled", !1)
    }, n.prototype.events.touchstart = function (t) {
        if (!this.wrapper.attr("disabled")) {
            var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0];
            this.events.touchStartX = i.pageX, this.events.touchStartY = i.pageY, this.events.touchSin = null
        }
    }, n.prototype.events.touchmove = function (t) {
        if (!this.wrapper.attr("disabled")) {
            var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
                s = i.pageX - this.events.touchStartX, e = i.pageY - this.events.touchStartY, n = Math.abs(s << 2),
                o = Math.abs(e << 2), a = Math.sqrt(n + o), r = Math.sqrt(o);
            this.events.touchSin = Math.asin(r / a), this.events.touchSin * (180 / Math.PI) < 45 && t.preventDefault()
        }
    }, n.prototype.events.touchend = function (t) {
        if (!this.wrapper.attr("disabled")) {
            var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
                s = i.pageX - this.events.touchStartX;
            s > this.options.touchDistance && this.events.touchSin * (180 / Math.PI) < 45 ? this.slide(-1) : s < -this.options.touchDistance && this.events.touchSin * (180 / Math.PI) < 45 && this.slide(1)
        }
    }, n.prototype.slide = function (i, s) {
        this.pause(), this.options.beforeTransition.call(this, i, s);
        var e = s ? 0 : this.currentSlide, n = -(this.slides.length - 1), o = !1, a = !1;
        0 === e && -1 === i ? (o = !0, e = n) : e === n && 1 === i ? (a = !0, e = 0) : e += -i;
        var r = this.slides.spread * e;
        if ("fade" === this.options.transitionType) {
            var h = Math.abs(this.currentSlide), p = h + 1, l = h - 1;
            -n > h || (p = 0), 0 > l && (l = -n), s ? (t(this.slides[p]).fadeIn(2e3), t(this.slides[h]).fadeOut(500)) : 1 === i ? (t(this.slides[p]).fadeIn(2e3), t(this.slides[h]).fadeOut(500)) : (t(this.slides[p]).fadeIn(2e3), t(this.slides[h]).fadeOut(500))
        } else this.cssSupport ? this.wrapper.trigger("setTransition").trigger("setTranslate", [r]) : this.wrapper.stop().animate({"margin-left": r}, this.options.animationDuration);
        this.options.circular, this.options.navigation && this.navigation.wrapper && t("." + this.options.navigationClass, this.options.navigation === !0 ? this.parent : this.options.navigation).children().eq(-e).addClass(this.options.navigationCurrentItemClass).siblings().removeClass(this.options.navigationCurrentItemClass), this.currentSlide = e, this.afterAnimation(function () {
        }), this.play()
    }, n.prototype.play = function () {
        var t = this;
        this.options.autoplay && (this.auto = setInterval(function () {
            t.slide(1, !1)
        }, this.options.autoplay))
    }, n.prototype.pause = function () {
        this.options.autoplay && (this.auto = clearInterval(this.auto))
    }, n.prototype.afterAnimation = function (t) {
        setTimeout(function () {
            t()
        }, this.options.animationDuration + 10)
    }, n.prototype.dimensions = function () {
        this.slides.spread = this.parent.width(), this.wrapper.width(this.slides.spread * (this.slides.length + this.offset)), this.slides.add(this.firstClone).add(this.lastClone).width(this.slides.spread)
    }, n.prototype.destroy = function () {
        this.parent.unbind(), this.wrapper.unbind(), this.wrapper.removeAttr("style"), t(this.navigation.wrapper).children().unbind(), t(this.arrows.wrapper).children().unbind(), this.slide(0, !0), this.pause(), this.options.circular && (this.firstClone.remove(), this.lastClone.remove())
    }, n.prototype.init = function () {
        this.wrapper = this.parent.children(), this.slides = this.wrapper.children(), this.dimensions(), this.build()
    }, n.prototype.css = {
        isSupported: function (t) {
            var n = !1, o = "Khtml ms O Moz Webkit".split(" "), a = s.createElement("div"), r = null;
            if (t = t.toLowerCase(), a.style[t] !== e && (n = !0), n === !1) {
                r = t.charAt(0).toUpperCase() + t.substr(1);
                for (var h = 0; h < o.length; h++) if (a.style[o[h] + r] !== e) {
                    n = !0;
                    break
                }
            }
            return i.opera && i.opera.version() < 13 && (n = !1), ("undefined" === n || n === e) && (n = !1), n
        }, getPrefix: function () {
            if (!i.getComputedStyle) return "";
            var t = i.getComputedStyle(s.documentElement, "");
            return "-" + (Array.prototype.slice.call(t).join("").match(/-(moz|webkit|ms)-/) || "" === t.OLink && ["", "o"])[1] + "-"
        }
    }, t.fn[o] = function (i) {
        return this.each(function () {
            t.data(this, "api_" + o) || t.data(this, "api_" + o, new n(t(this), i))
        })
    }
}(jQuery, window, document);
/*!
imgLiquid v0.9.944 / 03-05-2013
jQuery plugin to resize images to fit in a container.
Copyright (c) 2012 Alejandro Emparan (karacas) @krc_ale
Dual licensed under the MIT and GPL licenses
https://github.com/karacas/imgLiquid
**/
var imgLiquid = imgLiquid || {VER: "0.9.944"};
imgLiquid.bgs_Available = !1, imgLiquid.bgs_CheckRunned = !1, imgLiquid.injectCss = ".imgLiquid img {visibility:hidden}", function (i) {
    function t() {
        if (!imgLiquid.bgs_CheckRunned) {
            imgLiquid.bgs_CheckRunned = !0;
            var t = i('<span style="background-size:cover" />');
            i("body").append(t), !function () {
                var i = t[0];
                if (i && window.getComputedStyle) {
                    var e = window.getComputedStyle(i, null);
                    e && e.backgroundSize && (imgLiquid.bgs_Available = "cover" === e.backgroundSize)
                }
            }(), t.remove()
        }
    }

    i.fn.extend({
        imgLiquid: function (e) {
            this.defaults = {
                fill: !0,
                verticalAlign: "center",
                horizontalAlign: "center",
                useBackgroundSize: !0,
                useDataHtmlAttr: !0,
                responsive: !0,
                delay: 0,
                fadeInTime: 0,
                removeBoxBackground: !0,
                hardPixels: !0,
                responsiveCheckTime: 500,
                timecheckvisibility: 500,
                onStart: null,
                onFinish: null,
                onItemStart: null,
                onItemFinish: null,
                onItemError: null
            }, t();
            var a = this;
            return this.options = e, this.settings = i.extend({}, this.defaults, this.options), this.settings.onStart && this.settings.onStart(), this.each(function (t) {
                function e() {
                    -1 === u.css("background-image").indexOf(encodeURI(c.attr("src"))) && u.css({"background-image": 'url("' + encodeURI(c.attr("src")) + '")'}), u.css({
                        "background-size": g.fill ? "cover" : "contain",
                        "background-position": (g.horizontalAlign + " " + g.verticalAlign).toLowerCase(),
                        "background-repeat": "no-repeat"
                    }), i("a:first", u).css({
                        display: "block",
                        width: "100%",
                        height: "100%"
                    }), i("img", u).css({display: "none"}), g.onItemFinish && g.onItemFinish(t, u, c), u.addClass("imgLiquid_bgSize"), u.addClass("imgLiquid_ready"), l()
                }

                function d() {
                    function e() {
                        c.data("imgLiquid_error") || c.data("imgLiquid_loaded") || c.data("imgLiquid_oldProcessed") || (u.is(":visible") && c[0].complete && c[0].width > 0 && c[0].height > 0 ? (c.data("imgLiquid_loaded", !0), setTimeout(r, t * g.delay)) : setTimeout(e, g.timecheckvisibility))
                    }

                    if (c.data("oldSrc") && c.data("oldSrc") !== c.attr("src")) {
                        var a = c.clone().removeAttr("style");
                        return a.data("imgLiquid_settings", c.data("imgLiquid_settings")), c.parent().prepend(a), c.remove(), c = a, c[0].width = 0, setTimeout(d, 10), void 0
                    }
                    return c.data("imgLiquid_oldProcessed") ? (r(), void 0) : (c.data("imgLiquid_oldProcessed", !1), c.data("oldSrc", c.attr("src")), i("img:not(:first)", u).css("display", "none"), u.css({overflow: "hidden"}), c.fadeTo(0, 0).removeAttr("width").removeAttr("height").css({
                        visibility: "visible",
                        "max-width": "none",
                        "max-height": "none",
                        width: "auto",
                        height: "auto",
                        display: "block"
                    }), c.on("error", n), c[0].onerror = n, e(), o(), void 0)
                }

                function o() {
                    (g.responsive || c.data("imgLiquid_oldProcessed")) && c.data("imgLiquid_settings") && (g = c.data("imgLiquid_settings"), u.actualSize = u.get(0).offsetWidth + u.get(0).offsetHeight / 1e4, u.sizeOld && u.actualSize !== u.sizeOld && r(), u.sizeOld = u.actualSize, setTimeout(o, g.responsiveCheckTime))
                }

                function n() {
                    c.data("imgLiquid_error", !0), u.addClass("imgLiquid_error"), g.onItemError && g.onItemError(t, u, c), l()
                }

                function s() {
                    var i = {};
                    if (a.settings.useDataHtmlAttr) {
                        var t = u.attr("data-imgLiquid-fill"), e = u.attr("data-imgLiquid-horizontalAlign"),
                            d = u.attr("data-imgLiquid-verticalAlign");
                        ("true" === t || "false" === t) && (i.fill = Boolean("true" === t)), void 0 === e || "left" !== e && "center" !== e && "right" !== e && -1 === e.indexOf("%") || (i.horizontalAlign = e), void 0 === d || "top" !== d && "bottom" !== d && "center" !== d && -1 === d.indexOf("%") || (i.verticalAlign = d)
                    }
                    return imgLiquid.isIE && a.settings.ieFadeInDisabled && (i.fadeInTime = 0), i
                }

                function r() {
                    var i, e, a, d, o, n, s, r, m = 0, h = 0, f = u.width(), v = u.height();
                    void 0 === c.data("owidth") && c.data("owidth", c[0].width), void 0 === c.data("oheight") && c.data("oheight", c[0].height), g.fill === f / v >= c.data("owidth") / c.data("oheight") ? (i = "100%", e = "auto", a = Math.floor(f), d = Math.floor(f * (c.data("oheight") / c.data("owidth")))) : (i = "auto", e = "100%", a = Math.floor(v * (c.data("owidth") / c.data("oheight"))), d = Math.floor(v)), o = g.horizontalAlign.toLowerCase(), s = f - a, "left" === o && (h = 0), "center" === o && (h = .5 * s), "right" === o && (h = s), -1 !== o.indexOf("%") && (o = parseInt(o.replace("%", ""), 10), o > 0 && (h = .01 * s * o)), n = g.verticalAlign.toLowerCase(), r = v - d, "left" === n && (m = 0), "center" === n && (m = .5 * r), "bottom" === n && (m = r), -1 !== n.indexOf("%") && (n = parseInt(n.replace("%", ""), 10), n > 0 && (m = .01 * r * n)), g.hardPixels && (i = a, e = d), c.css({
                        width: i,
                        height: e,
                        "margin-left": Math.floor(h),
                        "margin-top": Math.floor(m)
                    }), c.data("imgLiquid_oldProcessed") || (c.fadeTo(g.fadeInTime, 1), c.data("imgLiquid_oldProcessed", !0), g.removeBoxBackground && u.css("background-image", "none"), u.addClass("imgLiquid_nobgSize"), u.addClass("imgLiquid_ready")), g.onItemFinish && g.onItemFinish(t, u, c), l()
                }

                function l() {
                    t === a.length - 1 && a.settings.onFinish && a.settings.onFinish()
                }

                var g = a.settings, u = i(this), c = i("img:first", u);
                return c.length ? (c.data("imgLiquid_settings") ? (u.removeClass("imgLiquid_error").removeClass("imgLiquid_ready"), g = i.extend({}, c.data("imgLiquid_settings"), a.options)) : g = i.extend({}, a.settings, s()), c.data("imgLiquid_settings", g), g.onItemStart && g.onItemStart(t, u, c), imgLiquid.bgs_Available && g.useBackgroundSize ? e() : d(), void 0) : (n(), void 0)
            })
        }
    })
}(jQuery), !function () {
    var i = imgLiquid.injectCss, t = document.getElementsByTagName("head")[0], e = document.createElement("style");
    e.type = "text/css", e.styleSheet ? e.styleSheet.cssText = i : e.appendChild(document.createTextNode(i)), t.appendChild(e)
}();
/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function () {
    function e() {
    }

    function t(e, t) {
        for (var n = e.length; n--;) if (e[n].listener === t) return n;
        return -1
    }

    function n(e) {
        return function () {
            return this[e].apply(this, arguments)
        }
    }

    var i = e.prototype, r = this, o = r.EventEmitter;
    i.getListeners = function (e) {
        var t, n, i = this._getEvents();
        if ("object" == typeof e) {
            t = {};
            for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
        } else t = i[e] || (i[e] = []);
        return t
    }, i.flattenListeners = function (e) {
        var t, n = [];
        for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
        return n
    }, i.getListenersAsObject = function (e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n
    }, i.addListener = function (e, n) {
        var i, r = this.getListenersAsObject(e), o = "object" == typeof n;
        for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {listener: n, once: !1});
        return this
    }, i.on = n("addListener"), i.addOnceListener = function (e, t) {
        return this.addListener(e, {listener: t, once: !0})
    }, i.once = n("addOnceListener"), i.defineEvent = function (e) {
        return this.getListeners(e), this
    }, i.defineEvents = function (e) {
        for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
        return this
    }, i.removeListener = function (e, n) {
        var i, r, o = this.getListenersAsObject(e);
        for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
        return this
    }, i.off = n("removeListener"), i.addListeners = function (e, t) {
        return this.manipulateListeners(!1, e, t)
    }, i.removeListeners = function (e, t) {
        return this.manipulateListeners(!0, e, t)
    }, i.manipulateListeners = function (e, t, n) {
        var i, r, o = e ? this.removeListener : this.addListener, s = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp) for (i = n.length; i--;) o.call(this, t, n[i]); else for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
        return this
    }, i.removeEvent = function (e) {
        var t, n = typeof e, i = this._getEvents();
        if ("string" === n) delete i[e]; else if ("object" === n) for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t]; else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (e, t) {
        var n, i, r, o, s = this.getListenersAsObject(e);
        for (r in s) if (s.hasOwnProperty(r)) for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function (e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }, i.setOnceReturnValue = function (e) {
        return this._onceReturnValue = e, this
    }, i._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, i._getEvents = function () {
        return this._events || (this._events = {})
    }, e.noConflict = function () {
        return r.EventEmitter = o, e
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
        return e
    }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this), function (e) {
    function t(t) {
        var n = e.event;
        return n.target = n.target || n.srcElement || t, n
    }

    var n = document.documentElement, i = function () {
    };
    n.addEventListener ? i = function (e, t, n) {
        e.addEventListener(t, n, !1)
    } : n.attachEvent && (i = function (e, n, i) {
        e[n + i] = i.handleEvent ? function () {
            var n = t(e);
            i.handleEvent.call(i, n)
        } : function () {
            var n = t(e);
            i.call(e, n)
        }, e.attachEvent("on" + n, e[n + i])
    });
    var r = function () {
    };
    n.removeEventListener ? r = function (e, t, n) {
        e.removeEventListener(t, n, !1)
    } : n.detachEvent && (r = function (e, t, n) {
        e.detachEvent("on" + t, e[t + n]);
        try {
            delete e[t + n]
        } catch (i) {
            e[t + n] = void 0
        }
    });
    var o = {bind: i, unbind: r};
    "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
}(this), function (e, t) {
    "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (n, i) {
        return t(e, n, i)
    }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
}(window, function (e, t, n) {
    function i(e, t) {
        for (var n in t) e[n] = t[n];
        return e
    }

    function r(e) {
        return "[object Array]" === d.call(e)
    }

    function o(e) {
        var t = [];
        if (r(e)) t = e; else if ("number" == typeof e.length) for (var n = 0, i = e.length; i > n; n++) t.push(e[n]); else t.push(e);
        return t
    }

    function s(e, t, n) {
        if (!(this instanceof s)) return new s(e, t);
        "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred);
        var r = this;
        setTimeout(function () {
            r.check()
        })
    }

    function f(e) {
        this.img = e
    }

    function c(e) {
        this.src = e, v[e] = this
    }

    var a = e.jQuery, u = e.console, h = u !== void 0, d = Object.prototype.toString;
    s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function () {
        this.images = [];
        for (var e = 0, t = this.elements.length; t > e; e++) {
            var n = this.elements[e];
            "IMG" === n.nodeName && this.addImage(n);
            var i = n.nodeType;
            if (i && (1 === i || 9 === i || 11 === i)) for (var r = n.querySelectorAll("img"), o = 0, s = r.length; s > o; o++) {
                var f = r[o];
                this.addImage(f)
            }
        }
    }, s.prototype.addImage = function (e) {
        var t = new f(e);
        this.images.push(t)
    }, s.prototype.check = function () {
        function e(e, r) {
            return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
        }

        var t = this, n = 0, i = this.images.length;
        if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
        for (var r = 0; i > r; r++) {
            var o = this.images[r];
            o.on("confirm", e), o.check()
        }
    }, s.prototype.progress = function (e) {
        this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
        var t = this;
        setTimeout(function () {
            t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
        })
    }, s.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var t = this;
        setTimeout(function () {
            if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                var n = t.hasAnyBroken ? "reject" : "resolve";
                t.jqDeferred[n](t)
            }
        })
    }, a && (a.fn.imagesLoaded = function (e, t) {
        var n = new s(this, e, t);
        return n.jqDeferred.promise(a(this))
    }), f.prototype = new t, f.prototype.check = function () {
        var e = v[this.img.src] || new c(this.img.src);
        if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
        if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
        var t = this;
        e.on("confirm", function (e, n) {
            return t.confirm(e.isLoaded, n), !0
        }), e.check()
    }, f.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emit("confirm", this, t)
    };
    var v = {};
    return c.prototype = new t, c.prototype.check = function () {
        if (!this.isChecked) {
            var e = new Image;
            n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
        }
    }, c.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, c.prototype.onload = function (e) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(e)
    }, c.prototype.onerror = function (e) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
    }, c.prototype.confirm = function (e, t) {
        this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
    }, c.prototype.unbindProxyEvents = function (e) {
        n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
    }, s
});
/*!
 * Masonry PACKAGED v3.1.5
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
!function (a) {
    function b() {
    }

    function c(a) {
        function c(b) {
            b.prototype.option || (b.prototype.option = function (b) {
                a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b))
            })
        }

        function e(b, c) {
            a.fn[b] = function (e) {
                if ("string" == typeof e) {
                    for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
                        var j = this[h], k = a.data(j, b);
                        if (k) if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                            var l = k[e].apply(k, g);
                            if (void 0 !== l) return l
                        } else f("no such method '" + e + "' for " + b + " instance"); else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'")
                    }
                    return this
                }
                return this.each(function () {
                    var d = a.data(this, b);
                    d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d))
                })
            }
        }

        if (a) {
            var f = "undefined" == typeof console ? b : function (a) {
                console.error(a)
            };
            return a.bridget = function (a, b) {
                c(b), e(a, b)
            }, a.bridget
        }
    }

    var d = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], c) : c(a.jQuery)
}(window), function (a) {
    function b(b) {
        var c = a.event;
        return c.target = c.target || c.srcElement || b, c
    }

    var c = document.documentElement, d = function () {
    };
    c.addEventListener ? d = function (a, b, c) {
        a.addEventListener(b, c, !1)
    } : c.attachEvent && (d = function (a, c, d) {
        a[c + d] = d.handleEvent ? function () {
            var c = b(a);
            d.handleEvent.call(d, c)
        } : function () {
            var c = b(a);
            d.call(a, c)
        }, a.attachEvent("on" + c, a[c + d])
    });
    var e = function () {
    };
    c.removeEventListener ? e = function (a, b, c) {
        a.removeEventListener(b, c, !1)
    } : c.detachEvent && (e = function (a, b, c) {
        a.detachEvent("on" + b, a[b + c]);
        try {
            delete a[b + c]
        } catch (d) {
            a[b + c] = void 0
        }
    });
    var f = {bind: d, unbind: e};
    "function" == typeof define && define.amd ? define("eventie/eventie", f) : "object" == typeof exports ? module.exports = f : a.eventie = f
}(this), function (a) {
    function b(a) {
        "function" == typeof a && (b.isReady ? a() : f.push(a))
    }

    function c(a) {
        var c = "readystatechange" === a.type && "complete" !== e.readyState;
        if (!b.isReady && !c) {
            b.isReady = !0;
            for (var d = 0, g = f.length; g > d; d++) {
                var h = f[d];
                h()
            }
        }
    }

    function d(d) {
        return d.bind(e, "DOMContentLoaded", c), d.bind(e, "readystatechange", c), d.bind(a, "load", c), b
    }

    var e = a.document, f = [];
    b.isReady = !1, "function" == typeof define && define.amd ? (b.isReady = "function" == typeof requirejs, define("doc-ready/doc-ready", ["eventie/eventie"], d)) : a.docReady = d(a.eventie)
}(this), function () {
    function a() {
    }

    function b(a, b) {
        for (var c = a.length; c--;) if (a[c].listener === b) return c;
        return -1
    }

    function c(a) {
        return function () {
            return this[a].apply(this, arguments)
        }
    }

    var d = a.prototype, e = this, f = e.EventEmitter;
    d.getListeners = function (a) {
        var b, c, d = this._getEvents();
        if (a instanceof RegExp) {
            b = {};
            for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c])
        } else b = d[a] || (d[a] = []);
        return b
    }, d.flattenListeners = function (a) {
        var b, c = [];
        for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
        return c
    }, d.getListenersAsObject = function (a) {
        var b, c = this.getListeners(a);
        return c instanceof Array && (b = {}, b[a] = c), b || c
    }, d.addListener = function (a, c) {
        var d, e = this.getListenersAsObject(a), f = "object" == typeof c;
        for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : {listener: c, once: !1});
        return this
    }, d.on = c("addListener"), d.addOnceListener = function (a, b) {
        return this.addListener(a, {listener: b, once: !0})
    }, d.once = c("addOnceListener"), d.defineEvent = function (a) {
        return this.getListeners(a), this
    }, d.defineEvents = function (a) {
        for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
        return this
    }, d.removeListener = function (a, c) {
        var d, e, f = this.getListenersAsObject(a);
        for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
        return this
    }, d.off = c("removeListener"), d.addListeners = function (a, b) {
        return this.manipulateListeners(!1, a, b)
    }, d.removeListeners = function (a, b) {
        return this.manipulateListeners(!0, a, b)
    }, d.manipulateListeners = function (a, b, c) {
        var d, e, f = a ? this.removeListener : this.addListener, g = a ? this.removeListeners : this.addListeners;
        if ("object" != typeof b || b instanceof RegExp) for (d = c.length; d--;) f.call(this, b, c[d]); else for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
        return this
    }, d.removeEvent = function (a) {
        var b, c = typeof a, d = this._getEvents();
        if ("string" === c) delete d[a]; else if (a instanceof RegExp) for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b]; else delete this._events;
        return this
    }, d.removeAllListeners = c("removeEvent"), d.emitEvent = function (a, b) {
        var c, d, e, f, g = this.getListenersAsObject(a);
        for (e in g) if (g.hasOwnProperty(e)) for (d = g[e].length; d--;) c = g[e][d], c.once === !0 && this.removeListener(a, c.listener), f = c.listener.apply(this, b || []), f === this._getOnceReturnValue() && this.removeListener(a, c.listener);
        return this
    }, d.trigger = c("emitEvent"), d.emit = function (a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(a, b)
    }, d.setOnceReturnValue = function (a) {
        return this._onceReturnValue = a, this
    }, d._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, d._getEvents = function () {
        return this._events || (this._events = {})
    }, a.noConflict = function () {
        return e.EventEmitter = f, a
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
        return a
    }) : "object" == typeof module && module.exports ? module.exports = a : this.EventEmitter = a
}.call(this), function (a) {
    function b(a) {
        if (a) {
            if ("string" == typeof d[a]) return a;
            a = a.charAt(0).toUpperCase() + a.slice(1);
            for (var b, e = 0, f = c.length; f > e; e++) if (b = c[e] + a, "string" == typeof d[b]) return b
        }
    }

    var c = "Webkit Moz ms Ms O".split(" "), d = document.documentElement.style;
    "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function () {
        return b
    }) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b
}(window), function (a) {
    function b(a) {
        var b = parseFloat(a), c = -1 === a.indexOf("%") && !isNaN(b);
        return c && b
    }

    function c() {
        for (var a = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, b = 0, c = g.length; c > b; b++) {
            var d = g[b];
            a[d] = 0
        }
        return a
    }

    function d(a) {
        function d(a) {
            if ("string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) {
                var d = f(a);
                if ("none" === d.display) return c();
                var e = {};
                e.width = a.offsetWidth, e.height = a.offsetHeight;
                for (var k = e.isBorderBox = !(!j || !d[j] || "border-box" !== d[j]), l = 0, m = g.length; m > l; l++) {
                    var n = g[l], o = d[n];
                    o = h(a, o);
                    var p = parseFloat(o);
                    e[n] = isNaN(p) ? 0 : p
                }
                var q = e.paddingLeft + e.paddingRight, r = e.paddingTop + e.paddingBottom,
                    s = e.marginLeft + e.marginRight, t = e.marginTop + e.marginBottom,
                    u = e.borderLeftWidth + e.borderRightWidth, v = e.borderTopWidth + e.borderBottomWidth, w = k && i,
                    x = b(d.width);
                x !== !1 && (e.width = x + (w ? 0 : q + u));
                var y = b(d.height);
                return y !== !1 && (e.height = y + (w ? 0 : r + v)), e.innerWidth = e.width - (q + u), e.innerHeight = e.height - (r + v), e.outerWidth = e.width + s, e.outerHeight = e.height + t, e
            }
        }

        function h(a, b) {
            if (e || -1 === b.indexOf("%")) return b;
            var c = a.style, d = c.left, f = a.runtimeStyle, g = f && f.left;
            return g && (f.left = a.currentStyle.left), c.left = b, b = c.pixelLeft, c.left = d, g && (f.left = g), b
        }

        var i, j = a("boxSizing");
        return function () {
            if (j) {
                var a = document.createElement("div");
                a.style.width = "200px", a.style.padding = "1px 2px 3px 4px", a.style.borderStyle = "solid", a.style.borderWidth = "1px 2px 3px 4px", a.style[j] = "border-box";
                var c = document.body || document.documentElement;
                c.appendChild(a);
                var d = f(a);
                i = 200 === b(d.width), c.removeChild(a)
            }
        }(), d
    }

    var e = a.getComputedStyle, f = e ? function (a) {
            return e(a, null)
        } : function (a) {
            return a.currentStyle
        },
        g = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
    "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], d) : "object" == typeof exports ? module.exports = d(require("get-style-property")) : a.getSize = d(a.getStyleProperty)
}(window), function (a, b) {
    function c(a, b) {
        return a[h](b)
    }

    function d(a) {
        if (!a.parentNode) {
            var b = document.createDocumentFragment();
            b.appendChild(a)
        }
    }

    function e(a, b) {
        d(a);
        for (var c = a.parentNode.querySelectorAll(b), e = 0, f = c.length; f > e; e++) if (c[e] === a) return !0;
        return !1
    }

    function f(a, b) {
        return d(a), c(a, b)
    }

    var g, h = function () {
        if (b.matchesSelector) return "matchesSelector";
        for (var a = ["webkit", "moz", "ms", "o"], c = 0, d = a.length; d > c; c++) {
            var e = a[c], f = e + "MatchesSelector";
            if (b[f]) return f
        }
    }();
    if (h) {
        var i = document.createElement("div"), j = c(i, "div");
        g = j ? c : f
    } else g = e;
    "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function () {
        return g
    }) : window.matchesSelector = g
}(this, Element.prototype), function (a) {
    function b(a, b) {
        for (var c in b) a[c] = b[c];
        return a
    }

    function c(a) {
        for (var b in a) return !1;
        return b = null, !0
    }

    function d(a) {
        return a.replace(/([A-Z])/g, function (a) {
            return "-" + a.toLowerCase()
        })
    }

    function e(a, e, f) {
        function h(a, b) {
            a && (this.element = a, this.layout = b, this.position = {x: 0, y: 0}, this._create())
        }

        var i = f("transition"), j = f("transform"), k = i && j, l = !!f("perspective"), m = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "otransitionend",
            transition: "transitionend"
        }[i], n = ["transform", "transition", "transitionDuration", "transitionProperty"], o = function () {
            for (var a = {}, b = 0, c = n.length; c > b; b++) {
                var d = n[b], e = f(d);
                e && e !== d && (a[d] = e)
            }
            return a
        }();
        b(h.prototype, a.prototype), h.prototype._create = function () {
            this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
        }, h.prototype.handleEvent = function (a) {
            var b = "on" + a.type;
            this[b] && this[b](a)
        }, h.prototype.getSize = function () {
            this.size = e(this.element)
        }, h.prototype.css = function (a) {
            var b = this.element.style;
            for (var c in a) {
                var d = o[c] || c;
                b[d] = a[c]
            }
        }, h.prototype.getPosition = function () {
            var a = g(this.element), b = this.layout.options, c = b.isOriginLeft, d = b.isOriginTop,
                e = parseInt(a[c ? "left" : "right"], 10), f = parseInt(a[d ? "top" : "bottom"], 10);
            e = isNaN(e) ? 0 : e, f = isNaN(f) ? 0 : f;
            var h = this.layout.size;
            e -= c ? h.paddingLeft : h.paddingRight, f -= d ? h.paddingTop : h.paddingBottom, this.position.x = e, this.position.y = f
        }, h.prototype.layoutPosition = function () {
            var a = this.layout.size, b = this.layout.options, c = {};
            b.isOriginLeft ? (c.left = this.position.x + a.paddingLeft + "px", c.right = "") : (c.right = this.position.x + a.paddingRight + "px", c.left = ""), b.isOriginTop ? (c.top = this.position.y + a.paddingTop + "px", c.bottom = "") : (c.bottom = this.position.y + a.paddingBottom + "px", c.top = ""), this.css(c), this.emitEvent("layout", [this])
        };
        var p = l ? function (a, b) {
            return "translate3d(" + a + "px, " + b + "px, 0)"
        } : function (a, b) {
            return "translate(" + a + "px, " + b + "px)"
        };
        h.prototype._transitionTo = function (a, b) {
            this.getPosition();
            var c = this.position.x, d = this.position.y, e = parseInt(a, 10), f = parseInt(b, 10),
                g = e === this.position.x && f === this.position.y;
            if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition();
            var h = a - c, i = b - d, j = {}, k = this.layout.options;
            h = k.isOriginLeft ? h : -h, i = k.isOriginTop ? i : -i, j.transform = p(h, i), this.transition({
                to: j,
                onTransitionEnd: {transform: this.layoutPosition},
                isCleaning: !0
            })
        }, h.prototype.goTo = function (a, b) {
            this.setPosition(a, b), this.layoutPosition()
        }, h.prototype.moveTo = k ? h.prototype._transitionTo : h.prototype.goTo, h.prototype.setPosition = function (a, b) {
            this.position.x = parseInt(a, 10), this.position.y = parseInt(b, 10)
        }, h.prototype._nonTransition = function (a) {
            this.css(a.to), a.isCleaning && this._removeStyles(a.to);
            for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this)
        }, h.prototype._transition = function (a) {
            if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a);
            var b = this._transn;
            for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
            for (c in a.to) b.ingProperties[c] = !0, a.isCleaning && (b.clean[c] = !0);
            if (a.from) {
                this.css(a.from);
                var d = this.element.offsetHeight;
                d = null
            }
            this.enableTransition(a.to), this.css(a.to), this.isTransitioning = !0
        };
        var q = j && d(j) + ",opacity";
        h.prototype.enableTransition = function () {
            this.isTransitioning || (this.css({
                transitionProperty: q,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(m, this, !1))
        }, h.prototype.transition = h.prototype[i ? "_transition" : "_nonTransition"], h.prototype.onwebkitTransitionEnd = function (a) {
            this.ontransitionend(a)
        }, h.prototype.onotransitionend = function (a) {
            this.ontransitionend(a)
        };
        var r = {"-webkit-transform": "transform", "-moz-transform": "transform", "-o-transform": "transform"};
        h.prototype.ontransitionend = function (a) {
            if (a.target === this.element) {
                var b = this._transn, d = r[a.propertyName] || a.propertyName;
                if (delete b.ingProperties[d], c(b.ingProperties) && this.disableTransition(), d in b.clean && (this.element.style[a.propertyName] = "", delete b.clean[d]), d in b.onEnd) {
                    var e = b.onEnd[d];
                    e.call(this), delete b.onEnd[d]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, h.prototype.disableTransition = function () {
            this.removeTransitionStyles(), this.element.removeEventListener(m, this, !1), this.isTransitioning = !1
        }, h.prototype._removeStyles = function (a) {
            var b = {};
            for (var c in a) b[c] = "";
            this.css(b)
        };
        var s = {transitionProperty: "", transitionDuration: ""};
        return h.prototype.removeTransitionStyles = function () {
            this.css(s)
        }, h.prototype.removeElem = function () {
            this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
        }, h.prototype.remove = function () {
            if (!i || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
            var a = this;
            this.on("transitionEnd", function () {
                return a.removeElem(), !0
            }), this.hide()
        }, h.prototype.reveal = function () {
            delete this.isHidden, this.css({display: ""});
            var a = this.layout.options;
            this.transition({from: a.hiddenStyle, to: a.visibleStyle, isCleaning: !0})
        }, h.prototype.hide = function () {
            this.isHidden = !0, this.css({display: ""});
            var a = this.layout.options;
            this.transition({
                from: a.visibleStyle,
                to: a.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: {
                    opacity: function () {
                        this.isHidden && this.css({display: "none"})
                    }
                }
            })
        }, h.prototype.destroy = function () {
            this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
        }, h
    }

    var f = a.getComputedStyle, g = f ? function (a) {
        return f(a, null)
    } : function (a) {
        return a.currentStyle
    };
    "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], e) : (a.Outlayer = {}, a.Outlayer.Item = e(a.EventEmitter, a.getSize, a.getStyleProperty))
}(window), function (a) {
    function b(a, b) {
        for (var c in b) a[c] = b[c];
        return a
    }

    function c(a) {
        return "[object Array]" === l.call(a)
    }

    function d(a) {
        var b = [];
        if (c(a)) b = a; else if (a && "number" == typeof a.length) for (var d = 0, e = a.length; e > d; d++) b.push(a[d]); else b.push(a);
        return b
    }

    function e(a, b) {
        var c = n(b, a);
        -1 !== c && b.splice(c, 1)
    }

    function f(a) {
        return a.replace(/(.)([A-Z])/g, function (a, b, c) {
            return b + "-" + c
        }).toLowerCase()
    }

    function g(c, g, l, n, o, p) {
        function q(a, c) {
            if ("string" == typeof a && (a = h.querySelector(a)), !a || !m(a)) return void(i && i.error("Bad " + this.constructor.namespace + " element: " + a));
            this.element = a, this.options = b({}, this.constructor.defaults), this.option(c);
            var d = ++r;
            this.element.outlayerGUID = d, s[d] = this, this._create(), this.options.isInitLayout && this.layout()
        }

        var r = 0, s = {};
        return q.namespace = "outlayer", q.Item = p, q.defaults = {
            containerStyle: {position: "relative"},
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
            visibleStyle: {opacity: 1, transform: "scale(1)"}
        }, b(q.prototype, l.prototype), q.prototype.option = function (a) {
            b(this.options, a)
        }, q.prototype._create = function () {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), b(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
        }, q.prototype.reloadItems = function () {
            this.items = this._itemize(this.element.children)
        }, q.prototype._itemize = function (a) {
            for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0, f = b.length; f > e; e++) {
                var g = b[e], h = new c(g, this);
                d.push(h)
            }
            return d
        }, q.prototype._filterFindItemElements = function (a) {
            a = d(a);
            for (var b = this.options.itemSelector, c = [], e = 0, f = a.length; f > e; e++) {
                var g = a[e];
                if (m(g)) if (b) {
                    o(g, b) && c.push(g);
                    for (var h = g.querySelectorAll(b), i = 0, j = h.length; j > i; i++) c.push(h[i])
                } else c.push(g)
            }
            return c
        }, q.prototype.getItemElements = function () {
            for (var a = [], b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].element);
            return a
        }, q.prototype.layout = function () {
            this._resetLayout(), this._manageStamps();
            var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, a), this._isLayoutInited = !0
        }, q.prototype._init = q.prototype.layout, q.prototype._resetLayout = function () {
            this.getSize()
        }, q.prototype.getSize = function () {
            this.size = n(this.element)
        }, q.prototype._getMeasurement = function (a, b) {
            var c, d = this.options[a];
            d ? ("string" == typeof d ? c = this.element.querySelector(d) : m(d) && (c = d), this[a] = c ? n(c)[b] : d) : this[a] = 0
        }, q.prototype.layoutItems = function (a, b) {
            a = this._getItemsForLayout(a), this._layoutItems(a, b), this._postLayout()
        }, q.prototype._getItemsForLayout = function (a) {
            for (var b = [], c = 0, d = a.length; d > c; c++) {
                var e = a[c];
                e.isIgnored || b.push(e)
            }
            return b
        }, q.prototype._layoutItems = function (a, b) {
            function c() {
                d.emitEvent("layoutComplete", [d, a])
            }

            var d = this;
            if (!a || !a.length) return void c();
            this._itemsOn(a, "layout", c);
            for (var e = [], f = 0, g = a.length; g > f; f++) {
                var h = a[f], i = this._getItemLayoutPosition(h);
                i.item = h, i.isInstant = b || h.isLayoutInstant, e.push(i)
            }
            this._processLayoutQueue(e)
        }, q.prototype._getItemLayoutPosition = function () {
            return {x: 0, y: 0}
        }, q.prototype._processLayoutQueue = function (a) {
            for (var b = 0, c = a.length; c > b; b++) {
                var d = a[b];
                this._positionItem(d.item, d.x, d.y, d.isInstant)
            }
        }, q.prototype._positionItem = function (a, b, c, d) {
            d ? a.goTo(b, c) : a.moveTo(b, c)
        }, q.prototype._postLayout = function () {
            this.resizeContainer()
        }, q.prototype.resizeContainer = function () {
            if (this.options.isResizingContainer) {
                var a = this._getContainerSize();
                a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1))
            }
        }, q.prototype._getContainerSize = k, q.prototype._setContainerMeasure = function (a, b) {
            if (void 0 !== a) {
                var c = this.size;
                c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth), a = Math.max(a, 0), this.element.style[b ? "width" : "height"] = a + "px"
            }
        }, q.prototype._itemsOn = function (a, b, c) {
            function d() {
                return e++, e === f && c.call(g), !0
            }

            for (var e = 0, f = a.length, g = this, h = 0, i = a.length; i > h; h++) {
                var j = a[h];
                j.on(b, d)
            }
        }, q.prototype.ignore = function (a) {
            var b = this.getItem(a);
            b && (b.isIgnored = !0)
        }, q.prototype.unignore = function (a) {
            var b = this.getItem(a);
            b && delete b.isIgnored
        }, q.prototype.stamp = function (a) {
            if (a = this._find(a)) {
                this.stamps = this.stamps.concat(a);
                for (var b = 0, c = a.length; c > b; b++) {
                    var d = a[b];
                    this.ignore(d)
                }
            }
        }, q.prototype.unstamp = function (a) {
            if (a = this._find(a)) for (var b = 0, c = a.length; c > b; b++) {
                var d = a[b];
                e(d, this.stamps), this.unignore(d)
            }
        }, q.prototype._find = function (a) {
            return a ? ("string" == typeof a && (a = this.element.querySelectorAll(a)), a = d(a)) : void 0
        }, q.prototype._manageStamps = function () {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var a = 0, b = this.stamps.length; b > a; a++) {
                    var c = this.stamps[a];
                    this._manageStamp(c)
                }
            }
        }, q.prototype._getBoundingRect = function () {
            var a = this.element.getBoundingClientRect(), b = this.size;
            this._boundingRect = {
                left: a.left + b.paddingLeft + b.borderLeftWidth,
                top: a.top + b.paddingTop + b.borderTopWidth,
                right: a.right - (b.paddingRight + b.borderRightWidth),
                bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth)
            }
        }, q.prototype._manageStamp = k, q.prototype._getElementOffset = function (a) {
            var b = a.getBoundingClientRect(), c = this._boundingRect, d = n(a), e = {
                left: b.left - c.left - d.marginLeft,
                top: b.top - c.top - d.marginTop,
                right: c.right - b.right - d.marginRight,
                bottom: c.bottom - b.bottom - d.marginBottom
            };
            return e
        }, q.prototype.handleEvent = function (a) {
            var b = "on" + a.type;
            this[b] && this[b](a)
        }, q.prototype.bindResize = function () {
            this.isResizeBound || (c.bind(a, "resize", this), this.isResizeBound = !0)
        }, q.prototype.unbindResize = function () {
            this.isResizeBound && c.unbind(a, "resize", this), this.isResizeBound = !1
        }, q.prototype.onresize = function () {
            function a() {
                b.resize(), delete b.resizeTimeout
            }

            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var b = this;
            this.resizeTimeout = setTimeout(a, 100)
        }, q.prototype.resize = function () {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, q.prototype.needsResizeLayout = function () {
            var a = n(this.element), b = this.size && a;
            return b && a.innerWidth !== this.size.innerWidth
        }, q.prototype.addItems = function (a) {
            var b = this._itemize(a);
            return b.length && (this.items = this.items.concat(b)), b
        }, q.prototype.appended = function (a) {
            var b = this.addItems(a);
            b.length && (this.layoutItems(b, !0), this.reveal(b))
        }, q.prototype.prepended = function (a) {
            var b = this._itemize(a);
            if (b.length) {
                var c = this.items.slice(0);
                this.items = b.concat(c), this._resetLayout(), this._manageStamps(), this.layoutItems(b, !0), this.reveal(b), this.layoutItems(c)
            }
        }, q.prototype.reveal = function (a) {
            var b = a && a.length;
            if (b) for (var c = 0; b > c; c++) {
                var d = a[c];
                d.reveal()
            }
        }, q.prototype.hide = function (a) {
            var b = a && a.length;
            if (b) for (var c = 0; b > c; c++) {
                var d = a[c];
                d.hide()
            }
        }, q.prototype.getItem = function (a) {
            for (var b = 0, c = this.items.length; c > b; b++) {
                var d = this.items[b];
                if (d.element === a) return d
            }
        }, q.prototype.getItems = function (a) {
            if (a && a.length) {
                for (var b = [], c = 0, d = a.length; d > c; c++) {
                    var e = a[c], f = this.getItem(e);
                    f && b.push(f)
                }
                return b
            }
        }, q.prototype.remove = function (a) {
            a = d(a);
            var b = this.getItems(a);
            if (b && b.length) {
                this._itemsOn(b, "remove", function () {
                    this.emitEvent("removeComplete", [this, b])
                });
                for (var c = 0, f = b.length; f > c; c++) {
                    var g = b[c];
                    g.remove(), e(g, this.items)
                }
            }
        }, q.prototype.destroy = function () {
            var a = this.element.style;
            a.height = "", a.position = "", a.width = "";
            for (var b = 0, c = this.items.length; c > b; b++) {
                var d = this.items[b];
                d.destroy()
            }
            this.unbindResize(), delete this.element.outlayerGUID, j && j.removeData(this.element, this.constructor.namespace)
        }, q.data = function (a) {
            var b = a && a.outlayerGUID;
            return b && s[b]
        }, q.create = function (a, c) {
            function d() {
                q.apply(this, arguments)
            }

            return Object.create ? d.prototype = Object.create(q.prototype) : b(d.prototype, q.prototype), d.prototype.constructor = d, d.defaults = b({}, q.defaults), b(d.defaults, c), d.prototype.settings = {}, d.namespace = a, d.data = q.data, d.Item = function () {
                p.apply(this, arguments)
            }, d.Item.prototype = new p, g(function () {
                for (var b = f(a), c = h.querySelectorAll(".js-" + b), e = "data-" + b + "-options", g = 0, k = c.length; k > g; g++) {
                    var l, m = c[g], n = m.getAttribute(e);
                    try {
                        l = n && JSON.parse(n)
                    } catch (o) {
                        i && i.error("Error parsing " + e + " on " + m.nodeName.toLowerCase() + (m.id ? "#" + m.id : "") + ": " + o);
                        continue
                    }
                    var p = new d(m, l);
                    j && j.data(m, a, p)
                }
            }), j && j.bridget && j.bridget(a, d), d
        }, q.Item = p, q
    }

    var h = a.document, i = a.console, j = a.jQuery, k = function () {
    }, l = Object.prototype.toString, m = "object" == typeof HTMLElement ? function (a) {
        return a instanceof HTMLElement
    } : function (a) {
        return a && "object" == typeof a && 1 === a.nodeType && "string" == typeof a.nodeName
    }, n = Array.prototype.indexOf ? function (a, b) {
        return a.indexOf(b)
    } : function (a, b) {
        for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
        return -1
    };
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], g) : a.Outlayer = g(a.eventie, a.docReady, a.EventEmitter, a.getSize, a.matchesSelector, a.Outlayer.Item)
}(window), function (a) {
    function b(a, b) {
        var d = a.create("masonry");
        return d.prototype._resetLayout = function () {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
            var a = this.cols;
            for (this.colYs = []; a--;) this.colYs.push(0);
            this.maxY = 0
        }, d.prototype.measureColumns = function () {
            if (this.getContainerWidth(), !this.columnWidth) {
                var a = this.items[0], c = a && a.element;
                this.columnWidth = c && b(c).outerWidth || this.containerWidth
            }
            this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
        }, d.prototype.getContainerWidth = function () {
            var a = this.options.isFitWidth ? this.element.parentNode : this.element, c = b(a);
            this.containerWidth = c && c.innerWidth
        }, d.prototype._getItemLayoutPosition = function (a) {
            a.getSize();
            var b = a.size.outerWidth % this.columnWidth, d = b && 1 > b ? "round" : "ceil",
                e = Math[d](a.size.outerWidth / this.columnWidth);
            e = Math.min(e, this.cols);
            for (var f = this._getColGroup(e), g = Math.min.apply(Math, f), h = c(f, g), i = {
                x: this.columnWidth * h,
                y: g
            }, j = g + a.size.outerHeight, k = this.cols + 1 - f.length, l = 0; k > l; l++) this.colYs[h + l] = j;
            return i
        }, d.prototype._getColGroup = function (a) {
            if (2 > a) return this.colYs;
            for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
                var e = this.colYs.slice(d, d + a);
                b[d] = Math.max.apply(Math, e)
            }
            return b
        }, d.prototype._manageStamp = function (a) {
            var c = b(a), d = this._getElementOffset(a), e = this.options.isOriginLeft ? d.left : d.right,
                f = e + c.outerWidth, g = Math.floor(e / this.columnWidth);
            g = Math.max(0, g);
            var h = Math.floor(f / this.columnWidth);
            h -= f % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
            for (var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight, j = g; h >= j; j++) this.colYs[j] = Math.max(i, this.colYs[j])
        }, d.prototype._getContainerSize = function () {
            this.maxY = Math.max.apply(Math, this.colYs);
            var a = {height: this.maxY};
            return this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a
        }, d.prototype._getContainerFitWidth = function () {
            for (var a = 0, b = this.cols; --b && 0 === this.colYs[b];) a++;
            return (this.cols - a) * this.columnWidth - this.gutter
        }, d.prototype.needsResizeLayout = function () {
            var a = this.containerWidth;
            return this.getContainerWidth(), a !== this.containerWidth
        }, d
    }

    var c = Array.prototype.indexOf ? function (a, b) {
        return a.indexOf(b)
    } : function (a, b) {
        for (var c = 0, d = a.length; d > c; c++) {
            var e = a[c];
            if (e === b) return c
        }
        return -1
    };
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], b) : a.Masonry = b(a.Outlayer, a.getSize)
}(window);
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-rgba-cssanimations-shiv-cssclasses-teststyles-testprop-testallprops-domprefixes-load
 */
;window.Modernizr = function (a, b, c) {
    function y(a) {
        j.cssText = a
    }

    function z(a, b) {
        return y(prefixes.join(a + ";") + (b || ""))
    }

    function A(a, b) {
        return typeof a === b
    }

    function B(a, b) {
        return !!~("" + a).indexOf(b)
    }

    function C(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!B(e, "-") && j[e] !== c) return b == "pfx" ? e : !0
        }
        return !1
    }

    function D(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : A(f, "function") ? f.bind(d || b) : f
        }
        return !1
    }

    function E(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1), e = (a + " " + n.join(d + " ") + d).split(" ");
        return A(b, "string") || A(b, "undefined") ? C(e, b) : (e = (a + " " + o.join(d + " ") + d).split(" "), D(e, b, c))
    }

    var d = "2.8.3", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style, k,
        l = {}.toString, m = "Webkit Moz O ms", n = m.split(" "), o = m.toLowerCase().split(" "), p = {}, q = {},
        r = {}, s = [], t = s.slice, u, v = function (a, c, d, e) {
            var f, i, j, k, l = b.createElement("div"), m = b.body, n = m || b.createElement("body");
            if (parseInt(d, 10)) while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
            return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i
        }, w = {}.hasOwnProperty, x;
    !A(w, "undefined") && !A(w.call, "undefined") ? x = function (a, b) {
        return w.call(a, b)
    } : x = function (a, b) {
        return b in a && A(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function (b) {
        var c = this;
        if (typeof c != "function") throw new TypeError;
        var d = t.call(arguments, 1), e = function () {
            if (this instanceof e) {
                var a = function () {
                };
                a.prototype = c.prototype;
                var f = new a, g = c.apply(f, d.concat(t.call(arguments)));
                return Object(g) === g ? g : f
            }
            return c.apply(b, d.concat(t.call(arguments)))
        };
        return e
    }), p.rgba = function () {
        return y("background-color:rgba(150,255,150,.5)"), B(j.backgroundColor, "rgba")
    }, p.backgroundsize = function () {
        return E("backgroundSize")
    }, p.cssanimations = function () {
        return E("animationName")
    }, p.fontface = function () {
        var a;
        return v('@font-face {font-family:"font";src:url("https://")}', function (c, d) {
            var e = b.getElementById("smodernizr"), f = e.sheet || e.styleSheet,
                g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
            a = /src/i.test(g) && g.indexOf(d.split(" ")[0]) === 0
        }), a
    };
    for (var F in p) x(p, F) && (u = F.toLowerCase(), e[u] = p[F](), s.push((e[u] ? "" : "no-") + u));
    return e.addTest = function (a, b) {
        if (typeof a == "object") for (var d in a) x(a, d) && e.addTest(d, a[d]); else {
            a = a.toLowerCase();
            if (e[a] !== c) return e;
            b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
        }
        return e
    }, y(""), i = k = null, function (a, b) {
        function l(a, b) {
            var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
        }

        function m() {
            var a = s.elements;
            return typeof a == "string" ? a.split(" ") : a
        }

        function n(a) {
            var b = j[a[h]];
            return b || (b = {}, i++, a[h] = i, j[i] = b), b
        }

        function o(a, c, d) {
            c || (c = b);
            if (k) return c.createElement(a);
            d || (d = n(c));
            var g;
            return d.cache[a] ? g = d.cache[a].cloneNode() : f.test(a) ? g = (d.cache[a] = d.createElem(a)).cloneNode() : g = d.createElem(a), g.canHaveChildren && !e.test(a) && !g.tagUrn ? d.frag.appendChild(g) : g
        }

        function p(a, c) {
            a || (a = b);
            if (k) return a.createDocumentFragment();
            c = c || n(a);
            var d = c.frag.cloneNode(), e = 0, f = m(), g = f.length;
            for (; e < g; e++) d.createElement(f[e]);
            return d
        }

        function q(a, b) {
            b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function (c) {
                return s.shivMethods ? o(c, a, b) : b.createElem(c)
            }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/[\w\-]+/g, function (a) {
                return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
            }) + ");return n}")(s, b.frag)
        }

        function r(a) {
            a || (a = b);
            var c = n(a);
            return s.shivCSS && !g && !c.hasCSS && (c.hasCSS = !!l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || q(a, c), a
        }

        var c = "3.7.0", d = a.html5 || {}, e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            g, h = "_html5shiv", i = 0, j = {}, k;
        (function () {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>", g = "hidden" in a, k = a.childNodes.length == 1 || function () {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined"
                }()
            } catch (c) {
                g = !0, k = !0
            }
        })();
        var s = {
            elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: c,
            shivCSS: d.shivCSS !== !1,
            supportsUnknownElements: k,
            shivMethods: d.shivMethods !== !1,
            type: "default",
            shivDocument: r,
            createElement: o,
            createDocumentFragment: p
        };
        a.html5 = s, r(b)
    }(this, b), e._version = d, e._domPrefixes = o, e._cssomPrefixes = n, e.testProp = function (a) {
        return C([a])
    }, e.testAllProps = E, e.testStyles = v, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + s.join(" ") : ""), e
}(this, this.document), function (a, b, c) {
    function d(a) {
        return "[object Function]" == o.call(a)
    }

    function e(a) {
        return "string" == typeof a
    }

    function f() {
    }

    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a
    }

    function h() {
        var a = p.shift();
        q = 1, a ? a.t ? m(function () {
            ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
        }, 0) : (a(), h()) : q = 0
    }

    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
                "img" != a && m(function () {
                    t.removeChild(l)
                }, 50);
                for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
            }
        }

        var j = j || B.errorTimeout, l = b.createElement(a), o = 0, r = 0, u = {t: d, s: c, e: f, a: i, x: j};
        1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () {
            k.call(this, r)
        }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
    }

    function j(a, b, c, d, f) {
        return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
    }

    function k() {
        var a = B;
        return a.loader = {load: j, i: 0}, a
    }

    var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [],
        q = 0, r = "MozAppearance" in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode,
        l = a.opera && "[object Opera]" == o.call(a.opera), l = !!b.attachEvent && !l,
        u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function (a) {
            return "[object Array]" == o.call(a)
        }, x = [], y = {}, z = {
            timeout: function (a, b) {
                return b.length && (a.timeout = b[0]), a
            }
        }, A, B;
    B = function (a) {
        function b(a) {
            var a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = {url: c, origUrl: c, prefixes: a}, e, f,
                g;
            for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
            for (f = 0; f < b; f++) c = x[f](c);
            return c
        }

        function g(a, e, f, g, h) {
            var i = b(a), j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function () {
                k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
            })))
        }

        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a)) c || (j = function () {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l()
                    }), g(a, j, b, 0, h); else if (Object(a) === a) for (n in m = function () {
                        var b = 0, c;
                        for (c in a) a.hasOwnProperty(c) && b++;
                        return b
                    }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function () {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l()
                    } : j[n] = function (a) {
                        return function () {
                            var b = [].slice.call(arguments);
                            a && a.apply(this, b), l()
                        }
                    }(k[n])), g(a[n], j, b, n, h))
                } else !c && l()
            }

            var h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f, m, n;
            c(h ? a.yep : a.nope, !!i), i && c(i)
        }

        var i, j, l = this.yepnope.loader;
        if (e(a)) g(a, 0, l, 0); else if (w(a)) for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l); else Object(a) === a && h(a, l)
    }, B.addPrefix = function (a, b) {
        z[a] = b
    }, B.addFilter = function (a) {
        x.push(a)
    }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function () {
        b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) {
        var k = b.createElement("script"), l, o, e = e || B.errorTimeout;
        k.src = a;
        for (o in d) k.setAttribute(o, d[o]);
        c = j ? h : c || f, k.onreadystatechange = k.onload = function () {
            !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
        }, m(function () {
            l || (l = 1, c(1))
        }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
    }, a.yepnope.injectCss = function (a, c, d, e, g, i) {
        var e = b.createElement("link"), j, c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d) e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n), m(c, 0))
    }
}(this, document), Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0))
};
/*!
	Colorbox 1.5.14
	license: MIT
	http://www.jacklmoore.com/colorbox
*/
(function (t, e, i) {
    function n(i, n, o) {
        var r = e.createElement(i);
        return n && (r.id = Z + n), o && (r.style.cssText = o), t(r)
    }

    function o() {
        return i.innerHeight ? i.innerHeight : t(i).height()
    }

    function r(e, i) {
        i !== Object(i) && (i = {}), this.cache = {}, this.el = e, this.value = function (e) {
            var n;
            return void 0 === this.cache[e] && (n = t(this.el).attr("data-cbox-" + e), void 0 !== n ? this.cache[e] = n : void 0 !== i[e] ? this.cache[e] = i[e] : void 0 !== X[e] && (this.cache[e] = X[e])), this.cache[e]
        }, this.get = function (e) {
            var i = this.value(e);
            return t.isFunction(i) ? i.call(this.el, this) : i
        }
    }

    function h(t) {
        var e = W.length, i = (z + t) % e;
        return 0 > i ? e + i : i
    }

    function a(t, e) {
        return Math.round((/%/.test(t) ? ("x" === e ? E.width() : o()) / 100 : 1) * parseInt(t, 10))
    }

    function s(t, e) {
        return t.get("photo") || t.get("photoRegex").test(e)
    }

    function l(t, e) {
        return t.get("retinaUrl") && i.devicePixelRatio > 1 ? e.replace(t.get("photoRegex"), t.get("retinaSuffix")) : e
    }

    function d(t) {
        "contains" in y[0] && !y[0].contains(t.target) && t.target !== v[0] && (t.stopPropagation(), y.focus())
    }

    function c(t) {
        c.str !== t && (y.add(v).removeClass(c.str).addClass(t), c.str = t)
    }

    function g(e) {
        z = 0, e && e !== !1 && "nofollow" !== e ? (W = t("." + te).filter(function () {
            var i = t.data(this, Y), n = new r(this, i);
            return n.get("rel") === e
        }), z = W.index(_.el), -1 === z && (W = W.add(_.el), z = W.length - 1)) : W = t(_.el)
    }

    function u(i) {
        t(e).trigger(i), ae.triggerHandler(i)
    }

    function f(i) {
        var o;
        if (!G) {
            if (o = t(i).data(Y), _ = new r(i, o), g(_.get("rel")), !$) {
                $ = q = !0, c(_.get("className")), y.css({
                    visibility: "hidden",
                    display: "block",
                    opacity: ""
                }), L = n(se, "LoadedContent", "width:0; height:0; overflow:hidden; visibility:hidden"), b.css({
                    width: "",
                    height: ""
                }).append(L), D = T.height() + k.height() + b.outerHeight(!0) - b.height(), j = C.width() + H.width() + b.outerWidth(!0) - b.width(), A = L.outerHeight(!0), N = L.outerWidth(!0);
                var h = a(_.get("initialWidth"), "x"), s = a(_.get("initialHeight"), "y"), l = _.get("maxWidth"),
                    f = _.get("maxHeight");
                _.w = (l !== !1 ? Math.min(h, a(l, "x")) : h) - N - j, _.h = (f !== !1 ? Math.min(s, a(f, "y")) : s) - A - D, L.css({
                    width: "",
                    height: _.h
                }), J.position(), u(ee), _.get("onOpen"), O.add(F).hide(), y.focus(), _.get("trapFocus") && e.addEventListener && (e.addEventListener("focus", d, !0), ae.one(re, function () {
                    e.removeEventListener("focus", d, !0)
                })), _.get("returnFocus") && ae.one(re, function () {
                    t(_.el).focus()
                })
            }
            var p = parseFloat(_.get("opacity"));
            v.css({
                opacity: p === p ? p : "",
                cursor: _.get("overlayClose") ? "pointer" : "",
                visibility: "visible"
            }).show(), _.get("closeButton") ? B.html(_.get("close")).appendTo(b) : B.appendTo("<div/>"), w()
        }
    }

    function p() {
        y || (V = !1, E = t(i), y = n(se).attr({
            id: Y,
            "class": t.support.opacity === !1 ? Z + "IE" : "",
            role: "dialog",
            tabindex: "-1"
        }).hide(), v = n(se, "Overlay").hide(), S = t([n(se, "LoadingOverlay")[0], n(se, "LoadingGraphic")[0]]), x = n(se, "Wrapper"), b = n(se, "Content").append(F = n(se, "Title"), I = n(se, "Current"), P = t('<button type="button"/>').attr({id: Z + "Previous"}), K = t('<button type="button"/>').attr({id: Z + "Next"}), R = n("button", "Slideshow"), S), B = t('<button type="button"/>').attr({id: Z + "Close"}), x.append(n(se).append(n(se, "TopLeft"), T = n(se, "TopCenter"), n(se, "TopRight")), n(se, !1, "clear:left").append(C = n(se, "MiddleLeft"), b, H = n(se, "MiddleRight")), n(se, !1, "clear:left").append(n(se, "BottomLeft"), k = n(se, "BottomCenter"), n(se, "BottomRight"))).find("div div").css({"float": "left"}), M = n(se, !1, "position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"), O = K.add(P).add(I).add(R)), e.body && !y.parent().length && t(e.body).append(v, y.append(x, M))
    }

    function m() {
        function i(t) {
            t.which > 1 || t.shiftKey || t.altKey || t.metaKey || t.ctrlKey || (t.preventDefault(), f(this))
        }

        return y ? (V || (V = !0, K.click(function () {
            J.next()
        }), P.click(function () {
            J.prev()
        }), B.click(function () {
            J.close()
        }), v.click(function () {
            _.get("overlayClose") && J.close()
        }), t(e).bind("keydown." + Z, function (t) {
            var e = t.keyCode;
            $ && _.get("escKey") && 27 === e && (t.preventDefault(), J.close()), $ && _.get("arrowKey") && W[1] && !t.altKey && (37 === e ? (t.preventDefault(), P.click()) : 39 === e && (t.preventDefault(), K.click()))
        }), t.isFunction(t.fn.on) ? t(e).on("click." + Z, "." + te, i) : t("." + te).live("click." + Z, i)), !0) : !1
    }

    function w() {
        var e, o, r, h = J.prep, d = ++le;
        if (q = !0, U = !1, u(he), u(ie), _.get("onLoad"), _.h = _.get("height") ? a(_.get("height"), "y") - A - D : _.get("innerHeight") && a(_.get("innerHeight"), "y"), _.w = _.get("width") ? a(_.get("width"), "x") - N - j : _.get("innerWidth") && a(_.get("innerWidth"), "x"), _.mw = _.w, _.mh = _.h, _.get("maxWidth") && (_.mw = a(_.get("maxWidth"), "x") - N - j, _.mw = _.w && _.w < _.mw ? _.w : _.mw), _.get("maxHeight") && (_.mh = a(_.get("maxHeight"), "y") - A - D, _.mh = _.h && _.h < _.mh ? _.h : _.mh), e = _.get("href"), Q = setTimeout(function () {
                S.show()
            }, 100), _.get("inline")) {
            var c = t(e);
            r = t("<div>").hide().insertBefore(c), ae.one(he, function () {
                r.replaceWith(c)
            }), h(c)
        } else _.get("iframe") ? h(" ") : _.get("html") ? h(_.get("html")) : s(_, e) ? (e = l(_, e), U = new Image, t(U).addClass(Z + "Photo").bind("error", function () {
            h(n(se, "Error").html(_.get("imgError")))
        }).one("load", function () {
            d === le && setTimeout(function () {
                var e;
                t.each(["alt", "longdesc", "aria-describedby"], function (e, i) {
                    var n = t(_.el).attr(i) || t(_.el).attr("data-" + i);
                    n && U.setAttribute(i, n)
                }), _.get("retinaImage") && i.devicePixelRatio > 1 && (U.height = U.height / i.devicePixelRatio, U.width = U.width / i.devicePixelRatio), _.get("scalePhotos") && (o = function () {
                    U.height -= U.height * e, U.width -= U.width * e
                }, _.mw && U.width > _.mw && (e = (U.width - _.mw) / U.width, o()), _.mh && U.height > _.mh && (e = (U.height - _.mh) / U.height, o())), _.h && (U.style.marginTop = Math.max(_.mh - U.height, 0) / 2 + "px"), W[1] && (_.get("loop") || W[z + 1]) && (U.style.cursor = "pointer", U.onclick = function () {
                    J.next()
                }), U.style.width = U.width + "px", U.style.height = U.height + "px", h(U)
            }, 1)
        }), U.src = e) : e && M.load(e, _.get("data"), function (e, i) {
            d === le && h("error" === i ? n(se, "Error").html(_.get("xhrError")) : t(this).contents())
        })
    }

    var v, y, x, b, T, C, H, k, W, E, L, M, S, F, I, R, K, P, B, O, _, D, j, A, N, z, U, $, q, G, Q, J, V, X = {
            html: !1,
            photo: !1,
            iframe: !1,
            inline: !1,
            transition: "elastic",
            speed: 300,
            fadeOut: 300,
            width: !1,
            initialWidth: "600",
            innerWidth: !1,
            maxWidth: !1,
            height: !1,
            initialHeight: "450",
            innerHeight: !1,
            maxHeight: !1,
            scalePhotos: !0,
            scrolling: !0,
            opacity: .9,
            preloading: !0,
            className: !1,
            overlayClose: !0,
            escKey: !0,
            arrowKey: !0,
            top: !1,
            bottom: !1,
            left: !1,
            right: !1,
            fixed: !1,
            data: void 0,
            closeButton: !0,
            fastIframe: !0,
            open: !1,
            reposition: !0,
            loop: !0,
            slideshow: !1,
            slideshowAuto: !0,
            slideshowSpeed: 2500,
            slideshowStart: "start slideshow",
            slideshowStop: "stop slideshow",
            photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,
            retinaImage: !1,
            retinaUrl: !1,
            retinaSuffix: "@2x.$1",
            current: "image {current} of {total}",
            previous: "previous",
            next: "next",
            close: "close",
            xhrError: "This content failed to load.",
            imgError: "This image failed to load.",
            returnFocus: !0,
            trapFocus: !0,
            onOpen: !1,
            onLoad: !1,
            onComplete: !1,
            onCleanup: !1,
            onClosed: !1,
            rel: function () {
                return this.rel
            },
            href: function () {
                return t(this).attr("href")
            },
            title: function () {
                return this.title
            }
        }, Y = "colorbox", Z = "cbox", te = Z + "Element", ee = Z + "_open", ie = Z + "_load", ne = Z + "_complete",
        oe = Z + "_cleanup", re = Z + "_closed", he = Z + "_purge", ae = t("<a/>"), se = "div", le = 0, de = {},
        ce = function () {
            function t() {
                clearTimeout(h)
            }

            function e() {
                (_.get("loop") || W[z + 1]) && (t(), h = setTimeout(J.next, _.get("slideshowSpeed")))
            }

            function i() {
                R.html(_.get("slideshowStop")).unbind(s).one(s, n), ae.bind(ne, e).bind(ie, t), y.removeClass(a + "off").addClass(a + "on")
            }

            function n() {
                t(), ae.unbind(ne, e).unbind(ie, t), R.html(_.get("slideshowStart")).unbind(s).one(s, function () {
                    J.next(), i()
                }), y.removeClass(a + "on").addClass(a + "off")
            }

            function o() {
                r = !1, R.hide(), t(), ae.unbind(ne, e).unbind(ie, t), y.removeClass(a + "off " + a + "on")
            }

            var r, h, a = Z + "Slideshow_", s = "click." + Z;
            return function () {
                r ? _.get("slideshow") || (ae.unbind(oe, o), o()) : _.get("slideshow") && W[1] && (r = !0, ae.one(oe, o), _.get("slideshowAuto") ? i() : n(), R.show())
            }
        }();
    t[Y] || (t(p), J = t.fn[Y] = t[Y] = function (e, i) {
        var n, o = this;
        if (e = e || {}, t.isFunction(o)) o = t("<a/>"), e.open = !0; else if (!o[0]) return o;
        return o[0] ? (p(), m() && (i && (e.onComplete = i), o.each(function () {
            var i = t.data(this, Y) || {};
            t.data(this, Y, t.extend(i, e))
        }).addClass(te), n = new r(o[0], e), n.get("open") && f(o[0])), o) : o
    }, J.position = function (e, i) {
        function n() {
            T[0].style.width = k[0].style.width = b[0].style.width = parseInt(y[0].style.width, 10) - j + "px", b[0].style.height = C[0].style.height = H[0].style.height = parseInt(y[0].style.height, 10) - D + "px"
        }

        var r, h, s, l = 0, d = 0, c = y.offset();
        if (E.unbind("resize." + Z), y.css({
                top: -9e4,
                left: -9e4
            }), h = E.scrollTop(), s = E.scrollLeft(), _.get("fixed") ? (c.top -= h, c.left -= s, y.css({position: "fixed"})) : (l = h, d = s, y.css({position: "absolute"})), d += _.get("right") !== !1 ? Math.max(E.width() - _.w - N - j - a(_.get("right"), "x"), 0) : _.get("left") !== !1 ? a(_.get("left"), "x") : Math.round(Math.max(E.width() - _.w - N - j, 0) / 2), l += _.get("bottom") !== !1 ? Math.max(o() - _.h - A - D - a(_.get("bottom"), "y"), 0) : _.get("top") !== !1 ? a(_.get("top"), "y") : Math.round(Math.max(o() - _.h - A - D, 0) / 2), y.css({
                top: c.top,
                left: c.left,
                visibility: "visible"
            }), x[0].style.width = x[0].style.height = "9999px", r = {
                width: _.w + N + j,
                height: _.h + A + D,
                top: l,
                left: d
            }, e) {
            var g = 0;
            t.each(r, function (t) {
                return r[t] !== de[t] ? (g = e, void 0) : void 0
            }), e = g
        }
        de = r, e || y.css(r), y.dequeue().animate(r, {
            duration: e || 0, complete: function () {
                n(), q = !1, x[0].style.width = _.w + N + j + "px", x[0].style.height = _.h + A + D + "px", _.get("reposition") && setTimeout(function () {
                    E.bind("resize." + Z, J.position)
                }, 1), t.isFunction(i) && i()
            }, step: n
        })
    }, J.resize = function (t) {
        var e;
        $ && (t = t || {}, t.width && (_.w = a(t.width, "x") - N - j), t.innerWidth && (_.w = a(t.innerWidth, "x")), L.css({width: _.w}), t.height && (_.h = a(t.height, "y") - A - D), t.innerHeight && (_.h = a(t.innerHeight, "y")), t.innerHeight || t.height || (e = L.scrollTop(), L.css({height: "auto"}), _.h = L.height()), L.css({height: _.h}), e && L.scrollTop(e), J.position("none" === _.get("transition") ? 0 : _.get("speed")))
    }, J.prep = function (i) {
        function o() {
            return _.w = _.w || L.width(), _.w = _.mw && _.mw < _.w ? _.mw : _.w, _.w
        }

        function a() {
            return _.h = _.h || L.height(), _.h = _.mh && _.mh < _.h ? _.mh : _.h, _.h
        }

        if ($) {
            var d, g = "none" === _.get("transition") ? 0 : _.get("speed");
            L.remove(), L = n(se, "LoadedContent").append(i), L.hide().appendTo(M.show()).css({
                width: o(),
                overflow: _.get("scrolling") ? "auto" : "hidden"
            }).css({height: a()}).prependTo(b), M.hide(), t(U).css({"float": "none"}), c(_.get("className")), d = function () {
                function i() {
                    t.support.opacity === !1 && y[0].style.removeAttribute("filter")
                }

                var n, o, a = W.length;
                $ && (o = function () {
                    clearTimeout(Q), S.hide(), u(ne), _.get("onComplete")
                }, F.html(_.get("title")).show(), L.show(), a > 1 ? ("string" == typeof _.get("current") && I.html(_.get("current").replace("{current}", z + 1).replace("{total}", a)).show(), K[_.get("loop") || a - 1 > z ? "show" : "hide"]().html(_.get("next")), P[_.get("loop") || z ? "show" : "hide"]().html(_.get("previous")), ce(), _.get("preloading") && t.each([h(-1), h(1)], function () {
                    var i, n = W[this], o = new r(n, t.data(n, Y)), h = o.get("href");
                    h && s(o, h) && (h = l(o, h), i = e.createElement("img"), i.src = h)
                })) : O.hide(), _.get("iframe") ? (n = e.createElement("iframe"), "frameBorder" in n && (n.frameBorder = 0), "allowTransparency" in n && (n.allowTransparency = "true"), _.get("scrolling") || (n.scrolling = "no"), t(n).attr({
                    src: _.get("href"),
                    name: (new Date).getTime(),
                    "class": Z + "Iframe",
                    allowFullScreen: !0
                }).one("load", o).appendTo(L), ae.one(he, function () {
                    n.src = "//about:blank"
                }), _.get("fastIframe") && t(n).trigger("load")) : o(), "fade" === _.get("transition") ? y.fadeTo(g, 1, i) : i())
            }, "fade" === _.get("transition") ? y.fadeTo(g, 0, function () {
                J.position(0, d)
            }) : J.position(g, d)
        }
    }, J.next = function () {
        !q && W[1] && (_.get("loop") || W[z + 1]) && (z = h(1), f(W[z]))
    }, J.prev = function () {
        !q && W[1] && (_.get("loop") || z) && (z = h(-1), f(W[z]))
    }, J.close = function () {
        $ && !G && (G = !0, $ = !1, u(oe), _.get("onCleanup"), E.unbind("." + Z), v.fadeTo(_.get("fadeOut") || 0, 0), y.stop().fadeTo(_.get("fadeOut") || 0, 0, function () {
            y.hide(), v.hide(), u(he), L.remove(), setTimeout(function () {
                G = !1, u(re), _.get("onClosed")
            }, 1)
        }))
    }, J.remove = function () {
        y && (y.stop(), t[Y].close(), y.stop(!1, !0).remove(), v.remove(), G = !1, y = null, t("." + te).removeData(Y).removeClass(te), t(e).unbind("click." + Z).unbind("keydown." + Z))
    }, J.element = function () {
        return t(_.el)
    }, J.settings = X)
})(jQuery, document, window);
/*!
 * Copyright 2012, Chris Wanstrath
 * Released under the MIT License
 * https://github.com/defunkt/jquery-pjax
 */
!function (t) {
    function e(e, a, n) {
        var o = this;
        return this.on("click.pjax", e, function (e) {
            var i = t.extend({}, f(a, n));
            i.container || (i.container = t(this).attr("data-pjax") || o), r(e, i)
        })
    }

    function r(e, r, a) {
        a = f(r, a);
        var o = e.currentTarget;
        if ("A" !== o.tagName.toUpperCase()) throw"$.fn.pjax or $.pjax.click requires an anchor element";
        if (!(e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || location.protocol !== o.protocol || location.hostname !== o.hostname || o.hash && o.href.replace(o.hash, "") === location.href.replace(location.hash, "") || o.href === location.href + "#" || e.isDefaultPrevented())) {
            var i = {url: o.href, container: t(o).attr("data-pjax"), target: o}, s = t.extend({}, i, a),
                c = t.Event("pjax:click");
            t(o).trigger(c, [s]), c.isDefaultPrevented() || (n(s), e.preventDefault(), t(o).trigger("pjax:clicked", [s]))
        }
    }

    function a(e, r, a) {
        a = f(r, a);
        var o = e.currentTarget;
        if ("FORM" !== o.tagName.toUpperCase()) throw"$.pjax.submit requires a form element";
        var i = {type: o.method.toUpperCase(), url: o.action, container: t(o).attr("data-pjax"), target: o};
        if ("GET" !== i.type && void 0 !== window.FormData) i.data = new FormData(o), i.processData = !1, i.contentType = !1; else {
            if (t(o).find(":file").length) return;
            i.data = t(o).serializeArray()
        }
        n(t.extend({}, i, a)), e.preventDefault()
    }

    function n(e) {
        function r(e, r, n) {
            n || (n = {}), n.relatedTarget = a;
            var o = t.Event(e, n);
            return s.trigger(o, r), !o.isDefaultPrevented()
        }

        e = t.extend(!0, {}, t.ajaxSettings, n.defaults, e), t.isFunction(e.url) && (e.url = e.url());
        var a = e.target, o = p(e.url).hash, s = e.context = d(e.container);
        e.data || (e.data = {}), e.data._pjax = s.selector;
        var c;
        e.beforeSend = function (t, a) {
            return "GET" !== a.type && (a.timeout = 0), t.setRequestHeader("X-PJAX", "true"), t.setRequestHeader("X-PJAX-Container", s.selector), r("pjax:beforeSend", [t, a]) ? (a.timeout > 0 && (c = setTimeout(function () {
                r("pjax:timeout", [t, e]) && t.abort("timeout")
            }, a.timeout), a.timeout = 0), void(e.requestUrl = p(a.url).href)) : !1
        }, e.complete = function (t, a) {
            c && clearTimeout(c), r("pjax:complete", [t, a, e]), r("pjax:end", [t, e])
        }, e.error = function (t, a, n) {
            var o = v("", t, e), s = r("pjax:error", [t, a, n, e]);
            "GET" == e.type && "abort" !== a && s && i(o.url)
        }, e.success = function (a, c, u) {
            var f = n.state,
                d = "function" == typeof t.pjax.defaults.version ? t.pjax.defaults.version() : t.pjax.defaults.version,
                h = u.getResponseHeader("X-PJAX-Version"), m = v(a, u, e);
            if (d && h && d !== h) return void i(m.url);
            if (!m.contents) return void i(m.url);
            n.state = {
                id: e.id || l(),
                url: m.url,
                title: m.title,
                container: s.selector,
                fragment: e.fragment,
                timeout: e.timeout
            }, (e.push || e.replace) && window.history.replaceState(n.state, m.title, m.url);
            try {
                document.activeElement.blur()
            } catch (j) {
            }
            m.title && (document.title = m.title), r("pjax:beforeReplace", [m.contents, e], {
                state: n.state,
                previousState: f
            }), s.html(m.contents);
            var g = s.find("input[autofocus], textarea[autofocus]").last()[0];
            if (g && document.activeElement !== g && g.focus(), x(m.scripts), "number" == typeof e.scrollTo && t(window).scrollTop(e.scrollTo), "" !== o) {
                var w = p(m.url);
                w.hash = o, n.state.url = w.href, window.history.replaceState(n.state, m.title, w.href);
                var y = t(w.hash);
                y.length && t(window).scrollTop(y.offset().top)
            }
            r("pjax:success", [a, c, u, e])
        }, n.state || (n.state = {
            id: l(),
            url: window.location.href,
            title: document.title,
            container: s.selector,
            fragment: e.fragment,
            timeout: e.timeout
        }, window.history.replaceState(n.state, document.title));
        var f = n.xhr;
        f && f.readyState < 4 && (f.onreadystatechange = t.noop, f.abort()), n.options = e;
        var f = n.xhr = t.ajax(e);
        return f.readyState > 0 && (e.push && !e.replace && (j(n.state.id, s.clone().contents()), window.history.pushState(null, "", u(e.requestUrl))), r("pjax:start", [f, e]), r("pjax:send", [f, e])), n.xhr
    }

    function o(e, r) {
        var a = {url: window.location.href, push: !1, replace: !0, scrollTo: !1};
        return n(t.extend(a, f(e, r)))
    }

    function i(t) {
        window.history.replaceState(null, "", "#"), window.location.replace(t)
    }

    function s(e) {
        var r = n.state, a = e.state;
        if (a && a.container) {
            if (S && E == a.url) return;
            if (n.state && n.state.id === a.id) return;
            var o = t(a.container);
            if (o.length) {
                var s, c = C[a.id];
                n.state && (s = n.state.id < a.id ? "forward" : "back", g(s, n.state.id, o.clone().contents()));
                var l = t.Event("pjax:popstate", {state: a, direction: s});
                o.trigger(l);
                var u = {
                    id: a.id,
                    url: a.url,
                    container: o,
                    push: !1,
                    fragment: a.fragment,
                    timeout: a.timeout,
                    scrollTo: !1
                };
                if (c) {
                    o.trigger("pjax:start", [null, u]), n.state = a, a.title && (document.title = a.title);
                    var p = t.Event("pjax:beforeReplace", {state: a, previousState: r});
                    o.trigger(p, [c, u]), o.html(c), o.trigger("pjax:end", [null, u])
                } else n(u);
                o[0].offsetHeight
            } else i(location.href)
        }
        S = !1
    }

    function c(e) {
        var r = t.isFunction(e.url) ? e.url() : e.url, a = e.type ? e.type.toUpperCase() : "GET",
            n = t("<form>", {method: "GET" === a ? "GET" : "POST", action: r, style: "display:none"});
        "GET" !== a && "POST" !== a && n.append(t("<input>", {
            type: "hidden",
            name: "_method",
            value: a.toLowerCase()
        }));
        var o = e.data;
        if ("string" == typeof o) t.each(o.split("&"), function (e, r) {
            var a = r.split("=");
            n.append(t("<input>", {type: "hidden", name: a[0], value: a[1]}))
        }); else if ("object" == typeof o) for (key in o) n.append(t("<input>", {
            type: "hidden",
            name: key,
            value: o[key]
        }));
        t(document.body).append(n), n.submit()
    }

    function l() {
        return (new Date).getTime()
    }

    function u(t) {
        return t.replace(/\?_pjax=[^&]+&?/, "?").replace(/_pjax=[^&]+&?/, "").replace(/[\?&]$/, "")
    }

    function p(t) {
        var e = document.createElement("a");
        return e.href = t, e
    }

    function f(e, r) {
        return e && r ? r.container = e : r = t.isPlainObject(e) ? e : {container: e}, r.container && (r.container = d(r.container)), r
    }

    function d(e) {
        if (e = t(e), e.length) {
            if ("" !== e.selector && e.context === document) return e;
            if (e.attr("id")) return t("#" + e.attr("id"));
            throw"cant get selector for pjax container!"
        }
        throw"no pjax container for " + e.selector
    }

    function h(t, e) {
        return t.filter(e).add(t.find(e))
    }

    function m(e) {
        return t.parseHTML(e, document, !0)
    }

    function v(e, r, a) {
        var n = {};
        if (n.url = u(r.getResponseHeader("X-PJAX-URL") || a.requestUrl), /<html/i.test(e)) var o = t(m(e.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])),
            i = t(m(e.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0])); else var o = i = t(m(e));
        if (0 === i.length) return n;
        if (n.title = h(o, "title").last().text(), a.fragment) {
            if ("body" === a.fragment) var s = i; else var s = h(i, a.fragment).first();
            s.length && (n.contents = s.contents(), n.title || (n.title = s.attr("title") || s.data("title")))
        } else /<html/i.test(e) || (n.contents = i);
        return n.contents && (n.contents = n.contents.not(function () {
            return t(this).is("title")
        }), n.contents.find("title").remove(), n.scripts = h(n.contents, "script[src]").remove(), n.contents = n.contents.not(n.scripts)), n.title && (n.title = t.trim(n.title)), n
    }

    function x(e) {
        if (e) {
            var r = t("script[src]");
            e.each(function () {
                var e = this.src, a = r.filter(function () {
                    return this.src === e
                });
                if (!a.length) {
                    var n = document.createElement("script"), o = t(this).attr("type");
                    o && (n.type = o), n.src = t(this).attr("src"), document.head.appendChild(n)
                }
            })
        }
    }

    function j(t, e) {
        C[t] = e, A.push(t), w(k, 0), w(A, n.defaults.maxCacheLength)
    }

    function g(t, e, r) {
        var a, o;
        C[e] = r, "forward" === t ? (a = A, o = k) : (a = k, o = A), a.push(e), (e = o.pop()) && delete C[e], w(a, n.defaults.maxCacheLength)
    }

    function w(t, e) {
        for (; t.length > e;) delete C[t.shift()]
    }

    function y() {
        return t("meta").filter(function () {
            var e = t(this).attr("http-equiv");
            return e && "X-PJAX-VERSION" === e.toUpperCase()
        }).attr("content")
    }

    function b() {
        t.fn.pjax = e, t.pjax = n, t.pjax.enable = t.noop, t.pjax.disable = T, t.pjax.click = r, t.pjax.submit = a, t.pjax.reload = o, t.pjax.defaults = {
            timeout: 650,
            push: !0,
            replace: !1,
            type: "GET",
            dataType: "html",
            scrollTo: 0,
            maxCacheLength: 20,
            version: y
        }, t(window).on("popstate.pjax", s)
    }

    function T() {
        t.fn.pjax = function () {
            return this
        }, t.pjax = c, t.pjax.enable = b, t.pjax.disable = t.noop, t.pjax.click = t.noop, t.pjax.submit = t.noop, t.pjax.reload = function () {
            window.location.reload()
        }, t(window).off("popstate.pjax", s)
    }

    var S = !0, E = window.location.href, P = window.history.state;
    P && P.container && (n.state = P), "state" in window.history && (S = !1);
    var C = {}, k = [], A = [];
    t.inArray("state", t.event.props) < 0 && t.event.props.push("state"), t.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/), t.support.pjax ? b() : T()
}(jQuery);
/*! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function (a, b, c, d) {
    var e = a(b);
    a.fn.lazyload = function (f) {
        function g() {
            var b = 0;
            i.each(function () {
                var c = a(this);
                if (!j.skip_invisible || c.is(":visible")) if (a.abovethetop(this, j) || a.leftofbegin(this, j)) ; else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
                    if (++b > j.failure_limit) return !1
                } else c.trigger("appear"), b = 0
            })
        }

        var h, i = this, j = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: b,
            data_attribute: "original",
            skip_invisible: !0,
            appear: null,
            load: null,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };
        return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function () {
            return g()
        }), this.each(function () {
            var b = this, c = a(b);
            b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.is("img") && c.attr("src", j.placeholder), c.one("appear", function () {
                if (!this.loaded) {
                    if (j.appear) {
                        var d = i.length;
                        j.appear.call(b, d, j)
                    }
                    a("<img />").bind("load", function () {
                        var d = c.attr("data-" + j.data_attribute);
                        c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), c[j.effect](j.effect_speed), b.loaded = !0;
                        var e = a.grep(i, function (a) {
                            return !a.loaded
                        });
                        if (i = a(e), j.load) {
                            var f = i.length;
                            j.load.call(b, f, j)
                        }
                    }).attr("src", c.attr("data-" + j.data_attribute))
                }
            }), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function () {
                b.loaded || c.trigger("appear")
            })
        }), e.bind("resize", function () {
            g()
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function (b) {
            b.originalEvent && b.originalEvent.persisted && i.each(function () {
                a(this).trigger("appear")
            })
        }), a(c).ready(function () {
            g()
        }), this
    }, a.belowthefold = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold
    }, a.rightoffold = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold
    }, a.abovethetop = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top + f.threshold + a(c).height()
    }, a.leftofbegin = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset().left + f.threshold + a(c).width()
    }, a.inviewport = function (b, c) {
        return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
    }, a.extend(a.expr[":"], {
        "below-the-fold": function (b) {
            return a.belowthefold(b, {threshold: 0})
        }, "above-the-top": function (b) {
            return !a.belowthefold(b, {threshold: 0})
        }, "right-of-screen": function (b) {
            return a.rightoffold(b, {threshold: 0})
        }, "left-of-screen": function (b) {
            return !a.rightoffold(b, {threshold: 0})
        }, "in-viewport": function (b) {
            return a.inviewport(b, {threshold: 0})
        }, "above-the-fold": function (b) {
            return !a.belowthefold(b, {threshold: 0})
        }, "right-of-fold": function (b) {
            return a.rightoffold(b, {threshold: 0})
        }, "left-of-fold": function (b) {
            return !a.rightoffold(b, {threshold: 0})
        }
    })
}(jQuery, window, document);