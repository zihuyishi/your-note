import React from 'react';
class Note extends React.Component{
    constructor(props) {
        super(props);
        this.onClick = props.onClick;
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect() {
        if (this.onClick) {
            this.onClick(this.props.note._id);
        }
    }

    render() {
        return (
            <div class='note-elem'>
                <h1 onClick={this.handleSelect}>{this.props.note.title}</h1>
                <div>{this.props.note.content}</div>
            </div>
        );
    }
}

export default Note;