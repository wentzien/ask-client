import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Home extends Component {
    state = {
        redirect: ""
    };
    handleNewEvent = () => {
        const eventId = this.generateId();
        this.setState({redirect: "/events/" + eventId});
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