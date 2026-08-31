import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CircleAlert,
  FileText,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/app-shell";
import { VerifyOrderDialog } from "@/components/verify-order";
import { Button } from "@/components/ui/button";
import { formatCompactINR, formatINR, indianDate } from "@/lib/format";
import { isOverdue } from "@/lib/gst";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <AppShell>
      <DashboardPage />
      <VerifyOrderDialog />
    </AppShell>
  );
}

function DashboardPage() {
  const invoices = useStore((s) => s.invoices);
  const orders = useStore((s) => s.orders);
  const conversations = useStore((s) => s.conversations);
  const business = useStore((s) => s.business);

  const paid = invoices
    .filter((i) => i.status === "paid")
    .reduce((n, i) => n + i.total, 0);
  const pending = invoices
    .filter((i) => i.status !== "paid" && !isOverdue(i))
    .reduce((n, i) => n + i.total, 0);
  const overdue = invoices
    .filter((i) => isOverdue(i))
    .reduce((n, i) => n + i.total, 0);
  const volume = paid + pending + overdue;
  const leakage = volume === 0 ? 0 : ((pending + overdue) / volume) * 100;
  const unread = conversations.reduce((n, c) => n + c.unread, 0);

  const productMap = new Map<string, number>();
  for (const order of orders) {
    for (const item of order.items) {
      productMap.set(item.name, (productMap.get(item.name) ?? 0) + item.qty);
    }
  }
  const chart = [...productMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, qty]) => ({ name: name.replace(/ \(.+\)/, ""), qty }));

  const recent = [...invoices]
    .sort((a, b) => +new Date(b.issuedAt) - +new Date(a.issuedAt))
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.18em] text-muted uppercase">
            {business.city} desk
          </p>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl">
            Cash from chat
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            WhatsApp stays the front door. Chat2Cash structures the order,
            writes the GST invoice, and tracks who still owes you.
          </p>
        </div>
        <Button asChild>
          <Link to="/inbox">
            Open inbox
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Collected this month"
          value={formatCompactINR(paid)}
          hint="Marked paid"
        />
        <Stat
          label="To collect"
          value={formatCompactINR(pending + overdue)}
          hint={`${formatINR(overdue)} overdue`}
          warn={overdue > 0}
        />
        <Stat
          label="At-risk share"
          value={`${leakage.toFixed(0)}%`}
          hint="Unpaid of billed volume"
        />
        <Stat
          label="Unread chats"
          value={String(unread)}
          hint="Waiting in inbox"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        <section className="rounded-xl bg-surface p-5 shadow-border lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">What is moving</h2>
            <TrendingUp className="size-4 text-muted" />
          </div>
          <p className="mt-1 text-sm text-muted">
            Pieces billed from structured orders — not from memory.
          </p>
          <div className="mt-4 h-56">
            {chart.length === 0 ? (
              <p className="text-sm text-muted">No billed items yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart} barSize={28}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--color-surface-2)" }}
                    contentStyle={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar
                    dataKey="qty"
                    fill="var(--color-primary)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <section className="rounded-xl bg-surface p-5 shadow-border lg:col-span-2">
          <h2 className="font-display text-xl">Do this next</h2>
          <ul className="mt-4 space-y-3">
            <NextItem
              to="/inbox"
              icon={MessageSquare}
              title={`${unread} chats need a look`}
              body="Extract the Hinglish order, verify, invoice."
            />
            <NextItem
              to="/follow-ups"
              icon={CircleAlert}
              title={`${invoices.filter((i) => isOverdue(i)).length} overdue invoices`}
              body="Send a reminder in the tone that fits the delay."
            />
            <NextItem
              to="/invoices"
              icon={FileText}
              title="GST invoices"
              body="Print or copy the UPI link in under 30 seconds."
            />
          </ul>
        </section>
      </div>

      <section className="mt-6 rounded-xl bg-surface p-5 shadow-border">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl">Recent invoices</h2>
          <Link to="/invoices" className="text-sm text-primary hover:underline">
            All invoices
          </Link>
        </div>
        <div className="mt-3 divide-y divide-border">
          {recent.map((inv) => (
            <Link
              key={inv.id}
              to="/invoice/$invoiceId"
              params={{ invoiceId: inv.id }}
              className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"
            >
              <div>
                <p className="font-medium">{inv.customerName}</p>
                <p className="text-xs text-muted">
                  {inv.number} · {indianDate(inv.issuedAt)}
                </p>
              </div>
              <div className="text-right">
                <p className="tabular-nums">{formatINR(inv.total)}</p>
                <p className="text-xs text-muted">
                  {inv.status === "paid"
                    ? "Paid"
                    : isOverdue(inv)
                      ? "Overdue"
                      : "Unpaid"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  warn,
}: {
  label: string;
  value: string;
  hint: string;
  warn?: boolean;
}) {
  return (
    <div className="rounded-xl bg-surface p-4 shadow-border">
      <p className="text-xs tracking-wide text-muted uppercase">{label}</p>
      <p
        className={`mt-2 font-display text-3xl tabular-nums ${warn ? "text-warn" : "text-fg"}`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}

function NextItem({
  to,
  icon: Icon,
  title,
  body,
}: {
  to: "/inbox" | "/follow-ups" | "/invoices";
  icon: typeof MessageSquare;
  title: string;
  body: string;
}) {
  return (
    <li>
      <Link
        to={to}
        className="flex gap-3 rounded-lg p-2 transition-colors duration-150 hover:bg-surface-2"
      >
        <span className="flex size-9 items-center justify-center rounded-md bg-primary-soft text-primary">
          <Icon className="size-4" />
        </span>
        <span>
          <span className="block text-sm font-medium">{title}</span>
          <span className="text-xs text-muted">{body}</span>
        </span>
      </Link>
    </li>
  );
}
