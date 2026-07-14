// WebGL2 dither shader, ported from portfolio v1 (main.js).
// One change from v1: PIXEL is now the `pixelSize` uniform so the
// preloader can animate the resolve from coarse to fine.

export const VERT_SRC =
  "#version 300 es\nin vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";

export const FRAG_SRC = `#version 300 es
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform vec2 mousePos;
uniform vec3 bgc;
uniform vec3 wavec;
uniform float darken;
uniform float pixelSize;
uniform float scrollY;
out vec4 fragColor;

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
  vec2 sc=floor(coord/pixelSize);
  int x=int(mod(sc.x,8.0));
  int y=int(mod(sc.y,8.0));
  float threshold=bayer[y*8+x]-0.25;
  float stp=1.0/(COLORS-1.0);
  color+=threshold*stp;
  color=clamp(color-darken,0.0,1.0);
  return floor(color*(COLORS-1.0)+0.5)/(COLORS-1.0);
}

void main(){
  vec2 pc=floor(gl_FragCoord.xy/pixelSize)*pixelSize+pixelSize*0.5;
  vec2 uv=pc/resolution-0.5;
  uv.x*=resolution.x/resolution.y;
  // couple the pattern to page scroll so the background travels with content
  // (gl_FragCoord y is bottom-up, so subtract to move with the page)
  uv.y-=scrollY/resolution.y;
  float f=pattern(uv);
  vec2 m=(mousePos/resolution-0.5)*vec2(1.0,-1.0);
  m.x*=resolution.x/resolution.y;
  float d=length(uv-m);
  f-=0.5*(1.0-smoothstep(0.0,MOUSE_R,d));
  vec3 col=mix(bgc,wavec,clamp(f,0.0,1.0));
  fragColor=vec4(dither(gl_FragCoord.xy,col),1.0);
}`;

// Theme uniforms — the tuned-deeper hot pink accent family.
export const THEME_UNIFORMS = {
  dark: { bg: [0.039, 0.039, 0.039], wave: [0.88, 0.11, 0.44], darken: 0.2 },
  light: { bg: [0.98, 0.98, 0.968], wave: [0.65, 0.08, 0.32], darken: 0.0 },
} as const;
