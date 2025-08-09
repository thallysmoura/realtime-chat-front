import React from 'react';
import IconCloseModal from './SvgsIcons/IconCloseModal';

const Modal = ({ isOpen, onClose, existHeader = false,title, headerColor, className, children }) => {
  if (!isOpen) return null;

  // Função para fechar o modal ao clicar fora dele
  const handleOverlayClick = (event) => {
    if (event.target.id === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div id="modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
      <div className={`bg-white rounded-lg ${className} animate-slideIn  shadow-lg w-11/12 max-w-lg relative`}>
        {
          existHeader ? 
            <div className={`p-2 rounded-t-lg ${headerColor}`}>
              <div className="flex justify-between items-center">
                <div className="ml-3 text-white">{title}</div>
                  <div className='flex absolute right-[-5px] top-[-9px]'>
                    <button onClick={()=>onClose(false)}>
                      <IconCloseModal />
                    </button>
                  </div>
                </div>
              </div>
          :
          <div className='flex absolute right-[-5px] top-[-9px]'>
              <button onClick={()=>onClose(false)}>
                <IconCloseModal />
              </button>
          </div>
        }
        <div className="p-6" >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
