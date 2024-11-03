import { useContext, useEffect, useState } from 'react';
import { HeaderNote } from './components/header';
import { EmptyNote } from './components/empty';
import { AddNote } from './components/addNote';
import { SearchNote } from './components/search';
import NoteReview from './components/noteView';
import addImg from './storage/img/add.svg';
import { SearchProvider, SearchContext } from './components/searchContext';
import './App.css';

function App() {
    return (
        <SearchProvider>
            <MainContent />
        </SearchProvider>
    );
}

function MainContent() {
    const { isSearchVisible, setIsSearchVisible } = useContext(SearchContext);
    const [notesGet, setNotesGet] = useState(false);
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isNoteView, setIsNoteView] = useState(false);
    const [isAddingNote, setIsAddingNote] = useState(false);

    const getRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    const getNotes = async () => {
        console.log('Va a hacer la peticion');
        let config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-version": "1.0.0"
            }
        };
        let peticion = await fetch("http://localhost:5000/notes", config);

        if (peticion.status === 200) {
            console.log("salio bien la peticion");
            setNotesGet(true);
            let result = await peticion.json();
            setNotes(result.data);
            console.log(result.data);
        }
    };

    useEffect(() => {
        if (!notesGet) {
            getNotes();
        }
    }, [notesGet]);

    const goBack = () => {
        setIsNoteView(false);
        setSelectedNote(null);
        setIsAddingNote(false);
    };

    return (
        <>
            {isSearchVisible ? (
                <SearchNote isSearchVisible={isSearchVisible} setIsSearchVisible={setIsSearchVisible} />
            ) : isNoteView && selectedNote ? (
                <NoteReview note={selectedNote} goBack={goBack} />
            ) : isAddingNote ? (
                <AddNote goBack={goBack} />
            ) : (
                <>
                    <HeaderNote />
                    <section className="notes-section">
                        {notesGet ? (
                            notes.map((note, index) => (
                                <div
                                    key={index}
                                    id={note._id}
                                    className="note"
                                    onClick={() => { setSelectedNote(note); setIsNoteView(true); }}
                                    style={{ backgroundColor: getRandomColor() }}
                                >
                                    <span>{note.title}</span>
                                    <small>{note.content}</small>
                                </div>
                            ))
                        ) : (
                            <EmptyNote />
                        )}
                    </section>
                    <div className="add-note-button" onClick={() => setIsAddingNote(true)}>
                        <img src={addImg} alt="Agregar nota" />
                    </div>
                </>
            )}
        </>
    );
}

export default App;
