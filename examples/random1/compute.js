import defaultStructs from '../../src/shaders/defaultStructs.js';

const compute = /*wgsl*/`

${defaultStructs}

struct Variables{
    testValue: f32
}

struct Chemical{
    a: f32,
    b: f32
}

struct Particles{
    chemicals: array<Chemical>
}

struct Star{
    a: f32,
    b: f32,
    c: f32,
    d: f32,
}

@compute @workgroup_size(8,8,1)
fn main(
    @builtin(global_invocation_id) GlobalId: vec3<u32>,
    @builtin(workgroup_id) WorkGroupID: vec3<u32>,
    @builtin(local_invocation_id) LocalInvocationID: vec3<u32>
) {
    let utime = params.utime;

    let dims: vec2<u32> = textureDimensions(feedbackTexture, 0);
    var rgba = textureSampleLevel(feedbackTexture, feedbackSampler, vec2(0),  0.0).rgba;

    let r = params.randNumber;
    let r2 = params.randNumber2;

    let star = stars[0];

    textureStore(outputTex, vec2<u32>( u32(r * 800.) ,  u32(r2 * 800.) ), vec4<f32>(1, params.sliderA,0,1));

    //textureStore(outputTex, vec2<u32>(0,0), rgba);
}
`;

export default compute;
