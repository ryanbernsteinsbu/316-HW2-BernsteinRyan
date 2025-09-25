import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false
        }
    }
    handleDelete = (event) => {
        event.stopPropagation();
        let index = this.getItemNum();
        this.props.removeCallback(index);
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

    getItemNum = () => {
        return this.props.id.substring("song-card-".length);
    }

    render() {
        const { song } = this.props;
        let num = this.getItemNum();
        console.log("num: " + num);
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
                draggable="true"
            >
                <div> {num}.&nbsp;
                    <a id={"song-card-title-"+num} className="song-card-title"
                    href={"https://www.youtube.com/watch?v="+song.youTubeId} target="1">{song.title} &nbsp;</a>
                    <span id={"song-card-year-" + num} className="song-card-year">({song.year}) </span>
                    <span className="song-card-by">&nbsp;by&nbsp;</span>
                    <span id={"song-card-artist-" + num} className="song-card-artist">{song.artist}</span>
                </div>
                <input type="button" id={"remove-song-" + num} onClick={this.handleDelete} className="song-card-button" value="🗑"/>

            </div>
        )
    }
}

        // <!-- PROTOTYPE FOR MAKING SONG CARDS -->
        // <div hidden id="song-card-prototype"
        //     class="song-card unselected-song-card">
        //     <a id="song-card-title-" class="song-card-title"
        //         href="https://www.youtube.com/watch?v=" target="1"></a>
        //     <span id="song-card-year-" class="song-card-year"></span>
        //     <span class="song-card-by"> by </span>
        //     <span id="song-card-artist-" class="song-card-artist"></span>
        //     <input type="button" id="remove-song-" class="song-card-button" value="🗑"/>
        // </div>
