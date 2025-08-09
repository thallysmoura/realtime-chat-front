import React from 'react';

const IconHipoteseDiagn = ({ width = 42, height = 42, ...props }) => {
    return (
        <svg id="icon_obs_medico" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={42} height={42} viewBox="0 0 42 42" {...props}>
            <defs>
                <clipPath id="clip-path">
                    <rect id="Retângulo_9240" data-name="Retângulo 9240" width={width} height={height} fill="none" />
                </clipPath>
            </defs>
            <g id="Grupo_10371" data-name="Grupo 10371" clipPath="url(#clip-path)">
                <path id="Caminho_5697" data-name="Caminho 5697" d="M21,0A21,21,0,1,0,42,21,21.024,21.024,0,0,0,21,0m.5,39.975V31.491h.785a3.988,3.988,0,0,0,3.892-3.076L28.3,19.476l-.49-.116L29.6,11.809A3.5,3.5,0,0,0,26.2,7.5H26V7H24V9h2V8.5h.2a2.5,2.5,0,0,1,2.433,3.079l-1.8,7.55-.483-.115-2.124,8.939a1.994,1.994,0,0,1-1.946,1.538h-3.57a1.994,1.994,0,0,1-1.946-1.538l-2.124-8.939-.483.115-1.8-7.55A2.5,2.5,0,0,1,14.8,8.5H15V9h2V7H15v.5h-.2a3.5,3.5,0,0,0-3.4,4.31l1.794,7.55-.49.116,2.124,8.94a3.988,3.988,0,0,0,3.892,3.075H19.5v8.433a19.016,19.016,0,1,1,2,.051" />
            </g>
        </svg>

    );
};

export default IconHipoteseDiagn;