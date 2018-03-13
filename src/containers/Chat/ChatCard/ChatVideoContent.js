import React from 'react';
import kurentoUtils from 'kurento-utils'

import PropTypes from 'prop-types'
import cn from 'classnames'

import { Button, Radio, ChatFiles, ChatSend, ChatMessage, ChatVideoPanel } from 'appdoc-component'


import './style.css'


//import { Icon, Row, Col, HistoryReceptions } from 'appdoc-component'
import Hoc from '../../../hoc'




var videoInput;
var videoOutput;
var webRtcPeer;

var registerName = null;
const NOT_REGISTERED = 0;
const REGISTERING = 1;
const REGISTERED = 2;
var registerState = null



const NO_CALL = 0;
const PROCESSING_CALL = 1;
const IN_CALL = 2;
var callState = null



class ChatVideoContent extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			from: 0,
			to: 0,
			isCalling: false,
		}

		this.ws = new WebSocket('wss://' + 'localhost:8443' + '/one2one');
		this.ws.onmessage = (message) => {
			var parsedMessage = JSON.parse(message.data);
			console.info('Received message: ' + message.data);
		
			switch (parsedMessage.id) {
			case 'registerResponse':
				this.resgisterResponse(parsedMessage);
				break;
			case 'callResponse':
				this.callResponse(parsedMessage);
				break;
			case 'incomingCall':
				this.incomingCall(parsedMessage);
				break;
			case 'startCommunication':
				this.startCommunication(parsedMessage);
				break;
			case 'stopCommunication':
				console.info("Communication ended by remote peer");
				this.stop(true);
				break;
			case 'iceCandidate':
				webRtcPeer.addIceCandidate(parsedMessage.candidate)
				break;
			default:
				console.error('Unrecognized message', parsedMessage);
			}
		}
	}

	componentWillMount(){
		this.register();
	}

	componentDidMount(){
		//this.setRegisterState(NOT_REGISTERED);

	}

	componentWillUnmount(){
		this.ws.close();
	}

	setRegisterState = (nextState) => {
		switch (nextState) {
		case REGISTERED:
			this.setCallState(NO_CALL);
			break;
	
		default:
			return;
		}
		registerState = nextState;
	}

	setCallState = (nextState) => {
		callState = nextState;
	}

	resgisterResponse = (message) => {
		if (message.response == 'accepted') {
			this.setRegisterState(REGISTERED);
		} else {
			this.setRegisterState(NOT_REGISTERED);
			var errorMessage = message.message ? message.message
					: 'Unknown reason for register rejection.';
			console.log(errorMessage);
			window.alert('Error registering user. See console for further information.');
		}
	}

	callResponse = (message) => {
		if (message.response != 'accepted') {
			console.info('Call not accepted by peer. Closing call');
			var errorMessage = message.message ? message.message
					: 'Unknown reason for call rejection.';
			console.log(errorMessage);
			this.stop(true);
		} else {
			this.setCallState(IN_CALL);
			webRtcPeer.processAnswer(message.sdpAnswer);
		}
	}

	startCommunication = (message) => {
		this.setCallState(IN_CALL);
		webRtcPeer.processAnswer(message.sdpAnswer);
	}

	incomingCall = (message) => {
		// If bussy just reject without disturbing user
		if (callState != NO_CALL) {
			var response = {
				id : 'incomingCallResponse',
				from : message.from,
				callResponse : 'reject',
				message : 'bussy'
	
			};
			return this.sendMessage(response);
		}
	
		this.setCallState(PROCESSING_CALL);
		if (window.confirm('User ' + message.from
		+ ' is calling you. Do you accept the call?')) {
	
			var options = {
				localVideo : videoInput,
				remoteVideo : videoOutput,
				onicecandidate : this.onIceCandidate
			}
			
			let that = this;
	
			webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options,
					function(error) {
						if (error) {
							console.error(error);
							this.setCallState(NO_CALL);
						}
	
						this.generateOffer(function(error, offerSdp) {
							if (error) {
								console.error(error);
								this.setCallState(NO_CALL);
							}
							var response = {
								id : 'incomingCallResponse',
								from : message.from,
								callResponse : 'accept',
								sdpOffer : offerSdp
							};
							that.sendMessage(response);
						});
					});
	
		} else {
			var response = {
				id : 'incomingCallResponse',
				from : message.from,
				callResponse : 'reject',
				message : 'user declined'
			};
			this.sendMessage(response);
			this.stop(true);
		}
	}

	register = () => {
		let name = window.prompt('Enter your ID');
		if (name == '') {
			window.alert("You must insert your user name");
			return;
		}

		this.setState({from: name});	
		this.setRegisterState(REGISTERING);
	
		this.ws.onopen = () => this.sendMessage({
			id : 'register',
			name : name
		});
	}

	stop = (message) => {
		this.setCallState(NO_CALL);
		if (webRtcPeer) {
			webRtcPeer.dispose();
			webRtcPeer = null;
	
			if (!message) {
				var message = {
					id : 'stop'
				}
				this.sendMessage(message);
			}
		}
	}

	sendMessage = (message) => {
		this.ws.send(JSON.stringify(message));
	}

	onIceCandidate = (candidate) => {
		var message = {
			id : 'onIceCandidate',
			candidate : candidate
		}
		this.sendMessage(message);
	}
	
	call = () => {
        if (document.getElementById('peer').value == '') {
            window.alert("You must specify the peer name");
            return;
        }
    
        this.setCallState(PROCESSING_CALL);
    
    
        var options = {
            localVideo : videoInput,
            remoteVideo : videoOutput,
            onicecandidate : this.onIceCandidate
		}
		let that = this;
    
        webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, function(
                error) {
            if (error) {
                console.error(error);
                this.setCallState(NO_CALL);
            }

	
			const {from, to} = that.state;
    
            this.generateOffer(function(error, offerSdp) {
                if (error) {
                    console.error(error);
                    this.setCallState(NO_CALL);
                }
                var message = {
                    id : 'call',
                    from,
                    to : document.getElementById('peer').value,
                    sdpOffer : offerSdp
                };
                that.sendMessage(message);
            });
        });
    
    }

	onCall = () => {
		this.setState({isCalling: true});
		this.call();
	}
	onStop = () => {
		this.setState({isCalling: false});
		this.stop();
	}
    
    
    render() {
        const {isActive, videoCalling, onVideoCallBegin, onVideoCallStop} = this.props;
        const dialogsClass = cn('chat-card-dialogs', {'chat-card-dialogs-active': isActive});

		const content = this.state.isCalling 
			? <div>   
			<div className="col-md-5">
				<label className="control-label">Peer</label>
				<div className="row">
					<div className="col-md-6">
					<input id="peer" name="peer" className="form-control" type="text"/>
					</div>
					<div className="col-md-6 text-right">
					<a id="call" href="#" className="btn btn-success" onClick={this.onCall}>
						<span className="glyphicon glyphicon-play"></span> Call</a>
					<a id="terminate" href="#" className="btn btn-danger" onClick = {this.onStop}>
						<span className="glyphicon glyphicon-stop"></span> Stop</a>
					</div>
				</div>
				<br/>
				</div>
				
		<div className='chat-card-message__area'>
				
				<video className='chat-card-video__box' 
						autoPlay
						ref={video => {videoOutput = video;}}
						></video>
				<video className='chat-card-video__mini' 
						autoPlay
						ref={video => {videoInput = video;}}
						></video>
				<div className='chat-card-video__panel'>
					<ChatVideoPanel  duration='00:00:34' onStop={this.onStop}/>
				</div>
			</div>
			</div>
			: <Button btnText='lol' onClick={this.onCall}/>;

        return (

            <div className={dialogsClass}>
				{content}
			</div>

        )
    }
}

ChatVideoContent.propTypes = {
    videoCalling: PropTypes.bool,
};

ChatVideoContent.defaultProps = {
    videoCalling: false,
};

export default ChatVideoContent