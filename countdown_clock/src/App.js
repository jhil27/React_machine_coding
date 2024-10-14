
import './App.css';
import { useState, useEffect } from 'react'
function App() {
  const [counter, setCounter] = useState(60);
  const [start, setStart] = useState(false);
  const toggle = () => {
    if (counter === 0) setCounter(60);
    setStart((prevState) => !prevState);
  };
  useEffect(() => {
    let timer = null;
    if (start && counter > 0) {
      timer = setInterval(() => {
        setCounter((count) => count - 1)
      }, 1000);
    } else if (counter == 0) {
      setStart(false);
    }
    return () => clearInterval(timer)

  }, [start, counter])
  return (
    <div className="App">
      <div className='clock'>
        <span style={{ fontSize: '180px' }}>{counter}</span>
      </div>
      <button className='btn' onClick={toggle}>{start ? "Reset " : "Start "} Count Down</button>
    </div>
  );
}

export default App;
