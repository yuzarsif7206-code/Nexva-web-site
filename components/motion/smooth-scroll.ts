/** Lenis: yalnızca masaüstü + ince imleç. Dinamik import ile ayrı chunk. */
export async function initSmoothScroll(): Promise<() => void> {
  const { default: Lenis } = await import("lenis");
  const lenis = new Lenis({
    lerp: 0.1,
    autoRaf: true,
    anchors: { offset: -132 },
    allowNestedScroll: true,
  });
  return () => lenis.destroy();
}
