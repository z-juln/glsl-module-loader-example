export const initShader = ({
  gl,
  vertexShaderSource: _vertexShaderSource,
  fragmentShaderSource: _fragmentShaderSource,
  canvasInfo,
  includeMap = {},
}: {
  gl: WebGLRenderingContextBase;
  vertexShaderSource: string;
  fragmentShaderSource: string;
  canvasInfo: { width: number; height: number; };
  includeMap?: Record<string, string>;
}) => {
  const program = gl.createProgram();
  if (!program) {
    throw new Error('Program not created');
  }
  // create a new vertex shader and a fragment shader
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) {
    throw new Error('Shaders not created');
  }

  const vertexShaderSource = parseInclude(_vertexShaderSource, includeMap).trimStart();
  const fragmentShaderSource = parseInclude(_fragmentShaderSource, includeMap).trimStart();

  // specify the source code for the shaders using those strings
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.shaderSource(fragmentShader, fragmentShaderSource);

  // compile the shaders
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  // attach the two shaders to the program
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);
  gl.useProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program);
    if (log) {
      throw new Error(log);
    }
  }

  // iResolution
  const resolutionLocation = gl.getUniformLocation(program, 'iResolution');
  gl.uniform2f(resolutionLocation, canvasInfo.width, canvasInfo.height);

  // iTime
  (() => {
    const start = performance.now();
    const frameTask = () => {
      const iTime = performance.now() - start;
      gl.uniform1f(gl.getUniformLocation(program, 'iTime'), iTime);
      gl.drawArrays(gl.POINTS, 0, 1);
      requestAnimationFrame(frameTask);
    };
    frameTask();
  })();

  return program;
};

export const glLog = (gl: WebGLRenderingContext) =>
  ({ x, y, w = 1, h = 1 }: { x: number; y: number; w?: number; h?: number; }) => {
  const buf = new Uint8Array(w * h * 4);
  gl.readPixels(x, y, w, h, gl.RGBA, gl.UNSIGNED_BYTE, buf);
  const pixels: [number, number, number, number][] = [];
  for (let i = 0; i < buf.length; i += 4) {
    pixels.push([buf[i], buf[i + 1], buf[i + 2], buf[i + 3]]);
  }

  const pointStrList = pixels.map(p => p.join(', '));
  if (pixels.length <= 1) {
    console.log('pixels', pointStrList[0] ?? null);
  } else {
    console.log('pixels', pointStrList);
  }
};

export const getWebGLRenderingContext = (canvas: HTMLCanvasElement): { gl: WebGLRenderingContext; type: 'webgl1' | 'webgl2' } => {
  let gl: WebGLRenderingContext | null = canvas.getContext('webgl2') ?? (canvas.getContext('experimental-webg2') as any);
  let type: 'webgl1' | 'webgl2' = 'webgl2';
  if (!gl) {
    gl = canvas.getContext('webg1') ?? (canvas.getContext('experimental-webgl') as any);
    type = 'webgl1';
  }
  if (!gl) {
    throw new Error('WebGL not supported');
  }
  return {
    gl,
    type,
  };
};

export const parseInclude = (sourceCode: string, moduleMap: Record<string, string>) => {
  const includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;

  return sourceCode.replace(includePattern, (_, moduleName: string) => {
    const moduleCode = moduleMap[moduleName];
    if (!moduleCode) {
      throw new Error(`Can not resolve #include <${moduleName}>`);
    }
    return `\n// #include-start<${moduleName}>\n${moduleCode}\n// #include-end<${moduleName}>\n`;
  });
};
