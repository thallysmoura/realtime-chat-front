import React from 'react';

const IconHamburguer = ({ width = 16, height = 16, ...props }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={13} viewBox="0 0 16 13" {...props}>
            <g id="icon_menu" transform="translate(0.354 0.768)">
                <line id="Linha_1" data-name="Linha 1" x2={15} transform="translate(0.146 -0.268)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth={1} />
                <line id="Linha_2" data-name="Linha 2" x2={15} transform="translate(0.146 5.732)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth={1} />
                <line id="Linha_3" data-name="Linha 3" x2={15} transform="translate(0.146 11.732)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth={1} />
            </g>
        </svg>
    );
};

export default IconHamburguer;