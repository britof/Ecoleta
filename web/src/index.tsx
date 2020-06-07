import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//EMET:
//
//div#app>ul>li*5
/* 
<div id="app">
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div> 
*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);