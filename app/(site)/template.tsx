/** Sayfa geçişi: yalnızca 150 ms opacity. Ağır perde geçişi yok (mobil hız önceliği). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
