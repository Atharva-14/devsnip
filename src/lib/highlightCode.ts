import { codeToHtml } from "shiki";

export async function highlightCode(code: string, language: string) {
  try {
    return await codeToHtml(code, {
      lang: language,
      theme: "vesper",
    });
  } catch (err) {
    console.error("Shiki error:", err);
    return `<pre><code>${code}</code></pre>`;
  }
}
