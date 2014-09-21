/* global $, Bloodhound */

// Typeahead > 0.9.3 requires bloodhound for remote requests, a bit annoying
var cityResults = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: '/search/%QUERY',
    rateLimitWait: 150
  }
});

cityResults.initialize();

$('#depart-from,#arrive-at').typeahead({
  minLength: 2,
  hint: true
},
{
  name: 'city',
  displayKey: 'full_name',
  source: cityResults.ttAdapter()
}).on('typeahead:selected typeahead:autocompleted', function(e, data) {
  // Stick data.city_url into a hidden field
  console.log('selected');
});

$('#depart-from,#arrive-at').change(function() {
  console.log('changed');
});

$('label.search-container input').focus(function() {
  $(this).parents('label.search-container').addClass('active');
});

$('label.search-container input').blur(function() {
  $(this).parents('label.search-container').removeClass('active');
});
