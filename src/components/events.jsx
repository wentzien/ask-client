import React, {Component} from 'react';
import axios from "axios";
import io from "socket.io-client";
import QuestionForm from "./questionForm";
import Questions from "./questions";

class Events extends Component {
    state = {
        questions: []
    };

    socket;

    urlApi = 'http://localhost:5000';
    // urlApi = 'https://api.originjump.com';

    async componentDidMount() { 
        
        this.socket = io(this.urlApi);

        const {id} = this.props.match.params;
        this.socket.emit("join", {id}, (data) => {
                data.sort((a, b) => b.votes - a.votes);
                this.setState({questions: data});
        });

        this.socket.on("questions", (questions) => {
                questions.sort((a, b) => b.votes - a.votes);
                this.setState({questions});
        });

        console.log(this.socket);

    }

    componentWillUnmount() {
        this.socket.emit("disconnect");
        this.socket.off();
    }

    newQuestion = async (question) => {
        const {id: eventId} = this.props.match.params;
        const newQuestion = {
            question: question,
            event_id: eventId
        };

        this.socket.emit("newQuestion", newQuestion);

        // const response = await axios.post(this.urlApi + '/questions', newQuestion);
        // if (response.status && response.status === 200) {
        //     const questions = [...this.state.questions];
        //     newQuestion.id = response.data.insertId;
        //     newQuestion.votes = 0;
        //     questions.push(newQuestion);
        //     this.setState({questions});
        // } else console.log('Die Frage konnte nicht verarbeitet werden.');
    }

    voteQuestion = async (questionId) => {
        await axios.put(this.urlApi + '/questions/' + questionId);
    }

    handleVote = (question) => {
        if (localStorage.getItem(question.id)) return;

        const response = this.voteQuestion(question.id);
        if (response.status && !response.status !== 200) return

        let questions = [...this.state.questions];
        const index = questions.indexOf(question);
        question = {...questions[index]};
        question.votes++;
        questions[index] = question;
        this.setState({questions});
        localStorage.setItem(question.id, true);
    }

    render() {
        const {questions} = this.state;
        return (
            <div className="App">
                <QuestionForm onSubmit={this.newQuestion}/>
                <Questions questions={questions} onVote={this.handleVote}/>
            </div>
        );
    }
}

export default Events;