
'use client'

import React from 'react';

// @ estrutura do layout
import Header       from '../Layout/Header';
import Left         from '../Layout/Left';
import Right        from '../Layout/Right';
import Footer       from '../Layout/Footer';
import Center       from '../Layout/Center';
import Body         from '../Layout/Body';


const LayoutHLRBF = ({ HeaderContent, LeftContent, RightContent, BodyContent, FooterContent }) => {

    return (
        <>
        <Header className='w-full'>
           {HeaderContent}
        </Header>
        <Body className='mt-16'>
            <Left>
                {LeftContent}
            </Left>
            <Right>
                {RightContent}
            </Right>
            
            {BodyContent}
            
        </Body>
        <Footer className='w-full'>
           {FooterContent}
        </Footer>
    </>
    );
};

export default LayoutHLRBF;