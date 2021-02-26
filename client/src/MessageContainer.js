import React from 'react';
import "./css/message.css";
import { OwnMessage, OtherMessage } from "./Message";

class MessageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        const messages = this.props.messages;
        const messagesComponents = messages.map((message) =>
            message.user === this.props.curr_user ? 
                <OwnMessage message={message.message} key={message.id}/> 
            :
                <OtherMessage user={message.user} message={message.message} key={message.id}/>
        );
        return (
            <div className="chat-box">
                {messagesComponents}
            </div>
        );
    }
}

export default MessageContainer;