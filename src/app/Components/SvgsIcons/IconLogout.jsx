import React from 'react';

const IconLogout = ({ width = 12, height = 20, ...props }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 12 20" {...props }>
        <g id="icon_sair" transform="translate(-27 -241)">
            <g id="Retângulo_9225" data-name="Retângulo 9225" transform="translate(27 241)" fill="#fff" stroke="#272727" strokeWidth={1}>
                <path d="M2,0h8a2,2,0,0,1,2,2V20a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V2A2,2,0,0,1,2,0Z" stroke="none" />
                <path d="M2,.5h8A1.5,1.5,0,0,1,11.5,2V19a.5.5,0,0,1-.5.5H1A.5.5,0,0,1,.5,19V2A1.5,1.5,0,0,1,2,.5Z" fill="none" />
            </g>
            <g id="Elipse_219" data-name="Elipse 219" transform="translate(35 249)" fill="#fff" stroke="#272727" strokeWidth="0.5">
                <circle cx={1} cy={1} r={1} stroke="none" />
                <circle cx={1} cy={1} r="0.75" fill="none" />
            </g>
        </g>
    </svg>
    );
};

export default IconLogout;