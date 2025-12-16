varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform float uTime;
uniform float uAmplitude;
uniform float uFrequency;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  
  vec3 pos = position;
  
  float displacement = sin(pos.x * uFrequency + uTime) * 
                      cos(pos.y * uFrequency + uTime) * 
                      uAmplitude;
  
  pos += normal * displacement;
  
  vPosition = pos;
  
  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;
}
