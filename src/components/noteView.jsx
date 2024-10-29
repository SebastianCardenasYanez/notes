import React from 'react';
import { ArrowLeft, Eye, Save } from 'lucide-react';


export default function NoteReview({note, goBack}) {
    
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
            <button className="icon-button" aria-label="Save">
              <Save size={24} />
            </button>
          </div>
        </div>
        <h1 className="title">{note.title}</h1>
        <div className="content">
          <p className="paragraph">
            {note.content}
          </p>
        </div>
      </div>
    </>
  );
}