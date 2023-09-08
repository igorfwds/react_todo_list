import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const EditTodoForm = ({editTodo, task,deleteTodo}) => {
    const [value, setValue] = useState("")
    const handleSubmit= e =>{
        e.preventDefault();

        editTodo(value, task.id);
        setValue("")

    }

  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
        <input type='text' className='todo-input' value={value} placeholder='Atualize sua tarefa aqui' onChange={(e) => setValue(e.target.value)} />
        <button type='submit' className='todo-btn'>Atualizar Tarefa</button>
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} style={{ cursor: 'pointer' }} />
    </form>
    
  )
}
