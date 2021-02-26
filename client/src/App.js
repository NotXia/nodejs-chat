import React from 'react';
import MessageContainer from "./MessageContainer";
import InputBox from "./InputBox";
import "./css/ui.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);

        this.state = { 
            curr_user: "Current user",
            messages: [
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
            ]
        };
    }

    componentDidMount() {

    }
        
    componentWillUnmount() {

    }
    
    handleSubmitClick(newMessage) {
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

    render() {
        return (
            <div className="container">
                <MessageContainer curr_user={this.state.curr_user} messages={ this.state.messages } />
                <InputBox onSubmitClick={this.handleSubmitClick}/>
            </div>
        );
    }
}

export default App;
