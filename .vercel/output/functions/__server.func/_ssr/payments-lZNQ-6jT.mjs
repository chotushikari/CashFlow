import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as formatINR, l as daysBetween, o as isOverdue, p as indianDate, r as useStore } from "./router-CMvxgqwk.mjs";
import { t as Button } from "./button-DPE4opzC.mjs";
import { t as Badge } from "./badge-M2VtbNZ8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payments-lZNQ-6jT.js
var import_jsx_runtime = require_jsx_runtime();
function PaymentsPage() {
	const invoices = useStore((s) => s.invoices);
	const markInvoicePaid = useStore((s) => s.markInvoicePaid);
	const unpaid = invoices.filter((i) => i.status !== "paid");
	const paid = invoices.filter((i) => i.status === "paid");
	const buckets = [
		{
			label: "Not due",
			items: unpaid.filter((i) => !isOverdue(i))
		},
		{
			label: "1–7 days late",
			items: unpaid.filter((i) => isOverdue(i) && daysBetween(i.dueAt) <= 7)
		},
		{
			label: "8–15 days",
			items: unpaid.filter((i) => {
				const d = daysBetween(i.dueAt);
				return d >= 8 && d <= 15;
			})
		},
		{
			label: "16+ days",
			items: unpaid.filter((i) => daysBetween(i.dueAt) >= 16)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Payments"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Pending versus paid, without a spreadsheet at midnight."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-4",
				children: buckets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-surface p-4 shadow-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: b.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-2xl tabular-nums",
							children: formatINR(b.items.reduce((n, i) => n + i.total, 0))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [b.items.length, " invoices"]
						})
					]
				}, b.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 font-display text-xl",
				children: "Open"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: unpaid.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface p-4 shadow-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: inv.customerName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							inv.number,
							" · due ",
							indianDate(inv.dueAt)
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tabular-nums",
								children: formatINR(inv.total)
							}),
							isOverdue(inv) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "danger",
								children: "Overdue"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => {
									markInvoicePaid(inv.id);
									toast.success("Marked paid");
								},
								children: "Mark paid"
							})
						]
					})]
				}, inv.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 font-display text-xl",
				children: "Collected"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: paid.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface p-4 shadow-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: inv.customerName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							inv.number,
							" · paid ",
							inv.paidAt ? indianDate(inv.paidAt) : "—"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tabular-nums",
						children: formatINR(inv.total)
					})]
				}, inv.id))
			})
		]
	});
}
//#endregion
export { PaymentsPage as component };
