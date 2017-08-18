import React from 'react';
import Note from './Note';
import _ from 'lodash';
class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectNote = props.onSelectNote;
        this.handleNoteSelect = this.handleNoteSelect.bind(this);
    }

    handleNoteSelect(noteId) {
        if (this.onSelectNote) {
            const notelist = this.props.notelist;
            const noteById = _.keyBy(notelist, '_id');
            const note = noteById[noteId];
            if (!note) {
                console.error('bad note id', noteId);
                return ;
            }
            this.onSelectNote(note);
        }
    }
    render() {
        const list = this.props.notelist.map(note => {
            return <Note key={note._id} note={note} onClick={this.handleNoteSelect}/>;
        });
        return (
            <ul class = 'note-list'>
                {list}
            </ul>
        );
    }
}

export default NoteList;