import { useMemo } from "react"
import MathUtils from "../utils/math"

const eqTriTan = Math.tan(MathUtils.radian(30))

const SvgArrow = ({ sx, sy, dx, dy, arrowSize = 5, ...rest }) => {
    // Vector calc
    const points = useMemo(() => {
        const src = [sx, sy]
        const dest = [dx, dy]

        const length = MathUtils.distance(src, dest)
        const midPoint = MathUtils.lerp(Math.max(0, 1 - arrowSize / length), src, dest)
        const halfWidth = eqTriTan * arrowSize

        const dirVec = MathUtils.normalize(MathUtils.vec2Rotate([sx - dx, sy - dy], Math.PI / 2))
        const p0 = MathUtils.vecAdd(midPoint, MathUtils.vecScalarMult(halfWidth, dirVec))
        const p1 = MathUtils.vecAdd(midPoint, MathUtils.vecScalarMult(-halfWidth, dirVec))

        return [src, midPoint, p0, dest, p1, midPoint]
    }, [sx, sy, dx, dy, arrowSize])

    const data = points.flatMap(x => x.join(",")).join(" ")

    return <polygon {...rest} points={data} fill="white" stroke="white" />
}

export default SvgArrow