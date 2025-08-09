'use client'

import React from 'react';

// @estrutura do layout
import Body from '../Layout/Body';

const LayoutB = ({BodyContent}) => {
    return (
        <Body className='mt-16'>
            {BodyContent}
        </Body>
    );
};

export default LayoutB;