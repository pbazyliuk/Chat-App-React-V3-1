import { GET_ALL_CHATS } from '../actionsTypes/index.js';
import { List } from 'immutable';

export default function(state = List([]), action) {
	switch (action.type) {
		case GET_ALL_CHATS: {
			console.log('GET_ALL_CHATS action');
			return List([...action.payload]);
		}

		default:
			return state;
	}
}
