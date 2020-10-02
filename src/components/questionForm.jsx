import React, {Component} from 'react';
import Joi from 'joi-browser';

class QuestionForm extends Component {
    state = {
        question: {
            question: ''
        },
        errors: {}
    };

    schema = {
        question: Joi.string().min(3).max(512).required().label("Question")
    };

    joiSchema = Joi.object(this.schema);

    validate = () => {
        const result = this.joiSchema.validate(this.state.question, {abortEarly: false});
        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({name, value}) => {
        const obj = {
            [name]: value
        };
        const schema = {
            [name]: this.schema[name]
        };
        const joiPropertySchema = Joi.object(schema);
        const {error} = joiPropertySchema.validate(obj);
        return error ? error.details[0].message : null;
    };

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        this.callServer()
    };

    callServer = () => {
        const question = this.state.question.question;
        this.props.onSubmit(question);
        this.setState({question: {question: ''}});
    }

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const question = {...this.state.question};
        question[input.name] = input.value;
        this.setState({question, errors});
    };

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            {/*<label htmlFor="frage">Frage:</label>*/}
                            <textarea value={this.state.question.question}
                                      onChange={this.handleChange} type="text"
                                      className="form-control"
                                      name="question"
                                      id="frage"
                                      aria-describedby="frageHilfe"/>
                            {this.state.errors.question &&
                            <div className="alert alert-danger">{this.state.errors.question}</div>}
                        </div>
                        <span className="float left">Stell uns deine Frage</span>
                        <button disabled={this.validate()} type="submit"
                                className="btn btn-primary float-right"
                                style={{width: "150px"}}
                        >Senden</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default QuestionForm;