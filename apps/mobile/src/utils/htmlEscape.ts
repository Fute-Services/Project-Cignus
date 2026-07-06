// Escapes a value for safe use inside an HTML attribute (e.g. src="...").
// Used when interpolating file paths/URIs into inline WebView HTML strings —
// today these values are always trusted local paths, but escaping avoids a
// fragile "safe only because nothing untrusted is ever passed" assumption.
export function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
