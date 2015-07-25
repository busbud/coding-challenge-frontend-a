import React      from 'react';
import _          from 'lodash';
import SearchForm from './SearchForm';

var propTypes = {
  api: React.PropTypes.object.isRequired
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-head">
          {this.renderTaglines()}
          {this.renderSearchForm()}
          {this.renderMessage()}
        </div>
      </div>
    );
  }

  renderTaglines() {
    var cities_count = 10463;
    var countries_count = 89;

    return (
      <div className="App-taglines">
        <div className="App-tagline App-tagline--large">
          {'Find a bus for your next trip'}
        </div>
        <div className="App-tagline App-tagline--small">
          {[
            'Now serving bus schedules for',
            cities_count,
            'cities in',
            countries_count,
            'countries'
          ].join(' ')}
        </div>
      </div>
    );
  }

  renderSearchForm() {
    return (
      <div className="App-searchForm">
        <SearchForm
          getSuggestions={this.props.api.search.bind(this.props.api)}
          onSubmit={this.handleSubmit.bind(this)} />
      </div>
    );
  }

  handleSubmit(form_data) {
    var missing_values = this.missingValues(form_data);

    if (!_.isEmpty(missing_values)) {
      return this.handleMissingValues(missing_values);
    }

    this.handleSubmitSuccess(form_data);
  }

  missingValues(form_data) {
    var label_map = {
      origin:      '"Leaving from"',
      destination: '"Going to"'
    };

    return _.reduce(form_data, (result, v, k) => {
      if (v) return result;
      result.push(label_map[k]);
      return result;
    }, []);
  }

  handleMissingValues(missing_values) {
    this.setState({
      message: {
        type:     'error',
        children: [
          'Sorry! We didn\'t recognize the location you gave us for ',
           missing_values.join(' and '),
           '. Try again?'
        ].join('')
      }
    });
  }

  handleSubmitSuccess(form_data) {
    var results_link = this.resultsLink(form_data);
    this.setState({
      message: {
        type:     'success',
        children: (
          <span>
            {'Ok, here are your search results: '}
            <a href={results_link} target="_blank">{results_link}</a>
          </span>
        )
      }
    });
  }

  resultsLink(form_data) {
    return [
      'https://www.busbud.com/en/bus-schedules-results',
      _.get(form_data, ['origin', 'city_url']),
      _.get(form_data, ['destination', 'city_url'])
    ].join('/');
  }

  renderMessage() {
    var message = this.state.message;
    if (!message) {
      return <div className="App-message"></div>;
    }

    return (
      <div className={`App-message App-message--${message.type}`}>
        {message.children}
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
