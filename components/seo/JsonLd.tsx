/** JSON-LD: < karakteri kaçışlanır (script enjeksiyonu önlemi). Fiyat alanı eklenmez. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
