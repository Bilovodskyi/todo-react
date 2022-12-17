import React from 'react'

const Filter = ({filterItems, setFilteredList, list, btnState, setBtnState}) => {
    return (
    <div className="filters">
        <span onClick={() => {setFilteredList(list); setBtnState('all')}} id="all" className={btnState === 'all' ? 'active' : ''}>All</span>
        <span onClick={() => {filterItems('pending'); setBtnState('pending')}} id="pending" className={btnState === 'pending' ? 'active' : ''} >Pending</span>
        <span onClick={() => {filterItems('completed'); setBtnState('completed')}} id="completed" className={btnState === 'completed' ? 'active' : ''}>Completed</span>
    </div>
    )
}

export default Filter