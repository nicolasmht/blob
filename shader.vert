#define PI 3.14159265358979323846

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: pnoise3 = require(glsl-noise/periodic/3d)
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d) 

#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform float uTime;

varying vec3 vPosition;
varying vec3 vPos;
varying vec3 vNormal;
varying vec2 vUv;

void main() {

    vec3 pos = position;
    pos += normal * snoise3(vec3(position.x, position.y, uTime * 0.1)) * .3;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    vPosition = position;
    vPos = pos;
    vNormal = normal;
    vUv = uv;
}