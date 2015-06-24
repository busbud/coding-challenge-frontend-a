var React = require('react');
var Select = require('react-select');
var $ = require('jquery');
var _ = require('lodash');

function mapLocationsToSelectOptions(locations) {
  return _.map(locations, function (location) {
      return {
        value: location.city_id,
        label: location.full_name,
      }
  });
}

var BLocationBox = React.createClass({
  loadBLocationsFromServer: function(inputText, callback) {
    var url = this.props.url + '{' + inputText + '}';

    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        callback(null, {options: mapLocationsToSelectOptions(data)})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleBLocationSubmit: function(location) {
    console.log('Location submitted.');
  },

  render: function() {
    return (
      <div className="locationBox">
        <BLocationForm onBLocationSubmit={this.handleBLocationSubmit} getOptions={this.loadBLocationsFromServer} />
      </div>
    );
  }
});

var BLocationForm = React.createClass({
  getInitialState: function() {
    return {
      locationFrom: null,
      locationTo: null,
      errors: false,
    }
  },

  onFromChange: function(value) {
    this.setState({ locationFrom: value, errors: false });
  },

  onToChange: function(value) {
    this.setState({ locationTo: value, errors: false });
  },

  handleSubmit: function(e) {
    e.preventDefault();

    if (!this.state.locationFrom || !this.state.locationTo) {
      this.setState({ errors: true });
      return;
    }

    this.props.onBLocationSubmit(this.state);
  },

  render: function() {
    return (
      <div className="form-container">
        <form className={this.state.errors ? 'form errors' : 'form'} onSubmit={this.handleSubmit}>
          <div className="select-group">
            <i className="fa fa-location-arrow select-group-addon"></i>
            <Select name="location-from"
              placeholder="Leaving from"
              value={this.state.locationFrom}
              multi={false}
              asyncOptions={this.props.getOptions}
              onChange={this.onFromChange}>
            </Select>
          </div>
          <div className="select-group">
            <i className="fa fa-map-marker select-group-addon"></i>
            <Select name="location-to"
              placeholder=""
              value={this.state.locationTo}
              multi={false}
              placeholder="Going to"
              asyncOptions={this.props.getOptions}
              onChange={this.onToChange}/>
          </div>
          <button type="submit" className="btn-primary">
            <i className="fa fa-search"></i> Search
          </button>
        </form>
        <div className={this.state.errors ? 'form-errors' : 'displayNone'}>
          <span>Please enter a departure and arrival location!</span>
        </div>
      </div>
    );
  }
});

React.render(
  <BLocationBox url="http://busbud-napi-prod.global.ssl.fastly.net/search?q="/>,
  document.getElementById('content')
);