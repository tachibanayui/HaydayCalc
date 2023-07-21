import { useMemo } from "react"
import MathUtils from "../../utils/math"
import SvgArrow from "../SvgArrow"

const ProductionEdge = ({ sx, sy, dx, dy, count, ...rest }) => {
    const [mx, my] = useMemo(() => MathUtils.lerp(0.5, [sx, sy], [dx, dy]), [sx, sy, dx, dy])
    const angle = MathUtils.angle([dx - sx, dy - sy], [0, 1]) - Math.PI / 2
    //const angle = MathUtils.angle([dx - sx, dy - sy], [1, 0])
    const rot = angle * (dx > sx ? -1 : 1)

    return (
        <g {...rest}>
            <SvgArrow sx={sx} sy={sy} dx={dx} dy={dy} />
            <text
                textAnchor="middle"
                style={{ transform: `translate(${mx}px, ${my}px) rotate(${rot}rad)` }}
                fill="white"
            >
                {count}x
            </text>
        </g>
    )
}

export default ProductionEdge
