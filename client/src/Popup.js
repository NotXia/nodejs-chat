import React from 'react';
import "./css/popup.css"

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ username: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmitClick(this.state.username);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="username-form popup">
                <div className="popup-input-container">
                    <label>
                        <p className="username-label-text">USERNAME</p>
                        <input type="text" className="username-input" value={this.state.username} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <input type="submit" className="username-submit" value="Join" onClick={this.handleSubmit} />
                </div>
            </form>
        );
    }
}

export default Popup;