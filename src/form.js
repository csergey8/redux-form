import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addMessage } from './actions'
import { Field, reduxForm } from 'redux-form';

class Form extends Component {

    //PRISTINE / DIRTY // TOUCHED / ERROR

    renderInputField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`;
        return (
            <div className={className}>
                <label>{field.myLabel}</label>
                <input type="text" {...field.input}/>
                <div className="error">
                    {field.meta.touched ? field.meta.error:''}
                </div>
            </div>
        )
    }

    renderTextareaField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`;
        return(
            <div className={className}>
                <label>{field.myLabel}</label>
                <textarea 
                    {...field.input}
                ></textarea>
                 <div className="error">
                    {field.meta.touched ? field.meta.error:''}
                </div>
            </div>
        )
    }

    onSubmit(values){
        this.props.addMessage(values,()=>{
           this.props.history.push('/')
        })
    }


    render(){
        return(
            <div className="Form">
                <div className="top">
                    <h3>Add a Message</h3>
                    <Link to="/">Back</Link>
                </div>
                <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>

                    <Field
                        myLabel="Enter Title"
                        name="title"
                        component={this.renderInputField}
                    />

                    <Field
                        myLabel="Enter name"
                        name="from"
                        component={this.renderInputField}
                    />

                    <Field
                        myLabel="Enter message"
                        name="message"
                        component={this.renderTextareaField}
                    />


                    <button type="submit">Submit</button>

                </form>
            </div>
        )
    }
}

function validate(values){
    const errors = {};

    if(!values.title){
        errors.title = "The title is empty"
    }

    if(!values.from){
        errors.from = "The name is empty"
    }

    if(!values.message){
        errors.message = "The textarea is empty"
    }

    return errors;
}

function mapStateToProps(state){
    console.log(state)
    return {
        success: state.data
    }
}


export default reduxForm({
    validate,
    form:'PostMessage'
})(connect(mapStateToProps,{addMessage})(Form))