'use client';

import React, { useState, useRef, useEffect } from 'react';


// @componentes
import Webcam        from "react-webcam";
import Center        from '@component/Layout/Center';
import Input         from '@component/Input';
import Button2       from '@component/Button2';
import { Paragraph } from '@component/Typography';
import Modal         from '@component/ap';
import API           from 'app/Service/API';
import Iconloading from './SvgsIcons/Iconloading';

const LoginFacial = ({ retorno }) => {


  const webRef                            = useRef(null)

  const [Cracha,        setCracha]        = useState('')
  const [ShowModal,     setShowModal]     = useState(false)
  const [TitleModal,    setTitleModal]    = useState('')
  const [CorModal,      setCorModal]      = useState('')
  const [ContentModal,  setContentModal]  = useState(null)
  const [Loading,       setLoading]       = useState(false)
  const [LoadingVideo,  setLoadingVideo]  = useState(true)

  const videoConstraints = {
      width:        330,
      height:       580,
      facingMode:   "user",
  };

  const validaUsuario = async (img, badg) => {

    setLoading(true);
    try {
      
      const login = await API.post('/login', {
        foto: img,
        key:  badg
      })

      let response = login.data;

      // Caso o retorno ocasionar em error
      if(!response.resposta) {
        setShowModal    (true)
        setCorModal     ('bg-[#FE5B3A]')
        setTitleModal   ('AVISO')
        setContentModal (<Paragraph className='text-textDefault'> {response.mensagem}</Paragraph>)
        setLoading(false)
        retorno(false)
        return false;
      }

      setShowModal    (true)
      setCorModal     ('bg-green-500')
      setTitleModal   ('AVISO')
      setContentModal (<Paragraph className='text-textDefault'> {response.mensagem}</Paragraph>)

      setLoading(false)
      
      // inicia sessão do usuário
      let arr = []
      arr.push(response)
      localStorage.setItem('user', JSON.stringify(arr))

      retorno(true)
      return true;

    } catch (error) {
      setLoading(false)
      retorno(false)
    }
  };

  const getImage = () => {
    return webRef.current.getScreenshot()
  }

  const processaImage = async () => {
    await validaUsuario(getImage().replace('data:image/jpeg;base64,', ''), Cracha)
  }

  async function insereCracha(e){
    setCracha(e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await processaImage();
  };

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingVideo(false)
      document.getElementById("chapa").focus()
    }, 1000);

    return () => clearTimeout(timer)
  }, [])
  

  return (
    <>
      <Center>
        <main className='flex flex-col gap-3 w-full p-1'>
          <section className='w-full flex items-center justify-center'>
            {
              LoadingVideo ? 
                <div className='flex flex-col items-center'>
                  <svg
                    aria-hidden='true'
                    role='status'
                    className='w-16 h-16 text-primary animate-spin dark:text-primary'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='#E5E7EB'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentColor'
                    />
                </svg>
              </div>
            :
              <Webcam
                ref={webRef}
                mirrored
                audio={false}
                className={`rounded-2xl `}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
            }
    
          </section>
          <section className='flex flex-col gap-1 text-gray-500 '>
            <Paragraph className='font-semibold text-sm'>
              Insira abaixo o código do crachá:
            </Paragraph>
            <form onSubmit={handleSubmit}>
              <Input className='w-full h-11 shadow-md' value={Cracha} disabled={Loading} id="chapa" autoFocus onChange={insereCracha} inputMode="numeric" type='number'/>
            </form>
          </section>
          <section className='flex flex-col gap-3'>
            <Button2 disabled={!Cracha.length || Loading} className='w-full disabled:opacity-50 disabled:cursor-not-allowed' size='large' onClick={processaImage}>
              {
              Loading ? 
                <Iconloading />
              : 
                <>Entrar</>
              }
            </Button2>
          </section>
        </main>
      </Center>

      <Modal existHeader headerColor={CorModal} isOpen={ShowModal} onClose={setShowModal} title={<Paragraph className='text-white font-bold text-sm'>{TitleModal}</Paragraph>}>
        {ContentModal}
      </Modal>
    </>
  );
};

export default LoginFacial;
