import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import ParabensModal from './ParabensModal';

uuidv4();

export const TodoWrapper = () => {
  // Estado para armazenar as tarefas
  const [todos, setTodos] = useState([]);
  // Estado para controlar a visibilidade do modal de parabenização
  const [modalVisible, setModalVisible] = useState(false);

  // Função para adicionar uma nova tarefa
  const addTodo = (todo) => {
    // Verifica se a tarefa já existe na lista
    if (!todos.some((existingTodo) => existingTodo.task.toLowerCase() === todo.toLowerCase())) {
      // Adiciona a nova tarefa à lista de tarefas
      setTodos((prevTodos) => {
        const updatedTodos = [
          ...prevTodos,
          { id: uuidv4(), task: todo, completed: false, isEditing: false },
        ];
        localStorage.setItem('tarefas', JSON.stringify(updatedTodos)); // <- Atualização imediata do localStorage
        return updatedTodos;
      });
    } else {
      // Exibe uma mensagem de erro se a tarefa já existe
      alert("Esta tarefa já existe na lista.");
    }
  };

  // Função para marcar uma tarefa como concluída ou não concluída
  const toggleComplete = (id) => {
    setTodos((prevTodos) => {
      // Atualiza o estado das tarefas, marcando a tarefa com o ID correspondente como concluída ou não concluída
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );

      // Mova as tarefas concluídas para o final do array
      const completedTodos = updatedTodos.filter((todo) => todo.completed);
      const incompleteTodos = updatedTodos.filter((todo) => !todo.completed);

      // Retorna a lista atualizada com as tarefas não concluídas seguidas pelas tarefas concluídas
      const finalTodos = [...incompleteTodos, ...completedTodos];
      localStorage.setItem('tarefas', JSON.stringify(finalTodos)); // <- Atualização imediata do localStorage
      return finalTodos;
    });
  };

  // Função para excluir uma tarefa
  const deleteTodo = (id) => {
    // Remove a tarefa com o ID correspondente da lista de tarefas
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
      localStorage.setItem('tarefas', JSON.stringify(updatedTodos)); // <- Atualização imediata do localStorage
      return updatedTodos;
    });
  };

  // Função para entrar no modo de edição de uma tarefa
  const editTodo = (id) => {
    setTodos((prevTodos) =>
      // Alterna o estado de edição da tarefa com o ID correspondente
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Função para editar o texto de uma tarefa
  const editTask = (newTask, id) => {
    // Verifica se a nova tarefa é igual a alguma tarefa existente (ignorando letras maiúsculas/minúsculas) e exclui a tarefa atual
    if (!todos.some((existingTodo) => existingTodo.task.toLowerCase() === newTask.toLowerCase() && existingTodo.id !== id)) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id
            ? { ...todo, task: newTask, isEditing: !todo.isEditing, completed: false }
            : todo
        )
      );
  
      // Atualiza o localStorage após a edição
      const updatedTodos = todos.map((todo) =>
        todo.id === id
          ? { ...todo, task: newTask, isEditing: !todo.isEditing, completed: false }
          : todo
      );
  
      localStorage.setItem('tarefas', JSON.stringify(updatedTodos));
    } else {
      // Exibe uma mensagem de erro se a tarefa já existe
      alert("Esta tarefa já existe na lista.");
    }
  };

  // Efeito colateral para verificar se todas as atividades foram concluídas e mostrar o modal de parabenização
  useEffect(() => {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas'));
    if (tarefasSalvas) {
      setTodos(tarefasSalvas);
    }
  }, []);

  // Efeito colateral para atualizar o modal de parabenização com base nas tarefas concluídas
  useEffect(() => {
    const todasAtividadesConcluidas = todos.every((todo) => todo.completed);

    // Verifica se todas as atividades estão concluídas e se há pelo menos uma tarefa na lista
    if (todasAtividadesConcluidas && todos.length > 0) {
      // Define o modal de parabenização como visível
      setModalVisible(true);
    } else {
      // Define o modal de parabenização como oculto
      setModalVisible(false);
    }
  }, [todos]);

  // Função para fechar o modal de parabenização
  const handleCloseModal = () => {
    // Define o modal de parabenização como oculto
    setModalVisible(false);
  };

  return (
    <div className='TodoWrapper'>
      <h1>Task Manager</h1>
      {/* Componente para adicionar novas tarefas */}
      <TodoForm addTodo={addTodo} />
      <div className="todos">
        {/* Mapeia e renderiza a lista de tarefas */}
        {todos.map((todo, index) =>
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo} deleteTodo={deleteTodo}/>
          ) : (
            <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
          )
        )}
      </div>
      {/* Renderiza o modal de parabenização quando a condição é verdadeira */}
      {modalVisible && <ParabensModal onClose={handleCloseModal} />}
    </div>
  );
};
