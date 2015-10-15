'use strict';

import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';
import {ALERT_OPEN, ALERT_CLOSE, PLAYLIST_CREATING} from '../constants/constants';

let CHANGE_EVENT = 'change';

let _isOpen = false;
let _status = {
  loading: false,
  fail: false,
  share: false
}

class AlertStore extends EventEmitter {
	constructor() {
		super();
		this.registerAtDispatcher();
	}

	isOpen() {
		return _isOpen;
	}

  status() {
    return _status;
  }

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

	registerAtDispatcher() {
		Dispatcher.register((action) => {

			switch(action.type) {

        case ALERT_OPEN: {
					_isOpen = true;
					this.emitChange();
					break;
				}

        case ALERT_CLOSE: {
          _isOpen = false;
          this.emitChange();
          break;
        }

        case PLAYLIST_CREATING: {
          _isOpen = true;
          _status.loading = true;
          this.emitChange();
          break;
        }

				default: {
					break;
				}
			}
		});
	}

}

export default new AlertStore();