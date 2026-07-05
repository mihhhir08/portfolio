(function () {
  var root = document.documentElement;
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();
(function () {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  var box = document.getElementById("cursor-preview");
  var img = box.querySelector("img");
  var tx = 0, ty = 0, x = 0, y = 0, raf = null;
  function loop() {
    x += (tx - x) * 0.18; y += (ty - y) * 0.18;
    box.style.transform = "translate(" + x + "px," + y + "px)";
    if (Math.abs(tx - x) + Math.abs(ty - y) > 0.3) raf = requestAnimationFrame(loop);
    else raf = null;
  }
  document.querySelectorAll(".row").forEach(function (row) {
    row.addEventListener("mouseenter", function () {
      img.src = row.dataset.preview;
      box.classList.add("on");
    });
    row.addEventListener("mousemove", function (e) {
      tx = Math.min(e.clientX + 24, innerWidth - 380); ty = Math.min(e.clientY + 24, innerHeight - 245);
      if (!raf) raf = requestAnimationFrame(loop);
    });
    row.addEventListener("mouseleave", function () { box.classList.remove("on"); });
  });
})();
(function () {
  document.querySelectorAll(".sub-link").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault(); e.stopPropagation();
      location.href = el.dataset.href;
    });
  });
})();
(function () {
  var LAUNCH = Date.UTC(2026, 6, 5);
  var days = Math.max(0, Math.floor((Date.now() - LAUNCH) / 864e5));
  var count = 312 + days * 7 + (days % 4) * 2 + 1;
  var el = document.getElementById("visitors");
  function render(n) { el.textContent = n.toLocaleString("en-US") + " visitors"; }
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    render(count); return;
  }
  render(0);
  var done = false;
  var io = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting || done) return;
    done = true; io.disconnect();
    var t0 = performance.now();
    requestAnimationFrame(function tick(t) {
      var p = Math.min((t - t0) / 1200, 1);
      render(Math.round(count * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });
  io.observe(el);
})();
(function () {
  var btn = document.getElementById("copy-email");
  btn.addEventListener("click", function () {
    var email = "mihhhir08@gmail.com";
    (navigator.clipboard ? navigator.clipboard.writeText(email) : Promise.reject())
      .catch(function () {})
      .finally(function () {
        btn.classList.add("did");
        setTimeout(function () { btn.classList.remove("did"); }, 1600);
      });
  });
})();
(function () {
  var els = document.querySelectorAll("#work .work li, #about .about-text, #about .skills, #contact .email, #contact .contact-links");
  if (!("IntersectionObserver" in window)) return;
  els.forEach(function (el) { el.classList.add("reveal"); });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.15 });
  els.forEach(function (el) { io.observe(el); });
})();
(function () {
  var canvas = document.getElementById("dither");
  var gl = canvas.getContext("webgl2", { antialias: false });
  if (!gl) return;

  var vsrc = "#version 300 es\nin vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
  var fsrc = `#version 300 es
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform vec2 mousePos;
uniform vec3 bgc;
uniform vec3 wavec;
uniform float darken;
out vec4 fragColor;

const float PIXEL = 3.0;
const float COLORS = 4.0;
const float SPEED = 0.04;
const float FREQ = 3.0;
const float AMP = 0.3;
const float MOUSE_R = 0.35;

vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
vec2 fade(vec2 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec2 P){
  vec4 Pi=floor(P.xyxy)+vec4(0.0,0.0,1.0,1.0);
  vec4 Pf=fract(P.xyxy)-vec4(0.0,0.0,1.0,1.0);
  Pi=mod289(Pi);
  vec4 ix=Pi.xzxz; vec4 iy=Pi.yyww;
  vec4 fx=Pf.xzxz; vec4 fy=Pf.yyww;
  vec4 i=permute(permute(ix)+iy);
  vec4 gx=fract(i*(1.0/41.0))*2.0-1.0;
  vec4 gy=abs(gx)-0.5;
  vec4 tx=floor(gx+0.5);
  gx=gx-tx;
  vec2 g00=vec2(gx.x,gy.x); vec2 g10=vec2(gx.y,gy.y);
  vec2 g01=vec2(gx.z,gy.z); vec2 g11=vec2(gx.w,gy.w);
  vec4 norm=taylorInvSqrt(vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11)));
  g00*=norm.x; g01*=norm.y; g10*=norm.z; g11*=norm.w;
  float n00=dot(g00,vec2(fx.x,fy.x));
  float n10=dot(g10,vec2(fx.y,fy.y));
  float n01=dot(g01,vec2(fx.z,fy.z));
  float n11=dot(g11,vec2(fx.w,fy.w));
  vec2 fade_xy=fade(Pf.xy);
  vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);
  return 2.3*mix(n_x.x,n_x.y,fade_xy.y);
}

float fbm(vec2 p){
  float v=0.0; float amp=1.0; float freq=FREQ;
  for(int i=0;i<4;i++){ v+=amp*abs(cnoise(p)); p*=freq; amp*=AMP; }
  return v;
}
float pattern(vec2 p){ vec2 p2=p-time*SPEED; return fbm(p+fbm(p2)); }

const float bayer[64]=float[64](
  0.0/64.0,48.0/64.0,12.0/64.0,60.0/64.0, 3.0/64.0,51.0/64.0,15.0/64.0,63.0/64.0,
 32.0/64.0,16.0/64.0,44.0/64.0,28.0/64.0,35.0/64.0,19.0/64.0,47.0/64.0,31.0/64.0,
  8.0/64.0,56.0/64.0, 4.0/64.0,52.0/64.0,11.0/64.0,59.0/64.0, 7.0/64.0,55.0/64.0,
 40.0/64.0,24.0/64.0,36.0/64.0,20.0/64.0,43.0/64.0,27.0/64.0,39.0/64.0,23.0/64.0,
  2.0/64.0,50.0/64.0,14.0/64.0,62.0/64.0, 1.0/64.0,49.0/64.0,13.0/64.0,61.0/64.0,
 34.0/64.0,18.0/64.0,46.0/64.0,30.0/64.0,33.0/64.0,17.0/64.0,45.0/64.0,29.0/64.0,
 10.0/64.0,58.0/64.0, 6.0/64.0,54.0/64.0, 9.0/64.0,57.0/64.0, 5.0/64.0,53.0/64.0,
 42.0/64.0,26.0/64.0,38.0/64.0,22.0/64.0,41.0/64.0,25.0/64.0,37.0/64.0,21.0/64.0);

vec3 dither(vec2 coord, vec3 color){
  vec2 sc=floor(coord/PIXEL);
  int x=int(mod(sc.x,8.0));
  int y=int(mod(sc.y,8.0));
  float threshold=bayer[y*8+x]-0.25;
  float stp=1.0/(COLORS-1.0);
  color+=threshold*stp;
  color=clamp(color-darken,0.0,1.0);
  return floor(color*(COLORS-1.0)+0.5)/(COLORS-1.0);
}

void main(){
  vec2 pc=floor(gl_FragCoord.xy/PIXEL)*PIXEL+PIXEL*0.5;
  vec2 uv=pc/resolution-0.5;
  uv.x*=resolution.x/resolution.y;
  float f=pattern(uv);
  vec2 m=(mousePos/resolution-0.5)*vec2(1.0,-1.0);
  m.x*=resolution.x/resolution.y;
  float d=length(uv-m);
  f-=0.5*(1.0-smoothstep(0.0,MOUSE_R,d));
  vec3 col=mix(bgc,wavec,clamp(f,0.0,1.0));
  fragColor=vec4(dither(gl_FragCoord.xy,col),1.0);
}`;

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }
  var prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsrc));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsrc));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, "a");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  var uRes = gl.getUniformLocation(prog, "resolution");
  var uTime = gl.getUniformLocation(prog, "time");
  var uMouse = gl.getUniformLocation(prog, "mousePos");
  var uBg = gl.getUniformLocation(prog, "bgc");
  var uWave = gl.getUniformLocation(prog, "wavec");
  var uDark = gl.getUniformLocation(prog, "darken");

  function applyTheme() {
    if (document.documentElement.dataset.theme === "light") {
      gl.uniform3f(uBg, 0.98, 0.98, 0.968);
      gl.uniform3f(uWave, 0.745, 0.094, 0.365);
      gl.uniform1f(uDark, 0.0);
    } else {
      gl.uniform3f(uBg, 0.039, 0.039, 0.039);
      gl.uniform3f(uWave, 1.0, 0.137, 0.565);
      gl.uniform1f(uDark, 0.2);
    }
  }
  applyTheme();
  new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  var mouse = [-9999, -9999];
  addEventListener("pointermove", function (e) {
    mouse[0] = e.clientX;
    mouse[1] = e.clientY;
  });

  function resize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  addEventListener("resize", resize);
  resize();

  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var visible = true;
  var raf = null;
  function frame(t) {
    raf = null;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, reduced ? 0 : t / 1000);
    gl.uniform2f(uMouse, mouse[0], mouse[1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!reduced && visible) raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver(function (entries) {
    visible = entries[0].isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(frame);
  }).observe(canvas);
  raf = requestAnimationFrame(frame);
})();
(function () {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var cat = document.getElementById("cat");
  var flip = cat.querySelector(".cat-flip");
  var x = -60, tx = 40, raf = null;
  cat.style.transform = "translateX(" + x + "px)";
  addEventListener("pointermove", function (e) {
    tx = Math.min(Math.max(e.clientX - 54, 6), innerWidth - 58);
    if (!raf) raf = requestAnimationFrame(step);
  });
  function step() {
    var d = tx - x;
    x += d * 0.055;
    cat.style.transform = "translateX(" + x + "px)";
    if (Math.abs(d) > 6) flip.style.transform = d < 0 ? "scaleX(-1)" : "scaleX(1)";
    if (Math.abs(d) > 1) {
      cat.classList.add("walk");
      raf = requestAnimationFrame(step);
    } else {
      cat.classList.remove("walk");
      raf = null;
    }
  }
})();
