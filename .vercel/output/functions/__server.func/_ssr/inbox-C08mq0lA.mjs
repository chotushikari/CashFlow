import { i as __toESM } from "../_runtime.mjs";
import { r as parseOrderLocal } from "./parse-order-C9NL1AV1.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as ArrowLeft, d as MessageSquare, n as WandSparkles } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { m as indianDateTime, r as useStore } from "./router-CMvxgqwk.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-DPE4opzC.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-CR7wZ4oi.mjs";
import { n as Textarea, t as Input } from "./input-DPtsyRFe.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inbox-C08mq0lA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var extractOrder = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("97870cd8feb2325c20a349a66511102640cb74e32cad308fe380646f1b0509f6"));
function InboxPage() {
	const conversations = useStore((s) => s.conversations);
	const markRead = useStore((s) => s.markRead);
	const openDraft = useStore((s) => s.openDraft);
	const addPastedChat = useStore((s) => s.addPastedChat);
	const [activeId, setActiveId] = (0, import_react.useState)(conversations[0]?.id ?? null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [pasteOpen, setPasteOpen] = (0, import_react.useState)(false);
	const [paste, setPaste] = (0, import_react.useState)({
		name: "",
		city: "",
		phone: "",
		text: ""
	});
	const sorted = (0, import_react.useMemo)(() => [...conversations].sort((a, b) => +new Date(b.lastAt) - +new Date(a.lastAt)), [conversations]);
	const active = sorted.find((c) => c.id === activeId) ?? null;
	async function extract(conversationId) {
		const convo = conversations.find((c) => c.id === conversationId);
		if (!convo) return;
		setBusy(true);
		const messages = convo.messages.map((m) => `${m.from}: ${m.text}`).join("\n");
		try {
			const result = await extractOrder({ data: {
				messages,
				contactName: convo.name
			} });
			openDraft(conversationId, result.extracted, result.source);
			if (!result.ok) toast.message(result.error);
			else if (result.source === "local") toast.message("Structured with the on-device parser.");
			else toast.success("Order pulled from the chat.");
		} catch {
			const extracted = parseOrderLocal({
				messages: convo.messages.map((m) => m.text).join("\n"),
				contactName: convo.name
			});
			openDraft(conversationId, extracted, "local");
			toast.message("Used the on-device parser.");
		} finally {
			setBusy(false);
		}
	}
	function openChat(id) {
		setActiveId(id);
		markRead(id);
	}
	function submitPaste() {
		if (!paste.name.trim() || !paste.text.trim()) {
			toast.error("Name and chat text are required.");
			return;
		}
		const id = addPastedChat({
			name: paste.name.trim(),
			city: paste.city.trim() || "—",
			phone: paste.phone.trim() || "—",
			text: paste.text.trim()
		});
		setPasteOpen(false);
		setPaste({
			name: "",
			city: "",
			phone: "",
			text: ""
		});
		openChat(id);
		toast.success("Chat added to inbox.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-[calc(100dvh-3.5rem)] md:h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: cn("w-full shrink-0 border-r border-border bg-surface md:w-80", active ? "hidden md:flex md:flex-col" : "flex flex-col"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl",
						children: "Inbox"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "WhatsApp stays here. We listen."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => setPasteOpen(true),
						children: "Paste chat"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex-1 overflow-y-auto",
					children: sorted.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => openChat(c.id),
						className: cn("flex w-full gap-3 border-b border-border px-4 py-3 text-left transition-colors duration-150", c.id === activeId ? "bg-primary-soft" : "hover:bg-bg"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-sidebar text-sm text-sidebar-fg",
								children: initials(c.name)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate text-sm font-medium",
										children: c.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-subtle",
										children: indianDateTime(c.lastAt)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-0.5 block truncate text-xs text-muted",
									children: [
										c.city,
										" · ",
										c.lastMessage
									]
								})]
							}),
							c.unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-2 shrink-0 rounded-full bg-primary" }) : null
						]
					}) }, c.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: cn("min-w-0 flex-1 flex-col", active ? "flex" : "hidden md:flex"),
				children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-3 border-b border-border bg-surface px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							className: "md:hidden",
							onClick: () => setActiveId(null),
							"aria-label": "Back to chats",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-9 items-center justify-center rounded-full bg-sidebar text-xs text-sidebar-fg",
							children: initials(active.name)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: active.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted",
								children: [
									active.city,
									" · ",
									active.phone
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							disabled: busy,
							onClick: () => void extract(active.id),
							children: busy ? "Reading chat…" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "size-4" }), "Extract order"] })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "chat-paper flex-1 space-y-2 overflow-y-auto px-3 py-4 sm:px-8",
					children: active.messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("max-w-[85%] rounded-lg px-3 py-2 text-sm shadow-border", m.from === "business" ? "ml-auto rounded-br-xs bg-chat-out" : "rounded-bl-xs bg-chat-in"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-wrap",
							children: m.text
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-right text-[10px] text-subtle",
							children: indianDateTime(m.at)
						})]
					}, m.id))
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col items-center justify-center gap-2 text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: "Pick a chat to extract an order."
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: pasteOpen,
				onOpenChange: setPasteOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Paste a WhatsApp chat" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "No WhatsApp API needed. Drop the messy Hinglish here and extract." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Customer name",
							value: paste.name,
							onChange: (v) => setPaste({
								...paste,
								name: v
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "City",
								value: paste.city,
								onChange: (v) => setPaste({
									...paste,
									city: v
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Phone",
								value: paste.phone,
								onChange: (v) => setPaste({
									...paste,
									phone: v
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium text-muted",
								children: "Chat text"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 6,
								placeholder: "Bhaiya 5 red scarf aur 2 blue dupatta bhej dena kal tak",
								value: paste.text,
								onChange: (e) => setPaste({
									...paste,
									text: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: submitPaste,
							children: "Add to inbox"
						})
					]
				})] })
			})
		]
	});
}
function Field({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "text-xs font-medium text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
function initials(name) {
	return name.split(/\s+/).slice(0, 2).map((p) => p[0] ?? "").join("").toUpperCase();
}
//#endregion
export { InboxPage as component };
