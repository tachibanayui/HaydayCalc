const ProductionNode = ({
    img,
    srcImg,
    count,
    x,
    y,
    size = 25,
    auxSize = 16,
    captionSize = 12,
}) => {
    const startX = x - size / 2
    const startY = y - size / 2

    return (
        <g>
            <image x={startX} y={startY} href={img} width={size} height={size} />
            <ellipse
                cx={x}
                cy={y}
                rx={size / 2 + 2}
                ry={size / 2 + 2}
                stroke="green"
                fill="transparent"
            />
            <image
                x={startX + size / 2}
                y={startY + size / 2}
                href={srcImg}
                width={auxSize}
                height={auxSize}
            />
            <text
                fontSize={captionSize}
                y={startY + size + captionSize + 2}
                x={x}
                textAnchor="middle"
            >
                {count}x
            </text>
        </g>
    )
}

export default ProductionNode
