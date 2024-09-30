
import './App.css';
import { useState } from 'react';
import List from './list';
function App() {
  const [inputValue, setInputValue] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [currentTaskToEdit, setCurrentTaskToEdit] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const addToList = () => {
    if (!isEditing) {
      const date = new Date();
      let obj = { id: date.getUTCMilliseconds(), value: inputValue, isChecked: false }
      setTaskList([...taskList, obj])
    } else {
      taskList.forEach((task) => {
        if (task.id === currentTaskToEdit) {
          task.value = inputValue;
        }
      })
      setTaskList([...taskList])
    }
    setInputValue("");
  }
  const getCurrentTaskDetails = (data, operation) => {
    if (operation === "edit") {
      taskList.forEach((task) => {
        if (task.id === data) {
          setInputValue(task.value);
          setCurrentTaskToEdit(data);
          setIsEditing(true);
        }
      })
    } else {
      const afterDeleteTasklist = taskList.filter((task) => task.id != data);
      setTaskList([...afterDeleteTasklist]);
    }
  }
  return (
    <div className="App">
      <div className='inputContainer'>
        <input type='text' value={inputValue} onChange={(e) => handleInputChange(e)} />
        <button onClick={addToList}>Add</button>
      </div>
      <div className='taskContainer'>
        {taskList.length > 0 ?
          taskList.map((task) => {
            return <List task={task} sendTaskDetail={getCurrentTaskDetails} />
          })
          : <div></div>
        }
      </div>
    </div>
  );
}

export default App;
