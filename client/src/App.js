import React from 'react';
import MessageContainer from "./MessageContainer";
import InputBox from "./InputBox";
import Popup from "./Popup";
import "./css/ui.css";
import io from 'socket.io-client'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleMessageSubmitClick = this.handleMessageSubmitClick.bind(this);
        this.handleUsernameSubmitClick = this.handleUsernameSubmitClick.bind(this);

        this.state = { 
            curr_user: undefined,
            messages: [],
            socket: io()
        };

        /* Receives new messages from the server */
        this.state.socket.on("new message", (newMessage) => {
            this.setState({
                messages: this.state.messages.concat(newMessage)
            });
        });
    }
    
    handleMessageSubmitClick(newMessage) {
        if (newMessage.length > 0) {
            /* Sends the new message to the server */
            this.state.socket.emit('new message', {
                id: undefined,
                user: this.state.curr_user,
                message: newMessage,
                timestamp: Date.now()
            });
        }
    }    

    handleUsernameSubmitClick(username) {
        if (username.length > 0) {
            /* Sends the chosen username to the server */
            this.state.socket.emit('new user', username);

            /* Waits for the server's reply (it checks if the username is currently taken) */
            this.state.socket.on("new user", (reply) => {
                if (reply == true) {
                    this.setState({
                        curr_user: username
                    });
                }
            });
        }
    }    

    render() {
        /* If the user connects for the first time (in this session), it prompts a modal for the authentication */
        if(this.state.curr_user === undefined) {
            return (
                <Popup onSubmitClick={this.handleUsernameSubmitClick}/>
            )
        }
        /* Otherwise it displays the chat. */
        else {
            return (
                <div className="container">
                    <MessageContainer curr_user={this.state.curr_user} messages={ this.state.messages } />
                    <InputBox onSubmitClick={this.handleMessageSubmitClick}/>
                </div>
            );
        }
    }
}

export default App;
