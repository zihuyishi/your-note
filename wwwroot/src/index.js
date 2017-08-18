import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const noteList = [
    {_id: '1', content: '测试', title: '不错'},
    {_id: '2', content: '第二个', title: '标题?'}
];
function render() {
    ReactDOM.render(<App notelist = {noteList} />, document.getElementById('root'));
}
render();
setInterval(render, 500);
registerServiceWorker();
