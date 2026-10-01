import { i as __toESM } from "../_runtime.mjs";
import { n as extractedToItems } from "./parse-order-C9NL1AV1.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as useRouter, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CMvxgqwk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function formatINR(value, fractionDigits = 0) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: fractionDigits,
		minimumFractionDigits: fractionDigits
	}).format(value);
}
function formatCompactINR(value) {
	const abs = Math.abs(value);
	if (abs >= 1e7) return `₹${(value / 1e7).toFixed(2)} Cr`;
	if (abs >= 1e5) return `₹${(value / 1e5).toFixed(1)} L`;
	return formatINR(value);
}
function formatQty(n) {
	return new Intl.NumberFormat("en-IN").format(n);
}
function indianDate(iso) {
	return new Intl.DateTimeFormat("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	}).format(new Date(iso));
}
function indianDateTime(iso) {
	return new Intl.DateTimeFormat("en-IN", {
		day: "2-digit",
		month: "short",
		hour: "numeric",
		minute: "2-digit"
	}).format(new Date(iso));
}
function daysBetween(fromIso, to = /* @__PURE__ */ new Date()) {
	const from = new Date(fromIso).getTime();
	return Math.floor((to.getTime() - from) / 864e5);
}
function uid(prefix) {
	return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
function lineAmount(item) {
	return Math.round(item.qty * item.rate);
}
function taxableTotal(items) {
	return items.reduce((sum, item) => sum + lineAmount(item), 0);
}
function splitGst(taxable, ratePct, intraState) {
	const gst = Math.round(taxable * ratePct / 100);
	if (intraState) {
		const half = Math.round(gst / 2);
		return {
			cgst: half,
			sgst: gst - half,
			igst: 0,
			gst
		};
	}
	return {
		cgst: 0,
		sgst: 0,
		igst: gst,
		gst
	};
}
function buildUpiLink(business, amount, note) {
	return `upi://pay?${new URLSearchParams({
		pa: business.upi,
		pn: business.name,
		am: String(amount),
		cu: "INR",
		tn: note
	}).toString()}`;
}
function addDays(iso, days) {
	const d = new Date(iso);
	d.setDate(d.getDate() + days);
	return d.toISOString();
}
function buildInvoice(opts) {
	const issuedAt = opts.issuedAt ?? (/* @__PURE__ */ new Date()).toISOString();
	const taxable = taxableTotal(opts.order.items);
	const intra = opts.isIntraState ?? true;
	const split = splitGst(taxable, opts.business.gstRate, intra);
	const total = taxable + split.gst;
	const number = `${opts.business.invoicePrefix}-${String(opts.business.nextInvoiceSeq).padStart(4, "0")}`;
	return {
		invoice: {
			id: uid("inv"),
			number,
			orderId: opts.order.id,
			conversationId: opts.order.conversationId,
			customerName: opts.order.customerName,
			customerPhone: opts.order.customerPhone,
			customerCity: opts.order.customerCity,
			customerGstin: opts.customerGstin,
			items: opts.order.items,
			taxable,
			cgst: split.cgst,
			sgst: split.sgst,
			igst: split.igst,
			total,
			gstRate: opts.business.gstRate,
			placeOfSupply: intra ? opts.business.state : opts.order.customerCity,
			isIntraState: intra,
			status: "unpaid",
			issuedAt,
			dueAt: addDays(issuedAt, 7),
			upiLink: buildUpiLink(opts.business, total, `Invoice ${number}`)
		},
		nextSeq: opts.business.nextInvoiceSeq + 1
	};
}
function isOverdue(invoice, now = /* @__PURE__ */ new Date()) {
	if (invoice.status === "paid") return false;
	return new Date(invoice.dueAt).getTime() < now.getTime();
}
var DEFAULT_BUSINESS = {
	name: "Mehta Textiles",
	gstin: "24AABCM1234A1Z5",
	address: "Shop 14, Millennium Textile Market, Ring Road",
	city: "Surat",
	state: "Gujarat",
	stateCode: "24",
	phone: "+91 98765 43210",
	email: "accounts@mehtatextiles.in",
	upi: "mehtatextiles@okhdfcbank",
	gstRate: 5,
	invoicePrefix: "MT-2026",
	nextInvoiceSeq: 5
};
var T = {
	d1: "2026-08-04T10:12:00.000Z",
	d2: "2026-08-12T09:40:00.000Z",
	d3: "2026-08-20T14:05:00.000Z",
	d4: "2026-08-08T11:22:00.000Z",
	now: "2026-08-31T07:40:00.000Z",
	m1: "2026-08-30T16:18:00.000Z",
	m2: "2026-08-31T06:55:00.000Z",
	m3: "2026-08-31T08:10:00.000Z",
	m4: "2026-08-29T19:02:00.000Z"
};
var SEED_CONVERSATIONS = [
	{
		id: "chat-rakesh",
		name: "Rakesh Traders",
		city: "Ahmedabad",
		phone: "+91 98250 11011",
		gstin: "24AARFT8821P1Z3",
		lastMessage: "Bhaiya 5 red scarf aur 2 blue dupatta bhej dena kal tak",
		lastAt: T.m3,
		unread: 2,
		messages: [
			{
				id: "m1",
				from: "customer",
				text: "Bhai kya haal hai, stock ready hai na?",
				at: "2026-08-31T07:58:00.000Z"
			},
			{
				id: "m2",
				from: "business",
				text: "Haan Rakesh bhai, scarf aur dupatta dono ready hain. Kitna chahiye?",
				at: "2026-08-31T08:02:00.000Z"
			},
			{
				id: "m3",
				from: "customer",
				text: "Bhaiya 5 red scarf aur 2 blue dupatta bhej dena kal tak",
				at: T.m3
			}
		]
	},
	{
		id: "chat-anjali",
		name: "Anjali Boutique",
		city: "Indore",
		phone: "+91 73122 44008",
		lastMessage: "10 black kurta size M, 5 white size L. COD nahi, UPI se.",
		lastAt: T.m2,
		unread: 3,
		messages: [
			{
				id: "a1",
				from: "customer",
				text: "Kurta wala rate last time wala chalega?",
				at: "2026-08-31T06:40:00.000Z"
			},
			{
				id: "a2",
				from: "business",
				text: "Haan Anjali ji, M ₹450, L ₹480. Confirm kar do qty.",
				at: "2026-08-31T06:48:00.000Z"
			},
			{
				id: "a3",
				from: "customer",
				text: "Madam, 10 black kurta size M, 5 white size L. COD nahi, UPI se. Pakka order, aaj hi book kar do.",
				at: T.m2
			}
		]
	},
	{
		id: "chat-kiran",
		name: "Kiran Sarees",
		city: "Nagpur",
		phone: "+91 98222 77331",
		lastMessage: "haan wo 3 green stole jo kal dikhaya tha wo bhej do, payment kal kar dunga",
		lastAt: T.m1,
		unread: 1,
		messages: [{
			id: "k1",
			from: "business",
			text: "Kiran ji, green stole sample pics bhej di. ₹220/pc.",
			at: "2026-08-30T11:10:00.000Z"
		}, {
			id: "k2",
			from: "customer",
			text: "haan wo 3 green stole jo kal dikhaya tha wo bhej do, payment kal kar dunga",
			at: T.m1
		}]
	},
	{
		id: "chat-sharma",
		name: "Sharma Garments",
		city: "Jaipur",
		phone: "+91 94140 22019",
		lastMessage: "Red dupatta ka rate kya hai? Sample bhej sakte ho kya?",
		lastAt: T.m4,
		unread: 1,
		messages: [{
			id: "s1",
			from: "customer",
			text: "Bhaiya red dupatta ka rate kya hai? Sample bhej sakte ho kya?",
			at: T.m4
		}]
	},
	{
		id: "chat-patel",
		name: "Patel Wholesale",
		city: "Vadodara",
		phone: "+91 98795 44120",
		gstin: "24AAPFP4412Q1Z8",
		lastMessage: "ok deal. 8 maroon dupatta bhej dena.",
		lastAt: "2026-08-28T15:44:00.000Z",
		unread: 0,
		messages: [
			{
				id: "p1",
				from: "customer",
				text: "bhai 8 piece maroon dupatta le raha hu, 50 rs kam kar do per piece",
				at: "2026-08-28T15:20:00.000Z"
			},
			{
				id: "p2",
				from: "business",
				text: "8 pc pe ₹20 kam — ₹260. Last.",
				at: "2026-08-28T15:31:00.000Z"
			},
			{
				id: "p3",
				from: "customer",
				text: "ok deal. 8 maroon dupatta bhej dena.",
				at: "2026-08-28T15:44:00.000Z"
			}
		]
	},
	{
		id: "chat-neha",
		name: "Neha Creations",
		city: "Pune",
		phone: "+91 98600 12845",
		lastMessage: "Invoice mil gaya, UPI kar diya",
		lastAt: "2026-08-18T17:02:00.000Z",
		unread: 0,
		messages: [
			{
				id: "n1",
				from: "customer",
				text: "25 beige scarf chahiye this week. Confirm.",
				at: "2026-08-12T09:12:00.000Z"
			},
			{
				id: "n2",
				from: "business",
				text: "Confirm. Invoice MT-2026-0002 bhej raha hoon.",
				at: "2026-08-12T09:40:00.000Z"
			},
			{
				id: "n3",
				from: "customer",
				text: "Invoice mil gaya, UPI kar diya",
				at: "2026-08-18T17:02:00.000Z"
			}
		]
	}
];
function money(items, intra, rate) {
	const taxable = taxableTotal(items);
	const split = splitGst(taxable, rate, intra);
	return {
		taxable,
		...split,
		total: taxable + split.gst
	};
}
var SEED_ORDERS = [
	{
		id: "ord-patel",
		conversationId: "chat-patel",
		customerName: "Patel Wholesale",
		customerPhone: "+91 98795 44120",
		customerCity: "Vadodara",
		items: [{
			productId: "maroon-dupatta",
			name: "Maroon Dupatta",
			qty: 8,
			rate: 260,
			hsn: "6214",
			color: "Maroon"
		}],
		deliveryNote: "bhej dena",
		paymentNote: "deal at ₹260",
		status: "invoiced",
		source: "ai",
		confidence: .93,
		warnings: [],
		isConfirmedOrder: true,
		createdAt: "2026-08-28T15:50:00.000Z",
		invoiceId: "inv-patel",
		rawChat: "ok deal. 8 maroon dupatta bhej dena."
	},
	{
		id: "ord-neha",
		conversationId: "chat-neha",
		customerName: "Neha Creations",
		customerPhone: "+91 98600 12845",
		customerCity: "Pune",
		items: [{
			productId: "beige-scarf",
			name: "Beige Scarf",
			qty: 25,
			rate: 190,
			hsn: "6214",
			color: "Beige"
		}],
		deliveryNote: "this week",
		paymentNote: "UPI",
		status: "paid",
		source: "ai",
		confidence: .9,
		warnings: [],
		isConfirmedOrder: true,
		createdAt: T.d2,
		invoiceId: "inv-neha",
		rawChat: "25 beige scarf chahiye this week. Confirm."
	},
	{
		id: "ord-old",
		conversationId: "chat-rakesh",
		customerName: "Rakesh Traders",
		customerPhone: "+91 98250 11011",
		customerCity: "Ahmedabad",
		items: [{
			productId: "navy-stole",
			name: "Navy Stole",
			qty: 40,
			rate: 240,
			hsn: "6214",
			color: "Navy"
		}, {
			productId: "pink-dupatta",
			name: "Pink Dupatta",
			qty: 12,
			rate: 260,
			hsn: "6214",
			color: "Pink"
		}],
		deliveryNote: "Surat depot pickup",
		paymentNote: "UPI",
		status: "paid",
		source: "local",
		confidence: .88,
		warnings: [],
		isConfirmedOrder: true,
		createdAt: T.d1,
		invoiceId: "inv-old",
		rawChat: "40 navy stole + 12 pink dupatta"
	},
	{
		id: "ord-gupta",
		conversationId: "chat-sharma",
		customerName: "Gupta Retail",
		customerPhone: "+91 94140 99821",
		customerCity: "Jaipur",
		items: [{
			productId: "cotton-saree",
			name: "Cotton Saree",
			qty: 18,
			rate: 850,
			hsn: "5407"
		}],
		deliveryNote: "bus parcel",
		paymentNote: "pending",
		status: "invoiced",
		source: "manual",
		confidence: 1,
		warnings: [],
		isConfirmedOrder: true,
		createdAt: T.d4,
		invoiceId: "inv-gupta",
		rawChat: "18 cotton saree"
	}
];
function invoiceFrom(id, number, order, issuedAt, dueAt, status, paidAt, intra, gstin) {
	const m = money(order.items, intra, 5);
	return {
		id,
		number,
		orderId: order.id,
		conversationId: order.conversationId,
		customerName: order.customerName,
		customerPhone: order.customerPhone,
		customerCity: order.customerCity,
		customerGstin: gstin,
		items: order.items,
		taxable: m.taxable,
		cgst: m.cgst,
		sgst: m.sgst,
		igst: m.igst,
		total: m.total,
		gstRate: 5,
		placeOfSupply: intra ? "Gujarat" : order.customerCity,
		isIntraState: intra,
		status,
		issuedAt,
		dueAt,
		paidAt,
		sentAt: issuedAt,
		upiLink: buildUpiLink(DEFAULT_BUSINESS, m.total, `Invoice ${number}`)
	};
}
var SEED_INVOICES = [
	invoiceFrom("inv-old", "MT-2026-0001", SEED_ORDERS[2], T.d1, "2026-08-11T10:12:00.000Z", "paid", "2026-08-06T12:00:00.000Z", true, "24AARFT8821P1Z3"),
	invoiceFrom("inv-neha", "MT-2026-0002", SEED_ORDERS[1], T.d2, "2026-08-19T09:40:00.000Z", "paid", "2026-08-18T17:00:00.000Z", false),
	invoiceFrom("inv-gupta", "MT-2026-0003", SEED_ORDERS[3], T.d4, "2026-08-15T11:22:00.000Z", "unpaid", void 0, false),
	invoiceFrom("inv-patel", "MT-2026-0004", SEED_ORDERS[0], "2026-08-28T16:00:00.000Z", "2026-09-04T16:00:00.000Z", "unpaid", void 0, true, "24AAPFP4412Q1Z8")
];
var SEED_REMINDERS = [{
	id: "rem-1",
	invoiceId: "inv-gupta",
	tone: "gentle",
	message: "Namaste Gupta ji, invoice MT-2026-0003 ka payment pending hai. Jab convenient ho, clear kar dena.",
	sentAt: "2026-08-16T10:00:00.000Z"
}, {
	id: "rem-2",
	invoiceId: "inv-gupta",
	tone: "firm",
	message: "Gupta ji, invoice MT-2026-0003 due date nikal chuka hai. Please aaj UPI kar dein.",
	sentAt: "2026-08-22T10:00:00.000Z"
}];
function reminderTone(invoice, now = /* @__PURE__ */ new Date()) {
	const days = daysBetween(invoice.dueAt, now);
	if (days >= 9) return "escalate";
	if (days >= 1 || isOverdue(invoice, now)) return "firm";
	return "gentle";
}
function reminderCopy(invoice, business, tone) {
	const amt = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(invoice.total);
	const name = invoice.customerName.replace(/\s+(traders|boutique|garments|sarees|wholesale)$/i, "");
	if (tone === "gentle") return `Namaste ${name} ji, invoice ${invoice.number} ka payment pending hai — ${amt}. UPI: ${business.upi}. Jab convenient ho, clear kar dena. — ${business.name}`;
	if (tone === "firm") return `${name} ji, invoice ${invoice.number} due date nikal chuka hai. Amount ${amt}. Please aaj UPI kar dein taaki naya dispatch continue rahe. UPI: ${business.upi} — ${business.name}`;
	return `${name} ji, invoice ${invoice.number} overdue hai (${amt}). Is hafte clear nahi hua to naya order hold karna padega. UPI: ${business.upi} — ${business.name}`;
}
var seed = () => ({
	business: DEFAULT_BUSINESS,
	conversations: SEED_CONVERSATIONS,
	orders: SEED_ORDERS,
	invoices: SEED_INVOICES,
	reminders: SEED_REMINDERS,
	draft: null
});
var useStore = create()(persist((set, get) => ({
	hydrated: false,
	setHydrated: () => set({ hydrated: true }),
	...seed(),
	setBusiness: (patch) => set((s) => ({ business: {
		...s.business,
		...patch
	} })),
	markRead: (conversationId) => set((s) => ({ conversations: s.conversations.map((c) => c.id === conversationId ? {
		...c,
		unread: 0
	} : c) })),
	addPastedChat: ({ name, city, phone, text }) => {
		const id = uid("chat");
		const at = (/* @__PURE__ */ new Date()).toISOString();
		const convo = {
			id,
			name,
			city,
			phone,
			lastMessage: text.slice(0, 80),
			lastAt: at,
			unread: 1,
			messages: [{
				id: uid("m"),
				from: "customer",
				text,
				at
			}]
		};
		set((s) => ({ conversations: [convo, ...s.conversations] }));
		return id;
	},
	appendMessage: (conversationId, text, from) => {
		const at = (/* @__PURE__ */ new Date()).toISOString();
		set((s) => ({ conversations: s.conversations.map((c) => c.id !== conversationId ? c : {
			...c,
			lastMessage: text.slice(0, 80),
			lastAt: at,
			messages: [...c.messages, {
				id: uid("m"),
				from,
				text,
				at
			}]
		}) }));
	},
	openDraft: (conversationId, extracted, source) => {
		const convo = get().conversations.find((c) => c.id === conversationId);
		set({ draft: {
			conversationId,
			extracted: {
				...extracted,
				customerName: convo?.name ?? extracted.customerName
			},
			source,
			items: extractedToItems(extracted),
			deliveryNote: extracted.deliveryIntent ?? "",
			paymentNote: extracted.paymentIntent ?? ""
		} });
	},
	updateDraftItems: (items) => set((s) => s.draft ? { draft: {
		...s.draft,
		items
	} } : s),
	updateDraftNotes: (patch) => set((s) => s.draft ? { draft: {
		...s.draft,
		...patch
	} } : s),
	clearDraft: () => set({ draft: null }),
	confirmDraft: () => {
		const { draft, conversations } = get();
		if (!draft || draft.items.length === 0) return null;
		const convo = conversations.find((c) => c.id === draft.conversationId);
		if (!convo) return null;
		const order = {
			id: uid("ord"),
			conversationId: convo.id,
			customerName: convo.name,
			customerPhone: convo.phone,
			customerCity: convo.city,
			items: draft.items,
			deliveryNote: draft.deliveryNote,
			paymentNote: draft.paymentNote,
			status: "confirmed",
			source: draft.source,
			confidence: draft.extracted.confidence,
			warnings: draft.extracted.warnings,
			isConfirmedOrder: draft.extracted.isConfirmedOrder,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			rawChat: convo.messages.map((m) => m.text).join("\n")
		};
		set((s) => ({
			orders: [order, ...s.orders],
			draft: null
		}));
		return order.id;
	},
	invoiceOrder: (orderId) => {
		const { orders, business, conversations } = get();
		const order = orders.find((o) => o.id === orderId);
		if (!order) return null;
		const convo = conversations.find((c) => c.id === order.conversationId);
		const intra = /gujarat|ahmedabad|surat|vadodara|rajkot/i.test(order.customerCity) || /gujarat/i.test(order.customerCity);
		const { invoice, nextSeq } = buildInvoice({
			order,
			business,
			customerGstin: convo?.gstin,
			isIntraState: intra
		});
		set((s) => ({
			invoices: [invoice, ...s.invoices],
			orders: s.orders.map((o) => o.id === orderId ? {
				...o,
				status: "invoiced",
				invoiceId: invoice.id
			} : o),
			business: {
				...s.business,
				nextInvoiceSeq: nextSeq
			}
		}));
		return invoice.id;
	},
	markInvoicePaid: (invoiceId) => {
		const paidAt = (/* @__PURE__ */ new Date()).toISOString();
		set((s) => {
			const inv = s.invoices.find((i) => i.id === invoiceId);
			return {
				invoices: s.invoices.map((i) => i.id === invoiceId ? {
					...i,
					status: "paid",
					paidAt
				} : i),
				orders: s.orders.map((o) => o.id === inv?.orderId ? {
					...o,
					status: "paid"
				} : o)
			};
		});
	},
	markInvoiceSent: (invoiceId) => {
		const sentAt = (/* @__PURE__ */ new Date()).toISOString();
		const inv = get().invoices.find((i) => i.id === invoiceId);
		if (!inv) return;
		get().appendMessage(inv.conversationId, `Invoice ${inv.number} — ${inv.upiLink}`, "business");
		set((s) => ({ invoices: s.invoices.map((i) => i.id === invoiceId ? {
			...i,
			sentAt
		} : i) }));
	},
	sendReminder: (invoiceId) => {
		const { invoices, business } = get();
		const inv = invoices.find((i) => i.id === invoiceId);
		if (!inv || inv.status === "paid") return null;
		const tone = reminderTone(inv);
		const message = reminderCopy(inv, business, tone);
		const reminder = {
			id: uid("rem"),
			invoiceId,
			tone,
			message,
			sentAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		get().appendMessage(inv.conversationId, message, "business");
		set((s) => ({ reminders: [reminder, ...s.reminders] }));
		return reminder;
	},
	resetDemo: () => set({ ...seed() })
}), {
	name: "chat2cash-v1",
	skipHydration: true,
	partialize: (s) => ({
		business: s.business,
		conversations: s.conversations,
		orders: s.orders,
		invoices: s.invoices,
		reminders: s.reminders
	})
}));
function HydrateStore() {
	const setHydrated = useStore((s) => s.setHydrated);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const unsub = useStore.persist.onFinishHydration(() => {
			if (!cancelled) setHydrated();
		});
		useStore.persist.rehydrate().then(() => {
			if (!cancelled) setHydrated();
		});
		return () => {
			cancelled = true;
			unsub();
		};
	}, [setHydrated]);
	return null;
}
var styles_default = "/assets/styles-DoUBOjcq.css";
var APP_NAME = "Chat2Cash";
var Route$10 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Turn WhatsApp chats into GST invoices and collected cash — without changing how you already work."
			},
			{
				name: "theme-color",
				content: "#1F4D3A"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HydrateStore, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					position: "bottom-right",
					toastOptions: { className: "font-sans" }
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$9 = () => import("./routes-Bi6XcWV1.mjs");
var Route$9 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("../_app-fN46v2Du.mjs");
var Route$8 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./customers-DQrKzJFb.mjs");
var Route$7 = createFileRoute("/_app/customers")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./follow-ups-D7uVmI5l.mjs");
var Route$6 = createFileRoute("/_app/follow-ups")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./inbox-C08mq0lA.mjs");
var Route$5 = createFileRoute("/_app/inbox")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./invoices-ByA1noji.mjs");
var Route$4 = createFileRoute("/_app/invoices")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./orders-DUaAG1jS.mjs");
var Route$3 = createFileRoute("/_app/orders")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./payments-lZNQ-6jT.mjs");
var Route$2 = createFileRoute("/_app/payments")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./settings-JnLaZLyh.mjs");
var Route$1 = createFileRoute("/_app/settings")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./invoice._invoiceId-Br21JQIK.mjs");
var Route = createFileRoute("/invoice/$invoiceId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var AppRoute = Route$8.update({
	id: "/_app",
	getParentRoute: () => Route$10
});
var AppCustomersRoute = Route$7.update({
	id: "/customers",
	path: "/customers",
	getParentRoute: () => AppRoute
});
var AppFollowUpsRoute = Route$6.update({
	id: "/follow-ups",
	path: "/follow-ups",
	getParentRoute: () => AppRoute
});
var AppInboxRoute = Route$5.update({
	id: "/inbox",
	path: "/inbox",
	getParentRoute: () => AppRoute
});
var AppInvoicesRoute = Route$4.update({
	id: "/invoices",
	path: "/invoices",
	getParentRoute: () => AppRoute
});
var AppOrdersRoute = Route$3.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AppRoute
});
var AppPaymentsRoute = Route$2.update({
	id: "/payments",
	path: "/payments",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$1.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var InvoiceInvoiceIdRoute = Route.update({
	id: "/invoice/$invoiceId",
	path: "/invoice/$invoiceId",
	getParentRoute: () => Route$10
});
var AppRouteChildren = {
	AppCustomersRoute,
	AppFollowUpsRoute,
	AppInboxRoute,
	AppInvoicesRoute,
	AppOrdersRoute,
	AppPaymentsRoute,
	AppSettingsRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	InvoiceInvoiceIdRoute
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { reminderTone as a, taxableTotal as c, formatINR as d, formatQty as f, reminderCopy as i, daysBetween as l, indianDateTime as m, Route as n, isOverdue as o, indianDate as p, useStore as r, lineAmount as s, router_exports as t, formatCompactINR as u };
