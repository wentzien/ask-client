import React, {Component} from 'react';
import Question from "./question";

class Questions extends Component {
    render() {
        const {questions, onVote, onDelete, creator} = this.props;
        return questions.map(q =>
                    <Question
                        key={q.id}
                        data={q}
                        onVote={onVote}
                        onDelete={onDelete}
                        creator={creator}
                    />
        );
    }
}

export default Questions;