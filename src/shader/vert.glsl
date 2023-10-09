#version 300 es
#extension GL_GOOGLE_include_directive : enable
uniform vec2 iResolution;
in vec4 a_position;
in vec4 color;
out vec4 vColor;

uniform mat4 modelViewProjectionMatrix;

void main() {
  gl_Position = a_position;
  gl_PointSize = max(iResolution.x, iResolution.y);
}
