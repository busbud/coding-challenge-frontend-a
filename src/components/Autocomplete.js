import React       from 'react';
import _           from 'lodash';
import Autosuggest from 'react-autosuggest';
import classNames  from 'classnames';

var propTypes = {
  id:                   React.PropTypes.string.isRequired,
  label:                React.PropTypes.string.isRequired,
  getSuggestions:       React.PropTypes.func.isRequired,
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
      input:       '',
      suggestions: null
    };
  }

  render() {
    console.log('render', this.state.input);
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
        <div className="Autocomplete-hint">
          {this.renderHintText()}
        </div>
        <Autosuggest
          suggestions={this.props.getSuggestions}
          suggestionRenderer={this.renderSuggestion.bind(this)}
          suggestionValue={this.props.suggestionValue}
          showWhen={input => input.trim().length >= this.props.minInputLength}
          onSuggestionsChange={suggestions =>
            this.setState({suggestions: suggestions})
          }
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

  // Inspired by https://github.com/twitter/typeahead.js
  renderHintText() {
    var input = this.state.input;
    var hint = _.first(this.state.suggestions);
    hint = hint && this.props.suggestionValue(hint);
    if (_.isEmpty(input) || _.isEmpty(hint)) {
      return '';
    }

    var escapedInput = _.escapeRegExp(input);
    // Match input value, then capture trailing text
    var frontMatchRegEx = new RegExp('^(?:' + escapedInput + ')(.+$)', 'i');
    var match = frontMatchRegEx.exec(hint);
    if (!match) {
      return '';
    }

    return input + match[1];
  }
}

Autocomplete.propTypes = propTypes;
Autocomplete.defaultProps = defaultProps;

export default Autocomplete;
