import React from 'react';


/**
 * TIPO
 *  1 = Exame não solicitado (Cinza)
 *  2 = Exame solicitado e não realizado (Vermelho)
 *  3 = Exame solicitado e realizado (Verde)
 */

const IconPossuiExameImg = ({ width = 20, height = 15, tipo, ...props }) => {
    return (
        <>
            {
                tipo === 1 &&
                <svg id="Componente_43_13" data-name="Componente 43 – 13" xmlns="http://www.w3.org/2000/svg" {...props} width={width} height={height} viewBox="0 0 9.461 9.579">
                    <g id="Retângulo_9258" data-name="Retângulo 9258" fill="none" stroke="#dbdbdb" stroke-width="1">
                        <rect width="9.461" height="9.579" rx="1" stroke="none" />
                        <rect x="0.5" y="0.5" width="8.461" height="8.579" rx="0.5" fill="none" />
                    </g>
                    <line id="Linha_19" data-name="Linha 19" x2="5" transform="translate(2.02 7.289)" fill="none" stroke="#dbdbdb" stroke-width="1" />
                </svg>
            }

            {
                tipo === 2 &&

                <svg id="Exame_de_imagem_solicitado" xmlns="http://www.w3.org/2000/svg"  {...props} width={width} height={height} viewBox="0 0 9.461 9.579">
                    <g id="Retângulo_9258" data-name="Retângulo 9258" fill="none" stroke="#fe0100" stroke-width="1">
                        <rect width="9.461" height="9.579" rx="1" stroke="none" />
                        <rect x="0.5" y="0.5" width="8.461" height="8.579" rx="0.5" fill="none" />
                    </g>
                    <line id="Linha_19" data-name="Linha 19" x2="5" transform="translate(2.02 7.289)" fill="none" stroke="#fe0100" stroke-width="1" />
                </svg>

            }

            {
                tipo === 3 &&


                <svg id="Exame_de_Imagem_pronto" xmlns="http://www.w3.org/2000/svg" {...props} width={width} height={height} viewBox="0 0 9.461 9.579">
                    <g id="Retângulo_9258" data-name="Retângulo 9258" fill="none" stroke="#68b400" stroke-width="1">
                        <rect width="9.461" height="9.579" rx="1" stroke="none" />
                        <rect x="0.5" y="0.5" width="8.461" height="8.579" rx="0.5" fill="none" />
                    </g>
                    <line id="Linha_19" data-name="Linha 19" x2="5" transform="translate(2.02 7.289)" fill="none" stroke="#68b400" stroke-width="1" />
                </svg>


            }

        </>
    );
};

export default IconPossuiExameImg;