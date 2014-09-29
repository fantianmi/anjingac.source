(function (e, t) {
	var n = e.jQuery || e.Cowboy || (e.Cowboy = {}), r;
	n.throttle = r = function (e, r, i, s) {
		function a() {
			function p() {
				u = +(new Date), i.apply(n, l)
			}

			function v() {
				o = t
			}

			var n = this, a = +(new Date) - u, l = arguments;
			s && !o && p(), o && clearTimeout(o), s === t && a > e ? p() : r !== !0 && (o = setTimeout(s ? v : p, s === t ? e - a : e))
		}

		var o, u = 0;
		return typeof r != "boolean" && (s = i, i = r, r = t), n.guid && (a.guid = i.guid = i.guid || n.guid++), a
	}, n.debounce = function (e, n, i) {
		return i === t ? r(e, n, !1) : r(e, i, n !== !1)
	}
})(this);
(function (e, t, n) {
	typeof define == "function" && define.amd ? define(["jquery"], function (r) {
		return n(r, e, t), r.mobile
	}) : n(e.jQuery, e, t)
})(this, document, function (e, t, n, r) {
	(function (e, t, n, r) {
		function i(e) {
			while (e && typeof e.originalEvent != "undefined")e = e.originalEvent;
			return e
		}

		function s(t, n) {
			var s = t.type, o, u, a, f, l, c, h, p, d;
			t = e.Event(t), t.type = n, o = t.originalEvent, u = e.event.props, s.search(/^(mouse|click)/) > -1 && (u = L);
			if (o)for (h = u.length, f; h;)f = u[--h], t[f] = o[f];
			s.search(/mouse(down|up)|click/) > -1 && !t.which && (t.which = 1);
			if (s.search(/^touch/) !== -1) {
				a = i(o), s = a.touches, l = a.changedTouches, c = s && s.length ? s[0] : l && l.length ? l[0] : r;
				if (c)for (p = 0, d = C.length; p < d; p++)f = C[p], t[f] = c[f]
			}
			return t
		}

		function o(t) {
			var n = {}, r, i;
			while (t) {
				r = e.data(t, x);
				for (i in r)r[i] && (n[i] = n.hasVirtualBinding = !0);
				t = t.parentNode
			}
			return n
		}

		function u(t, n) {
			var r;
			while (t) {
				r = e.data(t, x);
				if (r && (!n || r[n]))return t;
				t = t.parentNode
			}
			return null
		}

		function a() {
			B = !1
		}

		function f() {
			B = !0
		}

		function l() {
			q = 0, P.length = 0, H = !1, f()
		}

		function c() {
			a()
		}

		function h() {
			p(), O = setTimeout(function () {
				O = 0, l()
			}, e.vmouse.resetTimerDuration)
		}

		function p() {
			O && (clearTimeout(O), O = 0)
		}

		function d(t, n, r) {
			var i;
			if (r && r[t] || !r && u(n.target, t))i = s(n, t), e(n.target).trigger(i);
			return i
		}

		function v(t) {
			var n = e.data(t.target, T);
			if (!H && (!q || q !== n)) {
				var r = d("v" + t.type, t);
				r && (r.isDefaultPrevented() && t.preventDefault(), r.isPropagationStopped() && t.stopPropagation(), r.isImmediatePropagationStopped() && t.stopImmediatePropagation())
			}
		}

		function m(t) {
			var n = i(t).touches, r, s;
			if (n && n.length === 1) {
				r = t.target, s = o(r);
				if (s.hasVirtualBinding) {
					q = I++, e.data(r, T, q), p(), c(), D = !1;
					var u = i(t).touches[0];
					M = u.pageX, _ = u.pageY, d("vmouseover", t, s), d("vmousedown", t, s)
				}
			}
		}

		function g(e) {
			if (B)return;
			D || d("vmousecancel", e, o(e.target)), D = !0, h()
		}

		function y(t) {
			if (B)return;
			var n = i(t).touches[0], r = D, s = e.vmouse.moveDistanceThreshold, u = o(t.target);
			D = D || Math.abs(n.pageX - M) > s || Math.abs(n.pageY - _) > s, D && !r && d("vmousecancel", t, u), d("vmousemove", t, u), h()
		}

		function b(e) {
			if (B)return;
			f();
			var t = o(e.target), n;
			d("vmouseup", e, t);
			if (!D) {
				var r = d("vclick", e, t);
				r && r.isDefaultPrevented() && (n = i(e).changedTouches[0], P.push({touchID: q, x: n.clientX, y: n.clientY}), H = !0)
			}
			d("vmouseout", e, t), D = !1, h()
		}

		function w(t) {
			var n = e.data(t, x), r;
			if (n)for (r in n)if (n[r])return!0;
			return!1
		}

		function E() {
		}

		function S(t) {
			var n = t.substr(1);
			return{setup: function (r, i) {
				w(this) || e.data(this, x, {});
				var s = e.data(this, x);
				s[t] = !0, A[t] = (A[t] || 0) + 1, A[t] === 1 && F.bind(n, v), e(this).bind(n, E), j && (A.touchstart = (A.touchstart || 0) + 1, A.touchstart === 1 && F.bind("touchstart", m).bind("touchend", b).bind("touchmove", y).bind("scroll", g))
			}, teardown : function (r, i) {
				--A[t], A[t] || F.unbind(n, v), j && (--A.touchstart, A.touchstart || F.unbind("touchstart", m).unbind("touchmove", y).unbind("touchend", b).unbind("scroll", g));
				var s = e(this), o = e.data(this, x);
				o && (o[t] = !1), s.unbind(n, E), w(this) || s.removeData(x)
			}}
		}

		var x = "virtualMouseBindings", T = "virtualTouchID", N = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "), C = "clientX clientY pageX pageY screenX screenY".split(" "), k = e.event.mouseHooks ? e.event.mouseHooks.props : [], L = e.event.props.concat(k), A = {}, O = 0, M = 0, _ = 0, D = !1, P = [], H = !1, B = !1, j = "addEventListener"in n, F = e(n), I = 1, q = 0, R;
		e.vmouse = {moveDistanceThreshold: 10, clickDistanceThreshold: 10, resetTimerDuration: 1500};
		for (var U = 0; U < N.length; U++)e.event.special[N[U]] = S(N[U]);
		j && n.addEventListener("click", function (t) {
			var n = P.length, r = t.target, i, s, o, u, a, f;
			if (n) {
				i = t.clientX, s = t.clientY, R = e.vmouse.clickDistanceThreshold, o = r;
				while (o) {
					for (u = 0; u < n; u++) {
						a = P[u], f = 0;
						if (o === r && Math.abs(a.x - i) < R && Math.abs(a.y - s) < R || e.data(o, T) === a.touchID) {
							t.preventDefault(), t.stopPropagation();
							return
						}
					}
					o = o.parentNode
				}
			}
		}, !0)
	})(e, t, n), function (e) {
		e.mobile = {}
	}(e), function (e, t) {
		var r = {touch: "ontouchend"in n};
		e.mobile.support = e.mobile.support || {}, e.extend(e.support, r), e.extend(e.mobile.support, r)
	}(e), function (e, t, r) {
		function i(t, n, r) {
			var i = r.type;
			r.type = n, e.event.dispatch.call(t, r), r.type = i
		}

		var s = e(n);
		e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function (t, n) {
			e.fn[n] = function (e) {
				return e ? this.bind(n, e) : this.trigger(n)
			}, e.attrFn && (e.attrFn[n] = !0)
		});
		var o = e.mobile.support.touch, u = "touchmove scroll", a = o ? "touchstart" : "mousedown", f = o ? "touchend" : "mouseup", l = o ? "touchmove" : "mousemove";
		e.event.special.scrollstart = {enabled: !0, setup: function () {
			function t(e, t) {
				s = t, i(n, s ? "scrollstart" : "scrollstop", e)
			}

			var n = this, r = e(n), s, o;
			r.bind(u, function (n) {
				if (!e.event.special.scrollstart.enabled)return;
				s || t(n, !0), clearTimeout(o), o = setTimeout(function () {
					t(n, !1)
				}, 50)
			})
		}}, e.event.special.tap = {tapholdThreshold: 750, setup: function () {
			var t = this, n = e(t);
			n.bind("vmousedown", function (r) {
				function o() {
					clearTimeout(c)
				}

				function u() {
					o(), n.unbind("vclick", a).unbind("vmouseup", o), s.unbind("vmousecancel", u)
				}

				function a(e) {
					u(), f === e.target && i(t, "tap", e)
				}

				if (r.which && r.which !== 1)return!1;
				var f = r.target, l = r.originalEvent, c;
				n.bind("vmouseup", o).bind("vclick", a), s.bind("vmousecancel", u), c = setTimeout(function () {
					i(t, "taphold", e.Event("taphold", {target: f}))
				}, e.event.special.tap.tapholdThreshold)
			})
		}}, e.event.special.swipe = {scrollSupressionThreshold: 30, durationThreshold: 1e3, horizontalDistanceThreshold: 30, verticalDistanceThreshold: 75, start: function (t) {
			var n = t.originalEvent.touches ? t.originalEvent.touches[0] : t;
			return{time: (new Date).getTime(), coords: [n.pageX, n.pageY], origin: e(t.target)}
		}, stop                                               : function (e) {
			var t = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
			return{time: (new Date).getTime(), coords: [t.pageX, t.pageY]}
		}, handleSwipe                                        : function (t, n) {
			n.time - t.time < e.event.special.swipe.durationThreshold && Math.abs(t.coords[0] - n.coords[0]) > e.event.special.swipe.horizontalDistanceThreshold && Math.abs(t.coords[1] - n.coords[1]) < e.event.special.swipe.verticalDistanceThreshold && t.origin.trigger("swipe").trigger(t.coords[0] > n.coords[0] ? "swipeleft" : "swiperight")
		}, setup                                              : function () {
			var t = this, n = e(t);
			n.bind(a, function (t) {
				function i(t) {
					if (!s)return;
					o = e.event.special.swipe.stop(t), Math.abs(s.coords[0] - o.coords[0]) > e.event.special.swipe.scrollSupressionThreshold && t.preventDefault()
				}

				var s = e.event.special.swipe.start(t), o;
				n.bind(l, i).one(f, function () {
					n.unbind(l, i), s && o && e.event.special.swipe.handleSwipe(s, o), s = o = r
				})
			})
		}}, e.each({scrollstop: "scrollstart", taphold: "tap", swipeleft: "swipe", swiperight: "swipe"}, function (t, n) {
			e.event.special[t] = {setup: function () {
				e(this).bind(n, e.noop)
			}}
		})
	}(e, this)
});
(function (e) {
	e.fn.videoModal = function (t) {
		return this.each(function () {
			function i() {
				if (document.all && document.documentMode === undefined)return;
				e(r).tap(function () {
					if (e(window).width() <= n.breakpoint_width)return!0;
					var t = e(this).prop("href").split("v=");
					if (t !== null && t !== undefined && t[1] !== undefined) {
						var r = t[1], i = r.indexOf("&");
						return i !== -1 && (r = r.substring(0, i)), s(r), !1
					}
					return!0
				})
			}

			function s(t) {
				e("body").prepend('<div id="video-modal"><iframe src="//www.youtube.com/embed/' + t + '?wmode=transparent&autoplay=1" id="youtube-video" frameborder="0" allowfullscreen="true"></iframe><i><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><g><path class="icon" d="M19.6,10.5L16,14.1l-3.6-3.6c-0.1-0.1-0.3-0.1-0.5,0l-1.4,1.4c-0.1,0.1-0.1,0.3,0,0.5l3.6,3.6l-3.6,3.6 c-0.1,0.1-0.1,0.3,0,0.5l1.4,1.4c0.1,0.1,0.3,0.1,0.5,0l3.6-3.6l3.6,3.6c0.1,0.1,0.3,0.1,0.5,0l1.4-1.4c0.1-0.1,0.1-0.3,0-0.5 L17.8,16l3.6-3.6c0.1-0.1,0.1-0.3,0-0.5l-1.4-1.4C19.9,10.4,19.7,10.4,19.6,10.5z" /><path class="icon" d="M16,30.9c-8.3,0-15-6.7-15-15S7.7,1,16,1s15,6.7,15,15S24.3,30.9,16,30.9z M16,3C8.8,3,3,8.8,3,16 c0,7.2,5.9,13,13,13s13-5.8,13-13C29,8.8,23.2,3,16,3z" /></g></svg></i></div>'), e("#video-modal").fadeIn(n.animation_duration), e(window).resize(function () {
					u()
				}), "onorientationchange"in window && (window.addEventListener ? window.addEventListener("orientationchange", function () {
					u()
				}, !1) : window.attachEvent("orientationchange", function () {
					u()
				})), u(), e("#video-modal").find("i").tap(function () {
					o()
				})
			}

			function o() {
				e("#video-modal").find("i").unbind("tap"), e("#video-modal").fadeOut(n.animation_duration, function () {
					e(window).unbind("resize", u), "onorientationchange"in window && window.removeEventListener("orientationchange"), e("#video-modal").remove()
				})
			}

			function u() {
				var t = e(window).width(), r = e(window).height();
				if (t <= n.breakpoint_width) {
					o();
					return
				}
				var i = Math.ceil(t - n.padding * 2);
				i = i > n.maximum_width ? n.maximum_width : i;
				var s = Math.ceil(i / n.ratio_width * n.ratio_height);
				s > Math.ceil(r - n.padding * 2) && (s = Math.ceil(r - n.padding * 2), i = Math.ceil(s / n.ratio_height * n.ratio_width)), e("#video-modal i").css({"margin-top": s * -0.5 - 44, "margin-right": i * -0.5 - 44}), e("#youtube-video").css({width: i + "px", height: s + "px", "margin-top": s * -0.5 + "px", "margin-left": i * -0.5 + "px"})
			}

			var n = e.extend({animation_duration: 400, breakpoint_width: 760, maximum_width: 1024, padding: 80, ratio_width: 16, ratio_height: 9}, t), r = this;
			i()
		})
	}
})(jQuery);
!function (e, t) {
	function n() {
		r.READY || (y.determineEventTypes(), g.each(r.gestures, function (e) {
			w.register(e)
		}), y.onTouch(r.DOCUMENT, p, w.detect), y.onTouch(r.DOCUMENT, d, w.detect), r.READY = !0)
	}

	var r = function E(e, t) {
		return new E.Instance(e, t || {})
	};
	r.VERSION = "1.1.3", r.defaults = {behavior: {userSelect: "none", touchAction: "pan-y", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)"}}, r.DOCUMENT = document, r.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled, r.HAS_TOUCHEVENTS = "ontouchstart"in e, r.IS_MOBILE = /mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent), r.NO_MOUSEEVENTS = r.HAS_TOUCHEVENTS && r.IS_MOBILE || r.HAS_POINTEREVENTS, r.CALCULATE_INTERVAL = 25;
	var i = {}, s = r.DIRECTION_DOWN = "down", o = r.DIRECTION_LEFT = "left", u = r.DIRECTION_UP = "up", a = r.DIRECTION_RIGHT = "right", f = r.POINTER_MOUSE = "mouse", l = r.POINTER_TOUCH = "touch", c = r.POINTER_PEN = "pen", h = r.EVENT_START = "start", p = r.EVENT_MOVE = "move", d = r.EVENT_END = "end", v = r.EVENT_RELEASE = "release", m = r.EVENT_TOUCH = "touch";
	r.READY = !1, r.plugins = r.plugins || {}, r.gestures = r.gestures || {};
	var g = r.utils = {extend: function (e, n, r) {
		for (var i in n)!n.hasOwnProperty(i) || e[i] !== t && r || (e[i] = n[i]);
		return e
	}, on                    : function (e, t, n) {
		e.addEventListener(t, n, !1)
	}, off                   : function (e, t, n) {
		e.removeEventListener(t, n, !1)
	}, each                  : function (e, n, r) {
		var i, s;
		if ("forEach"in e)e.forEach(n, r); else if (e.length !== t) {
			for (i = 0, s = e.length; s > i; i++)if (n.call(r, e[i], i, e) === !1)return
		} else for (i in e)if (e.hasOwnProperty(i) && n.call(r, e[i], i, e) === !1)return
	}, inStr                 : function (e, t) {
		return e.indexOf(t) > -1
	}, inArray               : function (e, t) {
		if (e.indexOf) {
			var n = e.indexOf(t);
			return-1 === n ? !1 : n
		}
		for (var r = 0, i = e.length; i > r; r++)if (e[r] === t)return r;
		return!1
	}, toArray               : function (e) {
		return Array.prototype.slice.call(e, 0)
	}, hasParent             : function (e, t) {
		for (; e;) {
			if (e == t)return!0;
			e = e.parentNode
		}
		return!1
	}, getCenter             : function (e) {
		var t = [], n = [], r = [], i = [], s = Math.min, o = Math.max;
		return 1 === e.length ? {pageX: e[0].pageX, pageY: e[0].pageY, clientX: e[0].clientX, clientY: e[0].clientY} : (g.each(e, function (e) {
			t.push(e.pageX), n.push(e.pageY), r.push(e.clientX), i.push(e.clientY)
		}), {pageX: (s.apply(Math, t) + o.apply(Math, t)) / 2, pageY: (s.apply(Math, n) + o.apply(Math, n)) / 2, clientX: (s.apply(Math, r) + o.apply(Math, r)) / 2, clientY: (s.apply(Math, i) + o.apply(Math, i)) / 2})
	}, getVelocity           : function (e, t, n) {
		return{x: Math.abs(t / e) || 0, y: Math.abs(n / e) || 0}
	}, getAngle              : function (e, t) {
		var n = t.clientX - e.clientX, r = t.clientY - e.clientY;
		return 180 * Math.atan2(r, n) / Math.PI
	}, getDirection          : function (e, t) {
		var n = Math.abs(e.clientX - t.clientX), r = Math.abs(e.clientY - t.clientY);
		return n >= r ? e.clientX - t.clientX > 0 ? o : a : e.clientY - t.clientY > 0 ? u : s
	}, getDistance           : function (e, t) {
		var n = t.clientX - e.clientX, r = t.clientY - e.clientY;
		return Math.sqrt(n * n + r * r)
	}, getScale              : function (e, t) {
		return e.length >= 2 && t.length >= 2 ? this.getDistance(t[0], t[1]) / this.getDistance(e[0], e[1]) : 1
	}, getRotation           : function (e, t) {
		return e.length >= 2 && t.length >= 2 ? this.getAngle(t[1], t[0]) - this.getAngle(e[1], e[0]) : 0
	}, isVertical            : function (e) {
		return e == u || e == s
	}, setPrefixedCss        : function (e, t, n, r) {
		var i = ["", "Webkit", "Moz", "O", "ms"];
		t = g.toCamelCase(t);
		for (var s = 0; s < i.length; s++) {
			var o = t;
			if (i[s] && (o = i[s] + o.slice(0, 1).toUpperCase() + o.slice(1)), o in e.style) {
				e.style[o] = (null == r || r) && n || "";
				break
			}
		}
	}, toggleBehavior        : function (e, t, n) {
		if (t && e && e.style) {
			g.each(t, function (t, r) {
				g.setPrefixedCss(e, r, t, n)
			});
			var r = n && function () {
				return!1
			};
			"none" == t.userSelect && (e.onselectstart = r), "none" == t.userDrag && (e.ondragstart = r)
		}
	}, toCamelCase           : function (e) {
		return e.replace(/[_-]([a-z])/g, function (e) {
			return e[1].toUpperCase()
		})
	}}, y = r.event = {preventMouseEvents: !1, started: !1, shouldDetect: !1, on: function (e, t, n, r) {
		var i = t.split(" ");
		g.each(i, function (t) {
			g.on(e, t, n), r && r(t)
		})
	}, off                               : function (e, t, n, r) {
		var i = t.split(" ");
		g.each(i, function (t) {
			g.off(e, t, n), r && r(t)
		})
	}, onTouch                           : function (e, t, n) {
		var s = this, o = function (i) {
			var o, u = i.type.toLowerCase(), a = r.HAS_POINTEREVENTS, f = g.inStr(u, "mouse");
			f && s.preventMouseEvents || (f && t == h && 0 === i.button ? (s.preventMouseEvents = !1, s.shouldDetect = !0) : a && t == h ? s.shouldDetect = 1 === i.buttons || b.matchType(l, i) : f || t != h || (s.preventMouseEvents = !0, s.shouldDetect = !0), a && t != d && b.updatePointer(t, i), s.shouldDetect && (o = s.doDetect.call(s, i, t, e, n)), o == d && (s.preventMouseEvents = !1, s.shouldDetect = !1, b.reset()), a && t == d && b.updatePointer(t, i))
		};
		return this.on(e, i[t], o), o
	}, doDetect                          : function (e, t, n, r) {
		var i = this.getTouchList(e, t), s = i.length, o = t, u = i.trigger, a = s;
		t == h ? u = m : t == d && (u = v, a = i.length - (e.changedTouches ? e.changedTouches.length : 1)), a > 0 && this.started && (o = p), this.started = !0;
		var f = this.collectEventData(n, o, i, e);
		return t != d && r.call(w, f), u && (f.changedLength = a, f.eventType = u, r.call(w, f), f.eventType = o, delete f.changedLength), o == d && (r.call(w, f), this.started = !1), o
	}, determineEventTypes               : function () {
		var t;
		return t = r.HAS_POINTEREVENTS ? e.PointerEvent ? ["pointerdown", "pointermove", "pointerup pointercancel lostpointercapture"] : ["MSPointerDown", "MSPointerMove", "MSPointerUp MSPointerCancel MSLostPointerCapture"] : r.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"], i[h] = t[0], i[p] = t[1], i[d] = t[2], i
	}, getTouchList                      : function (e, t) {
		if (r.HAS_POINTEREVENTS)return b.getTouchList();
		if (e.touches) {
			if (t == p)return e.touches;
			var n = [], i = [].concat(g.toArray(e.touches), g.toArray(e.changedTouches)), s = [];
			return g.each(i, function (e) {
				g.inArray(n, e.identifier) === !1 && s.push(e), n.push(e.identifier)
			}), s
		}
		return e.identifier = 1, [e]
	}, collectEventData                  : function (e, t, n, r) {
		var i = l;
		return g.inStr(r.type, "mouse") || b.matchType(f, r) ? i = f : b.matchType(c, r) && (i = c), {center: g.getCenter(n), timeStamp: Date.now(), target: r.target, touches: n, eventType: t, pointerType: i, srcEvent: r, preventDefault: function () {
			var e = this.srcEvent;
			e.preventManipulation && e.preventManipulation(), e.preventDefault && e.preventDefault()
		}, stopPropagation                                                                                  : function () {
			this.srcEvent.stopPropagation()
		}, stopDetect                                                                                       : function () {
			return w.stopDetect()
		}}
	}}, b = r.PointerEvent = {pointers: {}, getTouchList: function () {
		var e = [];
		return g.each(this.pointers, function (t) {
			e.push(t)
		}), e
	}, updatePointer                  : function (e, t) {
		e == d || e != d && 1 !== t.buttons ? delete this.pointers[t.pointerId] : (t.identifier = t.pointerId, this.pointers[t.pointerId] = t)
	}, matchType                      : function (e, t) {
		if (!t.pointerType)return!1;
		var n = t.pointerType, r = {};
		return r[f] = n === (t.MSPOINTER_TYPE_MOUSE || f), r[l] = n === (t.MSPOINTER_TYPE_TOUCH || l), r[c] = n === (t.MSPOINTER_TYPE_PEN || c), r[e]
	}, reset                          : function () {
		this.pointers = {}
	}}, w = r.detection = {gestures: [], current: null, previous: null, stopped: !1, startDetect: function (e, t) {
		this.current || (this.stopped = !1, this.current = {inst: e, startEvent: g.extend({}, t), lastEvent: !1, lastCalcEvent: !1, futureCalcEvent: !1, lastCalcData: {}, name: ""}, this.detect(t))
	}, detect                      : function (e) {
		if (this.current && !this.stopped) {
			e = this.extendEventData(e);
			var t = this.current.inst, n = t.options;
			return g.each(this.gestures, function (r) {
				!this.stopped && t.enabled && n[r.name] && r.handler.call(r, e, t)
			}, this), this.current && (this.current.lastEvent = e), e.eventType == d && this.stopDetect(), e
		}
	}, stopDetect                  : function () {
		this.previous = g.extend({}, this.current), this.current = null, this.stopped = !0
	}, getCalculatedData           : function (e, t, n, i, s) {
		var o = this.current, u = !1, a = o.lastCalcEvent, f = o.lastCalcData;
		a && e.timeStamp - a.timeStamp > r.CALCULATE_INTERVAL && (t = a.center, n = e.timeStamp - a.timeStamp, i = e.center.clientX - a.center.clientX, s = e.center.clientY - a.center.clientY, u = !0), (e.eventType == m || e.eventType == v) && (o.futureCalcEvent = e), (!o.lastCalcEvent || u) && (f.velocity = g.getVelocity(n, i, s), f.angle = g.getAngle(t, e.center), f.direction = g.getDirection(t, e.center), o.lastCalcEvent = o.futureCalcEvent || e, o.futureCalcEvent = e), e.velocityX = f.velocity.x, e.velocityY = f.velocity.y, e.interimAngle = f.angle, e.interimDirection = f.direction
	}, extendEventData             : function (e) {
		var t = this.current, n = t.startEvent, r = t.lastEvent || n;
		(e.eventType == m || e.eventType == v) && (n.touches = [], g.each(e.touches, function (e) {
			n.touches.push({clientX: e.clientX, clientY: e.clientY})
		}));
		var i = e.timeStamp - n.timeStamp, s = e.center.clientX - n.center.clientX, o = e.center.clientY - n.center.clientY;
		return this.getCalculatedData(e, r.center, i, s, o), g.extend(e, {startEvent: n, deltaTime: i, deltaX: s, deltaY: o, distance: g.getDistance(n.center, e.center), angle: g.getAngle(n.center, e.center), direction: g.getDirection(n.center, e.center), scale: g.getScale(n.touches, e.touches), rotation: g.getRotation(n.touches, e.touches)}), e
	}, register                    : function (e) {
		var n = e.defaults || {};
		return n[e.name] === t && (n[e.name] = !0), g.extend(r.defaults, n, !0), e.index = e.index || 1e3, this.gestures.push(e), this.gestures.sort(function (e, t) {
			return e.index < t.index ? -1 : e.index > t.index ? 1 : 0
		}), this.gestures
	}};
	r.Instance = function (e, t) {
		var i = this;
		n(), this.element = e, this.enabled = !0, g.each(t, function (e, n) {
			delete t[n], t[g.toCamelCase(n)] = e
		}), this.options = g.extend(g.extend({}, r.defaults), t || {}), this.options.behavior && g.toggleBehavior(this.element, this.options.behavior, !0), this.eventStartHandler = y.onTouch(e, h, function (e) {
			i.enabled && e.eventType == h ? w.startDetect(i, e) : e.eventType == m && w.detect(e)
		}), this.eventHandlers = []
	}, r.Instance.prototype = {on: function (e, t) {
		var n = this;
		return y.on(n.element, e, t, function (e) {
			n.eventHandlers.push({gesture: e, handler: t})
		}), n
	}, off                       : function (e, t) {
		var n = this;
		return y.off(n.element, e, t, function (e) {
			var r = g.inArray({gesture: e, handler: t});
			r !== !1 && n.eventHandlers.splice(r, 1)
		}), n
	}, trigger                   : function (e, t) {
		t || (t = {});
		var n = r.DOCUMENT.createEvent("Event");
		n.initEvent(e, !0, !0), n.gesture = t;
		var i = this.element;
		return g.hasParent(t.target, i) && (i = t.target), i.dispatchEvent(n), this
	}, enable                    : function (e) {
		return this.enabled = e, this
	}, dispose                   : function () {
		var e, t;
		for (g.toggleBehavior(this.element, this.options.behavior, !1), e = -1; t = this.eventHandlers[++e];)g.off(this.element, t.gesture, t.handler);
		return this.eventHandlers = [], y.off(this.element, i[h], this.eventStartHandler), null
	}}, function (e) {
		function t(t, r) {
			var i = w.current;
			if (!(r.options.dragMaxTouches > 0 && t.touches.length > r.options.dragMaxTouches))switch (t.eventType) {
				case h:
					n = !1;
					break;
				case p:
					if (t.distance < r.options.dragMinDistance && i.name != e)return;
					var f = i.startEvent.center;
					if (i.name != e && (i.name = e, r.options.dragDistanceCorrection && t.distance > 0)) {
						var l = Math.abs(r.options.dragMinDistance / t.distance);
						f.pageX += t.deltaX * l, f.pageY += t.deltaY * l, f.clientX += t.deltaX * l, f.clientY += t.deltaY * l, t = w.extendEventData(t)
					}
					(i.lastEvent.dragLockToAxis || r.options.dragLockToAxis && r.options.dragLockMinDistance <= t.distance) && (t.dragLockToAxis = !0);
					var c = i.lastEvent.direction;
					t.dragLockToAxis && c !== t.direction && (t.direction = g.isVertical(c) ? t.deltaY < 0 ? u : s : t.deltaX < 0 ? o : a), n || (r.trigger(e + "start", t), n = !0), r.trigger(e, t), r.trigger(e + t.direction, t);
					var m = g.isVertical(t.direction);
					(r.options.dragBlockVertical && m || r.options.dragBlockHorizontal && !m) && t.preventDefault();
					break;
				case v:
					n && t.changedLength <= r.options.dragMaxTouches && (r.trigger(e + "end", t), n = !1);
					break;
				case d:
					n = !1
			}
		}

		var n = !1;
		r.gestures.Drag = {name: e, index: 50, handler: t, defaults: {dragMinDistance: 10, dragDistanceCorrection: !0, dragMaxTouches: 1, dragBlockHorizontal: !1, dragBlockVertical: !1, dragLockToAxis: !1, dragLockMinDistance: 25}}
	}("drag"), r.gestures.Gesture = {name: "gesture", index: 1337, handler: function (e, t) {
		t.trigger(this.name, e)
	}}, function (e) {
		function t(t, r) {
			var i = r.options, s = w.current;
			switch (t.eventType) {
				case h:
					clearTimeout(n), s.name = e, n = setTimeout(function () {
						s && s.name == e && r.trigger(e, t)
					}, i.holdTimeout);
					break;
				case p:
					t.distance > i.holdThreshold && clearTimeout(n);
					break;
				case v:
					clearTimeout(n)
			}
		}

		var n;
		r.gestures.Hold = {name: e, index: 10, defaults: {holdTimeout: 500, holdThreshold: 2}, handler: t}
	}("hold"), r.gestures.Release = {name: "release", index: 1 / 0, handler: function (e, t) {
		e.eventType == v && t.trigger(this.name, e)
	}}, r.gestures.Swipe = {name: "swipe", index: 40, defaults: {swipeMinTouches: 1, swipeMaxTouches: 1, swipeVelocityX: .6, swipeVelocityY: .6}, handler: function (e, t) {
		if (e.eventType == v) {
			var n = e.touches.length, r = t.options;
			if (n < r.swipeMinTouches || n > r.swipeMaxTouches)return;
			(e.velocityX > r.swipeVelocityX || e.velocityY > r.swipeVelocityY) && (t.trigger(this.name, e), t.trigger(this.name + e.direction, e))
		}
	}}, function (e) {
		function t(t, r) {
			var i, s, o = r.options, u = w.current, a = w.previous;
			switch (t.eventType) {
				case h:
					n = !1;
					break;
				case p:
					n = n || t.distance > o.tapMaxDistance;
					break;
				case d:
					!g.inStr(t.srcEvent.type, "cancel") && t.deltaTime < o.tapMaxTime && !n && (i = a && a.lastEvent && t.timeStamp - a.lastEvent.timeStamp, s = !1, a && a.name == e && i && i < o.doubleTapInterval && t.distance < o.doubleTapDistance && (r.trigger("doubletap", t), s = !0), (!s || o.tapAlways) && (u.name = e, r.trigger(u.name, t)))
			}
		}

		var n = !1;
		r.gestures.Tap = {name: e, index: 100, handler: t, defaults: {tapMaxTime: 250, tapMaxDistance: 10, tapAlways: !0, doubleTapDistance: 20, doubleTapInterval: 300}}
	}("tap"), r.gestures.Touch = {name: "touch", index: -1 / 0, defaults: {preventDefault: !1, preventMouse: !1}, handler: function (e, t) {
		return t.options.preventMouse && e.pointerType == f ? void e.stopDetect() : (t.options.preventDefault && e.preventDefault(), void (e.eventType == m && t.trigger("touch", e)))
	}}, function (e) {
		function t(t, r) {
			switch (t.eventType) {
				case h:
					n = !1;
					break;
				case p:
					if (t.touches.length < 2)return;
					var i = Math.abs(1 - t.scale), s = Math.abs(t.rotation);
					if (i < r.options.transformMinScale && s < r.options.transformMinRotation)return;
					w.current.name = e, n || (r.trigger(e + "start", t), n = !0), r.trigger(e, t), s > r.options.transformMinRotation && r.trigger("rotate", t), i > r.options.transformMinScale && (r.trigger("pinch", t), r.trigger("pinch" + (t.scale < 1 ? "in" : "out"), t));
					break;
				case v:
					n && t.changedLength < 2 && (r.trigger(e + "end", t), n = !1)
			}
		}

		var n = !1;
		r.gestures.Transform = {name: e, index: 45, defaults: {transformMinScale: .01, transformMinRotation: 1}, handler: t}
	}("transform"), "function" == typeof define && define.amd ? define([], function () {
		return r
	}) : "undefined" != typeof module && module.exports ? module.exports = r : e.Hammer = r
}(window);
!function (e) {
	e.matchMedia = e.matchMedia || function (e) {
		var t, n = e.documentElement, r = n.firstElementChild || n.firstChild, i = e.createElement("body"), s = e.createElement("div");
		return s.id = "mq-test-1", s.style.cssText = "position:absolute;top:-100em", i.style.background = "none", i.appendChild(s), function (e) {
			return s.innerHTML = '&shy;<style media="' + e + '"> #mq-test-1 { width: 42px; }</style>', n.insertBefore(i, r), t = 42 === s.offsetWidth, n.removeChild(i), {matches: t, media: e}
		}
	}(e.document)
}(this), function (e) {
	function t() {
		E(!0)
	}

	var n = {};
	e.respond = n, n.update = function () {
	};
	var r = [], i = function () {
		var t = !1;
		try {
			t = new e.XMLHttpRequest
		} catch (n) {
			t = new e.ActiveXObject("Microsoft.XMLHTTP")
		}
		return function () {
			return t
		}
	}(), s = function (e, t) {
		var n = i();
		n && (n.open("GET", e, !0), n.onreadystatechange = function () {
			4 !== n.readyState || 200 !== n.status && 304 !== n.status || t(n.responseText)
		}, 4 !== n.readyState && n.send(null))
	}, o = function (e) {
		return e.replace(n.regex.minmaxwh, "").match(n.regex.other)
	};
	if (n.ajax = s, n.queue = r, n.unsupportedmq = o, n.regex = {media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi, keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi, comments: /\/\*[^*]*\*+([^/][^*]*\*+)*\//gi, urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, findStyles: /@media *([^\{]+)\{([\S\s]+?)$/, only: /(only\s+)?([a-zA-Z]+)\s?/, minw: /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/, maxw: /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/, minmaxwh: /\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi, other: /\([^\)]*\)/g}, n.mediaQueriesSupported = e.matchMedia && null !== e.matchMedia("only all") && e.matchMedia("only all").matches, !n.mediaQueriesSupported) {
		var u, a, f, l = e.document, c = l.documentElement, h = [], p = [], d = [], v = {}, m = 30, g = l.getElementsByTagName("head")[0] || c, y = l.getElementsByTagName("base")[0], b = g.getElementsByTagName("link"), w = function () {
			var e, t = l.createElement("div"), n = l.body, r = c.style.fontSize, i = n && n.style.fontSize, s = !1;
			return t.style.cssText = "position:absolute;font-size:1em;width:1em", n || (n = s = l.createElement("body"), n.style.background = "none"), c.style.fontSize = "100%", n.style.fontSize = "100%", n.appendChild(t), s && c.insertBefore(n, c.firstChild), e = t.offsetWidth, s ? c.removeChild(n) : n.removeChild(t), c.style.fontSize = r, i && (n.style.fontSize = i), e = f = parseFloat(e)
		}, E = function (t) {
			var n = "clientWidth", r = c[n], i = "CSS1Compat" === l.compatMode && r || l.body[n] || r, s = {}, o = b[b.length - 1], v = (new Date).getTime();
			if (t && u && m > v - u)return e.clearTimeout(a), a = e.setTimeout(E, m), void 0;
			u = v;
			for (var y in h)if (h.hasOwnProperty(y)) {
				var S = h[y], x = S.minw, T = S.maxw, N = null === x, C = null === T, L = "em";
				x && (x = parseFloat(x) * (x.indexOf(L) > -1 ? f || w() : 1)), T && (T = parseFloat(T) * (T.indexOf(L) > -1 ? f || w() : 1)), S.hasquery && (N && C || !(N || i >= x) || !(C || T >= i)) || (s[S.media] || (s[S.media] = []), s[S.media].push(p[S.rules]))
			}
			for (var A in d)d.hasOwnProperty(A) && d[A] && d[A].parentNode === g && g.removeChild(d[A]);
			d.length = 0;
			for (var O in s)if (s.hasOwnProperty(O)) {
				var M = l.createElement("style"), _ = s[O].join("\n");
				M.type = "text/css", M.media = O, g.insertBefore(M, o.nextSibling), M.styleSheet ? M.styleSheet.cssText = _ : M.appendChild(l.createTextNode(_)), d.push(M)
			}
		}, S = function (e, t, r) {
			var i = e.replace(n.regex.comments, "").replace(n.regex.keyframes, "").match(n.regex.media), s = i && i.length || 0;
			t = t.substring(0, t.lastIndexOf("/"));
			var u = function (e) {
				return e.replace(n.regex.urls, "$1" + t + "$2$3")
			}, a = !s && r;
			t.length && (t += "/"), a && (s = 1);
			for (var f = 0; s > f; f++) {
				var l, c, d, v;
				a ? (l = r, p.push(u(e))) : (l = i[f].match(n.regex.findStyles) && RegExp.$1, p.push(RegExp.$2 && u(RegExp.$2))), d = l.split(","), v = d.length;
				for (var m = 0; v > m; m++)c = d[m], o(c) || h.push({media: c.split("(")[0].match(n.regex.only) && RegExp.$2 || "all", rules: p.length - 1, hasquery: c.indexOf("(") > -1, minw: c.match(n.regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""), maxw: c.match(n.regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || "")})
			}
			E()
		}, x = function () {
			if (r.length) {
				var t = r.shift();
				s(t.href, function (n) {
					S(n, t.href, t.media), v[t.href] = !0, e.setTimeout(function () {
						x()
					}, 0)
				})
			}
		}, T = function () {
			for (var t = 0; t < b.length; t++) {
				var n = b[t], i = n.href, s = n.media, o = n.rel && "stylesheet" === n.rel.toLowerCase();
				i && o && !v[i] && (n.styleSheet && n.styleSheet.rawCssText ? (S(n.styleSheet.rawCssText, i, s), v[i] = !0) : (!/^([a-zA-Z:]*\/\/)/.test(i) && !y || i.replace(RegExp.$1, "").split("/")[0] === e.location.host) && ("//" === i.substring(0, 2) && (i = e.location.protocol + i), r.push({href: i, media: s})))
			}
			x()
		};
		T(), n.update = T, n.getEmValue = w, e.addEventListener ? e.addEventListener("resize", t, !1) : e.attachEvent && e.attachEvent("onresize", t)
	}
}(this);
var requirejs, require, define;
(function (e) {
	function h(e, t) {
		return f.call(e, t)
	}

	function p(e, t) {
		var n, r, i, s, o, a, f, l, h, p, d, v = t && t.split("/"), m = u.map, g = m && m["*"] || {};
		if (e && e.charAt(0) === ".")if (t) {
			v = v.slice(0, v.length - 1), e = e.split("/"), o = e.length - 1, u.nodeIdCompat && c.test(e[o]) && (e[o] = e[o].replace(c, "")), e = v.concat(e);
			for (h = 0; h < e.length; h += 1) {
				d = e[h];
				if (d === ".")e.splice(h, 1), h -= 1; else if (d === "..") {
					if (h === 1 && (e[2] === ".." || e[0] === ".."))break;
					h > 0 && (e.splice(h - 1, 2), h -= 2)
				}
			}
			e = e.join("/")
		} else e.indexOf("./") === 0 && (e = e.substring(2));
		if ((v || g) && m) {
			n = e.split("/");
			for (h = n.length; h > 0; h -= 1) {
				r = n.slice(0, h).join("/");
				if (v)for (p = v.length; p > 0; p -= 1) {
					i = m[v.slice(0, p).join("/")];
					if (i) {
						i = i[r];
						if (i) {
							s = i, a = h;
							break
						}
					}
				}
				if (s)break;
				!f && g && g[r] && (f = g[r], l = h)
			}
			!s && f && (s = f, a = l), s && (n.splice(0, a, s), e = n.join("/"))
		}
		return e
	}

	function d(t, r) {
		return function () {
			return n.apply(e, l.call(arguments, 0).concat([t, r]))
		}
	}

	function v(e) {
		return function (t) {
			return p(t, e)
		}
	}

	function m(e) {
		return function (t) {
			s[e] = t
		}
	}

	function g(n) {
		if (h(o, n)) {
			var r = o[n];
			delete o[n], a[n] = !0, t.apply(e, r)
		}
		if (!h(s, n) && !h(a, n))throw new Error("No " + n);
		return s[n]
	}

	function y(e) {
		var t, n = e ? e.indexOf("!") : -1;
		return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
	}

	function b(e) {
		return function () {
			return u && u.config && u.config[e] || {}
		}
	}

	var t, n, r, i, s = {}, o = {}, u = {}, a = {}, f = Object.prototype.hasOwnProperty, l = [].slice, c = /\.js$/;
	r = function (e, t) {
		var n, r = y(e), i = r[0];
		return e = r[1], i && (i = p(i, t), n = g(i)), i ? n && n.normalize ? e = n.normalize(e, v(t)) : e = p(e, t) : (e = p(e, t), r = y(e), i = r[0], e = r[1], i && (n = g(i))), {f: i ? i + "!" + e : e, n: e, pr: i, p: n}
	}, i = {require: function (e) {
		return d(e)
	}, exports     : function (e) {
		var t = s[e];
		return typeof t != "undefined" ? t : s[e] = {}
	}, module      : function (e) {
		return{id: e, uri: "", exports: s[e], config: b(e)}
	}}, t = function (t, n, u, f) {
		var l, c, p, v, y, b = [], w = typeof u, E;
		f = f || t;
		if (w === "undefined" || w === "function") {
			n = !n.length && u.length ? ["require", "exports", "module"] : n;
			for (y = 0; y < n.length; y += 1) {
				v = r(n[y], f), c = v.f;
				if (c === "require")b[y] = i.require(t); else if (c === "exports")b[y] = i.exports(t), E = !0; else if (c === "module")l = b[y] = i.module(t); else if (h(s, c) || h(o, c) || h(a, c))b[y] = g(c); else {
					if (!v.p)throw new Error(t + " missing " + c);
					v.p.load(v.n, d(f, !0), m(c), {}), b[y] = s[c]
				}
			}
			p = u ? u.apply(s[t], b) : undefined;
			if (t)if (l && l.exports !== e && l.exports !== s[t])s[t] = l.exports; else if (p !== e || !E)s[t] = p
		} else t && (s[t] = u)
	}, requirejs = require = n = function (s, o, a, f, l) {
		if (typeof s == "string")return i[s] ? i[s](o) : g(r(s, o).f);
		if (!s.splice) {
			u = s, u.deps && n(u.deps, u.callback);
			if (!o)return;
			o.splice ? (s = o, o = a, a = null) : s = e
		}
		return o = o || function () {
		}, typeof a == "function" && (a = f, f = l), f ? t(e, s, o, a) : setTimeout(function () {
			t(e, s, o, a)
		}, 4), n
	}, n.config = function (e) {
		return n(e)
	}, requirejs._defined = s, define = function (e, t, n) {
		t.splice || (n = t, t = []), !h(s, e) && !h(o, e) && (o[e] = [e, t, n])
	}, define.amd = {jQuery: !0}
})(), define("libs/almond", function () {
}), define("modules/gallery", [], function () {
	function e(e, t) {
		this.init(e, t)
	}

	function t() {
		window.requestAnimFrame === undefined && (window.requestAnimFrame = function () {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e, t) {
				window.setTimeout(e, 1e3 / 60)
			}
		}())
	}

	function n() {
		var e = ["webkit", "Moz", "O", "ms"], t = this;
		t.styleTransform = "transform", e.every(function (e) {
			var n = e + "Transform";
			return typeof document.body.style[n] != "undefined" ? (t.styleTransform = n, !1) : !0
		}), t.styleTransformOrigin = "transformOrigin", e.every(function (e) {
			var n = e + "TransformOrigin";
			return typeof document.body.style[n] != "undefined" ? (t.styleTransformOrigin = n, !1) : !0
		}), t.stylePerspective = null, typeof document.body.style.perspective != "undefined" && (t.stylePerspective = "perspective"), e.every(function (e) {
			var n = e + "Perspective";
			return typeof document.body.style[n] != "undefined" ? (t.stylePerspective = n, !1) : !0
		});
		var n = navigator.userAgent.toLowerCase();
		this.isAndroid = n.indexOf("android") > -1 ? !0 : !1
	}

	function r(e) {
		return e >= this.items.length ? e % this.items.length : e < 0 ? r.call(this, this.items.length + e % this.items.length) : e
	}

	function i(e) {
		var t, n, i, s, o, u;
		this.offset = typeof e == "number" ? e : this.offset;
		var a = Math.floor((this.offset + this.itemWidth / 2) / this.itemWidth), f = this.element.clientWidth / 2, l = this.offset - a * this.itemWidth, c = l < 0 ? 1 : -1, h = this.items.length >> 1, p = -c * l * 2 / this.itemWidth;
		this.selectedItem = r.call(this, Math.floor((this.offset + this.itemWidth / 2) / this.itemWidth)), i = r.call(this, a), o = -l / 2, u = this.settings.scaleOfDeselectedItem + (1 - this.settings.scaleOfDeselectedItem) * (1 - p), t = this.items[i], t.style.left = f + o + "px", t.style[this.styleTransform] = "translate(-50%, -50%) scale(" + u + ")";
		for (n = 1; n <= h; ++n)i = r.call(this, a - n), o = (this.itemWidth * n - l) / 2, t = this.items[i], t.style.left = f + o + "px", t.style[this.styleTransform] = "translate(-50%, -50%) scale(" + this.settings.scaleOfDeselectedItem + ")", i = r.call(this, a + n), o = (this.itemWidth * n - l) / 2, t = this.items[i], t.style.left = f + o + "px", t.style[this.styleTransform] = "translate(-50%, -50%) scale(" + this.settings.scaleOfDeselectedItem + ")"
	}

	return e.prototype.init = function (e, r) {
		r = typeof r != "object" ? {} : r, r.aspectRatioWidth = r.aspectRatioWidth === undefined || typeof r.aspectRatioWidth != "number" ? 16 : r.aspectRatioWidth, r.aspectRatioHeight = r.aspectRatioHeight === undefined || typeof r.aspectRatioHeight != "number" ? 9 : r.aspectRatioHeight, r.itemSelector = r.itemSelector === undefined || typeof r.itemSelector != "string" ? "li.item" : r.itemSelector, r.keyboardIsEnabled = r.keyboardIsEnabled === undefined || typeof r.keyboardIsEnabled != "boolean" ? !1 : r.keyboardIsEnabled, r.keyboardNextKeys = r.keyboardNextKeys === undefined || typeof r.keyboardNextKeys != "object" || r.keyboardNextKeys.isArray === !1 ? [32, 34, 39, 40] : r.keyboardNextKeys, r.keyboardPrevKeys = r.keyboardPrevKeys === undefined || typeof r.keyboardPrevKeys != "object" || r.keyboardPrevKeys.isArray === !1 ? [33, 37, 38] : r.keyboardPrevKeys, r.nextButton = r.nextButton === undefined || typeof r.nextButton != "object" ? null : r.nextButton, r.prevButton = r.prevButton === undefined || typeof r.prevButton != "object" ? null : r.prevButton, r.scaleOfDeselectedItem = r.scaleOfDeselectedItem === undefined || typeof r.scaleOfDeselectedItem != "number" ? .6 : r.scaleOfDeselectedItem, r.selectedIndex = r.selectedIndex === undefined || typeof r.selectedIndex != "number" ? 0 : r.selectedIndex, r.selectedItem = r.selectedItem === undefined || typeof r.selectedItem != "object" ? null : r.selectedItem;
		var i, s, o;
		this.element = e, this.hammertime = Hammer(this.element, {drag_block_horizontal: !0, drag_block_vertical: !1, prevent_default: !0}), this.items = this.element.querySelectorAll(r.itemSelector), this.settings = r, this.itemWidth = 1e3;
		if (this.settings.selectedItem !== null)for (s = 0, o = this.items.length; s < o; ++s) {
			i = this.items[s];
			if (i === this.settings.settings.selectedItem) {
				this.settings.selectedItem = s;
				break
			}
		}
		this.selectedItem = this.settings.selectedIndex, this.enabled = !1, this.pressed = !1, this.timeConstant = 200, this.offset = this.target = 0, t.call(this), n.call(this), this.element.style.cursor = "default", this.element.style.display = "block", this.element.style.margin = "0", this.element.style.overflow = "hidden", this.element.style.padding = "0", this.element.style.position = "relative";
		for (s = 0, o = this.items.length; s < o; ++s)i = this.items[s], i.style.left = "50%", i.style.position = "absolute", i.style.top = "50%", i.style.width = "100%", i.style[this.styleTransformOrigin] = "center center", i.style[this.styleTransform] = "translate(-50%, -50%)";
		this.enable(), this.resize()
	}, e.prototype.destroy = function () {
		this.disable(), this.element.removeAttribute("style");
		var e, t;
		for (e = 0, t = this.items.length; e < t; ++e)this.items[e].className = "", this.items[e].removeAttribute("style")
	}, e.prototype.enable = function () {
		this.enabled = !0, this.hammertime.on("dragstart drag dragend", this.touchHandler.bind(this)), this.settings.keyboardIsEnabled && document.addEventListener("keydown", this.keyboardHandler.bind(this)), this.settings.nextButton !== null && (this.settings.nextButton.addEventListener("tap", this.nextItem.bind(this)), this.settings.nextButton.addEventListener("mousedown", this.nextButtonDownHandler.bind(this)), this.settings.nextButton.addEventListener("mouseout", this.nextButtonUpHandler.bind(this)), this.settings.nextButton.addEventListener("mouseup", this.nextButtonUpHandler.bind(this))), this.settings.prevButton !== null && (this.settings.prevButton.addEventListener("tap", this.prevItem.bind(this)), this.settings.prevButton.addEventListener("mousedown", this.prevButtonDownHandler.bind(this)), this.settings.prevButton.addEventListener("mouseout", this.prevButtonUpHandler.bind(this)), this.settings.prevButton.addEventListener("mouseup", this.prevButtonUpHandler.bind(this))), i.call(this, this.selectedItem * this.itemWidth)
	}, e.prototype.disable = function () {
		this.enabled = !1, this.hammertime.off("dragstart drag dragend", this.touchHandler.bind(this)), this.settings.keyboardIsEnabled && document.removeEventListener("keydown", this.keyboardHandler.bind(this)), this.settings.nextButton !== null && (this.settings.nextButton.removeEventListener("tap", this.nextItem.bind(this)), this.settings.nextButton.removeEventListener("mousedown", this.nextButtonDownHandler.bind(this)), this.settings.nextButton.removeEventListener("mouseout", this.nextButtonUpHandler.bind(this)), this.settings.nextButton.removeEventListener("mouseup", this.nextButtonUpHandler.bind(this))), this.settings.prevButton !== null && (this.settings.prevButton.removeEventListener("tap", this.prevItem.bind(this)), this.settings.prevButton.removeEventListener("mousedown", this.prevButtonDownHandler.bind(this)), this.settings.prevButton.removeEventListener("mouseout", this.prevButtonUpHandler.bind(this)), this.settings.prevButton.removeEventListener("mouseup", this.prevButtonUpHandler.bind(this)))
	}, e.prototype.getIndex = function () {
		return this.selectedItem
	}, e.prototype.getItem = function () {
		return this.items[this.selectedItem]
	}, e.prototype.resize = function () {
		this.itemWidth = this.element.offsetWidth * 3;
		var e = Math.round(this.element.offsetWidth / this.settings.aspectRatioWidth * this.settings.aspectRatioHeight);
		this.element.style.height = e + "px", this.redraw()
	}, e.prototype.setIndex = function (e) {
		if (this.enabled === !1)return;
		this.pressed = !1;
		var t = this.offset - (this.selectedItem - e) * this.itemWidth, n = this.offset - t;
		n > this.items.length * this.itemWidth * .5 ? t += this.items.length * this.itemWidth : n < this.items.length * this.itemWidth * -0.5 && (t -= this.items.length * this.itemWidth), t = Math.round(t / this.itemWidth) * this.itemWidth, this.target = t;
		if (this.offset !== this.target)return this.amplitude = this.target - this.offset, this.timestamp = Date.now(), requestAnimFrame(this.autoScroll.bind(this)), !0
	}, e.prototype.setItem = function (e) {
		if (this.enabled === !1)return;
		var t, n;
		for (t = 0, n = this.items.length; t < n; ++t)if (this.items[t] === e) {
			this.setIndex(t);
			return
		}
	}, e.prototype.nextItem = function () {
		if (this.enabled === !1)return;
		this.setIndex(this.selectedItem + 1)
	}, e.prototype.prevItem = function () {
		if (this.enabled === !1)return;
		this.setIndex(this.selectedItem - 1)
	}, e.prototype.redraw = function () {
		if (this.enabled === !1)return;
		var e = this;
		setTimeout(function () {
			i.call(e, e.selectedItem * e.itemWidth)
		}, 10)
	}, e.prototype.track = function () {
		var e, t, n, r;
		e = Date.now(), t = e - this.timestamp, this.timestamp = e, n = this.offset - this.frame, this.frame = this.offset, r = 1e3 * n / (1 + t), this.velocity = .8 * r + .2 * this.velocity
	}, e.prototype.autoScroll = function () {
		var e, t;
		this.amplitude && (e = Date.now() - this.timestamp, t = this.amplitude * Math.exp(-e / this.timeConstant), Math.abs(t) > 1 ? (i.call(this, this.target - t), requestAnimFrame(this.autoScroll.bind(this))) : (i.call(this, this.target), this.stylePerspective !== null && (this.element.style[this.stylePerspective] = "1000")))
	}, e.prototype.touchHandler = function (e) {
		if (this.enabled === !1)return;
		switch (e.type) {
			case"dragstart":
				this.stylePerspective !== null && this.isAndroid && (this.element.style[this.stylePerspective] = "none"), this.pressed = !0, this.reference = e.gesture.touches[0].clientX, this.velocity = this.amplitude = 0, this.frame = this.offset, this.timestamp = Date.now(), clearInterval(this.ticker), this.ticker = setInterval(this.track.bind(this), 100);
				break;
			case"drag":
				var t, n;
				if (this.pressed) {
					t = e.gesture.touches[0].clientX, n = this.reference - t;
					if (n > 2 || n < -2)this.reference = t, i.call(this, this.offset + n)
				}
				break;
			case"dragend":
				this.pressed = !1, clearInterval(this.ticker), this.target = this.offset;
				if (this.velocity > 10 || this.velocity < -10)this.amplitude = .9 * this.velocity, this.target = this.offset + this.amplitude;
				this.target = Math.round(this.target / this.itemWidth) * this.itemWidth, this.amplitude = this.target - this.offset, this.timestamp = Date.now(), requestAnimFrame(this.autoScroll.bind(this)), this.stylePerspective !== null && (this.element.style[this.stylePerspective] = "1000")
		}
	}, e.prototype.keyboardHandler = function (e) {
		this.settings.keyboardNextKeys.indexOf(e.which) > -1 && this.nextItem(), this.settings.keyboardPrevKeys.indexOf(e.which) > -1 && this.prevItem()
	}, e.prototype.nextButtonDownHandler = function (e) {
		this.nextItem(), clearInterval(this.nextButtonTicker), this.nextButtonTicker = setInterval(this.nextItem.bind(this), 1e3), e.preventDefault()
	}, e.prototype.nextButtonUpHandler = function (e) {
		clearInterval(this.nextButtonTicker), e.preventDefault()
	}, e.prototype.prevButtonDownHandler = function (e) {
		this.prevItem(), clearInterval(this.prevButtonTicker), this.prevButtonTicker = setInterval(this.prevItem.bind(this), 1e3), e.preventDefault()
	}, e.prototype.prevButtonUpHandler = function (e) {
		clearInterval(this.prevButtonTicker), e.preventDefault()
	}, e
}), define("modules/google-map", [], function () {
	function e(e, t) {
		this.init(e, t)
	}

	return e.prototype.init = function (e, t) {
		t = typeof t != "object" ? {} : t, t.aspectRatioWidth = t.aspectRatioWidth === undefined || typeof t.aspectRatioWidth != "number" ? 16 : t.aspectRatioWidth, t.aspectRatioHeight = t.aspectRatioHeight === undefined || typeof t.aspectRatioHeight != "number" ? 9 : t.aspectRatioHeight, t.canPan = t.canPan === undefined || typeof t.canPan != "boolean" ? !0 : t.canPan, t.mapZoom = t.mapZoom === undefined || typeof t.mapZoom != "number" ? 16 : t.mapZoom, t.markerImg = t.markerImage === undefined || typeof t.markerImage != "string" ? "assets/img/marker.png" : t.markerImage, t.markerLatitude = t.markerLatitude === undefined || typeof t.markerLatitude != "number" ? 34.235926 : t.markerLatitude, t.markerLongitude = t.markerLongitude === undefined || typeof t.markerLongitude != "number" ? -77.949227 : t.markerLongitude, t.markerUrl = t.markerUrl === undefined || typeof t.markerUrl != "string" ? null : t.markerUrl, t.markerWidth = t.markerWidth === undefined || typeof t.markerWidth != "number" ? 100 : t.markerWidth, t.markerHeight = t.markerHeight === undefined || typeof t.markerHeight != "number" ? 100 : t.markerHeight, this.element = e, this.settings = t, this.latlng = new google.maps.LatLng(this.settings.markerLatitude, this.settings.markerLongitude), this.map = new google.maps.Map(this.element, {center: this.latlng, disableDoubleClickZoom: !this.settings.canPan, draggable: this.settings.canPan, keyboardShortcuts: this.settings.canPan, mapTypeControlOptions: {mapTypeIds: google.maps.MapTypeId.ROADMAP}, scrollwheel: !1, panControl: !1, zoomControl: !0, scaleControl: !1, streetViewControl: !1, zoom: this.settings.mapZoom});
		var n = new google.maps.MarkerImage(this.settings.markerImg, new google.maps.Size(this.settings.markerWidth, this.settings.markerHeight), new google.maps.Point(0, 0), new google.maps.Point(this.settings.markerWidth / 2, this.settings.markerHeight), new google.maps.Size(this.settings.markerWidth, this.settings.markerHeight)), r = new google.maps.Marker({position: this.latlng, map: this.map, icon: n});
		this.settings.markerUrl !== null && google.maps.event.addListener(r, "click", function () {
			window.open(t.markerUrl, "_blank")
		}), this.resize()
	}, e.prototype.destroy = function () {
		this.element.removeAttribute("style")
	}, e.prototype.resize = function () {
		var e = Math.round(this.element.offsetWidth / this.settings.aspectRatioWidth * this.settings.aspectRatioHeight);
		this.element.style.height = e + "px", this.map.setCenter(this.latlng)
	}, e
}), define("modules/helpers", [], function () {
	return function () {
		if ("createTouch"in document)try {
			var e = /:hover/;
			for (var t = 0; t < document.styleSheets.length; t++) {
				var n = document.styleSheets[t];
				for (var r = n.cssRules.length - 1; r >= 0; r--) {
					var i = n.cssRules[r];
					i.type === CSSRule.STYLE_RULE && e.test(i.selectorText) && n.deleteRule(r)
				}
			}
		} catch (s) {
		}
	}
}), define("modules/history", [], function () {
	function f() {
		return!!window.history && !!history.pushState
	}

	function l() {
		var e = document.body || document.documentElement, t = e.style, n = "transition";
		if (typeof t[n] == "string")return!0;
		v = ["Moz", "webkit", "Webkit", "Khtml", "O", "ms"], n = "Transition";
		for (var r = 0; r < v.length; r++)if (typeof t[v[r] + n] == "string")return!0;
		return!1
	}

	function c(f) {
		if (u) {
			a = f;
			return
		}
		o !== null && (o.abort(), o = null);
		if (i === f)return;
		o = $.ajax({dataType: "html", type: "GET", url: f, success: function (l) {
			i = f, o = null;
			var h = $(l).filter("title").text(), p = $(l).filter("#content").html(), d = $(l).filter("#styles").html();
			u = !0, document.title = h, e.removeClass(), t.removeClass().addClass("animated fadeOut"), setTimeout(function () {
				t.html(p).removeClass().addClass("animated fadeIn"), n.html(d), r.pageLoaded(), setTimeout(function () {
					t.removeClass(), u = !1, a !== null && (c(a), a = null)
				}, s)
			}, s), window._gaq !== undefined && window._gaq.push(["_trackEvent", h, i])
		}, error            : function () {
			o = null
		}})
	}

	var e, t, n, r, i = document.URL, s = 10, o = null, u = !1, a = null;
	return function (o) {
		e = $("body"), t = $("#content"), n = $("#styles"), r = o, l() && (s = 500), f() && (e.on("tap", "a", function (e) {
			var t = $(this).prop("href");
			t !== "" && (i !== t && history.pushState(null, null, t), c(t), e.preventDefault())
		}), window.addEventListener("popstate", function (e) {
			var t = location.pathname;
			c(t)
		}))
	}
}), define("modules/item-list", [], function () {
	function e(e, t) {
		this.init(e, t)
	}

	return e.prototype.init = function (e, t) {
		t = typeof t != "object" ? {} : t, t.itemSelector = t.itemSelector === undefined || typeof t.itemSelector != "string" ? "li.item" : t.itemSelector, t.nextButton = t.nextButton === undefined || typeof t.nextButton != "object" ? null : t.nextButton, t.prevButton = t.prevButton === undefined || typeof t.prevButton != "object" ? null : t.prevButton, t.selectedItem = t.selectedItem === undefined || typeof t.selectedItem != "number" ? 0 : t.selectedItem, this.element = e, this.items = this.element.querySelectorAll(t.itemSelector), this.settings = t, this.selectedItem = this.settings.selectedItem, this.enable()
	}, e.prototype.destroy = function () {
		this.disable()
	}, e.prototype.enable = function () {
		this.settings.nextButton !== null && this.settings.nextButton.addEventListener("click", this.nextButtonClickHandler.bind(this)), this.settings.prevButton !== null && this.settings.prevButton.addEventListener("click", this.prevButtonClickHandler.bind(this)), this.setItem(this.selectedItem)
	}, e.prototype.disable = function () {
		this.settings.nextButton !== null && this.settings.nextButton.removeEventListener("click", this.nextButtonClickHandler.bind(this)), this.settings.prevButton !== null && this.settings.prevButton.removeEventListener("click", this.prevButtonClickHandler.bind(this))
	}, e.prototype.getItem = function () {
		return this.selectedItem
	}, e.prototype.setItem = function (e) {
		e = e < 0 ? this.items.length - 1 : e, e = e >= this.items.length ? 0 : e, this.selectedItem = e;
		var t, n;
		for (t = 0, n = this.items.length; t < n; ++t)t === this.selectedItem ? this.items[t].style.display = "block" : this.items[t].style.display = "none"
	}, e.prototype.nextItem = function () {
		this.setItem(this.selectedItem + 1)
	}, e.prototype.prevItem = function () {
		this.setItem(this.selectedItem - 1)
	}, e.prototype.nextButtonClickHandler = function (e) {
		this.nextItem(), e.preventDefault()
	}, e.prototype.prevButtonClickHandler = function (e) {
		this.prevItem(), e.preventDefault()
	}, e
}), define("modules/load-more-posts", [], function () {
	return function () {
		$("#load-more-posts").tap(function (e) {
			e.preventDefault();
			var t = $(this), n = t.attr("href"), r = t.attr("data-ajax-append"), i = $(r), s = n.match(/offset=(.*)/)[1], o = parseInt(s) + 10, u = $.get(n, function (e) {
				e ? (t.attr("href", n.replace("offset=" + s, "offset=" + o)), i.append(e)) : t.text("Sorry, No More Posts")
			})
		})
	}
}), define("modules/menu", [], function () {
	function e(e, t) {
		var n = $("body");
		$("[data-" + e + "-toggle]").tap(function () {
			n.hasClass("show-" + e) ? n.removeClass("show-" + e) : n.removeClass("show-artist-menu show-main-menu show-mobile-menu show-artist-resources").addClass("show-" + e)
		}), t && $(".menu-overlay, #content").bind("tap", function () {
			if (n.hasClass("show-" + e))return n.removeClass("show-" + e), !1
		})
	}

	return e
}), define("modules/menus", [], function () {
	function e(e) {
		var t = e.prop("href");
		return t = t.substring(0, t.length - 1), document.URL.indexOf(t) > -1 ? !0 : !1
	}

	function t(e) {
		var t = e.prop("href");
		return t === document.URL ? !0 : !1
	}

	function n() {
		$("#main-menu .nav > ul > li").each(function () {
			$(this).removeClass("active");
			var e = t($(this).find("> a"));
			e && $(this).addClass("active")
		}), $(".mobile-menu ul > li").each(function () {
			$(this).removeClass("active");
			var e = t($(this).find("> a"));
			e && $(this).addClass("active")
		}), $(".footer .nav > ul > li").each(function () {
			$(this).removeClass("active");
			var e = t($(this).find("> a"));
			e && $(this).addClass("active")
		})
	}

	function r() {
		n()
	}

	return r.prototype.update = n, r
}), define("modules/newsletter-signup", [], function () {
	return function () {
		var e = $('form[name="newsletter_signup"]');
		e.submit(function (t) {
			t.preventDefault();
			var n = {};
			$.each(e.serializeArray(), function (e, t) {
				n[t.name] = t.value
			}), e.find("label.form-error").remove(), $.ajax({type: "POST", url: "/newsletter", data: n, dataType: "json", success: function (t) {
				t.success === 1 ? (e.find(":input").not(":button, :submit, :reset, :hidden, :checkbox, :radio").val(""), e.find(":checkbox, :radio").prop("checked", !1), $el = e.find(".feedback").first(), $el.html("Thanks for signing up."), e.find("input").hide(), e.find("button").hide()) : (t.errorType === "api" && ($el = e.find("input").first(), $('<label class="form-error">An unknown error has occured. Please try again later.</label>').insertAfter($el)), t.errorType === "validation" && $.each(t.errors, function (t, n) {
					var r = e.find('[name="' + t + '"]');
					r.addClass("error"), $errorBox = e.find(".error-box"), $('<label class="form-error">' + n + "</label>").appendTo($errorBox)
				}))
			}})
		})
	}
}), define("modules/contact-signup", [], function () {
	return function () {
		var e = $('form[name="contact"]'), t = e.find(".contact-submit");
		e.submit(function (n) {
			n.preventDefault(), $('<div class="ajax-spinner"><img src="/assets/img/icons/ajax-loader.gif" alt="Please wait..." /></div>').insertAfter(t), t.hide();
			var r = {};
			$.each(e.serializeArray(), function (e, t) {
				r[t.name] = t.value
			}), e.find("label.form-error").remove(), $.ajax({type: "POST", url: "/contact", data: r, dataType: "json", success: function (n) {
				e.find(".ajax-spinner").remove(), t.show(), n.success === 1 ? (e.find(":input").not(":button, :submit, :reset, :hidden, :checkbox, :radio").val(""), e.find(":checkbox, :radio").prop("checked", !1), $feedback = e.parent("div").find(".feedback").first(), $feedback.html("Thanks for contacting us."), e.hide()) : (n.errorType === "api" && ($el = e.find("input").first(), $('<label class="form-error">An unknown error has occured. Please try again later.</label>').insertAfter($el)), n.errorType === "validation" && $.each(n.errors, function (t, n) {
					var r = e.find('[name="' + t + '"]');
					r.addClass("error"), $('<label class="form-error">' + n + "</label>").insertAfter(r)
				}))
			}})
		})
	}
}), define("modules/splash", [], function () {
	return function () {
		var e = $("#splash");
		setTimeout(function () {
			e.fadeOut(500, function () {
				e.remove()
			})
		}, 250)
	}
}), define("modules/toggle-view", [], function () {
	function e() {
		this.enable()
	}

	return e.prototype.enable = function (e) {
		$("[data-toggle-view]").click(function () {
			$($(this).data("toggle-view")).toggle()
		})
	}, e.prototype.disable = function (e) {
		$("[data-toggle-view]").unbind("click")
	}, e
}), require(["modules/gallery", "modules/google-map", "modules/helpers", "modules/history", "modules/item-list", "modules/load-more-posts", "modules/menu", "modules/menus", "modules/newsletter-signup", "modules/contact-signup", "modules/splash", "modules/toggle-view"], function (e, t, n, r, i, s, o, u, a, f, l, c) {
	function E() {
		w = [], $(".youtube-video").videoModal();
		var n = $("#google-map");
		if (n.length > 0) {
			var r = new t(n.get(0), {markerImage: "/assets/img/theme/marker.png", markerLatitude: 35.2326823, markerLongitude: -80.836015, markerUrl: "https://www.google.com/maps/@35.2012418,-80.8120253,14z", markerWidth: 20, markerHeight: 35});
			w.push(r)
		}
		var o = $(".gallery, .gallery-home");
		o.length > 0 && o.each(function () {
			var t = new e($(this).get(0), {keyboardIsEnabled: !0, nextButton: $(this).find(".next").get(0), prevButton: $(this).find(".prev").get(0)});
			w.push(t)
		});
		var u = $(".testimonials");
		u.length > 0 && u.each(function () {
			var e = new i($(this).get(0), {itemSelector: "div.testimonial", nextButton: $(this).find(".next").get(0), prevButton: $(this).find(".prev").get(0)})
		}), $(".header-home i.down, .header-event i.down").tap(function () {
			var e = $(".header").height();
			$("html, body").animate({scrollTop: e}, 250)
		});
		var l = new s, h = new a, p = new f, d = new c;
		g.update()
	}

	function S() {
		var e = $(window).height(), t = $(window).width();
		if ($(".header-home").length > 0)if (e >= 541 && t >= 1025) {
			var n = e - 65 - 130 - 20;
			$(".header-home div.image").css("max-height", n + "px"), $(".header").css("height", e + "px"), $(".page").css("margin-top", e + "px")
		} else $(".header-home div.image").css("max-height", "none"), $(".header").css("height", "auto"), $(".page").css("margin-top", "0");
		if ($(".issuuembed").length > 0) {
			var r = $(".issuuembed").width(), i = Math.ceil(r / 525 * 340);
			$(".issuuembed").css("height", i)
		}
		$(".page").css("min-height", Math.ceil(e)), $("body").removeClass("show-artist-menu show-main-menu show-mobile-menu show-artist-resources");
		for (var s = 0, o = w.length; s < o; ++s)w[s].resize()
	}

	function x() {
		var e = $(window).height(), t = $(".header").height();
		$(window).scrollTop() > t ? $(".footer").addClass("show") : $(".footer").removeClass("show")
	}

	window.badBrowser = !1;
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
		var h = parseFloat(RegExp.$1);
		if (h <= 8)return
	}
	var p = new n, d = new o("artist-menu", !0), v = new o("main-menu", !0), m = new o("mobile-menu", !0), g = new u, y = new o("artist-resources", !1), b = new l("splash"), w = [];
	$("body").addClass("javascript-enabled"), E(), $(window).resize($.throttle(250, S)), S(), $(window).scroll($.throttle(25, x)), x()
}), define("main", function () {
});