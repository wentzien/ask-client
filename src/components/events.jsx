import React, {Component} from 'react';
import axios from "axios";
import io from "socket.io-client";
import EventLink from "./eventLink";
import QuestionForm from "./questionForm";
import Questions from "./questions";
import Footer from "./footer";

class Events extends Component {
    state = {
        questions: [],
        creator: false
    };

    socket;

    urlApi = process.env.REACT_APP_API_URL;

    async componentDidMount() {

        const {id} = this.props.match.params;

        if (this.props.match.params.key) {
            const result = await axios.get(this.urlApi + "/events/" + id);
            if (result.data[0]) {
                if (result.data[0].creator_key === this.props.match.params.key) this.setState({creator: true});
            }
        }

        this.socket = io(this.urlApi);

        this.socket.emit("join", {id}, (data) => {
            data.sort((a, b) => b.votes - a.votes);
            this.setState({questions: data});
        });

        this.socket.on("questions", (questions) => {
            questions.sort((a, b) => a.answered - b.answered || b.votes - a.votes);
            this.setState({questions});
        });
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

        // const questions = [...this.state.questions];
        // newQuestion.id = response.data.insertId;
        // newQuestion.event_id = eventId;
        // newQuestion.votes = 0;
        // questions.push(newQuestion);
        // this.setState({questions});

        this.socket.emit("newQuestion", newQuestion);

        this.socket.on("newQuestionResult", (result) => {
            localStorage.setItem("creator-" + result.insertId, true);
        });


    }

    voteQuestion = async (questionId) => {
        await axios.put(this.urlApi + '/questions/' + questionId);
    }

    handleVote = (question) => {
        if (localStorage.getItem("vote-" + question.id)) return;

        let questions = [...this.state.questions];
        const index = questions.indexOf(question);
        question = {...questions[index]};
        question.votes++;
        questions[index] = question;
        this.setState({questions});
        localStorage.setItem("vote-" + question.id, true);

        this.socket.emit("vote", question);
    }

    handleDelete = (question) => {
        this.socket.emit("delete", question);
    }

    handleAnswered = (question) => {
        this.socket.emit("answered", question);
    }

    render() {
        const {questions} = this.state;
        const eventLink = this.state.creator ?
            <EventLink eventId={this.props.match.params.id}/> : "";

        return (
            <div className="App">
                {eventLink}
                <QuestionForm onSubmit={this.newQuestion}/>
                <Questions questions={questions} onVote={this.handleVote}
                           onDelete={this.handleDelete} creator={this.state.creator}
                           onAnswered={this.handleAnswered}/>
                           <Footer />
            </div>
        );
    }
}

export default Events;