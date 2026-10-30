const qr = "2.4.8";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = globalThis, Di = Ut.ShadowRoot && (Ut.ShadyCSS === void 0 || Ut.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Pi = Symbol(), hn = /* @__PURE__ */ new WeakMap();
let Kn = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Pi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Di && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = hn.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && hn.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Vr = (n) => new Kn(typeof n == "string" ? n : n + "", void 0, Pi), T = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, r, s) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + n[s + 1], n[0]);
  return new Kn(t, n, Pi);
}, Zr = (n, e) => {
  if (Di) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), r = Ut.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, n.appendChild(i);
  }
}, pn = Di ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Vr(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Kr, defineProperty: Yr, getOwnPropertyDescriptor: Qr, getOwnPropertyNames: Xr, getOwnPropertySymbols: Jr, getPrototypeOf: es } = Object, ri = globalThis, un = ri.trustedTypes, ts = un ? un.emptyScript : "", is = ri.reactiveElementPolyfillSupport, vt = (n, e) => n, Bt = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? ts : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, Ri = (n, e) => !Kr(n, e), fn = { attribute: !0, type: String, converter: Bt, reflect: !1, useDefault: !1, hasChanged: Ri };
Symbol.metadata ??= Symbol("metadata"), ri.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ke = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = fn) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && Yr(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: r, set: s } = Qr(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: r, set(o) {
      const l = r?.call(this);
      s?.call(this, o), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? fn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(vt("elementProperties"))) return;
    const e = es(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(vt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(vt("properties"))) {
      const t = this.properties, i = [...Xr(t), ...Jr(t)];
      for (const r of i) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, r] of t) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const r = this._$Eu(t, i);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const r of i) t.unshift(pn(r));
    } else e !== void 0 && t.push(pn(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Zr(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    const i = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, i);
    if (r !== void 0 && i.reflect === !0) {
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : Bt).toAttribute(t, i.type);
      this._$Em = e, s == null ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const s = i.getPropertyOptions(r), o = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Bt;
      this._$Em = r;
      const l = o.fromAttribute(t, s.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, r = !1, s) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (s = this[e]), i ??= o.getPropertyOptions(e), !((i.hasChanged ?? Ri)(s, t) || i.useDefault && i.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: r, wrapped: s }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), s !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, s] of this._$Ep) this[r] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, s] of i) {
        const { wrapped: o } = s, l = this[r];
        o !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, s, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Ke.elementStyles = [], Ke.shadowRootOptions = { mode: "open" }, Ke[vt("elementProperties")] = /* @__PURE__ */ new Map(), Ke[vt("finalized")] = /* @__PURE__ */ new Map(), is?.({ ReactiveElement: Ke }), (ri.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fi = globalThis, gn = (n) => n, jt = Fi.trustedTypes, mn = jt ? jt.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Yn = "$lit$", be = `lit$${Math.random().toFixed(9).slice(2)}$`, Qn = "?" + be, ns = `<${Qn}>`, Ge = document, Ct = () => Ge.createComment(""), At = (n) => n === null || typeof n != "object" && typeof n != "function", Gi = Array.isArray, rs = (n) => Gi(n) || typeof n?.[Symbol.iterator] == "function", xi = `[ 	
\f\r]`, _t = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yn = /-->/g, _n = />/g, De = RegExp(`>|${xi}(?:([^\\s"'>=/]+)(${xi}*=${xi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), bn = /'/g, wn = /"/g, Xn = /^(?:script|style|textarea|title)$/i, Jn = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), c = Jn(1), w = Jn(2), Xe = Symbol.for("lit-noChange"), G = Symbol.for("lit-nothing"), xn = /* @__PURE__ */ new WeakMap(), Re = Ge.createTreeWalker(Ge, 129);
function er(n, e) {
  if (!Gi(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return mn !== void 0 ? mn.createHTML(e) : e;
}
const ss = (n, e) => {
  const t = n.length - 1, i = [];
  let r, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = _t;
  for (let l = 0; l < t; l++) {
    const a = n[l];
    let h, d, p = -1, f = 0;
    for (; f < a.length && (o.lastIndex = f, d = o.exec(a), d !== null); ) f = o.lastIndex, o === _t ? d[1] === "!--" ? o = yn : d[1] !== void 0 ? o = _n : d[2] !== void 0 ? (Xn.test(d[2]) && (r = RegExp("</" + d[2], "g")), o = De) : d[3] !== void 0 && (o = De) : o === De ? d[0] === ">" ? (o = r ?? _t, p = -1) : d[1] === void 0 ? p = -2 : (p = o.lastIndex - d[2].length, h = d[1], o = d[3] === void 0 ? De : d[3] === '"' ? wn : bn) : o === wn || o === bn ? o = De : o === yn || o === _n ? o = _t : (o = De, r = void 0);
    const g = o === De && n[l + 1].startsWith("/>") ? " " : "";
    s += o === _t ? a + ns : p >= 0 ? (i.push(h), a.slice(0, p) + Yn + a.slice(p) + be + g) : a + be + (p === -2 ? l : g);
  }
  return [er(n, s + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
let Mi = class tr {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let s = 0, o = 0;
    const l = e.length - 1, a = this.parts, [h, d] = ss(e, t);
    if (this.el = tr.createElement(h, i), Re.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (r = Re.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const p of r.getAttributeNames()) if (p.endsWith(Yn)) {
          const f = d[o++], g = r.getAttribute(p).split(be), b = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: s, name: b[2], strings: g, ctor: b[1] === "." ? as : b[1] === "?" ? ls : b[1] === "@" ? cs : si }), r.removeAttribute(p);
        } else p.startsWith(be) && (a.push({ type: 6, index: s }), r.removeAttribute(p));
        if (Xn.test(r.tagName)) {
          const p = r.textContent.split(be), f = p.length - 1;
          if (f > 0) {
            r.textContent = jt ? jt.emptyScript : "";
            for (let g = 0; g < f; g++) r.append(p[g], Ct()), Re.nextNode(), a.push({ type: 2, index: ++s });
            r.append(p[f], Ct());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Qn) a.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = r.data.indexOf(be, p + 1)) !== -1; ) a.push({ type: 7, index: s }), p += be.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const i = Ge.createElement("template");
    return i.innerHTML = e, i;
  }
};
function Je(n, e, t = n, i) {
  if (e === Xe) return e;
  let r = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const s = At(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== s && (r?._$AO?.(!1), s === void 0 ? r = void 0 : (r = new s(n), r._$AT(n, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = r : t._$Cl = r), r !== void 0 && (e = Je(n, r._$AS(n, e.values), r, i)), e;
}
let os = class {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: i } = this._$AD, r = (e?.creationScope ?? Ge).importNode(t, !0);
    Re.currentNode = r;
    let s = Re.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let h;
        a.type === 2 ? h = new Wi(s, s.nextSibling, this, e) : a.type === 1 ? h = new a.ctor(s, a.name, a.strings, this, e) : a.type === 6 && (h = new ds(s, this, e)), this._$AV.push(h), a = i[++l];
      }
      o !== a?.index && (s = Re.nextNode(), o++);
    }
    return Re.currentNode = Ge, r;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}, Wi = class ir {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, r) {
    this.type = 2, this._$AH = G, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = Je(this, e, t), At(e) ? e === G || e == null || e === "" ? (this._$AH !== G && this._$AR(), this._$AH = G) : e !== this._$AH && e !== Xe && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : rs(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== G && At(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Ge.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Mi.createElement(er(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const s = new os(r, this), o = s.u(this.options);
      s.p(t), this.T(o), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = xn.get(e.strings);
    return t === void 0 && xn.set(e.strings, t = new Mi(e)), t;
  }
  k(e) {
    Gi(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const s of e) r === t.length ? t.push(i = new ir(this.O(Ct()), this.O(Ct()), this, this.options)) : i = t[r], i._$AI(s), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = gn(e).nextSibling;
      gn(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}, si = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, r, s) {
    this.type = 1, this._$AH = G, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = G;
  }
  _$AI(e, t = this, i, r) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) e = Je(this, e, t, 0), o = !At(e) || e !== this._$AH && e !== Xe, o && (this._$AH = e);
    else {
      const l = e;
      let a, h;
      for (e = s[0], a = 0; a < s.length - 1; a++) h = Je(this, l[i + a], t, a), h === Xe && (h = this._$AH[a]), o ||= !At(h) || h !== this._$AH[a], h === G ? e = G : e !== G && (e += (h ?? "") + s[a + 1]), this._$AH[a] = h;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === G ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}, as = class extends si {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === G ? void 0 : e;
  }
}, ls = class extends si {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== G);
  }
}, cs = class extends si {
  constructor(e, t, i, r, s) {
    super(e, t, i, r, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Je(this, e, t, 0) ?? G) === Xe) return;
    const i = this._$AH, r = e === G && i !== G || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== G && (i === G || r);
    r && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}, ds = class {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Je(this, e);
  }
};
const hs = Fi.litHtmlPolyfillSupport;
hs?.(Mi, Wi), (Fi.litHtmlVersions ??= []).push("3.3.3");
const ps = (n, e, t) => {
  const i = t?.renderBefore ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const s = t?.renderBefore ?? null;
    i._$litPart$ = r = new Wi(e.insertBefore(Ct(), s), s, void 0, t ?? {});
  }
  return r._$AI(n), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ui = globalThis;
let N = class extends Ke {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ps(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Xe;
  }
};
N._$litElement$ = !0, N.finalized = !0, Ui.litElementHydrateSupport?.({ LitElement: N });
const us = Ui.litElementPolyfillSupport;
us?.({ LitElement: N });
(Ui.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = (n) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(n, e);
  }) : customElements.define(n, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fs = { attribute: !0, type: String, converter: Bt, reflect: !1, hasChanged: Ri }, gs = (n = fs, e, t) => {
  const { kind: i, metadata: r } = t;
  let s = globalThis.litPropertyMetadata.get(r);
  if (s === void 0 && globalThis.litPropertyMetadata.set(r, s = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), s.set(t.name, n), i === "accessor") {
    const { name: o } = t;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(o, a, n, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, n, l), l;
    } };
  }
  if (i === "setter") {
    const { name: o } = t;
    return function(l) {
      const a = this[o];
      e.call(this, l), this.requestUpdate(o, a, n, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function m(n) {
  return (e, t) => typeof t == "object" ? gs(n, e, t) : ((i, r, s) => {
    const o = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, i), o ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(n, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Z(n) {
  return m({ ...n, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ms = (n, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(n, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ys(n, e) {
  return (t, i, r) => {
    const s = (o) => o.renderRoot?.querySelector(n) ?? null;
    return ms(t, i, { get() {
      return s(this);
    } });
  };
}
var _s = Object.defineProperty, bs = Object.getOwnPropertyDescriptor, re = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? bs(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && _s(e, t, r), r;
};
let Y = class extends N {
  constructor() {
    super(...arguments), this.forecast = [], this.forecastLoading = !1, this.show_forecast = !0, this.config = {}, this.compact = !1, this.startTomorrow = !1, this.maxDays = 7, this.alignRight = !1;
  }
  render() {
    const n = /* @__PURE__ */ new Date();
    n.setHours(0, 0, 0, 0);
    let e = Array.isArray(this.forecast) ? [...this.forecast] : [];
    this.startTomorrow && e.length > 0 && (e = e.filter((r) => {
      try {
        const s = new Date(r.datetime ?? r.date ?? "");
        return isNaN(s.getTime()) ? !0 : (s.setHours(0, 0, 0, 0), s.getTime() > n.getTime());
      } catch {
        return !0;
      }
    })), typeof this.maxDays == "number" && this.maxDays > 0 && (e = e.slice(0, this.maxDays));
    const t = ["forecast-section", this.compact ? "compact" : ""].filter(Boolean).join(" "), i = ["forecast-grid", this.compact ? "compact" : ""].filter(Boolean).join(" ");
    return this.config.show_forecast !== !1 ? this.forecastLoading && this.forecast.length === 0 ? c`
            <div class="${t}">
              <div class="section-title">
                <ha-icon icon="mdi:calendar"></ha-icon>
                ${this._t("hourly_charts.7d_forecast")}
                <small
                  style="font-size: 12px; color: var(--secondary-text-color, #666); margin-left: 10px;"
                  >${this._t("hourly_charts.loading")}</small
                >
              </div>
              <div
                style="text-align: center; padding: 20px; color: var(--secondary-text-color, #666); font-style: italic;"
              >
                ⏳ ${this._t("hourly_charts.loading_forecast")}<br />
                <small>Service: weather.get_forecasts</small>
              </div>
            </div>
          ` : e.length > 0 ? c`
              <div class="wrapper ${this.alignRight ? "align-right" : ""}">
                <div class="${t}">
                  ${this.compact ? c`` : c`
                          <div class="section-title">
                            <ha-icon icon="mdi:calendar"></ha-icon>
                            ${e.length === 7 ? this._t("hourly_charts.7d_forecast") : this._t("hourly_charts.xd_forecast", { days: e.length })}
                            <small
                              style="font-size: 12px; color: var(--secondary-text-color, #666); margin-left: 10px;"
                            >
                              (${e.length} ${this._t("hourly_charts.days_available")})
                            </small>
                          </div>
                        `}
                  <div class="${i}">
                    ${e.map(
      (r) => c`
                        <div class="forecast-day ${this.compact ? "compact" : ""}">
                          <div class="forecast-date ${this.compact ? "compact" : ""}">
                            ${this.formatDate(r.datetime ?? r.date)}
                          </div>
                          <div class="forecast-icon ${this.compact ? "compact" : ""}">
                            ${this.getWeatherIcon(
        r.condition,
        this.config.enable_animate_weather_icons ? "animated" : "mdi",
        this.compact ? "20px" : "24px",
        !0
      )}
                          </div>
                          <div class="forecast-temps ${this.compact ? "compact" : ""}">
                            <span class="temp-high">${Math.round(r.temperature)}°</span>
                            <span class="temp-low"
                              >${Math.round(
        r.templow ?? r.temperature - 5
      )}°</span
                            >
                          </div>
                        </div>
                      `
    )}
                  </div>
                </div>
              </div>
            ` : c`
              <div class="${t}">
                <div class="section-title">
                  <ha-icon icon="mdi:calendar"></ha-icon>
                  ${this._t("hourly_charts.7d_forecast")}
                  <small style="font-size: 12px; color: #666; margin-left: 10px;">
                    (0 ${this._t("hourly_charts.days_available")})
                  </small>
                </div>
                <div style="text-align: center; padding: 20px; color: #666; font-style: italic;">
                  ⚠️ ${this._t("hourly_charts.no_forecast_data")}<br />
                  <small>Entity: ${this.config.entity}</small><br />
                  <small>${this._t("hourly_charts.check_devtools")}</small><br />
                  <small style="color: #999;">${this._t("hourly_charts.try_other_entity")}</small>
                </div>
              </div>
            ` : c``;
  }
};
Y.styles = T`
    .wrapper {
      display: block;
      width: 100%;
    }
    .wrapper.align-right {
      display: flex;
      justify-content: flex-end;
    }

    .forecast-section {
      margin-top: 20px;
    }
    .forecast-section.compact {
      margin-top: 8px;
      padding: 0;
    }

    .section-title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      color: var(--primary-text-color, #fff);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-title ha-icon {
      color: var(--primary-text-color, #fff);
      font-size: 20px;
    }

    .forecast-7days {
      background: var(--code-editor-background-color, #f8f8f8);
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      margin-bottom: 8px;
    }

    .forecast-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 10px;
    }
    .forecast-grid.compact {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-end;
      align-items: stretch;
      gap: 8px;
      overflow: hidden; /* keep within BG card */
      padding: 0;
      margin: 0;
    }

    .forecast-day {
      background: var(--card-background-color, rgba(255, 255, 255, 0.6));
      border-radius: 10px;
      padding: 12px 8px;
      text-align: center;
      border: 1px solid var(--border-color, rgba(220, 20, 60, 0.1));
    }
    .forecast-day.compact {
      border-radius: 8px;
      padding: 8px 6px;
      width: 64px;
      min-width: 64px;
      box-sizing: border-box;
    }

    .forecast-date {
      font-size: 12px;
      color: var(--secondary-text-color, #7f8c8d);
      margin-bottom: 8px;
    }
    .forecast-date.compact {
      font-size: 10px;
      margin-bottom: 4px;
    }

    .forecast-icon {
      font-size: 24px;
      margin: 8px 0;
    }
    .forecast-icon.compact {
      font-size: 18px;
      margin: 4px 0;
    }

    .forecast-temps {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
    .forecast-temps.compact {
      font-size: 11px;
    }

    .temp-high {
      font-weight: bold;
      color: var(--material-error-text-color, #e74c3c);
    }

    .temp-low {
      color: var(--secondary-text-color, #00aaff);
    }
    @media (max-width: 768px) {
      .forecast-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* Extra compact on very small screens to keep margins */
    @media (max-width: 400px) {
      .forecast-grid.compact {
        gap: 6px;
      }
      .forecast-day.compact {
        width: 56px;
        min-width: 56px;
      }
      .forecast-icon.compact {
        font-size: 16px;
      }
      .forecast-temps.compact {
        font-size: 10px;
      }
    }
  `;
re([
  m({ type: Array })
], Y.prototype, "forecast", 2);
re([
  m({ type: Boolean })
], Y.prototype, "forecastLoading", 2);
re([
  m({ type: Boolean })
], Y.prototype, "show_forecast", 2);
re([
  m({ type: Object })
], Y.prototype, "config", 2);
re([
  m({ type: Function })
], Y.prototype, "_t", 2);
re([
  m({ type: Function })
], Y.prototype, "getWeatherIcon", 2);
re([
  m({ type: Function })
], Y.prototype, "formatDate", 2);
re([
  m({ type: Boolean })
], Y.prototype, "compact", 2);
re([
  m({ type: Boolean })
], Y.prototype, "startTomorrow", 2);
re([
  m({ type: Number })
], Y.prototype, "maxDays", 2);
re([
  m({ type: Boolean })
], Y.prototype, "alignRight", 2);
Y = re([
  O("daily-forecast-chart")
], Y);
var ws = Object.defineProperty, xs = Object.getOwnPropertyDescriptor, dt = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? xs(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && ws(e, t, r), r;
};
let ke = class extends N {
  constructor() {
    super(...arguments), this.hourlyForecast = [], this.forecastHours = 12, this.show_temperature = !0, this._measuredWidth = 0, this._measuredHeight = 0;
  }
  firstUpdated() {
    const n = this.renderRoot.querySelector(".chart-svg-area");
    n && (this._resizeObserver = new ResizeObserver((e) => {
      let t = !1;
      for (const i of e) {
        const r = Math.floor(i.contentRect.width), s = Math.floor(i.contentRect.height);
        r > 0 && r !== this._measuredWidth && (this._measuredWidth = r, t = !0), s > 0 && s !== this._measuredHeight && (this._measuredHeight = s, t = !0);
      }
      t && this.requestUpdate();
    }), this._resizeObserver.observe(n));
  }
  disconnectedCallback() {
    this._resizeObserver?.disconnect(), this._resizeObserver = void 0, super.disconnectedCallback();
  }
  render() {
    if (this.show_temperature === !1) return c``;
    const e = this.hourlyForecast.slice(0, this.forecastHours).map(
      (i) => typeof i.temperature == "number" && !isNaN(i.temperature) ? i.temperature : null
    ), t = e.filter((i) => i !== null);
    return c`
      <div class="chart">
        <div class="section-title">
          <ha-icon icon="mdi:thermometer"></ha-icon>
          ${this._t("hourly_charts.temperature_hours", { hours: this.forecastHours })}
          <span style="font-size:12px; font-weight:normal; color:var(--secondary-text-color, #888);"
            >°C</span
          >
        </div>
        <div class="chart-svg-area">
          ${(() => {
      if (t.length < 2) return c``;
      const i = e.length, r = this._measuredWidth > 0 ? this._measuredWidth : 600, s = this._measuredHeight > 0 ? this._measuredHeight : 100, o = 28, l = 6, a = 8, h = 18, d = r - o - l, p = s - a - h;
      let f = Math.floor(Math.min(...t) / 5) * 5, g = Math.ceil(Math.max(...t) / 5) * 5;
      f === g && (f -= 5, g += 5);
      const b = g - f, k = d / (i - 1), x = (C) => o + C * k, L = (C) => a + p - (C - f) / b * p, P = [];
      for (let C = f; C <= g; C += 5) {
        const v = L(C), M = C % 10 === 0;
        P.push(w`
                <line x1="${o}" y1="${v}" x2="${r - l}" y2="${v}"
                  stroke="#888" stroke-width="${M ? 1 : 0.6}"
                  stroke-dasharray="${M ? "4,3" : "2,3"}" opacity="0.6"/>
                <text x="${o - 3}" y="${v}" text-anchor="end" dominant-baseline="middle"
                  font-size="8" fill="#888" opacity="0.8">${C}°</text>
              `);
      }
      const H = [];
      for (let C = 0; C < i; C++) {
        const v = x(C), M = this.hourlyForecast[C], D = M?.datetime ? new Date(M.datetime) : null;
        ((D ? D.getHours() % 3 === 0 : !1) || i <= 8) && H.push(w`
                  <line x1="${v}" y1="${a}" x2="${v}" y2="${a + p}"
                    stroke="#888" stroke-width="0.4" stroke-dasharray="2,3" opacity="0.3"/>
                  <text x="${v}" y="${s - 2}" text-anchor="middle"
                    font-size="8" fill="#888" opacity="0.7">
                    ${D ? D.getHours() + "h" : ""}
                  </text>
                `);
      }
      const B = e.map((C, v) => C !== null ? `${x(v)},${L(C)}` : "").filter(Boolean).join(" "), j = e.map(
        (C, v) => C !== null ? w`<circle cx="${x(v)}" cy="${L(C)}" r="2.5" fill="#db4a34"/>` : null
      );
      return w`<svg width="100%" height="100%" viewBox="0 0 ${r} ${s}" style="display:block;">
              <defs>
                <filter id="hourly-temp-shadow" x="-5%" y="-10%" width="110%" height="120%">
                  <feDropShadow dx="0" dy="1" stdDeviation="1.2" flood-color="#000000" flood-opacity="0.4"/>
                </filter>
              </defs>
              <g filter="url(#hourly-temp-shadow)">
              ${P}
              ${H}
              <polyline points="${B}" fill="none" stroke="#db4a34" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round"/>
              ${j}
              </g>
            </svg>`;
    })()}
        </div>
      </div>
    `;
  }
};
ke.styles = T`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
    }

    .section-title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      color: var(--primary-text-color, #fff);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-title ha-icon {
      color: var(--primary-text-color, #fff);
      font-size: 20px;
    }
    .chart {
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      padding: var(--chart-padding, 15px);
      margin-top: var(--chart-margin-top, 15px);
      margin-bottom: var(--chart-margin-bottom, 0);
      border: var(--chart-inner-border, 1px solid var(--border-color, rgba(220, 20, 60, 0.1)));
      width: 100%;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .chart-svg-area {
      width: 100%;
      overflow: hidden;
      border-radius: 4px;
      flex: 1;
      min-height: 100px;
    }
  `;
dt([
  m({ type: Array })
], ke.prototype, "hourlyForecast", 2);
dt([
  m({ type: Number })
], ke.prototype, "forecastHours", 2);
dt([
  m({ type: Boolean })
], ke.prototype, "show_temperature", 2);
dt([
  m({ type: Function })
], ke.prototype, "_t", 2);
dt([
  m({ type: Function })
], ke.prototype, "showHoursChartLabel", 2);
ke = dt([
  O("forecast-temperature-chart")
], ke);
var vs = Object.defineProperty, $s = Object.getOwnPropertyDescriptor, ht = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? $s(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && vs(e, t, r), r;
};
let Ce = class extends N {
  constructor() {
    super(...arguments), this.hourlyForecast = [], this.forecastHours = 12, this.show_precipitation = !0, this._measuredWidth = 0, this._measuredHeight = 0;
  }
  firstUpdated() {
    const n = this.renderRoot.querySelector(".chart-svg-area");
    n && (this._resizeObserver = new ResizeObserver((e) => {
      let t = !1;
      for (const i of e) {
        const r = Math.floor(i.contentRect.width), s = Math.floor(i.contentRect.height);
        r > 0 && r !== this._measuredWidth && (this._measuredWidth = r, t = !0), s > 0 && s !== this._measuredHeight && (this._measuredHeight = s, t = !0);
      }
      t && this.requestUpdate();
    }), this._resizeObserver.observe(n));
  }
  disconnectedCallback() {
    this._resizeObserver?.disconnect(), this._resizeObserver = void 0, super.disconnectedCallback();
  }
  render() {
    if (this.show_precipitation === !1) return c``;
    const n = this.hourlyForecast.slice(0, this.forecastHours), e = n.some((t) => typeof t.precipitation == "number" && !isNaN(t.precipitation));
    return this.hourlyForecast.length === 0 || !e ? c`
        <div class="chart">
          <div class="section-title">
            <ha-icon icon="mdi:weather-pouring"></ha-icon>
            ${this._t("hourly_charts.precipitation_hours", { hours: this.forecastHours })}
          </div>
          <div style="text-align:center; color:#888; padding:16px; font-size:14px;">
            ${this._t("hourly_charts.no_precipitation_data")}
          </div>
        </div>
      ` : c`
      <div class="chart">
        <div class="section-title">
          <ha-icon icon="mdi:weather-pouring"></ha-icon>
          ${this._t("hourly_charts.precipitation_hours", { hours: this.forecastHours })}
          <span style="font-size:12px; font-weight:normal; color:var(--secondary-text-color, #888);"
            >mm</span
          >
        </div>
        <div class="chart-svg-area">
          ${(() => {
      const t = n.length;
      if (t === 0) return c``;
      const i = this._measuredWidth > 0 ? this._measuredWidth : 600, r = this._measuredHeight > 0 ? this._measuredHeight : 100, s = 28, o = 6, l = 8, a = 18, h = i - s - o, d = r - l - a, p = n.map(
        (v) => typeof v.precipitation == "number" && !isNaN(v.precipitation) ? v.precipitation : 0
      ), f = Math.max(5, Math.ceil(Math.max(...p))), g = f, b = (v) => l + d - v / g * d, k = h / t, x = (v) => s + v * k + k / 2, L = [1, 2, 3, 5, 8, 10, 15, 20].filter((v) => v <= f);
      L.includes(f) || L.push(f);
      const P = [];
      for (const v of L) {
        const M = b(v), D = v % 5 === 0;
        P.push(w`
                <line x1="${s}" y1="${M}" x2="${i - o}" y2="${M}"
                  stroke="#888" stroke-width="${D ? 1 : 0.6}"
                  stroke-dasharray="${D ? "4,3" : "2,3"}" opacity="0.6"/>
                <text x="${s - 3}" y="${M}" text-anchor="end" dominant-baseline="middle"
                  font-size="8" fill="#888" opacity="0.8">${v}</text>
              `);
      }
      P.push(w`
              <line x1="${s}" y1="${b(0)}" x2="${i - o}" y2="${b(0)}"
                stroke="#888" stroke-width="1" opacity="0.5"/>
              <text x="${s - 3}" y="${b(0)}" text-anchor="end" dominant-baseline="middle"
                font-size="8" fill="#888" opacity="0.8">0</text>
            `);
      const H = [];
      for (let v = 0; v < t; v++) {
        const M = x(v), D = n[v]?.datetime ? new Date(n[v].datetime) : null;
        (D ? D.getHours() % 3 === 0 : t <= 8) && H.push(w`
                  <line x1="${M}" y1="${l}" x2="${M}" y2="${l + d}"
                    stroke="#888" stroke-width="0.4" stroke-dasharray="2,3" opacity="0.3"/>
                  <text x="${M}" y="${r - 2}" text-anchor="middle"
                    font-size="8" fill="#888" opacity="0.7">
                    ${D ? D.getHours() + "h" : ""}
                  </text>
                `);
      }
      const B = [], j = [], C = Math.max(2, k * 0.55);
      for (let v = 0; v < t; v++) {
        const M = n[v], D = x(v) - C / 2, $ = typeof M.precipitation_probability == "number" && !isNaN(M.precipitation_probability) ? M.precipitation_probability : 0, F = typeof M.precipitation == "number" && !isNaN(M.precipitation) ? M.precipitation : 0, Q = $ / 100 * 5 / g * d;
        if ($ > 0 && B.push(w`
                  <rect x="${D}" y="${b(0) - Q}" width="${C}" height="${Q}"
                    fill="#87898e" opacity="0.35" rx="1.5"/>
                `), F > 0) {
          const ye = F / g * d;
          j.push(w`
                  <rect x="${D}" y="${b(0) - ye}" width="${C}" height="${ye}"
                    fill="url(#precip-grad)" opacity="1" rx="1.5"/>
                `);
        }
      }
      return w`<svg width="100%" height="100%" viewBox="0 0 ${i} ${r}" style="display:block;">
              <defs>
                <linearGradient id="precip-grad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stop-color="#3498db"/>
                  <stop offset="100%" stop-color="#85c5e5"/>
                </linearGradient>
              </defs>
              ${P}
              ${H}
              ${B}
              ${j}
            </svg>`;
    })()}
        </div>
      </div>
    `;
  }
};
Ce.styles = T`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
    }

    .section-title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      color: var(--primary-text-color, #fff);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-title ha-icon {
      color: var(--primary-text-color, #fff);
      font-size: 20px;
    }
    .chart {
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      padding: var(--chart-padding, 15px);
      margin-top: var(--chart-margin-top, 15px);
      margin-bottom: var(--chart-margin-bottom, 0);
      border: var(--chart-inner-border, 1px solid var(--border-color, rgba(220, 20, 60, 0.1)));
      width: 100%;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .chart-svg-area {
      width: 100%;
      overflow: hidden;
      border-radius: 4px;
      flex: 1;
      min-height: 100px;
    }
  `;
ht([
  m({ type: Array })
], Ce.prototype, "hourlyForecast", 2);
ht([
  m({ type: Number })
], Ce.prototype, "forecastHours", 2);
ht([
  m({ type: Boolean })
], Ce.prototype, "show_precipitation", 2);
ht([
  m({ type: Function })
], Ce.prototype, "_t", 2);
ht([
  m({ type: Function })
], Ce.prototype, "showHoursChartLabel", 2);
Ce = ht([
  O("precipitation-chart")
], Ce);
var ks = Object.defineProperty, Cs = Object.getOwnPropertyDescriptor, Le = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? Cs(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && ks(e, t, r), r;
};
let le = class extends N {
  constructor() {
    super(...arguments), this.hourlyForecast = [], this.forecastHours = 12, this.show_sunshine = !0;
  }
  render() {
    return this.show_sunshine !== !1 ? this.hourlyForecast.length > 0 && this.hourlyForecast.slice(0, this.forecastHours).some((n) => {
      const e = n;
      return typeof e.sunshine == "number" && !isNaN(e.sunshine) || typeof e.sunshine_duration == "number" && !isNaN(e.sunshine_duration);
    }) ? c`
            <div class="chart-sunshine" style="position:relative;">
              <div class="section-title">
                <ha-icon icon="mdi:white-balance-sunny"></ha-icon>
                ${this._t("hourly_charts.sunshine_hours", { hours: this.forecastHours })}
                <span
                  style="font-size:12px; font-weight:normal; color:var(--secondary-text-color, #888);"
                  >min</span
                >
              </div>
              <div class="chart-bars" style="position:relative;">
                ${(() => {
      const n = this.weatherEntity?.attributes?.sunrise ? new Date(this.weatherEntity.attributes.sunrise) : this.sun_entity?.attributes?.next_rising ? new Date((this.sun_entity?.attributes).next_rising) : null, e = this.weatherEntity?.attributes?.sunset ? new Date(this.weatherEntity.attributes.sunset) : this.sun_entity?.attributes?.next_setting ? new Date((this.sun_entity?.attributes).next_setting) : null, t = this.hourlyForecast[0]?.datetime ? new Date(this.hourlyForecast[0].datetime) : null;
      let i = -1, r = -1;
      return n && t && (i = Math.round(
        (n.getTime() - t.getTime()) / (3600 * 1e3)
      )), e && t && (r = Math.round(
        (e.getTime() - t.getTime()) / (3600 * 1e3)
      )), c`
                    ${i >= 0 && i < this.forecastHours ? c`
                            <div
                              style="position:absolute;left:calc(${i / this.forecastHours * 100}% - 10px);top:0;height:100%;width:20px;pointer-events:none;z-index:2;display:flex;flex-direction:column;align-items:center;"
                            >
                              <ha-icon
                                icon="mdi:weather-sunset-up"
                                style="color:#fbc02d;font-size:18px;"
                              ></ha-icon>
                              <span style="font-size:10px;color:#fbc02d">
                                ${n ? n.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }) : ""}</span
                              >
                            </div>
                          ` : ""}
                    ${r >= 0 && r < this.forecastHours ? c`
                            <div
                              style="position:absolute;left:calc(${r / this.forecastHours * 100}% - 10px);top:0;height:100%;width:20px;pointer-events:none;z-index:2;display:flex;flex-direction:column;align-items:center;"
                            >
                              <ha-icon
                                icon="mdi:weather-sunset-down"
                                style="color:#fbc02d;font-size:18px;"
                              ></ha-icon>
                              <span style="font-size:10px;color:#fbc02d;">
                                ${e ? e.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }) : ""}</span
                              >
                            </div>
                          ` : ""}
                  `;
    })()}
                ${this.hourlyForecast.slice(0, this.forecastHours).map((n) => {
      const e = n, t = typeof e.sunshine == "number" && !isNaN(e.sunshine) ? e.sunshine : typeof e.sunshine_duration == "number" && !isNaN(e.sunshine_duration) ? e.sunshine_duration : null, i = t !== null ? Math.round(t) : 2;
      return c`
                    <div
                      style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end;"
                    >
                      <span
                        style="font-size:11px; color:#fbc02d; margin-bottom:2px; min-height:16px; font-variant-numeric:tabular-nums;"
                      >
                        ${t !== null ? t.toFixed(0) : ""}
                      </span>
                      <div class="chart-bar-sunshine" style="height: ${i}px;"></div>
                    </div>
                  `;
    })}
              </div>
              <div
                style="display:flex; justify-content:space-between; font-size:11px; color:var(--secondary-text-color, #888); margin-top:4px;"
              >
                ${this.hourlyForecast.slice(0, this.forecastHours).map((n) => {
      const e = n.datetime ? new Date(n.datetime) : null, t = e ? e.getHours() % 3 === 0 : !1;
      return c`<div style="flex:1; text-align:center; overflow:hidden;">
                    ${t && e ? e.getHours() + "h" : ""}
                  </div>`;
    })}
              </div>
            </div>
          ` : c`
            <div class="chart">
              <div class="section-title">
                <ha-icon icon="mdi:white-balance-sunny"></ha-icon>
                ${this._t("hourly_charts.sunshine_hours", { hours: this.forecastHours })}
              </div>
              <div style="text-align:center; color:#888; padding:16px; font-size:14px;">
                ${this._t("hourly_charts.no_sunshine_data")}
              </div>
            </div>
          ` : c``;
  }
};
le.styles = T`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
    }

    .chart {
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      padding: var(--chart-padding, 15px);
      margin-top: var(--chart-margin-top, 15px);
      margin-bottom: var(--chart-margin-bottom, 0);
      border: var(--chart-inner-border, 1px solid var(--border-color, rgba(220, 20, 60, 0.1)));
      width: 100%;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .chart-sunshine {
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      padding: var(--chart-padding, 15px);
      margin-top: var(--chart-margin-top, 15px);
      margin-bottom: var(--chart-margin-bottom, 0);
      border: var(--chart-inner-border, 1px solid var(--border-color, rgba(220, 20, 60, 0.1)));
      width: 100%;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .chart-bars {
      display: flex;
      justify-content: space-between;
      height: 80px;
      margin-bottom: 10px;
    }

    .chart-bar-sunshine {
      width: 18px;
      background: linear-gradient(to top, #ffe082, #fbc02d);
      border-radius: 2px 2px 0 0;
      min-height: 2px;
    }

    .chart-line {
      display: flex;
      justify-content: space-between;
      height: 60px;
      margin-bottom: 10px;
    }

    .chart-labels {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: var(--secondary-text-color, #000);
    }

    .section-title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      color: var(--primary-text-color, #fff);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-title ha-icon {
      color: var(--primary-text-color, #fff);
      font-size: 20px;
    }

    .forecast-section {
      margin-top: 20px;
    }

    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: var(--primary-text-color, #fff);
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `;
Le([
  m({ type: Array })
], le.prototype, "hourlyForecast", 2);
Le([
  m({ type: Number })
], le.prototype, "forecastHours", 2);
Le([
  m({ type: Boolean })
], le.prototype, "show_sunshine", 2);
Le([
  m({ type: Object })
], le.prototype, "weatherEntity", 2);
Le([
  m({ type: Object })
], le.prototype, "sun_entity", 2);
Le([
  m({ type: Function })
], le.prototype, "_t", 2);
Le([
  m({ type: Function })
], le.prototype, "showHoursChartLabel", 2);
le = Le([
  O("sunshine-chart")
], le);
var As = Object.defineProperty, Ss = Object.getOwnPropertyDescriptor, pt = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? Ss(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && As(e, t, r), r;
};
let Ae = class extends N {
  constructor() {
    super(...arguments), this.hourlyForecast = [], this.forecastHours = 12, this.show_wind = !0, this._measuredWidth = 0, this._measuredHeight = 0;
  }
  firstUpdated() {
    const n = this.renderRoot.querySelector(".chart-svg-area");
    n && (this._resizeObserver = new ResizeObserver((e) => {
      let t = !1;
      for (const i of e) {
        const r = Math.floor(i.contentRect.width), s = Math.floor(i.contentRect.height);
        r > 0 && r !== this._measuredWidth && (this._measuredWidth = r, t = !0), s > 0 && s !== this._measuredHeight && (this._measuredHeight = s, t = !0);
      }
      t && this.requestUpdate();
    }), this._resizeObserver.observe(n));
  }
  disconnectedCallback() {
    this._resizeObserver?.disconnect(), this._resizeObserver = void 0, super.disconnectedCallback();
  }
  render() {
    if (this.show_wind === !1) return c``;
    const n = this.hourlyForecast.slice(0, this.forecastHours), e = n.some((t) => typeof t.wind_speed == "number" && !isNaN(t.wind_speed));
    return n.length === 0 || !e ? c`` : c`
      <div class="chart">
        <div class="section-title">
          <ha-icon icon="mdi:weather-windy"></ha-icon>
          ${this._t("hourly_charts.wind_hours", { hours: this.forecastHours })}
          <span style="font-size:12px; font-weight:normal; color:var(--secondary-text-color, #888);"
            >km/h</span
          >
        </div>
        <div class="chart-svg-area">
          ${(() => {
      const t = n.length;
      if (t < 2) return c``;
      const i = this._measuredWidth > 0 ? this._measuredWidth : 600, r = 22, s = this._measuredHeight > 0 ? this._measuredHeight : 100 + r, o = 28, l = 6, a = 8, h = 18 + r, d = i - o - l, p = s - a - h, f = n.map(
        ($) => typeof $.wind_speed == "number" && !isNaN($.wind_speed) ? $.wind_speed : null
      ), g = f.filter(($) => $ !== null), b = Math.max(10, Math.ceil(Math.max(...g) / 5) * 5), k = b, x = ($) => a + p - $ / k * p, L = d / (t - 1), P = ($) => o + $ * L, H = [];
      for (let $ = 0; $ <= b; $ += 5) {
        const F = x($), q = $ % 10 === 0;
        H.push(w`
                <line x1="${o}" y1="${F}" x2="${i - l}" y2="${F}"
                  stroke="#888" stroke-width="${q ? 1 : 0.6}"
                  stroke-dasharray="${q ? "4,3" : "2,3"}" opacity="0.6"/>
                <text x="${o - 3}" y="${F}" text-anchor="end" dominant-baseline="middle"
                  font-size="8" fill="#888" opacity="0.8">${$}</text>
              `);
      }
      const B = [];
      for (let $ = 0; $ < t; $++) {
        const F = P($), q = n[$]?.datetime ? new Date(n[$].datetime) : null;
        (q ? q.getHours() % 3 === 0 : t <= 8) && B.push(w`
                  <line x1="${F}" y1="${a}" x2="${F}" y2="${a + p}"
                    stroke="#888" stroke-width="0.4" stroke-dasharray="2,3" opacity="0.3"/>
                  <text x="${F}" y="${s - r - 2}" text-anchor="middle"
                    font-size="8" fill="#888" opacity="0.7">
                    ${q ? q.getHours() + "h" : ""}
                  </text>
                `);
      }
      const j = f.map(($, F) => $ !== null ? `${P(F)},${x($)}` : "").filter(Boolean).join(" "), C = f.map(
        ($, F) => $ !== null ? w`<circle cx="${P(F)}" cy="${x($)}" r="2.5" fill="#44739e"/>` : null
      ), v = s - r / 2 + 2, M = 7, D = n.map(($, F) => {
        const q = typeof $.wind_bearing == "number" && !isNaN($.wind_bearing) ? $.wind_bearing : null;
        if (q === null) return null;
        const Q = P(F), ye = v, Ve = (q - 90) * (Math.PI / 180), mi = Q + M * Math.cos(Ve), ae = ye + M * Math.sin(Ve), Te = Ve + Math.PI, yi = Q + (M - 2) * Math.cos(Te), _i = ye + (M - 2) * Math.sin(Te);
        return w`
                <circle cx="${Q}" cy="${ye}" r="${M}" fill="none" stroke="#44739e" stroke-width="0.8" opacity="0.5"/>
                <line x1="${yi}" y1="${_i}" x2="${mi}" y2="${ae}"
                  stroke="#44739e" stroke-width="1.5" stroke-linecap="round" opacity="0.85"/>
                <circle cx="${mi}" cy="${ae}" r="1.5" fill="#44739e" opacity="0.85"/>
              `;
      });
      return w`<svg width="100%" height="100%" viewBox="0 0 ${i} ${s}" style="display:block;">
              ${H}
              ${B}
              <polyline points="${j}" fill="none" stroke="#44739e" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round"/>
              ${C}
              ${D}
            </svg>`;
    })()}
        </div>
      </div>
    `;
  }
};
Ae.styles = T`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
    }

    .chart {
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      padding: var(--chart-padding, 15px);
      margin-top: var(--chart-margin-top, 15px);
      margin-bottom: var(--chart-margin-bottom, 0);
      border: var(--chart-inner-border, 1px solid var(--border-color, rgba(220, 20, 60, 0.1)));
      width: 100%;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .section-title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      color: var(--primary-text-color, #fff);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-title ha-icon {
      color: var(--primary-text-color, #fff);
      font-size: 20px;
    }
    .chart-svg-area {
      width: 100%;
      overflow: hidden;
      border-radius: 4px;
      flex: 1;
      min-height: 122px;
    }
  `;
pt([
  m({ type: Array })
], Ae.prototype, "hourlyForecast", 2);
pt([
  m({ type: Number })
], Ae.prototype, "forecastHours", 2);
pt([
  m({ type: Boolean })
], Ae.prototype, "show_wind", 2);
pt([
  m({ type: Function })
], Ae.prototype, "_t", 2);
pt([
  m({ type: Function })
], Ae.prototype, "showHoursChartLabel", 2);
Ae = pt([
  O("wind-chart")
], Ae);
var Ms = Object.defineProperty, zs = Object.getOwnPropertyDescriptor, ut = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? zs(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && Ms(e, t, r), r;
};
let Se = class extends N {
  constructor() {
    super(...arguments), this.forecast = [], this.hourlyForecast = [], this.standalone = !1, this._measuredWidth = 0, this._measuredHeight = 0;
  }
  // fallback function to get a CSS variable with a default value
  getCSSVariable(n, e = "50") {
    const t = getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    return Number.parseInt(t || e);
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObserver = new ResizeObserver((n) => {
      for (const e of n) {
        const t = Math.floor(e.contentRect.width), i = Math.floor(e.contentRect.height);
        i > 0 && i !== this._measuredHeight && (this._measuredHeight = i, this.requestUpdate()), t > 0 && t !== this._measuredWidth && (this._measuredWidth = t, this.requestUpdate());
      }
    }), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    this._resizeObserver?.disconnect(), this._resizeObserver = void 0, super.disconnectedCallback();
  }
  render() {
    const n = this.forecast.slice(0, 7), e = this.hourlyForecast.slice(0, n.length * 24);
    if (!e.length) return c`<div>No hourly forecast available</div>`;
    const t = n.length, r = (this.standalone ? this.config.grid_options?.rows || 3 : 2) * 64 - 8, s = this.standalone ? this._measuredHeight > 0 ? this._measuredHeight : r : 200;
    let o = this._measuredWidth;
    if (!o) {
      const y = this.getBoundingClientRect?.();
      o = y?.width ? Math.floor(y.width) : 400;
    }
    const l = o, a = s, h = 16, d = a - h * 2, p = 0, f = 0, g = h + p, b = l - h - f, x = Math.max(0, b - g) / t, H = Math.min(
      120,
      Math.max(80, d * 0.35)
    ), B = Math.max(10, d * 0.05), j = d - H - B, C = Math.min(x * 0.7, H * 0.4), v = Math.max(9, Math.round(H * 0.075)), M = Math.max(11, Math.round(H * 0.11)), D = this.config?.diagram_labels ?? "compact", $ = Math.max(8, Math.min(10, Math.round(j * 0.05))), q = h + 10 + v, Q = q + 10, ye = Q + C + 10, Ve = h + H + B, ae = x / 24, Te = e.map((y) => typeof y.temperature == "number" ? y.temperature : null), yi = Math.min(...Te.filter((y) => y !== null)), _i = Math.max(...Te.filter((y) => y !== null)), _e = Ve, he = Ve + j, Fr = e.map((y) => {
      const _ = y;
      return typeof _.precipitation == "number" ? _.precipitation : typeof _.rain == "number" ? _.rain : 0;
    }), Gr = e.map((y) => {
      const _ = y, A = typeof _.precipitation_probability == "number" ? _.precipitation_probability : typeof _.probability_of_precipitation == "number" ? _.probability_of_precipitation : typeof _.pop == "number" ? _.pop <= 1 ? _.pop * 100 : _.pop : 0, S = Number(A);
      return Number.isFinite(S) ? Math.max(0, Math.min(100, S)) : 0;
    }), nn = {};
    n.forEach((y, _) => {
      const A = new Date(y.datetime), S = `${A.getFullYear()}-${A.getMonth()}-${A.getDate()}`;
      nn[S] = _;
    });
    function Wr(y) {
      const _ = `${y.getFullYear()}-${y.getMonth()}-${y.getDate()}`, A = nn[_], S = y.getHours();
      return {
        dayIdx: A !== void 0 ? A : -1,
        hourInDay: S >= 0 && S < 24 ? S : -1
      };
    }
    const gt = {};
    for (let y = 0; y < t; y++)
      for (let _ = 0; _ < 24; _++) {
        const A = `${y}-${_}`;
        gt[A] = null;
      }
    e.forEach((y, _) => {
      if (y.datetime && Te[_] !== null) {
        const A = new Date(y.datetime), { dayIdx: S, hourInDay: K } = Wr(A), pe = `${S}-${K}`;
        S >= 0 && S < t && K >= 0 && K < 24 && (gt[pe] = {
          temp: Te[_],
          precip: Fr[_],
          precipProb: Gr[_],
          originalIndex: _
        });
      }
    });
    let Oe = Math.floor(yi / 5) * 5, He = Math.ceil(_i / 5) * 5;
    Oe > 0 && (Oe = 0), He < 0 && (He = 0);
    const bi = He - Oe, rn = [], wi = [];
    for (let y = 0; y < t; y++)
      for (let _ = 0; _ < 24; _++) {
        const A = `${y}-${_}`, S = gt[A];
        if (S && S.temp !== null) {
          const K = g + y * x + _ * ae + ae / 2, pe = he - (S.temp - Oe) / bi * (he - _e);
          wi.push(`${K},${pe}`);
        }
      }
    wi.length > 0 && rn.push(
      w`
          <!-- Main temperature line -->
          <polyline points="${wi.join(" ")}" fill="none" stroke="#e74c3c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        `
    );
    const Ze = Math.max(3, Math.floor(ae) - 2), sn = he, on = 5 / bi * (he - _e) / 5;
    function Ur(y) {
      if (y <= 0) return "transparent";
      const _ = [
        { val: 0, color: { r: 89, g: 148, b: 177 } },
        // #5994b1ff
        { val: 5, color: { r: 33, g: 150, b: 243 } },
        // #2196f3
        { val: 10, color: { r: 0, g: 100, b: 0 } },
        // #006400
        { val: 15, color: { r: 76, g: 175, b: 80 } },
        // #4caf50
        { val: 20, color: { r: 255, g: 224, b: 102 } }
        // #ffe066
      ];
      let A = _[0], S = _[_.length - 1];
      for (let se = 1; se < _.length; se++)
        if (y < _[se].val) {
          S = _[se], A = _[se - 1];
          break;
        }
      const K = (y - A.val) / (S.val - A.val), pe = Math.round(A.color.r + (S.color.r - A.color.r) * K), mt = Math.round(A.color.g + (S.color.g - A.color.g) * K), yt = Math.round(A.color.b + (S.color.b - A.color.b) * K);
      return `rgb(${pe},${mt},${yt})`;
    }
    const Ir = 5, an = [];
    for (let y = 0; y < t; y++)
      for (let _ = 0; _ < 24; _++) {
        const A = `${y}-${_}`, S = gt[A];
        if (S && S.precipProb > 0) {
          const K = g + y * x + _ * ae + ae / 2 - Ze / 2, pe = g + y * x, mt = g + (y + 1) * x - Ze, yt = Math.max(pe, Math.min(mt, K)), se = S.precipProb / 100 * Ir * on;
          an.push(
            w`<rect x="${yt}" y="${sn - se}" width="${Ze}" height="${se}" fill="#988d8dff" opacity="0.4" rx="1.5"/>`
          );
        }
      }
    const ln = [];
    for (let y = 0; y < t; y++)
      for (let _ = 0; _ < 24; _++) {
        const A = `${y}-${_}`, S = gt[A];
        if (S && S.precip > 0) {
          const K = g + y * x + _ * ae + ae / 2 - Ze / 2, pe = g + y * x, mt = g + (y + 1) * x - Ze, yt = Math.max(pe, Math.min(mt, K)), se = S.precip * on, jr = Ur(S.precip);
          ln.push(
            w`<rect x="${yt}" y="${sn - se}" width="${Ze}" height="${se}"
              fill="${jr}" opacity="1" rx="1.5"/>`
          );
        }
      }
    const Rt = [];
    if (e.length > 0)
      for (let y = 0; y <= t; y++) {
        const _ = g + y * x;
        y === 0 ? Rt.push(
          w`<line x1="${_}" y1="${_e}" x2="${_}" y2="${he}" stroke="#ddd" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.4"/>`
        ) : y === t ? Rt.push(
          w`<line x1="${_}" y1="${_e}" x2="${_}" y2="${he}" stroke="#ddd" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.4"/>`
        ) : Rt.push(
          w`<line x1="${_}" y1="${_e}" x2="${_}" y2="${he}" stroke="#ddd" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.4"/>`
        );
      }
    const cn = [];
    if (t > 0)
      for (let y = 0; y < t; y++) {
        const _ = g + y * x + x / 2, A = typeof n[y].templow == "number" ? Math.round(n[y].templow || n[y].temperature - 5) : "", S = typeof n[y].temperature == "number" ? Math.round(n[y].temperature) : "";
        cn.push(w`
        <g>
          <!-- Weekday -->
          <text x="${_}" y="${q}" text-anchor="middle" font-size="${v}" class="weather-day">
            ${new Date(n[y].datetime).toLocaleDateString(void 0, { weekday: "short" })}
          </text>
          <!-- Icon -->
          <foreignObject x="${_ - C / 2}" y="${Q}" width="${C}" height="${C}">
              ${this.getWeatherIcon(n[y].condition || "", this.config.enable_animate_weather_icons ? "animated" : "mdiAsSVG", C + "px", !0)}
          </foreignObject>
          <!-- Min/Max temp -->
          <text class="weather-temp" x="${_}" y="${ye}" text-anchor="middle" font-size="${M}">${A}°<tspan fill="#aaa"> | </tspan><tspan class="weather-temp">${S}°</tspan></text>
        </g>
      `);
      }
    const dn = [], Ft = /* @__PURE__ */ new Set();
    Ft.add(Oe), Oe < 0 && He > 0 && Ft.add(0), Ft.add(He);
    for (let y = Oe; y <= He; y += 5)
      if (y % 5 === 0) {
        const _ = _e + (He - y) / bi * (he - _e);
        if (_ >= _e && _ <= he) {
          const A = y % 10 === 0;
          dn.push(w`
            <line x1="${g}" y1="${_}" x2="${b}" y2="${_}"
              stroke="#ddd" stroke-width="${A ? 1 : 0.5}"
              stroke-dasharray="${A ? "none" : "2,2"}" opacity="0.6"/>
            ${D === "none" ? w`` : D === "full" ? A ? w`<text x="${g + 4}" y="${_}" font-size="${$}" fill="#888" opacity="0.9" text-anchor="start" dominant-baseline="middle">${y}°</text>` : w`` : Ft.has(y) ? w`<text x="${g + 4}" y="${_}" font-size="${$}" fill="#888" opacity="0.9" text-anchor="start" dominant-baseline="middle">${y}°</text>` : w``}
          `);
        }
      }
    const Br = w``;
    return c`
      <style>
        .chart {
        ${this.standalone === !1 ? "background: var(--card-background-color, #fff);margin-top: 15px;" : ""}
          border-radius: 12px;
          padding: 0;
          margin-bottom: var(--chart-margin-bottom, 0);
          border: var(--chart-inner-border, 1px solid var(--border-color, rgba(220, 20, 60, 0.1)));
          overflow: hidden;
          position: relative; /* Enable absolute positioning for SVG overlay */
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
        .chart svg {
          width: 100%;
          height: 100%;
        }
      </style>
      <div class="chart">
        <svg width="100%" height="100%" viewBox="0 0 ${l} ${a}" style="display:block;">
          <defs>
            <filter id="text-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000000" flood-opacity="0.9"/>
              <feDropShadow dx="0" dy="0" stdDeviation="1" flood-color="#000000" flood-opacity="0.8"/>
            </filter>
          </defs>
          <!-- Background grid lines (behind everything) -->
          ${dn} ${Rt}
          <!-- Day groups (labels and icons) -->
          ${cn}
          <!-- Precipitation bars -->
          ${an} ${ln}
          <!-- Right-side labels for mm and % -->
          ${Br}
        </svg>

        <!-- Temperature lines in completely separate SVG overlay (continuous line, always on top) -->
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 ${l} ${a}"
          style="display:block; position: absolute; top: 0; left: 0; pointer-events: none;"
        >
          <defs>
            <filter id="temp-line-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
            </filter>
          </defs>
          <g filter="url(#temp-line-shadow)">
            ${rn}
          </g>
        </svg>
      </div>
    `;
  }
};
Se.styles = T`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
    }
    .chart-bars {
      display: flex;
      justify-content: space-between;
      height: 120px;
      margin-bottom: 10px;
    }

    .chart-line {
      display: flex;
      justify-content: space-between;
      height: 60px;
      margin-bottom: 10px;
    }

    .chart-bar-precipitation {
      width: 18px;
      background: linear-gradient(to top, #3498db, #85c5e5);
      border-radius: 2px 2px 0 0;
      min-height: 2px;
    }
    .chart-bar-precipitation-prob {
      width: 18px;
      background: #87898eff;
      border-radius: 2px 2px 0 0;
      min-height: 2px;
      opacity: 0.6;
    }

    .chart-labels {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: var(--secondary-text-color, #000);
    }
    .weather-temp {
      fill: #fff;
      filter: url(#text-glow);
      font-weight: 600;
    }
    .weather-day {
      fill: #fff;
      filter: url(#text-glow);
      font-weight: 600;
    }
  `;
ut([
  m({ type: Array })
], Se.prototype, "forecast", 2);
ut([
  m({ type: Array })
], Se.prototype, "hourlyForecast", 2);
ut([
  m({ type: Object })
], Se.prototype, "config", 2);
ut([
  m({ type: Function })
], Se.prototype, "getWeatherIcon", 2);
ut([
  m({ type: Boolean })
], Se.prototype, "standalone", 2);
Se = ut([
  O("daily-forecast-diagram")
], Se);
const zi = "langChanged";
function Ls(n, e, t) {
  return Object.entries(Li(e || {})).reduce((i, [r, s]) => i.replace(new RegExp(`{{[  ]*${r}[  ]*}}`, "gm"), String(Li(s))), n);
}
function Es(n, e) {
  const t = n.split(".");
  let i = e.strings;
  for (; i != null && t.length > 0; )
    i = i[t.shift()];
  return i != null ? i.toString() : null;
}
function Li(n) {
  return typeof n == "function" ? n() : n;
}
const Ns = () => ({
  loader: () => Promise.resolve({}),
  empty: (n) => `[${n}]`,
  lookup: Es,
  interpolate: Ls,
  translationCache: {}
});
let St = Ns();
function W(n) {
  return St = Object.assign(Object.assign({}, St), n);
}
function Ts(n) {
  window.dispatchEvent(new CustomEvent(zi, { detail: n }));
}
function Os(n, e, t = St) {
  Ts({
    previousStrings: t.strings,
    previousLang: t.lang,
    lang: t.lang = n,
    strings: t.strings = e
  });
}
function Hs(n, e) {
  const t = (i) => n(i.detail);
  return window.addEventListener(zi, t, e), () => window.removeEventListener(zi, t);
}
async function ee(n, e = St) {
  const t = await e.loader(n, e);
  e.translationCache = {}, Os(n, t, e);
}
function u(n, e, t = St) {
  let i = t.translationCache[n] || (t.translationCache[n] = t.lookup(n, t) || t.empty(n, t));
  return e = e != null ? Li(e) : null, e != null ? t.interpolate(i, e, t) : i;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nr = { CHILD: 2 }, Ds = (n) => (...e) => ({ _$litDirective$: n, values: e });
let rr = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, i) {
    this._$Ct = e, this._$AM = t, this._$Ci = i;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var vi;
const qt = window, et = qt.trustedTypes, vn = et ? et.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Ei = "$lit$", we = `lit$${(Math.random() + "").slice(9)}$`, sr = "?" + we, Ps = `<${sr}>`, We = document, Vt = () => We.createComment(""), Mt = (n) => n === null || typeof n != "object" && typeof n != "function", or = Array.isArray, Rs = (n) => or(n) || typeof n?.[Symbol.iterator] == "function", $i = `[ 	
\f\r]`, bt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $n = /-->/g, kn = />/g, Pe = RegExp(`>|${$i}(?:([^\\s"'>=/]+)(${$i}*=${$i}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Cn = /'/g, An = /"/g, ar = /^(?:script|style|textarea|title)$/i, tt = Symbol.for("lit-noChange"), R = Symbol.for("lit-nothing"), Sn = /* @__PURE__ */ new WeakMap(), Fe = We.createTreeWalker(We, 129, null, !1);
function lr(n, e) {
  if (!Array.isArray(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return vn !== void 0 ? vn.createHTML(e) : e;
}
const Fs = (n, e) => {
  const t = n.length - 1, i = [];
  let r, s = e === 2 ? "<svg>" : "", o = bt;
  for (let l = 0; l < t; l++) {
    const a = n[l];
    let h, d, p = -1, f = 0;
    for (; f < a.length && (o.lastIndex = f, d = o.exec(a), d !== null); ) f = o.lastIndex, o === bt ? d[1] === "!--" ? o = $n : d[1] !== void 0 ? o = kn : d[2] !== void 0 ? (ar.test(d[2]) && (r = RegExp("</" + d[2], "g")), o = Pe) : d[3] !== void 0 && (o = Pe) : o === Pe ? d[0] === ">" ? (o = r ?? bt, p = -1) : d[1] === void 0 ? p = -2 : (p = o.lastIndex - d[2].length, h = d[1], o = d[3] === void 0 ? Pe : d[3] === '"' ? An : Cn) : o === An || o === Cn ? o = Pe : o === $n || o === kn ? o = bt : (o = Pe, r = void 0);
    const g = o === Pe && n[l + 1].startsWith("/>") ? " " : "";
    s += o === bt ? a + Ps : p >= 0 ? (i.push(h), a.slice(0, p) + Ei + a.slice(p) + we + g) : a + we + (p === -2 ? (i.push(void 0), l) : g);
  }
  return [lr(n, s + (n[t] || "<?>") + (e === 2 ? "</svg>" : "")), i];
};
class zt {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let s = 0, o = 0;
    const l = e.length - 1, a = this.parts, [h, d] = Fs(e, t);
    if (this.el = zt.createElement(h, i), Fe.currentNode = this.el.content, t === 2) {
      const p = this.el.content, f = p.firstChild;
      f.remove(), p.append(...f.childNodes);
    }
    for (; (r = Fe.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) {
          const p = [];
          for (const f of r.getAttributeNames()) if (f.endsWith(Ei) || f.startsWith(we)) {
            const g = d[o++];
            if (p.push(f), g !== void 0) {
              const b = r.getAttribute(g.toLowerCase() + Ei).split(we), k = /([.?@])?(.*)/.exec(g);
              a.push({ type: 1, index: s, name: k[2], strings: b, ctor: k[1] === "." ? Ws : k[1] === "?" ? Is : k[1] === "@" ? Bs : ai });
            } else a.push({ type: 6, index: s });
          }
          for (const f of p) r.removeAttribute(f);
        }
        if (ar.test(r.tagName)) {
          const p = r.textContent.split(we), f = p.length - 1;
          if (f > 0) {
            r.textContent = et ? et.emptyScript : "";
            for (let g = 0; g < f; g++) r.append(p[g], Vt()), Fe.nextNode(), a.push({ type: 2, index: ++s });
            r.append(p[f], Vt());
          }
        }
      } else if (r.nodeType === 8) if (r.data === sr) a.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = r.data.indexOf(we, p + 1)) !== -1; ) a.push({ type: 7, index: s }), p += we.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const i = We.createElement("template");
    return i.innerHTML = e, i;
  }
}
function it(n, e, t = n, i) {
  var r, s, o, l;
  if (e === tt) return e;
  let a = i !== void 0 ? (r = t._$Co) === null || r === void 0 ? void 0 : r[i] : t._$Cl;
  const h = Mt(e) ? void 0 : e._$litDirective$;
  return a?.constructor !== h && ((s = a?._$AO) === null || s === void 0 || s.call(a, !1), h === void 0 ? a = void 0 : (a = new h(n), a._$AT(n, t, i)), i !== void 0 ? ((o = (l = t)._$Co) !== null && o !== void 0 ? o : l._$Co = [])[i] = a : t._$Cl = a), a !== void 0 && (e = it(n, a._$AS(n, e.values), a, i)), e;
}
class Gs {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    var t;
    const { el: { content: i }, parts: r } = this._$AD, s = ((t = e?.creationScope) !== null && t !== void 0 ? t : We).importNode(i, !0);
    Fe.currentNode = s;
    let o = Fe.nextNode(), l = 0, a = 0, h = r[0];
    for (; h !== void 0; ) {
      if (l === h.index) {
        let d;
        h.type === 2 ? d = new oi(o, o.nextSibling, this, e) : h.type === 1 ? d = new h.ctor(o, h.name, h.strings, this, e) : h.type === 6 && (d = new js(o, this, e)), this._$AV.push(d), h = r[++a];
      }
      l !== h?.index && (o = Fe.nextNode(), l++);
    }
    return Fe.currentNode = We, s;
  }
  v(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class oi {
  constructor(e, t, i, r) {
    var s;
    this.type = 2, this._$AH = R, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cp = (s = r?.isConnected) === null || s === void 0 || s;
  }
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && t !== void 0 ? t : this._$Cp;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = it(this, e, t), Mt(e) ? e === R || e == null || e === "" ? (this._$AH !== R && this._$AR(), this._$AH = R) : e !== this._$AH && e !== tt && this._(e) : e._$litType$ !== void 0 ? this.g(e) : e.nodeType !== void 0 ? this.$(e) : Rs(e) ? this.T(e) : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.k(e));
  }
  _(e) {
    this._$AH !== R && Mt(this._$AH) ? this._$AA.nextSibling.data = e : this.$(We.createTextNode(e)), this._$AH = e;
  }
  g(e) {
    var t;
    const { values: i, _$litType$: r } = e, s = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = zt.createElement(lr(r.h, r.h[0]), this.options)), r);
    if (((t = this._$AH) === null || t === void 0 ? void 0 : t._$AD) === s) this._$AH.v(i);
    else {
      const o = new Gs(s, this), l = o.u(this.options);
      o.v(i), this.$(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Sn.get(e.strings);
    return t === void 0 && Sn.set(e.strings, t = new zt(e)), t;
  }
  T(e) {
    or(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const s of e) r === t.length ? t.push(i = new oi(this.k(Vt()), this.k(Vt()), this, this.options)) : i = t[r], i._$AI(s), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const r = e.nextSibling;
      e.remove(), e = r;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cp = e, (t = this._$AP) === null || t === void 0 || t.call(this, e));
  }
}
class ai {
  constructor(e, t, i, r, s) {
    this.type = 1, this._$AH = R, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = R;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, t = this, i, r) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) e = it(this, e, t, 0), o = !Mt(e) || e !== this._$AH && e !== tt, o && (this._$AH = e);
    else {
      const l = e;
      let a, h;
      for (e = s[0], a = 0; a < s.length - 1; a++) h = it(this, l[i + a], t, a), h === tt && (h = this._$AH[a]), o || (o = !Mt(h) || h !== this._$AH[a]), h === R ? e = R : e !== R && (e += (h ?? "") + s[a + 1]), this._$AH[a] = h;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === R ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ws extends ai {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === R ? void 0 : e;
  }
}
const Us = et ? et.emptyScript : "";
class Is extends ai {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== R ? this.element.setAttribute(this.name, Us) : this.element.removeAttribute(this.name);
  }
}
class Bs extends ai {
  constructor(e, t, i, r, s) {
    super(e, t, i, r, s), this.type = 5;
  }
  _$AI(e, t = this) {
    var i;
    if ((e = (i = it(this, e, t, 0)) !== null && i !== void 0 ? i : R) === tt) return;
    const r = this._$AH, s = e === R && r !== R || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, o = e !== R && (r === R || s);
    s && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) === null || t === void 0 ? void 0 : t.host) !== null && i !== void 0 ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class js {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    it(this, e);
  }
}
const Mn = qt.litHtmlPolyfillSupport;
Mn?.(zt, oi), ((vi = qt.litHtmlVersions) !== null && vi !== void 0 ? vi : qt.litHtmlVersions = []).push("2.8.0");
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qs = (n) => n.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = (n, e) => {
  var t, i;
  const r = n._$AN;
  if (r === void 0) return !1;
  for (const s of r) (i = (t = s)._$AO) === null || i === void 0 || i.call(t, e, !1), $t(s, e);
  return !0;
}, Zt = (n) => {
  let e, t;
  do {
    if ((e = n._$AM) === void 0) break;
    t = e._$AN, t.delete(n), n = e;
  } while (t?.size === 0);
}, cr = (n) => {
  for (let e; e = n._$AM; n = e) {
    let t = e._$AN;
    if (t === void 0) e._$AN = t = /* @__PURE__ */ new Set();
    else if (t.has(n)) break;
    t.add(n), Ks(e);
  }
};
function Vs(n) {
  this._$AN !== void 0 ? (Zt(this), this._$AM = n, cr(this)) : this._$AM = n;
}
function Zs(n, e = !1, t = 0) {
  const i = this._$AH, r = this._$AN;
  if (r !== void 0 && r.size !== 0) if (e) if (Array.isArray(i)) for (let s = t; s < i.length; s++) $t(i[s], !1), Zt(i[s]);
  else i != null && ($t(i, !1), Zt(i));
  else $t(this, n);
}
const Ks = (n) => {
  var e, t, i, r;
  n.type == nr.CHILD && ((e = (i = n)._$AP) !== null && e !== void 0 || (i._$AP = Zs), (t = (r = n)._$AQ) !== null && t !== void 0 || (r._$AQ = Vs));
};
class Ys extends rr {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, t, i) {
    super._$AT(e, t, i), cr(this), this.isConnected = e._$AU;
  }
  _$AO(e, t = !0) {
    var i, r;
    e !== this.isConnected && (this.isConnected = e, e ? (i = this.reconnected) === null || i === void 0 || i.call(this) : (r = this.disconnected) === null || r === void 0 || r.call(this)), t && ($t(this, e), Zt(this));
  }
  setValue(e) {
    if (qs(this._$Ct)) this._$Ct._$AI(e, this);
    else {
      const t = [...this._$Ct._$AH];
      t[this._$Ci] = e, this._$Ct._$AI(t, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
class Qs extends Ys {
  constructor() {
    super(...arguments), this.langChangedSubscription = null, this.getValue = (() => "");
  }
  /**
   * Sets up the directive by setting the getValue property and subscribing.
   * When subclassing LangChangedDirectiveBase this function should be call in the render function.
   * @param getValue
   */
  renderValue(e) {
    return this.getValue = e, this.subscribe(), this.getValue();
  }
  /**
   * Called when the lang changed event is dispatched.
   * @param e
   */
  langChanged(e) {
    this.setValue(this.getValue(e));
  }
  /**
   * Subscribes to the lang changed event.
   */
  subscribe() {
    this.langChangedSubscription == null && (this.langChangedSubscription = Hs(this.langChanged.bind(this)));
  }
  /**
   * Unsubscribes from the lang changed event.
   */
  unsubscribe() {
    this.langChangedSubscription != null && this.langChangedSubscription();
  }
  /**
   * Unsubscribes when disconnected.
   */
  disconnected() {
    this.unsubscribe();
  }
  /**
   * Subscribes when reconnected.
   */
  reconnected() {
    this.subscribe();
  }
}
class Xs extends Qs {
  render(e, t, i) {
    return this.renderValue(() => u(e, t, i));
  }
}
const X = Ds(Xs);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class zn extends rr {
  constructor(e) {
    if (super(e), this.et = R, e.type !== nr.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === R || e == null) return this.ft = void 0, this.et = e;
    if (e === tt) return e;
    if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.et) return this.ft;
    this.et = e;
    const t = [e];
    return t.raw = t, this.ft = { _$litType$: this.constructor.resultType, strings: t, values: [] };
  }
}
zn.directiveName = "unsafeHTML", zn.resultType = 1;
var Ln;
(function(n) {
  n.language = "language", n.system = "system", n.comma_decimal = "comma_decimal", n.decimal_comma = "decimal_comma", n.space_comma = "space_comma", n.none = "none";
})(Ln || (Ln = {}));
var En;
(function(n) {
  n.language = "language", n.system = "system", n.am_pm = "12", n.twenty_four = "24";
})(En || (En = {}));
const oe = (n, e, t, i) => {
  i = i || {}, t = t ?? {};
  const r = new Event(e, {
    bubbles: i.bubbles === void 0 ? !0 : i.bubbles,
    cancelable: !!i.cancelable,
    composed: i.composed === void 0 ? !0 : i.composed
  });
  return r.detail = t, n.dispatchEvent(r), r;
}, Js = { entity: "Wetter Entity *", location: "Standort", show_location: "Standort anzeigen", sun_entity: "Sonnen Entity für Sonnenaufgang und Sonnenuntergang", wind_entity: "Windgeschwindigkeit", wind_direction_entity: "Windrichtung", sunshine_entity: "Sonnenscheindauer", precipitation_entity: "Niederschlagsprognose", show_forecast: "Wettervorhersage anzeigen", show_temperature: "Temperaturdiagramm anzeigen", show_precipitation: "Niederschlagsdiagramm anzeigen", show_sunshine: "Sonnenscheindauerdiagramm anzeigen", show_wind: "Winddiagramm anzeigen", enable_animate_weather_icons: "Animierte Wetter-Icons aktivieren", forecast_hours: "Prognose Stunden (Standard: 6)", compact_mode: "Kompakter Modus", display_mode: "Anzeigemodus", display_mode_full: "Vollständig", display_mode_compact: "Kompakt", display_mode_auto: "Automatisch", group_general: "Allgemeineinstellungen", group_current: "Aktuelles Wetter", group_forecast: "Wettervorhersage", group_charts: "Diagramme", group_sensors: "Sensoren", group_display: "Anzeigeeinstellungen", group_chart_order: "Reihenfolge der Diagramme", chart_order: "Reihenfolge der Diagramme (z.B. temperature,precipitation,sunshine,wind)", chart_temperature: "Temperatur", chart_precipitation: "Niederschlag", chart_sunshine: "Sonnenschein", chart_wind: "Wind", chart_forecast: "Prognose-Diagramm", move_up: "Nach oben", move_down: "Nach unten", descr: { entity: "Die Wetter-Entity ist erforderlich und sollte von der Integration SwissWeather sein. Wenn eine andere Wetter Entity genutzt wird kann es passieren, das nicht alle Daten korrekt angezeigt werden.", location: "Zeigt diesen Namen als Standort an.", show_location: "Zeige den Standortnamen über dem aktuellen Wetter an", sun_entity: "Die Sonnen-Entity ist erforderlich, um Sonnenaufgangs- und Sonnenuntergangszeiten anzuzeigen.", wind_entity: "Die Wind-Entity wird benötigt, um die Windgeschwindigkeit anzuzeigen.", wind_direction_entity: "Die Windrichtungs-Entity wird benötigt, um die Windrichtung anzuzeigen.", sunshine_entity: "Die Sonnenscheindauer-Entity wird benötigt, um die Sonnenscheindauer anzuzeigen.", precipitation_entity: "Die Niederschlags-Entity wird benötigt, um die Niederschlagsprognose anzuzeigen.", show_forecast: "Blende den Wettervorhersage-Bereich ein oder aus. Die Vorhersage zeigt bis zu 7 Tage an, je nach dem was der Wetterdienst liefert.", show_temperature: "Zeige das Temperaturdiagramm an, mit den Vorhersage anhand der eingestellten Stunden", show_precipitation: "Zeige das Niederschlags an, mit den Vorhersage anhand der eingestellten Stunden", show_sunshine: "Zeige das Sonnenscheindauerdiagramm an, mit den Vorhersage anhand der eingestellten Stunden", show_wind: "Zeige das Winddiagramm an mit den Vorhersage anhand der eingestellten Stunden", enable_animate_weather_icons: "Zeige animierte Icons an. Wenn ausgeschaltet, werden statische Icons angezeigt.", compact_mode: "Im kompakten Modus werden weniger Details angezeigt für die Tagesvorhersage und den aktuellen Daten (z.B. Windrichtung)", display_mode: "Wähle wie viele Daten angezeigt werden: Vollständig (alle Sektionen), Kompakt (nur wesentliches), oder Auto (passt sich an Kartengrösse an)", forecast_hours: "Anzahl der Stunden für die Anzeige der stündlichen Vorhersage (Standard: 6, maximal 18)", auto_resolve_entities: "LNKtwo/ha-meteoswiss Sensoren automatisch erkennen (Empfohlen)", show_swiss: "Schweizer Werte anzeigen (Föhn, Schnee, 0°C-Grenze)", show_heating: "Heizgradtage anzeigen (SIA 381/3)", foehn_entity: "Föhn-Index Sensor (automatisch erkannt wenn auto_resolve aktiv)", snow_entity: "Schneehöhe Sensor (automatisch erkannt wenn auto_resolve aktiv)", freezing_level_entity: "Nullgradgrenze Sensor (automatisch erkannt wenn auto_resolve aktiv)", heating_degree_days_entity: "Heizgradtage Sensor (automatisch erkannt wenn auto_resolve aktiv)", season_heating_entity: "Saison-Heizgradtage Sensor (automatisch erkannt wenn auto_resolve aktiv)" } }, eo = { config: { show_warnings: "Wetterwarnungen anzeigen", warning_entity: "Wetterwarnungen (Legacy)", primary_warning_entity: "Primäre Wetterwarnung", secondary_warning_entity: "Sekundäre Wetterwarnung", tertiary_warning_entity: "Tertiäre Wetterwarnung", descr: { show_warnings: "Zeige Wetterwarnungen an, wenn die Wetterwarnung Entity gesetzt ist und aktuelle Warnungen existieren.", warning_entity: "Wetterwarnungen Entity (LNKtwo/ha-meteoswiss: binary_sensor.*_any_alert). Wird automatisch erkannt.", primary_warning_entity: "Primäre Wetterwarnung (*_primary_weather_warning) aus LNKtwo/ha-meteoswiss. Wenn gesetzt, wird das neue Ranked-Model aktiviert.", secondary_warning_entity: "Sekundäre Wetterwarnung (*_secondary_weather_warning) aus LNKtwo/ha-meteoswiss.", tertiary_warning_entity: "Tertiäre Wetterwarnung (*_tertiary_weather_warning) aus LNKtwo/ha-meteoswiss." } }, weather_warning: "Wetterwarnung aktiv", weather_warnings: "{{count}} Wetterwarnungen aktiv", warnings: "Wetterwarnungen", warnings_none: "Keine aktiven Wetterwarnungen", warnings_unavailable: "Warnungsdaten nicht verfügbar", warnings_additional: "+{{count}} weitere", valid_from: "Gültig ab", valid_to: "Gültig bis" }, to = { config: { entity: "Wetter Entity *", forecast_hours: "Prognose Stunden (Standard: 6)", sun_entity: "Sonnen Entity für Sonnenaufgang und Sonnenuntergang", sunshine_entity: "Sonnenscheindauer", descr: { entity: "Die Wetter-Entity ist erforderlich und sollte von der Integration SwissWeather sein.", forecast_hours: "Anzahl der Stunden für die Anzeige der stündlichen Vorhersage (Standard: 6, maximal 18)", sun_entity: "Die Sonnen-Entity wird für Sonnenaufgangs-/Untergangsmarkierungen im Diagramm benötigt.", sunshine_entity: "Die Sonnenscheindauer-Entity wird benötigt, um die Sonnenscheindauer anzuzeigen." } }, forecast_hours: "Prognose (nächste {{hours}}h)", temperature_chart: "Temperatur (nächste 6h)", temperature_hours: "Temperatur (nächste {{hours}}h)", temperature_none: "Keine Temperaturdaten vorhanden", precipitation_hours: "Niederschlag (nächste {{hours}}h)", precipitation_none: "Keine Niederschlagsdaten vorhanden", no_precipitation_data: "Keine Niederschlagsdaten vorhanden", sunshine_chart: "Sonnenschein (nächste 6h)", sunshine_hours: "Sonnenschein (nächste {{hours}}h)", sunshine_none: "Keine Sonnenscheindaten vorhanden", no_sunshine_data: "Keine Sonnenscheindaten vorhanden", wind_hours: "Wind (nächste {{hours}}h)", wind_compass: "Richtung", loading: "Lädt...", loading_forecast: "Vorhersagedaten werden geladen...", check_devtools: "Prüfen Sie die Developer Tools → Services → weather.get_forecasts", try_other_entity: "Versuchen Sie eine andere Wetter-Entity", no_forecast_data: "Keine Vorhersagedaten verfügbar", no_forecast_data_hint: "Prüfen Sie die Developer Tools → Services → weather.get_forecasts", forecast_none: "Keine Forecast-Daten verfügbar", forecast_none_hint: "Prüfen Sie die Developer Tools → Services → weather.get_forecasts", forecast_loading: "Lädt...", forecast_days: "{{count}}-Tage-Prognose", forecast_days_7: "7-Tage-Prognose", "7d_forecast": "7-Tage-Prognose", xd_forecast: "Tages Prognose", days_available: "Verfügbare Tage", now: "Jetzt", hour: "{{h}}h" }, io = { config: { entity: "Wetter Entity *", sun_entity: "Sonnen Entity für Sonnenaufgang und Sonnenuntergang", forecast_mode: "Vorhersage-Modus", photo_mode: "Fotorealistischer Hintergrund (PoC)", show_day_temps: "Tages-Min/Max anzeigen", show_sun_times: "Sonnenauf-/-untergang anzeigen", temperature_font_size: "Temperatur Schriftgröße (px)", group_general: "Allgemeineinstellungen", group_display: "Anzeigeeinstellungen", descr: { entity: "Die Wetter-Entity ist erforderlich und sollte von der Integration SwissWeather sein.", sun_entity: "Die Sonnen-Entity ist erforderlich, um Sonnenaufgangs- und Sonnenuntergangszeiten anzuzeigen.", forecast_mode: "Wähle, ob in der BG-Card die Tages- oder Stunden-Vorhersage (oder keine) angezeigt wird.", show_day_temps: "Blende die Tages-Min/Max-Anzeige ein oder aus.", show_sun_times: "Blende die Anzeige von Sonnenaufgang/-untergang ein oder aus.", photo_mode: "Experimenteller fotorealistischer Hintergrund mit atmosphärischen Overlays (PoC).", temperature_font_size: "Schriftgröße der Temperaturanzeige in Pixel. Standard: 36", scenery_image: "URL eines Landschaftsbilds (See, Berge, etc.). Wird unten angezeigt mit dynamischem Himmel darüber." }, scenery_image: "Landschaftsbild URL" }, forecast_mode: { daily: "Täglich", hourly: "Stündlich", none: "Keine" }, sunrise: "Sonnenaufgang", sunset: "Sonnenuntergang" }, no = { config: { entity: "Wetter Entity *", sun_entity: "Sonnen Entity für Sonnenaufgang und Sonnenuntergang", group_general: "Allgemeineinstellungen", group_sensors: "Sensoren", descr: { entity: "Die Wetter-Entity ist erforderlich und sollte von der Integration SwissWeather sein.", sun_entity: "Die Sonnen-Entity ist erforderlich, um Sonnenaufgangs- und Sonnenuntergangszeiten anzuzeigen." } } }, ro = "Schweiz", so = "Wind", oo = "Richtung", ao = "Luftfeuchtigkeit", lo = "Luftdruck", co = "Sonnenschein", ho = "Sicht", po = "Aktuelles Wetter", uo = "Unbekannt", fo = "Einklappen", go = "Ausklappen", mo = "Bewölkt", yo = "Aussergewöhnliches Wetter", _o = "Nebel", bo = "Hagel", wo = "Gewitter", xo = "Teilweise bewölkt", vo = "Strömender Regen", $o = "Regnerisch", ko = "Schneefall", Co = "Sonnig", Ao = "Windig", So = { title: "Pollenbelastung", no_data: "Keine Pollen-Typen aktiviert", not_configured: "Keine Pollen-Sensoren konfiguriert. Bitte Karte einrichten und Stufen-Sensoren aus LNKtwo/ha-meteoswiss zuweisen.", config: { level_sensor: "Stufen-Sensor", level_sensor_hint: "Pollen-Stufen-Sensor (SwissPollenLevelSensor aus LNKtwo/ha-meteoswiss). Mögliche Werte: NONE / LOW / MEDIUM / STRONG / VERY_STRONG", raw_sensor: "Rohwert-Sensor (optional)", raw_sensor_hint: "Optionaler Rohwert-Sensor in Partikel/m³" }, types: { birch: "Birke", grasses: "Gräser", alder: "Erle", hazel: "Hasel", beech: "Buche", ash: "Esche", oak: "Eiche" }, levels: { none: "Keine", low: "Gering", medium: "Mittel", strong: "Stark", very_strong: "Sehr stark" } }, Mo = {
  config: Js,
  warning: eo,
  hourly_charts: to,
  bg_card: io,
  forecast_diagram: no,
  location: ro,
  wind: so,
  direction: oo,
  humidity: ao,
  pressure: lo,
  sunshine: co,
  visibility: ho,
  current_weather: po,
  unknown: uo,
  collapse: fo,
  expand: go,
  "clear-night": "Klarer Himmel in der Nacht",
  cloudy: mo,
  exceptional: yo,
  fog: _o,
  hail: bo,
  lightning: wo,
  "lightning-rainy": "Gewitter, regnerisch",
  partlycloudy: xo,
  pouring: vo,
  rainy: $o,
  snowy: ko,
  "snowy-rainy": "Schnee mit Regen",
  sunny: Co,
  windy: Ao,
  "windy-variant": "Windige Variante",
  "windy-variant-cloudy": "Windig mit Wolken",
  "windy-variant-partlycloudy": "Windig mit teilweiser Bewölkung",
  "windy-variant-rainy": "Windig mit Regen",
  "windy-variant-snowy": "Windig mit Schnee",
  "windy-variant-snowy-rainy": "Windig mit Schnee und Regen",
  "windy-variant-sunny": "Windig mit Sonne",
  "windy-variant-clear-night": "Windig mit klarem Himmel in der Nacht",
  "windy-variant-fog": "Windig mit Nebel",
  "windy-variant-hail": "Windig mit Hagel",
  "windy-variant-lightning": "Windig mit Blitz",
  "windy-variant-lightning-rainy": "Windig mit Blitz und Regen",
  "windy-variant-pouring": "Windig mit starkem Regen",
  "windy-variant-exceptional": "Windig mit aussergewöhnlichem Wetter",
  pollen: So
}, zo = { entity: "Weather Entity *", location: "Location", show_location: "Show Location", sun_entity: "Sun Entity to display sunrise and sunset times", wind_entity: "Wind Speed", wind_direction_entity: "Wind Direction", sunshine_entity: "Sunshine Duration", precipitation_entity: "Precipitation Forecast", show_forecast: "Show Weather Forecast", show_temperature: "Show Temperature Chart", show_precipitation: "Show Precipitation Chart", show_sunshine: "Show Sunshine Duration Chart", show_wind: "Show Wind Chart", enable_animate_weather_icons: "Enable Animated Weather Icons", forecast_hours: "Forecast Hours (default: 6)", compact_mode: "Compact Mode", display_mode: "Display Mode", display_mode_full: "Full", display_mode_compact: "Compact", display_mode_auto: "Auto", group_general: "General Settings", group_current: "Current Weather", group_forecast: "Weather Forecast", group_charts: "Charts", group_sensors: "Sensors", group_display: "Display Settings", group_chart_order: "Chart Order", chart_order: "Chart order (e.g. temperature,precipitation,sunshine,wind)", chart_temperature: "Temperature", chart_precipitation: "Precipitation", chart_sunshine: "Sunshine", chart_wind: "Wind", chart_forecast: "Forecast Chart", move_up: "Move up", move_down: "Move down", descr: { entity: "The weather entity is required and should be from the SwissWeather integration. If another weather entity is used, not all data may be displayed correctly.", location: "Displays this name as location.", show_location: "Show the location name above the current weather", sun_entity: "The sun entity is required to display sunrise and sunset times.", wind_entity: "The wind entity is required to display wind speed.", wind_direction_entity: "The wind direction entity is required to display wind direction.", sunshine_entity: "The sunshine entity is required to display sunshine duration.", precipitation_entity: "The precipitation entity is required to display the precipitation forecast.", show_forecast: "Toggle the weather forecast section on or off. The forecast shows up to 7 days depending on what the weather service provides.", show_temperature: "Show the temperature chart with the forecast based on the set hours", show_precipitation: "Show the precipitation chart with the forecast based on the set hours", show_sunshine: "Show the sunshine duration chart with the forecast based on the set hours", show_wind: "Show the wind chart with the forecast based on the set hours", enable_animate_weather_icons: "Show animated icons. If disabled, static icons are displayed.", compact_mode: "In compact mode, fewer details are displayed for the daily forecast and current data (e.g. wind direction)", display_mode: "Choose how much data to show: Full (all sections), Compact (essentials only), or Auto (adapts to card width)", forecast_hours: "Number of hours to show in the hourly forecast (default: 6, maximum 18)", auto_resolve_entities: "Auto-resolve LNKtwo/ha-meteoswiss sensor entities (Recommended)", show_swiss: "Show Swiss-specific values (foehn, snow, freezing level)", show_heating: "Show heating degree days (SIA 381/3)", foehn_entity: "Foehn index sensor (auto-resolved if auto_resolve enabled)", snow_entity: "Snow depth sensor (auto-resolved if auto_resolve enabled)", freezing_level_entity: "Freezing level sensor (auto-resolved if auto_resolve enabled)", heating_degree_days_entity: "Heating degree days sensor (auto-resolved if auto_resolve enabled)", season_heating_entity: "Season heating degree days sensor (auto-resolved if auto_resolve enabled)" } }, Lo = { config: { show_warnings: "Show Weather Warnings", warning_entity: "Weather Warnings (Legacy)", primary_warning_entity: "Primary Weather Warning", secondary_warning_entity: "Secondary Weather Warning", tertiary_warning_entity: "Tertiary Weather Warning", descr: { show_warnings: "Show weather warnings if the weather warning entity is set and the actual warning exists.", warning_entity: "Weather warning entity (LNKtwo/ha-meteoswiss: binary_sensor.*_any_alert). Auto-detected from weather entity.", primary_warning_entity: "Primary weather warning entity (*_primary_weather_warning) from LNKtwo/ha-meteoswiss. When set, the new ranked model is activated.", secondary_warning_entity: "Secondary weather warning entity (*_secondary_weather_warning) from LNKtwo/ha-meteoswiss.", tertiary_warning_entity: "Tertiary weather warning entity (*_tertiary_weather_warning) from LNKtwo/ha-meteoswiss." } }, weather_warning: "Weather warning active", weather_warnings: "{{count}} weather warnings active", warnings: "Weather warnings", warnings_none: "No active weather warnings", warnings_unavailable: "Weather warning data unavailable", warnings_additional: "+{{count}} more", valid_from: "Valid from", valid_to: "Valid to" }, Eo = { config: { entity: "Weather Entity *", forecast_hours: "Forecast Hours (default: 6)", sun_entity: "Sun Entity to display sunrise and sunset times", sunshine_entity: "Sunshine Duration", descr: { entity: "The weather entity is required and should be from the SwissWeather integration.", forecast_hours: "Number of hours to show in the hourly forecast (default: 6, maximum 18)", sun_entity: "The sun entity is required for sunrise/sunset markers in the chart.", sunshine_entity: "The sunshine entity is required to display sunshine duration." } }, forecast_hours: "Forecast (next {{hours}}h)", temperature_chart: "Temperature (next 6h)", temperature_hours: "Temperature (next {{hours}}h)", temperature_none: "No temperature data available", precipitation_hours: "Precipitation (next {{hours}}h)", precipitation_none: "No precipitation data available", no_precipitation_data: "No precipitation data available", sunshine_chart: "Sunshine (next 6h)", sunshine_hours: "Sunshine (next {{hours}}h)", sunshine_none: "No sunshine data available", no_sunshine_data: "No sunshine data available", wind_hours: "Wind (next {{hours}}h)", wind_compass: "Direction", loading: "Loading...", loading_forecast: "Loading forecast data...", check_devtools: "Check Developer Tools → Services → weather.get_forecasts", try_other_entity: "Try a different weather entity", no_forecast_data: "No forecast data available", no_forecast_data_hint: "Check Developer Tools → Services → weather.get_forecasts", forecast_none: "No forecast data available", forecast_none_hint: "Check Developer Tools → Services → weather.get_forecasts", forecast_loading: "Loading...", forecast_days: "{{count}}-day forecast", forecast_days_7: "7-day forecast", "7d_forecast": "7-day forecast", xd_forecast: "Daily forecast", days_available: "Available Days", now: "Now", hour: "{{h}}h" }, No = { config: { entity: "Weather Entity *", sun_entity: "Sun Entity to display sunrise and sunset times", forecast_mode: "Forecast Mode", photo_mode: "Photorealistic Background (PoC)", show_day_temps: "Show Day Min/Max", show_sun_times: "Show Sunrise/Sunset", temperature_font_size: "Temperature font size (px)", group_general: "General Settings", group_display: "Display Settings", descr: { entity: "The weather entity is required and should be from the SwissWeather integration.", sun_entity: "The sun entity is required to display sunrise and sunset times.", forecast_mode: "Choose whether the BG card shows the daily or hourly forecast (or none).", show_day_temps: "Toggle the per-day min/max display on or off.", show_sun_times: "Toggle the sunrise/sunset display on or off.", photo_mode: "Photorealistic background with atmospheric overlays.", temperature_font_size: "Font size for the temperature label in pixels. Default: 36", scenery_image: "Background landscape image URL (lake, mountains, etc.). Shown at the bottom with dynamic sky on top." }, scenery_image: "Scenery Image URL" }, forecast_mode: { daily: "Daily", hourly: "Hourly", none: "None" }, sunrise: "Sunrise", sunset: "Sunset" }, To = { config: { entity: "Weather Entity *", sun_entity: "Sun Entity to display sunrise and sunset times", group_general: "General Settings", group_sensors: "Sensors", descr: { entity: "The weather entity is required and should be from the SwissWeather integration.", sun_entity: "The sun entity is required to display sunrise and sunset times." } } }, Oo = "Switzerland", Ho = "Wind", Do = "Direction", Po = "Humidity", Ro = "Pressure", Fo = "Sunshine", Go = "Visibility", Wo = "Current Weather", Uo = "Unknown", Io = "Collapse", Bo = "Expand", jo = "Cloudy", qo = "Exceptional weather", Vo = "Foggy", Zo = "Hail", Ko = "Lightning", Yo = "Partly cloudy", Qo = "Pouring rain", Xo = "Rainy", Jo = "Snowy", ea = "Sunny", ta = "Windy", ia = { title: "Pollen levels", no_data: "No pollen types enabled", not_configured: "No pollen sensors configured. Please edit the card and assign level sensors from LNKtwo/ha-meteoswiss.", config: { level_sensor: "Level sensor", level_sensor_hint: "Pollen level sensor (SwissPollenLevelSensor from LNKtwo/ha-meteoswiss). Values: NONE / LOW / MEDIUM / STRONG / VERY_STRONG", raw_sensor: "Raw value sensor (optional)", raw_sensor_hint: "Optional raw value sensor in particles/m³" }, types: { birch: "Birch", grasses: "Grasses", alder: "Alder", hazel: "Hazel", beech: "Beech", ash: "Ash", oak: "Oak" }, levels: { none: "None", low: "Low", medium: "Medium", strong: "Strong", very_strong: "Very strong" } }, na = {
  config: zo,
  warning: Lo,
  hourly_charts: Eo,
  bg_card: No,
  forecast_diagram: To,
  location: Oo,
  wind: Ho,
  direction: Do,
  humidity: Po,
  pressure: Ro,
  sunshine: Fo,
  visibility: Go,
  current_weather: Wo,
  unknown: Uo,
  collapse: Io,
  expand: Bo,
  "clear-night": "Clear night sky",
  cloudy: jo,
  exceptional: qo,
  fog: Vo,
  hail: Zo,
  lightning: Ko,
  "lightning-rainy": "Lightning with rain",
  partlycloudy: Yo,
  pouring: Qo,
  rainy: Xo,
  snowy: Jo,
  "snowy-rainy": "Snowy with rain",
  sunny: ea,
  windy: ta,
  "windy-variant": "Windy variant",
  "windy-variant-cloudy": "Windy with clouds",
  "windy-variant-partlycloudy": "Windy with partial clouds",
  "windy-variant-rainy": "Windy with rain",
  "windy-variant-snowy": "Windy with snow",
  "windy-variant-snowy-rainy": "Windy with snowy rain",
  "windy-variant-sunny": "Windy with sun",
  "windy-variant-clear-night": "Windy with clear night",
  "windy-variant-fog": "Windy with fog",
  "windy-variant-hail": "Windy with hail",
  "windy-variant-lightning": "Windy with lightning",
  "windy-variant-lightning-rainy": "Windy with lightning and rain",
  "windy-variant-pouring": "Windy with pouring rain",
  "windy-variant-exceptional": "Windy with exceptional weather",
  pollen: ia
}, U = { de: Mo, en: na }, ge = "meteoswiss", xe = `${ge}-card`, dr = `${xe}-editor`, hr = [
  {
    name: "entity",
    required: !0,
    description: "config.descr.entity",
    selector: {
      entity: {
        domain: "weather"
      }
    }
  },
  {
    name: "location",
    description: "config.descr.location",
    selector: {
      text: {}
    }
  },
  {
    name: "show_location",
    description: "config.descr.show_location",
    selector: { boolean: {} }
  },
  {
    name: "wind_entity",
    description: "config.descr.wind_entity",
    selector: {
      entity: {
        domain: "sensor"
      }
    }
  },
  {
    name: "wind_direction_entity",
    description: "config.descr.wind_direction_entity",
    selector: {
      entity: {
        domain: "sensor"
      }
    }
  },
  {
    name: "sunshine_entity",
    description: "config.descr.sunshine_entity",
    selector: {
      entity: {
        domain: "sensor"
      }
    }
  },
  {
    name: "warning_entity",
    description: "warning.config.descr.warning_entity",
    selector: {
      entity: {
        domain: "sensor"
      }
    }
  },
  {
    name: "primary_warning_entity",
    description: "warning.config.descr.primary_warning_entity",
    selector: {
      entity: {
        domain: "sensor"
      }
    }
  },
  {
    name: "secondary_warning_entity",
    description: "warning.config.descr.secondary_warning_entity",
    selector: {
      entity: {
        domain: "sensor"
      }
    }
  },
  {
    name: "tertiary_warning_entity",
    description: "warning.config.descr.tertiary_warning_entity",
    selector: {
      entity: {
        domain: "sensor"
      }
    }
  },
  {
    name: "forecast_hours",
    description: "config.descr.forecast_hours",
    selector: { number: { min: 6, max: 18, step: 1 } }
  },
  {
    name: "show_forecast",
    description: "config.descr.show_forecast",
    selector: { boolean: {} }
  },
  {
    name: "show_precipitation",
    description: "config.descr.show_precipitation",
    selector: { boolean: {} }
  },
  {
    name: "show_temperature",
    description: "config.descr.show_temperature",
    selector: { boolean: {} }
  },
  {
    name: "show_sunshine",
    description: "config.descr.show_sunshine",
    selector: { boolean: {} }
  },
  {
    name: "show_wind",
    description: "config.descr.show_wind",
    selector: { boolean: {} }
  },
  {
    name: "enable_animate_weather_icons",
    description: "config.descr.enable_animate_weather_icons",
    selector: { boolean: {} }
  },
  {
    name: "show_warnings",
    description: "warning.config.descr.show_warnings",
    selector: { boolean: {} }
  },
  {
    name: "auto_resolve_entities",
    description: "config.descr.auto_resolve_entities",
    selector: { boolean: {} }
  },
  {
    name: "show_swiss",
    description: "config.descr.show_swiss",
    selector: { boolean: {} }
  },
  {
    name: "show_heating",
    description: "config.descr.show_heating",
    selector: { boolean: {} }
  },
  {
    name: "foehn_entity",
    description: "config.descr.foehn_entity",
    selector: { entity: { domain: "sensor" } }
  },
  {
    name: "snow_entity",
    description: "config.descr.snow_entity",
    selector: { entity: { domain: "sensor" } }
  },
  {
    name: "freezing_level_entity",
    description: "config.descr.freezing_level_entity",
    selector: { entity: { domain: "sensor" } }
  },
  {
    name: "heating_degree_days_entity",
    description: "config.descr.heating_degree_days_entity",
    selector: { entity: { domain: "sensor" } }
  },
  {
    name: "season_heating_entity",
    description: "config.descr.season_heating_entity",
    selector: { entity: { domain: "sensor" } }
  },
  {
    name: "display_mode",
    description: "config.descr.display_mode",
    selector: {
      select: {
        options: [
          { value: "full", label: "config.display_mode.full" },
          { value: "compact", label: "config.display_mode.compact" },
          { value: "auto", label: "config.display_mode.auto" }
        ]
      }
    }
  },
  {
    name: "compact_mode",
    description: "config.descr.compact_mode",
    selector: { boolean: {} }
  },
  {
    name: "chart_order",
    description: "config.descr.chart_order",
    selector: {
      select: {
        multiple: !0,
        options: [
          { value: "temperature", label: "config.descr.temperature" },
          { value: "precipitation", label: "config.descr.precipitation" },
          { value: "sunshine", label: "config.descr.sunshine" },
          { value: "wind", label: "config.descr.wind" },
          { value: "forecast", label: "config.descr.forecast" }
        ]
      }
    }
  }
];
var ra = Object.defineProperty, sa = Object.getOwnPropertyDescriptor, li = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? sa(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && ra(e, t, r), r;
};
W({
  loader: (n) => U[n]
});
let Lt = class extends N {
  constructor() {
    super(...arguments), this._computeLabel = (n) => ({
      entity: u("config.entity"),
      show_location: u("config.show_location"),
      location: u("config.location"),
      auto_resolve_entities: u("config.auto_resolve_entities") || "Auto-resolve entities",
      sun_entity: u("config.sun_entity"),
      wind_entity: u("config.wind_entity"),
      wind_direction_entity: u("config.wind_direction_entity"),
      sunshine_entity: u("config.sunshine_entity"),
      warning_entity: u("warning.config.warning_entity"),
      show_warnings: u("warning.config.show_warnings"),
      show_swiss: u("config.show_swiss") || "Show Swiss values",
      show_heating: u("config.show_heating") || "Show heating degree days",
      foehn_entity: u("config.foehn_entity") || "Foehn index entity",
      snow_entity: u("config.snow_entity") || "Snow depth entity",
      freezing_level_entity: u("config.freezing_level_entity") || "Freezing level entity",
      heating_degree_days_entity: u("config.heating_degree_days_entity") || "Heating degree days entity",
      season_heating_entity: u("config.season_heating_entity") || "Season heating entity",
      show_forecast: u("config.show_forecast"),
      forecast_hours: u("config.forecast_hours"),
      show_temperature: u("config.show_temperature"),
      show_precipitation: u("config.show_precipitation"),
      show_sunshine: u("config.show_sunshine"),
      show_wind: u("config.show_wind"),
      enable_animate_weather_icons: u("config.enable_animate_weather_icons"),
      compact_mode: u("config.compact_mode"),
      display_mode: u("config.display_mode") || "Display Mode"
    })[n.name] || n.name, this._computeHelper = (n) => n.description ? u(n.description) : "";
  }
  setConfig(n) {
    const e = { ...n };
    for (const t of Object.keys(e))
      e[t] === "" && delete e[t];
    this._config = e, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config { padding: 16px; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro', sans-serif; }
      .header { margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--divider-color); }
      .header-title { font-size: 20px; font-weight: 600; }
      .group { margin-bottom: 20px; padding: 12px 0; border-top: 1px solid var(--divider-color); }
      .group-title { font-size: 14px; font-weight: 600; margin-bottom: 8px; }
      ha-form { display: block; margin-bottom: 12px; }
      .preview-config {
        font-family: 'SF Mono', 'Monaco', monospace; font-size: 12px;
        background: var(--code-editor-background-color, rgba(0,0,0,0.05));
        padding: 12px; border-radius: 8px; white-space: pre-wrap;
      }
    `;
  }
  render() {
    if (!this.hass) return c`<div>Loading...</div>`;
    ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2));
    const n = [
      { key: "temperature", label: "Temperature" },
      { key: "precipitation", label: "Precipitation" },
      { key: "sunshine", label: "Sunshine" },
      { key: "wind", label: "Wind" },
      { key: "forecast", label: "Forecast" }
    ], e = Array.isArray(this._config?.chart_order) ? this._config.chart_order : n.map((r) => r.key), t = {
      entity: this._config?.entity,
      show_location: this._config?.show_location ?? !0,
      location: this._config?.location ?? "",
      auto_resolve_entities: this._config?.auto_resolve_entities ?? !0,
      sun_entity: this._config?.sun_entity,
      wind_entity: this._config?.wind_entity,
      wind_direction_entity: this._config?.wind_direction_entity,
      sunshine_entity: this._config?.sunshine_entity,
      warning_entity: this._config?.warning_entity,
      show_warnings: this._config?.show_warnings ?? !0,
      show_swiss: this._config?.show_swiss ?? !0,
      show_heating: this._config?.show_heating ?? !0,
      foehn_entity: this._config?.foehn_entity,
      snow_entity: this._config?.snow_entity,
      freezing_level_entity: this._config?.freezing_level_entity,
      heating_degree_days_entity: this._config?.heating_degree_days_entity,
      season_heating_entity: this._config?.season_heating_entity,
      show_forecast: this._config?.show_forecast ?? !0,
      forecast_hours: this._config?.forecast_hours ?? 6,
      show_temperature: this._config?.show_temperature ?? !0,
      show_precipitation: this._config?.show_precipitation ?? !0,
      show_sunshine: this._config?.show_sunshine ?? !0,
      show_wind: this._config?.show_wind ?? !0,
      enable_animate_weather_icons: this._config?.enable_animate_weather_icons ?? !0,
      compact_mode: this._config?.compact_mode ?? !1,
      display_mode: this._config?.display_mode ?? "full"
    }, i = (r) => hr.find((s) => s.name === r);
    return c`
      <div class="card-config">
        <div class="header">
          <div class="header-title">🌦️ MeteoSwiss Weather Card</div>
        </div>

        <div class="group">
          <div class="group-title">General</div>
          <ha-form .hass=${this.hass} .data=${t}
            .schema=${[i("entity"), i("location"), i("show_location"), i("auto_resolve_entities")].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
        </div>

        <div class="group">
          <div class="group-title">⚠️ Warnings</div>
          <ha-form .hass=${this.hass} .data=${t}
            .schema=${[i("show_warnings"), i("warning_entity")].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
        </div>

        <div class="group">
          <div class="group-title">🇨🇭 Swiss Values</div>
          <ha-form .hass=${this.hass} .data=${t}
            .schema=${[i("show_swiss"), i("foehn_entity"), i("snow_entity"), i("freezing_level_entity")].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
        </div>

        <div class="group">
          <div class="group-title">🏠 Heating Degree Days</div>
          <ha-form .hass=${this.hass} .data=${t}
            .schema=${[i("show_heating"), i("heating_degree_days_entity"), i("season_heating_entity")].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
        </div>

        <div class="group">
          <div class="group-title">📊 Charts & Forecast</div>
          <ha-form .hass=${this.hass} .data=${t}
            .schema=${[
      i("forecast_hours"),
      i("show_temperature"),
      i("show_precipitation"),
      i("show_sunshine"),
      i("show_wind"),
      i("show_forecast"),
      i("enable_animate_weather_icons")
    ].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
          <p style="font-size:11px;color:var(--secondary-text-color);margin-top:4px;">Wind, Sonnenscheindauer und weitere Sensoren werden automatisch erkannt (auto_resolve_entities). Optional überschreibbar unter Advanced.</p>
        </div>

        <div class="group">
          <div class="group-title">🔧 Advanced (Überschreibt Auto-Resolve)</div>
          <ha-form .hass=${this.hass} .data=${t}
            .schema=${[
      i("wind_entity"),
      i("wind_direction_entity"),
      i("sunshine_entity")
    ].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
          <p style="font-size:11px;color:var(--secondary-text-color);">Leer lassen für Auto-Resolve. Nur ausfüllen wenn du manuell überschreiben willst.</p>
        </div>

        <div class="group">
          <div class="group-title">Chart Order</div>
          <ul style="list-style:none;padding:0;margin:0;">
            ${e.map((r, s) => {
      const o = n.find((l) => l.key === r);
      return c`<li style="display:flex;align-items:center;margin-bottom:4px;">
                <span style="flex:1;">${o?.label || r}</span>
                <button @click=${() => this._moveChart(s, -1)} ?disabled=${s === 0}>⬆️</button>
                <button @click=${() => this._moveChart(s, 1)} ?disabled=${s === e.length - 1}>⬇️</button>
              </li>`;
    })}
          </ul>
        </div>

        <div class="group">
          <div class="group-title">Display</div>
          <ha-form .hass=${this.hass} .data=${t}
            .schema=${[i("display_mode"), i("compact_mode")].filter(Boolean)}
            .computeLabel=${this._computeLabel}
            .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
          <p style="font-size:11px;color:var(--secondary-text-color);margin-top:4px;">
            <strong>Full:</strong> Alle Sektionen (Warnungen, Messwerte, Schweizer Werte, Heizgradtage, Charts, Forecast)<br>
            <strong>Compact:</strong> Nur Header + Warnungen + Messwerte + Forecast<br>
            <strong>Auto:</strong> Compact bei schmalen Karten (z.B. auf Mobile), Full auf breiten
          </p>
        </div>

        ${this._config?.entity ? c`<div class="group">
              <div class="group-title">📋 YAML Preview</div>
              <div class="preview-config">${this._renderConfigPreview()}</div>
            </div>` : ""}
      </div>
    `;
  }
  _moveChart(n, e) {
    if (!this._config) return;
    const t = [...this._config.chart_order || ["temperature", "precipitation", "sunshine", "wind", "forecast"]], i = n + e;
    i < 0 || i >= t.length || ([t[n], t[i]] = [t[i], t[n]], this._config = { ...this._config, chart_order: t }, oe(this, "config-changed", { config: this._config }), this.requestUpdate());
  }
  _renderConfigPreview() {
    const n = { ...this._config, type: "custom:" + xe };
    return Object.keys(n).forEach((e) => {
      (n[e] === void 0 || n[e] === "") && delete n[e];
    }), Object.entries(n).map(([e, t]) => typeof t == "string" ? `${e}: "${t}"` : `${e}: ${t}`).join(`
`);
  }
  _valueChanged(n) {
    this._config || (this._config = { type: "custom:" + xe, entity: "" });
    const e = {};
    this._config.chart_order !== void 0 && (e.chart_order = this._config.chart_order);
    const t = {
      ...this._config,
      ...n.detail.value,
      ...e,
      type: "custom:" + xe
    };
    Object.keys(t).forEach((i) => {
      (t[i] === "" || t[i] === void 0) && delete t[i];
    }), this._config = t, oe(this, "config-changed", { config: this._config });
  }
};
li([
  m({ attribute: !1 })
], Lt.prototype, "hass", 2);
li([
  m({ attribute: !1 })
], Lt.prototype, "lovelace", 2);
li([
  m({ attribute: !1 })
], Lt.prototype, "_config", 2);
Lt = li([
  O(dr)
], Lt);
function Gt(n, e, t) {
  const i = /* @__PURE__ */ new Date();
  return c`
    <div class="chart-labels">
      ${Array.from({ length: n }, (r, s) => {
    const l = new Date(i.getTime() + s * 60 * 60 * 1e3).toLocaleTimeString([], { hour: "2-digit" });
    return c`
          <div
            style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end;"
          >
            <span>${l}</span>
          </div>
        `;
  })}
    </div>
  `;
}
function oa(n) {
  const e = new Date(n);
  return ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][e.getDay()];
}
const aa = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='21.92'%20x2='38.52'%20y1='18.75'%20y2='47.52'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%2386c3db'/%3e%3cstop%20offset='.45'%20stop-color='%2386c3db'/%3e%3cstop%20offset='1'%20stop-color='%235eafcf'/%3e%3canimateTransform%20attributeName='gradientTransform'%20dur='10s'%20repeatCount='indefinite'%20type='rotate'%20values='5%2032%2032;%20-15%2032%2032;%205%2032%2032'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23a)'%20stroke='%2372b9d5'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='.5'%20d='M46.66%2036.2a16.66%2016.66%200%2001-16.78-16.55%2016.29%2016.29%200%2001.55-4.15A16.56%2016.56%200%201048.5%2036.1c-.61.06-1.22.1-1.84.1z'%3e%3canimateTransform%20attributeName='transform'%20dur='10s'%20repeatCount='indefinite'%20type='rotate'%20values='-5%2032%2032;%2015%2032%2032;%20-5%2032%2032'/%3e%3c/path%3e%3c/svg%3e", la = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23a)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'%3e%3canimateTransform%20attributeName='transform'%20dur='7s'%20repeatCount='indefinite'%20type='translate'%20values='-3%200;%203%200;%20-3%200'/%3e%3c/path%3e%3c/svg%3e", ca = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='16.5'%20x2='21.5'%20y1='19.67'%20y2='28.33'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23fbbf24'/%3e%3cstop%20offset='.45'%20stop-color='%23fbbf24'/%3e%3cstop%20offset='1'%20stop-color='%23f59e0b'/%3e%3c/linearGradient%3e%3clinearGradient%20id='b'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3c/defs%3e%3ccircle%20cx='19'%20cy='24'%20r='5'%20fill='url(%23a)'%20stroke='%23f8af18'%20stroke-miterlimit='10'%20stroke-width='.5'/%3e%3cpath%20fill='none'%20stroke='%23fbbf24'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M19%2015.67V12.5m0%2023v-3.17m5.89-14.22l2.24-2.24M10.87%2032.13l2.24-2.24m0-11.78l-2.24-2.24m16.26%2016.26l-2.24-2.24M7.5%2024h3.17m19.83%200h-3.17'%3e%3canimateTransform%20attributeName='transform'%20dur='45s'%20repeatCount='indefinite'%20type='rotate'%20values='0%2019%2024;%20360%2019%2024'/%3e%3c/path%3e%3cpath%20fill='url(%23b)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3c/svg%3e", da = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='13.58'%20x2='24.15'%20y1='15.57'%20y2='33.87'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%2386c3db'/%3e%3cstop%20offset='.45'%20stop-color='%2386c3db'/%3e%3cstop%20offset='1'%20stop-color='%235eafcf'/%3e%3canimateTransform%20attributeName='gradientTransform'%20dur='10s'%20repeatCount='indefinite'%20type='rotate'%20values='10%2019.22%2024.293;%20-10%2019.22%2024.293;%2010%2019.22%2024.293'/%3e%3c/linearGradient%3e%3clinearGradient%20id='b'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23a)'%20stroke='%2372b9d5'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='.5'%20d='M29.33%2026.68a10.61%2010.61%200%2001-10.68-10.54A10.5%2010.5%200%200119%2013.5a10.54%2010.54%200%201011.5%2013.11%2011.48%2011.48%200%2001-1.17.07z'%3e%3canimateTransform%20attributeName='transform'%20dur='10s'%20repeatCount='indefinite'%20type='rotate'%20values='-10%2019.22%2024.293;%2010%2019.22%2024.293;%20-10%2019.22%2024.293'/%3e%3c/path%3e%3cpath%20fill='url(%23b)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3c/svg%3e", ha = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='b'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3clinearGradient%20id='a'%20x1='27.5'%20x2='36.5'%20y1='50.21'%20y2='65.79'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23d4d7dd'/%3e%3cstop%20offset='.45'%20stop-color='%23d4d7dd'/%3e%3cstop%20offset='1'%20stop-color='%23bec1c6'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20y1='44.21'%20y2='59.79'%20xlink:href='%23a'/%3e%3c/defs%3e%3cpath%20fill='url(%23b)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3cpath%20fill='none'%20stroke='url(%23a)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='3'%20d='M17%2058h30'%3e%3canimateTransform%20attributeName='transform'%20begin='0s'%20dur='5s'%20repeatCount='indefinite'%20type='translate'%20values='-4%200;%204%200;%20-4%200'/%3e%3c/path%3e%3cpath%20fill='none'%20stroke='url(%23c)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='3'%20d='M17%2052h30'%3e%3canimateTransform%20attributeName='transform'%20begin='-4s'%20dur='5s'%20repeatCount='indefinite'%20type='translate'%20values='-4%200;%204%200;%20-4%200'/%3e%3c/path%3e%3c/svg%3e", pa = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='b'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3clinearGradient%20id='a'%20x1='23.25'%20x2='24.75'%20y1='43.7'%20y2='46.3'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%2386c3db'/%3e%3cstop%20offset='.45'%20stop-color='%2386c3db'/%3e%3cstop%20offset='1'%20stop-color='%235eafcf'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20x1='30.25'%20x2='31.75'%20y1='43.7'%20y2='46.3'%20xlink:href='%23a'/%3e%3clinearGradient%20id='d'%20x1='37.25'%20x2='38.75'%20y1='43.7'%20y2='46.3'%20xlink:href='%23a'/%3e%3c/defs%3e%3cpath%20fill='url(%23b)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3cpath%20fill='url(%23a)'%20d='M24%2043.5a1.5%201.5%200%20101.5%201.5%201.5%201.5%200%2000-1.5-1.5z'%3e%3canimateTransform%20attributeName='transform'%20dur='0.6s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2018;%20-4%2014'/%3e%3canimate%20attributeName='opacity'%20dur='0.6s'%20repeatCount='indefinite'%20values='1;1;0'/%3e%3c/path%3e%3cpath%20fill='url(%23c)'%20d='M31%2043.5a1.5%201.5%200%20101.5%201.5%201.5%201.5%200%2000-1.5-1.5z'%3e%3canimateTransform%20attributeName='transform'%20begin='-0.4s'%20dur='0.6s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2018;%20-4%2014'/%3e%3canimate%20attributeName='opacity'%20begin='-0.4s'%20dur='0.6s'%20repeatCount='indefinite'%20values='1;1;0'/%3e%3c/path%3e%3cpath%20fill='url(%23d)'%20d='M38%2043.5a1.5%201.5%200%20101.5%201.5%201.5%201.5%200%2000-1.5-1.5z'%3e%3canimateTransform%20attributeName='transform'%20begin='-0.2s'%20dur='0.6s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2018;%20-4%2014'/%3e%3canimate%20attributeName='opacity'%20begin='-0.2s'%20dur='0.6s'%20repeatCount='indefinite'%20values='1;1;0'/%3e%3c/path%3e%3c/svg%3e", ua = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='b'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3clinearGradient%20id='a'%20x1='22.53'%20x2='25.47'%20y1='42.95'%20y2='48.05'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%234286ee'/%3e%3cstop%20offset='.45'%20stop-color='%234286ee'/%3e%3cstop%20offset='1'%20stop-color='%230950bc'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20x1='29.53'%20x2='32.47'%20y1='42.95'%20y2='48.05'%20xlink:href='%23a'/%3e%3clinearGradient%20id='d'%20x1='36.53'%20x2='39.47'%20y1='42.95'%20y2='48.05'%20xlink:href='%23a'/%3e%3clinearGradient%20id='e'%20x1='26.74'%20x2='35.76'%20y1='37.88'%20y2='53.52'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f7b23b'/%3e%3cstop%20offset='.45'%20stop-color='%23f7b23b'/%3e%3cstop%20offset='1'%20stop-color='%23f59e0b'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23b)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3cpath%20fill='none'%20stroke='url(%23a)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M24.39%2043.03l-.78%204.94'%3e%3canimateTransform%20attributeName='transform'%20dur='0.7s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20dur='0.7s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3cpath%20fill='none'%20stroke='url(%23c)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M31.39%2043.03l-.78%204.94'%3e%3canimateTransform%20attributeName='transform'%20begin='-0.4s'%20dur='0.7s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20begin='-0.4s'%20dur='0.7s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3cpath%20fill='none'%20stroke='url(%23d)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M38.39%2043.03l-.78%204.94'%3e%3canimateTransform%20attributeName='transform'%20begin='-0.2s'%20dur='0.7s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20begin='-0.2s'%20dur='0.7s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3cpath%20fill='url(%23e)'%20stroke='%23f6a823'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M30%2036l-4%2012h4l-2%2010%2010-14h-6l4-8h-6z'%3e%3canimate%20attributeName='opacity'%20dur='2s'%20repeatCount='indefinite'%20values='1;%201;%201;%201;%201;%201;%200.1;%201;%200.1;%201;%201;%200.1;%201;%200.1;%201'/%3e%3c/path%3e%3c/svg%3e", fa = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3clinearGradient%20id='b'%20x1='26.74'%20x2='35.76'%20y1='37.88'%20y2='53.52'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f7b23b'/%3e%3cstop%20offset='.45'%20stop-color='%23f7b23b'/%3e%3cstop%20offset='1'%20stop-color='%23f59e0b'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23a)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3cpath%20fill='url(%23b)'%20stroke='%23f6a823'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M30%2036l-4%2012h4l-2%2010%2010-14h-6l4-8h-6z'%3e%3canimate%20attributeName='opacity'%20dur='2s'%20repeatCount='indefinite'%20values='1;%201;%201;%201;%201;%201;%200.1;%201;%200.1;%201;%201;%200.1;%201;%200.1;%201'/%3e%3c/path%3e%3c/svg%3e", ga = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='b'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3clinearGradient%20id='a'%20x1='22.53'%20x2='25.47'%20y1='42.95'%20y2='48.05'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%234286ee'/%3e%3cstop%20offset='.45'%20stop-color='%234286ee'/%3e%3cstop%20offset='1'%20stop-color='%230950bc'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20x1='29.53'%20x2='32.47'%20y1='42.95'%20y2='48.05'%20xlink:href='%23a'/%3e%3clinearGradient%20id='d'%20x1='36.53'%20x2='39.47'%20y1='42.95'%20y2='48.05'%20xlink:href='%23a'/%3e%3c/defs%3e%3cpath%20fill='url(%23b)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3cpath%20fill='none'%20stroke='url(%23a)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M24.39%2043.03l-.78%204.94'%3e%3canimateTransform%20attributeName='transform'%20dur='0.7s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20dur='0.7s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3cpath%20fill='none'%20stroke='url(%23c)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M31.39%2043.03l-.78%204.94'%3e%3canimateTransform%20attributeName='transform'%20begin='-0.4s'%20dur='0.7s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20begin='-0.4s'%20dur='0.7s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3cpath%20fill='none'%20stroke='url(%23d)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M38.39%2043.03l-.78%204.94'%3e%3canimateTransform%20attributeName='transform'%20begin='-0.2s'%20dur='0.7s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20begin='-0.2s'%20dur='0.7s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3c/svg%3e", ma = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='b'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3clinearGradient%20id='a'%20x1='30.12'%20x2='31.88'%20y1='43.48'%20y2='46.52'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%2386c3db'/%3e%3cstop%20offset='.45'%20stop-color='%2386c3db'/%3e%3cstop%20offset='1'%20stop-color='%235eafcf'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20x1='29.67'%20x2='32.33'%20y1='42.69'%20y2='47.31'%20xlink:href='%23a'/%3e%3clinearGradient%20id='d'%20x1='23.12'%20x2='24.88'%20y1='43.48'%20y2='46.52'%20xlink:href='%23a'/%3e%3clinearGradient%20id='e'%20x1='22.67'%20x2='25.33'%20y1='42.69'%20y2='47.31'%20xlink:href='%23a'/%3e%3clinearGradient%20id='f'%20x1='37.12'%20x2='38.88'%20y1='43.48'%20y2='46.52'%20xlink:href='%23a'/%3e%3clinearGradient%20id='g'%20x1='36.67'%20x2='39.33'%20y1='42.69'%20y2='47.31'%20xlink:href='%23a'/%3e%3c/defs%3e%3cpath%20fill='url(%23b)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3cg%3e%3ccircle%20cx='31'%20cy='45'%20r='1.25'%20fill='none'%20stroke='url(%23a)'%20stroke-miterlimit='10'/%3e%3cpath%20fill='none'%20stroke='url(%23c)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20d='M33.17%2046.25l-1.09-.63m-2.16-1.24l-1.09-.63M31%2042.5v1.25m0%203.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20dur='4s'%20repeatCount='indefinite'%20type='translate'%20values='-1%20-6;%201%2012'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20dur='9s'%20repeatCount='indefinite'%20type='rotate'%20values='0%2031%2045;%20360%2031%2045'/%3e%3canimate%20attributeName='opacity'%20dur='4s'%20repeatCount='indefinite'%20values='0;1;1;1;0'/%3e%3c/g%3e%3cg%3e%3ccircle%20cx='24'%20cy='45'%20r='1.25'%20fill='none'%20stroke='url(%23d)'%20stroke-miterlimit='10'/%3e%3cpath%20fill='none'%20stroke='url(%23e)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20d='M26.17%2046.25l-1.09-.63m-2.16-1.24l-1.09-.63M24%2042.5v1.25m0%203.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20begin='-2s'%20dur='4s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-6;%20-1%2012'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20dur='9s'%20repeatCount='indefinite'%20type='rotate'%20values='0%2024%2045;%20360%2024%2045'/%3e%3canimate%20attributeName='opacity'%20begin='-2s'%20dur='4s'%20repeatCount='indefinite'%20values='0;1;1;1;0'/%3e%3c/g%3e%3cg%3e%3ccircle%20cx='38'%20cy='45'%20r='1.25'%20fill='none'%20stroke='url(%23f)'%20stroke-miterlimit='10'/%3e%3cpath%20fill='none'%20stroke='url(%23g)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20d='M40.17%2046.25l-1.09-.63m-2.16-1.24l-1.09-.63M38%2042.5v1.25m0%203.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20begin='-1s'%20dur='4s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-6;%20-1%2012'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20dur='9s'%20repeatCount='indefinite'%20type='rotate'%20values='0%2038%2045;%20360%2038%2045'/%3e%3canimate%20attributeName='opacity'%20begin='-1s'%20dur='4s'%20repeatCount='indefinite'%20values='0;1;1;1;0'/%3e%3c/g%3e%3c/svg%3e", ya = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='c'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3clinearGradient%20id='a'%20x1='23.12'%20x2='24.88'%20y1='43.48'%20y2='46.52'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%2386c3db'/%3e%3cstop%20offset='.45'%20stop-color='%2386c3db'/%3e%3cstop%20offset='1'%20stop-color='%235eafcf'/%3e%3c/linearGradient%3e%3clinearGradient%20id='d'%20x1='22.67'%20x2='25.33'%20y1='42.69'%20y2='47.31'%20xlink:href='%23a'/%3e%3clinearGradient%20id='e'%20x1='37.12'%20x2='38.88'%20y1='43.48'%20y2='46.52'%20xlink:href='%23a'/%3e%3clinearGradient%20id='f'%20x1='36.67'%20x2='39.33'%20y1='42.69'%20y2='47.31'%20xlink:href='%23a'/%3e%3clinearGradient%20id='b'%20x1='23.31'%20x2='24.69'%20y1='44.3'%20y2='46.7'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%234286ee'/%3e%3cstop%20offset='.45'%20stop-color='%234286ee'/%3e%3cstop%20offset='1'%20stop-color='%230950bc'/%3e%3c/linearGradient%3e%3clinearGradient%20id='g'%20x1='30.31'%20x2='31.69'%20y1='44.3'%20y2='46.7'%20xlink:href='%23b'/%3e%3clinearGradient%20id='h'%20x1='37.31'%20x2='38.69'%20y1='44.3'%20y2='46.7'%20xlink:href='%23b'/%3e%3c/defs%3e%3cpath%20fill='url(%23c)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3cg%3e%3ccircle%20cx='24'%20cy='45'%20r='1.25'%20fill='none'%20stroke='url(%23a)'%20stroke-miterlimit='10'/%3e%3cpath%20fill='none'%20stroke='url(%23d)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20d='M26.17%2046.25l-1.09-.63m-2.16-1.24l-1.09-.63M24%2042.5v1.25m0%203.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20begin='-2s'%20dur='4s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-6;%20-1%2012'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20dur='9s'%20repeatCount='indefinite'%20type='rotate'%20values='0%2024%2045;%20360%2024%2045'/%3e%3canimate%20attributeName='opacity'%20begin='-2s'%20dur='4s'%20repeatCount='indefinite'%20values='0;1;1;1;0'/%3e%3c/g%3e%3cg%3e%3ccircle%20cx='38'%20cy='45'%20r='1.25'%20fill='none'%20stroke='url(%23e)'%20stroke-miterlimit='10'/%3e%3cpath%20fill='none'%20stroke='url(%23f)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20d='M40.17%2046.25l-1.09-.63m-2.16-1.24l-1.09-.63M38%2042.5v1.25m0%203.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20begin='-1s'%20dur='4s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-6;%20-1%2012'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20dur='9s'%20repeatCount='indefinite'%20type='rotate'%20values='0%2038%2045;%20360%2038%2045'/%3e%3canimate%20attributeName='opacity'%20begin='-1s'%20dur='4s'%20repeatCount='indefinite'%20values='0;1;1;1;0'/%3e%3c/g%3e%3cpath%20fill='none'%20stroke='url(%23b)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M24.08%2045.01l-.16.98'%3e%3canimateTransform%20attributeName='transform'%20dur='1.5s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20dur='1.5s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3cpath%20fill='none'%20stroke='url(%23g)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M31.08%2045.01l-.16.98'%3e%3canimateTransform%20attributeName='transform'%20begin='-0.5s'%20dur='1.5s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20begin='-0.5s'%20dur='1.5s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3cpath%20fill='none'%20stroke='url(%23h)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M38.08%2045.01l-.16.98'%3e%3canimateTransform%20attributeName='transform'%20begin='-1s'%20dur='1.5s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20begin='-1s'%20dur='1.5s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3c/svg%3e", _a = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='21.97'%20x2='42.03'%20y1='14.63'%20y2='49.37'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23d4d7dd'/%3e%3cstop%20offset='.45'%20stop-color='%23d4d7dd'/%3e%3cstop%20offset='1'%20stop-color='%23bec1c6'/%3e%3canimateTransform%20attributeName='gradientTransform'%20dur='1s'%20repeatCount='indefinite'%20type='rotate'%20values='0%2032%2032;%20360%2032%2032'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='none'%20stroke='url(%23a)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='3'%20d='M43%2032a11%2011%200%2011-11-11%2011%2011%200%200111%2011zM25%2014.61l-.48%201a33.68%2033.68%200%2000-3.42%2017.82h0M39%2049.39l.48-1a33.68%2033.68%200%20003.42-17.82h0'%3e%3canimateTransform%20attributeName='transform'%20dur='1s'%20repeatCount='indefinite'%20type='rotate'%20values='360%2032%2032;%200%2032%2032'/%3e%3c/path%3e%3c/svg%3e", Nn = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='27.56'%20x2='38.27'%20y1='17.64'%20y2='36.19'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23d4d7dd'/%3e%3cstop%20offset='.45'%20stop-color='%23d4d7dd'/%3e%3cstop%20offset='1'%20stop-color='%23bec1c6'/%3e%3c/linearGradient%3e%3clinearGradient%20id='b'%20x1='19.96'%20x2='31.37'%20y1='29.03'%20y2='48.8'%20xlink:href='%23a'/%3e%3c/defs%3e%3cpath%20fill='none'%20stroke='url(%23a)'%20stroke-dasharray='35%2022'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='3'%20d='M43.64%2020a5%205%200%20113.61%208.46h-35.5'%3e%3canimate%20attributeName='stroke-dashoffset'%20dur='2s'%20repeatCount='indefinite'%20values='-57;%2057'/%3e%3c/path%3e%3cpath%20fill='none'%20stroke='url(%23b)'%20stroke-dasharray='24%2015'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='3'%20d='M29.14%2044a5%205%200%20103.61-8.46h-21'%3e%3canimate%20attributeName='stroke-dashoffset'%20begin='-1.5s'%20dur='2s'%20repeatCount='indefinite'%20values='-39;%2039'/%3e%3c/path%3e%3c/svg%3e", ki = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='26.75'%20x2='37.25'%20y1='22.91'%20y2='41.09'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23fbbf24'/%3e%3cstop%20offset='.45'%20stop-color='%23fbbf24'/%3e%3cstop%20offset='1'%20stop-color='%23f59e0b'/%3e%3c/linearGradient%3e%3c/defs%3e%3ccircle%20cx='32'%20cy='32'%20r='10.5'%20fill='url(%23a)'%20stroke='%23f8af18'%20stroke-miterlimit='10'%20stroke-width='.5'/%3e%3cpath%20fill='none'%20stroke='%23fbbf24'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='3'%20d='M32%2015.71V9.5m0%2045v-6.21m11.52-27.81l4.39-4.39M16.09%2047.91l4.39-4.39m0-23l-4.39-4.39m31.82%2031.78l-4.39-4.39M15.71%2032H9.5m45%200h-6.21'%3e%3canimateTransform%20attributeName='transform'%20dur='45s'%20repeatCount='indefinite'%20type='rotate'%20values='0%2032%2032;%20360%2032%2032'/%3e%3c/path%3e%3c/svg%3e", ba = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20512%20512'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='52.7'%20x2='133.4'%20y1='9.6'%20y2='149.3'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%239ca3af'/%3e%3cstop%20offset='.5'%20stop-color='%239ca3af'/%3e%3cstop%20offset='1'%20stop-color='%236b7280'/%3e%3c/linearGradient%3e%3clinearGradient%20id='b'%20x1='99.5'%20x2='232.6'%20y1='30.7'%20y2='261.4'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%236b7280'/%3e%3cstop%20offset='.5'%20stop-color='%236b7280'/%3e%3cstop%20offset='1'%20stop-color='%234b5563'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20x1='1381.3'%20x2='1399.5'%20y1='-1144.7'%20y2='-1097.4'%20gradientTransform='rotate(-9%208002.567%208233.063)'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%230b65ed'/%3e%3cstop%20offset='.5'%20stop-color='%230a5ad4'/%3e%3cstop%20offset='1'%20stop-color='%230950bc'/%3e%3c/linearGradient%3e%3clinearGradient%20xlink:href='%23c'%20id='d'%20x1='1436.7'%20x2='1454.9'%20y1='-1137'%20y2='-1089.7'%20gradientTransform='rotate(-9%208009.537%208233.037)'/%3e%3clinearGradient%20xlink:href='%23c'%20id='e'%20x1='1492.1'%20x2='1510.3'%20y1='-1129.3'%20y2='-1082.1'%20gradientTransform='rotate(-9%208016.566%208233.078)'/%3e%3csymbol%20id='g'%20viewBox='0%200%20200.3%20126.1'%3e%3cpath%20fill='url(%23a)'%20stroke='%23848b98'%20stroke-miterlimit='10'%20d='M.5%2093.2a32.4%2032.4%200%200032.4%2032.4h129.8v-.1l2.3.1a34.8%2034.8%200%20006.5-68.9%2032.4%2032.4%200%2000-48.5-33%2048.6%2048.6%200%2000-88.6%2037.1h-1.5A32.4%2032.4%200%2000.5%2093.1Z'/%3e%3c/symbol%3e%3csymbol%20id='h'%20viewBox='0%200%20350%20222'%3e%3cpath%20fill='url(%23b)'%20stroke='%235b6472'%20stroke-miterlimit='10'%20stroke-width='6'%20d='m291%20107-2.5.1A83.9%2083.9%200%2000135.6%2043%2056%2056%200%200051%2091a56.6%2056.6%200%2000.8%209A60%2060%200%200063%20219l4-.2v.2h224a56%2056%200%20000-112Z'/%3e%3c/symbol%3e%3csymbol%20id='f'%20overflow='visible'%20viewBox='0%200%20398%20222'%3e%3cuse%20xlink:href='%23g'%20width='200.3'%20height='126.1'%20transform='translate(198%2027)'%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20dur='6s'%20repeatCount='indefinite'%20type='translate'%20values='-9%200;%209%200;%20-9%200'/%3e%3c/use%3e%3cuse%20xlink:href='%23h'%20width='350'%20height='222'%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20dur='6s'%20repeatCount='indefinite'%20type='translate'%20values='-18%200;%2018%200;%20-18%200'/%3e%3c/use%3e%3c/symbol%3e%3csymbol%20id='i'%20overflow='visible'%20viewBox='0%200%20129%2057'%3e%3cpath%20fill='url(%23c)'%20stroke='%230a5ad4'%20stroke-miterlimit='10'%20d='M8.5%2056.5a8%208%200%2001-8-8v-40a8%208%200%200116%200v40a8%208%200%2001-8%208Z'%20opacity='0'%3e%3canimateTransform%20id='x1'%20additive='sum'%20attributeName='transform'%20begin='0s;%20x1.end+.33s'%20dur='.67s'%20type='translate'%20values='0%20-60;%200%2060'/%3e%3canimate%20id='y1'%20attributeName='opacity'%20begin='0s;%20y1.end+.33s'%20dur='.67s'%20keyTimes='0;%20.25;%201'%20values='0;%201;%200'/%3e%3c/path%3e%3cpath%20fill='url(%23d)'%20stroke='%230a5ad4'%20stroke-miterlimit='10'%20d='M64.5%2056.5a8%208%200%2001-8-8v-40a8%208%200%200116%200v40a8%208%200%2001-8%208Z'%20opacity='0'%3e%3canimateTransform%20id='x2'%20additive='sum'%20attributeName='transform'%20begin='.33s;%20x2.end+.33s'%20dur='.67s'%20type='translate'%20values='0%20-60;%200%2060'/%3e%3canimate%20id='y2'%20attributeName='opacity'%20begin='.33s;%20y2.end+.33s'%20dur='.67s'%20keyTimes='0;%20.25;%201'%20values='0;%201;%200'/%3e%3c/path%3e%3cpath%20fill='url(%23e)'%20stroke='%230a5ad4'%20stroke-miterlimit='10'%20d='M120.5%2056.5a8%208%200%2001-8-8v-40a8%208%200%200116%200v40a8%208%200%2001-8%208Z'%20opacity='0'%3e%3canimateTransform%20id='x3'%20additive='sum'%20attributeName='transform'%20begin='-.33s;%20x3.end+.33s'%20dur='.67s'%20type='translate'%20values='0%20-60;%200%2060'/%3e%3canimate%20id='y3'%20attributeName='opacity'%20begin='-.33s;%20y3.end+.33s'%20dur='.67s'%20keyTimes='0;%20.25;%201'%20values='0;%201;%200'/%3e%3c/path%3e%3c/symbol%3e%3c/defs%3e%3cuse%20xlink:href='%23f'%20width='398'%20height='222'%20transform='translate(68.84%20145)'/%3e%3cuse%20xlink:href='%23i'%20width='129'%20height='57'%20transform='translate(191.5%20343.5)'/%3e%3c/svg%3e";
var wa = "M6,19A5,5 0 0,1 1,14A5,5 0 0,1 6,9C7,6.65 9.3,5 12,5C15.43,5 18.24,7.66 18.5,11.03L19,11A4,4 0 0,1 23,15A4,4 0 0,1 19,19H6M19,13H17V12A5,5 0 0,0 12,7C9.5,7 7.45,8.82 7.06,11.19C6.73,11.07 6.37,11 6,11A3,3 0 0,0 3,14A3,3 0 0,0 6,17H19A2,2 0 0,0 21,15A2,2 0 0,0 19,13Z", xa = "M3,15H13A1,1 0 0,1 14,16A1,1 0 0,1 13,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15M16,15H21A1,1 0 0,1 22,16A1,1 0 0,1 21,17H16A1,1 0 0,1 15,16A1,1 0 0,1 16,15M1,12A5,5 0 0,1 6,7C7,4.65 9.3,3 12,3C15.43,3 18.24,5.66 18.5,9.03L19,9C21.19,9 22.97,10.76 23,13H21A2,2 0 0,0 19,11H17V10A5,5 0 0,0 12,5C9.5,5 7.45,6.82 7.06,9.19C6.73,9.07 6.37,9 6,9A3,3 0 0,0 3,12C3,12.35 3.06,12.69 3.17,13H1.1L1,12M3,19H5A1,1 0 0,1 6,20A1,1 0 0,1 5,21H3A1,1 0 0,1 2,20A1,1 0 0,1 3,19M8,19H21A1,1 0 0,1 22,20A1,1 0 0,1 21,21H8A1,1 0 0,1 7,20A1,1 0 0,1 8,19Z", va = "M6,14A1,1 0 0,1 7,15A1,1 0 0,1 6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14M10,18A2,2 0 0,1 12,20A2,2 0 0,1 10,22A2,2 0 0,1 8,20A2,2 0 0,1 10,18M14.5,16A1.5,1.5 0 0,1 16,17.5A1.5,1.5 0 0,1 14.5,19A1.5,1.5 0 0,1 13,17.5A1.5,1.5 0 0,1 14.5,16M10.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,15A1.5,1.5 0 0,1 9,13.5A1.5,1.5 0 0,1 10.5,12Z", $a = "M15,6.79C16.86,7.86 18,9.85 18,12C18,22 6,22 6,22C7.25,21.06 8.38,19.95 9.34,18.71C9.38,18.66 9.41,18.61 9.44,18.55C9.69,18.06 9.5,17.46 9,17.21C7.14,16.14 6,14.15 6,12C6,2 18,2 18,2C16.75,2.94 15.62,4.05 14.66,5.29C14.62,5.34 14.59,5.39 14.56,5.45C14.31,5.94 14.5,6.54 15,6.79M12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14Z", ka = "M6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14H7A1,1 0 0,1 8,15A1,1 0 0,1 7,16H6M12,11H15L13,15H15L11.25,22L12,17H9.5L12,11Z", Ca = "M4.5,13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.44 4,15.6 3.5,15.33V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16A1,1 0 0,1 18,15A1,1 0 0,1 19,14A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59M9.5,11H12.5L10.5,15H12.5L8.75,22L9.5,17H7L9.5,11M17.5,18.67C17.5,19.96 16.5,21 15.25,21C14,21 13,19.96 13,18.67C13,17.12 15.25,14.5 15.25,14.5C15.25,14.5 17.5,17.12 17.5,18.67Z", Aa = "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z", Sa = "M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z", Ma = "M9,12C9.53,12.14 9.85,12.69 9.71,13.22L8.41,18.05C8.27,18.59 7.72,18.9 7.19,18.76C6.65,18.62 6.34,18.07 6.5,17.54L7.78,12.71C7.92,12.17 8.47,11.86 9,12M13,12C13.53,12.14 13.85,12.69 13.71,13.22L11.64,20.95C11.5,21.5 10.95,21.8 10.41,21.66C9.88,21.5 9.56,20.97 9.7,20.43L11.78,12.71C11.92,12.17 12.47,11.86 13,12M17,12C17.53,12.14 17.85,12.69 17.71,13.22L16.41,18.05C16.27,18.59 15.72,18.9 15.19,18.76C14.65,18.62 14.34,18.07 14.5,17.54L15.78,12.71C15.92,12.17 16.47,11.86 17,12M17,10V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.43 4,15.6 3.5,15.32V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12C23,13.5 22.2,14.77 21,15.46V15.46C20.5,15.73 19.91,15.57 19.63,15.09C19.36,14.61 19.5,14 20,13.72V13.73C20.6,13.39 21,12.74 21,12A2,2 0 0,0 19,10H17Z", za = "M6,14.03A1,1 0 0,1 7,15.03C7,15.58 6.55,16.03 6,16.03C3.24,16.03 1,13.79 1,11.03C1,8.27 3.24,6.03 6,6.03C7,3.68 9.3,2.03 12,2.03C15.43,2.03 18.24,4.69 18.5,8.06L19,8.03A4,4 0 0,1 23,12.03C23,14.23 21.21,16.03 19,16.03H18C17.45,16.03 17,15.58 17,15.03C17,14.47 17.45,14.03 18,14.03H19A2,2 0 0,0 21,12.03A2,2 0 0,0 19,10.03H17V9.03C17,6.27 14.76,4.03 12,4.03C9.5,4.03 7.45,5.84 7.06,8.21C6.73,8.09 6.37,8.03 6,8.03A3,3 0 0,0 3,11.03A3,3 0 0,0 6,14.03M12,14.15C12.18,14.39 12.37,14.66 12.56,14.94C13,15.56 14,17.03 14,18C14,19.11 13.1,20 12,20A2,2 0 0,1 10,18C10,17.03 11,15.56 11.44,14.94C11.63,14.66 11.82,14.4 12,14.15M12,11.03L11.5,11.59C11.5,11.59 10.65,12.55 9.79,13.81C8.93,15.06 8,16.56 8,18A4,4 0 0,0 12,22A4,4 0 0,0 16,18C16,16.56 15.07,15.06 14.21,13.81C13.35,12.55 12.5,11.59 12.5,11.59", La = "M6,14A1,1 0 0,1 7,15A1,1 0 0,1 6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14M7.88,18.07L10.07,17.5L8.46,15.88C8.07,15.5 8.07,14.86 8.46,14.46C8.85,14.07 9.5,14.07 9.88,14.46L11.5,16.07L12.07,13.88C12.21,13.34 12.76,13.03 13.29,13.17C13.83,13.31 14.14,13.86 14,14.4L13.41,16.59L15.6,16C16.14,15.86 16.69,16.17 16.83,16.71C16.97,17.24 16.66,17.79 16.12,17.93L13.93,18.5L15.54,20.12C15.93,20.5 15.93,21.15 15.54,21.54C15.15,21.93 14.5,21.93 14.12,21.54L12.5,19.93L11.93,22.12C11.79,22.66 11.24,22.97 10.71,22.83C10.17,22.69 9.86,22.14 10,21.6L10.59,19.41L8.4,20C7.86,20.14 7.31,19.83 7.17,19.29C7.03,18.76 7.34,18.21 7.88,18.07Z", Ea = "M18.5,18.67C18.5,19.96 17.5,21 16.25,21C15,21 14,19.96 14,18.67C14,17.12 16.25,14.5 16.25,14.5C16.25,14.5 18.5,17.12 18.5,18.67M4,17.36C3.86,16.82 4.18,16.25 4.73,16.11L7,15.5L5.33,13.86C4.93,13.46 4.93,12.81 5.33,12.4C5.73,12 6.4,12 6.79,12.4L8.45,14.05L9.04,11.8C9.18,11.24 9.75,10.92 10.29,11.07C10.85,11.21 11.17,11.78 11,12.33L10.42,14.58L12.67,14C13.22,13.83 13.79,14.15 13.93,14.71C14.08,15.25 13.76,15.82 13.2,15.96L10.95,16.55L12.6,18.21C13,18.6 13,19.27 12.6,19.67C12.2,20.07 11.54,20.07 11.15,19.67L9.5,18L8.89,20.27C8.75,20.83 8.18,21.14 7.64,21C7.08,20.86 6.77,20.29 6.91,19.74L7.5,17.5L5.26,18.09C4.71,18.23 4.14,17.92 4,17.36M1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16A1,1 0 0,1 18,15A1,1 0 0,1 19,14A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,11.85 3.35,12.61 3.91,13.16C4.27,13.55 4.26,14.16 3.88,14.54C3.5,14.93 2.85,14.93 2.47,14.54C1.56,13.63 1,12.38 1,11Z", pr = "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z", Na = "M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z", Ta = "M6,6L6.69,6.06C7.32,3.72 9.46,2 12,2A5.5,5.5 0 0,1 17.5,7.5L17.42,8.45C17.88,8.16 18.42,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H6A4,4 0 0,1 2,10A4,4 0 0,1 6,6M6,8A2,2 0 0,0 4,10A2,2 0 0,0 6,12H19A1,1 0 0,0 20,11A1,1 0 0,0 19,10H15.5V7.5A3.5,3.5 0 0,0 12,4A3.5,3.5 0 0,0 8.5,7.5V8H6M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z";
const I = (n, e) => n ? (e || (e = "24px"), c`<ha-icon
    .icon="${n}"
    style="font-size:${e}; width: ${e}; height: ${e}"
  />`) : c`<ha-icon
      icon="mdi:weather-sunny"
      style="font-size:${e}; width: ${e}; height: ${e}"
    />`, V = (n, e) => n ? (e || (e = "24px"), w`<svg height=${e} width=${e} viewport="0 0 48 48"><path d="${n}" /></svg>`) : w`<svg height=${e} width=${e} viewport="0 0 48 48"><path d="${pr}" /></svg>`, Et = (n, e, t, i) => {
  if (!n)
    return I("mdi:weather-sunny", t);
  const r = String(n).trim().toLowerCase(), s = {
    "clear-night": V(Aa, t),
    cloudy: V(wa, t),
    fog: V(xa, t),
    hail: V(va, t),
    lightning: V(ka, t),
    "lightning-rainy": V(Ca, t),
    partlycloudy: V(Sa, t),
    pouring: V(Ma, t),
    rainy: V(za, t),
    snowy: V(La, t),
    "snowy-rainy": V(Ea, t),
    sunny: V(pr, t),
    windy: V(Na, t),
    "windy-variant": V(Ta, t),
    exceptional: V($a, t)
  }, o = {
    "clear-night": I("mdi:weather-night", t),
    cloudy: I("mdi:weather-cloudy", t),
    fog: I("mdi:weather-fog", t),
    hail: I("mdi:weather-hail", t),
    lightning: I("mdi:weather-lightning", t),
    "lightning-rainy": I("mdi:weather-lightning-rainy", t),
    partlycloudy: I("mdi:weather-partly-cloudy", t),
    pouring: I("mdi:weather-pouring", t),
    rainy: I("mdi:weather-rainy", t),
    snowy: I("mdi:weather-snowy", t),
    "snowy-rainy": I("mdi:weather-snowy-rainy", t),
    sunny: I("mdi:weather-sunny", t),
    windy: I("mdi:weather-windy", t),
    "windy-variant": I("mdi:weather-windy-variant", t),
    exceptional: I("mdi:weather-hurricane", t)
  }, l = {
    "clear-night": c`<img src="${aa}" style="font-size:${t}" />`,
    cloudy: c`<img src="${la}" style="font-size:${t}" />`,
    fog: c`<img src="${ha}" style="font-size:${t}" />`,
    hail: c`<img src="${pa}" style="font-size:${t}" />`,
    lightning: c`<img src="${fa}" style="font-size:${t}" />`,
    "lightning-rainy": c`<img src="${ua}" style="font-size:${t}" />`,
    partlycloudy: c`<img
      src="${i ? ca : da}"
      style="font-size:${t}"
    />`,
    pouring: c`<img src="${ba}" style="font-size:${t}" />`,
    rainy: c`<img src="${ga}" style="font-size:${t}" />`,
    snowy: c`<img src="${ma}" style="font-size:${t}" />`,
    "snowy-rainy": c`<img src="${ya}" style="font-size:${t}" />`,
    sunny: c`<img src="${ki}" style="font-size:${t}" />`,
    windy: c`<img src="${Nn}" style="font-size:${t}" />`,
    "windy-variant": c`<img src="${Nn}" style="font-size:${t}" />`,
    exceptional: c`<img src="${_a}" style="font-size:${t}" />`
  };
  return e === "mdi" ? o[r] || I("mdi:weather-sunny", t) : e === "mdiAsSVG" ? s[r] || c`<img src="${ki}" />` : l[r] || c`<img src="${ki}" />`;
};
function Ii() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
}
let Be = Ii();
function ur(n) {
  Be = n;
}
const fr = /[&<>"']/, Oa = new RegExp(fr.source, "g"), gr = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, Ha = new RegExp(gr.source, "g"), Da = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Tn = (n) => Da[n];
function J(n, e) {
  if (e) {
    if (fr.test(n))
      return n.replace(Oa, Tn);
  } else if (gr.test(n))
    return n.replace(Ha, Tn);
  return n;
}
const Pa = /(^|[^\[])\^/g;
function E(n, e) {
  let t = typeof n == "string" ? n : n.source;
  e = e || "";
  const i = {
    replace: (r, s) => {
      let o = typeof s == "string" ? s : s.source;
      return o = o.replace(Pa, "$1"), t = t.replace(r, o), i;
    },
    getRegex: () => new RegExp(t, e)
  };
  return i;
}
function On(n) {
  try {
    n = encodeURI(n).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return n;
}
const kt = { exec: () => null };
function Hn(n, e) {
  const t = n.replace(/\|/g, (s, o, l) => {
    let a = !1, h = o;
    for (; --h >= 0 && l[h] === "\\"; )
      a = !a;
    return a ? "|" : " |";
  }), i = t.split(/ \|/);
  let r = 0;
  if (i[0].trim() || i.shift(), i.length > 0 && !i[i.length - 1].trim() && i.pop(), e)
    if (i.length > e)
      i.splice(e);
    else
      for (; i.length < e; )
        i.push("");
  for (; r < i.length; r++)
    i[r] = i[r].trim().replace(/\\\|/g, "|");
  return i;
}
function wt(n, e, t) {
  const i = n.length;
  if (i === 0)
    return "";
  let r = 0;
  for (; r < i && n.charAt(i - r - 1) === e; )
    r++;
  return n.slice(0, i - r);
}
function Ra(n, e) {
  if (n.indexOf(e[1]) === -1)
    return -1;
  let t = 0;
  for (let i = 0; i < n.length; i++)
    if (n[i] === "\\")
      i++;
    else if (n[i] === e[0])
      t++;
    else if (n[i] === e[1] && (t--, t < 0))
      return i;
  return -1;
}
function Dn(n, e, t, i) {
  const r = e.href, s = e.title ? J(e.title) : null, o = n[1].replace(/\\([\[\]])/g, "$1");
  if (n[0].charAt(0) !== "!") {
    i.state.inLink = !0;
    const l = {
      type: "link",
      raw: t,
      href: r,
      title: s,
      text: o,
      tokens: i.inlineTokens(o)
    };
    return i.state.inLink = !1, l;
  }
  return {
    type: "image",
    raw: t,
    href: r,
    title: s,
    text: J(o)
  };
}
function Fa(n, e) {
  const t = n.match(/^(\s+)(?:```)/);
  if (t === null)
    return e;
  const i = t[1];
  return e.split(`
`).map((r) => {
    const s = r.match(/^\s+/);
    if (s === null)
      return r;
    const [o] = s;
    return o.length >= i.length ? r.slice(i.length) : r;
  }).join(`
`);
}
class Kt {
  options;
  rules;
  // set by the lexer
  lexer;
  // set by the lexer
  constructor(e) {
    this.options = e || Be;
  }
  space(e) {
    const t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0)
      return {
        type: "space",
        raw: t[0]
      };
  }
  code(e) {
    const t = this.rules.block.code.exec(e);
    if (t) {
      const i = t[0].replace(/^(?: {1,4}| {0,3}\t)/gm, "");
      return {
        type: "code",
        raw: t[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? i : wt(i, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const i = t[0], r = Fa(i, t[3] || "");
      return {
        type: "code",
        raw: i,
        lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
        text: r
      };
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e);
    if (t) {
      let i = t[2].trim();
      if (/#$/.test(i)) {
        const r = wt(i, "#");
        (this.options.pedantic || !r || / $/.test(r)) && (i = r.trim());
      }
      return {
        type: "heading",
        raw: t[0],
        depth: t[1].length,
        text: i,
        tokens: this.lexer.inline(i)
      };
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e);
    if (t)
      return {
        type: "hr",
        raw: wt(t[0], `
`)
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let i = wt(t[0], `
`).split(`
`), r = "", s = "";
      const o = [];
      for (; i.length > 0; ) {
        let l = !1;
        const a = [];
        let h;
        for (h = 0; h < i.length; h++)
          if (/^ {0,3}>/.test(i[h]))
            a.push(i[h]), l = !0;
          else if (!l)
            a.push(i[h]);
          else
            break;
        i = i.slice(h);
        const d = a.join(`
`), p = d.replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, `
    $1`).replace(/^ {0,3}>[ \t]?/gm, "");
        r = r ? `${r}
${d}` : d, s = s ? `${s}
${p}` : p;
        const f = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(p, o, !0), this.lexer.state.top = f, i.length === 0)
          break;
        const g = o[o.length - 1];
        if (g?.type === "code")
          break;
        if (g?.type === "blockquote") {
          const b = g, k = b.raw + `
` + i.join(`
`), x = this.blockquote(k);
          o[o.length - 1] = x, r = r.substring(0, r.length - b.raw.length) + x.raw, s = s.substring(0, s.length - b.text.length) + x.text;
          break;
        } else if (g?.type === "list") {
          const b = g, k = b.raw + `
` + i.join(`
`), x = this.list(k);
          o[o.length - 1] = x, r = r.substring(0, r.length - g.raw.length) + x.raw, s = s.substring(0, s.length - b.raw.length) + x.raw, i = k.substring(o[o.length - 1].raw.length).split(`
`);
          continue;
        }
      }
      return {
        type: "blockquote",
        raw: r,
        tokens: o,
        text: s
      };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let i = t[1].trim();
      const r = i.length > 1, s = {
        type: "list",
        raw: "",
        ordered: r,
        start: r ? +i.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      i = r ? `\\d{1,9}\\${i.slice(-1)}` : `\\${i}`, this.options.pedantic && (i = r ? i : "[*+-]");
      const o = new RegExp(`^( {0,3}${i})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let l = !1;
      for (; e; ) {
        let a = !1, h = "", d = "";
        if (!(t = o.exec(e)) || this.rules.block.hr.test(e))
          break;
        h = t[0], e = e.substring(h.length);
        let p = t[2].split(`
`, 1)[0].replace(/^\t+/, (L) => " ".repeat(3 * L.length)), f = e.split(`
`, 1)[0], g = !p.trim(), b = 0;
        if (this.options.pedantic ? (b = 2, d = p.trimStart()) : g ? b = t[1].length + 1 : (b = t[2].search(/[^ ]/), b = b > 4 ? 1 : b, d = p.slice(b), b += t[1].length), g && /^[ \t]*$/.test(f) && (h += f + `
`, e = e.substring(f.length + 1), a = !0), !a) {
          const L = new RegExp(`^ {0,${Math.min(3, b - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), P = new RegExp(`^ {0,${Math.min(3, b - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), H = new RegExp(`^ {0,${Math.min(3, b - 1)}}(?:\`\`\`|~~~)`), B = new RegExp(`^ {0,${Math.min(3, b - 1)}}#`), j = new RegExp(`^ {0,${Math.min(3, b - 1)}}<(?:[a-z].*>|!--)`, "i");
          for (; e; ) {
            const C = e.split(`
`, 1)[0];
            let v;
            if (f = C, this.options.pedantic ? (f = f.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  "), v = f) : v = f.replace(/\t/g, "    "), H.test(f) || B.test(f) || j.test(f) || L.test(f) || P.test(f))
              break;
            if (v.search(/[^ ]/) >= b || !f.trim())
              d += `
` + v.slice(b);
            else {
              if (g || p.replace(/\t/g, "    ").search(/[^ ]/) >= 4 || H.test(p) || B.test(p) || P.test(p))
                break;
              d += `
` + f;
            }
            !g && !f.trim() && (g = !0), h += C + `
`, e = e.substring(C.length + 1), p = v.slice(b);
          }
        }
        s.loose || (l ? s.loose = !0 : /\n[ \t]*\n[ \t]*$/.test(h) && (l = !0));
        let k = null, x;
        this.options.gfm && (k = /^\[[ xX]\] /.exec(d), k && (x = k[0] !== "[ ] ", d = d.replace(/^\[[ xX]\] +/, ""))), s.items.push({
          type: "list_item",
          raw: h,
          task: !!k,
          checked: x,
          loose: !1,
          text: d,
          tokens: []
        }), s.raw += h;
      }
      s.items[s.items.length - 1].raw = s.items[s.items.length - 1].raw.trimEnd(), s.items[s.items.length - 1].text = s.items[s.items.length - 1].text.trimEnd(), s.raw = s.raw.trimEnd();
      for (let a = 0; a < s.items.length; a++)
        if (this.lexer.state.top = !1, s.items[a].tokens = this.lexer.blockTokens(s.items[a].text, []), !s.loose) {
          const h = s.items[a].tokens.filter((p) => p.type === "space"), d = h.length > 0 && h.some((p) => /\n.*\n/.test(p.raw));
          s.loose = d;
        }
      if (s.loose)
        for (let a = 0; a < s.items.length; a++)
          s.items[a].loose = !0;
      return s;
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e);
    if (t)
      return {
        type: "html",
        block: !0,
        raw: t[0],
        pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
        text: t[0]
      };
  }
  def(e) {
    const t = this.rules.block.def.exec(e);
    if (t) {
      const i = t[1].toLowerCase().replace(/\s+/g, " "), r = t[2] ? t[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", s = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return {
        type: "def",
        tag: i,
        raw: t[0],
        href: r,
        title: s
      };
    }
  }
  table(e) {
    const t = this.rules.block.table.exec(e);
    if (!t || !/[:|]/.test(t[2]))
      return;
    const i = Hn(t[1]), r = t[2].replace(/^\||\| *$/g, "").split("|"), s = t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split(`
`) : [], o = {
      type: "table",
      raw: t[0],
      header: [],
      align: [],
      rows: []
    };
    if (i.length === r.length) {
      for (const l of r)
        /^ *-+: *$/.test(l) ? o.align.push("right") : /^ *:-+: *$/.test(l) ? o.align.push("center") : /^ *:-+ *$/.test(l) ? o.align.push("left") : o.align.push(null);
      for (let l = 0; l < i.length; l++)
        o.header.push({
          text: i[l],
          tokens: this.lexer.inline(i[l]),
          header: !0,
          align: o.align[l]
        });
      for (const l of s)
        o.rows.push(Hn(l, o.header.length).map((a, h) => ({
          text: a,
          tokens: this.lexer.inline(a),
          header: !1,
          align: o.align[h]
        })));
      return o;
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e);
    if (t)
      return {
        type: "heading",
        raw: t[0],
        depth: t[2].charAt(0) === "=" ? 1 : 2,
        text: t[1],
        tokens: this.lexer.inline(t[1])
      };
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e);
    if (t) {
      const i = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return {
        type: "paragraph",
        raw: t[0],
        text: i,
        tokens: this.lexer.inline(i)
      };
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e);
    if (t)
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        tokens: this.lexer.inline(t[0])
      };
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e);
    if (t)
      return {
        type: "escape",
        raw: t[0],
        text: J(t[1])
      };
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e);
    if (t)
      return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: t[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: t[0]
      };
  }
  link(e) {
    const t = this.rules.inline.link.exec(e);
    if (t) {
      const i = t[2].trim();
      if (!this.options.pedantic && /^</.test(i)) {
        if (!/>$/.test(i))
          return;
        const o = wt(i.slice(0, -1), "\\");
        if ((i.length - o.length) % 2 === 0)
          return;
      } else {
        const o = Ra(t[2], "()");
        if (o > -1) {
          const a = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + o;
          t[2] = t[2].substring(0, o), t[0] = t[0].substring(0, a).trim(), t[3] = "";
        }
      }
      let r = t[2], s = "";
      if (this.options.pedantic) {
        const o = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r);
        o && (r = o[1], s = o[3]);
      } else
        s = t[3] ? t[3].slice(1, -1) : "";
      return r = r.trim(), /^</.test(r) && (this.options.pedantic && !/>$/.test(i) ? r = r.slice(1) : r = r.slice(1, -1)), Dn(t, {
        href: r && r.replace(this.rules.inline.anyPunctuation, "$1"),
        title: s && s.replace(this.rules.inline.anyPunctuation, "$1")
      }, t[0], this.lexer);
    }
  }
  reflink(e, t) {
    let i;
    if ((i = this.rules.inline.reflink.exec(e)) || (i = this.rules.inline.nolink.exec(e))) {
      const r = (i[2] || i[1]).replace(/\s+/g, " "), s = t[r.toLowerCase()];
      if (!s) {
        const o = i[0].charAt(0);
        return {
          type: "text",
          raw: o,
          text: o
        };
      }
      return Dn(i, s, i[0], this.lexer);
    }
  }
  emStrong(e, t, i = "") {
    let r = this.rules.inline.emStrongLDelim.exec(e);
    if (!r || r[3] && i.match(/[\p{L}\p{N}]/u))
      return;
    if (!(r[1] || r[2] || "") || !i || this.rules.inline.punctuation.exec(i)) {
      const o = [...r[0]].length - 1;
      let l, a, h = o, d = 0;
      const p = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (p.lastIndex = 0, t = t.slice(-1 * e.length + o); (r = p.exec(t)) != null; ) {
        if (l = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !l)
          continue;
        if (a = [...l].length, r[3] || r[4]) {
          h += a;
          continue;
        } else if ((r[5] || r[6]) && o % 3 && !((o + a) % 3)) {
          d += a;
          continue;
        }
        if (h -= a, h > 0)
          continue;
        a = Math.min(a, a + h + d);
        const f = [...r[0]][0].length, g = e.slice(0, o + r.index + f + a);
        if (Math.min(o, a) % 2) {
          const k = g.slice(1, -1);
          return {
            type: "em",
            raw: g,
            text: k,
            tokens: this.lexer.inlineTokens(k)
          };
        }
        const b = g.slice(2, -2);
        return {
          type: "strong",
          raw: g,
          text: b,
          tokens: this.lexer.inlineTokens(b)
        };
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e);
    if (t) {
      let i = t[2].replace(/\n/g, " ");
      const r = /[^ ]/.test(i), s = /^ /.test(i) && / $/.test(i);
      return r && s && (i = i.substring(1, i.length - 1)), i = J(i, !0), {
        type: "codespan",
        raw: t[0],
        text: i
      };
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e);
    if (t)
      return {
        type: "br",
        raw: t[0]
      };
  }
  del(e) {
    const t = this.rules.inline.del.exec(e);
    if (t)
      return {
        type: "del",
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2])
      };
  }
  autolink(e) {
    const t = this.rules.inline.autolink.exec(e);
    if (t) {
      let i, r;
      return t[2] === "@" ? (i = J(t[1]), r = "mailto:" + i) : (i = J(t[1]), r = i), {
        type: "link",
        raw: t[0],
        text: i,
        href: r,
        tokens: [
          {
            type: "text",
            raw: i,
            text: i
          }
        ]
      };
    }
  }
  url(e) {
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let i, r;
      if (t[2] === "@")
        i = J(t[0]), r = "mailto:" + i;
      else {
        let s;
        do
          s = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
        while (s !== t[0]);
        i = J(t[0]), t[1] === "www." ? r = "http://" + t[0] : r = t[0];
      }
      return {
        type: "link",
        raw: t[0],
        text: i,
        href: r,
        tokens: [
          {
            type: "text",
            raw: i,
            text: i
          }
        ]
      };
    }
  }
  inlineText(e) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      let i;
      return this.lexer.state.inRawBlock ? i = t[0] : i = J(t[0]), {
        type: "text",
        raw: t[0],
        text: i
      };
    }
  }
}
const Ga = /^(?:[ \t]*(?:\n|$))+/, Wa = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Ua = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Dt = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Ia = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, mr = /(?:[*+-]|\d{1,9}[.)])/, yr = E(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, mr).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), Bi = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Ba = /^[^\n]+/, ji = /(?!\s*\])(?:\\.|[^\[\]\\])+/, ja = E(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ji).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), qa = E(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, mr).getRegex(), ci = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", qi = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Va = E("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", qi).replace("tag", ci).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), _r = E(Bi).replace("hr", Dt).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ci).getRegex(), Za = E(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", _r).getRegex(), Vi = {
  blockquote: Za,
  code: Wa,
  def: ja,
  fences: Ua,
  heading: Ia,
  hr: Dt,
  html: Va,
  lheading: yr,
  list: qa,
  newline: Ga,
  paragraph: _r,
  table: kt,
  text: Ba
}, Pn = E("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Dt).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ci).getRegex(), Ka = {
  ...Vi,
  table: Pn,
  paragraph: E(Bi).replace("hr", Dt).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Pn).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ci).getRegex()
}, Ya = {
  ...Vi,
  html: E(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", qi).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: kt,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: E(Bi).replace("hr", Dt).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", yr).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, br = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Qa = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, wr = /^( {2,}|\\)\n(?!\s*$)/, Xa = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Pt = "\\p{P}\\p{S}", Ja = E(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, Pt).getRegex(), el = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, tl = E(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, Pt).getRegex(), il = E("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, Pt).getRegex(), nl = E("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, Pt).getRegex(), rl = E(/\\([punct])/, "gu").replace(/punct/g, Pt).getRegex(), sl = E(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), ol = E(qi).replace("(?:-->|$)", "-->").getRegex(), al = E("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", ol).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Yt = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, ll = E(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", Yt).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), xr = E(/^!?\[(label)\]\[(ref)\]/).replace("label", Yt).replace("ref", ji).getRegex(), vr = E(/^!?\[(ref)\](?:\[\])?/).replace("ref", ji).getRegex(), cl = E("reflink|nolink(?!\\()", "g").replace("reflink", xr).replace("nolink", vr).getRegex(), Zi = {
  _backpedal: kt,
  // only used for GFM url
  anyPunctuation: rl,
  autolink: sl,
  blockSkip: el,
  br: wr,
  code: Qa,
  del: kt,
  emStrongLDelim: tl,
  emStrongRDelimAst: il,
  emStrongRDelimUnd: nl,
  escape: br,
  link: ll,
  nolink: vr,
  punctuation: Ja,
  reflink: xr,
  reflinkSearch: cl,
  tag: al,
  text: Xa,
  url: kt
}, dl = {
  ...Zi,
  link: E(/^!?\[(label)\]\((.*?)\)/).replace("label", Yt).getRegex(),
  reflink: E(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Yt).getRegex()
}, Ni = {
  ...Zi,
  escape: E(br).replace("])", "~|])").getRegex(),
  url: E(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, hl = {
  ...Ni,
  br: E(wr).replace("{2,}", "*").getRegex(),
  text: E(Ni.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Wt = {
  normal: Vi,
  gfm: Ka,
  pedantic: Ya
}, xt = {
  normal: Zi,
  gfm: Ni,
  breaks: hl,
  pedantic: dl
};
class te {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(e) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || Be, this.options.tokenizer = this.options.tokenizer || new Kt(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const t = {
      block: Wt.normal,
      inline: xt.normal
    };
    this.options.pedantic ? (t.block = Wt.pedantic, t.inline = xt.pedantic) : this.options.gfm && (t.block = Wt.gfm, this.options.breaks ? t.inline = xt.breaks : t.inline = xt.gfm), this.tokenizer.rules = t;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: Wt,
      inline: xt
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, t) {
    return new te(t).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, t) {
    return new te(t).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(/\r\n|\r/g, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      const i = this.inlineQueue[t];
      this.inlineTokens(i.src, i.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], i = !1) {
    this.options.pedantic && (e = e.replace(/\t/g, "    ").replace(/^ +$/gm, ""));
    let r, s, o;
    for (; e; )
      if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((l) => (r = l.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), !0) : !1))) {
        if (r = this.tokenizer.space(e)) {
          e = e.substring(r.raw.length), r.raw.length === 1 && t.length > 0 ? t[t.length - 1].raw += `
` : t.push(r);
          continue;
        }
        if (r = this.tokenizer.code(e)) {
          e = e.substring(r.raw.length), s = t[t.length - 1], s && (s.type === "paragraph" || s.type === "text") ? (s.raw += `
` + r.raw, s.text += `
` + r.text, this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(r);
          continue;
        }
        if (r = this.tokenizer.fences(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.heading(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.hr(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.blockquote(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.list(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.html(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.def(e)) {
          e = e.substring(r.raw.length), s = t[t.length - 1], s && (s.type === "paragraph" || s.type === "text") ? (s.raw += `
` + r.raw, s.text += `
` + r.raw, this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = {
            href: r.href,
            title: r.title
          });
          continue;
        }
        if (r = this.tokenizer.table(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.lheading(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (o = e, this.options.extensions && this.options.extensions.startBlock) {
          let l = 1 / 0;
          const a = e.slice(1);
          let h;
          this.options.extensions.startBlock.forEach((d) => {
            h = d.call({ lexer: this }, a), typeof h == "number" && h >= 0 && (l = Math.min(l, h));
          }), l < 1 / 0 && l >= 0 && (o = e.substring(0, l + 1));
        }
        if (this.state.top && (r = this.tokenizer.paragraph(o))) {
          s = t[t.length - 1], i && s?.type === "paragraph" ? (s.raw += `
` + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(r), i = o.length !== e.length, e = e.substring(r.raw.length);
          continue;
        }
        if (r = this.tokenizer.text(e)) {
          e = e.substring(r.raw.length), s = t[t.length - 1], s && s.type === "text" ? (s.raw += `
` + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(r);
          continue;
        }
        if (e) {
          const l = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(l);
            break;
          } else
            throw new Error(l);
        }
      }
    return this.state.top = !0, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(e, t = []) {
    let i, r, s, o = e, l, a, h;
    if (this.tokens.links) {
      const d = Object.keys(this.tokens.links);
      if (d.length > 0)
        for (; (l = this.tokenizer.rules.inline.reflinkSearch.exec(o)) != null; )
          d.includes(l[0].slice(l[0].lastIndexOf("[") + 1, -1)) && (o = o.slice(0, l.index) + "[" + "a".repeat(l[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (l = this.tokenizer.rules.inline.blockSkip.exec(o)) != null; )
      o = o.slice(0, l.index) + "[" + "a".repeat(l[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (l = this.tokenizer.rules.inline.anyPunctuation.exec(o)) != null; )
      o = o.slice(0, l.index) + "++" + o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; e; )
      if (a || (h = ""), a = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((d) => (i = d.call({ lexer: this }, e, t)) ? (e = e.substring(i.raw.length), t.push(i), !0) : !1))) {
        if (i = this.tokenizer.escape(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.tag(e)) {
          e = e.substring(i.raw.length), r = t[t.length - 1], r && i.type === "text" && r.type === "text" ? (r.raw += i.raw, r.text += i.text) : t.push(i);
          continue;
        }
        if (i = this.tokenizer.link(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.reflink(e, this.tokens.links)) {
          e = e.substring(i.raw.length), r = t[t.length - 1], r && i.type === "text" && r.type === "text" ? (r.raw += i.raw, r.text += i.text) : t.push(i);
          continue;
        }
        if (i = this.tokenizer.emStrong(e, o, h)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.codespan(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.br(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.del(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.autolink(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (!this.state.inLink && (i = this.tokenizer.url(e))) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (s = e, this.options.extensions && this.options.extensions.startInline) {
          let d = 1 / 0;
          const p = e.slice(1);
          let f;
          this.options.extensions.startInline.forEach((g) => {
            f = g.call({ lexer: this }, p), typeof f == "number" && f >= 0 && (d = Math.min(d, f));
          }), d < 1 / 0 && d >= 0 && (s = e.substring(0, d + 1));
        }
        if (i = this.tokenizer.inlineText(s)) {
          e = e.substring(i.raw.length), i.raw.slice(-1) !== "_" && (h = i.raw.slice(-1)), a = !0, r = t[t.length - 1], r && r.type === "text" ? (r.raw += i.raw, r.text += i.text) : t.push(i);
          continue;
        }
        if (e) {
          const d = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(d);
            break;
          } else
            throw new Error(d);
        }
      }
    return t;
  }
}
class Qt {
  options;
  parser;
  // set by the parser
  constructor(e) {
    this.options = e || Be;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: i }) {
    const r = (t || "").match(/^\S*/)?.[0], s = e.replace(/\n$/, "") + `
`;
    return r ? '<pre><code class="language-' + J(r) + '">' + (i ? s : J(s, !0)) + `</code></pre>
` : "<pre><code>" + (i ? s : J(s, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: e }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({ text: e }) {
    return e;
  }
  heading({ tokens: e, depth: t }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    const t = e.ordered, i = e.start;
    let r = "";
    for (let l = 0; l < e.items.length; l++) {
      const a = e.items[l];
      r += this.listitem(a);
    }
    const s = t ? "ol" : "ul", o = t && i !== 1 ? ' start="' + i + '"' : "";
    return "<" + s + o + `>
` + r + "</" + s + `>
`;
  }
  listitem(e) {
    let t = "";
    if (e.task) {
      const i = this.checkbox({ checked: !!e.checked });
      e.loose ? e.tokens.length > 0 && e.tokens[0].type === "paragraph" ? (e.tokens[0].text = i + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = i + " " + e.tokens[0].tokens[0].text)) : e.tokens.unshift({
        type: "text",
        raw: i + " ",
        text: i + " "
      }) : t += i + " ";
    }
    return t += this.parser.parse(e.tokens, !!e.loose), `<li>${t}</li>
`;
  }
  checkbox({ checked: e }) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: e }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "", i = "";
    for (let s = 0; s < e.header.length; s++)
      i += this.tablecell(e.header[s]);
    t += this.tablerow({ text: i });
    let r = "";
    for (let s = 0; s < e.rows.length; s++) {
      const o = e.rows[s];
      i = "";
      for (let l = 0; l < o.length; l++)
        i += this.tablecell(o[l]);
      r += this.tablerow({ text: i });
    }
    return r && (r = `<tbody>${r}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + r + `</table>
`;
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    const t = this.parser.parseInline(e.tokens), i = e.header ? "th" : "td";
    return (e.align ? `<${i} align="${e.align}">` : `<${i}>`) + t + `</${i}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens: e }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({ tokens: e }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({ text: e }) {
    return `<code>${e}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: i }) {
    const r = this.parser.parseInline(i), s = On(e);
    if (s === null)
      return r;
    e = s;
    let o = '<a href="' + e + '"';
    return t && (o += ' title="' + t + '"'), o += ">" + r + "</a>", o;
  }
  image({ href: e, title: t, text: i }) {
    const r = On(e);
    if (r === null)
      return i;
    e = r;
    let s = `<img src="${e}" alt="${i}"`;
    return t && (s += ` title="${t}"`), s += ">", s;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : e.text;
  }
}
class Ki {
  // no need for block level renderers
  strong({ text: e }) {
    return e;
  }
  em({ text: e }) {
    return e;
  }
  codespan({ text: e }) {
    return e;
  }
  del({ text: e }) {
    return e;
  }
  html({ text: e }) {
    return e;
  }
  text({ text: e }) {
    return e;
  }
  link({ text: e }) {
    return "" + e;
  }
  image({ text: e }) {
    return "" + e;
  }
  br() {
    return "";
  }
}
class ie {
  options;
  renderer;
  textRenderer;
  constructor(e) {
    this.options = e || Be, this.options.renderer = this.options.renderer || new Qt(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Ki();
  }
  /**
   * Static Parse Method
   */
  static parse(e, t) {
    return new ie(t).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, t) {
    return new ie(t).parseInline(e);
  }
  /**
   * Parse Loop
   */
  parse(e, t = !0) {
    let i = "";
    for (let r = 0; r < e.length; r++) {
      const s = e[r];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type]) {
        const l = s, a = this.options.extensions.renderers[l.type].call({ parser: this }, l);
        if (a !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(l.type)) {
          i += a || "";
          continue;
        }
      }
      const o = s;
      switch (o.type) {
        case "space": {
          i += this.renderer.space(o);
          continue;
        }
        case "hr": {
          i += this.renderer.hr(o);
          continue;
        }
        case "heading": {
          i += this.renderer.heading(o);
          continue;
        }
        case "code": {
          i += this.renderer.code(o);
          continue;
        }
        case "table": {
          i += this.renderer.table(o);
          continue;
        }
        case "blockquote": {
          i += this.renderer.blockquote(o);
          continue;
        }
        case "list": {
          i += this.renderer.list(o);
          continue;
        }
        case "html": {
          i += this.renderer.html(o);
          continue;
        }
        case "paragraph": {
          i += this.renderer.paragraph(o);
          continue;
        }
        case "text": {
          let l = o, a = this.renderer.text(l);
          for (; r + 1 < e.length && e[r + 1].type === "text"; )
            l = e[++r], a += `
` + this.renderer.text(l);
          t ? i += this.renderer.paragraph({
            type: "paragraph",
            raw: a,
            text: a,
            tokens: [{ type: "text", raw: a, text: a }]
          }) : i += a;
          continue;
        }
        default: {
          const l = 'Token with "' + o.type + '" type was not found.';
          if (this.options.silent)
            return console.error(l), "";
          throw new Error(l);
        }
      }
    }
    return i;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(e, t) {
    t = t || this.renderer;
    let i = "";
    for (let r = 0; r < e.length; r++) {
      const s = e[r];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type]) {
        const l = this.options.extensions.renderers[s.type].call({ parser: this }, s);
        if (l !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(s.type)) {
          i += l || "";
          continue;
        }
      }
      const o = s;
      switch (o.type) {
        case "escape": {
          i += t.text(o);
          break;
        }
        case "html": {
          i += t.html(o);
          break;
        }
        case "link": {
          i += t.link(o);
          break;
        }
        case "image": {
          i += t.image(o);
          break;
        }
        case "strong": {
          i += t.strong(o);
          break;
        }
        case "em": {
          i += t.em(o);
          break;
        }
        case "codespan": {
          i += t.codespan(o);
          break;
        }
        case "br": {
          i += t.br(o);
          break;
        }
        case "del": {
          i += t.del(o);
          break;
        }
        case "text": {
          i += t.text(o);
          break;
        }
        default: {
          const l = 'Token with "' + o.type + '" type was not found.';
          if (this.options.silent)
            return console.error(l), "";
          throw new Error(l);
        }
      }
    }
    return i;
  }
}
class It {
  options;
  block;
  constructor(e) {
    this.options = e || Be;
  }
  static passThroughHooks = /* @__PURE__ */ new Set([
    "preprocess",
    "postprocess",
    "processAllTokens"
  ]);
  /**
   * Process markdown before marked
   */
  preprocess(e) {
    return e;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(e) {
    return e;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(e) {
    return e;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? te.lex : te.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? ie.parse : ie.parseInline;
  }
}
class pl {
  defaults = Ii();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = ie;
  Renderer = Qt;
  TextRenderer = Ki;
  Lexer = te;
  Tokenizer = Kt;
  Hooks = It;
  constructor(...e) {
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, t) {
    let i = [];
    for (const r of e)
      switch (i = i.concat(t.call(this, r)), r.type) {
        case "table": {
          const s = r;
          for (const o of s.header)
            i = i.concat(this.walkTokens(o.tokens, t));
          for (const o of s.rows)
            for (const l of o)
              i = i.concat(this.walkTokens(l.tokens, t));
          break;
        }
        case "list": {
          const s = r;
          i = i.concat(this.walkTokens(s.items, t));
          break;
        }
        default: {
          const s = r;
          this.defaults.extensions?.childTokens?.[s.type] ? this.defaults.extensions.childTokens[s.type].forEach((o) => {
            const l = s[o].flat(1 / 0);
            i = i.concat(this.walkTokens(l, t));
          }) : s.tokens && (i = i.concat(this.walkTokens(s.tokens, t)));
        }
      }
    return i;
  }
  use(...e) {
    const t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((i) => {
      const r = { ...i };
      if (r.async = this.defaults.async || r.async || !1, i.extensions && (i.extensions.forEach((s) => {
        if (!s.name)
          throw new Error("extension name required");
        if ("renderer" in s) {
          const o = t.renderers[s.name];
          o ? t.renderers[s.name] = function(...l) {
            let a = s.renderer.apply(this, l);
            return a === !1 && (a = o.apply(this, l)), a;
          } : t.renderers[s.name] = s.renderer;
        }
        if ("tokenizer" in s) {
          if (!s.level || s.level !== "block" && s.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const o = t[s.level];
          o ? o.unshift(s.tokenizer) : t[s.level] = [s.tokenizer], s.start && (s.level === "block" ? t.startBlock ? t.startBlock.push(s.start) : t.startBlock = [s.start] : s.level === "inline" && (t.startInline ? t.startInline.push(s.start) : t.startInline = [s.start]));
        }
        "childTokens" in s && s.childTokens && (t.childTokens[s.name] = s.childTokens);
      }), r.extensions = t), i.renderer) {
        const s = this.defaults.renderer || new Qt(this.defaults);
        for (const o in i.renderer) {
          if (!(o in s))
            throw new Error(`renderer '${o}' does not exist`);
          if (["options", "parser"].includes(o))
            continue;
          const l = o, a = i.renderer[l], h = s[l];
          s[l] = (...d) => {
            let p = a.apply(s, d);
            return p === !1 && (p = h.apply(s, d)), p || "";
          };
        }
        r.renderer = s;
      }
      if (i.tokenizer) {
        const s = this.defaults.tokenizer || new Kt(this.defaults);
        for (const o in i.tokenizer) {
          if (!(o in s))
            throw new Error(`tokenizer '${o}' does not exist`);
          if (["options", "rules", "lexer"].includes(o))
            continue;
          const l = o, a = i.tokenizer[l], h = s[l];
          s[l] = (...d) => {
            let p = a.apply(s, d);
            return p === !1 && (p = h.apply(s, d)), p;
          };
        }
        r.tokenizer = s;
      }
      if (i.hooks) {
        const s = this.defaults.hooks || new It();
        for (const o in i.hooks) {
          if (!(o in s))
            throw new Error(`hook '${o}' does not exist`);
          if (["options", "block"].includes(o))
            continue;
          const l = o, a = i.hooks[l], h = s[l];
          It.passThroughHooks.has(o) ? s[l] = (d) => {
            if (this.defaults.async)
              return Promise.resolve(a.call(s, d)).then((f) => h.call(s, f));
            const p = a.call(s, d);
            return h.call(s, p);
          } : s[l] = (...d) => {
            let p = a.apply(s, d);
            return p === !1 && (p = h.apply(s, d)), p;
          };
        }
        r.hooks = s;
      }
      if (i.walkTokens) {
        const s = this.defaults.walkTokens, o = i.walkTokens;
        r.walkTokens = function(l) {
          let a = [];
          return a.push(o.call(this, l)), s && (a = a.concat(s.call(this, l))), a;
        };
      }
      this.defaults = { ...this.defaults, ...r };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return te.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return ie.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (i, r) => {
      const s = { ...r }, o = { ...this.defaults, ...s }, l = this.onError(!!o.silent, !!o.async);
      if (this.defaults.async === !0 && s.async === !1)
        return l(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof i > "u" || i === null)
        return l(new Error("marked(): input parameter is undefined or null"));
      if (typeof i != "string")
        return l(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(i) + ", string expected"));
      o.hooks && (o.hooks.options = o, o.hooks.block = e);
      const a = o.hooks ? o.hooks.provideLexer() : e ? te.lex : te.lexInline, h = o.hooks ? o.hooks.provideParser() : e ? ie.parse : ie.parseInline;
      if (o.async)
        return Promise.resolve(o.hooks ? o.hooks.preprocess(i) : i).then((d) => a(d, o)).then((d) => o.hooks ? o.hooks.processAllTokens(d) : d).then((d) => o.walkTokens ? Promise.all(this.walkTokens(d, o.walkTokens)).then(() => d) : d).then((d) => h(d, o)).then((d) => o.hooks ? o.hooks.postprocess(d) : d).catch(l);
      try {
        o.hooks && (i = o.hooks.preprocess(i));
        let d = a(i, o);
        o.hooks && (d = o.hooks.processAllTokens(d)), o.walkTokens && this.walkTokens(d, o.walkTokens);
        let p = h(d, o);
        return o.hooks && (p = o.hooks.postprocess(p)), p;
      } catch (d) {
        return l(d);
      }
    };
  }
  onError(e, t) {
    return (i) => {
      if (i.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        const r = "<p>An error occurred:</p><pre>" + J(i.message + "", !0) + "</pre>";
        return t ? Promise.resolve(r) : r;
      }
      if (t)
        return Promise.reject(i);
      throw i;
    };
  }
}
const Ue = new pl();
function z(n, e) {
  return Ue.parse(n, e);
}
z.options = z.setOptions = function(n) {
  return Ue.setOptions(n), z.defaults = Ue.defaults, ur(z.defaults), z;
};
z.getDefaults = Ii;
z.defaults = Be;
z.use = function(...n) {
  return Ue.use(...n), z.defaults = Ue.defaults, ur(z.defaults), z;
};
z.walkTokens = function(n, e) {
  return Ue.walkTokens(n, e);
};
z.parseInline = Ue.parseInline;
z.Parser = ie;
z.parser = ie.parse;
z.Renderer = Qt;
z.TextRenderer = Ki;
z.Lexer = te;
z.lexer = te.lex;
z.Tokenizer = Kt;
z.Hooks = It;
z.parse = z;
z.options;
z.setOptions;
z.use;
z.walkTokens;
z.parseInline;
ie.parse;
te.lex;
const Rn = {
  wind: { de: "Wind", en: "Wind", icon: "mdi:weather-windy" },
  thunderstorm: { de: "Gewitter", en: "Thunderstorm", icon: "mdi:weather-lightning-rainy" },
  rain: { de: "Regen", en: "Rain", icon: "mdi:weather-pouring" },
  snow: { de: "Schnee", en: "Snow", icon: "mdi:snowflake" },
  frost: { de: "Frost", en: "Frost", icon: "mdi:snowflake-thermometer" },
  ground_frost: { de: "Bodenfrost", en: "Ground Frost", icon: "mdi:snowflake-thermometer" },
  slippery_roads: { de: "Strassenglätte", en: "Slippery Roads", icon: "mdi:car-brake-alert" },
  black_ice: { de: "Glätte", en: "Black Ice", icon: "mdi:snowflake-alert" },
  road_conditions: { de: "Strassenverhältnisse", en: "Road Conditions", icon: "mdi:car-brake-alert" },
  thaw: { de: "Tauwetter", en: "Thaw", icon: "mdi:thermometer-high" },
  heat: { de: "Hitze", en: "Heat", icon: "mdi:weather-sunny-alert" },
  cold: { de: "Kälte", en: "Cold", icon: "mdi:thermometer-low" },
  fog: { de: "Nebel", en: "Fog", icon: "mdi:weather-fog" },
  forest_fire: { de: "Waldbrand", en: "Forest Fire", icon: "mdi:fire-alert" },
  flood: { de: "Hochwasser", en: "Flood", icon: "mdi:waves-arrow-up" },
  avalanche: { de: "Lawinen", en: "Avalanches", icon: "mdi:snowflake-alert" },
  earthquake: { de: "Erdbeben", en: "Earthquakes", icon: "mdi:pulse" },
  drought: { de: "Trockenheit", en: "Drought", icon: "mdi:water-off" }
}, Fn = {
  thunderstorms: "thunderstorm",
  snowfall: "snow",
  forest_fires: "forest_fire",
  floods: "flood",
  avalanches: "avalanche",
  earthquakes: "earthquake"
}, Gn = {
  1: { de: "Keine oder geringe Gefahr", en: "Level 1 - No/minor danger" },
  2: { de: "Mässige Gefahr", en: "Level 2 - Moderate danger" },
  3: { de: "Markante Gefahr", en: "Level 3 - Significant danger" },
  4: { de: "Grosse Gefahr", en: "Level 4 - High danger" },
  5: { de: "Sehr grosse Gefahr", en: "Level 5 - Very high danger" }
};
function Qe(n) {
  return typeof n == "string" && n.trim() ? n : void 0;
}
function Wn(n) {
  const e = n?.trim().toLowerCase().replace(/[\s-]+/g, "_") ?? "", t = Object.hasOwn(Fn, e) ? Fn[e] : e;
  return Object.hasOwn(Rn, t) ? Rn[t] : void 0;
}
function Ci(n, e, t, i) {
  if (typeof i != "number" || !Number.isInteger(i)) return;
  const r = n.warning_labels?.[e]?.[t];
  if (!(!r || typeof r != "object" || Array.isArray(r)))
    return Qe(r[String(i)]);
}
function $r(n) {
  return Qe(n?.selectedLanguage) || Qe(n?.language) || "en";
}
function ul(n, e, t) {
  const i = $r(t).toLowerCase().split(/[-_]/)[0], r = i === "de" ? "de" : "en", s = Qe(n.warn_type_name), o = Ci(e, i, "types", n.warn_type), l = Ci(e, "en", "types", n.warn_type), a = Wn(l || s), h = typeof n.warn_type == "number" && Number.isInteger(n.warn_type) ? ` (${n.warn_type})` : "", d = o || (l ? a?.[r] || l : Wn(s)?.[r] || s) || Qe(n.title) || `${i === "de" ? "Unbekannte Warnungsart" : "Unknown warning type"}${h}`, p = n.warn_level ?? n.level, f = typeof p == "number" && Number.isInteger(p) && p >= 1 && p <= 5 ? p : null, g = Ci(e, i, "levels", f) || (f !== null && i === "de" ? Gn[f].de : void 0) || Qe(n.warn_level_name) || (f !== null ? Gn[f].en : i === "de" ? "Unbekannte Gefahrenstufe" : "Unknown danger level"), b = o && !l ? "mdi:alert" : a?.icon || "mdi:alert";
  return { typeName: d, levelName: g, icon: b, level: f };
}
function Un(n, e) {
  if (typeof n != "string" && typeof n != "number" || n === "None") return "";
  const t = new Date(n);
  if (!Number.isFinite(t.getTime())) return "";
  try {
    return t.toLocaleString($r(e), {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: e?.config?.time_zone
    });
  } catch {
    return t.toISOString();
  }
}
function kr(n) {
  const e = document.createElement("template");
  e.innerHTML = n, e.content.querySelectorAll("script,style,iframe,object,embed,form,meta,base").forEach((i) => i.remove()), e.content.querySelectorAll("*").forEach((i) => {
    if (Array.from(i.attributes).forEach((r) => {
      /^on/i.test(r.name) && i.removeAttribute(r.name);
    }), i.tagName === "A") {
      const r = i.getAttribute("href") ?? "";
      /^https?:\/\//i.test(r) || i.removeAttribute("href");
    }
  });
  const t = document.createElement("div");
  return t.appendChild(e.content), t.innerHTML;
}
function fl(n) {
  return {
    yellow: "#f6c90e",
    orange: "#e17055",
    red: "#007AFF",
    violet: "#8e44ad",
    gray: "var(--disabled-text-color, #9e9e9e)"
  }[n?.toLowerCase()] ?? "var(--primary-text-color, #fff)";
}
function Ai(n, e, t, i, r = 0) {
  const s = n.attributes;
  if (!s.has_warning) return null;
  const o = fl(s.icon_color), l = s.icon || "mdi:alert", a = s.warning_type || s.level_name || n.state, h = !!t[e], d = !!(s.html_text || s.text || s.links?.length);
  return c`
    <li style="margin-bottom: 12px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <ha-icon icon="${l}" style="color: ${o}; flex-shrink: 0;"></ha-icon>
        <div
          style="flex: 1; min-width: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px;"
        >
          <span style="font-weight: bold;">${a}</span>
          ${s.level_name ? c`<span style="font-size: 12px; opacity: 0.8;">(${s.level_name})</span>` : ""}
          ${r > 0 ? c`<span
                  style="font-size: 12px; opacity: 0.75;"
                  title="${u("warning.warnings_additional", { count: r })}"
                >
                  +${r}
                </span>` : ""}
        </div>
        ${d ? c`
                <button
                  @click=${() => i(e)}
                  style="background:none;border:none;cursor:pointer;color:var(--primary-text-color,#fff);font-size:16px;flex-shrink:0;"
                  title="${u(h ? "collapse" : "expand")}"
                  aria-label="${u(h ? "collapse" : "expand")}"
                >
                  <ha-icon icon="${h ? "mdi:chevron-up" : "mdi:chevron-down"}"></ha-icon>
                </button>
              ` : ""}
      </div>
      ${h ? c`
              <div style="margin-top: 6px; font-size: 13px; opacity: 0.85;">
                ${s.valid_from || s.valid_to ? c`
                        <div style="margin-bottom: 4px;">
                          ${s.valid_from ? c`<strong>${u("warning.valid_from")}: </strong>${new Date(
    s.valid_from
  ).toLocaleString()}&nbsp;` : ""}
                          ${s.valid_to ? c`<strong>${u("warning.valid_to")}: </strong>${new Date(
    s.valid_to
  ).toLocaleString()}` : ""}
                        </div>
                      ` : ""}
                ${s.html_text ? c`<div
                        style="line-height: 1.4; margin-bottom: 4px;"
                        .innerHTML="${kr(s.html_text)}"
                      ></div>` : s.text ? c`<div style="line-height: 1.4; margin-bottom: 4px;">${s.text}</div>` : ""}
                ${s.links?.length ? c`
                        <div style="display: flex; flex-direction: column; gap: 2px;">
                          ${s.links.map(
    (p) => c`
                              <a
                                href="${p.url.startsWith("http") ? p.url : p.alt_url ?? p.url}"
                                target="_blank"
                                rel="noopener noreferrer"
                                style="color: var(--primary-text-color, #fff); text-decoration: underline; display: flex; align-items: center; gap: 4px;"
                              >
                                <ha-icon icon="mdi:link-variant" style="font-size: 14px;"></ha-icon>
                                ${p.text}
                              </a>
                            `
  )}
                        </div>
                      ` : ""}
              </div>
            ` : ""}
    </li>
  `;
}
function gl(n, e, t, i, r) {
  const s = n.attributes;
  if (!s.has_warning) return null;
  const o = {
    red: "danger",
    violet: "danger",
    orange: "severe",
    yellow: "warning"
  }[s.icon_color?.toLowerCase()] ?? "info", l = !!e?.attributes?.has_warning, a = !!t?.attributes?.has_warning, h = s.additional_warning_count ?? 0, d = Math.max(
    h - (l ? 1 : 0) - (a ? 1 : 0),
    0
  ), p = 1 + h, f = p === 1 ? u("warning.weather_warning") : u("warning.weather_warnings", { count: p }), g = [
    Ai(n, "primary", i, r, d),
    e ? Ai(e, "secondary", i, r) : null,
    t ? Ai(t, "tertiary", i, r) : null
  ].filter(Boolean);
  return c`
    <div class="warning-section ${o}">
      <strong>${f}</strong>
      <ul style="margin: 6px 0 0 0; padding-left: 18px;">
        ${g}
      </ul>
    </div>
  `;
}
function ml(n, e, t) {
  const i = [];
  if (n.attributes.warning_levels && Array.isArray(n.attributes.warning_levels))
    for (let a = 0; a < n.attributes.warning_levels.length; a++)
      i.push({
        id: `warning_${a}`,
        title: n.attributes.warning_levels[a],
        level: n.attributes.warning_levels[a],
        type: n.attributes.warning_types[a],
        description: n.attributes.warning_texts[a],
        valid_from: n.attributes.warning_valid_from[a],
        valid_to: n.attributes.warning_valid_to[a],
        link: n.attributes.warning_links[a],
        regions: [],
        phenomena: []
      });
  if (i.length === 0) return null;
  const r = Math.max(...i.map((a) => a.level || 0)), s = r >= 4 ? "danger" : r >= 3 ? "severe" : r >= 2 ? "warning" : "info", o = (a) => a >= 4 ? "#007AFF" : a >= 3 ? "#e17055" : a >= 2 ? "#f6c90e" : "var(--primary-text-color, #fff)", l = {
    storm: "mdi:weather-lightning",
    thunderstorms: "mdi:weather-lightning-rainy",
    rain: "mdi:weather-pouring",
    snow: "mdi:snowflake",
    wind: "mdi:weather-windy",
    fog: "mdi:weather-fog",
    heat: "mdi:weather-sunny-alert",
    heat_waves: "mdi:thermometer-high",
    cold: "mdi:snowflake-alert",
    frost: "mdi:snowflake-thermometer",
    thaw: "mdi:thermometer-high",
    flood: "mdi:waves-arrow-up",
    drought: "mdi:water-off",
    avalanches: "mdi:snowflake-alert",
    slippery_roads: "mdi:car-brake-alert",
    forest_fires: "mdi:fire-alert",
    earthquakes: "mdi:pulse",
    default: "mdi:alert"
  };
  return c`
    <div class="warning-section ${s}">
      <strong>${u("warning.weather_warning")}</strong>
      <ul style="margin: 6px 0 0 0; padding-left: 18px;">
        ${i.map(
    (a) => c`
            <li style="margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <ha-icon
                  icon="${l[a.type?.toLowerCase?.()] || l.default}"
                  style="color: ${o(a.level)};"
                ></ha-icon>
                <span style="font-weight: bold;">${a.title}</span>
                ${a.link ? c`
                        <a
                          href="${a.link}"
                          target="_blank"
                          rel="noopener noreferrer"
                          style="color: var(--primary-text-color, #fff); text-decoration: underline; display: flex; align-items: center;"
                        >
                          <ha-icon icon="mdi:link-variant" style="font-size: 16px;"></ha-icon>
                        </a>
                      ` : ""}
                <button
                  @click=${() => t(a.id)}
                  style="background:none;border:none;cursor:pointer;color:var(--primary-text-color,#fff);font-size:16px;"
                  title="${e[a.id] ? u("collapse") : u("expand")}"
                  aria-label="${e[a.id] ? u("collapse") : u("expand")}"
                >
                  <ha-icon
                    icon="${e[a.id] ? "mdi:chevron-up" : "mdi:chevron-down"}"
                  ></ha-icon>
                </button>
              </div>
              ${e[a.id] && a.description ? c`
                      <div>
                        <strong>${u("warning.valid_from")}: </strong>
                        ${a.valid_from ? new Date(a.valid_from).toLocaleString() : u("unknown")}
                        <strong>${u("warning.valid_to")}: </strong>
                        ${a.valid_to ? new Date(a.valid_to).toLocaleString() : u("unknown")}
                      </div>
                      <div
                        style="font-size: 14px; line-height: 1.4; margin-top: 4px;"
                        .innerHTML="${kr(String(z.parse(a.description || "")))}"
                      ></div>
                    ` : ""}
            </li>
          `
  )}
      </ul>
    </div>
  `;
}
function nt() {
  return c`<div class="no-warnings" role="status">${u("warning.warnings_unavailable")}</div>`;
}
function In(n) {
  return n.state === "unavailable" || n.state === "unknown" || n.attributes?.data_status === "unavailable" || n.attributes?.data_status === "unknown";
}
function Cr(n, e, t, i, r, s, o) {
  return e && In(e) ? nt() : e && e.attributes?.has_warning !== void 0 ? gl(
    e,
    t,
    i,
    r,
    s
  ) : n && In(n) ? nt() : n && n.attributes?.warning_levels ? ml(n, r, s) : n && (n.state === "on" || n.attributes?.alerts !== void 0) ? yl(n, r, s, o) : null;
}
function yl(n, e, t, i) {
  const r = n.attributes, s = r.alerts ?? [];
  if (!Array.isArray(s) || s.some((a) => !a || typeof a != "object" || Array.isArray(a)))
    return nt();
  if (n.state === "off") return null;
  const o = s.filter((a) => !a.outlook);
  if (o.length === 0) {
    if (s.length > 0) return null;
    if (n.state !== "on") return nt();
    const a = typeof r.active_alerts_count == "number" && Number.isInteger(r.active_alerts_count) && r.active_alerts_count > 0 ? r.active_alerts_count : 0;
    return c`
      <div class="ms-section" style="margin: 10px 16px;">
        <div style="display:flex;align-items:center;gap:8px;padding:12px;border-radius:10px;background:#f6c90e15;">
          <ha-icon icon="mdi:alert" style="color:#f6c90e;flex-shrink:0;"></ha-icon>
          <div style="flex:1;font-size:13px;">${u("warning.weather_warning")}${a > 0 ? ` (${a})` : ""}</div>
        </div>
      </div>
    `;
  }
  const l = {
    1: "#4CAF50",
    2: "#f6c90e",
    3: "#FF9800",
    4: "#f44336",
    5: "#9C27B0"
  };
  return c`
    <div style="margin: 10px 16px;">
      ${o.map((a, h) => {
    const d = `ms_alert_${h}`, { typeName: p, levelName: f, icon: g, level: b } = ul(a, r, i), k = b !== null ? l[b] : "#9e9e9e", x = typeof a.description == "string" ? a.description : "", L = !!e[d], P = Un(a.valid_from ?? a.start, i), H = Un(a.valid_to === "None" ? a.end : a.valid_to ?? a.end, i);
    return c`
          <div style="
            display: flex; align-items: flex-start; gap: 10px;
            padding: 12px; border-radius: 10px; margin-bottom: 8px;
            background: ${k}18; border-left: 4px solid ${k};
          ">
            <ha-icon icon="${g}" style="color:${k};flex-shrink:0;margin-top:2px;--mdc-icon-size:24px;"></ha-icon>
            <div style="flex:1;min-width:0;">
              <div style="font-weight:600;font-size:14px;color:${k};">${p}</div>
              <div style="font-size:12px;opacity:0.8;margin-top:2px;">${f}</div>
              ${P || H ? c`
                <div style="font-size:11px;opacity:0.65;margin-top:3px;">
                  ${P ? c`${u("warning.valid_from")}: ${P}` : ""}
                  ${H ? c` ${u("warning.valid_to")}: ${H}` : ""}
                </div>` : ""}
              ${x && L ? c`
                <div style="font-size:12px;margin-top:8px;line-height:1.5;opacity:0.85;white-space:pre-wrap;border-top:1px solid ${k}33;padding-top:6px;">${x}</div>
              ` : ""}
              ${!L && x ? c`
                <div style="font-size:11px;margin-top:4px;opacity:0.6;">${x.substring(0, 80)}${x.length > 80 ? "…" : ""}</div>
              ` : ""}
            </div>
            ${x ? c`
              <button @click=${() => t(d)}
                title="${u(L ? "collapse" : "expand")}"
                aria-label="${u(L ? "collapse" : "expand")}"
                aria-expanded="${L}"
                style="background:none;border:none;cursor:pointer;color:inherit;flex-shrink:0;padding:4px;">
                <ha-icon icon="${L ? "mdi:chevron-up" : "mdi:chevron-down"}"></ha-icon>
              </button>` : ""}
          </div>
        `;
  })}
    </div>
  `;
}
const _l = [
  // Temperature — must NOT match bodentemperatur/lufttemperatur_in_X
  { key: "temperature", patterns: ["_temperatur", "_temperature"], exclude: ["boden", "soil", "luft"] },
  { key: "humidity", patterns: ["luftfeuchtigkeit", "humidity", "feuchtigkeit"] },
  { key: "wind_speed", patterns: ["windgeschwindigkeit", "wind_speed"] },
  { key: "wind_direction", patterns: ["windrichtung", "wind_direction"] },
  { key: "wind_gust", patterns: ["windboe", "wind_gust", "boee"] },
  { key: "pressure", patterns: ["luftdruck", "pressure"] },
  { key: "precipitation", patterns: ["niederschlag", "precipitation", "regenmenge"] },
  { key: "dew_point", patterns: ["taupunkt", "dew_point"] },
  { key: "sunshine_duration", patterns: ["sonnenscheindauer", "sunshine_duration"] },
  { key: "global_radiation", patterns: ["globalstrahlung", "global_radiation"] },
  { key: "uv_index", patterns: ["uv_index", "uvindex"] },
  { key: "snow_depth", patterns: ["schneehohe", "schneehöhe", "snow_depth"] },
  { key: "foehn_index", patterns: ["fohnindex", "foehn_index", "foehn"] },
  // Soil temps — must be checked BEFORE generic temperature
  // Substring matching is intentional: 'bodentemperatur_5' matches 'bodentemperatur_5_cm' in DE entity IDs
  { key: "soil_temp_5cm", patterns: ["bodentemperatur_5", "soil_temperature_5"] },
  { key: "soil_temp_10cm", patterns: ["bodentemperatur_10", "soil_temperature_10"] },
  { key: "soil_temp_20cm", patterns: ["bodentemperatur_20", "soil_temperature_20"] },
  { key: "pm25", patterns: ["pm2_5", "pm25", "feinstaub_pm2"] },
  { key: "pm10", patterns: ["pm10", "feinstaub_pm10"] },
  { key: "nitrogen_dioxide", patterns: ["stickstoffdioxid", "nitrogen_dioxide", "no2"] },
  { key: "ozone", patterns: ["ozon", "ozone"] },
  // Pollen
  { key: "pollen_birch", patterns: ["birch_pollen", "birkenpollen", "pollen_birch"] },
  { key: "pollen_alder", patterns: ["alder_pollen", "erlenpollen", "pollen_alder"] },
  { key: "pollen_grass", patterns: ["grass_pollen", "graserpollen", "pollen_grass", "pollen_grasses"] },
  { key: "pollen_mugwort", patterns: ["mugwort_pollen", "beifusspollen", "pollen_mugwort"] },
  { key: "pollen_ragweed", patterns: ["ragweed_pollen", "ambrosiapollen", "pollen_ambrosia", "pollen_ragweed"] },
  { key: "pollen_hazel", patterns: ["haselpollen", "hazel_pollen", "pollen_hazel"] },
  { key: "pollen_beech", patterns: ["buchenpollen", "beech_pollen", "pollen_beech"] },
  { key: "pollen_ash", patterns: ["eschenpollen", "ash_pollen", "pollen_ash"] },
  { key: "pollen_oak", patterns: ["eichenpollen", "oak_pollen", "pollen_oak"] },
  // Heating
  { key: "heating_degree_days", patterns: ["heizgradtage"] },
  { key: "season_heating_degree_days", patterns: ["heizgradtage_saison", "season_hgt"] }
];
function Ar(n, e) {
  const t = {};
  if (!n?.states) return t;
  const i = Object.keys(n.states), r = e.match(/^weather\.meteoswiss_(.+)$/);
  let s = r ? r[1] : "";
  s = s.replace(/_\d+$/, "");
  for (const { key: o, patterns: l, exclude: a } of _l) {
    let h;
    for (const d of i) {
      const p = d.toLowerCase();
      if (!(!p.startsWith("sensor.") || a && a.some((g) => p.includes(g)) || !l.some((g) => p.includes(g))) && !(o === "heating_degree_days" && (p.includes("saison") || p.includes("season"))) && !(o === "season_heating_degree_days" && !p.includes("saison") && !p.includes("season"))) {
        if (s && p.includes(s)) {
          h = d;
          break;
        }
        h || (h = d);
      }
    }
    h && (t[o] = h);
  }
  for (const o of i) {
    const l = o.toLowerCase();
    if (!l.startsWith("binary_sensor.")) continue;
    const a = l.includes("critical") || l.includes("kritisch"), h = l.includes("alert") || l.includes("warnung");
    a && h ? t.critical_alert = o : h && !t.any_alert && (t.any_alert = o);
  }
  return n.states[e] && (t.weather = e), t;
}
function Ye(n, e) {
  if (!e || !n.states[e]) return null;
  const t = n.states[e].state;
  if (t === "unavailable" || t === "unknown") return null;
  const i = parseFloat(t);
  return isNaN(i) ? null : i;
}
function bl(n) {
  const e = [
    { label: "Kein Föhn", color: "#4CAF50" },
    { label: "Stationär", color: "#8BC34A" },
    { label: "Möglicher Föhn", color: "#FFC107" },
    { label: "Gemischter Föhn", color: "#FF9800" },
    { label: "Föhn", color: "#FF5722" },
    { label: "Starker Föhn", color: "#f44336" }
  ];
  return e[n] || e[0];
}
var wl = Object.defineProperty, xl = Object.getOwnPropertyDescriptor, Ee = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? xl(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && wl(e, t, r), r;
};
W({
  loader: (n) => U[n]
});
let fe = class extends N {
  constructor() {
    super(...arguments), this._forecast = [], this._hourlyForecast = [], this._forecastLoading = !1, this._openWarnings = {}, this._resolvedEntities = null, this._resizeObserver = null, this._toggleWarning = (n) => {
      this._openWarnings = { ...this._openWarnings, [n]: !this._openWarnings[n] }, this.requestUpdate();
    };
  }
  updated(n) {
    if (super.updated(n), this.hass && this.config && this.config.entity) {
      const e = this._lastEntityId !== this.config.entity, t = n.has("hass");
      if (e && (this._lastEntityId = this.config.entity), (e || t) && this.config.auto_resolve_entities !== !1) {
        const i = Ar(this.hass, this.config.entity), r = Object.values(i).filter((o) => o).length, s = this._resolvedEntities ? Object.values(this._resolvedEntities).filter((o) => o).length : 0;
        (e || r > s) && (this._resolvedEntities = i);
      }
      e && this._loadForecast();
    }
  }
  async _loadForecast() {
    if (!(!this.hass || !this.config?.entity || this._forecastLoading)) {
      this._forecastLoading = !0;
      try {
        const n = async (i) => {
          try {
            const r = await this.hass.callWS({
              type: "weather/get_forecasts",
              entity_id: this.config.entity,
              forecast_type: i
            });
            return r?.[this.config.entity]?.forecast ?? r?.forecast ?? [];
          } catch {
            try {
              return (await this.hass.callWS({
                type: "call_service",
                domain: "weather",
                service: "get_forecasts",
                service_data: { entity_id: this.config.entity, type: i },
                return_response: !0
              }))?.response?.[this.config.entity]?.forecast ?? [];
            } catch {
              return [];
            }
          }
        }, [e, t] = await Promise.all([
          n("daily"),
          n("hourly")
        ]);
        this._forecast = e, this._hourlyForecast = t;
      } catch {
        this._forecast = [], this._hourlyForecast = [];
      } finally {
        this._forecastLoading = !1;
      }
    }
  }
  // ═══════════════════════════════════════════════════════════════
  // iOS WEATHER INSPIRED STYLES
  // ═══════════════════════════════════════════════════════════════
  static get styles() {
    return T`
      :host {
        display: block;
        container-type: inline-size;
        --ms-text: var(--primary-text-color, #fff);
        --ms-text-secondary: var(--secondary-text-color, rgba(235, 235, 245, 0.6));
        --ms-accent: #007AFF;
        --ms-card-bg: rgba(255, 255, 255, 0.08);
        --ms-card-border: rgba(255, 255, 255, 0.06);
        --ms-radius: 18px;
        --ms-radius-sm: 12px;
        --ms-font: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text',
          'Helvetica Neue', 'Segoe UI', Roboto, sans-serif;

        background: var(--ha-card-background, var(--card-background-color, rgba(28, 28, 30, 0.72)));
        backdrop-filter: saturate(180%) blur(20px);
        -webkit-backdrop-filter: saturate(180%) blur(20px);
        border-radius: var(--ms-radius);
        padding: 0;
        font-family: var(--ms-font);
        color: var(--ms-text);
        overflow: hidden;
      }

      /* ── Display mode modifiers ── */
      :host([data-display='compact']) .ms-swiss-section,
      :host([data-display='compact']) .ms-heating-section,
      :host([data-display='compact']) .ms-chart-container {
        display: none !important;
      }
      :host([data-display='compact']) .ms-header { padding: 16px 16px 4px; }
      :host([data-display='compact']) .ms-section { margin: 6px 12px; padding: 10px 12px; }

      /* Auto mode: compact when container is narrow */
      :host([data-display-effective='compact']) .ms-swiss-section,
      :host([data-display-effective='compact']) .ms-heating-section,
      :host([data-display-effective='compact']) .ms-chart-container {
        display: none !important;
      }
      :host([data-display-effective='compact']) .ms-header { padding: 16px 16px 4px; }
      :host([data-display-effective='compact']) .ms-section { margin: 6px 12px; padding: 10px 12px; }

      /* Header — responsive with clamp() */
      .ms-header { text-align: center; padding: 28px 20px 8px; }
      .ms-header-main {
        display: flex; align-items: center; justify-content: center;
        gap: clamp(8px, 3cqw, 20px); margin: 4px 0;
      }
      .ms-location {
        font-size: clamp(20px, 5cqw, 28px); font-weight: 400; letter-spacing: -0.5px;
      }
      .ms-temp {
        font-size: clamp(48px, 14cqw, 72px); font-weight: 200; line-height: 1.1;
        letter-spacing: -2px; margin-top: 2px;
      }
      .ms-temp .ms-temp-unit {
        font-size: 0.45em; font-weight: 300; vertical-align: top;
        margin-left: 2px; opacity: 0.7;
      }
      .ms-condition {
        font-size: 16px; font-weight: 500;
        color: var(--ms-text-secondary); margin-top: -4px;
      }
      .ms-hl {
        font-size: 15px; font-weight: 400;
        color: var(--ms-text-secondary); margin-top: 2px;
      }
      .ms-weather-icon {
        width: clamp(56px, 12cqw, 80px); height: clamp(56px, 12cqw, 80px);
        margin: 0 auto; display: block; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .ms-weather-icon img {
        width: 100% !important; height: 100% !important;
        object-fit: contain; font-size: inherit !important;
      }
      .ms-weather-icon ha-icon {
        --mdc-icon-size: clamp(56px, 12cqw, 80px) !important;
      }

      /* Glass Sections */
      .ms-section {
        background: var(--ms-card-bg);
        border: 0.5px solid var(--ms-card-border);
        border-radius: var(--ms-radius-sm);
        margin: 10px 16px;
        padding: 14px 16px;
      }
      .ms-section-label {
        font-size: 11px; font-weight: 600; text-transform: uppercase;
        letter-spacing: 1px; color: var(--ms-text-secondary);
        margin-bottom: 10px; display: flex; align-items: center; gap: 6px;
      }
      .ms-section-label ha-icon { --mdc-icon-size: 14px; }

      /* Metric Pills */
      .ms-metrics { display: flex; flex-wrap: wrap; gap: 8px; }
      .ms-pill {
        display: flex; align-items: center; gap: 6px;
        padding: 8px 14px;
        background: var(--ms-card-bg);
        border: 0.5px solid var(--ms-card-border);
        border-radius: 20px; font-size: 14px;
      }
      .ms-pill ha-icon { --mdc-icon-size: 16px; opacity: 0.8; }
      .ms-pill-value { font-weight: 600; }
      .ms-pill-label { color: var(--ms-text-secondary); font-size: 12px; }

      /* Swiss Values */
      .ms-swiss-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 10px;
      }
      .ms-swiss-item {
        display: flex; flex-direction: column; align-items: center;
        padding: 10px; background: rgba(255, 255, 255, 0.04);
        border-radius: 10px;
      }
      .ms-swiss-value { font-size: 18px; font-weight: 500; }
      .ms-swiss-label { font-size: 11px; color: var(--ms-text-secondary); margin-top: 2px; }
      .ms-foehn-badge {
        display: inline-flex; align-items: center; gap: 4px;
        padding: 3px 10px; border-radius: 10px;
        font-size: 13px; font-weight: 600;
      }

      /* Heating */
      .ms-hdd { display: flex; align-items: center; justify-content: space-between; }
      .ms-hdd-today { display: flex; align-items: baseline; gap: 4px; }
      .ms-hdd-value { font-size: 22px; font-weight: 400; }
      .ms-hdd-unit { font-size: 12px; color: var(--ms-text-secondary); }
      .ms-hdd-season { font-size: 13px; color: var(--ms-text-secondary); }

      /* Forecast Strip */
      .ms-forecast {
        display: flex; gap: 2px; overflow-x: auto;
        -webkit-overflow-scrolling: touch; scrollbar-width: none;
      }
      .ms-forecast::-webkit-scrollbar { display: none; }
      .ms-forecast-day {
        flex: 1; min-width: 48px;
        display: flex; flex-direction: column; align-items: center;
        gap: 4px; padding: 8px 4px;
      }
      .ms-forecast-weekday { font-size: 13px; font-weight: 600; color: var(--ms-text-secondary); }
      .ms-forecast-icon {
        width: clamp(28px, 7cqw, 36px); height: clamp(28px, 7cqw, 36px);
        display: flex; align-items: center; justify-content: center;
      }
      .ms-forecast-icon img {
        width: 100% !important; height: 100% !important;
        object-fit: contain; font-size: inherit !important;
      }
      .ms-forecast-icon ha-icon {
        --mdc-icon-size: clamp(28px, 7cqw, 36px) !important;
      }
      .ms-forecast-temps { display: flex; flex-direction: column; align-items: center; }
      .ms-forecast-high { font-size: 15px; font-weight: 500; }
      .ms-forecast-low { font-size: 13px; color: var(--ms-text-secondary); }
      .ms-forecast-precip { font-size: 11px; color: var(--ms-accent); opacity: 0.8; }

      /* Chart Container */
      .ms-chart-container { margin: 10px 16px; }

      /* Footer */
      .ms-footer {
        text-align: center; padding: 8px 16px 16px;
        font-size: 11px; color: var(--ms-text-secondary); opacity: 0.5;
      }

      /* Wind Compass */
      .ms-wind-compass { width: 20px; height: 20px; position: relative; display: inline-block; }
      .ms-wind-compass::before {
        content: ''; position: absolute; inset: 0;
        border: 1.5px solid var(--ms-text-secondary);
        border-radius: 50%; opacity: 0.4;
      }
      .ms-wind-arrow {
        position: absolute; top: 50%; left: 50%; width: 0; height: 0;
        border-left: 4px solid transparent; border-right: 4px solid transparent;
        border-bottom: 10px solid var(--ms-accent);
        transform-origin: bottom center; transform: translate(-50%, -100%);
      }

      /* ── Mobile-first responsive ── */
      @media (max-width: 480px) {
        .ms-temp { font-size: clamp(48px, 18vw, 60px); }
        .ms-location { font-size: clamp(20px, 6vw, 24px); }
        .ms-weather-icon { width: clamp(48px, 14vw, 64px); height: clamp(48px, 14vw, 64px); }
        .ms-weather-icon img { width: 100% !important; height: 100% !important; object-fit: contain; }
        .ms-weather-icon ha-icon { --mdc-icon-size: clamp(48px, 14vw, 64px) !important; }
        .ms-swiss-grid { grid-template-columns: 1fr 1fr; }
        .ms-section { margin: 8px 12px; padding: 12px; }
        .ms-pill { padding: 6px 10px; font-size: 13px; }
        .ms-forecast-day { min-width: 42px; }
        .ms-forecast-high { font-size: 14px; }
        .ms-forecast-low { font-size: 12px; }
        .ms-forecast-weekday { font-size: 12px; }
      }

      /* ── Container queries for card width (not viewport) ── */
      @container (max-width: 350px) {
        .ms-temp { font-size: clamp(40px, 16cqw, 52px); }
        .ms-location { font-size: 18px; }
        .ms-weather-icon { width: 48px; height: 48px; }
        .ms-weather-icon img { width: 100% !important; height: 100% !important; }
        .ms-weather-icon ha-icon { --mdc-icon-size: 48px !important; }
        .ms-section { margin: 6px 10px; padding: 10px; }
        .ms-pill { padding: 5px 8px; font-size: 12px; }
        .ms-swiss-grid { grid-template-columns: 1fr 1fr; gap: 6px; }
        .ms-forecast-day { min-width: 38px; padding: 6px 2px; }
        .ms-forecast-icon { width: 26px; height: 26px; }
        .ms-forecast-icon img { width: 100% !important; height: 100% !important; }
        .ms-forecast-icon ha-icon { --mdc-icon-size: 26px !important; }
        .ms-forecast-high { font-size: 13px; }
        .ms-forecast-low { font-size: 11px; }
        .ms-section-label { font-size: 10px; }
      }

      @container (min-width: 600px) {
        .ms-temp { font-size: clamp(64px, 10cqw, 84px); }
        .ms-location { font-size: clamp(24px, 4cqw, 32px); }
        .ms-weather-icon { width: clamp(72px, 14cqw, 96px); height: clamp(72px, 14cqw, 96px); }
        .ms-weather-icon img { width: 100% !important; height: 100% !important; }
        .ms-weather-icon ha-icon { --mdc-icon-size: clamp(72px, 14cqw, 96px) !important; }
        .ms-metrics { justify-content: center; }
        .ms-swiss-grid { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); }
      }
    `;
  }
  setConfig(n) {
    if (!n.entity) throw new Error("Entity required");
    this.config = n, setTimeout(() => {
      this._loadForecast();
    }, 500);
  }
  getCardSize() {
    return 8;
  }
  static getStubConfig() {
    return {
      type: "custom:" + xe,
      entity: "",
      show_location: !0,
      location: "Schweiz",
      show_forecast: !0,
      forecast_hours: 6,
      show_temperature: !0,
      show_precipitation: !0,
      show_sunshine: !0,
      show_warnings: !0,
      show_wind: !0,
      show_swiss: !0,
      show_heating: !0,
      auto_resolve_entities: !0,
      enable_animate_weather_icons: !0,
      display_mode: "full",
      compact_mode: !1,
      chart_order: ["temperature", "precipitation", "sunshine", "wind", "forecast"]
    };
  }
  static getConfigElement() {
    return document.createElement(dr);
  }
  static getConfigSchema() {
    return hr;
  }
  _getEntityState(n) {
    return this.hass?.states[n];
  }
  /** Parse entity state to float, returning fallback for unavailable/unknown/NaN */
  _safeParseFloat(n, e = NaN) {
    if (!n || n === "unavailable" || n === "unknown") return e;
    const t = parseFloat(n);
    return isNaN(t) ? e : t;
  }
  _formatWindDirection(n) {
    return ["N", "NNO", "NO", "ONO", "O", "OSO", "SO", "SSO", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"][Math.round(n / 22.5) % 16];
  }
  // ═══════════════════════════════════════════════════════════════
  // RENDER — iOS Weather Layout
  // ═══════════════════════════════════════════════════════════════
  render() {
    if (!this.hass || !this.config) return c``;
    const n = this.config.display_mode || (this.config.compact_mode ? "compact" : "full");
    this.setAttribute("data-display", n), n === "auto" && !this._resizeObserver ? (this._resizeObserver = new ResizeObserver((F) => {
      const Q = (F[0]?.contentRect?.width ?? 400) < 350 ? "compact" : "full";
      this.getAttribute("data-display-effective") !== Q && (this.setAttribute("data-display-effective", Q), this.requestUpdate());
    }), this._resizeObserver.observe(this)) : n !== "auto" && this._resizeObserver && (this._resizeObserver.disconnect(), this._resizeObserver = null, this.removeAttribute("data-display-effective"));
    const t = (n === "auto" ? this.getAttribute("data-display-effective") || "full" : n) === "compact", i = (this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2);
    i !== this._loadedLang && (this._loadedLang = i, ee(i).then(() => this.requestUpdate()));
    const r = this._getEntityState(this.config.entity);
    if (!r) return c`<div style="padding:20px;">Entity not found: ${this.config.entity}</div>`;
    const s = r.state, o = this.config.wind_entity ? this._getEntityState(this.config.wind_entity) : this._resolvedEntities?.wind_speed ? this._getEntityState(this._resolvedEntities.wind_speed) : null, l = this.config.wind_direction_entity ? this._getEntityState(this.config.wind_direction_entity) : this._resolvedEntities?.wind_direction ? this._getEntityState(this._resolvedEntities.wind_direction) : null, a = this.config.sunshine_entity ? this._getEntityState(this.config.sunshine_entity) : this._resolvedEntities?.sunshine_duration ? this._getEntityState(this._resolvedEntities.sunshine_duration) : null, h = this._resolvedEntities?.temperature ? this._safeParseFloat(this._getEntityState(this._resolvedEntities.temperature)?.state) : NaN, d = isNaN(h) ? r.attributes.temperature ?? 0 : h, p = this._resolvedEntities?.pressure ? this._safeParseFloat(this._getEntityState(this._resolvedEntities.pressure)?.state) : NaN, f = o ? this._safeParseFloat(o.state) : r.attributes.wind_speed ?? 0, g = l ? this._safeParseFloat(l.state) : r.attributes.wind_bearing ?? 0, b = r.attributes.humidity ?? 0, k = isNaN(p) ? r.attributes.pressure ?? 0 : p, x = this._forecast[0], L = x?.temperature ?? d, P = x?.templow ?? d, H = this.config.show_location !== !1, B = this.config.location || X("location"), j = this.config.warning_entity || (this._resolvedEntities?.any_alert ? this._resolvedEntities.any_alert : void 0), C = this.config.primary_warning_entity ? this._getEntityState(this.config.primary_warning_entity) : null, v = this.config.secondary_warning_entity ? this._getEntityState(this.config.secondary_warning_entity) : null, M = this.config.tertiary_warning_entity ? this._getEntityState(this.config.tertiary_warning_entity) : null, D = j ? this._getEntityState(j) : null, $ = this.config.primary_warning_entity && !C || !this.config.primary_warning_entity && j && !D;
    return c`
      ${H ? c`
        <div class="ms-header">
          <div class="ms-location">${B}</div>
          <div class="ms-header-main">
            <div class="ms-weather-icon">
              ${Et(s, this.config.enable_animate_weather_icons !== !1 ? "animated" : "mdi", void 0, s !== "clear-night")}
            </div>
            <div class="ms-temp">${Math.round(d)}<span class="ms-temp-unit">°</span></div>
          </div>
          <div class="ms-condition">${X(s)}</div>
          <div class="ms-hl">H:${Math.round(L)}° T:${Math.round(P)}°</div>
        </div>
      ` : ""}

      ${this.config.show_warnings !== !1 ? $ ? nt() : Cr(D, C, v, M, this._openWarnings, this._toggleWarning, this.hass) : ""}

      ${this._renderMetricsSection(f, g, b, k, a)}

      ${this.config.show_swiss !== !1 && !t ? this._renderSwissSection() : ""}
      ${this.config.show_heating !== !1 && !t ? this._renderHeatingSection() : ""}

      ${(this.config.show_temperature !== !1 || this.config.show_precipitation !== !1 || this.config.show_sunshine !== !1 || this.config.show_wind !== !1) && !t ? c`<div class="ms-chart-container">${this._renderCharts()}</div>` : ""}

      ${this.config.show_forecast !== !1 ? this._renderForecastSection() : ""}

      <div class="ms-footer">MeteoSwiss · ${X("location")}</div>
    `;
  }
  // ── Metrics as iOS pills ────────────────────────────────────────
  _renderMetricsSection(n, e, t, i, r) {
    return c`
      <div class="ms-section">
        <div class="ms-metrics">
          <div class="ms-pill">
            <ha-icon icon="mdi:weather-windy"></ha-icon>
            <span class="ms-pill-value">${Math.round(n)}</span>
            <span class="ms-pill-label">km/h ${this._formatWindDirection(e)}</span>
          </div>
          <div class="ms-pill">
            <ha-icon icon="mdi:water-percent"></ha-icon>
            <span class="ms-pill-value">${t}</span>
            <span class="ms-pill-label">%</span>
          </div>
          <div class="ms-pill">
            <ha-icon icon="mdi:gauge"></ha-icon>
            <span class="ms-pill-value">${i}</span>
            <span class="ms-pill-label">hPa</span>
          </div>
          ${r ? c`<div class="ms-pill">
                <ha-icon icon="mdi:white-balance-sunny"></ha-icon>
                <span class="ms-pill-value">${this._safeParseFloat(r.state, 0).toFixed(1)}</span>
                <span class="ms-pill-label">h Sonne</span>
              </div>` : ""}
        </div>
      </div>
    `;
  }
  // ── Swiss section ───────────────────────────────────────────────
  _renderSwissSection() {
    if (!this.hass) return c``;
    const n = this.config.foehn_entity || this._resolvedEntities?.foehn_index, e = this.config.snow_entity || this._resolvedEntities?.snow_depth, t = this.config.freezing_level_entity || this._resolvedEntities?.freezing_level, i = n ? Ye(this.hass, n) : null, r = e ? Ye(this.hass, e) : null, s = t ? Ye(this.hass, t) : null;
    if (i === null && r === null && s === null) return c``;
    const o = i !== null ? bl(i) : null;
    return c`
      <div class="ms-section ms-swiss-section">
        <div class="ms-section-label"><ha-icon icon="mdi:flag-variant"></ha-icon> Schweizer Werte</div>
        <div class="ms-swiss-grid">
          ${o ? c`
            <div class="ms-swiss-item">
              <div class="ms-foehn-badge" style="background:${o.color}22;color:${o.color};">${o.label}</div>
              <div class="ms-swiss-label">Föhn</div>
            </div>` : ""}
          ${r !== null && r > 0 ? c`
            <div class="ms-swiss-item">
              <div class="ms-swiss-value">${r.toFixed(0)} cm</div>
              <div class="ms-swiss-label">Schnee</div>
            </div>` : ""}
          ${s !== null ? c`
            <div class="ms-swiss-item">
              <div class="ms-swiss-value">${s.toFixed(0)} m</div>
              <div class="ms-swiss-label">0°C-Grenze</div>
            </div>` : ""}
        </div>
      </div>
    `;
  }
  // ── Heating section ─────────────────────────────────────────────
  _renderHeatingSection() {
    if (!this.hass) return c``;
    const n = this.config.heating_degree_days_entity || this._resolvedEntities?.heating_degree_days, e = this.config.season_heating_entity || this._resolvedEntities?.season_heating_degree_days, t = n ? Ye(this.hass, n) : null, i = e ? Ye(this.hass, e) : null;
    if (t === null && i === null) return c``;
    const r = (/* @__PURE__ */ new Date()).getMonth() + 1;
    return r < 10 && r > 4 && t === 0 && i === 0 ? c`` : c`
      <div class="ms-section ms-heating-section">
        <div class="ms-section-label"><ha-icon icon="mdi:thermostat"></ha-icon> Heizgradtage</div>
        <div class="ms-hdd">
          <div class="ms-hdd-today">
            <span class="ms-hdd-value">${t !== null ? t.toFixed(1) : "--"}</span>
            <span class="ms-hdd-unit">°C·d heute</span>
          </div>
          ${i !== null ? c`<div class="ms-hdd-season">Saison: ${i.toFixed(0)} °C·d</div>` : ""}
        </div>
      </div>
    `;
  }
  // ── Hourly charts (existing dmoo500 charts, restyled container) ─
  _renderCharts() {
    const n = [], e = this.config.forecast_hours ?? 6, t = Array.isArray(this.config.chart_order) ? [...this.config.chart_order] : ["temperature", "precipitation", "sunshine", "wind"], i = this._getEntityState(this.config.sun_entity || "sun.sun"), r = this._getEntityState(this.config.entity);
    for (const s of t)
      if (s !== "forecast")
        switch (s) {
          case "temperature":
            this.config.show_temperature !== !1 && this._hourlyForecast.length > 0 && n.push(c`<forecast-temperature-chart
              .hourlyForecast=${this._hourlyForecast}
              .forecastHours=${e}
              .show_temperature=${!0}
              ._t=${X}
              .showHoursChartLabel=${(o) => Gt(o)}
            ></forecast-temperature-chart>`);
            break;
          case "precipitation":
            this.config.show_precipitation !== !1 && this._hourlyForecast.length > 0 && n.push(c`<precipitation-chart
              .hourlyForecast=${this._hourlyForecast}
              .forecastHours=${e}
              .show_precipitation=${!0}
              ._t=${X}
              .showHoursChartLabel=${(o) => Gt(o)}
            ></precipitation-chart>`);
            break;
          case "sunshine":
            this.config.show_sunshine !== !1 && this._hourlyForecast.length > 0 && n.push(c`<sunshine-chart
              .hourlyForecast=${this._hourlyForecast}
              .forecastHours=${e}
              .show_sunshine=${!0}
              .weatherEntity=${r}
              .sun_entity=${i}
              ._t=${X}
              .showHoursChartLabel=${(o) => Gt(o)}
            ></sunshine-chart>`);
            break;
          case "wind":
            this.config.show_wind !== !1 && this._hourlyForecast.length > 0 && n.push(c`<wind-chart
              .hourlyForecast=${this._hourlyForecast}
              .forecastHours=${e}
              .show_wind=${!0}
              ._t=${X}
              .showHoursChartLabel=${(o) => Gt(o)}
            ></wind-chart>`);
            break;
        }
    return n;
  }
  // ── Daily forecast as iOS strip ─────────────────────────────────
  _renderForecastSection() {
    if (!this._forecast || this._forecast.length === 0)
      return this._forecastLoading ? c`<div class="ms-footer">Lade Vorhersage…</div>` : c``;
    const n = this._forecast.slice(0, 7), e = /* @__PURE__ */ new Date();
    return c`
      <div class="ms-section">
        <div class="ms-section-label"><ha-icon icon="mdi:calendar-month"></ha-icon> 7-Tage Vorhersage</div>
        <div class="ms-forecast">
          ${n.map((t, i) => {
      const r = new Date(t.datetime), o = i === 0 || r.toDateString() === e.toDateString() ? "Heute" : r.toLocaleDateString(this.hass?.language || "de", { weekday: "short" }), l = t.condition;
      return c`
              <div class="ms-forecast-day">
                <div class="ms-forecast-weekday">${o}</div>
                <div class="ms-forecast-icon">
                  ${Et(l, this.config.enable_animate_weather_icons !== !1 ? "animated" : "mdi", "32px", !0)}
                </div>
                <div class="ms-forecast-temps">
                  <div class="ms-forecast-high">${Math.round(t.temperature ?? 0)}°</div>
                  <div class="ms-forecast-low">${Math.round(t.templow ?? 0)}°</div>
                  ${t.precipitation_probability && t.precipitation_probability > 0 ? c`<div class="ms-forecast-precip">${t.precipitation_probability}%</div>` : ""}
                </div>
              </div>
            `;
    })}
        </div>
      </div>
    `;
  }
};
Ee([
  m({ attribute: !1 })
], fe.prototype, "hass", 2);
Ee([
  m({ attribute: !1 })
], fe.prototype, "config", 2);
Ee([
  Z()
], fe.prototype, "_forecast", 2);
Ee([
  Z()
], fe.prototype, "_hourlyForecast", 2);
Ee([
  Z()
], fe.prototype, "_forecastLoading", 2);
Ee([
  Z()
], fe.prototype, "_openWarnings", 2);
Ee([
  Z()
], fe.prototype, "_resolvedEntities", 2);
fe = Ee([
  O(xe)
], fe);
const ve = `${ge}-forecast-diagram-card`, Sr = `${ve}-editor`, Ti = [
  {
    name: "entity",
    required: !0,
    selector: { entity: { domain: "weather" } },
    description: "forecast_diagram.config.descr.entity"
  }
];
var vl = Object.defineProperty, $l = Object.getOwnPropertyDescriptor, di = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? $l(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && vl(e, t, r), r;
};
W({
  // Loads the language by returning a JSON structure for a given language
  loader: (n) => U[n]
});
let Nt = class extends N {
  constructor() {
    super(), this._computeLabel = (n) => ({
      entity: u("forecast_diagram.config.entity"),
      sun_entity: u("forecast_diagram.config.sun_entity")
    })[n.name] || n.name, this._computeHelper = (n) => n.description ? u(n.description) : "";
  }
  setConfig(n) {
    const e = { ...n }, t = ["entity", "sun_entity"];
    for (const i of t)
      e[i] === "" && delete e[i];
    this._config = e, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config {
        padding: 16px;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--card-divider-color);
      }

      .header-title {
        font-size: 24px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }

      .header-subtitle {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }

      ha-form {
        display: block;
        margin-bottom: 24px;
      }

      .preview {
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        padding: 20px;
        margin-top: 24px;
      }

      .preview-title {
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--primary-text-color);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .preview-config {
        font-family: 'SFMono-Regular', 'Monaco', 'Consolas', monospace;
        font-size: 13px;
        color: var(--secondary-text-color);
        background: var(--code-editor-background-color, #f8f8f8);
        padding: 16px;
        border-radius: 8px;
        overflow-x: auto;
        white-space: pre-wrap;
        line-height: 1.4;
        border: 1px solid var(--divider-color);
      }
      .group {
        margin-bottom: 24px;
        padding: 16px 0 0 0;
        border-top: 1px solid var(--divider-color, #e0e0e0);
      }
      .group-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color, #007AFF);
        margin-bottom: 8px;
        margin-top: 0;
      }
      .card-config {
        padding: 16px;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--card-divider-color);
      }
      .header-title {
        font-size: 24px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }
      .header-subtitle {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }
      ha-form {
        display: block;
        margin-bottom: 24px;
      }
      .preview {
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        padding: 20px;
        margin-top: 24px;
      }
      .preview-title {
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--primary-text-color);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .preview-config {
        font-family: 'SFMono-Regular', 'Monaco', 'Consolas', monospace;
        font-size: 13px;
        color: var(--secondary-text-color);
        background: var(--code-editor-background-color, #f8f8f8);
        padding: 16px;
        border-radius: 8px;
        overflow-x: auto;
        white-space: pre-wrap;
        line-height: 1.4;
        border: 1px solid var(--divider-color);
      }

      @media (max-width: 768px) {
        .card-config {
          padding: 12px;
        }
      }
    `;
  }
  render() {
    if (!this.hass)
      return c`<div>Loading...</div>`;
    ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2));
    const n = {
      entity: typeof this._config?.entity == "string" ? this._config.entity : void 0,
      sun_entity: typeof this._config?.sun_entity == "string" ? this._config.sun_entity : void 0
    };
    return c`
      <div class="card-config">
        <div class="header">
          <div>
            <div class="header-title">🌦️ MeteoSwiss Forecast Diagram Card</div>
          </div>
        </div>

        <!-- General -->
        <div class="group">
          <div class="group-title">${u("forecast_diagram.config.group_general") || "General"}</div>
          <ha-form
            .hass=${this.hass}
            .data=${n}
            .schema=${[Ti.find((e) => e.name === "entity")].filter(Boolean)}
            .computeLabel=${this._computeLabel}
            .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>

        <!-- Sensors -->
        <div class="group">
          <div class="group-title">${u("forecast_diagram.config.group_sensors") || "Sensors"}</div>
          <ha-form
            .hass=${this.hass}
            .data=${n}
            .schema=${[Ti.find((e) => e.name === "sun_entity")].filter(Boolean)}
            .computeLabel=${this._computeLabel}
            .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>

        <!-- Configuration Preview -->
        ${this._config?.entity ? c`
                <div class="preview">
                  <div class="preview-title">📋 YAML-Config</div>
                  <div class="preview-config">${this._renderConfigPreview()}</div>
                </div>
              ` : ""}
      </div>
    `;
  }
  _renderConfigPreview() {
    const n = { ...this._config };
    return n.type || (n.type = "custom:" + ve), Object.keys(n).forEach((e) => {
      (n[e] === void 0 || n[e] === "") && delete n[e];
    }), Object.entries(n).map(([e, t]) => typeof t == "string" ? `${e}: "${t}"` : `${e}: ${t}`).join(`
`);
  }
  _valueChanged(n) {
    if (this._config || (this._config = {
      type: `custom:${ve}`,
      entity: "",
      sun_entity: ""
    }), n.type === "value-changed") {
      const e = {}, { ...t } = n.detail.value || {}, i = {
        ...this._config,
        ...t,
        ...e,
        type: "custom:" + ve
      };
      Object.keys(i).forEach((r) => {
        (i[r] === "" || i[r] === void 0) && delete i[r];
      }), this._config = i, oe(this, "config-changed", { config: this._config });
    }
  }
};
di([
  m({ attribute: !1 })
], Nt.prototype, "hass", 2);
di([
  m({ attribute: !1 })
], Nt.prototype, "lovelace", 2);
di([
  m({ attribute: !1 })
], Nt.prototype, "_config", 2);
Nt = di([
  O(Sr)
], Nt);
const Me = (n, e) => n?.states[e], kl = (n, e) => {
  const t = /* @__PURE__ */ new Date(), i = Me(n, e.entity), r = Me(n, e.sun_entity || "sun.sun");
  if (r?.state === "above_horizon") return !0;
  if (r?.state === "below_horizon") return !1;
  let s = null, o = null;
  if (i && i.attributes && "sunrise" in i.attributes && "sunset" in i.attributes && i.attributes.sunrise && i.attributes.sunset)
    s = new Date(i.attributes.sunrise), o = new Date(i.attributes.sunset);
  else if (r?.attributes) {
    const l = r.attributes.next_rising ? new Date(r.attributes.next_rising) : null, a = r.attributes.next_setting ? new Date(r.attributes.next_setting) : null;
    if (l && a) {
      const h = l > t ? new Date(l.getTime() - 864e5) : l, d = a;
      s = h, o = d;
    }
  }
  return !s || !o ? !0 : t >= s && t < o;
};
function me(n) {
  const e = window;
  e.customCards = e.customCards || [], e.customCards.push({
    ...n,
    preview: !0
    // documentationURL: `
  });
}
var Cl = Object.defineProperty, Al = Object.getOwnPropertyDescriptor, ft = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? Al(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && Cl(e, t, r), r;
};
W({
  // Loads the language by returning a JSON structure for a given language
  loader: (n) => U[n]
});
let Ie = class extends N {
  constructor() {
    super(), this._forecast = [], this._hourlyForecast = [], this._forecastLoading = !1;
  }
  connectedCallback() {
    super.connectedCallback();
  }
  updated(n) {
    super.updated(n);
  }
  static get styles() {
    return T`
      :host {
        display: block;
        height: 100%;
        box-sizing: border-box;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: 16px;
        box-shadow: var(
          --ha-card-box-shadow,
          0 4px 20px var(--box-shadow-color, rgba(0, 0, 0, 0.1))
        );
        font-family: var(
          --primary-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          sans-serif
        );
        color: var(--primary-text-color, #fff);
        min-height: calc(var(--card-grid-rows, 3) * 64px - 8px);
        --chart-inner-border: none;
        --chart-padding: 0;
        --chart-margin-top: 0;
        --chart-margin-bottom: 0;
      }

      daily-forecast-diagram {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 0;
      }

      .chart {
        background: var(--card-background-color, #fff);
        border-radius: 12px;
        padding: 15px;
        border: 1px solid var(--border-color, rgba(220, 20, 60, 0.1));
      }
    `;
  }
  async _loadForecast() {
    if (!(!this.hass || !this.config?.entity || this._forecastLoading)) {
      this._forecastLoading = !0;
      try {
        const [n, e] = await Promise.all([
          this.hass.callWS({
            type: "call_service",
            domain: "weather",
            service: "get_forecasts",
            service_data: {
              entity_id: this.config.entity,
              type: "daily"
            },
            return_response: !0
          }),
          this.hass.callWS({
            type: "call_service",
            domain: "weather",
            service: "get_forecasts",
            service_data: {
              entity_id: this.config.entity,
              type: "hourly"
            },
            return_response: !0
          })
        ]), t = n?.response;
        t && t[this.config.entity] ? (this._forecast = t[this.config.entity].forecast || [], this.requestUpdate("_forecast")) : this._forecast = [];
        const i = e?.response;
        i && i[this.config.entity] ? (this._hourlyForecast = i[this.config.entity].forecast || [], this.requestUpdate("_hourlyForecast")) : this._hourlyForecast = [];
      } catch {
        this._forecast = [], this._hourlyForecast = [];
      } finally {
        this._forecastLoading = !1;
      }
    }
  }
  setConfig(n) {
    if (!n.entity)
      throw new Error("You need to define an entity");
    this.config = n, setTimeout(() => {
      this._loadForecast();
    }, 1e3);
  }
  static getStubConfig() {
    return {
      type: `custom:${ve}`,
      entity: ""
    };
  }
  static getConfigElement() {
    return document.createElement(Sr);
  }
  // Schema for the visual editor
  static getConfigSchema() {
    return Ti;
  }
  getCardSize() {
    return this.config?.grid_options?.rows ?? 3;
  }
  // The rules for sizing your card in the grid in sections view
  getGridOptions() {
    return {
      rows: this.config?.grid_options?.rows ?? 3,
      columns: this.config?.grid_options?.columns ?? 12,
      min_columns: 12,
      max_columns: 48,
      min_rows: 3,
      max_rows: 8
    };
  }
  render() {
    const n = Me(this.hass, this.config.entity), e = this.config?.grid_options?.rows ?? 3;
    return this.style.setProperty("--card-grid-rows", e.toString()), n ? !this._forecast || this._forecast.length === 0 ? c`<div>Loading forecast...</div>` : !this._hourlyForecast || this._hourlyForecast.length === 0 ? c`<div>Loading hourly forecast...</div>` : this._forecast.length > 0 && this._hourlyForecast.length > 0 ? c`<daily-forecast-diagram
          .config=${{ ...this.config, enable_animate_weather_icons: !0 }}
          .forecast=${[...this._forecast?.slice(0, 7) ?? []]}
          .hourlyForecast=${[...this._hourlyForecast]}
          ._t=${X}
          .getWeatherIcon=${Et}
          .standalone=${!0}
        ></daily-forecast-diagram>` : c`` : c`<div>Entity not found: ${this.config.entity}</div>`;
  }
};
ft([
  m({ attribute: !1 })
], Ie.prototype, "hass", 2);
ft([
  m({ attribute: !1 })
], Ie.prototype, "config", 2);
ft([
  Z()
], Ie.prototype, "_forecast", 2);
ft([
  Z()
], Ie.prototype, "_hourlyForecast", 2);
ft([
  Z()
], Ie.prototype, "_forecastLoading", 2);
Ie = ft([
  O(ve)
], Ie);
const Mr = () => w`
  <defs>
    <radialGradient id="lwStormFlashGradient" cx="50%" cy="20%" r="90%">
      <stop offset="0%" style="stop-color:#ffff88;stop-opacity:1" />
      <stop offset="15%" style="stop-color:#fff59d;stop-opacity:0.95" />
      <stop offset="40%" style="stop-color:#ffeb3b;stop-opacity:0.8" />
      <stop offset="70%" style="stop-color:#ffc107;stop-opacity:0.5" />
      <stop offset="100%" style="stop-color:#ff8f00;stop-opacity:0.2" />
    </radialGradient>

    <!-- Dramatic storm flash (full background) -->
    <rect id="lwStormFlash" x="0" y="0" width="100%" height="100%" fill="url(#lwStormFlashGradient)" opacity="0">
      <animate attributeName="opacity" 
               values="0;0;0;1;0;0.9;0;1;0;0.5;0;0;0;0;0;0;0.6;0;0;0;0;0;0.8;0" 
               dur="6s" 
               repeatCount="indefinite"/>
    </rect>

    <!-- Thunder rumble glow layer -->
    <rect id="lwThunderRumble" x="0" y="0" width="100%" height="100%" fill="#fff9c4" opacity="0">
      <animate attributeName="opacity" 
               values="0;0;0.2;0.1;0.3;0.05;0.4;0;0;0;0;0;0;0;0;0;0.1;0;0;0;0;0;0.2;0" 
               dur="6s" 
               begin="0.5s"
               repeatCount="indefinite"/>
    </rect>

    <!-- Subtle flicker -->
    <rect id="lwLightningFlicker" x="0" y="0" width="100%" height="100%" fill="#fff176" opacity="0">
      <animate attributeName="opacity" 
               values="0;0.2;0;0.3;0;0.1;0;0.5;0;0.25;0;0;0;0;0;0;0;0;0;0;0;0;0;0" 
               dur="4s" 
               begin="0.2s"
               repeatCount="indefinite"/>
    </rect>
  </defs>
  <use href="#lwLightningFlicker"/>
  <use href="#lwStormFlash"/>
  <use href="#lwThunderRumble"/>
`, Sl = (n, e, t) => {
  if (!n)
    return c``;
  const i = {
    "clear-night": Ml(t),
    cloudy: Ll(t),
    fog: El(t),
    hail: Nl(t),
    lightning: Hl(t),
    "lightning-rainy": Dl(t),
    partlycloudy: e ? Fl(t) : Gl(t),
    pouring: Ol(t),
    rainy: Tl(t),
    snowy: Rl(t),
    "snowy-rainy": Pl(t),
    sunny: zl(),
    windy: Bn(t),
    "windy-variant": Bn(t),
    exceptional: Wl(t)
  };
  return n ? i[n] : c``;
}, Ml = (n) => w`
  <defs>
    <linearGradient id="moonGradient" x1="21.92" x2="38.52" y1="18.75" y2="47.52" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#86c3db"/>
      <stop offset=".45" stop-color="#86c3db"/>
      <stop offset="1" stop-color="#5eafcf"/>
      <animateTransform attributeName="gradientTransform" dur="10s" repeatCount="indefinite" type="rotate" values="5 32 32; -15 32 32; 5 32 32"/>
    </linearGradient>
    <linearGradient id="starGradient" x1="23.22" x2="40.78" y1="16.8" y2="47.2" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fcd966"/>
      <stop offset=".45" stop-color="#fcd966"/>
      <stop offset="1" stop-color="#fccd34"/>
      <animateTransform attributeName="gradientTransform" dur="18s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/>
    </linearGradient>
  <!-- star -->
  <g id="starIcon">
    <path fill="url(#starGradient)" stroke="#fcd34d" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M33 23l9.06-4.25a2.39 2.39 0 013.18 3.18L41 31a2.42 2.42 0 000 2l4.25 9.06a2.39 2.39 0 01-3.18 3.18L33 41a2.42 2.42 0 00-2 0l-9.06 4.25a2.39 2.39 0 01-3.18-3.18L23 33a2.42 2.42 0 000-2l-4.25-9.06a2.39 2.39 0 013.18-3.18L31 23a2.42 2.42 0 002 0z">
      <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="1; 0.4; 1"/>
      <animateTransform attributeName="transform" dur="18s" repeatCount="indefinite" type="rotate" values="360 32 32; 0 32 32"/>
    </path>
  </g>
  </defs>
  <!-- moon -->
  <g id="clearNightIcon" transform="translate(168,-30) scale(3)">
    <path fill="url(#moonGradient)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M46.66 36.2a16.66 16.66 0 01-16.78-16.55 16.29 16.29 0 01.55-4.15A16.56 16.56 0 1048.5 36.1c-.61.06-1.22.1-1.84.1z">
      <animateTransform attributeName="transform" dur="10s" repeatCount="indefinite" type="rotate" values="-5 32 32; 15 32 32; -5 32 32"/>
    </path>
  </g>
  <!-- stars -->
  <g>
  ${Array.from({ length: Math.ceil(n / 100) }, (e, t) => t).map((e) => {
  const t = Math.floor(Math.random() * 100), i = Math.floor(Math.random() * 10), r = (t - 50) / 5 + e * Math.floor(Math.random() * 25), s = e * 100 + i;
  return w`
    <use href="#starIcon" x="0" y="0" transform="translate(${s},${r}) scale(0.5)"/>
    `;
})}
  </g>
`, zl = () => w`
  <defs>
    <linearGradient id="sunshineBlueGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4fc3f7" />
      <stop offset="80%" stop-color="#4fc3f7" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="sunGradient" x1="21.92" x2="38.52" y1="18.75" y2="47.52" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fcd966"/>
      <stop offset=".45" stop-color="#fcd966"/>
      <stop offset="1" stop-color="#fccd34"/>
      <animateTransform attributeName="gradientTransform" dur="18s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/>
    </linearGradient>
  </defs>
  <!-- background -->
  <rect width="100%" height="80%" fill="url(#sunshineBlueGradient)" />
  <!-- sun -->
  <g id="sunIcon" transform="translate(168,-30) scale(3)">
    <circle cx="32" cy="32" r="10.5" fill="url(#sunGradient)" stroke="#fcd34d" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" />
    <path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21">
      <animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/>
    </path>
  </g>
`, Ll = (n) => w`
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a3bdc9ff" />
      <stop offset="100%" stop-color="#90d4f4ff" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="a" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <g id="icon">
      <path fill="url(#a)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
    </g>
  </defs>
  <!-- background -->
  <rect width="100%" height="80%" fill="url(#background)" />
  ${ce(n)}
  `, El = (n) => w`
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a3bdc9ff" />
      <stop offset="100%" stop-color="#90d4f4ff" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="fogCloud" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <linearGradient id="fogLine1" x1="27.5" x2="36.5" y1="50.21" y2="65.79" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#d4d7dd"/>
      <stop offset=".45" stop-color="#d4d7dd"/>
      <stop offset="1" stop-color="#bec1c6"/>
    </linearGradient>
    <g id="icon">
      <path fill="url(#fogCloud)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
      <path fill="none" stroke="url(#fogLine1)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M17 58h30">
        <animateTransform attributeName="transform" begin="0s" dur="5s" repeatCount="indefinite" type="translate" values="-4 0; 4 0; -4 0"/>
      </path>
      <path fill="none" stroke="url(#fogLine2)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M17 52h30">
        <animateTransform attributeName="transform" begin="-4s" dur="5s" repeatCount="indefinite" type="translate" values="-4 0; 4 0; -4 0"/>
      </path>
    </g>
  </defs>
  <!-- background -->
  <rect width="100%" height="80%" fill="url(#background)" />
  ${ce(n)}
  `, Nl = (n) => w`
  <defs>
    <linearGradient id="hailBackground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#9eb7c6" />
      <stop offset="100%" stop-color="#87b9d3" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="hailGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <radialGradient id="hailStone" cx="32" cy="32" r="12" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#d9ecff"/>
      <stop offset="1" stop-color="#8ec0df"/>
    </radialGradient>
    <g id="hailIcon">
      <path fill="url(#hailGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
      <circle cx="24" cy="50" r="2.2" fill="url(#hailStone)">
        <animateTransform attributeName="transform" dur="0.9s" repeatCount="indefinite" type="translate" values="0 -7; 0 12"/>
        <animate attributeName="opacity" dur="0.9s" repeatCount="indefinite" values="1;1;0"/>
      </circle>
      <circle cx="32" cy="52" r="2.4" fill="url(#hailStone)">
        <animateTransform attributeName="transform" begin="-0.3s" dur="0.9s" repeatCount="indefinite" type="translate" values="0 -7; 0 12"/>
        <animate attributeName="opacity" begin="-0.3s" dur="0.9s" repeatCount="indefinite" values="1;1;0"/>
      </circle>
      <circle cx="40" cy="50" r="2.2" fill="url(#hailStone)">
        <animateTransform attributeName="transform" begin="-0.6s" dur="0.9s" repeatCount="indefinite" type="translate" values="0 -7; 0 12"/>
        <animate attributeName="opacity" begin="-0.6s" dur="0.9s" repeatCount="indefinite" values="1;1;0"/>
      </circle>
    </g>
  </defs>
  <rect width="100%" height="80%" fill="url(#hailBackground)" />
  ${Array.from({ length: Math.ceil(n / 100) }, (e, t) => t).map((e) => {
  const t = Math.floor(Math.random() * 100), i = Math.floor(Math.random() * 10), r = (t - 50) / 5 + e * Math.floor(Math.random() * 25), s = e * 100 + i;
  return w`
  <g>
    <use href="#hailIcon" x="0" y="-10" width="80" height="40" transform="scale(2.2) translate(${s},${r})" opacity="0.9"/>
    <animateTransform attributeName="transform" type="translate" values="0,0;20,0;0,0" dur="18s" repeatCount="indefinite"/>
  </g>
  `;
})}
  `, Tl = (n) => w`
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3580a39c" />
      <stop offset="80%" stop-color="#3482a79c" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <linearGradient id="a" x1="22.53" x2="25.47" y1="42.95" y2="48.05" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#4286ee"/>
      <stop offset=".45" stop-color="#4286ee"/>
      <stop offset="1" stop-color="#0950bc"/>
    </linearGradient>
    <linearGradient id="c" x1="29.53" x2="32.47" y1="42.95" y2="48.05" xlink:href="#a"/>
    <linearGradient id="d" x1="36.53" x2="39.47" y1="42.95" y2="48.05" xlink:href="#a"/>
    <g id="icon">
    <path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
    <path fill="none" stroke="url(#a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.39 43.03l-.78 4.94">
      <animateTransform attributeName="transform" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/>
      <animate attributeName="opacity" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/>
    </path>
    <path fill="none" stroke="url(#c)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.39 43.03l-.78 4.94">
      <animateTransform attributeName="transform" begin="-0.4s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/>
      <animate attributeName="opacity" begin="-0.4s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/>
    </path>
    <path fill="none" stroke="url(#d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.39 43.03l-.78 4.94">
      <animateTransform attributeName="transform" begin="-0.2s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/>
      <animate attributeName="opacity" begin="-0.2s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/>
    </path>
    </g>    
  </defs>
  <!-- background -->
  <rect width="100%" height="80%" fill="url(#background)" />
  ${ce(n)}
  
  `;
w`<g transform="translate(168,-30) scale(3)"><path fill="#f3f7fe" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><circle cx="24" cy="50" r="2.2" fill="#9ac9e4"/><circle cx="32" cy="52" r="2.4" fill="#9ac9e4"/><circle cx="40" cy="50" r="2.2" fill="#9ac9e4"/></g>`;
const Ol = (n) => w`
  <defs>
    <linearGradient id="extremeRainGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <g id="extremeRainIcon">
      <path fill="url(#extremeRainGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
    </g>
    <linearGradient id="extremeRainDropGradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#3a86ff" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#3a86ff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  
  <!-- Cloud -->
  <g>
    <use href="#extremeRainIcon" x="0" y="-10" width="80" height="40" transform="scale(2.2) translate(10,20)" opacity="0.9"/>
    <animateTransform attributeName="transform" type="translate" values="0,0;20,0;0,0" dur="18s" repeatCount="indefinite"/>
  </g>
  
  <!-- Rain drops -->
  ${Array.from({ length: Math.ceil(n / 20) }, (e, t) => t).map((e) => {
  const t = Math.floor(Math.random() * 100), i = Math.floor(Math.random() * 10), r = (t - 50) / 5 + e * Math.floor(Math.random() * 25), s = e * 20 + i;
  return w`
    <line x1="${s}" y1="${r}" x2="${s}" y2="${r + 10}" stroke="url(#extremeRainDropGradient)" stroke-width="2" stroke-linecap="round">
      <animate attributeName="y1" values="${r}; ${r + 20}" dur="0.5s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="${r + 10}; ${r + 30}" dur="0.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1; 0" dur="0.5s" repeatCount="indefinite"/>
    </line>
    `;
})}
  `, Bn = (n) => w`
  <defs>
    <linearGradient id="windGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <g id="windIcon">
      <path fill="url(#windGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
    </g>
    <linearGradient id="windLineGradient" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#9ca3af" stop-opacity="0"/>
      <stop offset="50%" stop-color="#9ca3af" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#9ca3af" stop-opacity="0"/>
    </linearGradient>
  </defs>
  
  <!-- Cloud -->
  <g>
    <use href="#windIcon" x="0" y="-10" width="80" height="40" transform="scale(2.2) translate(10,20)" opacity="0.9"/>
    <animateTransform attributeName="transform" type="translate" values="0,0;20,0;0,0" dur="18s" repeatCount="indefinite"/>
  </g>
  
  <!-- Wind lines -->
  ${Array.from({ length: Math.ceil(n / 50) }, (e, t) => t).map((e) => {
  const t = Math.floor(Math.random() * 100), i = Math.floor(Math.random() * 10), r = (t - 50) / 5 + e * Math.floor(Math.random() * 25), s = e * 50 + i;
  return w`
    <line x1="${s}" y1="${r}" x2="${s + 30}" y2="${r}" stroke="url(#windLineGradient)" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="${s}; ${s + 10}; ${s}" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="${s + 30}; ${s + 40}; ${s + 30}" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1; 0.4; 1" dur="3s" repeatCount="indefinite"/>
    </line>
    `;
})}
  `, Hl = (n) => w`
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2e414aff" />
      <stop offset="100%" stop-color="#467388ff" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="thunderstormGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
   
    <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#87ceeb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4169e1;stop-opacity:1" />
    </linearGradient>
    
    <g id="icon">
      <path fill="url(#thunderstormGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
      <path fill="#facc15" stroke="#f6a823" stroke-miterlimit="10" stroke-width=".5" d="M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z">
        <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1"/>
      </path>
    </g>
  </defs>
  <!-- background -->
  <rect width="100%" height="100%" fill="url(#background)" />
 
   ${ce(n)}
   
  <!-- Lightning flash effect that illuminates the entire background (full-size overlay) -->
  ${Mr()}
  `, Dl = (n) => w`
  <defs>
    <linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <linearGradient id="a" x1="22.53" x2="25.47" y1="42.95" y2="48.05" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#4286ee"/>
      <stop offset=".45" stop-color="#4286ee"/>
      <stop offset="1" stop-color="#0950bc"/>
    </linearGradient>
    <linearGradient id="c" x1="29.53" x2="32.47" y1="42.95" y2="48.05" xlink:href="#a"/>
    <linearGradient id="d" x1="36.53" x2="39.47" y1="42.95" y2="48.05" xlink:href="#a"/>
    <linearGradient id="e" x1="26.74" x2="35.76" y1="37.88" y2="53.52" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f7b23b"/>
      <stop offset=".45" stop-color="#f7b23b"/>
      <stop offset="1" stop-color="#f59e0b"/>
    </linearGradient>
    <g id="icon">
      <path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
      <path fill="none" stroke="url(#a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.39 43.03l-.78 4.94">
        <animateTransform attributeName="transform" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/>
        <animate attributeName="opacity" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#c)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.4s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/>
        <animate attributeName="opacity" begin="-0.4s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/>
      </path>
      <path fill="none" stroke="url(#d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.2s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/>
        <animate attributeName="opacity" begin="-0.2s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/>
      </path>
      <path fill="url(#e)" stroke="#f6a823" stroke-miterlimit="10" stroke-width=".5" d="M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z">
        <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1"/>
      </path>
    </g>
  </defs>

  ${ce(n)}
  
  <!-- Lightning flash effect for rainy thunderstorms -->
  ${Mr()}
  `, ce = (n) => w`
${Array.from({ length: Math.ceil(n / 10) }, (e, t) => t).map((e) => {
  const t = Math.floor(Math.random() * 100), i = Math.floor(Math.random() * 10), r = (t - 50) / 5 + e * Math.floor(Math.random() * 25), s = e * 100 + i, o = Math.floor(Math.random() * 2) + 1, l = 1 + Math.random() * 1, a = 44 + Math.floor(Math.random() * 90);
  return w`
    <g>
      <use href="#icon" x="${s}" y="${r}" width="80" height="40" transform="scale(${o})" opacity="0">
        <animate attributeName="opacity" values="0;${l};${l};0" dur="${a}s" repeatCount="indefinite"/>
      </use>
      <animateTransform attributeName="transform" type="translate" values="-150,20;450,20" dur="${a}s" repeatCount="indefinite"/>
    </g>
    `;
})}
  `, Pl = (n) => w`
  <defs>
    <linearGradient id="sleetGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <g id="icon">
      <path fill="url(#sleetGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
      <circle cx="24" cy="42" r="4" fill="#a8dadc"/>
      <circle cx="40" cy="42" r="4" fill="#a8dadc"/>
      <line x1="32" y1="34" x2="32" y2="38" stroke="#3a86ff" stroke-width="2" stroke-linecap="round">
        <animate attributeName="y1" values="34; 44" dur="1s" repeatCount="indefinite"/>
        <animate attributeName="y2" values="38; 48" dur="1s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1; 0" dur="1s" repeatCount="indefinite"/>
      </line>
    </g>
  </defs>
  
  ${ce(n)}
  `, Rl = (n) => w`
  <defs>
    <linearGradient id="snowGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <g id="snowIcon">
      <path fill="url(#snowGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
    </g>
    <linearGradient id="snowFlakeGradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#dbeafe" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#dbeafe" stop-opacity="0"/>
    </linearGradient>
    <g id="snowFlakeIcon" stroke="url(#snowFlakeGradient)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <line x1="0" y1="-4" x2="0" y2="4"/>
      <line x1="-3" y1="-3" x2="3" y2="3"/>
      <line x1="-3" y1="3" x2="3" y2="-3"/>
    </g>
    <g id="cloudIcon">
      <use href="#snowIcon" x="0" y="-10" width="80" height="40" transform="scale(2.2) translate(10,20)" opacity="0.9"/>
      <animateTransform attributeName="transform" type="translate" values="0,0;20,0;0,0" dur="18s" repeatCount="indefinite"/>
    </g>
    <g id="icon">
      <use href="#snowFlakeIcon" x="0" y="0" width="8" height="8" opacity="1"/>
      <animateTransform attributeName="transform" type="translate" values="0,0;0,20" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1; 0" dur="3s" repeatCount="indefinite"/>
    </g>

  </defs>
  
  ${ce(n)}
  `, Fl = (n) => w`
  <defs>
    <linearGradient id="sunshineBlueGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4fc3f7" />
      <stop offset="100%" stop-color="#4fc3f7" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="partlyCloudyDayGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <linearGradient id="a" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fbbf24"/>
      <stop offset=".45" stop-color="#fbbf24"/>
      <stop offset="1" stop-color="#f59e0b"/>
    </linearGradient
    <g id="cloudIcon">
      <path fill="url(#partlyCloudyDayGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
    </g>
    <g id="icon">
      <path fill="url(#partlyCloudyDayGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
    </g>
    <g id="sunIcon">
      <circle cx="32" cy="32" r="10.5" fill="url(#a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/>
      <path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21">
        <animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/>
      </path>
    </g>
  </defs>
  <!-- background -->
  <rect width="100%" height="100%" fill="url(#sunshineBlueGradient)" />
  <!-- Sun -->
  <g>
    <use href="#sunIcon" x="200" y="50" width="100" height="100" opacity="0.9"/>
  </g>
  ${ce(n)}
  `, Gl = (n) => w`
  <defs>
    <linearGradient id="partlyCloudyNightGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <g id="icon">
      <path fill="url(#partlyCloudyNightGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
    </g>
    <g id="moonIcon">
      <path fill="#fbbf24" stroke="#f59e0b" stroke-width="1" d="M12 2a10 10 0 1010 10A8 8 0 0112 2z"/>
      <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="60s" repeatCount="indefinite"/>
    </g>
  </defs>
  <!-- Moon -->
  <g>
    <use href="#moonIcon" x="200" y="50" width="100" height="100" opacity="0.9"/>
  </g>
  ${ce(n)}
  `, Wl = (n) => w`
  <defs>
    <linearGradient id="hurricaneGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <g id="icon">
      <path fill="url(#hurricaneGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
      <circle cx="32" cy="36" r="6" fill="#f87171" stroke="#b91c1c" stroke-width="1"/>
      <path fill="#f87171" stroke="#b91c1c" stroke-width="1" d="M32 30a6 6 0 016 6h-6V30zM32 42a6 6 0 01-6-6h6v6zM26 36a6 6 0 016-6v6H26zM38 36a6 6 0 01-6 6v-6h6z"/>
    </g>
  </defs>
  
  ${ce(n)}
  `, $e = `${ge}-animated-background-card`, zr = `${$e}-editor`, ue = [
  {
    name: "scenery_image",
    required: !1,
    selector: { text: {} },
    description: "bg_card.config.descr.scenery_image"
  },
  {
    name: "entity",
    required: !0,
    selector: { entity: { domain: "weather" } },
    description: "bg_card.config.descr.entity"
  },
  {
    name: "sun_entity",
    required: !1,
    selector: { entity: { domain: "sun" } },
    description: "bg_card.config.descr.sun_entity"
  },
  {
    name: "show_sun_times",
    required: !1,
    selector: { boolean: {} },
    description: "bg_card.config.descr.show_sun_times"
  },
  {
    name: "forecast_mode",
    required: !1,
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "daily", label: "forecast_mode.daily" },
          { value: "hourly", label: "forecast_mode.hourly" },
          { value: "none", label: "forecast_mode.none" }
        ]
      }
    },
    description: "bg_card.config.descr.forecast_mode"
  },
  {
    name: "show_day_temps",
    required: !1,
    selector: { boolean: {} },
    description: "bg_card.config.descr.show_day_temps"
  },
  {
    name: "temperature_font_size",
    required: !1,
    selector: { number: { min: 12, max: 96, step: 1, mode: "box" } },
    description: "bg_card.config.descr.temperature_font_size"
  },
  {
    name: "photo_mode",
    required: !1,
    selector: { boolean: {} },
    description: "bg_card.config.descr.photo_mode"
  }
];
var Ul = Object.defineProperty, Il = Object.getOwnPropertyDescriptor, de = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? Il(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && Ul(e, t, r), r;
};
let ne = class extends N {
  constructor() {
    super(...arguments), this.hourlyForecast = [], this.forecastLoading = !1, this.show_forecast = !0, this.config = {}, this.compact = !0, this.maxHours = 6, this.alignRight = !0;
  }
  _fmtHour(n) {
    return new Date(n).toLocaleTimeString([], { hour: "2-digit" });
  }
  render() {
    if (this.show_forecast === !1 || this.config.show_forecast === !1) return c``;
    const n = (this.hourlyForecast || []).slice(0, Math.max(1, this.maxHours));
    return c`
      <div class="wrapper ${this.alignRight ? "align-right" : ""}">
        ${this.compact ? c`` : c`
                <div class="section-title">
                  <ha-icon icon="mdi:clock-outline"></ha-icon>
                  ${this._t("hourly_charts.forecast_hours", { hours: n.length })}
                </div>
              `}
        <div class="grid">
          ${n.map(
      (e) => c`
              <div class="tile">
                <div class="label">${this._fmtHour(e.datetime ?? e.time)}</div>
                <div class="icon">
                  ${this.getWeatherIcon(
        e.condition,
        this.config.enable_animate_weather_icons ? "animated" : "mdi",
        this.compact ? "18px" : "24px",
        !0
      )}
                </div>
                <div class="temps">
                  ${typeof e.temperature == "number" ? c`<span>${Math.round(e.temperature)}°</span>` : ""}
                </div>
              </div>
            `
    )}
        </div>
      </div>
    `;
  }
};
ne.styles = T`
    .wrapper {
      display: block;
      width: 100%;
    }
    .wrapper.align-right {
      display: flex;
      justify-content: flex-end;
    }

    .section-title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      color: var(--primary-text-color, #fff);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .grid {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-end;
      align-items: stretch;
      gap: 8px;
      overflow: hidden;
      padding: 0;
      margin: 0;
    }

    .tile {
      background: var(--card-background-color, rgba(255, 255, 255, 0.6));
      border-radius: 8px;
      padding: 8px 6px;
      text-align: center;
      border: 1px solid var(--border-color, rgba(220, 20, 60, 0.1));
      width: 64px;
      min-width: 64px;
      box-sizing: border-box;
    }

    .label {
      font-size: 10px;
      color: var(--secondary-text-color, #7f8c8d);
      margin-bottom: 4px;
    }
    .icon {
      font-size: 18px;
      margin: 4px 0;
    }
    .temps {
      font-size: 11px;
      display: flex;
      justify-content: center;
      gap: 6px;
    }

    @media (max-width: 400px) {
      .grid {
        gap: 6px;
      }
      .tile {
        width: 56px;
        min-width: 56px;
      }
      .icon {
        font-size: 16px;
      }
      .temps {
        font-size: 10px;
      }
    }
  `;
de([
  m({ type: Array })
], ne.prototype, "hourlyForecast", 2);
de([
  m({ type: Boolean })
], ne.prototype, "forecastLoading", 2);
de([
  m({ type: Boolean })
], ne.prototype, "show_forecast", 2);
de([
  m({ type: Object })
], ne.prototype, "config", 2);
de([
  m({ type: Function })
], ne.prototype, "_t", 2);
de([
  m({ type: Function })
], ne.prototype, "getWeatherIcon", 2);
de([
  m({ type: Boolean })
], ne.prototype, "compact", 2);
de([
  m({ type: Number })
], ne.prototype, "maxHours", 2);
de([
  m({ type: Boolean })
], ne.prototype, "alignRight", 2);
ne = de([
  O("hourly-forecast-chart")
], ne);
var Bl = Object.defineProperty, jl = Object.getOwnPropertyDescriptor, je = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? jl(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && Bl(e, t, r), r;
};
W({
  // Loads the language by returning a JSON structure for a given language
  loader: (n) => U[n]
});
let ze = class extends N {
  constructor() {
    super(...arguments), this._forecast = [], this._hourly = [], this._resolvedEntities = null, this._forecastLoading = !1, this._hourlyLoading = !1;
  }
  static get styles() {
    return T`
      :host {
        display: block;
        box-shadow: none;
        overflow: hidden;
        /* Calculate height according to HA docs: rows * 56px + (rows-1) * 8px gap */
        /* Simplified: height = rows * 64px - 8px */
        height: calc(var(--card-grid-rows, 4) * 64px - 8px);
        min-height: calc(var(--card-grid-rows, 4) * 64px - 8px);
        max-height: calc(var(--card-grid-rows, 4) * 64px - 8px);
        position: relative;
      }

      .bg-card-root {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 12px);
      }

      .temperature {
        position: absolute;
        top: 8px;
        left: 12px;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 45px;
        border: 2px solid var(--primary-text-color, #fff);
        background: var(--ha-card-background, var(--card-background-color, #fff));
        padding: 5px 12px;
        box-shadow: var(
          --ha-card-box-shadow,
          0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 1px 5px 0 rgba(0, 0, 0, 0.12),
          0 3px 1px -2px rgba(0, 0, 0, 0.2)
        );
        font-size: var(--bg-temp-font-size, 36px);
        font-weight: bold;
        text-align: center;
      }

      .img-svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        box-shadow: var(
          --ha-card-box-shadow,
          0 4px 20px var(--box-shadow-color, rgba(0, 0, 0, 0.1))
        );
      }

      .img-photo {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        overflow: hidden;
        isolation: isolate;
        box-shadow: var(
          --ha-card-box-shadow,
          0 4px 20px var(--box-shadow-color, rgba(0, 0, 0, 0.1))
        );
        transition:
          filter 1.1s ease,
          transform 1.1s ease;
      }

      .img-photo.day {
        filter: saturate(1.04) brightness(1.03) hue-rotate(0deg);
      }

      .img-photo.night {
        filter: saturate(0.86) brightness(0.82) hue-rotate(-8deg);
      }

      .photo-layer {
        position: absolute;
        inset: 0;
      }

      .photo-base {
        animation: bg-pan 34s ease-in-out infinite alternate;
      }

      .photo-scenery {
        background-size: cover;
        background-position: center bottom;
        background-repeat: no-repeat;
        z-index: 0;
        filter: saturate(1.05) brightness(1.0);
        transition: filter 1.1s ease;
      }

      .img-photo.day .photo-scenery {
        filter: saturate(1.08) brightness(1.02);
      }

      .img-photo.night .photo-scenery {
        filter: saturate(0.65) brightness(0.35) hue-rotate(-5deg);
      }

      .img-photo.has-scenery .photo-base {
        opacity: 0.55;
      }

      .img-photo.has-scenery.day .photo-base {
        background: linear-gradient(
          180deg,
          rgba(135, 206, 250, 0.65) 0%,
          rgba(135, 206, 250, 0.25) 50%,
          rgba(135, 206, 250, 0) 100%
        ) !important;
        animation: none !important;
      }

      .img-photo.has-scenery.night .photo-base {
        background: linear-gradient(
          180deg,
          rgba(5, 16, 38, 0.85) 0%,
          rgba(5, 16, 38, 0.4) 50%,
          rgba(5, 16, 38, 0) 100%
        ) !important;
        animation: none !important;
      }

      .img-photo.has-scenery .photo-night-stars {
        height: 55%;
      }

      .photo-circadian {
        opacity: 0;
        transition: opacity 1.1s ease;
        z-index: 1;
        pointer-events: none;
      }

      .img-photo.day .photo-circadian {
        background:
          radial-gradient(circle at 72% 16%, rgba(255, 239, 181, 0.26), rgba(255, 239, 181, 0) 44%),
          linear-gradient(180deg, rgba(255, 245, 209, 0.1) 0%, rgba(255, 255, 255, 0) 72%);
        mix-blend-mode: screen;
        opacity: 0.58;
      }

      .img-photo.night .photo-circadian {
        background:
          radial-gradient(circle at 26% 18%, rgba(127, 161, 214, 0.2), rgba(127, 161, 214, 0) 40%),
          linear-gradient(180deg, rgba(7, 15, 33, 0.3) 0%, rgba(4, 10, 24, 0.5) 100%);
        mix-blend-mode: multiply;
        opacity: 0.74;
      }

      .img-photo.mood-sunny.day .photo-base {
        background:
          radial-gradient(circle at 75% 20%, rgba(255, 250, 196, 0.95), rgba(255, 250, 196, 0) 45%),
          linear-gradient(
            160deg,
            rgba(123, 198, 250, 0.95) 0%,
            rgba(88, 163, 221, 0.92) 46%,
            rgba(67, 138, 191, 0.96) 100%
          );
      }

      .img-photo.mood-sunny.night .photo-base {
        background:
          radial-gradient(circle at 78% 18%, rgba(80, 120, 160, 0.12), rgba(80, 120, 160, 0) 40%),
          linear-gradient(
            165deg,
            rgba(12, 24, 45, 0.99) 0%,
            rgba(8, 16, 32, 0.99) 58%,
            rgba(2, 6, 15, 1) 100%
          );
      }

      .img-photo.mood-sunny.clear-night .photo-base,
      .img-photo.clear-night .photo-base {
        background: linear-gradient(
          180deg,
          rgba(5, 16, 38, 0.99) 0%,
          rgba(4, 12, 28, 1) 52%,
          rgba(1, 6, 16, 1) 100%
        );
        animation: none;
      }

      .img-photo.clear-night .photo-clouds {
        opacity: 0;
      }

      .img-photo.clear-night .photo-clouds-front {
        opacity: 0;
      }

      .img-photo.clear-night .photo-clouds-depth {
        opacity: 0;
      }

      .img-photo.clear-night .photo-cloud-shadow {
        opacity: 0;
      }

      .img-photo.clear-night .photo-sun-rays {
        opacity: 0;
        animation: none;
        display: none;
      }

      .img-photo.mood-cloudy .photo-sun-rays {
        opacity: 0;
        animation: none;
        display: none;
      }

      .img-photo.partly-cloudy .photo-sun-rays {
        opacity: 0;
        animation: none;
        display: none;
      }

      .img-photo.mood-cloudy.day .photo-base {
        background:
          radial-gradient(circle at 30% 15%, rgba(226, 238, 245, 0.6), rgba(226, 238, 245, 0) 40%),
          linear-gradient(
            160deg,
            rgba(144, 168, 183, 0.95) 0%,
            rgba(122, 147, 165, 0.96) 52%,
            rgba(96, 121, 141, 0.98) 100%
          );
      }

      .img-photo.mood-cloudy.night .photo-base {
        background:
          radial-gradient(circle at 25% 12%, rgba(123, 140, 166, 0.24), rgba(123, 140, 166, 0) 44%),
          linear-gradient(
            165deg,
            rgba(40, 52, 71, 0.98) 0%,
            rgba(29, 40, 56, 0.98) 56%,
            rgba(20, 28, 40, 1) 100%
          );
      }

      .img-photo.foggy.day .photo-base {
        background: linear-gradient(
          180deg,
          rgba(158, 176, 188, 0.98) 0%,
          rgba(146, 165, 179, 0.99) 54%,
          rgba(132, 152, 168, 1) 100%
        );
      }

      .img-photo.foggy.night .photo-base {
        background: linear-gradient(
          180deg,
          rgba(41, 54, 68, 0.99) 0%,
          rgba(33, 45, 59, 1) 52%,
          rgba(24, 35, 48, 1) 100%
        );
      }

      .img-photo.mood-rainy.day .photo-base {
        background:
          radial-gradient(circle at 72% 8%, rgba(226, 239, 252, 0.35), rgba(226, 239, 252, 0) 45%),
          linear-gradient(
            168deg,
            rgba(95, 120, 139, 0.95) 0%,
            rgba(73, 97, 118, 0.97) 50%,
            rgba(54, 78, 96, 0.99) 100%
          );
      }

      .img-photo.mood-rainy.night .photo-base {
        background:
          radial-gradient(circle at 72% 12%, rgba(122, 145, 170, 0.14), rgba(122, 145, 170, 0) 42%),
          linear-gradient(
            168deg,
            rgba(25, 36, 54, 0.99) 0%,
            rgba(17, 26, 42, 1) 55%,
            rgba(10, 16, 27, 1) 100%
          );
      }

      .photo-clouds {
        background:
          radial-gradient(
            118% 86% at 6% 24%,
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.08) 48%,
            rgba(255, 255, 255, 0) 62%
          ),
          radial-gradient(
            120% 90% at 28% 20%,
            rgba(255, 255, 255, 0.48),
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0) 64%
          ),
          radial-gradient(
            124% 92% at 50% 22%,
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 64%
          ),
          radial-gradient(
            118% 88% at 72% 20%,
            rgba(255, 255, 255, 0.47),
            rgba(255, 255, 255, 0.08) 48%,
            rgba(255, 255, 255, 0) 62%
          ),
          radial-gradient(
            114% 84% at 95% 25%,
            rgba(255, 255, 255, 0.52),
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 64%
          ),
          linear-gradient(
            180deg,
            rgba(249, 253, 255, 0.42) 0%,
            rgba(233, 243, 252, 0.2) 34%,
            rgba(210, 224, 239, 0.04) 58%,
            rgba(210, 224, 239, 0) 74%
          ),
          linear-gradient(
            180deg,
            rgba(172, 194, 220, 0.18) 0%,
            rgba(172, 194, 220, 0.08) 46%,
            rgba(183, 205, 230, 0) 72%
          );
        filter: blur(5.5px) contrast(1.08) saturate(1.06) brightness(1.03);
        animation: cloud-drift 36s ease-in-out infinite alternate;
        opacity: 0.78;
      }

      .photo-clouds-front {
        background:
          radial-gradient(
            94% 74% at 0% 36%,
            rgba(255, 255, 255, 0.88),
            rgba(255, 255, 255, 0.16) 52%,
            rgba(255, 255, 255, 0) 66%
          ),
          radial-gradient(
            98% 76% at 22% 30%,
            rgba(255, 255, 255, 0.86),
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0) 64%
          ),
          radial-gradient(
            102% 78% at 48% 34%,
            rgba(255, 255, 255, 0.84),
            rgba(255, 255, 255, 0.16) 50%,
            rgba(255, 255, 255, 0) 66%
          ),
          radial-gradient(
            96% 74% at 74% 30%,
            rgba(255, 255, 255, 0.82),
            rgba(255, 255, 255, 0.14) 50%,
            rgba(255, 255, 255, 0) 64%
          ),
          radial-gradient(
            92% 72% at 100% 34%,
            rgba(255, 255, 255, 0.86),
            rgba(255, 255, 255, 0.16) 50%,
            rgba(255, 255, 255, 0) 66%
          ),
          linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.34) 0%,
            rgba(242, 249, 255, 0.18) 44%,
            rgba(211, 226, 242, 0.1) 64%,
            rgba(255, 255, 255, 0) 74%
          );
        filter: blur(2.8px) contrast(1.12) saturate(1.05)
          drop-shadow(0 6px 8px rgba(122, 149, 178, 0.18));
        animation: cloud-drift-front 22s ease-in-out infinite alternate;
        mix-blend-mode: normal;
        opacity: 0;
      }

      .photo-clouds-depth {
        background:
          radial-gradient(
            118% 86% at 14% 68%,
            rgba(217, 232, 248, 0.42),
            rgba(255, 255, 255, 0.08) 52%,
            rgba(255, 255, 255, 0) 68%
          ),
          radial-gradient(
            122% 90% at 46% 62%,
            rgba(210, 226, 243, 0.36),
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0) 66%
          ),
          radial-gradient(
            118% 88% at 78% 70%,
            rgba(215, 231, 247, 0.38),
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0) 66%
          ),
          linear-gradient(
            180deg,
            rgba(193, 214, 237, 0.28) 0%,
            rgba(172, 198, 225, 0.14) 44%,
            rgba(162, 189, 217, 0) 72%
          );
        filter: blur(7.5px) saturate(1.04);
        animation: cloud-drift-depth 28s ease-in-out infinite alternate;
        opacity: 0;
      }

      .img-photo.mood-cloudy .photo-clouds {
        opacity: 0.88;
      }

      .img-photo.mood-cloudy .photo-clouds-front {
        opacity: 0.8;
      }

      .img-photo.mood-cloudy .photo-clouds-depth {
        opacity: 0.62;
      }

      .img-photo.mood-rainy .photo-clouds {
        opacity: 0.94;
      }

      .img-photo.mood-rainy .photo-clouds-front {
        opacity: 0.9;
      }

      .img-photo.mood-rainy .photo-clouds-depth {
        opacity: 0.8;
      }

      .img-photo.mood-cloudy.night .photo-clouds,
      .img-photo.mood-rainy.night .photo-clouds {
        filter: blur(7px) saturate(0.9) brightness(0.88);
      }

      .img-photo.mood-cloudy.night .photo-clouds-front,
      .img-photo.mood-rainy.night .photo-clouds-front {
        mix-blend-mode: normal;
        filter: blur(4.8px) brightness(0.8);
      }

      .img-photo.mood-cloudy.night .photo-clouds-depth,
      .img-photo.mood-rainy.night .photo-clouds-depth {
        filter: blur(9px) saturate(0.86) brightness(0.78);
        opacity: 0.7;
      }

      .img-photo.partly-cloudy .photo-clouds {
        opacity: 0.62;
        filter: blur(9px) saturate(0.95);
      }

      .img-photo.partly-cloudy .photo-clouds-front {
        opacity: 0.36;
        filter: blur(7px) brightness(0.98);
      }

      .img-photo.partly-cloudy .photo-clouds-depth {
        opacity: 0.28;
        filter: blur(13px) saturate(0.9);
      }

      .img-photo.partly-cloudy.night .photo-clouds {
        opacity: 0.54;
        filter: blur(10px) saturate(0.82) brightness(0.9);
      }

      .img-photo.partly-cloudy.night .photo-clouds-front {
        opacity: 0.3;
        filter: blur(8px) brightness(0.84);
        mix-blend-mode: normal;
      }

      .img-photo.partly-cloudy.night .photo-clouds-depth {
        opacity: 0.24;
        filter: blur(14px) saturate(0.8) brightness(0.84);
      }

      .photo-fog {
        background:
          radial-gradient(
            130% 62% at 18% 74%,
            rgba(235, 243, 250, 0.34),
            rgba(235, 243, 250, 0) 72%
          ),
          radial-gradient(
            136% 66% at 72% 70%,
            rgba(229, 239, 248, 0.3),
            rgba(229, 239, 248, 0) 74%
          ),
          linear-gradient(
            180deg,
            rgba(217, 229, 240, 0.08) 0%,
            rgba(217, 229, 240, 0.24) 46%,
            rgba(217, 229, 240, 0.38) 100%
          );
        mix-blend-mode: screen;
        opacity: 0;
        animation: fog-drift 24s ease-in-out infinite alternate;
        z-index: 3;
        pointer-events: none;
      }

      .img-photo.foggy .photo-fog {
        opacity: 0.88;
      }

      .img-photo.foggy .photo-clouds {
        filter: blur(16px) saturate(0.72) brightness(0.94);
        opacity: 0.6;
      }

      .img-photo.foggy .photo-clouds-front {
        filter: blur(13px) saturate(0.68) brightness(0.92);
        opacity: 0.46;
      }

      .img-photo.foggy .photo-clouds-depth {
        filter: blur(20px) saturate(0.65) brightness(0.9);
        opacity: 0.44;
      }

      .img-photo.foggy .photo-cloud-shadow {
        opacity: 0.16;
      }

      .img-photo.foggy .photo-wind-streaks {
        opacity: 0;
      }

      .img-photo.sun-bloom.day .photo-sun-rays {
        opacity: 0.8;
      }

      .img-photo.windy .photo-wind-streaks {
        opacity: 1;
        height: 78%;
        animation-duration: 1.7s;
        background-size:
          260% 100%,
          240% 100%;
        background-position:
          -18% 18%,
          -58% 60%;
        filter: blur(0.15px);
      }

      .img-photo.windy .photo-wind-streaks::after {
        content: '';
        position: absolute;
        inset: 4% -8% 0 -8%;
        background-image:
          linear-gradient(
            114deg,
            rgba(224, 241, 255, 0) 0%,
            rgba(224, 241, 255, 0.3) 24%,
            rgba(224, 241, 255, 0.45) 38%,
            rgba(224, 241, 255, 0) 58%
          ),
          linear-gradient(
            114deg,
            rgba(204, 229, 250, 0) 14%,
            rgba(204, 229, 250, 0.24) 34%,
            rgba(204, 229, 250, 0.38) 52%,
            rgba(204, 229, 250, 0) 70%
          );
        background-size:
          280% 100%,
          250% 100%;
        background-position:
          -46% 24%,
          -86% 68%;
        animation: wind-streak-sweep-strong 1.35s linear infinite;
        opacity: 0.88;
        mix-blend-mode: screen;
        pointer-events: none;
      }

      .img-photo.windy .photo-clouds {
        animation-duration: 20s;
      }

      .img-photo.windy .photo-clouds-front {
        animation-duration: 10s;
      }

      .img-photo.windy .photo-clouds-depth {
        animation-duration: 14s;
      }

      .photo-rain {
        display: none;
      }

      .weather-particles {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 4;
      }

      .weather-cluster {
        position: absolute;
        top: 14%;
        width: 28%;
        height: 86%;
      }

      .weather-cluster.c1 {
        left: 4%;
      }

      .weather-cluster.c2 {
        left: 34%;
      }

      .weather-cluster.c3 {
        left: 64%;
      }

      .rain-drop {
        position: absolute;
        top: var(--start-y, -14%);
        left: var(--x, 50%);
        width: var(--w, 2px);
        height: var(--h, 22px);
        border-radius: 999px;
        background: linear-gradient(
          to bottom,
          rgba(224, 241, 255, 0),
          rgba(224, 241, 255, 0.85) 35%,
          rgba(168, 214, 255, 0.9) 100%
        );
        filter: blur(0.2px);
        opacity: var(--opacity, 0.7);
        mix-blend-mode: screen;
        animation: rain-drop-fall var(--duration, 1.1s) linear infinite;
        animation-delay: var(--delay, 0s);
      }

      .snow-flake {
        position: absolute;
        top: -12%;
        left: var(--x, 50%);
        width: var(--size, 4px);
        height: var(--size, 4px);
        background: transparent;
        opacity: var(--opacity, 0.9);
        animation: snow-flake-fall var(--duration, 7s) linear infinite;
        animation-delay: var(--delay, 0s);
        z-index: 5;
      }

      .hail-stone {
        position: absolute;
        top: -14%;
        left: var(--x, 50%);
        width: var(--size, 4.6px);
        height: var(--size, 4.6px);
        border-radius: 999px;
        background: radial-gradient(
          circle at 28% 28%,
          rgba(248, 253, 255, 1),
          rgba(199, 224, 246, 0.95) 70%,
          rgba(136, 174, 209, 0.92) 100%
        );
        box-shadow:
          inset -1px -1px 1px rgba(97, 137, 177, 0.52),
          0 0 6px rgba(228, 241, 255, 0.6);
        opacity: var(--opacity, 0.84);
        animation: hail-stone-fall var(--duration, 0.7s) linear infinite;
        animation-delay: var(--delay, 0s);
        z-index: 5;
      }

      .img-photo.mood-cloudy .hail-stone {
        filter: contrast(1.08) brightness(1.06);
      }

      .rain-drizzle {
        position: absolute;
        top: var(--start-y, -12%);
        left: var(--x, 50%);
        width: var(--w, 1.1px);
        height: var(--h, 11px);
        border-radius: 999px;
        background: linear-gradient(
          to bottom,
          rgba(234, 245, 255, 0),
          rgba(234, 245, 255, 0.55) 40%,
          rgba(182, 216, 246, 0.7) 100%
        );
        filter: blur(0.3px);
        opacity: var(--opacity, 0.4);
        mix-blend-mode: screen;
        animation: rain-drop-fall var(--duration, 1.45s) linear infinite;
        animation-delay: var(--delay, 0s);
        z-index: 4;
      }

      .snow-flake::before,
      .snow-flake::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.98),
          rgba(222, 240, 255, 0.96)
        );
        border-radius: 999px;
      }

      .snow-flake::before {
        width: max(1px, calc(var(--size, 4px) * 0.22));
        height: var(--size, 4px);
        box-shadow:
          0 0 6px rgba(255, 255, 255, 0.8),
          0 0 2px rgba(210, 233, 255, 0.9);
      }

      .snow-flake::after {
        width: var(--size, 4px);
        height: max(1px, calc(var(--size, 4px) * 0.22));
      }

      .snow-flake i,
      .snow-flake b {
        position: absolute;
        left: 50%;
        top: 50%;
        width: max(1px, calc(var(--size, 4px) * 0.18));
        height: calc(var(--size, 4px) * 0.86);
        border-radius: 999px;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.92),
          rgba(216, 236, 255, 0.88)
        );
        transform-origin: center;
      }

      .snow-flake i {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      .snow-flake b {
        transform: translate(-50%, -50%) rotate(-45deg);
      }

      .photo-sun-rays {
        background: conic-gradient(
          from 20deg at 76% 20%,
          rgba(255, 249, 189, 0.28) 0deg,
          rgba(255, 249, 189, 0) 35deg,
          rgba(255, 246, 177, 0.24) 52deg,
          rgba(255, 246, 177, 0) 90deg,
          rgba(255, 247, 181, 0.28) 116deg,
          rgba(255, 247, 181, 0) 160deg,
          rgba(255, 249, 189, 0.22) 198deg,
          rgba(255, 249, 189, 0) 240deg,
          rgba(255, 250, 200, 0.26) 280deg,
          rgba(255, 250, 200, 0) 320deg,
          rgba(255, 249, 189, 0.28) 360deg
        );
        mix-blend-mode: screen;
        opacity: 0;
        animation: sun-ray-sweep 18s linear infinite;
        z-index: 2;
      }

      .photo-night-stars {
        background-image:
          radial-gradient(circle at 8% 18%, rgba(255, 247, 201, 0.95) 0 1.2px, transparent 1.9px),
          radial-gradient(circle at 16% 34%, rgba(235, 242, 255, 0.95) 0 1px, transparent 1.7px),
          radial-gradient(circle at 24% 12%, rgba(255, 247, 201, 0.88) 0 1.4px, transparent 2.1px),
          radial-gradient(circle at 34% 28%, rgba(235, 242, 255, 0.92) 0 1.1px, transparent 1.8px),
          radial-gradient(circle at 42% 16%, rgba(255, 247, 201, 0.9) 0 1.3px, transparent 2px),
          radial-gradient(circle at 56% 24%, rgba(235, 242, 255, 0.95) 0 1px, transparent 1.8px),
          radial-gradient(circle at 68% 10%, rgba(255, 247, 201, 0.9) 0 1.5px, transparent 2.2px),
          radial-gradient(circle at 78% 22%, rgba(235, 242, 255, 0.9) 0 1.1px, transparent 1.8px),
          radial-gradient(circle at 88% 14%, rgba(255, 247, 201, 0.9) 0 1.3px, transparent 2px);
        opacity: 0;
        filter: drop-shadow(0 0 4px rgba(255, 244, 180, 0.22));
        animation: night-stars-twinkle 5.8s ease-in-out infinite alternate;
        z-index: 1;
        pointer-events: none;
      }

      .img-photo.clear-night .photo-night-stars {
        opacity: 0.92;
      }

      .photo-wind-streaks {
        background-image:
          linear-gradient(
            112deg,
            rgba(225, 239, 255, 0) 0%,
            rgba(225, 239, 255, 0.18) 26%,
            rgba(225, 239, 255, 0.34) 38%,
            rgba(225, 239, 255, 0) 54%
          ),
          linear-gradient(
            112deg,
            rgba(213, 233, 255, 0) 18%,
            rgba(213, 233, 255, 0.2) 34%,
            rgba(213, 233, 255, 0.3) 48%,
            rgba(213, 233, 255, 0) 64%
          );
        background-size:
          220% 100%,
          200% 100%;
        background-position:
          0% 20%,
          -36% 62%;
        opacity: 0;
        animation: wind-streak-sweep 2.6s linear infinite;
        z-index: 4;
        pointer-events: none;
        inset: 0 0 auto 0;
        height: 68%;
        -webkit-mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.95) 0%,
          rgba(0, 0, 0, 0.82) 58%,
          rgba(0, 0, 0, 0) 100%
        );
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.95) 0%,
          rgba(0, 0, 0, 0.82) 58%,
          rgba(0, 0, 0, 0) 100%
        );
        mix-blend-mode: screen;
      }

      .photo-lightning {
        background: radial-gradient(
          circle at var(--flash-x, 52%) var(--flash-y, 26%),
          rgba(255, 246, 169, 0.95),
          rgba(255, 246, 169, 0) 52%
        );
        opacity: 0;
        mix-blend-mode: screen;
        animation: lightning-flash var(--flash-duration, 7s) infinite;
        animation-delay: var(--delay, 0s);
        z-index: 6;
      }

      .photo-lightning-bolt {
        position: absolute;
        top: var(--bolt-top, 8%);
        left: var(--bolt-left, 54%);
        width: var(--bolt-width, 6px);
        height: var(--bolt-height, 40%);
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0.9) 22%,
          rgba(255, 241, 168, 0.95) 100%
        );
        clip-path: polygon(48% 0, 70% 0, 44% 36%, 68% 36%, 30% 100%, 44% 56%, 24% 56%);
        filter: drop-shadow(0 0 8px rgba(255, 248, 190, 0.9));
        opacity: 0;
        transform: rotate(var(--bolt-rotate, 0deg));
        animation: lightning-bolt var(--flash-duration, 7s) infinite;
        animation-delay: var(--delay, 0s);
        z-index: 7;
      }

      .photo-cloud-shadow {
        background:
          radial-gradient(ellipse at 22% 42%, rgba(42, 66, 94, 0.2), rgba(42, 66, 94, 0) 48%),
          radial-gradient(ellipse at 58% 40%, rgba(45, 70, 99, 0.16), rgba(45, 70, 99, 0) 46%),
          radial-gradient(ellipse at 85% 44%, rgba(42, 67, 96, 0.2), rgba(42, 67, 96, 0) 49%);
        animation: cloud-shadow-drift 20s ease-in-out infinite alternate;
        opacity: 0.36;
        mix-blend-mode: soft-light;
      }

      .photo-vignette {
        background: radial-gradient(
          circle at center,
          rgba(0, 0, 0, 0) 52%,
          rgba(0, 0, 0, 0.33) 100%
        );
        z-index: 3;
      }

      .photo-grain {
        background-image: radial-gradient(rgba(255, 255, 255, 0.2) 0.6px, transparent 0.8px);
        background-size: 3px 3px;
        opacity: 0.1;
        mix-blend-mode: soft-light;
        animation: grain-shift 0.25s steps(2, end) infinite;
        z-index: 8;
      }

      @keyframes bg-pan {
        0% {
          transform: scale(1.02) translate3d(0, 0, 0);
        }
        100% {
          transform: scale(1.07) translate3d(-1.5%, -1.2%, 0);
        }
      }

      @keyframes cloud-drift {
        0% {
          transform: translate3d(-2%, 0, 0) scale(1.02);
        }
        100% {
          transform: translate3d(2%, -1%, 0) scale(1.06);
        }
      }

      @keyframes cloud-drift-depth {
        0% {
          transform: translate3d(2%, 1%, 0) scale(1.04);
        }
        100% {
          transform: translate3d(-3%, -1%, 0) scale(1.08);
        }
      }

      @keyframes cloud-drift-front {
        0% {
          transform: translate3d(-3%, 1%, 0) scale(1.03);
        }
        100% {
          transform: translate3d(4%, -1%, 0) scale(1.08);
        }
      }

      @keyframes cloud-shadow-drift {
        0% {
          transform: translate3d(-2%, 1%, 0) scale(1.01);
        }
        100% {
          transform: translate3d(2%, -1%, 0) scale(1.06);
        }
      }

      @keyframes rain-fall {
        0% {
          transform: translateY(-14px);
        }
        100% {
          transform: translateY(14px);
        }
      }

      @keyframes rain-drop-fall {
        0% {
          transform: translate3d(0, -12%, 0) rotate(10deg);
        }
        100% {
          transform: translate3d(var(--drift, 6px), 132%, 0) rotate(10deg);
        }
      }

      @keyframes hail-stone-fall {
        0% {
          transform: translate3d(0, -10%, 0) scale(0.95);
        }
        82% {
          transform: translate3d(var(--drift, 4px), 126%, 0) scale(1);
        }
        100% {
          transform: translate3d(calc(var(--drift, 4px) * 1.15), 138%, 0) scale(0.92);
        }
      }

      @keyframes snow-flake-fall {
        0% {
          top: -12%;
          transform: translate3d(0, 0, 0) rotate(0deg);
        }
        35% {
          transform: translate3d(var(--drift, 10px), 0, 0) rotate(120deg);
        }
        70% {
          transform: translate3d(var(--drift-back, -10px), 0, 0) rotate(220deg);
        }
        100% {
          top: 112%;
          transform: translate3d(0, 0, 0) rotate(360deg);
        }
      }

      @keyframes sun-ray-sweep {
        0% {
          transform: rotate(0deg) scale(1);
          opacity: 0.55;
        }
        50% {
          transform: rotate(8deg) scale(1.04);
          opacity: 0.9;
        }
        100% {
          transform: rotate(16deg) scale(1);
          opacity: 0.58;
        }
      }

      @keyframes wind-streak-sweep {
        0% {
          background-position:
            0% 20%,
            -36% 62%;
          opacity: 0.55;
        }
        50% {
          background-position:
            76% 24%,
            46% 66%;
          opacity: 0.95;
        }
        100% {
          background-position:
            156% 28%,
            128% 70%;
          opacity: 0.45;
        }
      }

      @keyframes wind-streak-sweep-strong {
        0% {
          background-position:
            -46% 24%,
            -86% 68%;
          opacity: 0.66;
        }
        50% {
          background-position:
            72% 20%,
            38% 66%;
          opacity: 0.98;
        }
        100% {
          background-position:
            188% 16%,
            152% 62%;
          opacity: 0.62;
        }
      }

      @keyframes fog-drift {
        0% {
          transform: translate3d(-1.2%, 0.4%, 0) scale(1.01);
        }
        100% {
          transform: translate3d(1.8%, -0.6%, 0) scale(1.04);
        }
      }

      @keyframes lightning-bolt {
        0%,
        83%,
        100% {
          opacity: 0;
        }
        84% {
          opacity: 1;
        }
        85% {
          opacity: 0;
        }
        86% {
          opacity: 0.85;
        }
        87% {
          opacity: 0;
        }
      }

      @keyframes lightning-flash {
        0%,
        83%,
        100% {
          opacity: 0;
        }
        84% {
          opacity: 0.92;
        }
        85% {
          opacity: 0;
        }
        86% {
          opacity: 0.72;
        }
        87% {
          opacity: 0;
        }
      }

      @keyframes night-stars-twinkle {
        0% {
          opacity: 0.72;
          transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          opacity: 1;
          transform: translate3d(0.4%, -0.3%, 0) scale(1.01);
        }
        100% {
          opacity: 0.82;
          transform: translate3d(-0.4%, 0.2%, 0) scale(1.02);
        }
      }

      @keyframes grain-shift {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(1px, 1px);
        }
      }
      .condition {
        position: absolute;
        top: 14px;
        right: 16px;
        font-size: 16px;
        color: #fff;
        text-align: right;
        z-index: 10;
        text-shadow: 0 1px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.8);
      }
      .forecast-temps {
        position: absolute;
        top: calc(var(--bg-temp-font-size, 36px) + 52px);
        left: 12px;
        font-size: 14px;
        color: #fff;
        max-width: calc(100% - 32px);
        display: flex;
        flex-direction: row;
        gap: 10px;
        z-index: 10;
        text-shadow: 0 1px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.8);
      }
      .sun-times {
        position: absolute;
        top: calc(var(--bg-temp-font-size, 36px) + 52px);
        right: 16px;
        display: flex;
        gap: 12px;
        align-items: center;
        color: #fff;
        font-size: 14px;
        z-index: 12;
        text-shadow: 0 1px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.8);
      }
      .forecast-mini {
        position: absolute;
        bottom: 16px;
        right: 16px;
        z-index: 12;
        max-width: calc(100% - 32px);
        isolation: isolate;
        background: transparent !important;
      }
      /* Make child forecast charts transparent */
      .forecast-mini::part(background),
      .forecast-mini > * {
        background: transparent !important;
        --card-background-color: transparent !important;
        --ha-card-background: transparent !important;
      }
      .forecast-mini ha-card,
      .forecast-mini .card,
      .forecast-mini > div {
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
      }
      @media (max-width: 400px) {
        .forecast-mini {
          right: 12px;
          bottom: 12px;
          max-width: calc(100% - 24px);
        }
      }
      .temp-high {
        font-weight: bold;
        color: #fff;
        text-shadow: 0 1px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.8);
      }
      .temp-low {
        color: #fff;
        text-shadow: 0 1px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.8);
      }
      @media (max-width: 400px) {
        .temperature {
          font-size: calc(var(--bg-temp-font-size, 36px) * 0.8);
          padding: 4px 8px;
        }
        .condition {
          font-size: 14px;
        }
        .forecast-temps {
          font-size: 12px;
        }
      }
      @media (max-width: 768px) {
        .metrics-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `;
  }
  setConfig(n) {
    if (!n.entity)
      throw new Error("You need to define an entity");
    this.config = n;
  }
  getCardSize() {
    return this.config?.grid_options?.rows ?? 4;
  }
  // The rules for sizing your card in the grid in sections view
  getGridOptions() {
    return {
      rows: this.config?.grid_options?.rows ?? 4,
      columns: this.config?.grid_options?.columns ?? 12,
      min_columns: 4,
      max_columns: 48,
      min_rows: 3,
      max_rows: 12
    };
  }
  static getStubConfig() {
    return {
      type: `custom:${$e}`,
      entity: "",
      scenery_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Vierwaldst%C3%A4ttersee_with_Mountain_Panorama.jpg/1280px-Vierwaldst%C3%A4ttersee_with_Mountain_Panorama.jpg"
    };
  }
  static getConfigElement() {
    return document.createElement(zr);
  }
  // Schema for the visual editor
  static getConfigSchema() {
    return ue;
  }
  updated(n) {
    if (super.updated(n), this.hass && this.config?.entity) {
      if (this._lastEntityId !== this.config.entity) {
        this._lastEntityId = this.config.entity;
        const e = this.config.forecast_mode || "daily";
        e === "daily" && this._loadDailyForecast(), e === "hourly" && this._loadHourlyForecast();
      }
      this.config.show_day_temps !== !1 && !this._forecastLoading && this._forecast.length === 0 && this._loadDailyForecast();
    }
  }
  render() {
    if (ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2)), !this.hass || !this.config)
      return c``;
    const n = this.config?.grid_options?.rows ?? 4;
    this.style.setProperty("--card-grid-rows", n.toString()), (!this._resolvedEntities || this._lastEntityId !== this.config.entity) && (this._resolvedEntities = Ar(this.hass, this.config.entity));
    const e = Me(this.hass, this.config.entity);
    if (!e || !e.attributes)
      return c`<div class="bg-card-root"><div style="padding:20px;text-align:center;color:var(--secondary-text-color);">Entity not found: ${this.config.entity}</div></div>`;
    const t = e.attributes.temperature;
    let i = NaN;
    typeof t == "number" ? i = t : typeof t == "string" && (i = parseFloat(t)), isNaN(i) && this._resolvedEntities?.temperature && (i = Ye(this.hass, this._resolvedEntities.temperature) ?? NaN);
    const r = e.state, s = kl(this.hass, this.config), o = this.clientWidth || 300, l = n * 64 - 8, a = this.config?.temperature_font_size, h = typeof a == "number" && a > 0 ? `${a}px` : "36px";
    this.style.setProperty("--bg-temp-font-size", h), this.style.setProperty("--bg-temp-img-top", `calc(${h})`);
    const d = this._forecast && this._forecast.length > 0 ? this._forecast[0] : e.attributes.forecast ? e.attributes.forecast[0] : null, p = this.config.sun_entity, f = p ? this.hass.states[p] : void 0, g = f?.attributes?.next_rising ? new Date(f.attributes.next_rising) : void 0, b = f?.attributes?.next_setting ? new Date(f.attributes.next_setting) : void 0, k = (this.hass.selectedLanguage || this.hass.language || "en").replace("_", "-"), x = (L) => L ? L.toLocaleTimeString(k, { hour: "2-digit", minute: "2-digit" }) : "--:--";
    return c`
      <div class="bg-card-root">
        <div style="position:absolute;top:8px;left:12px;z-index:20;display:flex;align-items:center;justify-content:center;border-radius:45px;border:2px solid var(--primary-text-color,#fff);background:rgba(0,0,0,0.45);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);padding:5px 12px;box-shadow:0 2px 8px rgba(0,0,0,0.4);font-size:${h};font-weight:bold;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.8);">
          ${isNaN(i) ? "--" : Math.round(i)}°
        </div>
        ${r ? c`${this.config.photo_mode === !0 ? this._renderPhotoLikeBackground(r, s) : c`<div class="img-svg">
                        <svg
                          viewBox="0 0 ${o} ${l}"
                          width="100%"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          preserveAspectRatio="xMidYMid slice"
                        >
                          ${o > 0 ? Sl(r, s, o) : w``}
                        </svg>
                      </div>`}
                ${d && this.config.show_day_temps !== !1 ? c`
                        <div style="position:absolute;top:calc(${h} + 52px);left:12px;z-index:20;font-size:14px;color:#fff;display:flex;flex-direction:row;gap:10px;text-shadow:0 1px 4px rgba(0,0,0,0.9),0 0 2px rgba(0,0,0,0.8);">
                          <span style="font-weight:bold;">
                            <ha-icon icon="mdi:arrow-up-bold"></ha-icon>
                            ${Math.round(d.temperature)}°
                          </span>
                          <span>
                            <ha-icon icon="mdi:arrow-down-bold"></ha-icon> ${Math.round(
      d.templow || d.temperature - 5
    )}°
                          </span>
                        </div>
                      ` : ""}
                ${p && this.config.show_sun_times !== !1 && r !== "clear-night" ? c`
                        <div style="position:absolute;top:calc(${h} + 52px);right:16px;z-index:20;display:flex;gap:12px;align-items:center;color:#fff;font-size:14px;text-shadow:0 1px 4px rgba(0,0,0,0.9),0 0 2px rgba(0,0,0,0.8);">
                          <span title="${X("bg_card.sunrise")}">
                            <ha-icon icon="mdi:weather-sunset-up"></ha-icon> ${x(g)}
                          </span>
                          <span title="${X("bg_card.sunset")}">
                            <ha-icon icon="mdi:weather-sunset-down"></ha-icon> ${x(b)}
                          </span>
                        </div>
                      ` : ""}
                ${(this.config.forecast_mode || "daily") === "daily" && this._forecast.length > 0 ? c`
                        <div class="forecast-mini">
                          <daily-forecast-chart
                            .forecast=${this._forecast?.slice(0, 7) ?? []}
                            .forecastLoading=${this._forecastLoading}
                            .show_forecast=${!0}
                            .config=${{ ...this.config, enable_animate_weather_icons: !0 }}
                            .compact=${!0}
                            .startTomorrow=${!0}
                            .maxDays=${5}
                            .alignRight=${!0}
                            ._t=${X}
                            .getWeatherIcon=${Et}
                            .formatDate=${oa}
                          ></daily-forecast-chart>
                        </div>
                      ` : c``}
                ${(this.config.forecast_mode || "daily") === "hourly" && this._hourly.length > 0 ? c`
                        <div class="forecast-mini">
                          <hourly-forecast-chart
                            .hourlyForecast=${this._hourly}
                            .forecastLoading=${this._hourlyLoading}
                            .show_forecast=${!0}
                            .config=${{ ...this.config, enable_animate_weather_icons: !0 }}
                            .compact=${!0}
                            .maxHours=${5}
                            .alignRight=${!0}
                            ._t=${X}
                            .getWeatherIcon=${Et}
                          ></hourly-forecast-chart>
                        </div>
                      ` : c``}
                <div style="position:absolute;top:14px;right:16px;z-index:20;font-size:16px;color:#fff;text-align:right;text-shadow:0 1px 4px rgba(0,0,0,0.9),0 0 2px rgba(0,0,0,0.8);">${X(r)}</div> ` : c``}
      </div>
    `;
  }
  _resolvePhotoMood(n) {
    return ["rainy", "pouring", "lightning", "lightning-rainy", "snowy-rainy", "exceptional"].includes(
      n
    ) ? "rainy" : ["cloudy", "fog", "windy", "windy-variant", "snowy", "hail"].includes(n) ? "cloudy" : "sunny";
  }
  _renderPhotoLikeBackground(n, e) {
    const t = this._resolvePhotoMood(n), i = n === "clear-night", r = n === "fog", s = n === "partlycloudy", o = i || !e, l = n === "windy" || n === "windy-variant", a = e && (n === "sunny" || n === "partlycloudy"), h = t === "rainy" || n === "snowy-rainy" || n === "rainy" || n === "pouring", d = n === "snowy" || n === "snowy-rainy", p = n === "hail", f = n === "lightning" || n === "lightning-rainy", g = n === "snowy-rainy", b = ["c1", "c2", "c3"], k = this.config.scenery_image, x = k !== void 0 ? k : this.config.photo_mode === !0 ? "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Vierwaldst%C3%A4ttersee_with_Mountain_Panorama.jpg/1280px-Vierwaldst%C3%A4ttersee_with_Mountain_Panorama.jpg" : "";
    return c`
      <div
        class="img-photo ${x ? "has-scenery" : ""} mood-${t} ${o ? "night" : "day"} ${i ? "clear-night" : ""} ${r ? "foggy" : ""} ${s ? "partly-cloudy" : ""} ${l ? "windy" : ""} ${a ? "sun-bloom" : ""}"
      >
        ${x ? c`<div
                class="photo-layer photo-scenery"
                style="background-image: url('${x}');"
              ></div>` : c``}
        <div class="photo-layer photo-base"></div>
        <div class="photo-layer photo-circadian"></div>
        <div class="photo-layer photo-sun-rays"></div>
        ${i ? c`<div class="photo-layer photo-night-stars"></div>` : c``}
        <div class="photo-layer photo-clouds"></div>
        <div class="photo-layer photo-clouds-front"></div>
        <div class="photo-layer photo-clouds-depth"></div>
        <div class="photo-layer photo-fog"></div>
        <div class="photo-layer photo-wind-streaks"></div>
        <div class="photo-layer photo-cloud-shadow"></div>
        ${h || d || p ? c`<div class="photo-layer weather-particles">
                ${g ? c`${b.map(
      (L) => c`<div class="weather-cluster ${L}">
                            ${h ? this._renderRainParticles(6, !0) : c``}
                            ${d ? this._renderSnowParticles(10, !0) : c``}
                          </div>`
    )}` : c`${n === "pouring" ? this._renderRainParticles(68, !1, !0) : c``}
                      ${n === "pouring" ? this._renderDrizzleParticles(28, !1, !0) : c``}
                      ${n === "rainy" ? this._renderRainParticles(66, !1, !0) : c``}
                      ${n === "rainy" ? this._renderDrizzleParticles(22, !1, !0) : c``}
                      ${n === "lightning-rainy" ? this._renderRainParticles(54, !1) : c``}
                      ${n === "lightning-rainy" ? this._renderDrizzleParticles(18, !1) : c``}
                      ${h && n !== "pouring" && n !== "rainy" && n !== "lightning-rainy" ? this._renderRainParticles(28, !1) : c``}
                      ${d ? this._renderSnowParticles(36, !1) : c``}
                      ${p ? this._renderHailParticles(58, !1) : c``}`}
              </div>` : c``}
        ${f ? c`${this._renderLightningFlashes()} ${this._renderLightningBolts()}` : c``}
        <div class="photo-layer photo-vignette"></div>
        <div class="photo-layer photo-grain"></div>
      </div>
    `;
  }
  _renderRainParticles(n, e, t = !1) {
    return Array.from({ length: n }, (i, r) => {
      const s = e ? 14 : 4, o = e ? 72 : 96, l = s + (r * 31 + 17) % 100 / 100 * o, a = (e ? 0.95 : 0.9 + r % 5 * 0.14).toFixed(2), h = (-1 * (r % 7 * 0.23)).toFixed(2), d = (e ? 15 : 14) + r % 4 * 5, p = (0.46 + r % 4 * 0.11).toFixed(2), f = (r % 2 === 0 ? 5 : -5) + (r % 3 - 1) * 1.7, g = r % 3 === 0 ? 1.6 : 2.1, b = t ? `${(-8 + (r * 19 + 13) % 100).toFixed(1)}%` : "-14%";
      return c`<span
        class="rain-drop"
        style="--x:${l.toFixed(
        2
      )}%; --start-y:${b}; --duration:${a}s; --delay:${h}s; --h:${d}px; --opacity:${p}; --drift:${f.toFixed(
        1
      )}px; --w:${g}px;"
      ></span>`;
    });
  }
  _renderSnowParticles(n, e) {
    return Array.from({ length: n }, (t, i) => {
      const r = e ? 12 : 2, s = e ? 76 : 98, o = r + (i * 29 + 7) % 100 / 100 * s, l = (e ? 6.1 : 5.6 + i % 5 * 1.1).toFixed(2), a = (-1 * (i % 9 * 0.7)).toFixed(2), h = (e ? 2.8 : 2.4 + i % 4 * 1.1).toFixed(1), d = (0.52 + i % 4 * 0.11).toFixed(2), p = (i % 2 === 0 ? 13 : -13) + (i % 3 - 1) * 2.6, f = -p * 0.7;
      return c`<span
        class="snow-flake"
        style="--x:${o.toFixed(
        2
      )}%; --duration:${l}s; --delay:${a}s; --size:${h}px; --opacity:${d}; --drift:${p}px; --drift-back:${f.toFixed(
        1
      )}px;"
        ><i></i><b></b
      ></span>`;
    });
  }
  _renderDrizzleParticles(n, e, t = !1) {
    return Array.from({ length: n }, (i, r) => {
      const s = e ? 12 : 2, o = e ? 76 : 98, l = s + (r * 17 + 11) % 100 / 100 * o, a = (e ? 1.25 : 1.3 + r % 4 * 0.14).toFixed(2), h = (-1 * (r % 8 * 0.17)).toFixed(2), d = (e ? 8 : 7) + r % 3 * 2, p = (0.22 + r % 4 * 0.07).toFixed(2), f = (r % 2 === 0 ? 2.5 : -2.5) + (r % 3 - 1) * 1.1, g = r % 2 === 0 ? 1 : 1.2, b = t ? `${(-8 + (r * 23 + 5) % 100).toFixed(1)}%` : "-12%";
      return c`<span
        class="rain-drizzle"
        style="--x:${l.toFixed(
        2
      )}%; --start-y:${b}; --duration:${a}s; --delay:${h}s; --h:${d}px; --opacity:${p}; --drift:${f.toFixed(
        1
      )}px; --w:${g}px;"
      ></span>`;
    });
  }
  _renderHailParticles(n, e) {
    return Array.from({ length: n }, (t, i) => {
      const r = e ? 14 : 4, s = e ? 72 : 96, o = r + (i * 31 + 17) % 100 / 100 * s, l = (e ? 0.73 : 0.62 + i % 5 * 0.075).toFixed(2), a = (-1 * (i % 7 * 0.19)).toFixed(2), h = (0.72 + i % 4 * 0.09).toFixed(2), d = (i % 2 === 0 ? 3.4 : -3.4) + (i % 3 - 1) * 1.3, p = i % 2 === 0 ? 4.3 : 5.1;
      return c`<span
        class="hail-stone"
        style="--x:${o.toFixed(
        2
      )}%; --duration:${l}s; --delay:${a}s; --opacity:${h}; --drift:${d.toFixed(
        1
      )}px; --size:${p}px;"
      ></span>`;
    });
  }
  _renderLightningFlashes() {
    return [
      { x: 12, y: 24, delay: "-0.2s", duration: "6.8s" },
      { x: 28, y: 18, delay: "-1.1s", duration: "7.1s" },
      { x: 50, y: 26, delay: "-2.4s", duration: "6.6s" },
      { x: 72, y: 20, delay: "-3.2s", duration: "7.0s" },
      { x: 88, y: 28, delay: "-4.3s", duration: "6.9s" }
    ].map(
      (e) => c`<div
          class="photo-layer photo-lightning"
          style="--flash-x:${e.x}%; --flash-y:${e.y}%; --delay:${e.delay}; --flash-duration:${e.duration};"
        ></div>`
    );
  }
  _renderLightningBolts() {
    return [
      {
        left: 11,
        top: 10,
        height: 34,
        width: 7,
        rotate: "-6deg",
        delay: "-0.2s",
        duration: "6.8s"
      },
      { left: 27, top: 6, height: 42, width: 8, rotate: "5deg", delay: "-1.1s", duration: "7.1s" },
      { left: 49, top: 9, height: 38, width: 7, rotate: "-2deg", delay: "-2.4s", duration: "6.6s" },
      { left: 70, top: 7, height: 44, width: 8, rotate: "4deg", delay: "-3.2s", duration: "7.0s" },
      {
        left: 86,
        top: 12,
        height: 32,
        width: 6,
        rotate: "-8deg",
        delay: "-4.3s",
        duration: "6.9s"
      }
    ].map(
      (e) => c`<div
          class="photo-layer photo-lightning-bolt"
          style="--bolt-left:${e.left}%; --bolt-top:${e.top}%; --bolt-height:${e.height}%; --bolt-width:${e.width}px; --bolt-rotate:${e.rotate}; --delay:${e.delay}; --flash-duration:${e.duration};"
        ></div>`
    );
  }
  // Load only the daily forecast via Home Assistant WS API
  async _loadDailyForecast() {
    if (!(!this.hass || !this.config?.entity || this._forecastLoading)) {
      this._forecastLoading = !0;
      try {
        const e = (await this.hass.callWS({
          type: "call_service",
          domain: "weather",
          service: "get_forecasts",
          service_data: {
            entity_id: this.config.entity,
            type: "daily"
          },
          return_response: !0
        }))?.response;
        e && e[this.config.entity] ? (this._forecast = e[this.config.entity].forecast || [], this.requestUpdate("_forecast")) : this._forecast = [];
      } catch {
        this._forecast = [];
      } finally {
        this._forecastLoading = !1;
      }
    }
  }
  // Load only the hourly forecast via Home Assistant WS API
  async _loadHourlyForecast() {
    if (!(!this.hass || !this.config?.entity || this._hourlyLoading)) {
      this._hourlyLoading = !0;
      try {
        const e = (await this.hass.callWS({
          type: "call_service",
          domain: "weather",
          service: "get_forecasts",
          service_data: {
            entity_id: this.config.entity,
            type: "hourly"
          },
          return_response: !0
        }))?.response;
        e && e[this.config.entity] ? (this._hourly = e[this.config.entity].forecast || [], this.requestUpdate("_hourly")) : this._hourly = [];
      } catch {
        this._hourly = [];
      } finally {
        this._hourlyLoading = !1;
      }
    }
  }
};
je([
  m({ attribute: !1 })
], ze.prototype, "hass", 2);
je([
  m({ attribute: !1 })
], ze.prototype, "config", 2);
je([
  ys(".temperature")
], ze.prototype, "_tempEl", 2);
je([
  Z()
], ze.prototype, "_forecast", 2);
je([
  Z()
], ze.prototype, "_hourly", 2);
je([
  Z()
], ze.prototype, "_resolvedEntities", 2);
ze = je([
  O($e)
], ze);
var ql = Object.defineProperty, Vl = Object.getOwnPropertyDescriptor, hi = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? Vl(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && ql(e, t, r), r;
};
W({
  // Loads the language by returning a JSON structure for a given language
  loader: (n) => U[n]
});
let Tt = class extends N {
  constructor() {
    super(), this._computeLabel = (n) => ({
      entity: u("bg_card.config.entity"),
      sun_entity: u("bg_card.config.sun_entity"),
      forecast_mode: u("bg_card.config.forecast_mode"),
      show_day_temps: u("bg_card.config.show_day_temps"),
      show_sun_times: u("bg_card.config.show_sun_times"),
      temperature_font_size: u("bg_card.config.temperature_font_size"),
      photo_mode: u("bg_card.config.photo_mode"),
      scenery_image: u("bg_card.config.scenery_image") || "Scenery Image URL"
    })[n.name] || n.name, this._computeHelper = (n) => n.description ? u(n.description) : "";
  }
  setConfig(n) {
    const e = { ...n }, t = ["entity", "sun_entity"];
    for (const i of t)
      e[i] === "" && delete e[i];
    this._config = e, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config {
        padding: 16px;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--card-divider-color);
      }

      .header-title {
        font-size: 24px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }

      .header-subtitle {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }

      ha-form {
        display: block;
        margin-bottom: 24px;
      }

      .preview {
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        padding: 20px;
        margin-top: 24px;
      }

      .preview-title {
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--primary-text-color);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .preview-config {
        font-family: 'SFMono-Regular', 'Monaco', 'Consolas', monospace;
        font-size: 13px;
        color: var(--secondary-text-color);
        background: var(--code-editor-background-color, #f8f8f8);
        padding: 16px;
        border-radius: 8px;
        overflow-x: auto;
        white-space: pre-wrap;
        line-height: 1.4;
        border: 1px solid var(--divider-color);
      }
      .group {
        margin-bottom: 24px;
        padding: 16px 0 0 0;
        border-top: 1px solid var(--divider-color, #e0e0e0);
      }
      .group-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color, #007AFF);
        margin-bottom: 8px;
        margin-top: 0;
      }
      .card-config {
        padding: 16px;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--card-divider-color);
      }
      .header-title {
        font-size: 24px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }
      .header-subtitle {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }
      ha-form {
        display: block;
        margin-bottom: 24px;
      }
      .preview {
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        padding: 20px;
        margin-top: 24px;
      }
      .preview-title {
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--primary-text-color);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .preview-config {
        font-family: 'SFMono-Regular', 'Monaco', 'Consolas', monospace;
        font-size: 13px;
        color: var(--secondary-text-color);
        background: var(--code-editor-background-color, #f8f8f8);
        padding: 16px;
        border-radius: 8px;
        overflow-x: auto;
        white-space: pre-wrap;
        line-height: 1.4;
        border: 1px solid var(--divider-color);
      }

      @media (max-width: 768px) {
        .card-config {
          padding: 12px;
        }
      }
    `;
  }
  render() {
    if (!this.hass)
      return c`<div>Loading...</div>`;
    ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2));
    const n = {
      entity: typeof this._config?.entity == "string" ? this._config.entity : void 0,
      sun_entity: typeof this._config?.sun_entity == "string" ? this._config.sun_entity : void 0,
      scenery_image: typeof this._config?.scenery_image == "string" ? this._config.scenery_image : void 0,
      forecast_mode: typeof this._config?.forecast_mode == "string" ? this._config.forecast_mode : void 0,
      show_sun_times: typeof this._config?.show_sun_times == "boolean" ? this._config.show_sun_times : void 0,
      show_day_temps: typeof this._config?.show_day_temps == "boolean" ? this._config.show_day_temps : void 0,
      temperature_font_size: typeof this._config?.temperature_font_size == "number" ? this._config.temperature_font_size : void 0,
      photo_mode: typeof this._config?.photo_mode == "boolean" ? this._config.photo_mode : void 0
    }, e = ue.find((i) => i.name === "forecast_mode"), t = e ? {
      ...e,
      selector: {
        ...e.selector,
        select: {
          ...e.selector.select,
          options: [
            { value: "daily", label: u("bg_card.forecast_mode.daily") },
            { value: "hourly", label: u("bg_card.forecast_mode.hourly") },
            { value: "none", label: u("bg_card.forecast_mode.none") }
          ]
        }
      }
    } : void 0;
    return c`
      <div class="card-config">
        <div class="header">
          <div>
            <div class="header-title">🌦️ MeteoSwiss Animated Background Card</div>
          </div>
        </div>

        <!-- General -->
        <div class="group">
          <div class="group-title">${u("bg_card.config.group_general") || "General"}</div>
          <ha-form
            .hass=${this.hass}
            .data=${n}
            .schema=${[
      ue.find((i) => i.name === "entity"),
      ue.find((i) => i.name === "sun_entity"),
      ue.find((i) => i.name === "temperature_font_size")
    ].filter(Boolean)}
            .computeLabel=${this._computeLabel}
            .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>

        <!-- Display -->
        <div class="group">
          <div class="group-title">${u("bg_card.config.group_display") || "Display"}</div>
          <ha-form
            .hass=${this.hass}
            .data=${n}
            .schema=${[
      t,
      ue.find((i) => i.name === "show_day_temps"),
      ue.find((i) => i.name === "show_sun_times"),
      ue.find((i) => i.name === "photo_mode"),
      ue.find((i) => i.name === "scenery_image")
    ].filter(Boolean)}
            .computeLabel=${this._computeLabel}
            .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>

        <!-- Configuration Preview -->
        ${this._config?.entity ? c`
                <div class="preview">
                  <div class="preview-title">📋 YAML-Config</div>
                  <div class="preview-config">${this._renderConfigPreview()}</div>
                </div>
              ` : ""}
      </div>
    `;
  }
  _renderConfigPreview() {
    const n = { ...this._config };
    return n.type || (n.type = `custom:${$e}`), Object.keys(n).forEach((e) => {
      (n[e] === void 0 || n[e] === "") && delete n[e];
    }), Object.entries(n).map(([e, t]) => typeof t == "string" ? `${e}: "${t}"` : `${e}: ${t}`).join(`
`);
  }
  _valueChanged(n) {
    if (this._config || (this._config = {
      type: `custom:${$e}`,
      entity: ""
    }), n.type === "value-changed") {
      const e = {}, { ...t } = n.detail.value || {}, i = {
        ...this._config,
        ...t,
        ...e,
        type: `custom:${$e}`
      };
      delete i.show_forecast, Object.keys(i).forEach((r) => {
        (i[r] === "" || i[r] === void 0) && delete i[r];
      }), this._config = i, oe(this, "config-changed", { config: this._config });
    }
  }
};
hi([
  m({ attribute: !1 })
], Tt.prototype, "hass", 2);
hi([
  m({ attribute: !1 })
], Tt.prototype, "lovelace", 2);
hi([
  m({ attribute: !1 })
], Tt.prototype, "_config", 2);
Tt = hi([
  O(zr)
], Tt);
const rt = `${ge}-temperature-card`, Lr = `${rt}-editor`, st = `${ge}-precipitation-card`, Er = `${st}-editor`, ot = `${ge}-sunshine-card`, Nr = `${ot}-editor`, at = `${ge}-wind-card`, Tr = `${at}-editor`, pi = [
  {
    name: "entity",
    required: !0,
    selector: { entity: { domain: "weather" } },
    description: "hourly_charts.config.descr.entity"
  },
  {
    name: "forecast_hours",
    required: !1,
    selector: { number: { min: 6, max: 48, step: 1, mode: "box" } },
    description: "hourly_charts.config.descr.forecast_hours"
  }
], Or = [
  {
    name: "entity",
    required: !0,
    selector: { entity: { domain: "weather" } },
    description: "hourly_charts.config.descr.entity"
  },
  {
    name: "forecast_hours",
    required: !1,
    selector: { number: { min: 6, max: 48, step: 1, mode: "box" } },
    description: "hourly_charts.config.descr.forecast_hours"
  }
], Hr = [
  {
    name: "entity",
    required: !0,
    selector: { entity: { domain: "weather" } },
    description: "hourly_charts.config.descr.entity"
  },
  {
    name: "forecast_hours",
    required: !1,
    selector: { number: { min: 6, max: 48, step: 1, mode: "box" } },
    description: "hourly_charts.config.descr.forecast_hours"
  },
  {
    name: "sun_entity",
    required: !1,
    selector: { entity: { domain: "sun" } },
    description: "hourly_charts.config.descr.sun_entity"
  },
  {
    name: "sunshine_entity",
    required: !1,
    selector: { entity: { domain: "sensor" } },
    description: "hourly_charts.config.descr.sunshine_entity"
  }
];
var Zl = Object.defineProperty, ui = (n, e, t, i) => {
  for (var r = void 0, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = o(e, t, r) || r);
  return r && Zl(e, t, r), r;
};
class Ne extends N {
  constructor() {
    super(...arguments), this._hourlyForecast = [], this._forecastLoading = !1;
  }
  async _loadForecast() {
    if (!(!this.hass || !this.config?.entity || this._forecastLoading)) {
      this._forecastLoading = !0;
      try {
        const t = (await this.hass.callWS({
          type: "call_service",
          domain: "weather",
          service: "get_forecasts",
          service_data: { entity_id: this.config.entity, type: "hourly" },
          return_response: !0
        }))?.response;
        t && t[this.config.entity] ? (this._hourlyForecast = t[this.config.entity].forecast || [], this.requestUpdate("_hourlyForecast")) : this._hourlyForecast = [];
      } catch {
        this._hourlyForecast = [];
      } finally {
        this._forecastLoading = !1;
      }
    }
  }
  updated(e) {
    super.updated(e);
    const t = e.has("hass"), i = e.has("config");
    (t || i) && this._hourlyForecast.length === 0 && !this._forecastLoading && this._loadForecast();
  }
  setBaseConfig(e) {
    this.config = e, setTimeout(() => {
      this._loadForecast();
    }, 1e3);
  }
  getDefaultRows() {
    return 3;
  }
  setCardGridRows() {
    const e = this.config?.grid_options?.rows ?? this.getDefaultRows();
    this.style.setProperty("--card-grid-rows", e.toString());
  }
}
ui([
  m({ attribute: !1 })
], Ne.prototype, "hass");
ui([
  m({ attribute: !1 })
], Ne.prototype, "config");
ui([
  Z()
], Ne.prototype, "_hourlyForecast");
ui([
  Z()
], Ne.prototype, "_forecastLoading");
var Kl = Object.getOwnPropertyDescriptor, Yl = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? Kl(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = o(r) || r);
  return r;
};
W({
  loader: (n) => U[n]
});
let jn = class extends Ne {
  static get styles() {
    return T`
      :host {
        display: block;
        height: 100%;
        box-sizing: border-box;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: 16px;
        box-shadow: var(--ha-card-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.1));
        font-family: var(
          --primary-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          sans-serif
        );
        color: var(--primary-text-color, #fff);
        min-height: calc(var(--card-grid-rows, 3) * 64px - 8px);
        --chart-inner-border: none;
        --chart-padding: 8px 8px 4px;
        --chart-margin-top: 0;
        --chart-margin-bottom: 0;
      }
      .card-content {
        padding: 0;
        height: 100%;
        display: flex;
      }

      forecast-temperature-chart {
        display: block;
        flex: 1;
        min-height: 0;
      }
    `;
  }
  setConfig(n) {
    if (!n.entity) throw new Error("You need to define an entity");
    this.setBaseConfig(n);
  }
  static getStubConfig() {
    return { type: `custom:${rt}`, entity: "" };
  }
  static getConfigElement() {
    return document.createElement(Lr);
  }
  static getConfigSchema() {
    return pi;
  }
  getCardSize() {
    return this.config?.grid_options?.rows ?? 3;
  }
  getGridOptions() {
    return {
      rows: this.config?.grid_options?.rows ?? 3,
      columns: this.config?.grid_options?.columns ?? 12,
      min_columns: 6,
      max_columns: 48,
      min_rows: 3,
      max_rows: 6
    };
  }
  getDefaultRows() {
    return 3;
  }
  render() {
    if (!this.hass || !this.config) return c``;
    if (this.setCardGridRows(), !Me(this.hass, this.config.entity))
      return c`<div class="card-content">Entity not found: ${this.config.entity}</div>`;
    if (this._hourlyForecast.length === 0) return c`<div class="card-content">Loading...</div>`;
    const e = this.config.forecast_hours ?? 12;
    return c`
      <div class="card-content">
        <forecast-temperature-chart
          .hourlyForecast=${this._hourlyForecast}
          .forecastHours=${e}
          .show_temperature=${!0}
          ._t=${u}
        ></forecast-temperature-chart>
      </div>
    `;
  }
};
jn = Yl([
  O(rt)
], jn);
var Ql = Object.defineProperty, Xl = Object.getOwnPropertyDescriptor, Yi = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? Xl(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && Ql(e, t, r), r;
};
W({ loader: (n) => U[n] });
let Xt = class extends N {
  setConfig(n) {
    const e = { ...n };
    e.entity === "" && delete e.entity, this._config = e, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config {
        padding: 16px;
      }
      .header {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--card-divider-color);
      }
      .header-title {
        font-size: 20px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }
      ha-form {
        display: block;
      }
    `;
  }
  render() {
    if (!this.hass) return c`<div>Loading...</div>`;
    ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2));
    const n = {
      entity: typeof this._config?.entity == "string" ? this._config.entity : void 0,
      forecast_hours: this._config?.forecast_hours ?? 12
    };
    return c`
      <div class="card-config">
        <div class="header">
          <div class="header-title">🌡️ MeteoSwiss Temperature Card</div>
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${n}
          .schema=${pi}
          .computeLabel=${(e) => ({
      entity: u("hourly_charts.config.entity"),
      forecast_hours: u("hourly_charts.config.forecast_hours") ?? "Forecast hours"
    })[e.name] ?? e.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }
  _valueChanged(n) {
    this._config || (this._config = { type: `custom:${rt}`, entity: "" });
    const e = { ...this._config, ...n.detail.value };
    oe(this, "config-changed", { config: e });
  }
};
Yi([
  m({ attribute: !1 })
], Xt.prototype, "hass", 2);
Yi([
  m({ attribute: !1 })
], Xt.prototype, "_config", 2);
Xt = Yi([
  O(Lr)
], Xt);
var Jl = Object.getOwnPropertyDescriptor, ec = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? Jl(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = o(r) || r);
  return r;
};
W({ loader: (n) => U[n] });
let qn = class extends Ne {
  static get styles() {
    return T`
      :host {
        display: block;
        height: 100%;
        box-sizing: border-box;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: 16px;
        box-shadow: var(--ha-card-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.1));
        font-family: var(
          --primary-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          sans-serif
        );
        color: var(--primary-text-color, #fff);
        min-height: calc(var(--card-grid-rows, 3) * 64px - 8px);
        --chart-inner-border: none;
        --chart-padding: 8px 8px 4px;
        --chart-margin-top: 0;
        --chart-margin-bottom: 0;
      }
      .card-content {
        padding: 0;
        height: 100%;
        display: flex;
      }

      precipitation-chart {
        display: block;
        flex: 1;
        min-height: 0;
      }
    `;
  }
  setConfig(n) {
    if (!n.entity) throw new Error("You need to define an entity");
    this.setBaseConfig(n);
  }
  static getStubConfig() {
    return { type: `custom:${st}`, entity: "" };
  }
  static getConfigElement() {
    return document.createElement(Er);
  }
  static getConfigSchema() {
    return pi;
  }
  getCardSize() {
    return this.config?.grid_options?.rows ?? 3;
  }
  getGridOptions() {
    return {
      rows: this.config?.grid_options?.rows ?? 3,
      columns: this.config?.grid_options?.columns ?? 12,
      min_columns: 6,
      max_columns: 48,
      min_rows: 3,
      max_rows: 6
    };
  }
  getDefaultRows() {
    return 3;
  }
  render() {
    if (!this.hass || !this.config) return c``;
    if (this.setCardGridRows(), !Me(this.hass, this.config.entity))
      return c`<div class="card-content">Entity not found: ${this.config.entity}</div>`;
    if (this._hourlyForecast.length === 0) return c`<div class="card-content">Loading...</div>`;
    const e = this.config.forecast_hours ?? 12;
    return c`
      <div class="card-content">
        <precipitation-chart
          .hourlyForecast=${this._hourlyForecast}
          .forecastHours=${e}
          .show_precipitation=${!0}
          ._t=${u}
        ></precipitation-chart>
      </div>
    `;
  }
};
qn = ec([
  O(st)
], qn);
var tc = Object.defineProperty, ic = Object.getOwnPropertyDescriptor, Qi = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? ic(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && tc(e, t, r), r;
};
W({ loader: (n) => U[n] });
let Jt = class extends N {
  setConfig(n) {
    const e = { ...n };
    e.entity === "" && delete e.entity, this._config = e, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config {
        padding: 16px;
      }
      .header {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--card-divider-color);
      }
      .header-title {
        font-size: 20px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }
      ha-form {
        display: block;
      }
    `;
  }
  render() {
    if (!this.hass) return c`<div>Loading...</div>`;
    ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2));
    const n = {
      entity: typeof this._config?.entity == "string" ? this._config.entity : void 0,
      forecast_hours: this._config?.forecast_hours ?? 12
    };
    return c`
      <div class="card-config">
        <div class="header">
          <div class="header-title">🌧️ MeteoSwiss Precipitation Card</div>
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${n}
          .schema=${pi}
          .computeLabel=${(e) => ({
      entity: u("hourly_charts.config.entity"),
      forecast_hours: u("hourly_charts.config.forecast_hours") ?? "Forecast hours"
    })[e.name] ?? e.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }
  _valueChanged(n) {
    this._config || (this._config = { type: `custom:${st}`, entity: "" });
    const e = { ...this._config, ...n.detail.value };
    oe(this, "config-changed", { config: e });
  }
};
Qi([
  m({ attribute: !1 })
], Jt.prototype, "hass", 2);
Qi([
  m({ attribute: !1 })
], Jt.prototype, "_config", 2);
Jt = Qi([
  O(Er)
], Jt);
var nc = Object.getOwnPropertyDescriptor, rc = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? nc(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = o(r) || r);
  return r;
};
W({ loader: (n) => U[n] });
let Vn = class extends Ne {
  static get styles() {
    return T`
      :host {
        display: block;
        height: 100%;
        box-sizing: border-box;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: 16px;
        box-shadow: var(--ha-card-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.1));
        font-family: var(
          --primary-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          sans-serif
        );
        color: var(--primary-text-color, #fff);
        min-height: calc(var(--card-grid-rows, 3) * 64px - 8px);
        --chart-inner-border: none;
        --chart-padding: 8px 8px 4px;
        --chart-margin-top: 0;
        --chart-margin-bottom: 0;
      }
      .card-content {
        padding: 0;
        height: 100%;
        display: flex;
      }

      sunshine-chart {
        display: block;
        flex: 1;
        min-height: 0;
      }
    `;
  }
  setConfig(n) {
    if (!n.entity) throw new Error("You need to define an entity");
    this.setBaseConfig(n);
  }
  static getStubConfig() {
    return { type: `custom:${ot}`, entity: "" };
  }
  static getConfigElement() {
    return document.createElement(Nr);
  }
  static getConfigSchema() {
    return Hr;
  }
  getCardSize() {
    return this.config?.grid_options?.rows ?? 3;
  }
  getGridOptions() {
    return {
      rows: this.config?.grid_options?.rows ?? 3,
      columns: this.config?.grid_options?.columns ?? 12,
      min_columns: 6,
      max_columns: 48,
      min_rows: 3,
      max_rows: 6
    };
  }
  render() {
    if (!this.hass || !this.config) return c``;
    this.setCardGridRows();
    const n = Me(this.hass, this.config.entity);
    if (!n)
      return c`<div class="card-content">Entity not found: ${this.config.entity}</div>`;
    if (this._hourlyForecast.length === 0) return c`<div class="card-content">Loading...</div>`;
    const e = this.config.forecast_hours ?? 12, t = this.config.sun_entity ? Me(this.hass, this.config.sun_entity) : null;
    return c`
      <div class="card-content">
        <sunshine-chart
          .hourlyForecast=${this._hourlyForecast}
          .forecastHours=${e}
          .show_sunshine=${!0}
          .weatherEntity=${n}
          .sun_entity=${t}
          ._t=${u}
        ></sunshine-chart>
      </div>
    `;
  }
};
Vn = rc([
  O(ot)
], Vn);
var sc = Object.defineProperty, oc = Object.getOwnPropertyDescriptor, Xi = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? oc(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && sc(e, t, r), r;
};
W({ loader: (n) => U[n] });
let ei = class extends N {
  setConfig(n) {
    const e = { ...n };
    e.entity === "" && delete e.entity, e.sun_entity === "" && delete e.sun_entity, e.sunshine_entity === "" && delete e.sunshine_entity, this._config = e, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config {
        padding: 16px;
      }
      .header {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--card-divider-color);
      }
      .header-title {
        font-size: 20px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }
      ha-form {
        display: block;
      }
    `;
  }
  render() {
    if (!this.hass) return c`<div>Loading...</div>`;
    ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2));
    const n = {
      entity: typeof this._config?.entity == "string" ? this._config.entity : void 0,
      forecast_hours: this._config?.forecast_hours ?? 12,
      sun_entity: typeof this._config?.sun_entity == "string" ? this._config.sun_entity : void 0,
      sunshine_entity: typeof this._config?.sunshine_entity == "string" ? this._config.sunshine_entity : void 0
    };
    return c`
      <div class="card-config">
        <div class="header">
          <div class="header-title">☀️ MeteoSwiss Sunshine Card</div>
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${n}
          .schema=${Hr}
          .computeLabel=${(e) => ({
      entity: u("hourly_charts.config.entity"),
      forecast_hours: u("hourly_charts.config.forecast_hours") ?? "Forecast hours",
      sun_entity: u("hourly_charts.config.sun_entity") ?? "Sun entity (sunrise/sunset markers)",
      sunshine_entity: u("hourly_charts.config.sunshine_entity") ?? "Sunshine duration sensor (optional)"
    })[e.name] ?? e.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }
  _valueChanged(n) {
    this._config || (this._config = { type: `custom:${ot}`, entity: "" });
    const e = { ...this._config, ...n.detail.value };
    oe(this, "config-changed", { config: e });
  }
};
Xi([
  m({ attribute: !1 })
], ei.prototype, "hass", 2);
Xi([
  m({ attribute: !1 })
], ei.prototype, "_config", 2);
ei = Xi([
  O(Nr)
], ei);
var ac = Object.getOwnPropertyDescriptor, lc = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? ac(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = o(r) || r);
  return r;
};
W({ loader: (n) => U[n] });
let Zn = class extends Ne {
  static get styles() {
    return T`
      :host {
        display: block;
        height: 100%;
        box-sizing: border-box;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: 16px;
        box-shadow: var(--ha-card-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.1));
        font-family: var(
          --primary-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          sans-serif
        );
        color: var(--primary-text-color, #fff);
        min-height: calc(var(--card-grid-rows, 3) * 64px - 8px);
        --chart-inner-border: none;
        --chart-padding: 8px 8px 4px;
        --chart-margin-top: 0;
        --chart-margin-bottom: 0;
      }
      .card-content {
        padding: 0;
        height: 100%;
        display: flex;
      }

      wind-chart {
        display: block;
        flex: 1;
        min-height: 0;
      }
    `;
  }
  setConfig(n) {
    if (!n.entity) throw new Error("You need to define an entity");
    this.setBaseConfig(n);
  }
  static getStubConfig() {
    return { type: `custom:${at}`, entity: "" };
  }
  static getConfigElement() {
    return document.createElement(Tr);
  }
  static getConfigSchema() {
    return Or;
  }
  getCardSize() {
    return this.config?.grid_options?.rows ?? 3;
  }
  getGridOptions() {
    return {
      rows: this.config?.grid_options?.rows ?? 3,
      columns: this.config?.grid_options?.columns ?? 12,
      min_columns: 6,
      max_columns: 48,
      min_rows: 3,
      max_rows: 6
    };
  }
  getDefaultRows() {
    return 3;
  }
  render() {
    if (this.setCardGridRows(), !this.hass || !this.config) return c``;
    const n = this.config.forecast_hours ?? 12;
    return this._hourlyForecast.length === 0 ? c`<div class="card-content">Loading...</div>` : c`
      <div class="card-content">
        <wind-chart
          .hourlyForecast=${this._hourlyForecast}
          .forecastHours=${n}
          .show_wind=${!0}
          ._t=${u}
        ></wind-chart>
      </div>
    `;
  }
};
Zn = lc([
  O(at)
], Zn);
var cc = Object.defineProperty, dc = Object.getOwnPropertyDescriptor, Ji = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? dc(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && cc(e, t, r), r;
};
W({ loader: (n) => U[n] });
let ti = class extends N {
  setConfig(n) {
    const e = { ...n };
    e.entity === "" && delete e.entity, this._config = e, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config {
        padding: 16px;
      }
      .header {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--card-divider-color);
      }
      .header-title {
        font-size: 20px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }
      ha-form {
        display: block;
      }
    `;
  }
  render() {
    if (!this.hass) return c`<div>Loading...</div>`;
    ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2));
    const n = {
      entity: typeof this._config?.entity == "string" ? this._config.entity : void 0,
      forecast_hours: this._config?.forecast_hours ?? 12
    };
    return c`
      <div class="card-config">
        <div class="header">
          <div class="header-title">💨 MeteoSwiss Wind Card</div>
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${n}
          .schema=${Or}
          .computeLabel=${(e) => ({
      entity: u("hourly_charts.config.entity"),
      forecast_hours: u("hourly_charts.config.forecast_hours") ?? "Forecast hours"
    })[e.name] ?? e.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }
  _valueChanged(n) {
    this._config || (this._config = { type: `custom:${at}`, entity: "" });
    const e = { ...this._config, ...n.detail.value };
    oe(this, "config-changed", { config: e });
  }
};
Ji([
  m({ attribute: !1 })
], ti.prototype, "hass", 2);
Ji([
  m({ attribute: !1 })
], ti.prototype, "_config", 2);
ti = Ji([
  O(Tr)
], ti);
const lt = `${ge}-warning-card`, Dr = `${lt}-editor`, Pr = [
  {
    name: "primary_warning_entity",
    required: !1,
    selector: { entity: { domain: "sensor" } },
    description: "warning.config.descr.primary_warning_entity"
  },
  {
    name: "secondary_warning_entity",
    required: !1,
    selector: { entity: { domain: "sensor" } },
    description: "warning.config.descr.secondary_warning_entity"
  },
  {
    name: "tertiary_warning_entity",
    required: !1,
    selector: { entity: { domain: "sensor" } },
    description: "warning.config.descr.tertiary_warning_entity"
  },
  {
    name: "warning_entity",
    required: !1,
    selector: { entity: { domain: "sensor" } },
    description: "warning.config.descr.warning_entity"
  }
];
var hc = Object.defineProperty, pc = Object.getOwnPropertyDescriptor, fi = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? pc(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && hc(e, t, r), r;
};
W({ loader: (n) => U[n] });
let Ot = class extends N {
  constructor() {
    super(...arguments), this._openWarnings = {}, this._toggle = (n) => {
      this._openWarnings = { ...this._openWarnings, [n]: !this._openWarnings[n] }, this.requestUpdate();
    };
  }
  static get styles() {
    return T`
      :host {
        display: block;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: 16px;
        padding: 16px;
        box-shadow: var(--ha-card-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.1));
        font-family: var(
          --primary-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          sans-serif
        );
        color: var(--primary-text-color, #fff);
      }

      .warning-section {
        border: 1px solid var(--warning-border-color, #ffeaa7);
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 8px;
      }

      .warning-section.danger {
        background: linear-gradient(90deg, #f8d7da 0%, #f5c6cb 100%);
        border-color: var(--danger-border-color, #f1aeb5);
      }

      .warning-section.severe {
        background: linear-gradient(90deg, #ffeaa7 0%, #fdcb6e 100%);
        border-color: var(--severe-border-color, #e17055);
      }

      .no-warnings {
        opacity: 0.6;
        font-size: 14px;
        text-align: center;
        padding: 8px 0;
      }
    `;
  }
  setConfig(n) {
    this.config = n;
  }
  getCardSize() {
    return 2;
  }
  static getStubConfig() {
    return {
      type: `custom:${lt}`,
      primary_warning_entity: "",
      secondary_warning_entity: "",
      tertiary_warning_entity: ""
    };
  }
  static getConfigElement() {
    return document.createElement(Dr);
  }
  static getConfigSchema() {
    return Pr;
  }
  _getEntityState(n) {
    return this.hass?.states[n];
  }
  render() {
    if (!this.hass || !this.config) return c``;
    const n = (this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2);
    n !== this._loadedLang && (this._loadedLang = n, ee(n).then(() => this.requestUpdate()));
    const e = this.config.primary_warning_entity ? this._getEntityState(this.config.primary_warning_entity) : null, t = this.config.secondary_warning_entity ? this._getEntityState(this.config.secondary_warning_entity) : null, i = this.config.tertiary_warning_entity ? this._getEntityState(this.config.tertiary_warning_entity) : null, r = this.config.warning_entity ? this._getEntityState(this.config.warning_entity) : null;
    if (this.config.primary_warning_entity && !e || !this.config.primary_warning_entity && this.config.warning_entity && !r)
      return nt();
    const s = Cr(
      r,
      e,
      t,
      i,
      this._openWarnings,
      this._toggle,
      this.hass
    );
    return s || c`<div class="no-warnings">${u("warning.warnings_none")}</div>`;
  }
};
fi([
  m({ attribute: !1 })
], Ot.prototype, "hass", 2);
fi([
  m({ attribute: !1 })
], Ot.prototype, "config", 2);
fi([
  Z()
], Ot.prototype, "_openWarnings", 2);
Ot = fi([
  O(lt)
], Ot);
var uc = Object.defineProperty, fc = Object.getOwnPropertyDescriptor, en = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? fc(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && uc(e, t, r), r;
};
W({ loader: (n) => U[n] });
let ii = class extends N {
  setConfig(n) {
    this._config = { ...n }, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config {
        padding: 16px;
      }
      .header {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--card-divider-color);
      }
      .header-title {
        font-size: 20px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }
      .section-label {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--secondary-text-color);
        margin: 16px 0 4px;
      }
      ha-form {
        display: block;
      }
    `;
  }
  render() {
    if (!this.hass) return c`<div>Loading...</div>`;
    ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2));
    const n = {
      primary_warning_entity: this._config?.primary_warning_entity,
      secondary_warning_entity: this._config?.secondary_warning_entity,
      tertiary_warning_entity: this._config?.tertiary_warning_entity,
      warning_entity: this._config?.warning_entity
    };
    return c`
      <div class="card-config">
        <div class="header">
          <div class="header-title">⚠️ MeteoSwiss Warning Card</div>
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${n}
          .schema=${Pr}
          .computeLabel=${(e) => ({
      primary_warning_entity: u("warning.config.primary_warning_entity"),
      secondary_warning_entity: u("warning.config.secondary_warning_entity"),
      tertiary_warning_entity: u("warning.config.tertiary_warning_entity"),
      warning_entity: u("warning.config.warning_entity")
    })[e.name] ?? e.name}
          .computeHelper=${(e) => ({
      primary_warning_entity: u("warning.config.descr.primary_warning_entity"),
      secondary_warning_entity: u("warning.config.descr.secondary_warning_entity"),
      tertiary_warning_entity: u("warning.config.descr.tertiary_warning_entity"),
      warning_entity: u("warning.config.descr.warning_entity")
    })[e.name] ?? ""}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }
  _valueChanged(n) {
    this._config || (this._config = { type: `custom:${lt}`, entity: "" });
    const e = { ...this._config, ...n.detail.value };
    oe(this, "config-changed", { config: e });
  }
};
en([
  m({ attribute: !1 })
], ii.prototype, "hass", 2);
en([
  m({ attribute: !1 })
], ii.prototype, "_config", 2);
ii = en([
  O(Dr)
], ii);
const ct = `${ge}-pollen-card`, Rr = `${ct}-editor`, Oi = ["birch", "grasses", "alder", "hazel", "beech", "ash", "oak"], Hi = ["NONE", "LOW", "MEDIUM", "STRONG", "VERY_STRONG"];
var gc = Object.defineProperty, mc = Object.getOwnPropertyDescriptor, gi = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? mc(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && gc(e, t, r), r;
};
W({ loader: (n) => U[n] });
const Si = {
  NONE: "var(--pollen-none-color, #9e9e9e)",
  LOW: "var(--pollen-low-color, #4caf50)",
  MEDIUM: "var(--pollen-medium-color, #ff9800)",
  STRONG: "var(--pollen-strong-color, #f44336)",
  VERY_STRONG: "var(--pollen-very-strong-color, #9c27b0)"
};
function yc(n) {
  const e = n.toUpperCase().replace(/ /g, "_");
  return Hi.includes(e) ? e : "NONE";
}
function _c(n) {
  return n.length === 0 ? "NONE" : n.reduce(
    (e, t) => Hi.indexOf(t) > Hi.indexOf(e) ? t : e
  );
}
let Ht = class extends N {
  constructor() {
    super(...arguments), this._expanded = !1, this._toggle = () => {
      this._expanded = !this._expanded, this.requestUpdate();
    };
  }
  static get styles() {
    return T`
      :host {
        display: block;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: 16px;
        padding: 16px;
        box-shadow: var(--ha-card-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.1));
        font-family: var(
          --primary-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          sans-serif
        );
        color: var(--primary-text-color);
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        user-select: none;
        background: none;
        border: none;
        padding: 0;
        width: 100%;
        text-align: left;
        color: inherit;
        font: inherit;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .title {
        font-size: 16px;
        font-weight: 600;
      }

      .overall-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        color: #fff;
      }

      .chevron {
        font-size: 18px;
        transition: transform 0.2s ease;
        color: var(--secondary-text-color);
      }

      .chevron.open {
        transform: rotate(180deg);
      }

      .no-data {
        opacity: 0.6;
        font-size: 14px;
        text-align: center;
        padding: 8px 0;
      }

      .pollen-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: 8px;
        margin-top: 12px;
      }

      .pollen-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        border-radius: 10px;
        padding: 8px 6px 6px;
        gap: 4px;
      }

      .pollen-name {
        font-size: 12px;
        font-weight: 500;
        text-align: center;
        opacity: 0.85;
      }

      .pollen-level-dot {
        width: 18px;
        height: 18px;
        border-radius: 50%;
      }

      .pollen-level-label {
        font-size: 11px;
        font-weight: 600;
        text-align: center;
      }

      .pollen-raw {
        font-size: 10px;
        opacity: 0.6;
        text-align: center;
      }
    `;
  }
  setConfig(n) {
    this.config = n;
  }
  getCardSize() {
    return 2;
  }
  static getStubConfig() {
    return {
      type: `custom:${ct}`
      // all types enabled by default — user configures entities per type
    };
  }
  static getConfigElement() {
    return document.createElement(Rr);
  }
  static getConfigSchema() {
    return [];
  }
  _getEntityState(n) {
    if (n)
      return this.hass?.states[n];
  }
  render() {
    if (!this.hass || !this.config) return c``;
    const n = (this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2);
    n !== this._loadedLang && (this._loadedLang = n, ee(n).then(() => this.requestUpdate()));
    const e = [], t = Oi.some(
      (s) => !!this.config[`${s}_entity`]
    );
    for (const s of Oi) {
      if (this.config[`${s}_enabled`] === !1) continue;
      const l = this.config[`${s}_entity`], a = this._getEntityState(l);
      if (!a) continue;
      const h = yc(a.state), d = this._getEntityState(
        this.config[`${s}_raw_entity`]
      );
      e.push({
        type: s,
        level: h,
        raw: d ? d.state : void 0,
        unit: d?.attributes?.unit_of_measurement
      });
    }
    if (e.length === 0) {
      const s = u(t ? "pollen.no_data" : "pollen.not_configured");
      return c`<div class="no-data">${s}</div>`;
    }
    const i = _c(e.map((s) => s.level)), r = Si[i];
    return c`
      <button class="header" @click=${this._toggle} aria-expanded=${this._expanded}>
        <div class="header-left">
          <span class="title">🌿 ${u("pollen.title")}</span>
          <span class="overall-badge" style="background: ${r};">
            ${u(`pollen.levels.${i.toLowerCase()}`)}
          </span>
        </div>
        <span class="chevron ${this._expanded ? "open" : ""}">⌄</span>
      </button>

      ${this._expanded ? c`
              <div class="pollen-grid">
                ${e.map(
      ({ type: s, level: o, raw: l, unit: a }) => c`
                    <div class="pollen-item">
                      <div class="pollen-name">${u(`pollen.types.${s}`)}</div>
                      <div
                        class="pollen-level-dot"
                        style="background: ${Si[o]};"
                      ></div>
                      <div class="pollen-level-label" style="color: ${Si[o]};">
                        ${u(`pollen.levels.${o.toLowerCase()}`)}
                      </div>
                      ${l !== void 0 ? c`<div class="pollen-raw">${l}${a ? " " + a : ""}</div>` : ""}
                    </div>
                  `
    )}
              </div>
            ` : ""}
    `;
  }
};
gi([
  m({ attribute: !1 })
], Ht.prototype, "hass", 2);
gi([
  m({ attribute: !1 })
], Ht.prototype, "config", 2);
gi([
  Z()
], Ht.prototype, "_expanded", 2);
Ht = gi([
  O(ct)
], Ht);
var bc = Object.defineProperty, wc = Object.getOwnPropertyDescriptor, tn = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? wc(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && bc(e, t, r), r;
};
W({ loader: (n) => U[n] });
let ni = class extends N {
  setConfig(n) {
    this._config = { ...n }, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config {
        padding: 16px;
      }
      .header {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--card-divider-color);
      }
      .header-title {
        font-size: 20px;
        font-weight: bold;
        color: var(--primary-text-color);
      }
      .pollen-type-block {
        margin-bottom: 12px;
        border: 1px solid var(--card-divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 10px;
        overflow: hidden;
      }
      .pollen-type-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        user-select: none;
      }
      .pollen-type-toggle {
        background: none;
        border: none;
        padding: 0;
        flex: 1;
        text-align: left;
        cursor: pointer;
        color: inherit;
        font: inherit;
      }
      .pollen-type-name {
        font-size: 14px;
        font-weight: 600;
      }
      .pollen-type-fields {
        padding: 8px 14px 4px;
      }
      .field-label {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        color: var(--secondary-text-color);
        margin: 8px 0 2px;
      }
      ha-form {
        display: block;
      }
    `;
  }
  render() {
    return this.hass ? (ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2)), c`
      <div class="card-config">
        <div class="header">
          <div class="header-title">🌿 MeteoSwiss Pollen Card</div>
        </div>
        ${Oi.map((n) => this._renderTypeBlock(n))}
      </div>
    `) : c`<div>Loading...</div>`;
  }
  _renderTypeBlock(n) {
    const e = this._config?.[`${n}_enabled`] !== !1, t = `${n}_entity`, i = `${n}_raw_entity`, r = this._config?.[t] ?? void 0, s = this._config?.[i] ?? void 0;
    return c`
      <div class="pollen-type-block">
        <div class="pollen-type-header">
          <button class="pollen-type-toggle" @click=${() => this._toggleType(n, !e)}>
            <span class="pollen-type-name">${u(`pollen.types.${n}`)}</span>
          </button>
          <ha-switch
            .checked=${e}
            @change=${(o) => this._toggleType(n, o.target.checked)}
          ></ha-switch>
        </div>
        ${e ? c`
                <div class="pollen-type-fields">
                  <div class="field-label">${u("pollen.config.level_sensor")}</div>
                  <ha-form
                    .hass=${this.hass}
                    .data=${{ [t]: r }}
                    .schema=${[
      {
        name: t,
        required: !1,
        selector: { entity: { domain: "sensor" } }
      }
    ]}
                    .computeLabel=${() => u("pollen.config.level_sensor")}
                    .computeHelper=${() => u("pollen.config.level_sensor_hint")}
                    @value-changed=${this._valueChanged}
                  ></ha-form>
                  <div class="field-label">${u("pollen.config.raw_sensor")}</div>
                  <ha-form
                    .hass=${this.hass}
                    .data=${{ [i]: s }}
                    .schema=${[
      { name: i, required: !1, selector: { entity: { domain: "sensor" } } }
    ]}
                    .computeLabel=${() => u("pollen.config.raw_sensor")}
                    .computeHelper=${() => u("pollen.config.raw_sensor_hint")}
                    @value-changed=${this._valueChanged}
                  ></ha-form>
                </div>
              ` : ""}
      </div>
    `;
  }
  _toggleType(n, e) {
    const t = { ...this._config, [`${n}_enabled`]: e };
    this._config = t, oe(this, "config-changed", { config: t }), this.requestUpdate();
  }
  _valueChanged(n) {
    this._config || (this._config = { type: `custom:${ct}` });
    const e = { ...this._config, ...n.detail.value };
    this._config = e, oe(this, "config-changed", { config: e });
  }
};
tn([
  m({ attribute: !1 })
], ni.prototype, "hass", 2);
tn([
  m({ attribute: !1 })
], ni.prototype, "_config", 2);
ni = tn([
  O(Rr)
], ni);
const qe = (n) => (e, t) => t.split(".")[0] !== "weather" ? null : { config: { type: `custom:${n}`, entity: t } };
me({
  type: xe,
  name: "MeteoSwiss Diagram Card",
  description: "A comprehensive weather card for Home Assistant with Swiss weather warnings and forecasts",
  getEntitySuggestion: qe(xe)
});
me({
  type: ve,
  name: "MeteoSwiss Daily Forecast Diagram Card",
  description: "A card to show daily weather forecast as diagram",
  getEntitySuggestion: qe(ve)
});
me({
  type: $e,
  name: "MeteoSwiss Animated Background Card",
  description: "Animated weather background card with current conditions",
  getEntitySuggestion: qe($e)
});
me({
  type: rt,
  name: "MeteoSwiss Temperature Chart Card",
  description: "Hourly temperature forecast chart as standalone card",
  getEntitySuggestion: qe(rt)
});
me({
  type: st,
  name: "MeteoSwiss Precipitation Chart Card",
  description: "Hourly precipitation forecast chart as standalone card",
  getEntitySuggestion: qe(st)
});
me({
  type: ot,
  name: "MeteoSwiss Sunshine Chart Card",
  description: "Hourly sunshine duration chart as standalone card",
  getEntitySuggestion: qe(ot)
});
me({
  type: at,
  name: "MeteoSwiss Wind Chart Card",
  description: "Hourly wind speed & direction chart as standalone card",
  getEntitySuggestion: qe(at)
});
me({
  type: lt,
  name: "MeteoSwiss Warning Card",
  description: "Standalone weather warning card supporting ranked and legacy warning models",
  getEntitySuggestion: (n, e) => {
    if (e.split(".")[0] !== "sensor") return null;
    const t = e.toLowerCase();
    if (!t.includes("warning")) return null;
    let i;
    return t.includes("primary") ? i = "primary_warning_entity" : t.includes("secondary") ? i = "secondary_warning_entity" : t.includes("tertiary") ? i = "tertiary_warning_entity" : i = "warning_entity", { config: { type: `custom:${lt}`, [i]: e } };
  }
});
me({
  type: ct,
  name: "MeteoSwiss Pollen Card",
  description: "Displays current pollen levels for up to 7 pollen types from MeteoSwiss integration",
  getEntitySuggestion: (n, e) => {
    if (e.split(".")[0] !== "sensor") return null;
    const t = e.toLowerCase();
    if (!t.includes("pollen")) return null;
    const r = ["birch", "grasses", "alder", "hazel", "beech", "ash", "oak"].find((s) => t.includes(s));
    return r ? { config: { type: `custom:${ct}`, [`${r}_entity`]: e } } : null;
  }
});
console.info(
  `%c MeteoSwiss Weather Card %c v${qr} `,
  "background: #0093DD; color: white; font-weight: bold;",
  "background: transparent; color: #0093DD;"
);
export {
  Y as DailyForecastChart,
  Se as DailyForecastDiagram,
  Ie as ForecastDiagramCard,
  Nt as ForecastDiagramCardEditor,
  ke as ForecastTemperatureChart,
  ze as MeteoSwissBGCard,
  Tt as MeteoSwissBGCardEditor,
  fe as MeteoSwissCard,
  Lt as MeteoSwissCardEditor,
  Ht as PollenCard,
  ni as PollenCardEditor,
  qn as PrecipitationCard,
  Jt as PrecipitationCardEditor,
  Ce as PrecipitationChart,
  Vn as SunshineCard,
  ei as SunshineCardEditor,
  le as SunshineChart,
  jn as TemperatureCard,
  Xt as TemperatureCardEditor,
  Ot as WarningCard,
  ii as WarningCardEditor,
  Zn as WindCard,
  ti as WindCardEditor,
  Ae as WindChart
};
//# sourceMappingURL=meteoswiss-weather-card.js.map
