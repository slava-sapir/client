import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    label1 = "Enter title";

    renderError( { error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                  <div className="header">{ error }</div>
                </div>
            )
        }
    }

    // renderInput(formProps) {
    //     return(
    //       <input
    //       onChange={ formProps.input.onChange }
    //       value={ formProps.input.value }
    //       />
    //     );
    // }
    //below same function but shorter { input }= formProps.input

    renderInput = ( { input, label, meta } ) => {
       const className = `field ${meta.error && meta.touched ? 'error' : ''}`
       return (
           <div className={className}>
            <label>{label}</label>
            <input {...input} />
            { this.renderError(meta)}
           </div>
           
       );
    } 

    onSubmit = (formValues) => {
       this.props.onSubmit(formValues);
    }

    render() {
     return (
        <form 
        onSubmit={ this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
        >
            <Field name="title" component={this.renderInput} label= {this.label1}/>
            <Field name="description" component={this.renderInput} label="Enter description"/>
            <button className="ui button primary">Submit</button>
        </form>
    )
 }
}

const validate = formValues => {

    const errors = {};

    if (!formValues.title){
        errors.title = "You must enter title!"
    }
    if (!formValues.description){
        errors.description = "You must enter description!"
    }

    return errors;
}

export default reduxForm({ form: 'streamForm', validate: validate}) (StreamForm);

