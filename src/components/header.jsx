import React, { useState, useContext }  from 'react';
import searchImg from "../storage/img/search.svg";
import infoImg from "../storage/img/info_outline.svg";
import { SearchContext } from './searchContext';

export const HeaderNote = () => {
    const [showInfo, setShowInfo] = useState(false)
    const { setIsSearchVisible } = useContext(SearchContext);
  
    const toggleSearch = () => {
      setIsSearchVisible(prev => !prev)
    }

    const toggleInfo = () => {
      setShowInfo(!showInfo)
    }
  return (
    <>
    <section className='header-section'>
        <h1>Notes</h1>
        <div className='icons-header'>
            <img src={searchImg} onClick={toggleSearch}/>
            <img src={infoImg} onClick={toggleInfo}/>
        </div>
    </section>
    {showInfo && (
        <>
          <div className='overlay' onClick={toggleInfo}></div>
          <div className='info-card'>
            <div className='card-info-left'>
            <strong>Designed by -</strong>
            <strong>Redesigned by -</strong>
            <strong>Illustrations -</strong>
            <strong>Icons -</strong>
            <strong>Font -</strong>
            </div>
            <strong>Made by</strong>
          </div>
        </>
      )}
    </>
  )
}
