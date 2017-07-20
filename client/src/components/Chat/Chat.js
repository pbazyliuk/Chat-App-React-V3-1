import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Chat.scss';

class Chat extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props);
		const { usersNames } = this.props;

		// const curUserName = JSON.parse(localStorage.getItem('user')).firstname;

		// usersNames.push(curUserName);

		// usersNames.sort();

		var strNames = usersNames.join(', ');

		return (
			<li className={styles['chat-list__item']}>
				<div className={styles['avatar']}>
					<img
						className={`${styles['avatar__img']} ${styles['show']}`}
						src="../../../images/chat-avatar.png"
						alt="avatar-image"
					/>
				</div>
				<div className={styles['chat-info']}>
					<h4 className={styles['chat-name__heading']}>
						{this.props.name}
					</h4>
					<div className={styles['chat-list__usersNames']}>
						{strNames}
					</div>
				</div>
				{/* <div className={`${styles['online']} ${styles['chat-last-activity']}`}> */}
				{/* <span
							className={
								isLogged === true ? `${styles['show']}` : `${styles['hide']}`
							}
						>
							on
						</span>
						<span
							className={
								isLogged === true ? `${styles['hide']}` : `${styles['show']}`
							}
						>
							off
						</span> */}
				{/* </div> */}
			</li>
		);
	}
}

export default Chat;
