import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="icerik" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <MobileBottomBar />
      <WhatsAppFab />
    </>
  );
}
