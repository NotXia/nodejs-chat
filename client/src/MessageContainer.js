import React from 'react';
import "./css/message.css";
import { OwnMessage, OtherMessage, UserJoinMessage, UserQuitMessage } from "./Message";

class MessageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        const messages = this.props.messages;
        const messagesComponents = messages.map((message) => {
            if (message.type == "join") {
                return <UserJoinMessage user={message.user} />
            }
            else if (message.type == "quit") {
                return <UserQuitMessage user={message.user} />
            }
            else {
                if (message.user === this.props.curr_user) {
                    return <OwnMessage message={message.message} key={message.id} /> 
                }
                else {
                    return <OtherMessage user={message.user} message={message.message} key={message.id} />
                }
            }
        });
        return (
            <div className="chat-box">
                {messagesComponents}
            </div>
        );
    }
}

export default MessageContainer;