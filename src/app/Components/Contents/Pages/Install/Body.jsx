import React, { useState, useEffect } from 'react';

// @layout
import Center               from '@component/Layout/Center';

// @Components
import Modal                from '@component/ap';
import InstruInstallPWA     from '@component/InstruInstallPWA';

// @utils
import { detectBrowserUser, detectDeviceUser } from '@utils/Utils';
import IconDownload from '@component/SvgsIcons/IconDownload';

const Body = () => {
    
    const [showInstallModal, setShowInstallModal]   = useState(true)
    const [showSuccessModal, setShowSuccessModal]   = useState(false)
    const [deviceType, setDeviceType]               = useState('')
    const [browserType, setBrowserType]             = useState('')
    const [deferredPrompt, setDeferredPrompt]       = useState(null)

    useEffect(() => {
        setDeviceType   (detectDeviceUser());
        setBrowserType  (detectBrowserUser());

        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setDeferredPrompt(event); // Armazena o evento para uso posterior
        };

        const handleAppInstalled = () => {
            setShowSuccessModal(true); // Mostra a modal de sucesso quando o aplicativo é instalado
            setShowInstallModal(false); // Fecha a modal de instalação
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstall = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Mostra o prompt de instalação
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Usuário aceitou o prompt de instalação');
                } else {
                    console.log('Usuário rejeitou o prompt de instalação');
                }
                setDeferredPrompt(null); // Limpa o evento armazenado
            });
        }
    };

    return (
        <>
            {deviceType && browserType && showInstallModal && (
                <Modal
                    className='animate-slideIn'
                    isOpen={showInstallModal}
                    onClose={() => setShowInstallModal(false)}
                    title={`Instalação para ${deviceType}`}
                    headerColor='bg-primary'
                >
                    <Center className='flex-col'>
                        <h1 className='text-textDefault text-[17px]'>
                            Siga as etapas abaixo para realizar a instalação deste aplicativo em seu {deviceType}:
                        </h1>
                        <br />
                        <InstruInstallPWA deviceType={deviceType} browserType={browserType} />
                        {
                            deviceType !== 'iOS' && 
                                <button onClick={handleInstall} className='w-full mt-4 px-4 py-2 bg-primary text-white rounded' >
                                    Instalar
                                </button>
                        }
                        
                    </Center>
                </Modal>
            )}

            {showSuccessModal && (
                <Modal className='animate-slideIn' isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}title='Instalação Concluída' headerColor='bg-success'
                >
                    <Center className='flex-col'>
                        <h1 className='text-textDefault text-[17px]'>
                            A instalação foi concluída com sucesso!
                        </h1>
                        <br />
                        <p className='text-textDefault'>
                            Agora você pode acessar o aplicativo diretamente a partir da tela inicial do seu dispositivo.
                        </p>
                    </Center>
                </Modal>
            )}
        </>
    );
};

export default Body;
