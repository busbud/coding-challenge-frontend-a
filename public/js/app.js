/* global $, Bloodhound, document, window */

function initAutocomplete() {
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


  // Init typeahead
  var autocompleteInputs = $('#depart-from,#arrive-at');
  autocompleteInputs.typeahead({
    minLength: 2,
    hint: true
  },
  {
    name: 'city',
    displayKey: 'full_name',
    source: cityResults.ttAdapter()
  });

  // Listen for selected events
  autocompleteInputs.on('typeahead:selected typeahead:autocompleted', function(e, data) {
    // Stick data.city_url into our data
    $(this).data('cityUrl', data.city_url);
  });

  // Listen for manual (non-Typeahead) changes
  autocompleteInputs.change(function() {
    // Wipe the hcityUrl data
    $(this).removeData('cityUrl');
  });
}

function busSearch(e) {
  // Non-JS browsers will have their form submitted. For every other browser,
  // we'll take control
  e.preventDefault();

  // Are the data-city-url values populated?
  var inputs = $('#depart-from,#arrive-at');
  var errors = false;
  var urls = [];

  $.each(inputs, function() {
    if(typeof $(this).data('cityUrl') === 'undefined' ||
      $(this).data('cityUrl').length === 0)
    {
      // Display an alert and return
      var errorMsg = $(this).parent().siblings('.error-message');
      errorMsg.show(300);

      // Close it after a couple seconds
      setTimeout(function() { errorMsg.hide(300); }, 2500);

      errors = true;
    }
    else
    {
      urls.push($(this).data('cityUrl'));
    }
  });

  if(errors)
  {
    return;
  }

  // Search busbud!
  window.location = 'http://www.busbud.com/en/bus-schedules/' + urls[0] +'/' + urls[1];
}

function translateElement(language, element) {
  // Find out what we're translating (default to inner text)
  var transKey = $(element).data('translate');
  var transAttr = 'text';

  if(transKey.indexOf(':') !== -1)
  {
    var split = transKey.split(':');
    transAttr =  split[0];
    transKey = split[1];
  }

  // Text needs to be inserted into the element
  if(transAttr === 'text')
  {
    $(element).text(language[transKey]);
  }
  else
  {
    // Everything else can be updated via attribute mods
    $(element).attr(transAttr, language[transKey]);
  }
}

function setLocale(lang, elements) {
  // Clean out any hashes in lang and hit our API
  var cleanLang = lang.replace('#', '').trim() || 'en';
  $.ajax('/lang/' + cleanLang)
    .done(function(res) {
      // Iterate over the elements and translate them
      $.each(elements, function(i, e) {
        translateElement(res, e);
      });

      // Activate the current language
      $('.languages a').removeClass('active');
      $('.languages #' + cleanLang ).addClass('active');
    });
}

$(document).ready(function() {
  // Initialize the autocompletion functionality
  initAutocomplete();

  // Attach to the search form
  $('#busbud-search').submit(busSearch);

  // Set page locale on load and any time they click on a new language
  var localizedElements = $('*[data-translate]');
  setLocale(window.location.hash, localizedElements);
  $('.languages a').click(function() {
    setLocale($(this)[0].hash, localizedElements);
  });

  // Activate and deactivate input containers on focus/blur
  $('label.search-container input').focus(function() {
    $(this).parents('label.search-container').addClass('active');
  });

  $('label.search-container input').blur(function() {
    $(this).parents('label.search-container').removeClass('active');
  });
});
