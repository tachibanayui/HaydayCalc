import ProductionNetworkContainer from "./ProductionNetworkContainer"
import ProductionNode from "./ProductionNode"
import ProductionEdge from "./ProductionEdge"
import MathUtils from "../../utils/math"
import { useMemo, useState } from "react"

const ProductionNetwork = ({ goodsList, nodePoses, nodeData, recipeSelector, nodeSize = 25 }) => {
    const [edgeProps, setEdgeProps] = useState([])
    const [nodeProps, setNodeProps] = useState([])
    const [nodeTransforms, setNodeTransforms] = useState([])


    useMemo(() => {
        const width = Math.abs(Math.min(...Object.values(nodePoses).map(x => x.x))) + nodeSize
        const height = Math.abs(Math.min(...Object.values(nodePoses).map(x => x.y))) + nodeSize
        const intialEdgeProps = []
        const keys = Object.keys(nodeData)
        const initialNodeProps = keys.map((x, i) => {
            const { count, source } = nodeData[x]
            const current = goodsList[x]
            const prop = {
                img: current.imageUrl,
                srcImg: source.imageUrl,
                x: width + nodePoses[x].x,
                y: height + nodePoses[x].y,
                count: Math.round(count),
            }

            const { ingridients, resultCount } = recipeSelector(current)
            for (const { product, count: childCount } of ingridients.filter(f => f.product !== x)) {
                const childTransform = nodeTransforms[keys.indexOf(product)];
                const childX = width + nodePoses[product].x + (childTransform?.[0] ?? 0)
                const childY = height + nodePoses[product].y + (childTransform?.[1] ?? 0)
                const translatedPropX = prop.x + (nodeTransforms[i]?.[0] ?? 0)
                const translatedPropY = prop.y + (nodeTransforms[i]?.[1] ?? 0)
                const lerpX = MathUtils.clamp((nodeSize / 2 + 3) / (translatedPropX - childX), 0, 1)
                const lerpY = MathUtils.clamp((nodeSize / 2 + 3) / (translatedPropY - childY), 0, 1)

                const edge = {
                    sx: MathUtils.lerp(lerpX, childX, translatedPropX),
                    sy: MathUtils.lerp(lerpY, childY, translatedPropY),
                    dx: MathUtils.lerp(1 - lerpX, childX, translatedPropX),
                    dy: MathUtils.lerp(1 - lerpY, childY, translatedPropY),
                    count: Math.round((childCount * count) / resultCount),
                }

                intialEdgeProps.push(edge)
            }

            return prop
        })

        setEdgeProps(intialEdgeProps)
        setNodeProps(initialNodeProps)
    }, [goodsList, nodePoses, nodeData, recipeSelector, nodeSize, nodeTransforms])



    const handleDrag = (index, translate) => {
        nodeTransforms[index] = translate
        setNodeTransforms([...nodeTransforms])
    }

    return (
        <ProductionNetworkContainer>
            {edgeProps.map((x, i) => <ProductionEdge key={i} {...x} />) }
            {nodeProps.map((x, i) => (
                <svg key={i}>
                    <ProductionNode {...x} />
                </svg>
            ))}
        </ProductionNetworkContainer>
    )
}

export default ProductionNetwork
