/**
 * Math utils
 */

/**
 * Using polar coordinates, calculates the final point as `vec2<f32>`
 * @param {f32} distance distance from origin
 * @param {f32} radians Angle in radians
 */
export const polar = /*wgsl*/`
fn polar(distance: f32, radians: f32) -> vec2<f32> {
    return vec2<f32>(distance * cos(radians), distance * sin(radians));
}
`;

export const rotateVector = /*wgsl*/`
fn rotateVector(p:vec2<f32>, rads:f32 ) -> vec2<f32> {
    let s = sin(rads);
    let c = cos(rads);
    let xnew = p.x * c - p.y * s;
    let ynew = p.x * s + p.y * c;
    return vec2(xnew, ynew);
}
`;