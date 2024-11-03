import React, { useState }  from 'react';
import cuate from "../storage/img/cuate.svg";

export const SearchNote = ({ isSearchVisible, setIsSearchVisible }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchFound, setSearchFound] = useState(false)
    const [note, setNotes] = useState([])
      
    const toggleSearch = () => {
      setIsSearchVisible(!isSearchVisible)
        if (isSearchVisible) {
          setSearchQuery('')
        }
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
      }
    
    const getRandomColor = () => {
      return '#' + Math.floor(Math.random()*16777215).toString(16);
    };

    const handleSearchSubmit = async (e) => {
      e.preventDefault()
      setSearchFound(false)
      console.log('Searching for:', searchQuery)
      let config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-version" : "1.0.0"
        }
      }
      let peticion = await fetch(`http://localhost:5000/notes/search/${searchQuery}`, config);
      let result = await peticion.json();
  
      if (result.result.data.length > 0) {
        console.log("salio bien la peticion");
        console.log(result.result);
        return setNotes(result.result.data)
      }
      setSearchFound(true)
    }
      
  return (
    <>
    {<div className="search-container">
      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for recipes..."
          className="search-input"
        />
      <span className="search-close" onClick={toggleSearch}>✕</span>
      </form>
    </div>}
    { searchFound ? (
      <div className='not-found'>
          <img src={cuate} className='img-notfound' />
          <span className='text-note-notfound'>File not found. Try searching again.</span>
      </div>
    ) : note.map((not, index) => (
      <div key={index} className="note" style={{ backgroundColor: getRandomColor() }}>
          <span>{not.title}</span>
          <small>{not.content}</small>
      </div>
      ))
      }
    </>
  )
}
