import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <div className="ui red pointing above ui label">{error}</div>;
    }
  }

  renderInput = ({ input, label, type, placeholder, meta }) => {
    //console.log(meta);
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          {...input}
          autoComplete="off"
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Enter Title"
          type="text"
          placeholder="Title"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
          type="text"
          placeholder="Description"
        />
        <button className="ui button primary">
          <i className="telegram plane icon" />
          Submit
        </button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title!';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description!';
  }
  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);
