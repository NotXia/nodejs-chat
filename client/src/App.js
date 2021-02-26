import React from 'react';
import MessageContainer from "./MessageContainer";
import InputBox from "./InputBox";
import Popup from "./Popup";
import "./css/ui.css";

/*
{
    id: 1,
    user: "User1",
    message: "Message"
},
{
    id: 2,
    user: "User2",
    message: "A very very very very very very very very very very very very very very very long message"
},
{
    id: 3,
    user: "Current user",
    message: "Hello"
}
*/

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleMessageSubmitClick = this.handleMessageSubmitClick.bind(this);
        this.handleUsernameSubmitClick = this.handleUsernameSubmitClick.bind(this);

        this.state = { 
            curr_user: undefined,
            messages: [{
                id: 2,
                user: "User2",
                message: "A very very very very very very very very very very very very very very very long message"
            }]
        };
    }

    componentDidMount() {

    }
        
    componentWillUnmount() {

    }
    
    handleMessageSubmitClick(newMessage) {
        if (newMessage.length > 0) {
            this.setState({
                messages: this.state.messages.concat(
                {
                    id: 3,
                    user: this.state.curr_user,
                    message: newMessage
                }
            )});
        }
    }    

    handleUsernameSubmitClick(username) {
        if (username.length > 0) {
            this.setState({
                curr_user: username
            });
        }
    }    

    render() {
        if(this.state.curr_user === undefined) {
            return (
                <Popup onSubmitClick={this.handleUsernameSubmitClick}/>
            )
        }
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
