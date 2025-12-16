varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uIntensity;

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(viewDirection, vNormal), 2.0);
  
  float hue = vUv.x + uTime * 0.1;
  vec3 rainbowColor = hsv2rgb(vec3(hue, 0.8, 1.0));
  
  vec3 mixedColor = mix(uColorA, uColorB, vUv.y);
  vec3 finalColor = mix(mixedColor, rainbowColor, fresnel * uIntensity);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
