import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import {Box, SxProps} from "@mui/material";

const useOnScreen = (ref: MutableRefObject<Element | undefined>) => {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting)
        );

        ref.current && observer.observe(ref.current);

        return () => {
            observer.disconnect()
        }
    }, [ref]);

    return isIntersecting;
}

interface VisibilityDetectorProps {
    onVisibilityChanged?: (visible: boolean) => void;
    sx?: SxProps;
}

const OnScreen: React.FC<VisibilityDetectorProps> = ({onVisibilityChanged, sx}) => {
    const ref = useRef();
    const visible = useOnScreen(ref);

    useEffect(() => {
        onVisibilityChanged && onVisibilityChanged(visible);
    }, [visible, onVisibilityChanged]);

    return (
        <Box ref={ref} component="div" sx={sx}/>
    );
}

export default OnScreen;
