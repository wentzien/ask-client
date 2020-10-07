import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Home extends Component {
    state = {
        redirect: ""
    };

    // urlApi = "http://localhost:5000";

    urlApi = "https://api.originjump.com";

    handleNewEvent = async () => {
        const eventId = this.generateId();
        const eventKey = this.generateId();

        const event = {
            id: eventId,
            creator_key: eventKey
        };

        const result = await axios.post(this.urlApi + "/events", event);
        console.log(result);
        if (result.data.serverStatus === 2) {
            this.setState({redirect: "/events/" + eventId + "/" + eventKey});
        } else console.log("Event konnte nicht erstellt werden.");
    };

    generateId = () => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 24; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    render() {
        const {redirect} = this.state;
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <button style={{
                    width: "700px",
                    marginTop: "50px"
                }} className="btn btn-primary" onClick={this.handleNewEvent}>Neues Event
                </button>
                {redirect ? (<Redirect to={redirect}/>) : ''}
            </div>
        );
    }
}

export default Home;