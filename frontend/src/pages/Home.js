import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Notes from '../components/Notes';
import { MdAdd } from 'react-icons/md';
import Spinner from './Spinner';
import { auth } from './Firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notepad from '../assets/notepad.png'

const Home = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const getAllNotes = async () => {
          try {
            const uid = user.uid;
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/note?uid=${uid}`);

            if (!response.ok) {
              throw new Error('Some error occurred');
            }

            const notesData = await response.json();
            setNotes(notesData.notes || []);
          } catch (error) {
            console.error(error.message);
          } finally {
            setLoading(false);
          }
        };

        getAllNotes();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const openPopup = () => {
    setNewNote({ title: '', content: '' });
    setEditingNoteId(null);
    setError('');
    setPopupOpen(true);
  };

  const handleAddNote = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      const uid = user.uid;
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/NewNote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, ...newNote }),
      });

      if (!response.ok) {
        throw new Error('Failed to add note');
      }

      const data = await response.json();
      setNotes([...notes, data.note]);
      toast.success('Notes added succesfully')
      setPopupOpen(false);
    } catch (error) {
      console.error(error.message);
      setError('Failed to add note');
    }
  };

  const handleEditNote = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/note/${editingNoteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error('Failed to edit note');
      }

      const data = await response.json();
      setNotes(notes.map(note => note._id === editingNoteId ? data.note : note));
      toast.success('Notes Edited successfully');
      setPopupOpen(false);
    } catch (error) {
      console.error(error.message);
      setError('Failed to edit note');
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/note/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      setNotes(notes.filter(note => note._id !== id));
      toast.success('Notes deleted successfully');
    } catch (error) {
      console.error(error.message);
    }
  };

  const openEditPopup = (id) => {
    const noteToEdit = notes.find(note => note._id === id);
    setNewNote({ title: noteToEdit.title, content: noteToEdit.content });
    setEditingNoteId(id);
    setPopupOpen(true);
  };

  if (loading) {
    return <Spinner />;
  }
  

  return (
    <div>
      <Navbar />
      {notes.length > 0 ?(<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 mx-10'>
        {notes.map(note => (
          <Notes
            key={note._id}
            id={note._id}
            title={note.title}
            content={note.content}
            date={note.date}
            onEdit={openEditPopup}
            onDelete={handleDeleteNote}
          />
        ))}
      </div>):(<div className='flex justify-center items-center mt-[25%] md:mt-[15%] lg:mt-[15%] xl:mt-[10%]'>
        <img src={notepad} alt='note' className='w-44 lg:w-60 cursor-pointer'  onClick={openPopup}/></div>)}
      

      <div
        className='fixed bottom-5 right-5 w-16 h-16 bg-blue-500 hover:bg-blue-600 transition-all 
          duration-300 rounded-lg cursor-pointer flex justify-center items-center'
        onClick={openPopup}
      >
        <MdAdd className='text-white text-5xl font-bold' />
      </div>

      {popupOpen && (
        <div className='bg-black inset-0 fixed bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white min-h-1/2 min-w-80 rounded-xl pb-10'>
            <h1 className='text-xl text-center mt-2'>{editingNoteId ? 'Edit Note' : 'Add New Note'}</h1>
            <div className='flex flex-col w-full gap-5'>
              <label className='text-xl font-mono mt-5 mx-5'>Title</label>
              <input
                type='text'
                placeholder='Go to Gym'
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className='border-2 border-black rounded-lg mx-5 p-2'
              />

              <label className='text-xl font-mono mt-1 mx-5'>Content</label>
              <textarea
                placeholder='Enter the Content'
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className='border-2 border-black rounded-lg mx-5 p-2'
              />

              {error && <p className='text-red-500 text-center'>{error}</p>}

              <div className='flex justify-end gap-5 mx-5'>
                <button className='bg-gray-500 text-white px-4 py-2 rounded-md text-base'
                 onClick={() => setPopupOpen(false)}>Cancel</button>
                <button className='bg-blue-600 text-white px-4 py-2 rounded-md text-base '
                 onClick={editingNoteId ? handleEditNote : handleAddNote}>
                  {editingNoteId ? 'Edit' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
