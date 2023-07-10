export const audioAverage = /*wgsl*/`
fn audioAverage() -> f32 {
    var audioAverage = 0.;
    for (var index = 0; index < i32(params.audioLength); index++) {
        let audioValue = audio[index] / 256;
        audioAverage += audioValue;
    }
    return audioAverage / params.audioLength;
}
`;

export const audioAverageSegments = /*wgsl*/`
fn audioAverageSegments(segmentNum:i32) -> f32{
    // arrayLength
    return .0;
}
`;
