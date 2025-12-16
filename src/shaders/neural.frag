varying vec3 vColor;
varying float vSize;

uniform vec3 uColor;
uniform float uTime;
uniform float uIntensity;

void main() {
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);
  
  if (dist > 0.5) {
    discard;
  }
  
  float alpha = (0.5 - dist) * 2.0;
  alpha *= uIntensity;
  
  vec3 finalColor = mix(vColor, uColor, 0.5);
  finalColor += vec3(sin(uTime * 2.0) * 0.1);
  
  gl_FragColor = vec4(finalColor, alpha);
}
