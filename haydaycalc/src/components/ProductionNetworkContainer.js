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
    const [value, setValue] = useState(INITIAL_VALUE)

    return (
        <ReactSVGPanZoom
            SVGBackground="transparent"
            background="transparent"
            preventPanOutside="true"
            width={1500}
            height={1000}
            value={value}
            onChangeValue={setValue}
            tool={TOOL_NONE}
            miniatureProps={{ position: "none" }}
            toolbarProps={{ position: "right" }}
        >
            <StyledSvg>
                {children}
            </StyledSvg>
        </ReactSVGPanZoom>
    )
}

const StyledSvg = styled.svg`
    width: 100%;
    height: 500px;

    border: 1px solid gold;
`

export default ProductionNetworkContainer
