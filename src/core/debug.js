export const showDebugCross = /*wgsl*/`
fn showDebugCross(position:vec2<f32>, color:vec4<f32>, uv:vec2<f32>) -> vec4<f32>{
    let horizontal = sdfLine(vec2(0, position.y), vec2(10, position.y), 1., uv) * color;
    let vertical = sdfLine(vec2(position.x, 0), vec2(position.x, 10), 1., uv) * color;
    return vertical + horizontal;
}
`;

export const showDebugFrame = /*wgsl*/`
fn showDebugFrame(color:vec4<f32>, uv:vec2<f32>) -> vec4<f32> {
    let ratioX = params.screenWidth / params.screenHeight;
    let ratioY = 1 / ratioX / (params.screenHeight / params.screenWidth);
    let ratio = vec2(ratioX, ratioY);

    let topRight = vec2(1, 1) * ratio;
    let topLeft = vec2(0., 1.);
    let bottomLeft = vec2(0., 0.);
    let bottomRight = vec2(1., 0.) * ratio;

    let top = sdfLine(topLeft, topRight, 1., uv) * color;
    let bottom = sdfLine(bottomLeft, bottomRight, 1., uv) * color;
    let left = sdfLine(bottomLeft, topLeft, 1., uv) * color;
    let right = sdfLine(bottomRight, topRight, 1., uv) * color;
    return top + bottom + left + right;
}
`;
