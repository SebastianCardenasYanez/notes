import React, { useState } from 'react';
import addImg from '../storage/img/add.svg'

export const AddNote = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
    <div className='add-note-button' onClick={(e) => {setIsOpen}}>
        <img src={addImg} alt="" />
    </div>
    { isOpen && (
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
              <h1 className="title"></h1>
              <div className="content">
                <p className="paragraph">
                  
                </p>
              </div>
            </div>
          </>
        )
    }
    </>
  )
}
