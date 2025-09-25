import { jsTPS_Transaction } from '../../jstps/index.js'
import PlaylisterModel from '../PlaylisterModel.js';

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
     * @param {PlaylisterModel} initModel The M in MVC for this app
     * @param {number} initIndex The index of where the song is to be created in the playlist
     * @param {PlaylistSongPrototype} initSong The created song.
     */
    constructor(initModel, initIndex, initSong, changeSong) {
        super();
        this.model = initModel;
        this.index = initIndex;
        this.originSong = initSong.clone();
        this.changeSong = changeSong.clone();
    }

    /**
     * Executed when this transaction is first done or redone.
     */
    doTransaction() {
        this.model.editSong(this.index, this.changeSong);
        let temp = this.originSong;
        this.originSong = this.changeSong;
        this.changeSong = temp;
    }

    /**
     * Executed when this transaction is undone.
     */
    undoTransaction() {
        this.model.editSong(this.index, this.changeSong);
        let temp = this.originSong;
        this.originSong = this.changeSong;
        this.changeSong = temp;
    }
}

