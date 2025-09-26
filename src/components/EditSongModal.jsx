import React, { Component } from 'react';

export default class EditSongModal extends Component {
    constructor(props) { 
        super(props);
        if(this.props.song){
            this.state = {
                title: props.song.title,
                year: props.song.year,
                artist: props.song.artist,
                youTubeId: props.song.youTubeId,
                index: props.index
            };
        } else {
            this.state = {
                title: "",
                year: 0,
                artist: "",
                youTubeId: "",
                index: 0
            };
        }
    }
    componentDidUpdate(prevProps) {
        // Only update local state if song actually changed
        if (this.props.song !== prevProps.song) {
            this.setState({
                title: this.props.song.title,
                year: this.props.song.year,
                artist: this.props.song.artist,
                youTubeId: this.props.song.youTubeId,
                index: this.props.index
            });
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    handleConfirm = (event) => {
        const { editSongCallback, hideEditSongModalCallback, song, index } = this.props;
        const { title, year, artist, youTubeId } = this.state;

        const updatedSong = {
            ...song, //just overwrite it for safety
            title,
            year,
            artist,
            youTubeId
        };

        // call the parent callback
        editSongCallback(index, updatedSong);

        // close modal
        hideEditSongModalCallback();  
    }
    render() {
        if(!this.props.song){
            return null;
        }
        const { hideEditSongModalCallback } = this.props;
        const { title, year, artist, youTubeId} = this.state;
        return (
            <div 
                className="modal" 
                id="edit-song-modal" 
                data-animation="slideInOutLeft">
                    <div className="modal-root" id='edit-song-root'>
                        <div id="edit-song-modal-header" className="modal-north">edit song</div>
                        <div id="edit-song-modal-content" className="modal-center">
                            <div id="title-prompt" className="modal-prompt">Title:</div><input id="edit-song-modal-title-textfield" className='modal-textfield' type="text" name="title" onChange={this.handleChange} value={title} />
                            <div id="year-prompt" className="modal-prompt">Year:</div><input id="edit-song-modal-year-textfield" className='modal-textfield' type="text" name="year" onChange={this.handleChange} value={year} />
                            <div id="artist-prompt" className="modal-prompt">Artist:</div><input id="edit-song-modal-artist-textfield" className='modal-textfield' type="text" name="artist" onChange={this.handleChange} value={artist} />
                            <div id="you-tube-id-prompt" className="modal-prompt">You Tube Id:</div><input id="edit-song-modal-youTubeId-textfield" className='modal-textfield' type="text" name="youTubeId" onChange={this.handleChange} value={youTubeId} />
                        </div>
                        <div className="modal-south">
                            <input type="button" id="edit-song-confirm-button" className="modal-button" value='Confirm' onClick={this.handleConfirm} />
                            <input type="button" id="edit-song-cancel-button" className="modal-button" value='Cancel' onClick={hideEditSongModalCallback}/>
                        </div>
                    </div>
            </div>
        );
    }
}

