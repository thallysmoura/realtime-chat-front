// ChatArea (componente filho)
'use client'

import { isUrl } from "@utils/Utils";
import { useEffect, useState, useRef } from "react"
import IframeMessage from "../IframeMessage";
import SendMessageIcon from "@component/SvgsIcons/SendMessageIcon";


  

export default function ChatArea({ dadosSala, dataUser, usuariosOnline, digitando, clickInfoSala, sair, mensagens, mensagensRef, mensagem, setMensagem, setMensagens, enviarMensagem, id, timeoutRef, socket, replyTo, setReplyTo }) {

    
function renderMensagem(msg) {

    const { texto, deletada, resposta_id} = msg;
    const nomeExibido = msg.resposta_nome === dataUser?.nome ? "Você" : msg.resposta_nome;

    if (resposta_id !== null ) {
        return <section className="flex gap-1 flex-col">
           <div className="bg-[#f1ffe7] text-sm border-l-4 border-l-[#b4aba2] text-gray-800 p-2 flex flex-col rounded-lg">

                <div className="font-medium">
                    { nomeExibido }
                </div>
                <div>
                    {msg.resposta_texto}
                </div>
            
            </div>
            <div>
                {msg.texto}
            </div>
        </section>
     }

     if (deletada) {
        return <section className="flex gap-1 items-center">
            <div>
                <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

            </div>
            <div>
                <div className="italic text-gray-500 ">
                    mensagem apagada
                </div>

            </div>
        </section>
     }
  
     if (isUrl(texto.trim())) {
      return <IframeMessage texto={texto} />;
    }

        return <div>{texto}</div>;
    
  
   
  }
   
    const [modalAberta, setModalAberta] = useState(false);

    // control dropdown por mensagem
    const [openMenuIndex, setOpenMenuIndex] = useState(null)
    const longPressTimeout = useRef(null)
    const messageRefs = useRef({})

    // @ método responsável pelo auto-scroll para o bottom da página ao receber novas mensagens;
    useEffect(() => {
        if (mensagensRef.current) {
            mensagensRef.current.scrollTop = mensagensRef.current.scrollHeight
        }
    }, [mensagens])

  


    const copiarCodigo = () => {
        navigator.clipboard.writeText(dadosSala?.dadosSala?.id).then(() => {
            setModalAberta(false)
        });
    };

    function copyText(texto) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(texto).then(() => {
          }).catch((err) => {
            console.error("Erro ao copiar:", err);
          });
        } else {
          // Fallback para navegadores antigos
          const textarea = document.createElement("textarea");
          textarea.value = texto;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
       
        }
        setOpenMenuIndex(false)
      }
      

    async function abrirModalShare() {
        setModalAberta(!modalAberta)
    }

    function handleInputChange(e) {
        const valor = e.target.value
        setMensagem(valor)

        if (socket) {
          socket.emit("digitando", { status: valor !== "", sala: id })
        }

        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            if (socket) {
              socket.emit("digitando", { status: false, sala: id })
            }
        }, 1500)
    }

    

    async function handleExcluirMensagem(mensagem) {
     
        socket.emit("deletarMensagem",
          { mensagem: { id_mensagem: mensagem.id_mensagem, sala: id} },
          (resposta) => {
            if (resposta?.success) {
                setOpenMenuIndex(false)
                // setMensagens((mensagensAnteriores) =>
              //  mensagensAnteriores.filter((m) => m.id_mensagem !== resposta.idMensagem)
             // );
            } else {
                setOpenMenuIndex(false)
              console.warn("Erro ao deletar:", resposta?.error);
            }
          }
        );
      }

    // Ao selecionar responder, guardamos a mensagem completa (objeto msg)
    function handleResponder(msg) {
        setReplyTo(msg)
        setOpenMenuIndex(null)
        document.getElementById("campoMensagem").focus()
    }

    // cancelar resposta
    function cancelarResposta() {
        setReplyTo(null)
    }

    // handlers de long-press / click
    function startPress(i) {
        clearTimeout(longPressTimeout.current)
        longPressTimeout.current = setTimeout(() => {
            setOpenMenuIndex(i)
        }, 600) // 600ms long press
    }

    function cancelPress() {
        clearTimeout(longPressTimeout.current)
    }

    // também abre menu no click direito
    function handleContextMenu(e, i) {
        e.preventDefault()
        setOpenMenuIndex(i)
    }

    // fechar menu quando clicar fora
    useEffect(() => {
        function onDocClick(e) {
            // se clicar fora dos refs de menu, fechar
            const anyRef = Object.values(messageRefs.current).some(r => r && r.contains(e.target))
            if (!anyRef) setOpenMenuIndex(null)
        }
        document.addEventListener("click", onDocClick)
        return () => document.removeEventListener("click", onDocClick)
    }, [])

    return (
        <>
            <div className="mx-auto h-screen flex flex-col py-0 px-0 ">
                {/* Header */}
                <div className="flex px-5 gap-0 h-[65px] fixed top-0 w-full bg-white justify-between items-center py-1 border-b border-gray-300 z-10">
                    
                    <section className="flex gap-2 items-start space-y-0">
                        <div className="relative w-12 h-12 ">
                            <div className=" bg-gray-100 flex justify-center items-center w-full h-full object-cover rounded-full   ">
                                <svg className="w-8 h-8 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <section className="flex flex-col gap-0">
                                <div onClick={clickInfoSala} className="cursor-pointer">
                                    <span className="text-base font-medium  text-gray-700 block truncate max-w-[550px]">
                                        {dadosSala?.dadosSala?.nome}
                                    </span>
                                </div>
                                <div className=" truncate max-w-[550px]">   
                                    {(() => {
                                        const integrantesFiltrados = dadosSala?.IntegrantesSala?.filter(
                                            ({ tipo_integrante }) => tipo_integrante === 1 || tipo_integrante === 2
                                        ) || [];

                                        return integrantesFiltrados.map(({ nome }, index) => {
                                            const nomeExibido = nome === dataUser?.nome ? "você" : nome;
                                            const isLast = index === integrantesFiltrados.length - 1;

                                            return (
                                                <span
                                                    key={index}
                                                    className="text-[13px] font-medium text-gray-500"
                                                >
                                                    {nomeExibido}
                                                    {!isLast && ','}&nbsp;
                                                </span>
                                            );
                                        });
                                    })()}


                                </div>
                            </section>
                        </div>
                        
                    </section>


{/*
                    <div className="flex flex-col text-center gap-0">
                        <span className="text-xl font-bold animate-slideIn text-[#405DA1]">

                            {dadosSala.nome}
                        </span>
                        <div className="text-center">
                            <button onClick={abrirModalShare} className="text-xs text-center text-gray-700  hover:text-gray-800 transition" >
                                Clique para convidar amigos
                            </button>
                        </div>
                    </div>
    */}
                    <button onClick={sair} className="text-sm text-gray-700 animate-slideIn font-bold p-3" title="Sair do chat">
                        <svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                        </svg>
                        Sair
                    </button>
                </div>

                {/* Mensagens */}
                <div ref={mensagensRef} className="flex-1  overflow-y-auto bg-[#e5ddd5] p-3 space-y-2 pb-[140px] mt-[65px]" >
                    {mensagens.map((msg, i) => {
                     
                        const isMinhaMensagem = msg.id === dataUser?.id
                        const wrapperRefSetter = (el) => { messageRefs.current[i] = el }

                        return (
                            <div key={i} className={`flex ${isMinhaMensagem ? "justify-end" : "justify-start"}`}>
                                {(!isMinhaMensagem) && (msg.tipo !== 0) && (
                                    <div className="relative flex items-end mr-1">
                                        <div className="w-8 h-8">
                                            <img
                                                src={msg.photo}
                                                alt="Foto de perfil"
                                                className="w-full h-full object-cover rounded-full shadow-md"
                                                draggable={false}
                                            />
                                            
                                            {
                                                //  msg.online == 1 &&
                                                //<span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white"></span>

                                            }

                                        </div>
                                    </div>
                                )}
                                <div
                                    ref={wrapperRefSetter}
                                    onMouseDown={() => startPress(i)}
                                    onMouseUp={() => cancelPress()}
                                    onMouseLeave={() => cancelPress()}
                                    onTouchStart={() => startPress(i)}
                                    onTouchEnd={() => cancelPress()}
                                    onContextMenu={(e) => handleContextMenu(e, i)}
                                    className={`max-w-[75%] px-4 py-2 rounded-lg text-base relative 
                                    flex flex-col break-words 
                                    ${isMinhaMensagem
                                            ? "bg-[#dcf8c6] text-gray-800 rounded-br-none shadow-md self-end"
                                            : (msg.tipo == 0)
                                                ? "bg-transparent text-gray-800 font-sans text-sm self-start"
                                                : "bg-white text-gray-800 rounded-bl-none shadow-md self-start"
                                        }`}
                                >
                                    {!isMinhaMensagem && (
                                        <div className="text-xs font-semibold text-black mb-1">
                                            {msg.nome}
                                        </div>
                                    )}

                     

                                    <div className="flex flex-wrap justify-between items-end gap-1">
                                        {/* Texto da mensagem */}
                                        <div className="max-w-[250px] mr-1 break-words">
                                            {renderMensagem(msg)}
                                        </div>

                                        {/* Hora alinhada à direita */}
                                        <div className="text-gray-600 text-[9px] relative top-2 left-2 whitespace-nowrap ml-auto">
                                            {msg.data_envio}
                                        </div>
                                    </div>

                                    {/* dropdown de ações da mensagem */}
                                    {msg.deletada != 1 && openMenuIndex === i && (
                                        
                                        <div className="absolute -top-10 right-0 z-20">
                                            <div className="bg-white rounded-2xl  py-2 px-3 animate-slideIn">
                                                <section className="flex gap-2 justify-start items-center hover:opacity-50">
                                                    <div>
                                                        <svg className="w-5 h-5 text-gray-700  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M14.502 7.046h-2.5v-.928a2.122 2.122 0 0 0-1.199-1.954 1.827 1.827 0 0 0-1.984.311L3.71 8.965a2.2 2.2 0 0 0 0 3.24L8.82 16.7a1.829 1.829 0 0 0 1.985.31 2.121 2.121 0 0 0 1.199-1.959v-.928h1a2.025 2.025 0 0 1 1.999 2.047V19a1 1 0 0 0 1.275.961 6.59 6.59 0 0 0 4.662-7.22 6.593 6.593 0 0 0-6.437-5.695Z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <button
                                                            onClick={() => handleResponder(msg)}
                                                            className="text-sm text-gray-700  py-2 block font-medium"
                                                        >
                                                            Responder
                                                        </button>
                                                    </div>
                                                </section>
                                                <section className="flex gap-2 justify-start items-center hover:opacity-50">
                                                    <div>
                                                        <svg className="w-5 h-5 text-gray-700  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clipRule="evenodd" />
                                                            <path fillRule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                                                        </svg>


                                                    </div>
                                                    <div>
                                                        <button
                                                            onClick={() => copyText(msg.texto)}
                                                            className="text-sm text-gray-700  py-2 block font-medium"
                                                        >
                                                            Copiar
                                                        </button>
                                                    </div>
                                                </section>
                                                    {
                                                        isMinhaMensagem && (
                                                            <section className="flex gap-2 justify-start items-center ">
                                                            <div>
                                                                <svg className="w-5 h-5 text-gray-700 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <button
                                                                    onClick={() => handleExcluirMensagem(msg)}
                                                                    className="text-sm text-gray-700  py-2 block font-medium hover:text-danger"
                                                                >
                                                                    Excluir
                                                                </button>
                                                            </div>
                                                        </section>
                                                        )
                                                    }
                                                       
                                                    
                                                
                                               
                                                {/* Aqui você pode adicionar mais ações (copiar, encaminhar, apagar, etc.) */}
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        )
                    })}
                </div>

                {/* Campo de mensagem */}
                <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 p-2">
                    {/* preview da resposta quando replyTo existe */}
                    {replyTo && (
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-2 mb-2 mx-1 flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                                <div className="text-[13px]  text-gray-700 truncate">Respondendo para <span className="font-semibold">{replyTo.nome}</span></div>
                                <div className="text-[13px] text-gray-800 truncate">{replyTo.texto}</div>
                            </div>
                            <button onClick={cancelarResposta} className="ml-2 text-gray-500 text-sm px-2 py-1">✕</button>
                        </div>
                    )}

                    <div className="bg-transparent text-gray-800 relative -top-1 p-0 text-xs mb-1">
                        {digitando.filter((n) => n !== dataUser?.nome).length > 0 && (
                            <span>
                                {digitando.filter((n) => n !== dataUser?.nome).join(", ")} está digitando...
                            </span>
                        )}
                    </div>
                    <div className="flex w-full gap-2">
                        <input
                            type="text"
                            className="flex-1 text-base p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={mensagem}
                            id="campoMensagem"
                            onChange={handleInputChange}
                            onKeyDown={(e) => { if (e.key === "Enter") enviarMensagem() }}
                            placeholder="Digite uma mensagem"
                        />
                        <button
                            onClick={enviarMensagem}
                            disabled={!mensagem.trim()}
                            className="bg-green-500 disabled:opacity-30 text-white px-6 py-3 rounded-full whitespace-nowrap hover:bg-green-600"
                            aria-label="Enviar mensagem"
                        >
                            <SendMessageIcon />
                        </button>
                    </div>
                </div>
            </div>


            {/* Modal */}
            {modalAberta && (
                <div className="absolute top-14 left-0 right-0 mx-auto w-80 p-3 bg-white shadow-xl rounded-xl border z-10">
                    <p className="text-[13px] text-gray-800 mb-2">
                        Compartilhe este código com seus amigos para entrarem na sala:
                    </p>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={dadosSala?.dadosSala?.id}
                            readOnly
                            className="flex-1 px-2 py-2 border rounded text-sm"
                        />
                        <button
                            onClick={copiarCodigo}
                            className="bg-blue-600 text-white px-5 py-2 rounded text-xs hover:bg-blue-700"
                        >
                            Copiar
                        </button>
                    </div>
                    <button
                        onClick={() => setModalAberta(false)}
                        className="text-xs  text-blue-800 mt-5  "
                    >
                        Fechar
                    </button>
                </div>
            )}

        </>
    )
}
