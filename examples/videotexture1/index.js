import vert from './vert.js';
import compute from './compute.js';
import frag from './frag.js';
import { ShaderType } from '../../src/absulit.points.module.js';
const videotexture1 = {
    vert,
    compute,
    frag,
    init: async (points) => {
        points.addSampler('feedbackSampler', null, ShaderType.FRAGMENT);
        //await points.addTextureImage('oldking', './../img/carmen_lyra_423x643.jpg', ShaderType.FRAGMENT);
        await points.addTextureImage('oldking', './../img/old_king_600x600.jpg', ShaderType.FRAGMENT);
        // await points.addTextureImage('image', './../assets_ignore/absulit_800x800.jpg', ShaderType.FRAGMENT);
        await points.addTextureVideo('video', './../img/61c6eeaf-87cf5e18.mp4', ShaderType.COMPUTE)
        points.addBindingTexture('outputTex', 'computeTexture');

    },
    update: (points) => {

    }
}

export default videotexture1;