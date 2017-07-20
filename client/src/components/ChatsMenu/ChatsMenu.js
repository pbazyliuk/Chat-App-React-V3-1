import React from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import styles from '../../../style.scss';

import { connect } from 'react-redux';
import { Map } from 'immutable';

function validate(values) {
	const errors = {};

	if (!values.chatName) {
		errors.chatName = 'Chatname is required';
	} else if (values.chatName.length > 15) {
		errors.chatName = 'Must be 15 characters or less';
	} else if (values.chatName.length < 4) {
		errors.chatName = 'Must be at least 4 characters';
	}

	if (!values.usersSelected) {
		console.log('VALUES ARE  HERE');
		errors.usersSelected = 'Select User is required';
	}

	return errors;
}

const renderField = ({
	input,
	label,
	type,
	meta: { touched, error },
	className,
	placeholder
}) => {
	return (
		<div>
			<input
				{...input}
				placeholder={placeholder}
				type={type}
				className={className}
			/>
			{touched &&
				(error &&
					<div className="text-has-error">
						{error}
					</div>)}
		</div>
	);
};

const renderFieldSelect = ({
	input,
	meta: { touched, error },
	className,
	name,
	id,
	size,
	dataUsers
}) => {
	let usersOptionsFields = dataUsers.map(user => {
		return (
			<option key={user._id} value={JSON.stringify(user)}>
				{user.firstname}
			</option>
		);
	});
	console.log('usersOptionsFields', usersOptionsFields);
	// console.log('dataCurUserName', dataCurUserName);
	return (
		<div>
			<select
				className={className}
				size={size}
				name={name}
				multiple
				id={id}
				{...input}
			>
				{usersOptionsFields}
			</select>
			{touched &&
				(error &&
					<div className="text-has-error">
						{error}
					</div>)}
		</div>
	);
};

class ChatsMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			handleSubmit,
			valid,
			pristine,
			touched,
			error,
			curUser
		} = this.props;
		// const { users } = this.props;
		console.error('Chats Menu', this.props);
		console.error('CHAT MENY', curUser.get('firstname'));
		var { users } = this.props;

		const curUserName = curUser.get('firstname');

		users = users.filter(user => {
			return user.firstname !== curUserName;
		});

		const isVisible = {
			display: 'none'
		};

		return (
			<div
				className="user-menu"
				style={!this.props.data.isMenuShown ? isVisible : {}}
			>
				<div className="user-menu__item">
					<input type="checkbox" id="btn-settings" />
					<label htmlFor="btn-settings" className="btn-arrow-label-sm">
						Add Chat
						<span className="btn-arrow-sm" />
					</label>
					<div className="user-menu__item-info">
						<form className="form-add-chat" action="" onSubmit={handleSubmit}>
							<div className="form-add-chat__container">
								<label className="form-add-chat__label" htmlFor="emailId">
									Chat Name
								</label>
								<Field
									className="form-add-chat__input-field"
									type="text"
									name="chatName"
									id="emailId"
									component={renderField}
									placeholder="Chat Name (required)"
								/>
								{/* <div class='text-has-error'>
                    Chatname is required (min 4 characters)
                </div> */}
							</div>

							<div className="form-add-chat__container">
								<label htmlFor="selectUsersId" className="form-add-chat__label">
									Select Users
								</label>

								<Field
									className="form-add-chat__select-field"
									name="usersSelected"
									size="5"
									component={renderFieldSelect}
									id="selectUsersId"
									multiple
									dataUsers={users}
								/>
							</div>

							<button
								type="submit"
								disabled={!valid}
								className="form-add-chat__btn-submit"
							>
								ADD CHAT
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

ChatsMenu.propTypes = {
	data: PropTypes.object.isRequired,
	isMenuShown: PropTypes.bool
};

// const mapStateToProps = state => {
// 	state;
// };

ChatsMenu = reduxForm({
	form: 'addChat',
	validate
})(ChatsMenu);

ChatsMenu = connect(
	state => ({
		users: [...state.users],
		curUser: state.auth.get('user')
	}) // pull initial values from account reducer
)(ChatsMenu);

export default ChatsMenu;
