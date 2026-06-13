/**
 * Normalize embed site URL to host key (matches Python norm_host in build-legitimate-embed-sites-expanded.py).
 * @param {string} url
 * @returns {string}
 */
export function normalizeHost(url) {
  let u = String(url || "").trim();
  if (!u) return "";
  if (!/^https?:\/\//i.test(u)) {
    u = "http://" + u;
  }
  try {
    let host = new URL(u).hostname.toLowerCase();
    if (host.startsWith("www.")) {
      host = host.slice(4);
    }
    return host;
  } catch (e) {
    return "";
  }
}
