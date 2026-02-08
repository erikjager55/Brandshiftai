import { useState } from 'react';
import { FileText, Plus } from 'lucide-react';

interface Note {
  id: string;
  author: string;
  date: string;
  content: string;
}

interface AssetNotesProps {
  notes: Note[];
  onAddNote: (content: string) => void;
}

export function AssetNotes({ notes, onAddNote }: AssetNotesProps) {
  const [newNote, setNewNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Notes list */}
      <div className="flex-1 overflow-y-auto p-4">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FileText className="h-8 w-8 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">No notes yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="bg-muted/50 dark:bg-muted/30 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{note.author}</span>
                  <span className="text-xs text-muted-foreground">{note.date}</span>
                </div>
                <p className="text-sm">{note.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add note form */}
      <form onSubmit={handleSubmit} className="p-4 border-t dark:border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="flex-1 rounded-lg border dark:border-border bg-background dark:bg-card p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={!newNote.trim()}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">Add</span>
          </button>
        </div>
      </form>
    </div>
  );
}
