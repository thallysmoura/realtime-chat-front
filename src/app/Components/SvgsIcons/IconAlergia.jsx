import React from 'react';

import Image from 'next/image';

import n_possui_alergia from 'app/Components/SvgsIcons/alergia_default.svg'
import possui_alergia   from 'app/Components/SvgsIcons/alergia_possui.svg'


const IconAlergia = ({ possui = false }) => {
    return (
       <>
       {
        possui ?
            <Image src={possui_alergia} alt="Alergia Icon"  />
        :
            <Image src={n_possui_alergia} alt="Alergia Icon"  />
       }
       </>
    );
};

export default IconAlergia;