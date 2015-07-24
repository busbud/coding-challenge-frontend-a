import React      from 'react';
import _          from 'lodash';
import SearchForm from './SearchForm';

// TODO: Remove this "fake API" and replace with real one
function getSuggestions(input, cb) {
  var suggestions = [];
  if (_.startsWith(input.toLowerCase(), 'm')) {
    suggestions = [
      {
        'city_id':   '375dd587-9001-acbd-84a4-683dedfb933e',
        'city_url':  'Montreal,Quebec,Canada',
        'full_name': 'Montreal, Quebec, Canada'
      },
      {
        'city_id':   '1bd27fec-73a7-b466-133e-aba87d314682',
        'city_url':  'Monterrey,NuevoLeon,Mexico',
        'full_name': 'Monterrey, Nuevo Leon, Mexico'
      },
      {
        'city_id':   '375dd587-9001-acbd-84a4-683ded682175',
        'city_url':  'Montpellier,LanguedocRoussillon,France',
        'full_name': 'Montpellier, Languedoc-Roussillon, France'
      },
      {
        'city_id':   '1bd27fec-73a7-b466-133e-aba87d12cf5d',
        'city_url':  'Montgomery,Alabama,UnitedStates',
        'full_name': 'Montgomery, Alabama, United States'
      },
      {
        'city_id':   '375dd587-9001-acbd-84a4-683deda05d2e',
        'city_url':  'Montauban,MidiPyrenees,France',
        'full_name': 'Montauban, Midi-Pyrenees, France'
      }
    ];
  } else if (_.startsWith(input.toLowerCase(), 'n')) {
    suggestions = [
      {
        'city_id':   '375dd587-9001-acbd-84a4-683deda84183',
        'city_url':  'NewYork,NewYork,UnitedStates',
        'full_name': 'New York, New York, United States'
      },
      {
        'city_id':   '96a84d87-5f77-43e9-808e-d52342c19302',
        'city_url':  'NewOrleans,Louisiana,UnitedStates',
        'full_name': 'New Orleans, Louisiana, United States'
      },
      {
        'city_id':   '375dd587-9001-acbd-84a4-683dedc7c687',
        'city_url':  'Newark,NewJersey,UnitedStates',
        'full_name': 'Newark, New Jersey, United States'
      },
      {
        'city_id':   '375dd587-9001-acbd-84a4-683ded9cb924',
        'city_url':  'NewcastleuponTyne,England,UnitedKingdom',
        'full_name': 'Newcastle upon Tyne, England, United Kingdom'
      },
      {
        'city_id':   '375dd587-9001-acbd-84a4-683ded82b939',
        'city_url':  'NewportNews,Virginia,UnitedStates',
        'full_name': 'Newport News, Virginia, United States'
      }
    ];
  }
  setTimeout(() => cb(null, suggestions), 300);
}

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
          getSuggestions={getSuggestions}
          onSubmit={this.handleSubmit.bind(this)} />
      </div>
    );
  }

  handleSubmit(form_data) {
    var label_map = {
      origin:      '"Leaving from"',
      destination: '"Going to"'
    };
    var missing_values = _.reduce(form_data, (result, v, k) => {
      if (v) return result;
      result.push(label_map[k]);
      return result;
    }, []);

    if (!_.isEmpty(missing_values)) {
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
      return;
    }

    var results_link = [
      'https://www.busbud.com/en/bus-schedules-results',
      _.get(form_data, ['origin', 'city_url']),
      _.get(form_data, ['destination', 'city_url'])
    ].join('/');

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
