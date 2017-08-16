import React from 'react';
class Note extends React.Component{
    render() {
        return (
            <div class='note-elem'>
                <h1>{this.props.note.title}</h1>
                <div>{this.props.note.content}</div>
            </div>
        );
    }
}

export default Note;