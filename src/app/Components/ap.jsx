import React, { useEffect, useState } from 'react';
import IconCloseModal from './SvgsIcons/IconCloseModal';

const Modal = ({ isOpen, onClose, existHeader = false, title, headerColor, className, children }) => {
  const [showModal, setShowModal] = useState(isOpen);

  // Exibe o modal quando isOpen muda para true
  useEffect(() => {
    if (isOpen) setShowModal(true);
  }, [isOpen]);

  const handleOverlayClick = (event) => {
    if (event.target.id === 'modal-overlay') {
      onClose();
    }
  };

  // Ao terminar a transição de fechamento, remove o modal da tela
  const handleTransitionEnd = () => {
    if (!isOpen) setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div
      id="modal-overlay"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300`}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white ${className} shadow-lg w-11/12 max-w-lg relative
          transform transition-all duration-500 ease-in-out
          ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
        onTransitionEnd={handleTransitionEnd}
      >
        {existHeader ? (
          <div className={`p-2 ${headerColor}`}>
            <div className="flex justify-between items-center">
              <div className="ml-3 text-white">{title}</div>
              <div className="flex absolute right-[-5px] top-[-9px]">
                <button onClick={() => onClose(false)}>
                  <IconCloseModal />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex absolute right-[-5px] top-[-9px]">
            <button onClick={() => onClose(false)}>
              <IconCloseModal />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
