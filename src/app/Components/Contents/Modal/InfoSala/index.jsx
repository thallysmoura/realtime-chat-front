import React, { useState, useEffect } from 'react';
import { format } from "date-fns";


const InfoSala = ({ data, dataUser, RemoverIntegrante }) => {

    const { dadosSala } = data;

    // Estado local para integrantes
    const [integrantes, setIntegrantes] = useState(data.IntegrantesSala || []);

    // Atualiza o estado local caso a prop 'data.IntegrantesSala' mude
    useEffect(() => {
        setIntegrantes(data.IntegrantesSala || []);
    }, [data.IntegrantesSala]);

    const isAdmin = dataUser?.id === dadosSala?.id_usuario;

    // Função local que chama o RemoverIntegrante e também atualiza o estado local
    const handleRemoverIntegrante = (integrante) => {
        RemoverIntegrante(integrante);
        setIntegrantes((prev) => prev.filter(i => i.id !== integrante.id));
    };


    return (
        <main className='flex items-center justify-center flex-col gap-1'>
            <section id='infoSala' className='flex flex-col gap-1 items-center'>
                <div className="relative w-24 h-24 ">
                    <div className=" bg-gray-100 flex justify-center items-center w-full h-full object-cover rounded-full   ">
                        <svg className="w-14 h-14 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div>
                    <span className="text-xl font-bold text-gray-800 block truncate max-w-[550px]">
                        {dadosSala?.nome}
                    </span>
                </div>
                <div>

                </div>
                <div>
                    <div className=" truncate max-w-[550px]">
                        <span className="text-[12px] font-medium text-gray-500">
                            Criado por <strong>{dadosSala?.criador} em </strong> no dia {format(dadosSala?.data_criacao, "dd/MM/yyyy HH:mm")}h
                        </span>
                    </div>
                </div>
            </section>

            <section>
                <div className='p-1 px-2 flex text-[13px] font-bold  text-gray-500'>
                    <span>{integrantes.length} integrante{integrantes.length > 1 && 's'}</span>
                </div>
            </section>

         

            {
                isAdmin && (
                    <section className='flex flex-col justify-center gap-1 p-2 mt-1'>
                        <div>
                            <span className='text-sm text-gray-600 text-center'>
                                Convide pessoas para participar da sua sala
                            </span>
                        </div>

                        <div className='flex justify-center'>
                            <input
                                className='p-2 text-gray-500 cursor-pointer text-sm bg-gray-100  rounded-full w-[300px]'
                                type='text'
                                readOnly
                                value={dadosSala?.id}
                                onClick={() => {
                                    navigator.clipboard.writeText(dadosSala?.id);

                                }}
                            />
                        </div>
                    </section>
                )
            }




            <section id='listaIntegrantes' className='mt-4  p-2 flex flex-col gap-1 bg-gray-100 rounded w-full'>

                <section>
                    <div className='px-1 py-1 flex  text-xs font-medium  text-gray-600'>
                        <span>{integrantes.length} integrante{integrantes.length > 1 && 's'}</span>
                    </div>
                </section>

                {
                    integrantes?.map((i, index) => {
                        const nome = i.nome === dataUser?.nome ? "Você" : i.nome;
                        const isMe = i.nome === dataUser?.nome ? true : false
                        const isRemovido = i.tipo_integrante === 3;

                        return (
                            <div key={index} className="flex shadow-md justify-between  w-full max-w-lg bg-white p-2  rounded-lg flex-wrap">

                                {/* Informações do usuário */}
                                <section className="flex  items-center gap-2 flex-1   truncate min-w-[200px]">
                                    <img
                                        src={i.photo}
                                        alt="Avatar"
                                        className="w-8 h-8 rounded-full object-cover bg-white"
                                    />
                                    <span className="text-xs font-semibold text-gray-700">
                                        {nome}
                                    </span>
                                    {
                                        i.id === dadosSala?.id_usuario && (
                                            <div className=' p-1 bg-[#174c3b] text-[#B2DDB2] flex gap-1  text-[8px] rounded-full px-2'>
                                                <div>
                                                    <svg className="w-3 h-3 text-[#B2DDB2]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z" />
                                                    </svg>
                                                </div>
                                                <div className=''>
                                                    Admin
                                                </div>


                                            </div>
                                        )
                                    }
                                </section>

                                {/* Ações */}
                                <section className="flex gap-2 justify-end items-center flex-1 min-w-[200px]">
                                    {
                                        (isAdmin && !isMe) && (
                                            <button onClick={() => handleRemoverIntegrante(i)} className="   px-2 py-1 bg-[#B73E4A] hover:bg-[#8d2e38] text-xs text-white rounded-full ">
                                                Remover
                                            </button>
                                        )
                                    }
                                    {
                                        !isMe && (
                                            <button className="px-2 py-1 bg-[#b08e1e] hover:bg-[#816d2c] text-xs text-white rounded-full ">
                                                Denunciar
                                            </button>
                                        )
                                    }

                                </section>
                            </div>

                        );
                    })

                }
            </section>

            <section className='w-full mt-1'>


                <div className='bg-gray-50 rounded-lg gap-2 w-full p-2 flex flex-col mt-1 cursor-pointer'>

                    <div className='flex justify-start gap-1 w-full max-w-lg bg-white p-2 rounded-lg flex-wrap'>
                        <div className=' flex items-center justify-center'>
                            <svg className="w-5 h-5 text-danger " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                            </svg>
                        </div>
                        <div className='flex text-sm font-medium  text-danger  '>
                            <span>Sair da Sala</span>
                        </div>
                    </div>



                </div>






            </section>
        </main>
    );
};

export default InfoSala;
