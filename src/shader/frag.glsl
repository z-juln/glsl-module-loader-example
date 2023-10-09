#version 300 es
#extension GL_GOOGLE_include_directive : enable
precision highp float;

// #pragma glslify: noise = require('glsl-noise/simplex/3d')
#pragma glslify: utils_double = require('./utils/utils-double')
#pragma glslify: utils_add = require('./utils/utils-add')

// #include <glsl-noise/simplex/3d>
#include <./utils/utils-common>

#define PI 3.14

uniform float iTime;
uniform vec2 iResolution;
out vec4 FragColor;

void main() {
  vec4 uv = vec4((gl_FragCoord.x * 2. - iResolution.x) / iResolution.x, (gl_FragCoord.y * 2. - iResolution.y) / iResolution.y, 0., 1.);
  FragColor = uv * iTime / 10000.;
}
