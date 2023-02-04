import vert from './vert.js';
import compute from './compute.js';
import frag from './frag.js';
const random2 = {
    vert,
    compute,
    frag,
    init: async (points) => {
        points.addUniform('randNumber', 0);
        points.addUniform('randNumber2', 0);
        points.addStorage('stars', 800*800, 'Star', 4);
        let data = [];
        for (let k = 0; k < 800*800; k++) {
            data.push(Math.random());
        }
        points.addStorageMap('rands', [0,0], 'f32');
        points.addSampler('feedbackSampler');
        points.addTexture2d('feedbackTexture', true);
        points.addBindingTexture('outputTex', 'computeTexture');
    },
    update: (points) => {
        points.updateUniform('randNumber', Math.random());
        points.updateUniform('randNumber2', Math.random());
        let data = [];
        for (let k = 0; k < 800*800; k++) {
            data.push(Math.random());
        }
        points.updateStorageMap('rands', data);
    }
}

export default random2;