// Palet: bg #0A0A0B | burgundy #5C0A15 | brand #B3162B | accent #E5311B | sicak parlama #FFE8E2
// NOT: GLSL icine Turkce karakter YAZMA, yorumlar bile ASCII olsun.
export const VERT = `#version 300 es
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2. - 1., 0., 1.);
}`;

export const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
out vec4 o;

float h21(vec2 p){ p = fract(p * vec2(233.34, 851.73)); p += dot(p, p + 23.45); return fract(p.x * p.y); }
float vn(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y);
}

float hgt(vec2 p, float t){
  vec2 w = vec2(vn(p * .7 + vec2(0., t * .05)), vn(p * .7 + vec2(7.3, 2.1) - vec2(t * .04, 0.)));
  p += (w - .5) * 1.8;
  float u = (p.x * .82 + p.y * .57) * .55
          + sin(p.y * .9 + t * .12) * .35 + t * .03;
  float x = fract(u) * 2. - 1.;
  return sqrt(max(1. - x * x, 0.)) * .9;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - .5 * uRes) / min(uRes.x, uRes.y) * 2.6;
  float t = uTime, e = .02;
  float h0 = hgt(p, t), hx = hgt(p + vec2(e, 0.), t), hy = hgt(p + vec2(0., e), t);
  vec3 n = normalize(vec3(-(hx - h0) / e, -(hy - h0) / e, 1.2));
  vec3 V = vec3(0., 0., 1.);
  vec3 L1 = normalize(vec3(-.55, .65, .6)), L2 = normalize(vec3(.75, -.35, .5));
  float d1 = clamp(dot(n, L1), 0., 1.), d2 = clamp(dot(n, L2), 0., 1.);
  float s1 = pow(clamp(dot(n, normalize(L1 + V)), 0., 1.), 90.);
  float sheen = pow(clamp(dot(n, normalize(L1 + V)), 0., 1.), 9.);
  float s2 = pow(clamp(dot(n, normalize(L2 + V)), 0., 1.), 40.);
  float fres = pow(1. - n.z, 2.2);

  vec3 bg = vec3(.039, .039, .043), burg = vec3(.361, .039, .082);
  vec3 brand = vec3(.702, .086, .169), acc = vec3(.898, .192, .106), hi = vec3(1., .91, .886);

  vec3 base = mix(burg, brand, smoothstep(.05, .85, d1 * .8 + d2 * .5));
  vec3 col = base * (.40 + .9 * d1 + .5 * d2) + acc * (fres * .55 + sheen * .35) + hi * (s1 * 2.2 + s2 * .9);
  col *= .30 + .70 * h0;
  float edge = smoothstep(.28, 1., length((uv - .5) * vec2(1., .85) * 2.));
  col = mix(bg, col, edge);
  col += (h21(gl_FragCoord.xy) - .5) / 255.;
  o = vec4(clamp(col, 0., 1.), 1.);
}`;
