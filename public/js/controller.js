// Written by: Mohamed Adam Chaieb
// This is the controller script for the index view.
// Made for the Busbud coding challenge.
$(document).ready(function() {
  console.log('Welcome to Busbud!');

  // Bloodhound object. Asynchronously retrieves suggestions from remote API.
  var suggestions = new Bloodhound({
    name: 'cities',
    datumTokenizer: function(d) {
      return Bloodhound.tokenizers.whitespace(d.val);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: 'http://busbud-napi-prod.global.ssl.fastly.net/search?q=',
      replace: function(url, query) {
        return url + query;
      },
      ajax: {
        beforeSend: function(request, settings) {
          request.setRequestHeader('x-busbud-token', 'GUEST_HMHUoigyQzG41szL9wa9KQ');
        }
      }
    }
  });
  suggestions.initialize();

  // Add the typeahead feature to the form input, using the Bloodhound
  // object built above for suggestions.
  $('.main-form input[type="text"]').typeahead({
    hint: true,
    highlight: true,
    minLength: 2
  },
  {
    name: 'destinations',
    displayKey: 'full_name',
    source: suggestions.ttAdapter()
  });
});