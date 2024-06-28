import React, { useState, useCallback, useMemo } from 'react';

const TodoItem = React.memo(({ todo, toggleComplete, removeTodo }) => {
  console.log('Rendering TodoItem:', todo.id);
  return (
    <div>
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </span>
      <button onClick={() => removeTodo(todo.id)}>Remove</button>
    </div>
  );
});

const TodoList = ({ todos, toggleComplete, removeTodo }) => {
  console.log('Rendering TodoList');
  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
        />
      ))}
    </div>
  );
};

const AddTodoForm = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    addTodo(text);
    setText('');
  }, [addTodo, text]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build Todo App', completed: false },
  ]);

  const addTodo = useCallback((text) => {
    setTodos(todos => [
      ...todos,
      { id: Date.now(), text, completed: false }
    ]);
  }, []);

  const toggleComplete = useCallback((id) => {
    setTodos(todos => todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const removeTodo = useCallback((id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, []);

  const completedTodos = useMemo(() => todos.filter(todo => todo.completed), [todos]);

  console.log('Rendering App');

  return (
    <div>
      <AddTodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo} />
      <div>
        <h2>Completed Todos</h2>
        {completedTodos.map(todo => (
          <div key={todo.id}>{todo.text}</div>
        ))}
      </div>
    </div>
  );
};

export default App;

