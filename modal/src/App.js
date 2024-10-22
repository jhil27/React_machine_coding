// import logo from './logo.svg';
import './App.css';
import Modal from './modal';
import { useEffect, useState } from 'react'
function App() {
  const [openModal, setOpenModal] = useState(false);

  const handleModalState = () => {
    setOpenModal(((prevState) => !prevState))

  }
  return (
    <div className="App">
      <button onClick={handleModalState}>{openModal ? "Close" : "Open"} Modal</button>
      {openModal ?
        < Modal /> :
        <></>
      }
    </div>
  );
}

export default App;
