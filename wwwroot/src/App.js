import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NoteList from './components/NoteList';
import LoginPanel from './components/LoginPanel';
import UserDao from './net/UserDao';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userStatus: 1
        };
        this.onSelectNote = this.onSelectNote.bind(this);
    }
    
    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onSelectNote(note) {
        console.log('select note', JSON.stringify(note));
    }

    render() {
        if (this.state.userStatus === 0) {
            return <LoginPanel />;
        } else if (this.state.userStatus === 1){
            return <NoteList notelist={this.props.notelist} onSelectNote={this.onSelectNote}/>;
        } else {
            return (
                <h1>Hello {this.state.user.name} </h1>
            );
        }
    }
    login() {
        UserDao.login('lc@molasync.com', '12345678').then(user => {
            this.setState({
                user: user,
                userStatus: 2
            });
        }).catch(code => {
            console.log('login fail with code', code);
        });
    }
}

export default App;
