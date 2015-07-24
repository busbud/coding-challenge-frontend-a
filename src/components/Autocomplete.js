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
    var background_class_name = classNames({
      'Autocomplete-background': true,
      'is-focused':              this.state.isFocused
    });
    var label_class_name = classNames({
      'Autocomplete-label': true,
      'is-top':             this.state.input.trim().length > 0
    });

    return (
      <div className={class_name}>
        <div className={background_class_name}>
          {this.renderIcon()}
        </div>
        <label htmlFor={this.props.id} className={label_class_name}>
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
            onChange:  input => this.setState({input: input}),
            onFocus:   () => this.setState({isFocused: true}),
            onBlur:    () => this.setState({isFocused: false})
          }}
          id={this.props.id} />
      </div>
    );
  }

  renderIcon() {
    if (!this.props.icon) {
      return null;
    }

    return <i className={`fa fa-${this.props.icon}`}></i>;
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

    var escaped_input = _.escapeRegExp(input);
    // Match input value, then capture trailing text
    var front_match_regexp =
      new RegExp('^(?:' + escaped_input + ')(.+$)', 'i');
    var match = front_match_regexp.exec(hint);
    if (!match) {
      return '';
    }

    return input + match[1];
  }
}

Autocomplete.propTypes = propTypes;
Autocomplete.defaultProps = defaultProps;

export default Autocomplete;
