import React from 'react';
import { connect } from 'react-redux';
import Message from '../Message/Message';
import { Map } from 'immutable';
import MESSAGES from '../../data/messages.js';
import PropTypes from 'prop-types';

import * as actions from '../../actions/index';

// import getOnlineUser from '../../utils/getOnlineUser';

import styles from './MessagesList.scss';

class MessagesList extends React.Component {
	constructor(props) {
		super(props);

		// this.messages = this.messages.bind(this);
	}

	componentWillMount() {
		this.props.getMessages();
	}

	get messages() {
		const { searchMessage, users, firstname } = this.props;
		var { messages } = this.props;

		// console.log('MESSAGES before', messages);
		// console.log('USERS', users);

		function unLoggedUserInMes(messages) {
			return messages.map(item => {
				return (item.isLogged = false);
			});
		}

		function foo(messages, users) {
			// var newMsgs = [];
			unLoggedUserInMes(messages);
			for (let i = 0; i < users.length; i++) {
				if (users[i].isLogged) {
					for (let j = 0; j < messages.length; j++) {
						// console.log(
						// 	'AAA',
						// 	users[i].firstname,
						// 	messages[j].userName,
						// 	users[i].firstname == messages[j].userName
						// );
						if (users[i].firstname === messages[j].userName) {
							// newMsgs.push(messages[j]);
							// newMsgs[newMsgs.length - 1].isLogged = true;
							messages[j].isLogged = true;
						}
					}
				}
			}
			console.log('MESSAGES after', messages);
			return messages;
		}

		foo(messages, users);

		return (
			<ul className={styles['message-list']}>
				{messages
					.filter(message => {
						// console.log(filterVal);
						if (searchMessage !== '') {
							const regex = new RegExp(searchMessage, 'i');
							if (regex.test(message.text) || regex.test(message.userName)) {
								return true;
							}
							return false;
						}
						return true;
					})
					.map(message => {
						return (
							<Message {...message} key={message._id} firstname={firstname} />
						);
					})}
			</ul>
		);
	}

	render() {
		console.error('MESSAGES LIST', this.props);
		// const { searchMessage } = this.props;
		// console.log(searchMessage);
		// console.log(messages);
		return (
			<div>
				{/*<ul>
          {messages.map((message) => {
            return (<li>{message.userName}</li>)
          })}
        </ul>*/}
				{/* <div>ID: {this.props.id}</div> */}
				{this.messages}
			</div>
		);
	}
}

// MessagesList.propTypes = {
//   id: PropTypes.string.isRequired
// }

const mapStateToProps = state => {
	return {
		messages: [...state.messages],
		searchMessage: state.search.get('searchMessageValue'),
		users: [...state.users],
		firstname: state.auth.getIn(['user', 'firstname'])
	};
};

export default connect(mapStateToProps, actions)(MessagesList);
