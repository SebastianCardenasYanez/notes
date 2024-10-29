import React from 'react'
import emptyImg from '../storage/img/rafiki.svg'

export const EmptyNote = () => {
  return (
    <div className='container-img-empty'>
        <img className='img-empty' src={emptyImg}/>
        <span>Create your first note !</span>
    </div>
  )
}
