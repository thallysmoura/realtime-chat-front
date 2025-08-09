import React, { useState }  from 'react';
import useLocalStorage      from 'app/Hooks/useLocalStorage';


// @contents
import { H3, Paragraph } from   '@component/Typography';
import Input             from   '@component/Input';
import Drawer            from   '@component/Drawer';
import Image from 'next/image';
import Modal from './ap';
import MenuContent from './Contents/Drawer/MenuContent';
import LogoutContent from './Contents/Modal/LogoutContent';
import AlterarLocalContent from './Contents/Modal/AlterarLocalContent';

// @utils
import useStore         from 'app/Hooks/useStore';
import IconHamburguer   from './SvgsIcons/IconHamburguer';
import IconBack from '@component/SvgsIcons/IconBack';

import { useRouter }     from 'next/navigation';
import { limparStorage } from '@utils/Utils';


const Nav = ({Localidade, Titulo, Icon, Search = true, useArea=true, HeaderTotem=false}) => {

    const router        = useRouter()

    const searchTerm    = useStore((state) => state.searchTerm);
    const setSearchTerm = useStore((state) => state.setSearchTerm);
  

    // @sessão do usuário (Storage)
    const user = useLocalStorage('user')


    const [showDrawer,      setShowDrawer]              = useState(false)
    const [showModal,       setShowModal]               = useState(false)
    const [ContentModal,    setContentModal]            = useState('')


    const handleShowDrawer = () => {
        setShowDrawer(!showDrawer)
    }

    const abrirModal = (event) => {
        switch (event) {
            case 'Sair':
                setShowDrawer(false)
                setContentModal(<LogoutContent />)
                setShowModal(true)
            break;
            case 'alterar_local':
                setShowDrawer(false)
                setContentModal(<AlterarLocalContent />)
                setShowModal(true)
            break;
        }
    }

    
    async function handleBack()
    {
        limparStorage   ('localidade')
        limparStorage   ('tipo')
        
        router.push     ('/Totem')
    }

    return (
        <>
            <nav className='w-full bg-primary fixed z-20 top-0 shadow-lg'>
            <main className='flex flex-col justify-between '>
                <section className='bg-primary flex justify-between p-2 items-center text-white'>
                    
                

                    {
                        HeaderTotem ?
                            <div onClick={handleBack}>
                                <svg className="w-7 h-7 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12l4-4m-4 4 4 4" />
                                </svg>
                            </div>
                        :
                            <div onClick={handleShowDrawer}>
                                {
                                    useArea &&
                                        <IconHamburguer />
                                }
                            </div>
                    }

                    <div>
                        <Paragraph className={`font-bold ${HeaderTotem ? 'text-lg' : 'text-xs'}`}>
                            {Localidade}
                        </Paragraph>
                    </div>
                    <div>
                    
                        
                    </div>
                </section>
                <section className='bg-white flex flex-col gap-1 p-2 text-primary'>
                    <div className='flex items-center gap-2 p-1'>
                        {Icon}
                        <H3 className='text-[20px] font-bold'>
                            <strong>{Titulo}</strong>
                        </H3>
                    </div>
                    {
                        Search &&
                            <div>
                                <Input 
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    value={searchTerm}
                                    placeHolder='Pesquisar' 
                                    className='w-full mb-1'
                                    type='search' 
                                />
                            </div>
                    }
                    
                </section>
            </main>
        </nav>

        <Modal isOpen={showModal} onClose={setShowModal} headerColor='bg-primary' title='Confirmação'>
            {ContentModal}
        </Modal>

        <Drawer isOpen={showDrawer} onClose={handleShowDrawer}>
            <MenuContent typeModal={abrirModal} />
        </Drawer>

        </>
    );
};

export default Nav;