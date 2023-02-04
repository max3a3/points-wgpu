'use strict';
import * as dat from './../src/vendor/datgui/dat.gui.module.js';
import Points, { ShaderType } from '../src/absulit.points.module.js';

/***************/
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

let capturer = new CCapture({
    format: 'webm',
    //timeLimit: 10,
    verbose: true
});

const gui = new dat.GUI({ name: 'My GUI' });
const slidersFolder = gui.addFolder('Sliders');

slidersFolder.open();

const sliders = { 'a': 0, 'b': 0, 'c': 0 };

sliders.a = Number(localStorage.getItem('slider-a')) || 0;
sliders.b = Number(localStorage.getItem('slider-b')) || 0;
sliders.c = Number(localStorage.getItem('slider-c')) || 0;

slidersFolder.add(sliders, 'a', -1, 1, .0001).name('params.sliderA').onFinishChange(() => localStorage.setItem('slider-a', sliders.a));
slidersFolder.add(sliders, 'b', -1, 1, .0001).name('params.sliderB').onFinishChange(() => localStorage.setItem('slider-b', sliders.b));
slidersFolder.add(sliders, 'c', -1, 1, .0001).name('params.sliderC').onFinishChange(() => localStorage.setItem('slider-c', sliders.c));

let statsVisible = (localStorage.getItem('stats-visible') === 'true') || false;
function setStatsVisibility(value) {
    value && (stats.dom.style.display = 'block');
    !value && (stats.dom.style.display = 'none');
    localStorage.setItem('stats-visible', value);
}
setStatsVisibility(statsVisible);

let stats2 = { 'visible': statsVisible };
gui.add(stats2, 'visible').name('Show Stats').onChange(value => setStatsVisibility(value));

const shaderPaths = [
    { name: 'Base', shader: '../src/shaders/base/index.js' },
    { name: 'Bloom1', shader: './bloom1/index.js' },
    { name: 'Circle Blur', shader: './circleblur/index.js' },
    { name: 'Demo 6', shader: './demo_6/index.js' },
    { name: 'Dithering 1', shader: './dithering1/index.js' },
    { name: 'Dithering 2', shader: './dithering2/index.js' },
    { name: 'Dithering 3', shader: './dithering3/index.js' },
    { name: 'Dithering 4', shader: './dithering4/index.js' },
    { name: 'Image Scale 1', shader: './imagescale1/index.js' },
    { name: 'Image Texture 1', shader: './imagetexture1/index.js' },
    { name: 'Image Texture 2', shader: './imagetexture2/index.js' },
    { name: 'Image Texture 3', shader: './imagetexture3/index.js' },
    { name: 'Image Texture 4', shader: './imagetexture4/index.js' },
    { name: 'Layers 1', shader: './layers1/index.js' },
    { name: 'Mesh 1', shader: './mesh1/index.js' },
    { name: 'Noise 1', shader: './noise1/index.js' },
    { name: 'Noise Circle 1', shader: './noisecircle1/index.js' },
    { name: 'Random 1', shader: './random1/index.js' },
    { name: 'Random 2', shader: './random2/index.js' },
    { name: 'Random 3', shader: './random3/index.js' },
    { name: 'Shapes 1', shader: './shapes1/index.js' },
    { name: 'Shapes 2', shader: './shapes2/index.js' },
    { name: 'Video Texture 1', shader: './videotexture1/index.js' },
]

const shaderNames = {};
shaderPaths.forEach((item, index) => {
    shaderNames[item.name] = index;
});

let selectedShader = { index: 0 }

let examples = gui.add(selectedShader, 'index', shaderNames).name('Examples');

async function loadShaderByIndex(index) {
    let shaderPath = shaderPaths[index].shader;
    shaders = (await import(shaderPath)).default;
    await init();
}


examples.onChange(loadShaderByIndex);

/***************/

let points;

let shaders;
let animationFrameId = null;
await loadShaderByIndex(0);

async function init() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    points = new Points('gl-canvas');
    points.addUniform('sliderA', 0);
    points.addUniform('sliderB', 0);
    points.addUniform('sliderC', 0);


    await shaders.init(points);
    await points.init(shaders.vert, shaders.compute, shaders.frag);
    update();
}

function update() {
    stats.begin();

    // code here

    points.updateUniform('sliderA', sliders.a);
    points.updateUniform('sliderB', sliders.b);
    points.updateUniform('sliderC', sliders.c);

    shaders.update(points);
    points.update();

    //

    stats.end();

    capturer.capture(points.canvas);
    animationFrameId = requestAnimationFrame(update);
}

//init();

const ccaptureBtn = document.getElementById('ccaptureBtn');
let started = false;
ccaptureBtn.addEventListener('click', onClickCCaptureButton);
let buttonTitle = ccaptureBtn.textContent;
function onClickCCaptureButton(e) {
    started = !started;
    if (started) {
        // start
        capturer.start();
        //points.videoRecordStart();
        ccaptureBtn.textContent = 'RECORDING (STOP)';
    } else {
        ccaptureBtn.textContent = buttonTitle;
        // stop and download
        capturer.stop();
        // default save, will download automatically a file called {name}.extension (webm/gif/tar)
        capturer.save();
        //points.videoRecordStop();
    }
}

const liveCaptureBtn = document.getElementById('liveCaptureBtn');
let started2 = false;
liveCaptureBtn.addEventListener('click', onClickLiveCaptureButton);
let buttonTitle2 = liveCaptureBtn.textContent;
function onClickLiveCaptureButton(e) {
    started2 = !started2;
    if (started2) {
        // start
        //capturer.start();
        points.videoRecordStart();
        liveCaptureBtn.textContent = 'RECORDING (STOP)';
    } else {
        liveCaptureBtn.textContent = buttonTitle2;
        // stop and download
        //capturer.stop();
        // default save, will download automatically a file called {name}.extension (webm/gif/tar)
        //capturer.save();
        points.videoRecordStop();
    }
}

//
// var resizeViewport = function () {
//     let aspect = window.innerWidth / window.innerHeight;
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// }

// window.addEventListener('resize', resizeViewport, false);

