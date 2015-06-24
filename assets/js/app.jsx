var React = require('react');
var Select = require('react-select');
var $ = require('jquery');

var BLocationBox = React.createClass({
  loadBLocationsFromServer: function(inputText, callback) {
    var url = this.props.url + '{' + inputText + '}';
    console.log(url);

    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        console.log(data);
        callback(null, {options: data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('error');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleBLocationSubmit: function(location) {
    var locations = this.state.data;

    locations.push(location);

    this.setState({data: locations}, function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: location,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },

  getInitialState: function() {
    return {data: []};
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
  handleSubmit: function(e) {
    e.preventDefault();

    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();

    if (!text || !author) {
      return;
    }

    this.props.onBLocationSubmit({author: author, text: text});

    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
  },

  render: function() {
    var setPlaceholder = function setPlaceholder(event) {
    }

    return (
      <form className="location-form" onSubmit={this.handleSubmit}>
        <Select
            name="form-field-name"
            placeholder="Leaving From"
            multi={false}
            asyncOptions={this.props.getOptions}
            onFocus={setPlaceholder}
        />
        <Select
            name="form-field-name"
            placeholder=""
            multi={false}
            placeholder="Going To"
            asyncOptions={this.props.getOptions}
            onFocus={setPlaceholder}
        />
        <button type="submit" className="btn-primary">
          <i className="fa fa-search"></i> Search
        </button>
      </form>
    );
  }
});

React.render(
  <BLocationBox url="http://busbud-napi-prod.global.ssl.fastly.net/search?q="/>,
  document.getElementById('content')
);