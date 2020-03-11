import {Renderer, Camera, Transform, Orbit, Program, Mesh, Sphere } from 'ogl';
import { vec2 } from 'gl-matrix';

import fragmentShader from './shader.frag';
import vertexShader from './shader.vert';

let deltaTime, time = Date.now(), timePassed = 0;

const renderer = new Renderer();
const gl = renderer.gl;
document.body.appendChild(gl.canvas);
gl.clearColor(0., 0., 0., 1);

const camera = new Camera(gl);
camera.position.z = 10;
const controls = new Orbit(camera);

function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.perspective({
        aspect: gl.canvas.width / gl.canvas.height,
    });
}
window.addEventListener('resize', resize, false);
resize();

const scene = new Transform();

// const geometry = new Plane(gl);
const geometry = new Sphere(gl, { radius: 1.5, widthSegments: 100.0, heightSegments: 100.0 });

const program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    cullFace: null,
    uniforms: {
        uResolution: {
            type: 'vec2',
            value: vec2.create(10., 10.)
        },
        uTime: {
            type: 'f',
            value: 0.0
        }
    }
});

const mesh = new Mesh(gl, {geometry, program});
mesh.setParent(scene);

function update(t) {

    // Update time
    deltaTime = Date.now() - time;
    timePassed += deltaTime;
    time = Date.now();

    program.uniforms.uTime.value = timePassed * 0.001;

    controls.update();

    mesh.rotation.y -= 0.01;
    // mesh.rotation.x += 0.01;

    mesh.position.z = Math.sin(mesh.rotation.x) * 2.0;

    renderer.render({scene, camera});
    requestAnimationFrame(update);
}

requestAnimationFrame(update);