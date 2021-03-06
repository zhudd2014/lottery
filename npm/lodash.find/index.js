function arraySome(e, t) {
    for (var r = -1, a = e ? e.length : 0; ++r < a; ) if (t(e[r], r, e)) return !0;
    return !1;
}

function baseFindIndex(e, t, r, a) {
    for (var n = e.length, o = r + (a ? 1 : -1); a ? o-- : ++o < n; ) if (t(e[o], o, e)) return o;
    return -1;
}

function baseProperty(e) {
    return function(t) {
        return null == t ? void 0 : t[e];
    };
}

function baseTimes(e, t) {
    for (var r = -1, a = Array(e); ++r < e; ) a[r] = t(r);
    return a;
}

function baseUnary(e) {
    return function(t) {
        return e(t);
    };
}

function getValue(e, t) {
    return null == e ? void 0 : e[t];
}

function isHostObject(e) {
    var t = !1;
    if (null != e && "function" != typeof e.toString) try {
        t = !!(e + "");
    } catch (e) {}
    return t;
}

function mapToArray(e) {
    var t = -1, r = Array(e.size);
    return e.forEach(function(e, a) {
        r[++t] = [ a, e ];
    }), r;
}

function overArg(e, t) {
    return function(r) {
        return e(t(r));
    };
}

function setToArray(e) {
    var t = -1, r = Array(e.size);
    return e.forEach(function(e) {
        r[++t] = e;
    }), r;
}

function Hash(e) {
    var t = -1, r = e ? e.length : 0;
    for (this.clear(); ++t < r; ) {
        var a = e[t];
        this.set(a[0], a[1]);
    }
}

function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

function hashDelete(e) {
    return this.has(e) && delete this.__data__[e];
}

function hashGet(e) {
    var t = this.__data__;
    if (nativeCreate) {
        var r = t[e];
        return r === HASH_UNDEFINED ? void 0 : r;
    }
    return hasOwnProperty.call(t, e) ? t[e] : void 0;
}

function hashHas(e) {
    var t = this.__data__;
    return nativeCreate ? void 0 !== t[e] : hasOwnProperty.call(t, e);
}

function hashSet(e, t) {
    return this.__data__[e] = nativeCreate && void 0 === t ? HASH_UNDEFINED : t, this;
}

function ListCache(e) {
    var t = -1, r = e ? e.length : 0;
    for (this.clear(); ++t < r; ) {
        var a = e[t];
        this.set(a[0], a[1]);
    }
}

function listCacheClear() {
    this.__data__ = [];
}

function listCacheDelete(e) {
    var t = this.__data__, r = assocIndexOf(t, e);
    return !(r < 0) && (r == t.length - 1 ? t.pop() : splice.call(t, r, 1), !0);
}

function listCacheGet(e) {
    var t = this.__data__, r = assocIndexOf(t, e);
    return r < 0 ? void 0 : t[r][1];
}

function listCacheHas(e) {
    return assocIndexOf(this.__data__, e) > -1;
}

function listCacheSet(e, t) {
    var r = this.__data__, a = assocIndexOf(r, e);
    return a < 0 ? r.push([ e, t ]) : r[a][1] = t, this;
}

function MapCache(e) {
    var t = -1, r = e ? e.length : 0;
    for (this.clear(); ++t < r; ) {
        var a = e[t];
        this.set(a[0], a[1]);
    }
}

function mapCacheClear() {
    this.__data__ = {
        hash: new Hash(),
        map: new (Map || ListCache)(),
        string: new Hash()
    };
}

function mapCacheDelete(e) {
    return getMapData(this, e).delete(e);
}

function mapCacheGet(e) {
    return getMapData(this, e).get(e);
}

function mapCacheHas(e) {
    return getMapData(this, e).has(e);
}

function mapCacheSet(e, t) {
    return getMapData(this, e).set(e, t), this;
}

function SetCache(e) {
    var t = -1, r = e ? e.length : 0;
    for (this.__data__ = new MapCache(); ++t < r; ) this.add(e[t]);
}

function setCacheAdd(e) {
    return this.__data__.set(e, HASH_UNDEFINED), this;
}

function setCacheHas(e) {
    return this.__data__.has(e);
}

function Stack(e) {
    this.__data__ = new ListCache(e);
}

function stackClear() {
    this.__data__ = new ListCache();
}

function stackDelete(e) {
    return this.__data__.delete(e);
}

function stackGet(e) {
    return this.__data__.get(e);
}

function stackHas(e) {
    return this.__data__.has(e);
}

