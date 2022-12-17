import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import Filter from './Filter'
import shrug from './icons/shrug.png'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({show: false, msg: '', type: ''})
  const [isActive, setIsActive] = useState('')
  const [filteredList, setFilteredList] = useState(list)
  const [btnState, setBtnState] = useState('all')

  
  const handleSubmit = e => {
    e.preventDefault()
    if (!name) {
      showAlert(true, 'Please enter value', 'red')
    } else if (name && isEditing) {
      setList(list.map((item) => {
        if(item.id === editId) {
          return {...item, title: name}
        }
        return item
      }))
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true, 'Item edited', 'green')
    } else {
      showAlert(true, 'New item added', 'green')
      const newItem = { id: new Date().getTime().toString(), title: name, status: 'pending' }
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show=false, msg='', type='') => {
    setAlert({show, msg, type})
  }

  const updateStatus = (id) => {
    setList(list.map((item) => {
      if(item.id === id && item.status === 'pending') {
        return {...item, status: 'completed'}
      } else if (item.id === id && item.status === 'completed') {
        return {...item, status: 'pending'}
      }
      return item
    }))
  }

  const clearList = () => {
     showAlert(true, 'Empty list', 'red')
     setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'Item removed', 'red')
    setList(list.filter((item) => item.id !== id)
  )} 

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title)
  }

  const showMenu = (id) => {
    setIsActive(id)
  }

  const filterItems = (status) => {
    const result = list.filter((item) => item.status === status)
    setFilteredList(result)
  }

  useEffect(() => {
    document.body.addEventListener('click', e => {
      setIsActive('')
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  useEffect(() => {
    setFilteredList(list)
  }, [list])

  return (
  <section className='wrapper'>
    <h1>Task Manager</h1>
    <p className='alert'>{alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}</p>
    <div className='task-input'>
      <input type="text" className='grocery' placeholder='Add a new task' value={name} onChange={(e) => setName(e.target.value)}/>
      <button type='submit' className='add-btn' onClick={handleSubmit}>
        {isEditing ? 'Edit' : 'Submit'}
      </button>
    </div>
    <div className="controls">
      <Filter filterItems={filterItems} setFilteredList={setFilteredList} list={list} setBtnState={setBtnState} btnState={btnState}/>
        <button className="clear-btn" onClick={clearList}>Delete all</button>
      </div>
      <ul className='task-box'>
      {filteredList.length > 0 ? (
      <List items={filteredList} removeItem={removeItem} editItem={editItem} isActive={isActive} showMenu={showMenu} updateStatus={updateStatus} filterItems={filterItems}/>
    ) : <div className="icon-container"><span>Looks like you don't have any task here</span><img className="shrug" src={shrug} alt="shrug"/></div>}
      </ul>
  </section>
  )
}

export default App
