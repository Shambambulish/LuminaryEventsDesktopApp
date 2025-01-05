import React, { useState } from 'react';
import { Box, Button, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


interface _Notes {
  id: number;
  title: string;
  text: string;
  time_changed: string;
}

export const Home = () => {
  const [notes, setNotes] = useState<_Notes[]>([
    {
      id: 1,
      title: "Meeting Notes",
      text: "Discuss project timeline and finalize the budget for Q1.",
      time_changed: "2024-12-01 14:30",
    },
  ]);
 
  const [newNote, setNewNote] = useState({ title: '', text: '' });
  const [editingNote, setEditingNote] = useState<_Notes | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateNote = () => {
    if (!newNote.title.trim() || !newNote.text.trim()) {
      setError('Title and text are required!');
      return;
    }
    const newId = notes.length ? notes[notes.length - 1].id + 1 : 1;
    const newNoteData: _Notes = {
      id: newId,
      title: newNote.title,
      text: newNote.text,
      time_changed: new Date().toISOString(),
    };

    setNotes([...notes, newNoteData]);
    setNewNote({ title: '', text: '' });
    setError(null);
  };

  const handleUpdateNote = () => {
    if (!editingNote || !editingNote.title.trim() || !editingNote.text.trim()) {
      setError('Title and text are required!');
      return;
    }

    const updatedNotes = notes.map((note) =>
      note.id === editingNote.id ? { ...editingNote, time_changed: new Date().toISOString() } : note
    );
    setNotes(updatedNotes);
    setEditingNote(null);
    setError(null);
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Notes
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <TextField
          label="Title"
          value={editingNote ? editingNote.title : newNote.title}
          onChange={(e) =>
            editingNote
              ? setEditingNote({ ...editingNote, title: e.target.value })
              : setNewNote({ ...newNote, title: e.target.value })
          }
        />
        <TextField
          label="Text"
          value={editingNote ? editingNote.text : newNote.text}
          onChange={(e) =>
            editingNote
              ? setEditingNote({ ...editingNote, text: e.target.value })
              : setNewNote({ ...newNote, text: e.target.value })
          }
        />
        <Button
          variant="contained"
          color="primary"
          onClick={editingNote ? handleUpdateNote : handleCreateNote}
        >
          {editingNote ? 'Update' : 'Add'}
        </Button>
      </Box>

      <List>
        {notes.map((note) => (
          <ListItem
            key={note.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #ccc',
              marginBottom: 1,
              borderRadius: 1,
              padding: 2,
            }}
          >
            <Box>
              <Typography variant="h6">{note.title}</Typography>
              <Typography>{note.text}</Typography>
              <Typography variant="caption" color="textSecondary">
                Last updated: {new Date(note.time_changed).toLocaleString()}
              </Typography>
            </Box>
            <Box>
              <IconButton color="primary" onClick={() => setEditingNote(note)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDeleteNote(note.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
