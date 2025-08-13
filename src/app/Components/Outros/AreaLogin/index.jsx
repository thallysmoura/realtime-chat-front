import React from 'react';

const AreaLogin = () => {
    return (
        <div>
            <div className="flex flex-col items-center gap-2">
                <div
                    className={`p-[5px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 ${isAuthenticated ? 'cursor-default' : 'cursor-pointer'} `}
                    onClick={() => { inputImagemRef.current?.click() }}
                >
                    <img
                        src={foto}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover bg-white"
                    />
                </div>

                <input
                    type="file"
                    accept="image/*"
                    ref={inputImagemRef}
                    onChange={handleSelecionarImagem}
                    className="hidden"
                />
                <small className="text-gray-500 cursor-pointer hover:underline" onClick={() => inputImagemRef.current?.click()}>
                    Alterar foto de perfil
                </small>
            </div>

            {/* Nome */}
            <div className="flex flex-col gap-1">
                <small hidden={isAuthenticated} className="text-gray-600">Pra começar, informe seu nome abaixo:</small>

                <input
                    type="text"
                    autoFocus
                    placeholder="Ex: João"
                    className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                {erros.nome && <small className="text-red-500">{erros.nome}</small>}
            </div>



            {/* Botão Criar */}
            <div>
                <button
                    onClick={Entrar}
                    className="w-full bg-[#405DA1] text-white px-4 py-2 rounded-md hover:bg-[#31477a] disabled:opacity-50 disabled:cursor-wait"
                >
                    {carregando ? 'Aguarde...' : 'Entrar'}
                </button>



            </div>
        </div>
    );
};

export default AreaLogin;