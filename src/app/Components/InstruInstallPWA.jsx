import React from 'react';

const InstruInstallPWA = ({ deviceType, browserType }) => {
  const renderInstructions = () => {
    if (deviceType === 'Android') {
      if (browserType === 'Chrome') {
        return (
          <>
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg">
              1. Toque no ícone de três pontos no canto superior direito.
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              2. Selecione a opção <b>"Adicionar à Tela de Início".</b>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              3. Toque em "Adicionar" para confirmar.
            </li>
          </>
        );
      }
      // Adicione outras opções de navegador para Android, se necessário
    } else if (deviceType === 'iOS') {
      if (browserType === 'Safari') {
        return (
          <>
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg">
              1. Toque no ícone de compartilhamento na parte inferior da tela.
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              2. Role para baixo e selecione a opção <b>"Adicionar à Tela de Início".</b>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              3. Toque em "Adicionar" no canto superior direito.
            </li>
          </>
        );
      } else if (browserType === 'Chrome') {
        return (
          <>
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg">
              1. Toque no ícone de compartilhamento no canto superior direito.
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              2. Selecione a opção <b>"Adicionar à Tela de Início".</b>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              3. Toque em "Adicionar" no canto superior direito.
            </li>
          </>
        );
      }
    } else if (deviceType === 'Desktop') {
      if (browserType === 'Chrome') {
        return (
          <>
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg">
              1. Clique no ícone de três pontos no canto superior direito.
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              2. Selecione a opção <b>"Instalar".</b>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              3. Clique em "Instalar" na janela que aparece.
            </li>
          </>
        );
      } else if (browserType === 'Firefox') {
        return (
          <>
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg">
              1. Clique no ícone de menu no canto superior direito.
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              2. Selecione a opção <b>"Instalar".</b>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              3. Clique em "Instalar" para confirmar.
            </li>
          </>
        );
      } else if (browserType === 'Edge') {
        return (
          <>
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg">
              1. Clique no ícone de três pontos no canto superior direito.
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              2. Selecione a opção <b>"Instalar".</b>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              3. Clique em "Instalar" na janela que aparece.
            </li>
          </>
        );
      } else if (browserType === 'Safari') {
        return (
          <>
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg">
              1. No menu superior, selecione <b>"Instalar".</b>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              2. Clique em "Instalar" para confirmar.
            </li>
          </>
        );
      }
    }

    // Mensagem padrão caso nenhum caso se aplique
    return (
      <>
        <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg">
          1. Procure a opção para <b>"Adicionar à Tela de Início" ou "Instalar".</b>
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200">
          2. Siga as instruções para confirmar a instalação.
        </li>
      </>
    );
  };

  return (
    <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
      {renderInstructions()}
    </ul>
  );
};

export default InstruInstallPWA;
