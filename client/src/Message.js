import "./css/message.css"

function OwnMessage(props) {
    return (
        <div className="message-box own-message">
            <p className="message-text">{props.message}</p>
        </div>
    );
}

function OtherMessage(props) {
    return (
        <div className="message-box other-message">
            <p className="user-text">{props.user}</p>
            <p className="message-text">{props.message}</p>
        </div>
    );
}

export { OwnMessage, OtherMessage };
