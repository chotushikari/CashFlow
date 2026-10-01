import { r as parseOrderLocal, t as CATALOG } from "./parse-order-C9NL1AV1.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/extract-order-D1OwnNIG.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var SYSTEM = `You extract confirmed wholesale orders from messy Indian WhatsApp chats (Hinglish: mixed Hindi + English, typos, voice-note transcripts).

Return ONLY valid JSON matching this schema:
{
  "isConfirmedOrder": boolean,
  "confidence": number,
  "customerName": string | null,
  "items": [{"name": string, "quantity": number, "color": string, "size": string, "unitPrice": number, "notes": string}],
  "deliveryIntent": string | null,
  "paymentIntent": string | null,
  "warnings": string[],
  "reasoning": string
}

Rules:
- Distinguish INQUIRY vs CONFIRMED ORDER. Inquiries ask rate/price/availability ("rate kya hai", "available hai kya"). Confirmed orders request dispatch ("bhej dena", "bhej do", "pakka", "deal", "order confirm", "le raha hu").
- NEVER treat polite address words as customer names: Bhaiya, Bhai, Bhaiyya, Madam, Sir, Didi, Ji, Boss, Yaar. Use the provided WhatsApp contact name instead.
- Extract every product with quantity. Map to the catalog names when possible.
- Typos: duppata→dupatta, scarves→scarf, saari→saree.
- Multiple products in one sentence are normal ("5 red scarf aur 2 blue dupatta").
- Negotiation mixed with ordering: if they agree ("ok deal", "theek hai") treat as confirmed.
- Voice-note transcripts may lack punctuation.
- If quantity is missing, omit the item and add a warning.
- unitPrice: use catalog price when the name matches; otherwise null.
- confidence: 0-1. Lower if inquiry, missing qty, or ambiguous product.
- Do not invent products that are not in the chat.`;
var FEW_SHOT = `Catalog:
${CATALOG.map((p) => `- ${p.name} | aliases: ${p.aliases.join(", ")} | ₹${p.price} | HSN ${p.hsn}`).join("\n")}

Example 1
Contact: Rakesh Traders
Chat: Bhaiya 5 red scarf aur 2 blue dupatta bhej dena kal tak
JSON: {"isConfirmedOrder":true,"confidence":0.94,"customerName":"Rakesh Traders","items":[{"name":"Red Scarf","quantity":5,"color":"Red","unitPrice":180},{"name":"Blue Dupatta","quantity":2,"color":"Blue","unitPrice":250}],"deliveryIntent":"kal tak","paymentIntent":null,"warnings":["Polite address Bhaiya ignored"],"reasoning":"Dispatch verb bhej dena + quantities."}

Example 2
Contact: Sharma Garments
Chat: Red dupatta ka rate kya hai?
JSON: {"isConfirmedOrder":false,"confidence":0.4,"customerName":"Sharma Garments","items":[{"name":"Blue Dupatta","quantity":0,"color":"Red","unitPrice":250}],"deliveryIntent":null,"paymentIntent":null,"warnings":["Inquiry, not an order","Quantity missing"],"reasoning":"Asking for rate."}`;
var extractOrder_createServerFn_handler = createServerRpc({
	id: "97870cd8feb2325c20a349a66511102640cb74e32cad308fe380646f1b0509f6",
	name: "extractOrder",
	filename: "src/lib/extract-order.ts"
}, (opts) => extractOrder.__executeServer(opts));
var extractOrder = createServerFn({ method: "POST" }).validator((input) => input).handler(extractOrder_createServerFn_handler, async ({ data }) => {
	const fallback = parseOrderLocal(data);
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: true,
		extracted: fallback,
		source: "local"
	};
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: 0,
				max_tokens: 700,
				response_format: { type: "json_object" },
				messages: [{
					role: "system",
					content: SYSTEM
				}, {
					role: "user",
					content: `${FEW_SHOT}\n\nNow extract:\nContact: ${data.contactName}\nChat:\n${data.messages}`
				}]
			})
		});
		if (!res.ok) return {
			ok: false,
			error: `AI unavailable (${res.status}). Used local parser.`,
			extracted: fallback,
			source: "local"
		};
		const raw = (await res.json()).choices[0]?.message.content ?? "";
		const parsed = JSON.parse(raw);
		if (!parsed || !Array.isArray(parsed.items)) return {
			ok: false,
			error: "AI returned an unexpected shape. Used local parser.",
			extracted: fallback,
			source: "local"
		};
		parsed.customerName = data.contactName;
		if (parsed.items.some((i) => !i.quantity || i.quantity <= 0)) {
			parsed.items = parsed.items.filter((i) => i.quantity > 0);
			parsed.warnings = [...parsed.warnings ?? [], "Dropped items with missing quantity."];
		}
		return {
			ok: true,
			extracted: parsed,
			source: "ai"
		};
	} catch {
		return {
			ok: false,
			error: "AI request failed. Used local parser.",
			extracted: fallback,
			source: "local"
		};
	}
});
//#endregion
export { extractOrder_createServerFn_handler };
