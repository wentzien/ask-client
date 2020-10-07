import React, {Component} from 'react';

class Question extends Component {

    renderIconLike = (question) => {
        if (localStorage.getItem("vote-" + question.id)) return <i className="fa fa-heart"/>;
        return <i className="fa fa-heart-o"/>;
    }

    renderIconDelte = (question) => {
        if (localStorage.getItem("creator-" + question.id) || this.props.creator) return <i
            className="fa fa-trash"/>;
        return "";
    }

    render() {
        const {data, onVote, onDelete, creator} = this.props;
        return (
            <div className="card">
                <div className="card-body">
                    <div>
                        {data.question}
                    </div>
                    <div className="mx-auto">
                        <span onClick={() => onVote(data)} style={{
                            cursor: "pointer",
                            maxWidth: "50px",
                        }}>{this.renderIconLike(data)} {data.votes} </span>
                        <span onClick={() => onDelete(data)} style={{
                            cursor: "pointer",
                            maxWidth: "50px",
                        }}>{this.renderIconDelte(data)}</span>

                    </div>
                </div>
            </div>
        );
    }
}

export default Question;