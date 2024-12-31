import { useState, useEffect } from 'react';
import { ListTodo } from 'lucide-react';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { Todo } from './types/todo';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Charger les tâches depuis le backend
  useEffect(() => {
    axios
      .get('http://localhost:8085/api/todos')
      .then((response) => setTodos(response.data))
      .catch((error) => console.error('Erreur lors du chargement des tâches', error));
  }, []);

  // Ajouter une nouvelle tâche
  const addTodo = (todo: Todo) => {
    setTodos([todo, ...todos]);
  };

  // Basculer l'état "completed" d'une tâche
  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const response = await axios.put(`http://localhost:8085/api/todos/${id}`, {
        ...todo,
        completed: !todo.completed, // Inverser l'état actuel
      });
      setTodos(todos.map((t) => (t.id === id ? response.data : t))); // Mettre à jour l'état local
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche', error);
    }
  };

  // Supprimer une tâche
  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8085/api/todos/${id}`);
      setTodos(todos.filter((t) => t.id !== id)); // Retirer la tâche supprimée
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche', error);
    }
  };

  // Compter les tâches complétées
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        {/* En-tête */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ListTodo className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
          </div>
          <p className="text-gray-600">
            {todos.length === 0
              ? 'Commencez par ajouter une tâche !'
              : `${completedCount} sur ${todos.length} tâches complétées`}
          </p>
        </div>

        {/* Contenu */}
        <div className="space-y-6">
          {/* Composant d'ajout de tâche */}
          <TodoInput onAdd={addTodo} />

          {/* Liste des tâches */}
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo} // Passer directement l'ID à toggleTodo
                onDelete={deleteTodo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
