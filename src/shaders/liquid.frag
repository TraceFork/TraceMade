varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uTime;
uniform float uStrength;

void main() {
  vec2 uv = vUv;
  
  float wave = sin(uv.y * 10.0 + uTime) * uStrength;
  uv.x += wave;
  
  vec4 color = texture2D(uTexture, uv);
  
  gl_FragColor = color;
}
