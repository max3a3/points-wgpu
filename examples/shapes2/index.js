import vert from './vert.js';
import compute from './compute.js';
import frag from './frag.js';
import { ShaderType } from '../../src/absulit.points.module.js';
const shapes2 = {
    vert,
    compute,
    frag,
    init: async points => {
        const numPoints = 800*800;
        points.addUniform('numPoints', numPoints);
        points.addStorage('points', numPoints, 'vec4<f32>', 4);
        points.addSampler('feedbackSampler', null, ShaderType.FRAGMENT);
        points.addBindingTexture('outputTex', 'computeTexture');
    },
    update: points => {

    }
}

export default shapes2;