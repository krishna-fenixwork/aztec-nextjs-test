import React from 'react';

const Check = ({ src, width, quality }: { src:any, width:any, quality:any }) => {
    return `https://www.ag-grid.com/${src}?w=${width}&q=${quality || 75}`
}

export default Check;