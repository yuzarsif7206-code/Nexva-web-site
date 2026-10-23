/**
 * Özel imleç: 8 px kırmızı nokta + 36 px ark halka. Yerel imleç kalır (erişilebilirlik).
 * Linklerde halka büyür, [data-cursor="view"] üzerinde "İNCELE" yazar.
 */
export function initCursor(): () => void {
  const dot = document.createElement("div");
  dot.className = "cursor-dot cursor-hidden";
  const ring = document.createElement("div");
  ring.className = "cursor-ring cursor-hidden";
  ring.innerHTML = "<i></i><b>İNCELE</b>";
  dot.setAttribute("aria-hidden", "true");
  ring.setAttribute("aria-hidden", "true");
  document.body.append(dot, ring);

  let x = -100,
    y = -100,
    rx = -100,
    ry = -100,
    raf = 0,
    visible = false;

  const tick = () => {
    rx += (x - rx) * 0.18;
    ry += (y - ry) * 0.18;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    if (Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1) raf = requestAnimationFrame(tick);
    else raf = 0;
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    x = e.clientX;
    y = e.clientY;
    if (!visible) {
      visible = true;
      rx = x;
      ry = y;
      dot.classList.remove("cursor-hidden");
      ring.classList.remove("cursor-hidden");
    }
    const t = e.target as Element | null;
    const view = t?.closest?.('[data-cursor="view"]');
    const link = t?.closest?.("a, button, [role='button'], label, select, input, textarea");
    ring.dataset.state = view ? "view" : link ? "link" : "";
    if (!raf) raf = requestAnimationFrame(tick);
  };
  const onLeave = () => {
    visible = false;
    dot.classList.add("cursor-hidden");
    ring.classList.add("cursor-hidden");
  };

  document.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);

  return () => {
    cancelAnimationFrame(raf);
    document.removeEventListener("pointermove", onMove);
    document.documentElement.removeEventListener("pointerleave", onLeave);
    dot.remove();
    ring.remove();
  };
}
