import { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
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
            <StyledSvg>{children}</StyledSvg>
        </ReactSVGPanZoom>
    )
}

const StyledSvg = styled.svg`
    width: 100%;
    height: 500px;

    border: 1px solid gold;
`

export default ProductionNetworkContainer
