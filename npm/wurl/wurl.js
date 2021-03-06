module.exports = function(r, c) {
    function t() {
        return new RegExp(/(.*?)\.?([^\.]*?)\.(gl|com|net|org|biz|ws|in|me|co\.uk|co|org\.uk|ltd\.uk|plc\.uk|me\.uk|edu|mil|br\.com|cn\.com|eu\.com|hu\.com|no\.com|qc\.com|sa\.com|se\.com|se\.net|us\.com|uy\.com|ac|co\.ac|gv\.ac|or\.ac|ac\.ac|af|am|as|at|ac\.at|co\.at|gv\.at|or\.at|asn\.au|com\.au|edu\.au|org\.au|net\.au|id\.au|be|ac\.be|adm\.br|adv\.br|am\.br|arq\.br|art\.br|bio\.br|cng\.br|cnt\.br|com\.br|ecn\.br|eng\.br|esp\.br|etc\.br|eti\.br|fm\.br|fot\.br|fst\.br|g12\.br|gov\.br|ind\.br|inf\.br|jor\.br|lel\.br|med\.br|mil\.br|net\.br|nom\.br|ntr\.br|odo\.br|org\.br|ppg\.br|pro\.br|psc\.br|psi\.br|rec\.br|slg\.br|tmp\.br|tur\.br|tv\.br|vet\.br|zlg\.br|br|ab\.ca|bc\.ca|mb\.ca|nb\.ca|nf\.ca|ns\.ca|nt\.ca|on\.ca|pe\.ca|qc\.ca|sk\.ca|yk\.ca|ca|cc|ac\.cn|com\.cn|edu\.cn|gov\.cn|org\.cn|bj\.cn|sh\.cn|tj\.cn|cq\.cn|he\.cn|nm\.cn|ln\.cn|jl\.cn|hl\.cn|js\.cn|zj\.cn|ah\.cn|gd\.cn|gx\.cn|hi\.cn|sc\.cn|gz\.cn|yn\.cn|xz\.cn|sn\.cn|gs\.cn|qh\.cn|nx\.cn|xj\.cn|tw\.cn|hk\.cn|mo\.cn|cn|cx|cz|de|dk|fo|com\.ec|tm\.fr|com\.fr|asso\.fr|presse\.fr|fr|gf|gs|co\.il|net\.il|ac\.il|k12\.il|gov\.il|muni\.il|ac\.in|co\.in|org\.in|ernet\.in|gov\.in|net\.in|res\.in|is|it|ac\.jp|co\.jp|go\.jp|or\.jp|ne\.jp|ac\.kr|co\.kr|go\.kr|ne\.kr|nm\.kr|or\.kr|li|lt|lu|asso\.mc|tm\.mc|com\.mm|org\.mm|net\.mm|edu\.mm|gov\.mm|ms|nl|no|nu|pl|ro|org\.ro|store\.ro|tm\.ro|firm\.ro|www\.ro|arts\.ro|rec\.ro|info\.ro|nom\.ro|nt\.ro|se|si|com\.sg|org\.sg|net\.sg|gov\.sg|sk|st|tf|ac\.th|co\.th|go\.th|mi\.th|net\.th|or\.th|tm|to|com\.tr|edu\.tr|gov\.tr|k12\.tr|net\.tr|org\.tr|com\.tw|org\.tw|net\.tw|ac\.uk|uk\.com|uk\.net|gb\.com|gb\.net|vg|sh|kz|ch|info|ua|gov|name|pro|ie|hk|com\.hk|org\.hk|net\.hk|edu\.hk|us|tk|cd|by|ad|lv|eu\.lv|bz|es|jp|cl|ag|mobi|eu|co\.nz|org\.nz|net\.nz|maori\.nz|iwi\.nz|io|la|md|sc|sg|vc|tw|travel|my|se|tv|pt|com\.pt|edu\.pt|asia|fi|com\.ve|net\.ve|fi|org\.ve|web\.ve|info\.ve|co\.ve|tel|im|gr|ru|net\.ru|org\.ru|hr|com\.hr|ly|xyz)$/);
    }
    function o(r) {
        return decodeURIComponent(r.replace(/\+/g, " "));
    }
    function n(r, c) {
        var t = r.charAt(0), o = c.split(t);
        return t === r ? o : (r = parseInt(r.substring(1), 10), o[r < 0 ? o.length + r : r - 1]);
    }
    function e(r, c) {
        for (var t = r.charAt(0), n = c.split("&"), e = [], a = {}, m = [], i = r.substring(1), s = 0, u = n.length; s < u; s++) if (e = n[s].match(/(.*?)=(.*)/), 
        e || (e = [ n[s], n[s], "" ]), "" !== e[1].replace(/\s/g, "")) {
            if (e[2] = o(e[2] || ""), i === e[1]) return e[2];
            m = e[1].match(/(.*)\[([0-9]+)\]/), m ? (a[m[1]] = a[m[1]] || [], a[m[1]][m[2]] = e[2]) : a[e[1]] = e[2];
        }
        return t === r ? a : a[i];
    }
    var a, m = {};
    if ("tld?" === r) return t();
    if (c = c || window.location.toString(), !r) return c;
    if (r = r.toString(), a = c.match(/^mailto:([^\/].+)/)) m.protocol = "mailto", m.email = a[1]; else {
        if ((a = c.match(/(.*?)\/#\!(.*)/)) && (c = a[1] + a[2]), (a = c.match(/(.*?)#(.*)/)) && (m.hash = a[2], 
        c = a[1]), m.hash && r.match(/^#/)) return e(r, m.hash);
        if ((a = c.match(/(.*?)\?(.*)/)) && (m.query = a[2], c = a[1]), m.query && r.match(/^\?/)) return e(r, m.query);
        if ((a = c.match(/(.*?)\:?\/\/(.*)/)) && (m.protocol = a[1].toLowerCase(), c = a[2]), 
        (a = c.match(/(.*?)(\/.*)/)) && (m.path = a[2], c = a[1]), m.path = (m.path || "").replace(/^([^\/])/, "/$1"), 
        r.match(/^[\-0-9]+$/) && (r = r.replace(/^([^\/])/, "/$1")), r.match(/^\//)) return n(r, m.path.substring(1));
        if (a = n("/-1", m.path.substring(1)), a && (a = a.match(/(.*?)\.([^.]+)$/)) && (m.file = a[0], 
        m.filename = a[1], m.fileext = a[2]), (a = c.match(/(.*)\:([0-9]+)$/)) && (m.port = a[2], 
        c = a[1]), (a = c.match(/(.*?)@(.*)/)) && (m.auth = a[1], c = a[2]), m.auth && (a = m.auth.match(/(.*)\:(.*)/), 
        m.user = a ? a[1] : m.auth, m.pass = a ? a[2] : void 0), m.hostname = c.toLowerCase(), 
        "." === r.charAt(0)) return n(r, m.hostname);
        t() && (a = m.hostname.match(t())) && (m.tld = a[3], m.domain = a[2] ? a[2] + "." + a[3] : void 0, 
        m.sub = a[1] || void 0), m.port = m.port || ("https" === m.protocol ? "443" : "80"), 
        m.protocol = m.protocol || ("443" === m.port ? "https" : "http");
    }
    return r in m ? m[r] : "{}" === r ? m : void 0;
};