function stackSet(e, t) {
    var r = this.__data__;
    if (r instanceof ListCache) {
        var a = r.__data__;
        if (!Map || a.length < LARGE_ARRAY_SIZE - 1) return a.push([ e, t ]), this;
        r = this.__data__ = new MapCache(a);
    }
    return r.set(e, t), this;
}

function arrayLikeKeys(e, t) {
    var r = isArray(e) || isArguments(e) ? baseTimes(e.length, String) : [], a = r.length, n = !!a;
    for (var o in e) !t && !hasOwnProperty.call(e, o) || n && ("length" == o || isIndex(o, a)) || r.push(o);
    return r;
}

function assocIndexOf(e, t) {
    for (var r = e.length; r--; ) if (eq(e[r][0], t)) return r;
    return -1;
}

function baseGet(e, t) {
    t = isKey(t, e) ? [ t ] : castPath(t);
    for (var r = 0, a = t.length; null != e && r < a; ) e = e[toKey(t[r++])];
    return r && r == a ? e : void 0;
}

function baseGetTag(e) {
    return objectToString.call(e);
}

function baseHasIn(e, t) {
    return null != e && t in Object(e);
}

function baseIsEqual(e, t, r, a, n) {
    return e === t || (null == e || null == t || !isObject(e) && !isObjectLike(t) ? e !== e && t !== t : baseIsEqualDeep(e, t, baseIsEqual, r, a, n));
}

function baseIsEqualDeep(e, t, r, a, n, o) {
    var i = isArray(e), s = isArray(t), c = arrayTag, u = arrayTag;
    i || (c = getTag(e), c = c == argsTag ? objectTag : c), s || (u = getTag(t), u = u == argsTag ? objectTag : u);
    var f = c == objectTag && !isHostObject(e), l = u == objectTag && !isHostObject(t), y = c == u;
    if (y && !f) return o || (o = new Stack()), i || isTypedArray(e) ? equalArrays(e, t, r, a, n, o) : equalByTag(e, t, c, r, a, n, o);
    if (!(n & PARTIAL_COMPARE_FLAG)) {
        var p = f && hasOwnProperty.call(e, "__wrapped__"), g = l && hasOwnProperty.call(t, "__wrapped__");
        if (p || g) {
            var h = p ? e.value() : e, b = g ? t.value() : t;
            return o || (o = new Stack()), r(h, b, a, n, o);
        }
    }
    return !!y && (o || (o = new Stack()), equalObjects(e, t, r, a, n, o));
}

