import { useCallback, useState } from 'react'

const useCenterAlign = (x, fallback = x) => {
    const [captionX, setCaptionX] = useState();
    const captionRef = useCallback(node => {
        const captionWidth = node?.getBoundingClientRect()?.width ?? fallback;
        setCaptionX(x - captionWidth / 2);
    }, [x, fallback]);

    return [captionX, captionRef];
};

export default useCenterAlign;