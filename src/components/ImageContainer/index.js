import React from 'react';

const ImageContainer = ({ url, size, onClick }) => {
    const containerStyle = {
        width: `${size}`,
        height: `${size}`,
        borderRadius: '99px',
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
    };

    return <div style={containerStyle} onClick={onClick}></div>;
};

export default ImageContainer;
