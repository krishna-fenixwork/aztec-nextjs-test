import { useEffect, useState } from 'react';
import Lottie from "react-lottie";

const LottieAnimation = ({ lotti, width, height }:{ lotti:any, width:any, height:any }) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: lotti,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div>
            <Lottie options={defaultOptions} height={height} width={width} />
        </div>
    );
};

export default LottieAnimation;