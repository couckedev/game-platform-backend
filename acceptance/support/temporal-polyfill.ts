import { Temporal } from "@js-temporal/polyfill";

// Polyfill Temporal globally until Node ships it natively.
// Remove this file once your Node version supports Temporal out of the box.
if (typeof globalThis.Temporal === "undefined") {
  (globalThis as Record<string, unknown>)["Temporal"] = Temporal;
}