function baseIsMatch(e, t, r, a) {
    var n = r.length, o = n, i = !a;
    if (null == e) return !o;
    for (e = Object(e); n--; ) {
        var s = r[n];
        if (i && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
    }
    for (;++n < o; ) {
        s = r[n];
        var c = s[0], u = e[c], f = s[1];
        if (i && s[2]) {
            if (void 0 === u && !(c in e)) return !1;
        } else {
            var l = new Stack();
            if (a) var y = a(u, f, c, e, t, l);
            if (!(void 0 === y ? baseIsEqual(f, u, a, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, l) : y)) return !1;
        }
    }
    return !0;
}

function baseIsNative(e) {
    return !(!isObject(e) || isMasked(e)) && (isFunction(e) || isHostObject(e) ? reIsNative : reIsHostCtor).test(toSource(e));
}

function baseIsTypedArray(e) {
    return isObjectLike(e) && isLength(e.length) && !!typedArrayTags[objectToString.call(e)];
}

function baseIteratee(e) {
    return "function" == typeof e ? e : null == e ? identity : "object" == typeof e ? isArray(e) ? baseMatchesProperty(e[0], e[1]) : baseMatches(e) : property(e);
}

function baseKeys(e) {
    if (!isPrototype(e)) return nativeKeys(e);
    var t = [];
    for (var r in Object(e)) hasOwnProperty.call(e, r) && "constructor" != r && t.push(r);
    return t;
}

function baseMatches(e) {
    var t = getMatchData(e);
    return 1 == t.length && t[0][2] ? matchesStrictComparable(t[0][0], t[0][1]) : function(r) {
        return r === e || baseIsMatch(r, e, t);
    };
}

function baseMatchesProperty(e, t) {
    return isKey(e) && isStrictComparable(t) ? matchesStrictComparable(toKey(e), t) : function(r) {
        var a = get(r, e);
        return void 0 === a && a === t ? hasIn(r, e) : baseIsEqual(t, a, void 0, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
    };
}

function basePropertyDeep(e) {
    return function(t) {
        return baseGet(t, e);
    };
}

function baseToString(e) {
    if ("string" == typeof e) return e;
    if (isSymbol(e)) return symbolToString ? symbolToString.call(e) : "";
    var t = e + "";
    return "0" == t && 1 / e == -INFINITY ? "-0" : t;
}

function castPath(e) {
    return isArray(e) ? e : stringToPath(e);
}

function createFind(e) {
    return function(t, r, a) {
        var n = Object(t);
        if (!isArrayLike(t)) {
            var o = baseIteratee(r, 3);
            t = keys(t), r = function(e) {
                return o(n[e], e, n);
            };
        }
        var i = e(t, r, a);
        return i > -1 ? n[o ? t[i] : i] : void 0;
    };
}

function equalArrays(e, t, r, a, n, o) {
    var i = n & PARTIAL_COMPARE_FLAG, s = e.length, c = t.length;
    if (s != c && !(i && c > s)) return !1;
    var u = o.get(e);
    if (u && o.get(t)) return u == t;
    var f = -1, l = !0, y = n & UNORDERED_COMPARE_FLAG ? new SetCache() : void 0;
    for (o.set(e, t), o.set(t, e); ++f < s; ) {
        var p = e[f], g = t[f];
        if (a) var h = i ? a(g, p, f, t, e, o) : a(p, g, f, e, t, o);
        if (void 0 !== h) {
            if (h) continue;
            l = !1;
            break;
        }
        if (y) {
            if (!arraySome(t, function(e, t) {
                if (!y.has(t) && (p === e || r(p, e, a, n, o))) return y.add(t);
            })) {
                l = !1;
                break;
            }
        } else if (p !== g && !r(p, g, a, n, o)) {
            l = !1;
            break;
        }
    }
    return o.delete(e), o.delete(t), l;
}

function equalByTag(e, t, r, a, n, o, i) {
    switch (r) {
      case dataViewTag:
        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
        e = e.buffer, t = t.buffer;

      case arrayBufferTag:
        return !(e.byteLength != t.byteLength || !a(new Uint8Array(e), new Uint8Array(t)));

      case boolTag:
      case dateTag:
      case numberTag:
        return eq(+e, +t);

      case errorTag:
        return e.name == t.name && e.message == t.message;

      case regexpTag:
      case stringTag:
        return e == t + "";

      case mapTag:
        var s = mapToArray;

      case setTag:
        var c = o & PARTIAL_COMPARE_FLAG;
        if (s || (s = setToArray), e.size != t.size && !c) return !1;
        var u = i.get(e);
        if (u) return u == t;
        o |= UNORDERED_COMPARE_FLAG, i.set(e, t);
        var f = equalArrays(s(e), s(t), a, n, o, i);
        return i.delete(e), f;

      case symbolTag:
        if (symbolValueOf) return symbolValueOf.call(e) == symbolValueOf.call(t);
    }
    return !1;
}

function equalObjects(e, t, r, a, n, o) {
    var i = n & PARTIAL_COMPARE_FLAG, s = keys(e), c = s.length;
    if (c != keys(t).length && !i) return !1;
    for (var u = c; u--; ) {
        var f = s[u];
        if (!(i ? f in t : hasOwnProperty.call(t, f))) return !1;
    }
    var l = o.get(e);
    if (l && o.get(t)) return l == t;
    var y = !0;
    o.set(e, t), o.set(t, e);
    for (var p = i; ++u < c; ) {
        f = s[u];
        var g = e[f], h = t[f];
        if (a) var b = i ? a(h, g, f, t, e, o) : a(g, h, f, e, t, o);
        if (!(void 0 === b ? g === h || r(g, h, a, n, o) : b)) {
            y = !1;
            break;
        }
        p || (p = "constructor" == f);
    }
    if (y && !p) {
        var T = e.constructor, d = t.constructor;
        T != d && "constructor" in e && "constructor" in t && !("function" == typeof T && T instanceof T && "function" == typeof d && d instanceof d) && (y = !1);
    }
    return o.delete(e), o.delete(t), y;
}

function getMapData(e, t) {
    var r = e.__data__;
    return isKeyable(t) ? r["string" == typeof t ? "string" : "hash"] : r.map;
}

function getMatchData(e) {
    for (var t = keys(e), r = t.length; r--; ) {
        var a = t[r], n = e[a];
        t[r] = [ a, n, isStrictComparable(n) ];
    }
    return t;
}

function getNative(e, t) {
    var r = getValue(e, t);
    return baseIsNative(r) ? r : void 0;
}

function hasPath(e, t, r) {
    t = isKey(t, e) ? [ t ] : castPath(t);
    for (var a, n = -1, o = t.length; ++n < o; ) {
        var i = toKey(t[n]);
        if (!(a = null != e && r(e, i))) break;
        e = e[i];
    }
    if (a) return a;
    var o = e ? e.length : 0;
    return !!o && isLength(o) && isIndex(i, o) && (isArray(e) || isArguments(e));
}

function isIndex(e, t) {
    return !!(t = null == t ? MAX_SAFE_INTEGER : t) && ("number" == typeof e || reIsUint.test(e)) && e > -1 && e % 1 == 0 && e < t;
}

function isKey(e, t) {
    if (isArray(e)) return !1;
    var r = typeof e;
    return !("number" != r && "symbol" != r && "boolean" != r && null != e && !isSymbol(e)) || (reIsPlainProp.test(e) || !reIsDeepProp.test(e) || null != t && e in Object(t));
}

function isKeyable(e) {
    var t = typeof e;
    return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e;
}

function isMasked(e) {
    return !!maskSrcKey && maskSrcKey in e;
}

function isPrototype(e) {
    var t = e && e.constructor;
    return e === ("function" == typeof t && t.prototype || objectProto);
}

function isStrictComparable(e) {
    return e === e && !isObject(e);
}

function matchesStrictComparable(e, t) {
    return function(r) {
        return null != r && (r[e] === t && (void 0 !== t || e in Object(r)));
    };
}

function toKey(e) {
    if ("string" == typeof e || isSymbol(e)) return e;
    var t = e + "";
    return "0" == t && 1 / e == -INFINITY ? "-0" : t;
}

function toSource(e) {
    if (null != e) {
        try {
            return funcToString.call(e);
        } catch (e) {}
        try {
            return e + "";
        } catch (e) {}
    }
    return "";
}

function findIndex(e, t, r) {
    var a = e ? e.length : 0;
    if (!a) return -1;
    var n = null == r ? 0 : toInteger(r);
    return n < 0 && (n = nativeMax(a + n, 0)), baseFindIndex(e, baseIteratee(t, 3), n);
}

function memoize(e, t) {
    if ("function" != typeof e || t && "function" != typeof t) throw new TypeError(FUNC_ERROR_TEXT);
    var r = function() {
        var a = arguments, n = t ? t.apply(this, a) : a[0], o = r.cache;
        if (o.has(n)) return o.get(n);
        var i = e.apply(this, a);
        return r.cache = o.set(n, i), i;
    };
    return r.cache = new (memoize.Cache || MapCache)(), r;
}

function eq(e, t) {
    return e === t || e !== e && t !== t;
}

function isArguments(e) {
    return isArrayLikeObject(e) && hasOwnProperty.call(e, "callee") && (!propertyIsEnumerable.call(e, "callee") || objectToString.call(e) == argsTag);
}

function isArrayLike(e) {
    return null != e && isLength(e.length) && !isFunction(e);
}

function isArrayLikeObject(e) {
    return isObjectLike(e) && isArrayLike(e);
}

function isFunction(e) {
    var t = isObject(e) ? objectToString.call(e) : "";
    return t == funcTag || t == genTag;
}

function isLength(e) {
    return "number" == typeof e && e > -1 && e % 1 == 0 && e <= MAX_SAFE_INTEGER;
}

function isObject(e) {
    var t = typeof e;
    return !!e && ("object" == t || "function" == t);
}

function isObjectLike(e) {
    return !!e && "object" == typeof e;
}

function isSymbol(e) {
    return "symbol" == typeof e || isObjectLike(e) && objectToString.call(e) == symbolTag;
}

function toFinite(e) {
    if (!e) return 0 === e ? e : 0;
    if ((e = toNumber(e)) === INFINITY || e === -INFINITY) {
        return (e < 0 ? -1 : 1) * MAX_INTEGER;
    }
    return e === e ? e : 0;
}

function toInteger(e) {
    var t = toFinite(e), r = t % 1;
    return t === t ? r ? t - r : t : 0;
}

function toNumber(e) {
    if ("number" == typeof e) return e;
    if (isSymbol(e)) return NAN;
    if (isObject(e)) {
        var t = "function" == typeof e.valueOf ? e.valueOf() : e;
        e = isObject(t) ? t + "" : t;
    }
    if ("string" != typeof e) return 0 === e ? e : +e;
    e = e.replace(reTrim, "");
    var r = reIsBinary.test(e);
    return r || reIsOctal.test(e) ? freeParseInt(e.slice(2), r ? 2 : 8) : reIsBadHex.test(e) ? NAN : +e;
}

function toString(e) {
    return null == e ? "" : baseToString(e);
}

function get(e, t, r) {
    var a = null == e ? void 0 : baseGet(e, t);
    return void 0 === a ? r : a;
}

function hasIn(e, t) {
    return null != e && hasPath(e, t, baseHasIn);
}

function keys(e) {
    return isArrayLike(e) ? arrayLikeKeys(e) : baseKeys(e);
}

function identity(e) {
    return e;
}

function property(e) {
    return isKey(e) ? baseProperty(toKey(e)) : basePropertyDeep(e);
}

var LARGE_ARRAY_SIZE = 200, FUNC_ERROR_TEXT = "Expected a function", HASH_UNDEFINED = "__lodash_hash_undefined__", UNORDERED_COMPARE_FLAG = 1, PARTIAL_COMPARE_FLAG = 2, INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 1.7976931348623157e308, NAN = NaN, argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", promiseTag = "[object Promise]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]", arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]", reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, reLeadingDot = /^\./, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reTrim = /^\s+|\s+$/g, reEscapeChar = /\\(\\)?/g, reIsBadHex = /^[-+]0x[0-9a-f]+$/i, reIsBinary = /^0b[01]+$/i, reIsHostCtor = /^\[object .+?Constructor\]$/, reIsOctal = /^0o[0-7]+$/i, reIsUint = /^(?:0|[1-9]\d*)$/, typedArrayTags = {};

typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = !0, 
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = !1;

var freeParseInt = parseInt, freeGlobal = "object" == typeof global && global && global.Object === Object && global, freeSelf = "object" == typeof self && self && self.Object === Object && self, root = freeGlobal || freeSelf || Function("return this")(), freeExports = "object" == typeof exports && exports && !exports.nodeType && exports, freeModule = freeExports && "object" == typeof module && module && !module.nodeType && module, moduleExports = freeModule && freeModule.exports === freeExports, freeProcess = moduleExports && freeGlobal.process, nodeUtil = function() {
    try {
        return freeProcess && freeProcess.binding("util");
    } catch (e) {}
}(), nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray, arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype, coreJsData = root["__core-js_shared__"], maskSrcKey = function() {
    var e = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return e ? "Symbol(src)_1." + e : "";
}(), funcToString = funcProto.toString, hasOwnProperty = objectProto.hasOwnProperty, objectToString = objectProto.toString, reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Symbol = root.Symbol, Uint8Array = root.Uint8Array, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, nativeKeys = overArg(Object.keys, Object), nativeMax = Math.max, DataView = getNative(root, "DataView"), Map = getNative(root, "Map"), Promise = getNative(root, "Promise"), Set = getNative(root, "Set"), WeakMap = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create"), dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap), symbolProto = Symbol ? Symbol.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;

Hash.prototype.clear = hashClear, Hash.prototype.delete = hashDelete, Hash.prototype.get = hashGet, 
Hash.prototype.has = hashHas, Hash.prototype.set = hashSet, ListCache.prototype.clear = listCacheClear, 
ListCache.prototype.delete = listCacheDelete, ListCache.prototype.get = listCacheGet, 
ListCache.prototype.has = listCacheHas, ListCache.prototype.set = listCacheSet, 
MapCache.prototype.clear = mapCacheClear, MapCache.prototype.delete = mapCacheDelete, 
MapCache.prototype.get = mapCacheGet, MapCache.prototype.has = mapCacheHas, MapCache.prototype.set = mapCacheSet, 
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd, SetCache.prototype.has = setCacheHas, 
Stack.prototype.clear = stackClear, Stack.prototype.delete = stackDelete, Stack.prototype.get = stackGet, 
Stack.prototype.has = stackHas, Stack.prototype.set = stackSet;

var getTag = baseGetTag;

(DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) && (getTag = function(e) {
    var t = objectToString.call(e), r = t == objectTag ? e.constructor : void 0, a = r ? toSource(r) : void 0;
    if (a) switch (a) {
      case dataViewCtorString:
        return dataViewTag;

      case mapCtorString:
        return mapTag;

      case promiseCtorString:
        return promiseTag;

      case setCtorString:
        return setTag;

      case weakMapCtorString:
        return weakMapTag;
    }
    return t;
});

var stringToPath = memoize(function(e) {
    e = toString(e);
    var t = [];
    return reLeadingDot.test(e) && t.push(""), e.replace(rePropName, function(e, r, a, n) {
        t.push(a ? n.replace(reEscapeChar, "$1") : r || e);
    }), t;
}), find = createFind(findIndex);

memoize.Cache = MapCache;

var isArray = Array.isArray, isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = find;