import React, { useState } from 'react';
import { ArrowLeft, Eye, Save } from 'lucide-react';

export const AddNote = ({ goBack }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSave = () => {
        if (title && content) {
            console.log("Guardando nota:", { title, content });
            setTitle('');
            setContent('');
            goBack();
        } else {
            alert("Por favor completa el título y el contenido de la nota");
        }
    };

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
                        <button className="icon-button" aria-label="Save" onClick={handleSave}>
                            <Save size={24} />
                        </button>
                    </div>
                </div>
                <input
                    type="text"
                    className="title-input"
                    placeholder="Título de la nota"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="content">
                    <textarea
                        className="content-textarea"
                        placeholder="Escribe tu nota aquí..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
            </div>
        </>
    );
};
