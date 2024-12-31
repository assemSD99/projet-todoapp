import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import axios from 'axios';

interface TodoInputProps {
  onAdd: (todo: { id: string; title: string; description: string; completed: boolean }) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        const response = await axios.post('http://localhost:8085/api/todos', {
          title: title.trim(),
          description: description.trim(),
          completed: false,
        });
        onAdd(response.data); // Passe l'objet Todo complet (avec ID et completed) au parent
        setTitle('');
        setDescription('');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre de la tâche..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (facultative)..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <PlusCircle className="inline w-5 h-5 mr-2" />
        Ajouter
      </button>
    </form>
  );
}
