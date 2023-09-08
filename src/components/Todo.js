import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { EditTodoForm } from './EditTodoForm';

export const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  const taskClassName = task.completed ? 'completed-task' : '';

  return (
    <div className={`Todo ${taskClassName}`}>
      <p
        onClick={() => toggleComplete(task.id)}
        className={`${task.completed ? 'completed' : ''}`}
      >
        {task.task}
      </p>
      <div>
        {!task.completed && (
          <>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} className='caneta_de_edicao'/>
          </>
        )}
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} className='lata_de_lixo'/>
      </div>
    </div>
  );
};
