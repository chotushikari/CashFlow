# VYRA

**The AI revenue agent for WhatsApp-first businesses.**

VYRA turns messy Hindi, Hinglish, and English customer messages into structured orders, GST invoice drafts, payment state, and safe follow-up actions. The demo is entirely deterministic and uses simulated WhatsApp delivery—no WhatsApp, UPI, bank, Aadhaar, OTP, or other credentials are required.

## Two-minute demo

1. Open **Inbox** and select Rahul Traders.
2. Extract the message: “Bhaiya 5 red scarf aur 2 blue dupatta bhej dena kal tak.”
3. Review the visible agent trace, then confirm the structured order and invoice draft.
4. Open **Recovery** and select **Find stuck revenue**.
5. Inspect the priority, contextual reminder, sandbox result, and auditable action trace.
6. Select Sharma Textiles in Inbox to see an inquiry safely held for human confirmation instead of invoiced.

## Product guarantees in demo mode

- Deterministic seeded business data and catalog
- Explicit intent classification and structured extraction
- Policy-controlled order/invoice/follow-up workflow
- Sandboxed simulated message delivery only
- Human-review boundary for inquiries and ambiguous messages
- Compact audit events; no chain-of-thought is displayed

## Development

```bash
npm ci
npm run dev
npm run typecheck
npm run build
```

The app is configured to listen on port 8080 in the target environment. It persists only browser demo state; use **Settings → Reset demo** to restore the seed data.
