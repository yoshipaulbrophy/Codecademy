(function() {
    function c(a) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(a + "=");
            if (c_start != -1)
                return c_start = c_start + a.length + 1,
                c_end = document.cookie.indexOf(";", c_start),
                c_end == -1 && (c_end = document.cookie.length),
                unescape(document.cookie.substring(c_start, c_end))
        }
        return ""
    }
    function d(a, b, d) {
        var e = document.location.host.toLowerCase().split(":")[0]
          , f = e.split(".")
          , g = [];
        if (f.length == 1) {
            var h = new Date;
            h.setDate(h.getDate() + d),
            document.cookie = a + "=" + escape(b) + (d == null ? "" : ";expires=" + h.toUTCString()) + ";path=/"
        } else
            for (var i = f.length - 1; i >= 0; i--) {
                g.push(f[i]);
                var j = "." + g.slice().reverse().join(".")
                  , h = new Date;
                h.setDate(h.getDate() + d),
                document.cookie = a + "=" + escape(b) + (d == null ? "" : ";expires=" + h.toUTCString()) + ";domain=" + j + ";path=/";
                if (c(a) == b)
                    break
            }
    }
    function e(a) {
        return f(a) === "function"
    }
    function f(a) {
        return a == null ? String(a) : b[Object.prototype.toString.call(a)] || "object"
    }
    function g(b) {
        var c = []
          , d = function(a, b) {
            b = e(b) ? b() : b,
            c[c.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        for (var f in b)
            b.hasOwnProperty(f) && h(f, b[f], d);
        return c.join("&").replace(a, "+")
    }
    function h(a, b, c) {
        if (b != null && typeof b == "object")
            for (var d in b)
                b.hasOwnProperty(d) && h(a + "[" + d + "]", b[d] == null ? "" : b[d], c);
        else
            c(a, b)
    }
    function i() {
        var a = function() {
            return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
        };
        return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
    }
    function j() {
        var a = c(_cio.cookieNamespace);
        return a || (a = i(),
        d(_cio.cookieNamespace, a, 1)),
        a
    }
    function k() {
        return c(_cio.cookieNamespace + "id")
    }
    function l(a, b) {
        var c, d, e = document.getElementById("cio-tracker");
        return e && (d = e.getAttribute("data-site-id"),
        c = e.src.replace("assets.customer.io", "track.customer.io"),
        c = c.replace("/assets/track.js", "/events/" + a + ".gif"),
        c = c.replace("/assets_dev/track.js", "/events/" + a + ".gif"),
        c = c.replace(/\/events\/.*\.gif/, "/events/" + a + ".gif"),
        c = c.replace(/^(http|https):/, ""),
        c = c.replace(/^\/\//, ""),
        b.site_id = d,
        b.timestamp = (new Date).getTime(),
        c += "?" + g(b)),
        "https://" + c
    }
    function m(a, b) {
        b.s = j(),
        b.c = k();
        var c = new Image;
        c.src = l(a, b),
        _cio.images.push(c)
    }
    function n(a, b) {
        _cio.pageHasLoaded ? m(a, b) : setTimeout(function() {
            n(a, b)
        }, 50)
    }
    var a = /%20/g
      , b = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regexp",
        "[object Object]": "object"
    };
    if (f(_cio) == "array") {
        var o = _cio.slice(0);
        _cio = {
            images: [],
            pageHasLoaded: !1,
            cookieNamespace: "_cio",
            load: function() {
                _cio.pageHasLoaded = !0
            },
            push: function(a) {
                var b = a.shift();
                _cio[b].apply(this, a)
            },
            identify: function(a) {
                var b = c(_cio.cookieNamespace + "id")
                  , e = a.id || a.id_secure;
                b && b != e && (guid = i(),
                d(_cio.cookieNamespace, guid, 1)),
                d(_cio.cookieNamespace + "id", e, 1),
                n("identify", {
                    user: a
                })
            },
            sidentify: function(a) {
                a._secure = !0,
                _cio.identify(a)
            },
            track: function(a, b) {
                n("event", {
                    name: a,
                    data: b || {}
                })
            },
            page: function(a, b) {
                n("page", {
                    name: a,
                    data: b || {}
                })
            },
            cookie: function(a) {
                _cio.cookieNamespace = a
            }
        },
        function() {
            var a = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            document.referrer && document.referrer != "" && (a.referrer = document.referrer),
            _cio.page(document.location.href, a)
        }();
        for (var p = 0; p < o.length; p++)
            _cio.push(o[p]);
        document.readyState === "complete" ? _cio.load() : window.addEventListener ? window.addEventListener("load", _cio.load, !1) : window.attachEvent ? window.attachEvent("onload", _cio.load) : _cio.load()
    }
})();
