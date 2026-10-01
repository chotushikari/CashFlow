import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as formatINR, o as isOverdue, p as indianDate, r as useStore } from "./router-CMvxgqwk.mjs";
import { t as Badge } from "./badge-M2VtbNZ8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/invoices-ByA1noji.js
var import_jsx_runtime = require_jsx_runtime();
function InvoicesPage() {
	const invoices = useStore((s) => s.invoices);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Invoices"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "CGST/SGST split automatically. UPI link rides along."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-3",
				children: invoices.map((inv) => {
					const overdue = isOverdue(inv);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/invoice/$invoiceId",
						params: { invoiceId: inv.id },
						className: "flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface p-4 shadow-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-muted",
								children: inv.number
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: inv.customerName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									indianDate(inv.issuedAt),
									" · ",
									inv.placeOfSupply
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl tabular-nums",
								children: formatINR(inv.total)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: inv.status === "paid" ? "paid" : overdue ? "danger" : "warn",
								children: inv.status === "paid" ? "Paid" : overdue ? "Overdue" : "Unpaid"
							})]
						})]
					}) }, inv.id);
				})
			})
		]
	});
}
//#endregion
export { InvoicesPage as component };
