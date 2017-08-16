import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

function render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}
render();
setInterval(render, 500);
registerServiceWorker();
