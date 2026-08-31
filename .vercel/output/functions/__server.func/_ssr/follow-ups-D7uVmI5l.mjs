import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as reminderTone, d as formatINR, i as reminderCopy, m as indianDateTime, o as isOverdue, p as indianDate, r as useStore } from "./router-CMvxgqwk.mjs";
import { t as Button } from "./button-DPE4opzC.mjs";
import { t as Badge } from "./badge-M2VtbNZ8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/follow-ups-D7uVmI5l.js
var import_jsx_runtime = require_jsx_runtime();
function FollowUpsPage() {
	const invoices = useStore((s) => s.invoices);
	const reminders = useStore((s) => s.reminders);
	const business = useStore((s) => s.business);
	const sendReminder = useStore((s) => s.sendReminder);
	const open = invoices.filter((i) => i.status !== "paid");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Follow-ups"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-sm text-muted",
				children: "Tone steps from gentle to firm as the invoice ages. The message is copied into the WhatsApp thread — you still hit send on the phone."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-4",
				children: open.map((inv) => {
					const tone = reminderTone(inv);
					const preview = reminderCopy(inv, business, tone);
					const history = reminders.filter((r) => r.invoiceId === inv.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-surface p-4 shadow-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: inv.customerName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										inv.number,
										" · ",
										formatINR(inv.total),
										" · due",
										" ",
										indianDate(inv.dueAt)
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: tone === "escalate" ? "danger" : tone === "firm" ? "warn" : "default",
										children: tone
									}), isOverdue(inv) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "danger",
										children: "Overdue"
									}) : null]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 rounded-md bg-bg px-3 py-2 text-sm",
								children: preview
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										history.length,
										" reminder",
										history.length === 1 ? "" : "s",
										" sent"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => {
										if (sendReminder(inv.id)) toast.success("Reminder dropped into the chat");
									},
									children: "Send reminder"
								})]
							}),
							history.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-1 border-t border-border pt-3 text-xs text-muted",
								children: history.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									indianDateTime(r.sentAt),
									" · ",
									r.tone
								] }, r.id))
							}) : null
						]
					}, inv.id);
				})
			})
		]
	});
}
//#endregion
export { FollowUpsPage as component };
