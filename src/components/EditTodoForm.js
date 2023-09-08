import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const EditTodoForm = ({ editTodo, task, deleteTodo, cancelEdit }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task.id);
  };

  const handleCancelEdit = () => {
    // Cancela a edição, restaura o valor anterior e fecha o formulário de edição
    setValue(task.task);
    cancelEdit();
  };

  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
      <input
        type='text'
        className='todo-input'
        value={value}
        placeholder='Atualize sua tarefa aqui'
        onChange={(e) => setValue(e.target.value)}
      />
      <button type='submit' className='todo-btn'>
        Atualizar Tarefa
      </button>
      <button type='button' className='todo-btn-cncl' onClick={handleCancelEdit}>
        Cancelar
      </button>
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => deleteTodo(task.id)}
        style={{ cursor: 'pointer' }}
        className='lata_de_lixo'
      />
    </form>
  );
};
