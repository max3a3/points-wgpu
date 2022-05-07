'use strict';
// import triangleVertWGSL from './shaders/triangle.vert.wgsl';
// import redFragWGSL from './shaders/red.frag.wgsl';
import { getShaderSource } from './shader_loader.js';

const triangleVertWGSL = await getShaderSource('./shaders/triangle5.vert.wgsl');
const redFragWGSL = await getShaderSource('./shaders/red5.frag.wgsl');

const canvas = document.getElementById('gl-canvas');
let device = null;
let context = null;
let pipeline = null;
let verticesBuffer = null;
let uniformBindGroup = null;

const vertexSize = 4 * 10; // Byte size of one triangle vertex.
const positionOffset = 0;
const colorOffset = 4 * 4; // Byte offset of triangle vertex color attribute.
const vertexCount = 6;
const UVOffset = 4 * 8;


/***************/
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
/***************/


const vertexArray = new Float32Array([
    // float4 position, float4 color,
    // there are itemsPerRow items in this row, that's why vertexSize is 4*itemsPerRow
    1, 1, 0.0, 1, 1, 0, 0, 1, 1, 0,
    1, -1, 0.0, 1, 0, 1, 0, 1, 1, 1,
    -1, -1, 0.0, 1, 0, 0, 1, 1, 0, 1,

    1, 1, 0.0, 1, 1, 0, 0, 1, 1, 0,
    -1, -1, 0.0, 1, 0, 0, 1, 1, 0, 1,
    -1, 1, 0.0, 1, 1, 1, 0, 1, 0, 0,
]);



async function init() {

    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) { return; }
    device = await adapter.requestDevice();
    device.lost.then(info => {
        console.log(info);
    });

    if (canvas === null) return;
    context = canvas.getContext('webgpu');

    const devicePixelRatio = window.devicePixelRatio || 1;
    const presentationSize = [
        canvas.clientWidth * devicePixelRatio,
        canvas.clientHeight * devicePixelRatio,
    ];
    const presentationFormat = context.getPreferredFormat(adapter);

    context.configure({
        device,
        format: presentationFormat,
        size: presentationSize,
        compositingAlphaMode: 'premultiplied',
    });

    // Create a vertex buffer from the triangle data.
    verticesBuffer = device.createBuffer({
        size: vertexArray.byteLength,
        usage: GPUBufferUsage.VERTEX,
        mappedAtCreation: true,
    });
    new Float32Array(verticesBuffer.getMappedRange()).set(vertexArray);
    verticesBuffer.unmap();


    pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {
            module: device.createShaderModule({
                code: triangleVertWGSL,
            }),
            entryPoint: 'main', // shader function name

            buffers: [
                {
                    arrayStride: vertexSize,
                    //arrayStride: vertexCount * vertexArray.BYTES_PER_ELEMENT,//vertexSize,
                    attributes: [
                        {
                            // position
                            shaderLocation: 0,
                            offset: positionOffset,
                            format: 'float32x4',
                        },
                        {
                            // colors
                            shaderLocation: 1,
                            offset: colorOffset,
                            format: 'float32x4',
                        },
                        {
                            // uv
                            shaderLocation: 2,
                            offset: UVOffset,
                            format: 'float32x2',
                        },
                    ],
                },
            ],
        },
        fragment: {
            module: device.createShaderModule({
                code: redFragWGSL,
            }),
            entryPoint: 'main', // shader function name
            targets: [
                {
                    format: presentationFormat,

                    blend: {
                        alpha: {
                            srcFactor: 'src-alpha',
                            dstFactor: 'one-minus-src-alpha',
                            operation: 'add'
                        },
                        color: {
                            srcFactor: 'src-alpha',
                            dstFactor: 'one-minus-src-alpha',
                            operation: 'add'
                        },
                    },
                    writeMask: GPUColorWrite.ALL,

                },
            ],
        },
        primitive: {
            topology: 'triangle-list',
        },
    });

    // -- create texture

    const samp = device.createSampler({ minFilter: "linear", magFilter: "linear" });
    // Fetch the image and upload it into a GPUTexture.
    //let cubeTexture: GPUTexture;
    let cubeTexture;
    {
        // const img = document.createElement('img');
        // img.src = './assets/old_king_600x600.jpg';
        // await img.decode();
        // const imageBitmap = await createImageBitmap(img);

        const response = await fetch('./assets/old_king_600x600.jpg');
        const blob = await response.blob();
        const imageBitmap = await createImageBitmap(blob);


        cubeTexture = device.createTexture({
            size: [imageBitmap.width, imageBitmap.height, 1],
            format: 'rgba8unorm',
            usage:
                GPUTextureUsage.TEXTURE_BINDING |
                GPUTextureUsage.COPY_DST |
                GPUTextureUsage.RENDER_ATTACHMENT,
        });
        device.queue.copyExternalImageToTexture(
            { source: imageBitmap },
            { texture: cubeTexture },
            [imageBitmap.width, imageBitmap.height]
        );
    }
    console.log(cubeTexture)

    uniformBindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: cubeTexture.createView(),
            },
            {
                binding: 1,
                resource: samp,
            }
        ],
    });


    // create texture --

    update();
}

function update() {
    stats.begin();

    // Sample is no longer the active page.
    if (!canvas) return;

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();

    //const renderPassDescriptor: GPURenderPassDescriptor = {
    const renderPassDescriptor = {
        colorAttachments: [
            {
                view: textureView,
                clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                loadOp: 'clear',
                storeOp: 'store',
            },
        ],
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, uniformBindGroup);
    passEncoder.setVertexBuffer(0, verticesBuffer);

    /**
     * vertexCount: number The number of vertices to draw
     * instanceCount?: number | undefined The number of instances to draw
     * firstVertex?: number | undefined Offset into the vertex buffers, in vertices, to begin drawing from
     * firstInstance?: number | undefined First instance to draw
     */
    //passEncoder.draw(3, 1, 0, 0);
    passEncoder.draw(vertexCount);
    passEncoder.end();
    //passEncoder.endPass();

    device.queue.submit([commandEncoder.finish()]);

    stats.end();
    requestAnimationFrame(update);
}

init();
