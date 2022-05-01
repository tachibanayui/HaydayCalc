const lerpSingle = (value, v0, v1) => (1 - value) * v0 + value * v1

/**
 * Linear interpolation with vectors represented as arrays
 *
 * @param {number} value
 * @param {Array<Number>} v0
 * @param {Array<Number>} v1
 */
const lerpMultidimensional = (value, v0, v1) => {
    const result = []

    for (let i = 0; i < v0.length; i++) {
        result.push(lerpSingle(value, v0[i], v1[i]))
    }
    return result
}

const MathUtils = {}

MathUtils.clamp = (value, min, max) => Math.min(Math.max(value, min), max)
MathUtils.lerp = (value, v0, v1) =>
    v0 instanceof Array
        ? lerpMultidimensional(value, v0, v1)
        : lerpSingle(value, v0, v1)

MathUtils.distanceSq = (p0, p1) => {
    let result = 0

    for (let i = 0; i < p0.length; i++) {
        result += Math.pow(p1[i] - p0[i], 2)
    }

    return result
}

MathUtils.distance = (p0, p1) => Math.sqrt(MathUtils.distanceSq(p0, p1))

MathUtils.radian = deg => deg * (Math.PI / 180)

MathUtils.vecLength = v => MathUtils.distance(v, v.map(x => 0))

MathUtils.vec2Rotate = (v, a) => [
    v[0] * Math.cos(a) - v[1] * Math.sin(a),
    v[0] * Math.sin(a) + v[1] * Math.cos(a),
]

MathUtils.normalize = v => {
    const l = MathUtils.vecLength(v);
    return v.map(x => x / l);
}

MathUtils.vecAdd = (v0, v1) => {
    const result = []
    for (let i = 0; i < v0.length; i++) {
        result.push(v0[i] + v1[i])
    }
    
    return result
}

MathUtils.vecScalarMult = (c, v) => v.map(x => x * c);

MathUtils.dotProduct = (v0, v1) => {
    let result = 0
    for (let i = 0; i < v0.length; i++) {
        result += v0[i] * v1[i]
    }
    
    return result
}

MathUtils.angle = (v0, v1) => {
    const dot = MathUtils.dotProduct(v0, v1)
    const dist = Math.abs(MathUtils.vecLength(v0) * MathUtils.vecLength(v1))
    return Math.acos(dot / dist)
}

window.MathUtils = MathUtils

export default MathUtils