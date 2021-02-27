import React from 'react';
import "./css/message.css";
import { OwnMessage, OtherMessage, UserJoinMessage, UserQuitMessage } from "./Message";

class MessageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: "auto" });
    }
    
    componentDidMount() {
        this.needScrollToBottom = true;

        this.chatBox.addEventListener('scroll', () => {
            /* Checks if the scroll bar is at the bottom */
            this.needScrollToBottom = this.chatBox.scrollHeight - Math.ceil(this.chatBox.scrollTop) <= this.chatBox.clientHeight;
        });
    }

    componentDidUpdate() {
        /* Scrolls the chat to the bottom, if needed */
        if (this.needScrollToBottom) {
            this.scrollToBottom();
        }
    }

    render() {
        let messagesComponents = undefined;

        try {
            const messages = this.props.messages;
            messagesComponents = messages.map((message, i) => {
                switch (message.type) {
                    case "join":
                        return <UserJoinMessage user={message.user} key={i} />
    
                    case "quit":
                        return <UserQuitMessage user={message.user} key={i} />
    
                    default:
                        if (message.user === this.props.curr_user) {
                            return <OwnMessage message={message.message} key={i} /> 
                        }
                        else {
                            return <OtherMessage user={message.user} message={message.message} key={i} />
                        }
                }
            });
        }
        catch (error) {
            console.log(error);
        }

        return (
            <div className="chat-box" ref={(el) => { this.chatBox = el; }} >
                {messagesComponents}
                <div style={{clear: "both"}} ref={(el) => { this.messagesEnd = el; }} /> 
            </div>
        );
    }
}

export default MessageContainer;