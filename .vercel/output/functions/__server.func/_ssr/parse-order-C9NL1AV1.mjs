//#region node_modules/.nitro/vite/services/ssr/assets/parse-order-C9NL1AV1.js
var CATALOG = [
	{
		id: "red-scarf",
		name: "Red Scarf",
		aliases: [
			"red scarf",
			"red scarves",
			"lal scarf",
			"red stole"
		],
		price: 180,
		hsn: "6214",
		unit: "pcs",
		color: "Red"
	},
	{
		id: "blue-dupatta",
		name: "Blue Dupatta",
		aliases: [
			"blue dupatta",
			"blue dupatte",
			"neela dupatta",
			"blue duppata"
		],
		price: 250,
		hsn: "6214",
		unit: "pcs",
		color: "Blue"
	},
	{
		id: "green-stole",
		name: "Green Stole",
		aliases: [
			"green stole",
			"green stoles",
			"hara stole",
			"green scarf"
		],
		price: 220,
		hsn: "6214",
		unit: "pcs",
		color: "Green"
	},
	{
		id: "black-kurta-m",
		name: "Black Kurta (M)",
		aliases: [
			"black kurta",
			"black kurtas",
			"kala kurta"
		],
		price: 450,
		hsn: "6204",
		unit: "pcs",
		color: "Black"
	},
	{
		id: "white-kurta-l",
		name: "White Kurta (L)",
		aliases: [
			"white kurta",
			"white kurtas",
			"safed kurta"
		],
		price: 480,
		hsn: "6204",
		unit: "pcs",
		color: "White"
	},
	{
		id: "maroon-dupatta",
		name: "Maroon Dupatta",
		aliases: [
			"maroon dupatta",
			"maroon dupatte",
			"wine dupatta"
		],
		price: 280,
		hsn: "6214",
		unit: "pcs",
		color: "Maroon"
	},
	{
		id: "beige-scarf",
		name: "Beige Scarf",
		aliases: [
			"beige scarf",
			"cream scarf",
			"offwhite scarf"
		],
		price: 190,
		hsn: "6214",
		unit: "pcs",
		color: "Beige"
	},
	{
		id: "pink-dupatta",
		name: "Pink Dupatta",
		aliases: [
			"pink dupatta",
			"pink dupatte",
			"gulabi dupatta"
		],
		price: 260,
		hsn: "6214",
		unit: "pcs",
		color: "Pink"
	},
	{
		id: "navy-stole",
		name: "Navy Stole",
		aliases: [
			"navy stole",
			"navy stoles",
			"dark blue stole"
		],
		price: 240,
		hsn: "6214",
		unit: "pcs",
		color: "Navy"
	},
	{
		id: "cotton-saree",
		name: "Cotton Saree",
		aliases: [
			"cotton saree",
			"cotton saari",
			"saree",
			"saari"
		],
		price: 850,
		hsn: "5407",
		unit: "pcs"
	}
];
function findProduct(name, color, size) {
	const hay = `${color ?? ""} ${name} ${size ?? ""}`.toLowerCase().trim();
	const exact = CATALOG.find((p) => p.aliases.some((a) => hay.includes(a) || a.includes(hay)));
	if (exact) return exact;
	return CATALOG.find((p) => {
		return p.name.toLowerCase().split(/\s+/).every((t) => hay.includes(t) || t.length <= 2);
	});
}
var ADDRESS_WORDS = /^(bhaiya|bhaiyya|bhai|bhaiji|madam|maam|ma'am|sir|didi|ji|boss|yaar|dear)$/i;
var INQUIRY_RE = /\b(rate|price|kitne ka|kitna|kya hai|available|stock hai|sample|catalogue|catalog|price list)\b/i;
var CONFIRM_RE = /\b(bhej dena|bhej do|bhej dena|bhejo|bhej de|send|dispatch|order confirm|pakka|deal|le raha|le lungi|le rahi|book kar|confirm|bhej dena kal|kal tak)\b/i;
var SIZE_RE = /\bsize\s*(xs|s|m|l|xl|xxl|[0-9]{1,2})\b/i;
function normalize(text) {
	return text.toLowerCase().replace(/duppate|duppata/g, "dupatta").replace(/scarves/g, "scarf").replace(/kurtas/g, "kurta").replace(/stoles/g, "stole").replace(/saari/g, "saree");
}
function qtyNear(text, alias) {
	const n = normalize(text);
	const a = alias.toLowerCase();
	const patterns = [
		new RegExp(`(\\d+)\\s*(?:pcs?|piece|pieces)?\\s*${escapeRe(a)}`),
		new RegExp(`${escapeRe(a)}\\s*(?:x|×)?\\s*(\\d+)`),
		new RegExp(`(\\d+)\\s+${escapeRe(a)}`)
	];
	for (const re of patterns) {
		const m = n.match(re);
		if (m?.[1]) return Number(m[1]);
	}
	return null;
}
function escapeRe(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function parseOrderLocal(opts) {
	const text = opts.messages;
	const warnings = [];
	const items = [];
	const seen = /* @__PURE__ */ new Set();
	for (const product of CATALOG) for (const alias of [product.name, ...product.aliases]) {
		const qty = qtyNear(text, alias);
		if (qty && qty > 0 && !seen.has(product.id)) {
			seen.add(product.id);
			const sizeMatch = text.match(SIZE_RE);
			items.push({
				name: product.name,
				quantity: qty,
				color: product.color,
				size: sizeMatch?.[1]?.toUpperCase(),
				unitPrice: product.price
			});
			break;
		}
	}
	const kurtaSplit = [...normalize(text).matchAll(/(\d+)\s+(black|white|red|blue|green)\s+kurta(?:s)?(?:\s+size\s*(m|l|s|xl))?/g)];
	if (kurtaSplit.length) for (const m of kurtaSplit) {
		const qty = Number(m[1]);
		const color = m[2];
		const size = m[3]?.toUpperCase();
		const product = findProduct("kurta", color, size);
		if (product && !items.some((i) => i.name === product.name)) items.push({
			name: product.name,
			quantity: qty,
			color: product.color,
			size,
			unitPrice: product.price
		});
	}
	const isInquiry = INQUIRY_RE.test(text) && !CONFIRM_RE.test(text);
	const isConfirmed = CONFIRM_RE.test(text) && items.length > 0 && !isInquiry;
	if (ADDRESS_WORDS.test(text.trim().split(/\s+/)[0] ?? "")) warnings.push("Polite address (Bhaiya/Madam) ignored — using WhatsApp contact name.");
	if (isInquiry) warnings.push("This reads as a price inquiry, not a confirmed order.");
	if (items.length === 0) warnings.push("No catalog products matched. Add items manually.");
	const delivery = text.match(/\b(kal tak|aaj|parso|kal|today|tomorrow|day after)\b/i)?.[0] ?? null;
	const payment = text.match(/\b(upi|cod|cash|advance|payment kal|baad mein|later)\b/i)?.[0] ?? null;
	return {
		isConfirmedOrder: isConfirmed,
		confidence: items.length === 0 ? .25 : isConfirmed ? .82 : .55,
		customerName: opts.contactName,
		items,
		deliveryIntent: delivery,
		paymentIntent: payment,
		warnings,
		reasoning: "Local Hinglish parser (catalog + quantity patterns)."
	};
}
function extractedToItems(extracted) {
	return extracted.items.map((item) => {
		const product = findProduct(item.name, item.color, item.size);
		return {
			productId: product?.id ?? item.name.toLowerCase().replace(/\s+/g, "-"),
			name: product?.name ?? item.name,
			qty: item.quantity,
			rate: item.unitPrice ?? product?.price ?? 0,
			hsn: product?.hsn ?? "6214",
			color: item.color ?? product?.color,
			size: item.size
		};
	});
}
//#endregion
export { extractedToItems as n, parseOrderLocal as r, CATALOG as t };
