import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as formatINR, f as formatQty, r as useStore } from "./router-CMvxgqwk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-DQrKzJFb.js
var import_jsx_runtime = require_jsx_runtime();
function CustomersPage() {
	const conversations = useStore((s) => s.conversations);
	const orders = useStore((s) => s.orders);
	const invoices = useStore((s) => s.invoices);
	const rows = conversations.map((c) => {
		const theirs = orders.filter((o) => o.conversationId === c.id);
		const billed = invoices.filter((i) => i.conversationId === c.id).reduce((n, i) => n + i.total, 0);
		const outstanding = invoices.filter((i) => i.conversationId === c.id && i.status !== "paid").reduce((n, i) => n + i.total, 0);
		const pcs = theirs.reduce((n, o) => n + o.items.reduce((m, i) => m + i.qty, 0), 0);
		return {
			c,
			orders: theirs.length,
			billed,
			outstanding,
			pcs
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Customers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Built from the same chats — no separate CRM to fill in."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 overflow-x-auto rounded-xl bg-surface shadow-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-left text-xs text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "City"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Orders"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Pieces"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Billed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Outstanding"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: r.c.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: r.c.phone
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted",
								children: r.c.city
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular-nums",
								children: r.orders
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular-nums",
								children: formatQty(r.pcs)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular-nums",
								children: formatINR(r.billed)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular-nums",
								children: formatINR(r.outstanding)
							})
						]
					}, r.c.id)) })]
				})
			})
		]
	});
}
//#endregion
export { CustomersPage as component };
