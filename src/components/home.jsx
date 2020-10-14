import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Footer from "./footer";

class Home extends Component {
    state = {
        redirect: ""
    };

    urlApi = process.env.REACT_APP_APIURL;
    sub = process.env.REACT_APP_SUBDIRECTORIES;

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
            this.setState({redirect: this.sub + "/events/" + eventId + "/" + eventKey});
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
            <React.Fragment>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <button style={{
                        width: "700px",
                        marginTop: "50px"
                    }} className="btn btn-primary" onClick={this.handleNewEvent}>Neues Event
                    </button>
                    {redirect ? (<Redirect to={redirect}/>) : ''}
                </div>
                <Footer/>
            </React.Fragment>

        );
    }
}

export default Home;