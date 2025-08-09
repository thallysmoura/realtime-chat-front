import React from 'react';

// @Components
import Nav from '@component/Nav';
import IconDownload from '@component/SvgsIcons/IconDownload';

const Header = () => {
    return (
        <Nav
            useArea= {false}
            Localidade='RealTimeChat'
            Titulo='Instalação'
            Search={false}
            Icon={<IconDownload />}
        />
    );
};

export default Header;