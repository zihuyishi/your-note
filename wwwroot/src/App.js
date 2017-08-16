import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NoteList from './components/NoteList';

class App extends Component {
    render() {
        return (
            <NoteList notelist = {this.props.notelist} />
        );
    }
}

export default App;
