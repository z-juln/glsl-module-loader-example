# `glslify + glsl-module` 模块化开发

## 相关文档

- glslify官方文档: <https://github.com/glslify/glslify>
- glsl-module官方文档（我写的）: <https://github.com/z-juln/glsl-module-loader>

## 项目案例

> 可以直接拉取 [glsl-module-loader-example](https://github.com/z-juln/glsl-module-loader-example) 的代码下来跑一下

下面是 [glsl-module-loader-example](https://github.com/z-juln/glsl-module-loader-example) (还是我写的) 这个项目案例中的部分代码: 

src/shader/frag.glsl

```glsl
#version 300 es
#extension GL_GOOGLE_include_directive : enable
precision highp float;

// #pragma glslify: noise = require('glsl-noise/simplex/3d.glsl')
// glslify 导入 utils_double
#pragma glslify: utils_double = require('./utils/utils-double')
#pragma glslify: utils_add = require('./utils/utils-add')

// #include <glsl-noise/simplex/3d.glsl>
#include <./utils/utils-common.glsl>

#define PI 3.14

uniform float iTime;
uniform vec2 iResolution;
out vec4 FragColor;

void main() {
  vec4 uv = vec4((gl_FragCoord.x * 2. - iResolution.x) / iResolution.x, (gl_FragCoord.y * 2. - iResolution.y) / iResolution.y, 0., 1.);
  FragColor = uv * iTime / 10000.;
}
```

src/shader/utils/utils-common.glsl

```glsl
// common-utils
```

src/shader/utils/utils-double.glsl

```glsl
highp float utils_double(float n) {
  return n * 2.;
}

// glslify 导出 utils_double
#pragma glslify: export(utils_double)
```

glslify导入导出: 看 `frag.glsl` 和 `utils-double.glsl` 中的 `#pragma glslify` 语法.

这里的 `#include <./utils/utils-common.glsl>` 是 `glsl-module` 的用法, 会把 `./utils/utils-common.glsl` 文件的代码直接替换到该行.

glslify 和 glsl-module 一样, 都支持 `node-resolve` 的路径解析功能: `#include <glsl-noise/simplex/3d.glsl>` 对应路径: `node_modules/glsl-noise/simplex/3d.glsl`. glslify 同上.

## webpack配置

- glslify-loader: <https://github.com/glslify/glslify>
- glsl-module-loader: <https://github.com/z-juln/glsl-module-loader>

相对于平常js使用的webpack配置, 只需要加入下面这个解析规则就行了:

```javascript
{
  test: /\.glsl$/i,
  use: [
    'raw-loader',
    'glslify-loader',
    'glsl-module-loader',
  ],
},
```

js中的使用方式:

```javascript
import vertGlsl from './shader/vert.glsl';
import fragGlsl from './shader/frag.glsl';
```
