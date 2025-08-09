'use client'

import React from 'react';

// @ estrutura do layout
import Header   from '../Layout/Header';
import Footer   from '../Layout/Footer';
import Body     from '../Layout/Body';


const LayoutHBF = ({ HeaderContent, BodyContent, FooterContent }) => {

    return (
        <>
            <Header className='w-full'>
                {HeaderContent}
            </Header>
            <Body className='mt-16'>
                {BodyContent}
            </Body>
            <Footer className='w-full'>
                {FooterContent}
            </Footer>
        </>
    );
};

export default LayoutHBF;