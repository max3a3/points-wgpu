import vert from './vert.js';
import compute from './compute.js';
import frag from './frag.js';
import Points from '../../src/absulit.points.module.js';
import { RenderPasses } from './../../src/RenderPasses.js';

const base = {
    vert,
    compute,
    frag,
    /**
     *
     * @param {Points} points
     */
    init: async points => {
        let volume = .1;
        let loop = true;
        // points.addAudio('audio', './../../audio/generative_audio_test.ogg', volume, loop);
        // points.addAudio('audio', './../../audio/leaving_caladan.mp3', volume, loop);
        points.addAudio('audio', './../../audio/cognitive_dissonance.mp3', volume, loop);
        // points.addAudio('audio', 'https://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg', volume, loop);
        points.addStorage('result',10, 'f32', 1);

        // RenderPasses.filmgrain(points);
        // RenderPasses.bloom(points, .1);
        // RenderPasses.lensDistortion(points, .5, .01);
        // RenderPasses.blur(points, 100, 100, .1,0);

        points.addSampler('imageSampler', null);
        points.addTexture2d('feedbackTexture', true);
    },
    /**
     *
     * @param {Points} points
     */
    update: points => {
    }
}

export default base;