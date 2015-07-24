import React        from 'react';
import _            from 'lodash';
import Autocomplete from './Autocomplete';

var propTypes = {
  getSuggestions: React.PropTypes.func.isRequired,
  onSubmit:       React.PropTypes.func
};

var defaultProps = {
  onSubmit: _.noop
};

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin:      null,
      destination: null
    };
  }

  render() {
    return (
      <form className="SearchForm">
        <div className="SearchForm-topLine"></div>
        {this.renderInput('origin', 'Leaving from', 'location-arrow')}
        {this.renderInput('destination', 'Going to', 'map-marker')}
        {this.renderButton()}
      </form>
    );
  }

  renderInput(key, label, icon) {
    return (
      <div className="SearchForm-input">
        <Autocomplete
          id={key}
          label={label}
          getSuggestions={this.props.getSuggestions}
          suggestionValue={this.suggestionValue}
          onSuggestionSelected={(suggestion, e) => {
            e.preventDefault();
            this.setState({[key]: suggestion});
          }}
          icon={icon} />
      </div>
    );
  }

  suggestionValue(suggestion) {
    return _.get(suggestion, 'full_name');
  }

  renderButton() {
    return (
      <button
        className="SearchForm-button"
        type="submit"
        onClick={e => {
          e.preventDefault();
          this.props.onSubmit(this.state);
        }}>
        <i className="fa fa-search"></i>
        {'Search'}
      </button>
    );
  }
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
