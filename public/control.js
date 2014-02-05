//global variable
var validForm = {"arrivals":false,"departure":false};

$(document).ready(function() {
	//Initialize Typeahead.js suggestions
	initializeFormSuggestions();
	
	//AJAX submission and validation
	formValidation();
});

/* Controlling state variables determining whether our input bars are valid */
function setValidEntry(e){
	var validEntry = $(e.currentTarget).attr('id');
	if (validEntry == "departure"){
		validForm["departure"] = true;
	}
	else if (validEntry == "arrivals"){
		validForm["arrivals"] = true;
	}
}

function checkEntries(){
	return (validForm["departure"] && validForm["arrivals"]);
}

function initializeFormSuggestions(){
	//Matching up the input box with the hint.
   	$('.typeahead.input-lg').siblings('input.tt-hint').addClass('hint-large');

	//Initializing Typeahead and Bloodhound objects.
	var locationList = new Bloodhound({
	  datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.value); },
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  remote: {
		url: "http://www.busbud.com/en/complete/locations/%QUERY?callback=?",
 	        //JSON call to get JSONP object. 
	        ajax: $.ajax({type:'GET',dataType:'jsonp',jsonp:'jsonp'})
	  }
	});
	 
	locationList.initialize();
	 
	$('#departure,#arrivals').typeahead({minLength:2}, 
	 {
	  displayKey: 'label',
	  source: locationList.ttAdapter(),
	}).on('typeahead:selected typeahead:autocompleted', function(e,obj){
		setValidEntry(e);
	});
}

function formValidation(){
	//AJAX submission
	function sendPayload(){
	    if (checkEntries()){
			$.ajax({
		        url: '.',
		        type:'POST',
		        data:
		        {
		            departure: $("#departure").val(),
		            arrival: $("#arrivals").val()
		        },
		        success: function(msg)
		        {
		            console.log('Payload sent');
		        }               
		    });
		    validForm = {"arrivals":false,"departure":false};		    
	    }
	    else{
		 	$(".alert").show().delay(4000).fadeOut(1000);   
	    }
	}
	
	//AJAX form submission
	$('.search_button').click(sendPayload);		
}
	

