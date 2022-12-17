import React from 'react'
import dots from './icons/dots.png'
import edit from './icons/edit.png'
import deleteBtn from './icons/delete.png'

const List = ({items, removeItem, editItem, isActive, showMenu, updateStatus}) => {
  return (
    items.map((item) => {
      const {id, title, status} = item
      return <li key={id} className="task">
        <label>
          <input onClick={() => updateStatus(id)} type="checkbox" id={id}/>
          <p className={status === 'completed' ? 'checked' : ''}>{title}</p>
        </label>
        <div className="settings">
          <img onClick={() => showMenu(id)} src={dots} alt="dots"/>
          <ul className={`task-menu ${isActive === id ? 'show': ''}`} id={id}>
            <li onClick={() => editItem(id)}><img src={edit} alt="edit"/>Edit</li>
            <li onClick={() => removeItem(id)}><img src={deleteBtn} alt="delete"/>Delete</li>
          </ul>
        </div>
      </li>
    })
)}



export default List
