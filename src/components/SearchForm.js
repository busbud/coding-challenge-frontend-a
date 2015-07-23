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
        <div className="SearchForm-input">
          <Autocomplete
            id="origin"
            label="Leaving from"
            getSuggestions={this.props.getSuggestions}
            suggestionValue={this.suggestionValue}
            onSuggestionSelected={(suggestion, e) => {
              e.preventDefault();
              this.setState({origin: suggestion});
            }} />
        </div>
        <div className="SearchForm-input">
          <Autocomplete
            id="destination"
            label="Going to"
            getSuggestions={this.props.getSuggestions}
            suggestionValue={this.suggestionValue}
            onSuggestionSelected={(suggestion, e) => {
              e.preventDefault();
              this.setState({destination: suggestion});
            }} />
        </div>
        <button
          className="SearchForm-button"
          type="submit"
          onClick={e => {
            e.preventDefault();
            this.props.onSubmit(this.state);
          }}>
          {'Search'}
        </button>
      </form>
    );
  }

  suggestionValue(suggestion) {
    return _.get(suggestion, 'full_name');
  }
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
