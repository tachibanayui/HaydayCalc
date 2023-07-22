"use client"
import { useCallback, useEffect, useRef, useState } from "react"
import {
    INITIAL_VALUE,
    ReactSVGPanZoom,
    TOOL_NONE,
    TOOL_PAN,
    fitSelection,
    zoomOnViewerCenter,
    fitToViewer,
} from "react-svg-pan-zoom"

const ProductionNetworkContainer = ({ children }) => {
    const Viewer = useRef(null);
    const [value, setValue] = useState(INITIAL_VALUE)

    const [firstRender, setFirstRender] = useState(true)
    useEffect(() => {
        setFirstRender(false)
    }, [])

    if (firstRender) {
        return (
            <svg className="recipe-graph-view" height="100vh" width="100%">
                {children}
            </svg>
        );
    }
    return (
        <ReactSVGPanZoom
            ref={Viewer}
            SVGBackground="transparent"
            background="transparent"
            preventPanOutside="true"
            height="100vh"
            width="100%"
            value={value}
            onChangeValue={setValue}
            tool={TOOL_PAN}
            miniatureProps={{ position: "none" }}
            toolbarProps={{ position: "none" }}
        >
            <svg className="recipe-graph-view">{children}</svg>
        </ReactSVGPanZoom>
    );
}

export default ProductionNetworkContainer
