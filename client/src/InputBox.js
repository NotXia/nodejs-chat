import React from 'react';
import "./css/text_input.css"

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmitClick(this.state.message);
        this.setState({
            message: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="message-form">
                <div className="input-container">
                    <input type="text" className="text-form" value={this.state.message} onChange={this.handleChange} />
                    <input type="submit" className="submit-button" value=">" onClick={this.handleSubmit}/>
                </div>
            </form>
        );
    }
}

export default TextInput;