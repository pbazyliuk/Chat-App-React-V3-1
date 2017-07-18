// import initialState from '../store/initialState';

import INITIAL_APPLICATION_STATE from '../store/initialState.js';

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, GET_ALL_USERS, SEND_MESSAGE, GET_MESSAGES} from '../actionsTypes/index.js';

console.error(INITIAL_APPLICATION_STATE);

export default function(state = INITIAL_APPLICATION_STATE, action) {
	switch (action.type) {
		case AUTH_USER:
			{console.log(action.payload);
			action.payload === undefined 
				? 
				action.payload = JSON.parse(localStorage.getItem('user')) :
				localStorage.setItem('user', JSON.stringify(action.payload));

			let clonedState = { ...state };
			
			clonedState.uiState.error = '';
			clonedState.uiState.user = action.payload;
			clonedState.uiState.authenticated = true;

			return clonedState;}

		case UNAUTH_USER:
			{console.log('unauth');
			
			let clonedState = { ...state };
			
			clonedState.uiState.authenticated = false;
			clonedState.uiState.error = '';
			clonedState.storeData.users = [];
			clonedState.storeData.chats = [];
			clonedState.storeData.messages = [];
			clonedState.uiState.user = {};

			return clonedState;}

		case AUTH_ERROR:
			return { ...state, error: action.payload };

		case GET_ALL_USERS: 
			{console.log('get all users');
			
			let clonedState = { ...state };
			
			clonedState.storeData.users = action.payload;
			
			return clonedState;}

		case SEND_MESSAGE:
			console.log('SEND MESSAGE', action.payload)
			{let clonedState = { ...state };
			
			clonedState.storeData.messages.push(action.payload);

			return clonedState;}

		
		case GET_MESSAGES:
			console.log('GET_MESSAGES', action.payload)
			{let clonedState = { ...state };
			
			clonedState.storeData.messages = action.payload;

			return clonedState;}

		default:
			return state;
	}
}
