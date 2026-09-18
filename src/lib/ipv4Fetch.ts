import { Agent, setGlobalDispatcher } from "undici";

// The backend host (api.ichhepuran.com) advertises an AAAA (IPv6) record
// that isn't actually reachable. Node's fetch tries it first and hangs
// until Vercel's build times out ("fetch failed" / ETIMEDOUT), even
// though the IPv4 address works fine. dns.setDefaultResultOrder doesn't
// reach undici's own connector inside Next's data-collection worker, so
// force IPv4 directly on undici's global dispatcher instead.
//
// Imported only from the root layout (a server component every route's
// build renders through) — never from src/lib/api.ts itself, since that
// file is also imported by client form components, and bundling
// "node:undici" into a browser chunk fails outright.
setGlobalDispatcher(new Agent({ connect: { family: 4 } }));
