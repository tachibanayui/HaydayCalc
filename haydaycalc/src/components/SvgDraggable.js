import { useEffect, useMemo, useRef, useState } from "react"

const SvgDraggable = ({children, onDrag}) => {
    const ref = useRef()
    const [transform, setTransform] = useState()
    const [translate, setTranslate] = useState([0, 0])
    const [dragOffset, setDragOffset] = useState(null)

    useEffect(() => {
        const getDragOffset = ({x: mx, y : my}) => {
            const { x: rx, y: ry } = ref.current.getBoundingClientRect()
            return [mx - rx, my - ry]
        }

        const handleDown = e => {
            if (ref.current) {
                const dof = getDragOffset(e)
                const { width, height } = ref.current.getBoundingClientRect()

                dof[0] >= 0 && width >= dof[0] && dof[1] >= 0 && height >= dof[1] && setDragOffset(dof)
            }
        }

        const handleMove = e => {
            if (!(e.buttons & (1 !== 0))) {
                handleUp(e)
            } else if (ref.current && dragOffset) {
                const dof = getDragOffset(e)
                const [tx, ty] = translate
                const tl = [dof[0] - dragOffset[0] + tx, dof[1] - dragOffset[1] + ty]
                setTranslate(tl)
                setTransform(`translate(${tl[0]}px, ${tl[1]}px)`)
                onDrag && onDrag({ translate, dragOffset })
            }
        }

        const handleUp = _ => dragOffset && setDragOffset(null)

        document.addEventListener('mousedown', handleDown)
        document.addEventListener('mousemove', handleMove)
        document.addEventListener("mouseup", handleUp)

        return () => {
            document.removeEventListener("mousedown", handleDown)
            document.removeEventListener("mousemove", handleMove)
            document.removeEventListener("mouseup", handleUp)
        }
    }, [dragOffset, translate, onDrag])


    return useMemo(() => (
        <g ref={ref} style={{transform: transform}}>
            {children}
        </g>
    ), [children, transform])
}

export default SvgDraggable