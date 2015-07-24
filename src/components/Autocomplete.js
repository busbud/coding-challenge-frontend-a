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
  onSuggestionSelected: React.PropTypes.func,
  icon:                 React.PropTypes.string
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
      suggestions: null,
      isFocused:   false
    };
  }

  render() {
    var class_name = classNames({
      'Autocomplete':           true,
      'Autocomplete--withIcon': this.props.icon
    });

    return (
      <div
        className={class_name}>
        {this.renderBackground()}
        {this.renderLabel()}
        {this.renderHint()}
        {this.renderInput()}
      </div>
    );
  }

  renderBackground() {
    var class_name = classNames({
      'Autocomplete-background': true,
      'is-focused':              this.state.isFocused
    });

    return (
      <div className={class_name}>
        {this.renderIcon()}
      </div>
    );
  }

  renderIcon() {
    if (!this.props.icon) {
      return null;
    }

    return <i className={`fa fa-${this.props.icon}`}></i>;
  }

  renderLabel() {
    var class_name = classNames({
      'Autocomplete-label': true,
      'is-top':             this.state.input.trim().length > 0
    });

    return (
      <label
        htmlFor={this.props.id}
        className={class_name}>
        {this.props.label}
      </label>
    );
  }

  renderSuggestion(suggestion) {
    return (
      <div className="Autocomplete-suggestion">
        {this.props.suggestionValue(suggestion)}
      </div>
    );
  }

  renderHint() {
    return (
      <div className="Autocomplete-hint">
        {this.hintText()}
      </div>
    );
  }

  // Inspired by https://github.com/twitter/typeahead.js
  hintText() {
    var input = this.state.input;
    var possible_hint = this.possibleHint();

    if (_.isEmpty(input) || _.isEmpty(possible_hint)) {
      return '';
    }

    // Match input value, then capture trailing text
    var escaped_input = _.escapeRegExp(input);
    var front_match_regexp =
      new RegExp('^(?:' + escaped_input + ')(.+$)', 'i');
    var match = front_match_regexp.exec(possible_hint);

    if (!match) {
      return '';
    }

    var remaining_hint_text = match[1];
    return input + remaining_hint_text;
  }

  possibleHint() {
    var hint = _.first(this.state.suggestions);
    return hint && this.props.suggestionValue(hint);
  }

  renderInput() {
    return (
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
          onChange:  input => this.setState({input: input}),
          onFocus:   () => this.setState({isFocused: true}),
          onBlur:    () => this.setState({isFocused: false})
        }}
        id={this.props.id} />
    );
  }
}

Autocomplete.propTypes = propTypes;
Autocomplete.defaultProps = defaultProps;

export default Autocomplete;
