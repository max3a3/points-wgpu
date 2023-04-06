import vert from './vert.js';
import frag from './frag.js';
const imagetexture4 = {
    vert,
    frag,
    init: async points => {
        /**
         * @type {GPUObjectDescriptorBase}
         */
        let descriptor = {
            addressModeU: 'clamp-to-edge',
            addressModeV: 'clamp-to-edge',
            magFilter: 'nearest',
            minFilter: 'nearest',
            mipmapFilter: 'nearest',
            //maxAnisotropy: 10,
        }

        points.addSampler('imageSampler', descriptor);
        // await points.addTextureImage('image', './../img/carmen_lyra_423x643.jpg');
        await points.addTextureImage('image', './../img/old_king_600x600.jpg');
        // await points.addTextureImage('image', './../img/absulit_800x800.jpg');
    },
    update: points => {

    }
}

export default imagetexture4;