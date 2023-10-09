// http://www.bimant.com/blog/webgl-shader-crash-course/
import vertGlsl from './shader/vert.glsl';
import fragGlsl from './shader/frag.glsl';
import { getWebGLRenderingContext, glLog, initShader } from './shader-help';

console.log({
  vertGlsl,
  fragGlsl,
})

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const { gl } = getWebGLRenderingContext(canvas);

const program = initShader({
  gl,
  canvasInfo: { width: canvas.width, height: canvas.height },
  vertexShaderSource: vertGlsl,
  fragmentShaderSource: fragGlsl,
});
const log = glLog(gl);

log({ x: 0, y: 0 });

// {
//   const points = [
//     // first triangle
//     // top left
//     -1, -1,
  
//     // top right
//     1, -1,
  
//     // bottom left
//     -1, 1,
  
//     // second triangle
//     // bottom right
//     1, 1,
  
//     // top right
//     1, -1,
  
//     // bottom left
//     -1, 1,
//   ];
  
//   // create a buffer
//   const pointsBuffer = gl.createBuffer();
//   // activate the buffer, and specify that it contains an array
//   gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuffer);
//   // upload the points array to the active buffer
//   // gl.STATIC_DRAW tells the GPU this data won't change
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
  
//   // get the location of our "points" attribute in our shader program
//   const pointsLocation = gl.getAttribLocation(program, 'points');
//   // pull out pairs of float numbers from the active buffer
//   // each pair is a vertex that will be available in our vertex shader
//   gl.vertexAttribPointer(pointsLocation, 2, gl.FLOAT, false, 0, 0);
//   // enable the attribute in the program
//   gl.enableVertexAttribArray(pointsLocation);
// }

// {
//   const img = new Image();
//   img.src = 'photo.jpg';
//   img.onload = () => {
//     // assume this runs all the code we've been writing so far
//   };

//   // create a new texture
//   const texture = gl.createTexture();
//   // specify that our texture is 2-dimensional
//   gl.bindTexture(gl.TEXTURE_2D, texture);
//   // upload the 2D image (img) and specify that it contains RGBA data
//   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

//   // tell WebGL how to choose pixels when drawing our non-square image
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
//   // bind this texture to texture #0
//   gl.activeTexture(gl.TEXTURE0);
//   gl.bindTexture(gl.TEXTURE_2D, texture);

//   // use the texture for the uniform in our program called "sampler",
//   gl.uniform1i(gl.getUniformLocation(program, 'sampler'), 0);
// }

// {
//   const textureCoordinates = [
//     // first triangle
//     // top left
//     0, 1,

//     // top right
//     1, 1,

//     // bottom left
//     0, 0,

//     // second triangle
//     // bottom right
//     1, 0,

//     // top right
//     1, 1,

//     // bottom left
//     0, 0,
//   ];
//   // same stuff we did earlier, but passing different numbers
//   const textureCoordinateBuffer = gl.createBuffer();
//   gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordinateBuffer);
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
//   // and associating it with a different attribute
//   const textureCoordinateLocation = gl.getAttribLocation(program, 'texture_coordinate');
//   gl.vertexAttribPointer(textureCoordinateLocation, 2, gl.FLOAT, false, 0, 0);
//   gl.enableVertexAttribArray(textureCoordinateLocation);
// }

// gl.drawArrays(gl.TRIANGLES, 0, 3);
