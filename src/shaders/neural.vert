attribute vec3 color;
attribute float size;

varying vec3 vColor;
varying float vSize;

uniform float uTime;
uniform float uIntensity;

void main() {
  vColor = color;
  vSize = size;
  
  vec3 pos = position;
  pos.y += sin(uTime + position.x * 2.0) * 0.1 * uIntensity;
  pos.x += cos(uTime + position.z * 2.0) * 0.1 * uIntensity;
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = size * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
