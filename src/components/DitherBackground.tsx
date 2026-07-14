"use client";

import { useEffect, useRef, type RefObject } from "react";
import { VERT_SRC, FRAG_SRC, THEME_UNIFORMS } from "@/lib/shader";

type Props = {
  // Mutable ref read every frame — lets the preloader animate the
  // resolve without re-rendering React at 60fps.
  pixelSizeRef?: RefObject<number>;
};

export default function DitherBackground({ pixelSizeRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT_SRC));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG_SRC));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "resolution");
    const uTime = gl.getUniformLocation(prog, "time");
    const uMouse = gl.getUniformLocation(prog, "mousePos");
    const uBg = gl.getUniformLocation(prog, "bgc");
    const uWave = gl.getUniformLocation(prog, "wavec");
    const uDark = gl.getUniformLocation(prog, "darken");
    const uPixel = gl.getUniformLocation(prog, "pixelSize");
    const uScroll = gl.getUniformLocation(prog, "scrollY");

    const applyTheme = () => {
      const t =
        document.documentElement.dataset.theme === "light" ? "light" : "dark";
      const u = THEME_UNIFORMS[t];
      gl.uniform3f(uBg, u.bg[0], u.bg[1], u.bg[2]);
      gl.uniform3f(uWave, u.wave[0], u.wave[1], u.wave[2]);
      gl.uniform1f(uDark, u.darken);
    };
    applyTheme();
    const mo = new MutationObserver(applyTheme);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const mouse = [-9999, -9999];
    const onPointer = (e: PointerEvent) => {
      mouse[0] = e.clientX;
      mouse[1] = e.clientY;
    };
    addEventListener("pointermove", onPointer);

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    addEventListener("resize", resize);
    resize();

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf: number | null = null;
    let running = true;
    const frame = (t: number) => {
      raf = null;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 0 : t / 1000);
      gl.uniform2f(uMouse, mouse[0], mouse[1]);
      gl.uniform1f(uPixel, Math.max(1, pixelSizeRef?.current ?? 3));
      gl.uniform1f(uScroll, window.scrollY);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced && running) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      mo.disconnect();
      removeEventListener("pointermove", onPointer);
      removeEventListener("resize", resize);
    };
  }, [pixelSizeRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="dither-canvas fixed inset-0 -z-10 h-full w-full"
    />
  );
}
