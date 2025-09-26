import { jsTPS_Transaction } from "jstps";

/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that creates a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    /**
     * Initializes this object such that it can both do and undo the transaction
     * 
     * @param {Playlisterapp} initModel The M in MVC for this app
     * @param {number} initIndex The index of where the song is to be created in the playlist
     * @param {PlaylistSongPrototype} initSong The created song.
     */
    constructor(initApp, initIndex, initSong, changeSong) {
        super();
        this.app = initApp;
        this.index = initIndex;
        this.originSong = JSON.parse(JSON.stringify(initSong));
        this.changeSong = JSON.parse(JSON.stringify(changeSong));
        console.log(initSong.year + " " + changeSong.year);
    }

    /**
     * Executed when this transaction is first done or redone.
     */
    executeDo() {
        this.app.editSong(this.index, this.changeSong);
    }

    /**
     * Executed when this transaction is undone.
     */
    executeUndo() {
        this.app.editSong(this.index, this.originSong);
    }
}

