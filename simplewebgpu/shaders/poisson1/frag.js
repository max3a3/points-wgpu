import defaultStructs from '../defaultStructs.js';
import { brightness, fnusin, fusin } from '../defaultFunctions.js';
import { snoise } from '../noise2d.js';

const frag = /*wgsl*/`

${defaultStructs}

${fnusin}
${fusin}
${brightness}
${snoise}

@fragment
fn main(
        @location(0) Color: vec4<f32>,
        @location(1) uv: vec2<f32>,
        @location(2) ratio: vec2<f32>,
        @location(3) mouse: vec2<f32>,
        @builtin(position) position: vec4<f32>
    ) -> @location(0) vec4<f32> {

    _ = active_grid[0];
    let dims: vec2<u32> = textureDimensions(computeTexture, 0);
    var dimsRatio = f32(dims.x) / f32(dims.y);
    let f = params.screenWidth / 360.;
    let imageUV = uv * vec2(1,-1 * dimsRatio) * ratio.y / params.sliderA;
    //let imageUV = (uv / f + vec2(0, .549 ) ) * vec2(1,-1 * dimsRatio) * ratio.y / params.sliderA;
    var point = textureSample(computeTexture, feedbackSampler, imageUV); //* .998046;


    let scale = .01;

    var c = 1.;

    //var planet = 0];
    var lastDistance = -1.;
    for(var i:u32 = 0; i < u32(params.numCels); i++){
        var planet = active_grid[i];
        var d = distance(uv, vec2(planet.x * scale + .5, planet.y * scale + .5));


        if(lastDistance != -1.){
            lastDistance = min(lastDistance, d);
        }else{
            lastDistance = d;
        }
    }
    if(lastDistance > .001){
        c = 0.;
    }







    return vec4(c);
}
`;

export default frag;
