import React from 'react';

const AnimationLoader = ({ animation }:{animation:any}) => {
    return (
        <div className='d-flex justify-content-center align-items-center loader_style'>
            <object type='image/svg+xml' data={animation} style={{ height: '150px', width: '150px' }}>svg-animation</object>
        </div>
    );
}

export default AnimationLoader;