import React, {Component} from 'react';

class Question extends Component {

    renderIcon = (question) => {
        if (localStorage.getItem(question.id)) return <i className="fa fa-heart" />;
        return <i className="fa fa-heart-o" />;
    }

    render() {
        const {data, onVote} = this.props;
        return (
                <div className="card">
                    <div className="card-body">
                        <div>
                            {data.question}
                        </div>
                        <div className="mx-auto" onClick={() => onVote(data)} style={{cursor: "pointer", maxWidth: "50px", }}>
                            {this.renderIcon(data)} {data.votes}
                        </div>
                    </div>
                </div>
        );
    }
}

export default Question;