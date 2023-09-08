import React from 'react';
import './ParabensModal.css';

const ParabensModal = ({ onClose }) => {
  return (
    <div className="parabens-modal">
      <div className="parabens-content">
        <h2>Parabéns!</h2>
        <p>Todas as atividades foram concluídas. Você é incrível!</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default ParabensModal;
