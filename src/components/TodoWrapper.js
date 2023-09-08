import React,{useState} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid'
import { Todo } from './Todo'
import { EditTodoForm } from './EditTodoForm'
uuidv4()

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([])
    const addTodo = todo=> {
        setTodos([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false } ])
        console.log(todos);
    }

    const toggleComplete = (id) => {
        setTodos((prevTodos) => {
          const updatedTodos = prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          );
      
          // Mova as tarefas concluídas para o final do array
          const completedTodos = updatedTodos.filter((todo) => todo.completed);
          const incompleteTodos = updatedTodos.filter((todo) => !todo.completed);
      
          return [...incompleteTodos, ...completedTodos];
        });
      };
      
    const deleteTodo = id =>{
        setTodos(todos.filter(todo => todo.id !== id))
    }
    const editTodo = id =>{
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing}: todo))
    }
    const editTask = (task,id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing, completed: false}: todo))
    }

  return (
    <div className='TodoWrapper'>
        <h1>Task Manager</h1>
        <TodoForm addTodo={addTodo} />
        <div class="todos">
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} />
                ) : (
                    <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                )
            
            ) )}
        </div>
    </div>
  )
}