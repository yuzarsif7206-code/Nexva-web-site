import { FunnelClient } from "@/components/funnel/FunnelClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Teklif Al",
  description:
    "60 saniyelik formu doldurun, Nexva Digital 24 saat içinde size dönüş yapsın. Paket, tek seferlik proje veya size özel kapsam.",
  path: "/teklif-al",
});

export default function QuotePage() {
  return (
    <>
      <h1 className="sr-only">Teklif Al</h1>
      <FunnelClient />
    </>
  );
}
