import { jsTPS_Transaction } from "jstps";

/**
 * DeleteSong_Transaction
 * 
 * This class represents a transaction that deletes a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 */
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    /**
     * Initializes this object such that it can both do and undo the transaction
     * 
     * @param {PlaylisterModel} initModel The M in MVC for this app
     * @param {number} initIndex The index of where the song is to be created in the playlist
     * @param {PlaylistSongPrototype} initSong The created song.
     */
    constructor(initApp, initIndex, initSong) {
        super();
        this.app = initApp;
        this.index = initIndex;
        let clone = JSON.parse(JSON.stringify(initSong));
        this.song = clone;
    }

    /**
     * Executed when this transaction is first done or redone.
     */
    executeDo() {
        this.app.deleteSong(this.index);
    }

    /**
     * Executed when this transaction is undone.
     */
    executeUndo() {
        this.app.insertSong(this.index, this.song);
    }
}
