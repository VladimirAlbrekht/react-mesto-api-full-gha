import React from 'react';

//---ЗАКРЫТИЕ ПО ESC---
function useEscapeClose (isOpen, onClose) {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (event) => {
      if (event.key === 'Escape') onClose();
    };
    
    document.addEventListener("keydown", handleEscapeClose);
    return () => document.removeEventListener("keydown", handleEscapeClose);
  }, [isOpen, onClose]);
}

export default useEscapeClose;

 