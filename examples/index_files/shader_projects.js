export const shaderProjects = [
    { name: 'Base', path: './base/index.js', uri: 'base', desc: 'Empty project to start.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference, showcase' },
    { name: 'Audio 1', path: './audio1/index.js', uri: 'audio1', desc: 'Audio visualization. Click to Start audio.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Audio 2', path: './audio2/index.js', uri: 'audio2', desc: 'Audio visualization. Click to Start audio.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Bloom1', path: './bloom1/index.js', uri: 'bloom1', desc: '', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Feedback Sampling blur', path: './circleblur/index.js', uri: 'circleblur', desc: 'Previous frame rendered used to create effect.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Data 1', path: './data1/index.js', uri: 'data1', desc: 'Compute Shader example.<br>Open JavaScript console to check the output returned as Float32Array.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Demo 6', path: './demo_6/index.js', uri: 'demo_6', desc: 'Display of the default vertex colors of the screen triangles.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Ordered Dithering', path: './dithering1/index.js', uri: 'dithering1', desc: '', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'showcase' },
    { name: 'Closest Color in a Palette', path: './dithering2/index.js', uri: 'dithering2', desc: '', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'showcase' },
    { name: 'Dithering 3 - 1', path: './dithering3_1/index.js', uri: 'dithering3_1', desc: 'Failed dithering that displays workgroups.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: false, enabled: true, tax: 'showcase' },
    { name: 'Dithering 3 - 2', path: './dithering3_2/index.js', uri: 'dithering3_2', desc: 'Better dithering that affects the entire image at once.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: false, enabled: true, tax: 'showcase' },
    { name: 'Dithering 4', path: './dithering4/index.js', uri: 'dithering4', desc: '', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'showcase' },
    { name: 'Dithering Video 1', path: './dithering_video_1/index.js', uri: 'dithering_video_1', desc: '', author: 'absulit', authlink: 'http://absulit.com', fitWindow: false, enabled: true, tax: 'showcase' },
    { name: 'Events 1', path: './events1/index.js', uri: 'events1', desc: 'WGSL fires an event and is read on the JavaScript side. Visible in console.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Image Scale 1', path: './imagescale1/index.js', uri: 'imagescale1', desc: 'Layering of images', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Image Texture 1', path: './imagetexture1/index.js', uri: 'imagetexture1', desc: 'How to load a texture.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Image Texture 2', path: './imagetexture2/index.js', uri: 'imagetexture2', desc: 'Distort image colors.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Image Texture 3', path: './imagetexture3/index.js', uri: 'imagetexture3', desc: 'Distort image UV.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Image Texture 4', path: './imagetexture4/index.js', uri: 'imagetexture4', desc: 'Image descriptor properties `addressMode*` as `clamp-to-edge`', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Layers 1', path: './layers1/index.js', uri: 'layers1', desc: 'Add layers via JavaScript.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Mesh 1', path: './mesh1/index.js', uri: 'mesh1', desc: 'Change the amount of triangles of the base mesh.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Mouse 1', path: './mouse1/index.js', uri: 'mouse1', desc: 'Mouse demo that draws a cross.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Mouse Click and Scroll 1', path: './mouseclickscroll1/index.js', uri: 'mouseclickscroll1', desc: 'Mouse events demo. Click and the screen and scroll the mouse wheel.<br>Events can be read from WGSL.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Noise 1', path: './noise1/index.js', uri: 'noise1', desc: 'Noise layering.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Sun Distortion', path: './noisecircle1/index.js', uri: 'noisecircle1', desc: 'Effect of the Sun distorting the atmosphere.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'showcase' },
    { name: 'Points Title 1', path: './pointstitle1/index.js', uri: 'pointstitle1', desc: 'POINTS library `logo`.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'showcase' },
    { name: 'Random 1', path: './random1/index.js', uri: 'random1', desc: 'Update uniforms with random numbers from JavaScript.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: false, enabled: true, tax: 'reference' },
    { name: 'Random 2 (⚠ SLOW)', path: './random2/index.js', uri: 'random2', desc: 'Update a Storage with random numbers from JavaScript.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: false, enabled: true, tax: 'reference' },
    { name: 'Random 3', path: './random3/index.js', uri: 'random3', desc: 'Update texture with random numbers from a Compute Shader.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: false, enabled: true, tax: 'reference' },
    { name: 'Render Passes 1', path: './renderpasses1/index.js', uri: 'renderpasses1', desc: 'Basic two render passes example with a blur.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Render Passes 2', path: './renderpasses2/index.js', uri: 'renderpasses2', desc: '10 render passes example.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: false, enabled: true, tax: 'reference' },
    { name: 'Shapes 1', path: './shapes1/index.js', uri: 'shapes1', desc: 'Drawing shapes example.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Shapes 2', path: './shapes2/index.js', uri: 'shapes2', desc: '', author: 'absulit', authlink: 'http://absulit.com', fitWindow: false, enabled: false, tax: 'reference' },
    { name: 'Spritesheet 1', path: './spritesheet1/index.js', uri: 'spritesheet1', desc: 'Move your mouse. Animated sprite sheets follows your movements.<br> Penguin by <a rel="noopener" target="_blank" href="https://opengameart.org/users/tamashihoshi">tamashihoshi</a><br>Fishing Bobbles by <a rel="noopener" target="_blank" href="https://opengameart.org/users/nelson-yiap">Nelson Yiap</a>', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'UVs 1', path: './uvs1/index.js', uri: 'uvs1', desc: 'Move your mouse. Displays two uvs at the same time.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    { name: 'Video Texture 1', path: './videotexture1/index.js', uri: 'videotexture1', desc: 'Loads a video as a texture to read in WGSL and displays it.', author: 'absulit', authlink: 'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    // { name: 'PARAMS TEST', path: './params_test/index.js', uri:'params_test', desc:'', author: 'absulit', authlink:'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
    // { name: 'WebGPU Particles 1', path: './webgpu_particles_1/index.js', uri:'webgpu_particles_1', desc:'', author: 'absulit', authlink:'http://absulit.com', fitWindow: true, enabled: true, tax: 'reference' },
]