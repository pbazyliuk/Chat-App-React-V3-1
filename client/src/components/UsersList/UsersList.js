import React from 'react';
import User from '../User/User';
import preload from '../../data/chats.json';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { Map } from 'immutable';

import styles from './UsersList.scss';

class UsersList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getAllUsers();
	}

	render() {
		//
		const isVisible = {
			display: 'none'
		};

		const { filterVal } = this.props;
		const users = this.props.users;

		// console.log(this.props);
		// console.log('USERS LIST', users);
		return (
			<ul
				className={styles['chat-list']}
				style={this.props.data.isMenuShown ? isVisible : {}}
			>
				{users
					.filter(user => {
						// console.log(filterVal);
						if (filterVal !== '') {
							const regex = new RegExp(filterVal, 'i');
							if (regex.test(user.firstname)) {
								return true;
							}
							return false;
						}
						return true;
					})
					.map(function(user) {
						// console.log(user);
						return <User {...user} key={user._id} />;
					})}
			</ul>
		);
	}
}

// ChatsList.propTypes = {
//   data: PropTypes.object.isRequired,
//   isMenuShown: PropTypes.bool
// }

function mapStateToprops(state) {
	return {
		users: [...state.users],
		authenticated: state.auth.get('authenticated'),
		filterVal: state.search.get('searchUserValue')
	};
}

export default connect(mapStateToprops, actions)(UsersList);
