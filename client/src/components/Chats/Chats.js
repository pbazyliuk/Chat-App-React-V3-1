import React from 'react';
import ChatsNavbar from '../ChatsNavbar/ChatsNavbar';
import UsersList from '../UsersList/UsersList';
import ChatsMenuContainer from '../../containers/ChatsMenuContainer';

import WebSockets from '../../containers/WebSockets';

import MessagesNavbar from '../MessagesNavbar/MessagesNavbar';
import MessagesList from '../MessagesList/MessagesList';
import MessagesInput from '../MessagesInput/MessagesInput';
import ChatsList from '../ChatsList/ChatsList';

// import * as actions from '../../actions/index';

// import { connect } from 'react-redux';

import styles from './Chats.scss';

class Chats extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isToggleOn: false,
			isMenuShown: false
		};

		this.handleSizeChange = this.handleSizeChange.bind(this);
		this.handleMenuShow = this.handleMenuShow.bind(this);
	}

	// componentWillMount() {
	// 	this.props.getMessages();
	// }

	handleSizeChange() {
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));
	}

	handleMenuShow() {
		this.setState(prevState => ({
			isMenuShown: !prevState.isMenuShown
		}));
	}

	render() {
		const collapseWidth = {
			width: '108px',
			overflow: 'hidden'
		};

		const expandWidth = {
			width: 'calc(100% - 108px)'
		};

		return (
			<div className={styles['wrapper']}>
				<WebSockets />
				<aside
					className={styles['aside-part']}
					style={this.state.isToggleOn ? collapseWidth : {}}
				>
					<ChatsNavbar
						onSizeChange={this.handleSizeChange}
						onMenuShow={this.handleMenuShow}
						data={this.state}
					/>
					<ChatsMenuContainer {...this.state} />
					<ChatsList data={this.state} />
					<UsersList data={this.state} />
				</aside>
				<div
					className={styles['main-part']}
					style={this.state.isToggleOn ? expandWidth : {}}
				>
					{/* <ChatsDetails /> */}

					<MessagesNavbar />
					<MessagesList />
					<MessagesInput />
				</div>
			</div>
		);
	}
}

// const mapStateToProps = state => {
// 	return { messages: state.messages.get() };
// };

export default Chats;

// export default connect(mapStateToProps, actions)(Chats);
