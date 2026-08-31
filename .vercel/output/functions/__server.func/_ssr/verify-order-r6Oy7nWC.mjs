import { i as __toESM } from "../_runtime.mjs";
import { t as CATALOG } from "./parse-order-C9NL1AV1.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as useRouterState, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as Settings, d as MessageSquare, f as IndianRupee, i as TriangleAlert, m as FileText, o as Trash2, p as House, r as Users, s as ShoppingBag, u as Plus, v as Bell } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as taxableTotal, d as formatINR, f as formatQty, o as isOverdue, r as useStore, u as formatCompactINR } from "./router-CMvxgqwk.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-DPE4opzC.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-CR7wZ4oi.mjs";
import { t as Input } from "./input-DPtsyRFe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-order-r6Oy7nWC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-8", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 11.5c0-1.4 1.1-2.5 2.5-2.5h8c1.4 0 2.5 1.1 2.5 2.5v6.2c0 1.4-1.1 2.5-2.5 2.5h-3.1L11 23.2v-3h-.5C9.1 20.2 8 19.1 8 17.7z",
				fill: "var(--color-bg)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "23.2",
				cy: "22.6",
				r: "4.2",
				fill: "var(--color-bg)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M23.2 20.4v4.4M21.4 22.2h3.6",
				stroke: "currentColor",
				strokeWidth: "1.4",
				strokeLinecap: "round"
			})
		]
	});
}
var NAV = [
	{
		to: "/",
		label: "Desk",
		icon: House
	},
	{
		to: "/inbox",
		label: "Inbox",
		icon: MessageSquare
	},
	{
		to: "/orders",
		label: "Orders",
		icon: ShoppingBag
	},
	{
		to: "/invoices",
		label: "Invoices",
		icon: FileText
	},
	{
		to: "/payments",
		label: "Payments",
		icon: IndianRupee
	},
	{
		to: "/follow-ups",
		label: "Follow-ups",
		icon: Bell
	},
	{
		to: "/customers",
		label: "Customers",
		icon: Users
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const business = useStore((s) => s.business);
	const invoices = useStore((s) => s.invoices);
	const conversations = useStore((s) => s.conversations);
	const [more, setMore] = (0, import_react.useState)(false);
	const unread = conversations.reduce((n, c) => n + c.unread, 0);
	const toCollect = invoices.filter((i) => i.status !== "paid").reduce((n, i) => n + i.total, 0);
	const followCount = invoices.filter((i) => isOverdue(i)).length;
	const badgeFor = (to) => {
		if (to === "/inbox") return unread;
		if (to === "/follow-ups") return followCount;
		return 0;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky top-0 hidden h-dvh w-60 shrink-0 flex-col overflow-hidden bg-sidebar text-sidebar-fg md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 px-4 pt-5 pb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-8 text-sidebar-fg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg leading-none tracking-tight",
								children: "Chat2Cash"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 truncate text-xs text-sidebar-muted",
								children: business.name
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-2",
						children: NAV.map((item) => {
							const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
							const count = badgeFor(item.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-11 items-center gap-2.5 rounded-md px-3 text-sm font-medium transition-colors duration-150", active ? "bg-white/10 text-sidebar-fg" : "text-sidebar-muted hover:bg-white/10 hover:text-sidebar-fg"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										children: item.label
									}),
									count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-5 rounded-full bg-primary-fg/15 px-1.5 text-center text-[11px] tabular-nums",
										children: count
									}) : null
								]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/settings",
						className: cn("mx-2 flex h-11 shrink-0 items-center gap-2.5 rounded-md px-3 text-sm", pathname === "/settings" ? "bg-white/10 text-sidebar-fg" : "text-sidebar-muted hover:text-sidebar-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" }), "Settings"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-3 mb-3 mt-1 shrink-0 rounded-lg bg-white/10 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-wide text-sidebar-muted uppercase",
							children: "To collect"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-xl tabular-nums",
							children: formatCompactINR(toCollect)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex h-14 items-center gap-3 border-b border-border bg-surface px-4 md:hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-7 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-base leading-none",
								children: "Chat2Cash"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-[11px] text-muted",
								children: business.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/settings",
								"aria-label": "Settings",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" })
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 pb-20 md:pb-0",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 flex h-16 border-t border-border bg-surface md:hidden",
				children: [NAV.slice(0, 4).map((item) => {
					const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
					const count = badgeFor(item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px]", active ? "text-primary" : "text-muted"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" }),
							item.label,
							count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1.5 right-1/2 size-1.5 translate-x-3 rounded-full bg-danger" }) : null
						]
					}, item.to);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMore(true),
					className: cn("flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px]", more || [
						"/payments",
						"/follow-ups",
						"/customers",
						"/settings"
					].some((p) => pathname.startsWith(p)) ? "text-primary" : "text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" }), "More"]
				})]
			}),
			more ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "fixed inset-0 z-50 bg-fg/40 md:hidden",
				"aria-label": "Close menu",
				onClick: () => setMore(false)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("fixed inset-x-0 bottom-16 z-50 rounded-t-xl bg-surface p-4 shadow-border transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden", more ? "translate-y-0" : "pointer-events-none translate-y-full"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs font-medium text-muted",
					children: "More"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						{
							to: "/payments",
							label: "Payments",
							icon: IndianRupee
						},
						{
							to: "/follow-ups",
							label: "Follow-ups",
							icon: Bell
						},
						{
							to: "/customers",
							label: "Customers",
							icon: Users
						},
						{
							to: "/settings",
							label: "Settings",
							icon: Settings
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						onClick: () => setMore(false),
						className: "flex min-h-16 flex-col items-center justify-center gap-1 rounded-lg bg-surface-2 text-xs text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
					}, item.to))
				})]
			})
		]
	});
}
function VerifyOrderDialog() {
	const draft = useStore((s) => s.draft);
	const clearDraft = useStore((s) => s.clearDraft);
	const updateDraftItems = useStore((s) => s.updateDraftItems);
	const updateDraftNotes = useStore((s) => s.updateDraftNotes);
	const confirmDraft = useStore((s) => s.confirmDraft);
	const invoiceOrder = useStore((s) => s.invoiceOrder);
	const navigate = useNavigate();
	if (!draft) return null;
	const items = draft.items;
	const subtotal = taxableTotal(items);
	const inquiry = !draft.extracted.isConfirmedOrder;
	function setItem(index, patch) {
		updateDraftItems(items.map((item, i) => i === index ? {
			...item,
			...patch
		} : item));
	}
	function addItem() {
		const p = CATALOG[0];
		updateDraftItems([...items, {
			productId: p.id,
			name: p.name,
			qty: 1,
			rate: p.price,
			hsn: p.hsn,
			color: p.color
		}]);
	}
	function onProduct(index, productId) {
		const p = CATALOG.find((x) => x.id === productId);
		if (!p) return;
		setItem(index, {
			productId: p.id,
			name: p.name,
			rate: p.price,
			hsn: p.hsn,
			color: p.color
		});
	}
	function confirm(andInvoice) {
		const id = confirmDraft();
		if (!id) {
			toast.error("Add at least one item before confirming.");
			return;
		}
		toast.success("Order confirmed");
		if (andInvoice) {
			const invId = invoiceOrder(id);
			if (invId) {
				toast.success("GST invoice ready");
				navigate({
					to: "/invoice/$invoiceId",
					params: { invoiceId: invId }
				});
				return;
			}
		}
		navigate({ to: "/orders" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: (o) => !o && clearDraft(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90dvh] max-w-2xl overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Verify order" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
					"Human check before anything is invoiced. Confidence",
					" ",
					Math.round(draft.extracted.confidence * 100),
					"% ·",
					" ",
					draft.source === "ai" ? "Grok extraction" : "Local parser"
				] })] }),
				inquiry ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 rounded-md bg-warn-soft px-3 py-2 text-sm text-warn",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0" }), "This looks like an inquiry, not a confirmed order. You can still convert it if the customer meant to buy."]
				}) : null,
				draft.extracted.warnings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "list-disc space-y-1 pl-5 text-xs text-muted",
					children: draft.extracted.warnings.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: w }, w))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-lg border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[520px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-surface-2 text-left text-xs text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Item"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Qty"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Rate"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "w-10" })
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: "h-10 w-full rounded-sm border border-border bg-surface px-2 text-sm",
										value: item.productId,
										onChange: (e) => onProduct(i, e.target.value),
										children: CATALOG.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: p.id,
											children: p.name
										}, p.id))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: 1,
										className: "h-10 w-20",
										value: item.qty,
										onChange: (e) => setItem(i, { qty: Math.max(1, Number(e.target.value) || 1) })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: 0,
										className: "h-10 w-24",
										value: item.rate,
										onChange: (e) => setItem(i, { rate: Math.max(0, Number(e.target.value) || 0) })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 tabular-nums",
									children: formatINR(item.qty * item.rate)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon-sm",
										"aria-label": "Remove item",
										onClick: () => updateDraftItems(items.filter((_, j) => j !== i)),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})
								})
							]
						}, `${item.productId}-${i}`)) })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "w-fit",
					onClick: addItem,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add item"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-medium text-muted",
							htmlFor: "del",
							children: "Delivery"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "del",
							value: draft.deliveryNote,
							onChange: (e) => updateDraftNotes({ deliveryNote: e.target.value }),
							placeholder: "kal tak, bus parcel…"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-medium text-muted",
							htmlFor: "pay",
							children: "Payment note"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "pay",
							value: draft.paymentNote,
							onChange: (e) => updateDraftNotes({ paymentNote: e.target.value }),
							placeholder: "UPI, COD, later…"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Taxable",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg tabular-nums",
								children: formatINR(subtotal)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-2",
								children: "·"
							}),
							formatQty(items.reduce((n, i) => n + i.qty, 0)),
							" pcs"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => confirm(false),
							children: "Confirm order"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => confirm(true),
							children: "Confirm + GST invoice"
						})]
					})]
				})
			]
		})
	});
}
//#endregion
export { VerifyOrderDialog as n, AppShell as t };
