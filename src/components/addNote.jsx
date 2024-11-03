import React, { useState } from 'react';
import { ArrowLeft, Eye, Save } from 'lucide-react';
import { body } from 'express-validator';

export const AddNote = ({ goBack }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSave = async () => {
        if (title && content) {
            console.log("Guardando nota:", { title, content });
            setTitle('');
            setContent('');
            let config = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-version" : "1.0.0" 
                },
                body : JSON.stringify({ title, content })
              }
            console.log(config);
            let peticion = await fetch(`http://localhost:5000/notes/`, config);
            if (peticion.status !== 201) return alert("Ocurrio algo en la peticion")
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
                <textarea
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
