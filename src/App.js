import { useState } from 'react';
import './App.css';
import Preview from './components/Preview';
import Message from './components/Message';
import NotesContainer from './components/Notes/NotesContainer';
import NotesList from './components/Notes/NotesList';
import Note from './components/Notes/Note';


function App() {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, SetContent] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);

  //Change Title 
  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  }

   //Change Content 
   const changeContentHandler = (event) => {
    SetContent(event.target.value);
   }
  
  // Save Note
  const saveNoteHandler = () => {
    const note = {
        id: new Date(),
        title: title,
        content: content
    }

    const updatedNotes = [...notes, note];

    setNotes(updatedNotes);
    setCreating(false);
    setSelectedNote(note.id);
    setTitle('');
    SetContent('');
  }

  // Select Note
  const selectNotHandler = noteId => {
    setSelectedNote(noteId);
  }

  const getAddNote = () => {
    return (
      <div>
        <h2>Add new note</h2>
        <div>
          <input
            type="text"
            name="title"
            className="form-input mb-30"
            placeholder="Title"
            value={title}
            onChange={changeTitleHandler}
          />

          <textarea
            rows="10"
            name="content"
            className="form-input"
            placeholder="Text"
            value={content}
            onChange={changeContentHandler}
          />

          <a href="#" className="button green" onClick={saveNoteHandler}>
            SAVE
          </a>
        </div>
      </div>
    );
  };

  const getPreview = () => {
    if (notes.length === 0) {
      return <Message title="There are no notes" />
    }
    
    if (!selectedNote) {
      return <Message title="Please select notes" />
    }

    const note = notes.find(note => {
      return note.id === selectedNote;
    });


    
    return (
      <div>
        <div className="note-operations">
          <a href="#">
            <i className="fa fa-pencil-alt" />
          </a>
          <a href="#">
            <i className="fa fa-trash" />
          </a>
        </div>
        <div>
         <h2>{note.title}</h2>
         <p>{note.content}</p>
        </div>
      </div>
    );
  };
   
  const addNoteHandler = () => {
    setCreating(true);
  }
  return (
    <div className="App">
      <NotesContainer>
        <NotesList>
          {notes.map(note =>
            <Note
            key={note.id}
            title={note.title}
            noteClicked={() => selectNotHandler(note.id)} 
            active={selectedNote === note.id} 
            />
           )}
        </NotesList>
        <button className="add-btn" onClick={addNoteHandler}>+</button>
      </NotesContainer>
      <Preview>
        {creating ? getAddNote() : getPreview()}
      </Preview>
    </div>
  );
}

export default App;
