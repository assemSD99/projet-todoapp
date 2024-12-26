import { Trash2, Check, X } from 'lucide-react';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void; // Passe uniquement l'ID
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className={`flex flex-col p-4 ${todo.completed ? 'bg-gray-50' : 'bg-white'} border rounded-lg shadow-sm`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggle(todo.id)} // Envoie l'ID à la fonction onToggle
            className={`p-1 rounded-full ${
              todo.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
            }`}
          >
            {todo.completed ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
          <span className={todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}>
            {todo.title}
          </span>
        </div>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <p className="mt-2 text-gray-500">{todo.description}</p>
    </div>
  );
}
