import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as TrendingUp, d as MessageSquare, g as CircleAlert, m as FileText, y as ArrowRight } from "../_libs/lucide-react.mjs";
import { d as formatINR, o as isOverdue, p as indianDate, r as useStore, u as formatCompactINR } from "./router-CMvxgqwk.mjs";
import { t as Button } from "./button-DPE4opzC.mjs";
import { n as VerifyOrderDialog, t as AppShell } from "./verify-order-r6Oy7nWC.mjs";
import { a as ResponsiveContainer, i as Bar, n as YAxis, o as Tooltip, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bi6XcWV1.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifyOrderDialog, {})] });
}
function DashboardPage() {
	const invoices = useStore((s) => s.invoices);
	const orders = useStore((s) => s.orders);
	const conversations = useStore((s) => s.conversations);
	const business = useStore((s) => s.business);
	const paid = invoices.filter((i) => i.status === "paid").reduce((n, i) => n + i.total, 0);
	const pending = invoices.filter((i) => i.status !== "paid" && !isOverdue(i)).reduce((n, i) => n + i.total, 0);
	const overdue = invoices.filter((i) => isOverdue(i)).reduce((n, i) => n + i.total, 0);
	const volume = paid + pending + overdue;
	const leakage = volume === 0 ? 0 : (pending + overdue) / volume * 100;
	const unread = conversations.reduce((n, c) => n + c.unread, 0);
	const productMap = /* @__PURE__ */ new Map();
	for (const order of orders) for (const item of order.items) productMap.set(item.name, (productMap.get(item.name) ?? 0) + item.qty);
	const chart = [...productMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, qty]) => ({
		name: name.replace(/ \(.+\)/, ""),
		qty
	}));
	const recent = [...invoices].sort((a, b) => +new Date(b.issuedAt) - +new Date(a.issuedAt)).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs tracking-[0.18em] text-muted uppercase",
						children: [business.city, " desk"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-3xl sm:text-4xl",
						children: "Cash from chat"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm text-muted",
						children: "WhatsApp stays the front door. Chat2Cash structures the order, writes the GST invoice, and tracks who still owes you."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/inbox",
						children: ["Open inbox", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Collected this month",
						value: formatCompactINR(paid),
						hint: "Marked paid"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "To collect",
						value: formatCompactINR(pending + overdue),
						hint: `${formatINR(overdue)} overdue`,
						warn: overdue > 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "At-risk share",
						value: `${leakage.toFixed(0)}%`,
						hint: "Unpaid of billed volume"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Unread chats",
						value: String(unread),
						hint: "Waiting in inbox"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl bg-surface p-5 shadow-border lg:col-span-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl",
								children: "What is moving"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4 text-muted" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Pieces billed from structured orders — not from memory."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-56",
							children: chart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "No billed items yet."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: chart,
									barSize: 28,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "name",
											tick: {
												fill: "var(--color-muted)",
												fontSize: 11
											},
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											tick: {
												fill: "var(--color-muted)",
												fontSize: 11
											},
											axisLine: false,
											tickLine: false,
											allowDecimals: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											cursor: { fill: "var(--color-surface-2)" },
											contentStyle: {
												background: "var(--color-surface)",
												border: "1px solid var(--color-border)",
												borderRadius: 8,
												fontSize: 12
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "qty",
											fill: "var(--color-primary)",
											radius: [
												6,
												6,
												0,
												0
											]
										})
									]
								})
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl bg-surface p-5 shadow-border lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Do this next"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextItem, {
								to: "/inbox",
								icon: MessageSquare,
								title: `${unread} chats need a look`,
								body: "Extract the Hinglish order, verify, invoice."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextItem, {
								to: "/follow-ups",
								icon: CircleAlert,
								title: `${invoices.filter((i) => isOverdue(i)).length} overdue invoices`,
								body: "Send a reminder in the tone that fits the delay."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextItem, {
								to: "/invoices",
								icon: FileText,
								title: "GST invoices",
								body: "Print or copy the UPI link in under 30 seconds."
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 rounded-xl bg-surface p-5 shadow-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Recent invoices"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/invoices",
						className: "text-sm text-primary hover:underline",
						children: "All invoices"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 divide-y divide-border",
					children: recent.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/invoice/$invoiceId",
						params: { invoiceId: inv.id },
						className: "flex flex-wrap items-center justify-between gap-2 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: inv.customerName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								inv.number,
								" · ",
								indianDate(inv.issuedAt)
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tabular-nums",
								children: formatINR(inv.total)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: inv.status === "paid" ? "Paid" : isOverdue(inv) ? "Overdue" : "Unpaid"
							})]
						})]
					}, inv.id))
				})]
			})
		]
	});
}
function Stat({ label, value, hint, warn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-4 shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-wide text-muted uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `mt-2 font-display text-3xl tabular-nums ${warn ? "text-warn" : "text-fg"}`,
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: hint
			})
		]
	});
}
function NextItem({ to, icon: Icon, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "flex gap-3 rounded-lg p-2 transition-colors duration-150 hover:bg-surface-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-9 items-center justify-center rounded-md bg-primary-soft text-primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-sm font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted",
			children: body
		})] })]
	}) });
}
//#endregion
export { Home as component };
