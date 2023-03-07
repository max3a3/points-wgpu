import vert from './vert.js';
import compute from './compute.js';
import frag from './frag.js';
import { ShaderType } from '../../src/absulit.points.module.js';
const dithering3 = {
    vert,
    compute,
    frag,
    init: async points => {
        points.addSampler('feedbackSampler', null, ShaderType.FRAGMENT);
        // await points.addTextureImage('image', './../img/carmen_lyra_423x643.jpg', ShaderType.FRAGMENT);
        // await points.addTextureImage('image', './../img/old_king_600x600.jpg', ShaderType.COMPUTE);
        // await points.addTextureWebcam('image', ShaderType.COMPUTE);
        // await points.addTextureImage('image', './../img/angel_600x600.jpg', ShaderType.COMPUTE);
        // await points.addTextureImage('image', './../img/gratia_800x800.jpg', ShaderType.COMPUTE);
        await points.addTextureImage('image', './../img/absulit_800x800.jpg', ShaderType.COMPUTE);
        points.addBindingTexture('outputTex', 'computeTexture');
        points.addLayers(2, ShaderType.COMPUTE);
        points.addStorage('variables', 1, 'Variable', 2, ShaderType.COMPUTE);
    },
    update: points => {

    }
}

export default dithering3;