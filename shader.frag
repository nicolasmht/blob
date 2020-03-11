#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d) 
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec3 vPosition;
varying vec3 vPos;
varying vec3 vNormal;
varying vec2 vUv;

uniform float uResolution;
uniform float uTime;

void main() {

    float s = 1.2 + sin(uTime);
    float c = 1.2 + cos(uTime);

    float d = distance(vPosition, vPos) * .3;
    
    float d1 = d * snoise3(vPosition * (d * 4.) * 8.) * 75.;
    float d2 = d * snoise3(vPosition * (d * 8.) * 12.) * 75.;
    float d3 = d * snoise3(vPosition * (d * 12.) * 24.) * 75.;

    float r = d1;
    float g = d1 * d2 * 10.;

    gl_FragColor = vec4(vec3(d1, d2, d3), 1.);
}