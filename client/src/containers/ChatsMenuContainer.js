// Libs

//@flow
import React, { Component } from 'react';

import ChatsMenu from '../components/ChatsMenu/ChatsMenu';
import { connect } from 'react-redux';

import * as actions from '../actions/index';

import { Map } from 'immutable';

class ChatsMenuContainer extends React.Component {
	constructor(props) {
		super(props);

		this.handleAddChat = this.handleAddChat.bind(this);
	}

	handleAddChat(values) {
		const curUserName = localStorage.getItem('user');
		values.usersSelected.push(curUserName);
		values.usersSelected.sort();
		console.log('CHATS ADD VAlUES', values);
		this.props.addChat(values);
		this.props.clearForm('addChat');
	}

	render() {
		console.log('MENUCONTAINER', this.props);

		// console.log('MENUCONTAINER', data);
		return <ChatsMenu data={this.props} onSubmit={this.handleAddChat} />;
	}
}

const mapStateToProps = state => {
	state;
};

export default connect(mapStateToProps, actions)(ChatsMenuContainer);
