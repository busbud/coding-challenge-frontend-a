import React       from 'react';
import _           from 'lodash';
import Autosuggest from 'react-autosuggest';
import classNames  from 'classnames';

var propTypes = {
  id:                   React.PropTypes.string.isRequired,
  label:                React.PropTypes.string.isRequired,
  suggestions:          React.PropTypes.func.isRequired,
  suggestionValue:      React.PropTypes.func,
  minInputLength:       React.PropTypes.number,
  onSuggestionSelected: React.PropTypes.func
};

var defaultProps = {
  suggestionValue:      _.identity,
  minInputLength:       2,
  onSuggestionSelected: _.noop
};

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  render() {
    var labelClassName = classNames({
      'Autocomplete-label': true,
      'is-top':             this.state.input.trim().length > 0
    });

    return (
      <div className="Autocomplete">
        <div className="Autocomplete-background"></div>
        <label htmlFor={this.props.id} className={labelClassName}>
          {this.props.label}
        </label>
        <Autosuggest
          suggestions={this.props.suggestions}
          suggestionRenderer={this.renderSuggestion.bind(this)}
          suggestionValue={this.props.suggestionValue}
          showWhen={input => input.trim().length >= this.props.minInputLength}
          onSuggestionSelected={this.props.onSuggestionSelected}
          inputAttributes={{
            className: 'Autocomplete-input',
            id:        this.props.id,
            onChange:  input => this.setState({input: input})
          }}
          id={this.props.id} />
      </div>
    );
  }

  renderSuggestion(suggestion) {
    return (
      <div className="Autocomplete-suggestion">
        {this.props.suggestionValue(suggestion)}
      </div>
    );
  }
}

Autocomplete.propTypes = propTypes;
Autocomplete.defaultProps = defaultProps;

export default Autocomplete;
