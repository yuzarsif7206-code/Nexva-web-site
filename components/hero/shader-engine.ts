import { FRAG, VERT } from "./shader";

export type ShaderMode = "off" | "still" | "live";

export function getShaderMode(): ShaderMode {
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return "off";
  if (["slow-2g", "2g", "3g"].includes(nav.connection?.effectiveType ?? "")) return "off";
  if ((nav.deviceMemory ?? 4) <= 2 || (navigator.hardwareConcurrency ?? 4) <= 2) return "off";
  return matchMedia("(prefers-reduced-motion: reduce)").matches ? "still" : "live";
}

export function startShader(
  canvas: HTMLCanvasElement,
  mode: "still" | "live",
  onFirstFrame: () => void,
  onFail: () => void,
): () => void {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
    preserveDrawingBuffer: false,
  });
  if (!gl) {
    onFail();
    return () => {};
  }

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  const prog = gl.createProgram();
  if (!vs || !fs || !prog) {
    onFail();
    return () => {};
  }
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    onFail();
    return () => {};
  }
  gl.useProgram(prog);

  const uRes = gl.getUniformLocation(prog, "uRes");
  const uTime = gl.getUniformLocation(prog, "uTime");
  // devicePixelRatio kullanılmaz (dpr = 1). Mobil 0.5, ≥768 px 0.6 ölçek.
  let scale = innerWidth < 768 ? 0.5 : 0.6;
  let raf = 0,
    running = false,
    visible = true,
    frozen = false,
    dead = false;
  let last = 0,
    acc = 0,
    n = 0,
    slowRounds = 0,
    first = true;
  const t0 = performance.now();

  const size = () => {
    canvas.width = Math.max(2, Math.round(canvas.clientWidth * scale));
    canvas.height = Math.max(2, Math.round(canvas.clientHeight * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  };
  const draw = (now: number) => {
    if (dead) return;
    gl.uniform1f(uTime, 4 + (now - t0) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (first) {
      first = false;
      onFirstFrame();
    }
  };
  const sync = () => {
    const want = mode === "live" && visible && !document.hidden && !frozen && !dead;
    if (want && !running) {
      running = true;
      last = 0;
      acc = 0;
      n = 0;
      raf = requestAnimationFrame(loop);
    } else if (!want && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  };
  const loop = (now: number) => {
    if (!running) return;
    raf = requestAnimationFrame(loop);
    if (last && now - last < 30) return; // 30 fps üst sınırı
    const dt = last ? now - last : 0;
    last = now;
    draw(now);
    if (dt) {
      acc += dt;
      n++;
    }
    if (n === 45) {
      // otomatik düşürme
      const avg = acc / n;
      acc = 0;
      n = 0;
      if (avg > 45) {
        if (slowRounds++ === 0) {
          scale *= 0.7;
          size();
        } else {
          frozen = true; // son kare ekranda kalır
          sync();
        }
      }
    }
  };

  size();
  draw(performance.now()); // ilk kare (tek kare modu bununla biter)
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    sync();
  });
  io.observe(canvas);
  const onVis = () => sync();
  document.addEventListener("visibilitychange", onVis);
  // yeniden boyutlanınca canvas temizlenir; hemen yeniden çiz (siyah parlama olmasın)
  const ro = new ResizeObserver(() => {
    if (dead) return;
    size();
    draw(performance.now());
  });
  ro.observe(canvas);

  const onLost = (e: Event) => {
    e.preventDefault();
    destroy();
    onFail();
  };

  function destroy() {
    if (dead) return;
    dead = true;
    running = false;
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    canvas.removeEventListener("webglcontextlost", onLost);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  }
  canvas.addEventListener("webglcontextlost", onLost);
  sync();
  return destroy;
}
