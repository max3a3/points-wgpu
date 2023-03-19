const compute = /*wgsl*/`

struct Matrix {
    size : vec2<f32>,
    numbers: array<f32>,
}

@compute @workgroup_size(8,8,1)
fn main(
    @builtin(global_invocation_id) GlobalId: vec3<u32>,
    @builtin(workgroup_id) WorkGroupID: vec3<u32>,
    @builtin(local_invocation_id) LocalInvocationID: vec3<u32>
) {
    // Guard against out-of-bounds work group sizes
    if (GlobalId.x >= u32(firstMatrix.size.x) || GlobalId.y >= u32(secondMatrix.size.y)) {
        return;
    }

    let time = params.time;
    // _ = firstMatrix.size;
    // _ = secondMatrix.size;

    // resultMatrix.numbers[0] = 0.;

    resultMatrix.size = vec2(firstMatrix.size.x, secondMatrix.size.y);
}
`;

export default compute;
