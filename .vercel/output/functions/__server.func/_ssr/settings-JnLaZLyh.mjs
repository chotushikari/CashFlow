import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useStore } from "./router-CMvxgqwk.mjs";
import { t as Button } from "./button-DPE4opzC.mjs";
import { t as Input } from "./input-DPtsyRFe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-JnLaZLyh.js
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const business = useStore((s) => s.business);
	const setBusiness = useStore((s) => s.setBusiness);
	const resetDemo = useStore((s) => s.resetDemo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Everything here lives on this device. No WhatsApp Business API, no CRM seat, no monthly fee."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 space-y-4 rounded-xl bg-surface p-5 shadow-border",
				onSubmit: (e) => {
					e.preventDefault();
					toast.success("Saved");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Business name",
						value: business.name,
						onChange: (v) => setBusiness({ name: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "GSTIN",
						value: business.gstin,
						onChange: (v) => setBusiness({ gstin: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Address",
						value: business.address,
						onChange: (v) => setBusiness({ address: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "City",
							value: business.city,
							onChange: (v) => setBusiness({ city: v })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "State",
							value: business.state,
							onChange: (v) => setBusiness({ state: v })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "UPI ID",
						value: business.upi,
						onChange: (v) => setBusiness({ upi: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Phone",
						value: business.phone,
						onChange: (v) => setBusiness({ phone: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "GST %",
							type: "number",
							value: String(business.gstRate),
							onChange: (v) => setBusiness({ gstRate: Number(v) || 0 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Invoice prefix",
							value: business.invoicePrefix,
							onChange: (v) => setBusiness({ invoicePrefix: v })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Save"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-xl bg-surface p-5 shadow-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg",
						children: "Demo data"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Restore Mehta Textiles sample chats, orders, and invoices."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						variant: "outline",
						onClick: () => {
							resetDemo();
							toast.success("Demo restored");
						},
						children: "Reset demo"
					})
				]
			})
		]
	});
}
function Field({ label, value, onChange, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "text-xs font-medium text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type,
			value,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
//#endregion
export { SettingsPage as component };
