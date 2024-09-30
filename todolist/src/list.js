import { useState } from 'react';
import './App.css';
function List({ task, sendTaskDetail }) {
    const { id, value, isChecked } = task;
    const [isActive, setIsActive] = useState(isChecked);

    const handleTaskActivation = () => {
        setIsActive(!isActive);
    }
    const handleTaskEdit = () => {
        sendTaskDetail(id, "edit")
    }
    const handleTaskDelete = () => {
        sendTaskDetail(id, "delete")
    }
    return (
        <div>
            <div className='listContainer'>
                <input type='checkbox' name={id + 'ytrrAAA'} value={value} checked={isActive} onChange={handleTaskActivation} />
                <p className={isActive ? 'cut-text list-item' : 'normal-text list-item'}>{value}</p>
                <div className='buttonContainer list-item'>
                    <button className='btn btn-default' disabled={isActive} onClick={handleTaskEdit}>Edit</button>
                    <button className='btn btn-warning' disabled={isActive} onClick={handleTaskDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default List;