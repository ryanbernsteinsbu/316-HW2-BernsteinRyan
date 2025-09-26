import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false
        }
    }
    componentDidUpdate(prevProps) {
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
    handleDelete = (event) => {
        event.stopPropagation();
        let index = this.getItemNum();
        this.props.removeCallback(index);
    }
    handleDuplicate = (event) => {
        event.stopPropagation();
        let index = this.getItemNum();
        this.props.duplicateSongCallback(index);
    }
    handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.target.id);
        this.setState(prevState => ({
            isDragging: true,
            draggedTo: prevState.draggedTo
        }));
    }
    handleDragOver = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: false
        }));
    }
    handleDrop = (event) => {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
        this.setState(prevState => ({
            isDragging: false,
            draggedTo: false
        }));

        // ASK THE MODEL TO MOVE THE DATA
        this.props.moveCallback(sourceId, targetId);
    }
    handleOpenEditModal = (event) => {
        let num = this.getItemNum();
        this.props.editSongCallback(num); 
    }
    getItemNum = () => {
        return this.props.id.substring("song-card-".length);
    }

    render() {
        const { song, editSongCallback } = this.props;
        let num = this.getItemNum();
        // console.log("num: " + num);
        let itemClass = "song-card";
        if (this.state.draggedTo) {
            itemClass = "song-card-dragged-to";
        }
        return (
            <div
                id={'song-' + num}
                className={itemClass + " unselected-song-card"}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                onDoubleClick={this.handleOpenEditModal}
                draggable="true"
            >
                <div> {num}.&nbsp;
                    <a id={"song-card-title-"+num} className="song-card-title"
                    href={"https://www.youtube.com/watch?v="+song.youTubeId} target="1">{song.title} &nbsp;</a>
                    <span id={"song-card-year-" + num} className="song-card-year">({song.year}) </span>
                    <span className="song-card-by">&nbsp;by&nbsp;</span>
                    <span id={"song-card-artist-" + num} className="song-card-artist">{song.artist}</span>
                </div>
                <div className="song-card-button-container">
                    <input type="button" id={"remove-song-" + num} onClick={this.handleDelete} className="song-card-button" value="🗑"/>
                    <input type="button" id={"duplicate-song-" + num} onClick={this.handleDuplicate} className="song-card-button" value="⎘"/>
                </div>
            </div>
        )
    }
}

