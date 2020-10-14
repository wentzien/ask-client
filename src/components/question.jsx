import React, {Component} from 'react';

class Question extends Component {

    renderIconLike = (question) => {
        if (localStorage.getItem("vote-" + question.id)) return <i className="fa fa-heart"/>;
        return <i className="fa fa-heart-o"/>;
    }

    renderIconDelte = (question) => {
        if ((localStorage.getItem("creator-" + question.id) && question.answered === 0) || this.props.creator) return <i
            className="fa fa-trash"/>;
        return "";
    }

    renderIconAnswered = (question) => {
        if (this.props.creator) return <i className="fa fa-check"/>;
        return "";
    }

    render() {
        const {data, onVote, onDelete, onAnswered} = this.props;
        const cardClass = data.answered ? "card text-white bg-success" : "card";

            return (
            <div className={cardClass}>
                <div className="card-body">
                    <div>
                        {data.question}
                    </div>
                    <div style={{textAlign: "center"}}>
                        <span onClick={() => onVote(data)} style={{
                            cursor: "pointer",
                        }}
                        title="Vote" data-placement="top" data-toggle="tooltip"
                        >{this.renderIconLike(data)} {data.votes}</span>
                        <span onClick={() => onDelete(data)} style={{
                            cursor: "pointer",
                            marginLeft: "20px"
                        }}
                        title="Delete" data-placement="top"
                        >{this.renderIconDelte(data)}</span>
                        <span onClick={() => onAnswered(data)} style={{
                            cursor: "pointer",
                            marginLeft: "20px"
                        }}
                        title="Mark as answered" data-placement="top"
                        >{this.renderIconAnswered(data)}</span>

                    </div>
                </div>
            </div>
        );
    }
}

export default Question;