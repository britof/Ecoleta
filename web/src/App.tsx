import React from 'react';
import './App.css';

import Routes from './routes';
// function IncreaseButtonAndDisplay() {
//   const [counter, setCounter] = useState(0); //[value, handleFunction]
//   function handleButtonClick() {
//     setCounter(counter + 1);
//   }
//   return (
//       <div>
//         <h1>{counter}</h1>
//         <button type="button" onClick={handleButtonClick}>Increase</button>
//       </div>
//   );
// }

function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
