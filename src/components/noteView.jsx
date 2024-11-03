import React, {useRef, useState} from 'react';
import { ArrowLeft, Eye, Save } from 'lucide-react';


export default function NoteReview({note, goBack}) {
    const [contentNote, setContentNote] = useState(note);
    const [newContent, setNewContent] = useState({ title: note.title, content: note.content });
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    console.log(contentNote);

  const handleTitleChange = (e) => {
      setNewContent((prev) => ({ ...prev, title: titleRef.current.innerText }));
  };

  const handleContentChange = (e) => {
      setNewContent((prev) => ({ ...prev, content: contentRef.current.innerText }));
  };

  const update = async() => {
    newContent._id = note._id;
    newContent.user = note.user;
    console.log("Actualizando contenido:", newContent);

    let config = {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "x-version": "1.0.0"
      },
      body: JSON.stringify(newContent)
  };
    let peticion = await fetch(`http://localhost:5000/notes/${note._id}`, config);
  }

  return (
    <>
      <div className="book-review">
        <div className="header">
          <button className="icon-button" aria-label="Go back" onClick={goBack}>
            <ArrowLeft size={24} />
          </button>
          <div className="icon-group">
            <button className="icon-button" aria-label="View options">
              <Eye size={24} />
            </button>
            <button className="icon-button" aria-label="Save" onClick={update}>
              <Save size={24} />
            </button>
          </div>
        </div>
        <h1 contentEditable="true" spellCheck="false" className="title"  ref={titleRef} onInput={handleTitleChange}>
          {note.title}</h1>
        <div contentEditable="true" spellCheck="false" className="content" ref={contentRef} onInput={handleContentChange}>
          <p className="paragraph">
          {note.content}
          </p>
        </div>
      </div>
    </>
  );
}