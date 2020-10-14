import React, {Component} from 'react';

class EventLink extends Component {
    url = process.env.REACT_APP_URL + process.env.REACT_APP_SUBDIRECTORIES;

    copyToClipboard = () => {
        // const input = this.input;
        // input.select();
        // document.execCommand("copy");

        const input = document.createElement("input");
        document.body.appendChild(input);
        input.value = this.url + "/events/" + this.props.eventId;
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
    };

    render() {
        return (
            <button style={{marginBottom: "20px"}} className="btn btn-primary" onClick={this.copyToClipboard}>Link für
                Teilnehmer kopieren
            </button>
        );
    }
}

export default EventLink;