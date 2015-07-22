import React        from 'react';
import Autocomplete from './Autocomplete';

var propTypes = {
  api: React.PropTypes.object.isRequired
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        {this.renderAutocomplete()}
      </div>
    );
  }

  renderAutocomplete() {
    // TODO: Remove this "fake API" and replace with real one
    var suggestions = [
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
    function getSuggestions(input, cb) {
      setTimeout(() => cb(null, suggestions), 300);
    }

    return (
      <Autocomplete
        id="origin"
        label="Leaving from"
        suggestions={getSuggestions}
        suggestionValue={suggestion => suggestion.full_name}
        onSuggestionSelected={console.log.bind(console, 'selected')} />
    );
  }
}

App.propTypes = propTypes;

export default App;
