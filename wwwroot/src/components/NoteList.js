import React from 'react';
import Note from './Note';
class NoteList extends React.Component {
    render() {
        const list = this.props.notelist.map(note => {
            return <Note note = {note} />;
        });
        return (
            <div class = 'note-list'>
                {list}
            </div>
        );
    }
}

export default NoteList;