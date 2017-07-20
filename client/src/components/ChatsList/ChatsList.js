import React from 'react';

import { connect } from 'react-redux';
import { Map } from 'immutable';

import styles from './ChatList.scss';

import Chat from '../Chat/Chat';
import * as actions from '../../actions/index';

class ChatsList extends React.Component {
	constructor(props) {
		super(props);
	}

	// ComponentWillMount() {
	// 	this.props.getAllChats();
	// }

	render() {
		const { chats } = this.props;

		const isVisible = {
			display: 'none'
		};

		console.log('CHATSSS', chats);
		console.log('CHATSSS', this.props);
		return (
			<div
				className={styles['chat-list']}
				style={this.props.data.isMenuShown ? isVisible : {}}
			>
				{chats.map(chat => {
					return <Chat key={chat._id} {...chat} />;
				})}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		chats: [...state.chats]
	};
}

export default connect(mapStateToProps, actions)(ChatsList);
