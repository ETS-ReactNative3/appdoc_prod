import React from 'react';

import PropTypes from 'prop-types'
import cn from 'classnames'

import ChatVideoPanel from "../../../components/ChatVideoPanel";

import ChatContent from './ChatContent'

import './style.css'


import Hoc from '../../../hoc'

class ChatAudioContent extends React.Component {
	constructor(props){
		super(props);
		this.timerInterval;
	}

	renderCallArea = () => {
		const panelClass = cn('chat-card-video__panel', {'chat-card-video__panel-active': this.props.isActiveChat});

		let {s, m, h} = this.props.timer;
		return (<Hoc>
			<div className='chat-card-message__area'>
				<video className='chat-card-video__box' 
						ref={video => this.props.setVideoOut(video)}
						autoPlay
						poster='http://bipbap.ru/wp-content/uploads/2017/04/72fqw2qq3kxh.jpg'
						></video>
			</div>
				<div className={panelClass}>
					<ChatVideoPanel  
								onStop={() => {
									this.props.onStop();
								}} 
								onCall={() => {
									!this.props.receptionStarts && 
										this.props.onBegin();
									this.props.onCall();
								}} 
								onChat = {this.props.onChat}
								uploadFiles={this.props.uploadFile}
								sec= {s}
								min={m}
								hour={h}
								isCalling={this.props.isCalling}/>

				</div>
		</Hoc>)
	}
    
    
    render() {
        const {isActive,isActiveChat} = this.props;
		const dialogsClass = cn('chat-card-dialogs', 'chat-card-dialogs-row', {'chat-card-dialogs-active': isActive});
		const filesClass = cn('chat-card-files', {'chat-card-files-active': isActiveChat});

		let audioContent = this.renderCallArea()

        return (

            <div className={dialogsClass}>
				{audioContent}
				<div className={filesClass}>
					 <ChatContent 
						{...this.props}
						onSend={mes => this.props.sendMessage({
							id: 'chat',
							from: this.props.from,
							to: this.props.to,
							...mes,
						})}
						uploadFile={this.props.uploadFile}
						 data={this.props.chatStory}
					/>
                </div>
			</div>

        )
    }
}

ChatAudioContent.propTypes = {
	videoCalling: PropTypes.bool,
	wsURL: PropTypes.string.isRequired,
};

ChatAudioContent.defaultProps = {
	videoCalling: false,
	wsURL: '',
};

export default ChatAudioContent