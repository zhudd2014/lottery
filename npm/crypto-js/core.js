!function(t, n) {
    "object" == typeof exports ? module.exports = exports = n() : "function" == typeof define && define.amd ? define([], n) : t.CryptoJS = n();
}(this, function() {
    var t = t || function(t, n) {
        var i = Object.create || function() {
            function t() {}
            return function(n) {
                var i;
                return t.prototype = n, i = new t(), t.prototype = null, i;
            };
        }(), e = {}, r = e.lib = {}, o = r.Base = function() {
            return {
                extend: function(t) {
                    var n = i(this);
                    return t && n.mixIn(t), n.hasOwnProperty("init") && this.init !== n.init || (n.init = function() {
                        n.$super.init.apply(this, arguments);
                    }), n.init.prototype = n, n.$super = this, n;
                },
                create: function() {
                    var t = this.extend();
                    return t.init.apply(t, arguments), t;
                },
                init: function() {},
                mixIn: function(t) {
                    for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
                    t.hasOwnProperty("toString") && (this.toString = t.toString);
                },
                clone: function() {
                    return this.init.prototype.extend(this);
                }
            };
        }(), s = r.WordArray = o.extend({
            init: function(t, n) {
                t = this.words = t || [], this.sigBytes = void 0 != n ? n : 4 * t.length;
            },
            toString: function(t) {
                return (t || c).stringify(this);
            },
            concat: function(t) {
                var n = this.words, i = t.words, e = this.sigBytes, r = t.sigBytes;
                if (this.clamp(), e % 4) for (var o = 0; o < r; o++) {
                    var s = i[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                    n[e + o >>> 2] |= s << 24 - (e + o) % 4 * 8;
                } else for (var o = 0; o < r; o += 4) n[e + o >>> 2] = i[o >>> 2];
                return this.sigBytes += r, this;
            },
            clamp: function() {
                var n = this.words, i = this.sigBytes;
                n[i >>> 2] &= 4294967295 << 32 - i % 4 * 8, n.length = t.ceil(i / 4);
            },
            clone: function() {
                var t = o.clone.call(this);
                return t.words = this.words.slice(0), t;
            },
            random: function(n) {
                for (var i, e = [], r = 0; r < n; r += 4) {
                    var o = function(n) {
                        var n = n, i = 987654321, e = 4294967295;
                        return function() {
                            i = 36969 * (65535 & i) + (i >> 16) & e, n = 18e3 * (65535 & n) + (n >> 16) & e;
                            var r = (i << 16) + n & e;
                            return r /= 4294967296, (r += .5) * (t.random() > .5 ? 1 : -1);
                        };
                    }(4294967296 * (i || t.random()));
                    i = 987654071 * o(), e.push(4294967296 * o() | 0);
                }
                return new s.init(e, n);
            }
        }), a = e.enc = {}, c = a.Hex = {
            stringify: function(t) {
                for (var n = t.words, i = t.sigBytes, e = [], r = 0; r < i; r++) {
                    var o = n[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                    e.push((o >>> 4).toString(16)), e.push((15 & o).toString(16));
                }
                return e.join("");
            },
            parse: function(t) {
                for (var n = t.length, i = [], e = 0; e < n; e += 2) i[e >>> 3] |= parseInt(t.substr(e, 2), 16) << 24 - e % 8 * 4;
                return new s.init(i, n / 2);
            }
        }, u = a.Latin1 = {
            stringify: function(t) {
                for (var n = t.words, i = t.sigBytes, e = [], r = 0; r < i; r++) {
                    var o = n[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                    e.push(String.fromCharCode(o));
                }
                return e.join("");
            },
            parse: function(t) {
                for (var n = t.length, i = [], e = 0; e < n; e++) i[e >>> 2] |= (255 & t.charCodeAt(e)) << 24 - e % 4 * 8;
                return new s.init(i, n);
            }
        }, f = a.Utf8 = {
            stringify: function(t) {
                try {
                    return decodeURIComponent(escape(u.stringify(t)));
                } catch (t) {
                    throw new Error("Malformed UTF-8 data");
                }
            },
            parse: function(t) {
                return u.parse(unescape(encodeURIComponent(t)));
            }
        }, h = r.BufferedBlockAlgorithm = o.extend({
            reset: function() {
                this._data = new s.init(), this._nDataBytes = 0;
            },
            _append: function(t) {
                "string" == typeof t && (t = f.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes;
            },
            _process: function(n) {
                var i = this._data, e = i.words, r = i.sigBytes, o = this.blockSize, a = 4 * o, c = r / a;
                c = n ? t.ceil(c) : t.max((0 | c) - this._minBufferSize, 0);
                var u = c * o, f = t.min(4 * u, r);
                if (u) {
                    for (var h = 0; h < u; h += o) this._doProcessBlock(e, h);
                    var p = e.splice(0, u);
                    i.sigBytes -= f;
                }
                return new s.init(p, f);
            },
            clone: function() {
                var t = o.clone.call(this);
                return t._data = this._data.clone(), t;
            },
            _minBufferSize: 0
        }), p = (r.Hasher = h.extend({
            cfg: o.extend(),
            init: function(t) {
                this.cfg = this.cfg.extend(t), this.reset();
            },
            reset: function() {
                h.reset.call(this), this._doReset();
            },
            update: function(t) {
                return this._append(t), this._process(), this;
            },
            finalize: function(t) {
                return t && this._append(t), this._doFinalize();
            },
            blockSize: 16,
            _createHelper: function(t) {
                return function(n, i) {
                    return new t.init(i).finalize(n);
                };
            },
            _createHmacHelper: function(t) {
                return function(n, i) {
                    return new p.HMAC.init(t, i).finalize(n);
                };
            }
        }), e.algo = {});
        return e;
    }(Math);
    return t;
});