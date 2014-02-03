function urlHandler(arg){return arg;}

$( document ).ready(function() {
	//Matching up the input box with the hint.
   	$('.typeahead.input-lg').siblings('input.tt-hint').addClass('hint-large');

	//Initializing Typeahead and Bloodhound objects.
	var locationList = new Bloodhound({
	  datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.value); },
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  remote: {url: "http://www.busbud.com/en/complete/locations/%QUERY?callback=?",
	   //JSON call to get JSONP object. 
	   ajax: $.ajax({type:'GET',dataType:'jsonp',jsonp:'jsonp',
	       complete:function(data){
		        console.log(data);
			},
		       error:function() {
			    console.log("AJAX call failed!");  
			}
		  })					
	     }
	});
	 
	locationList.initialize();
	 
	$('#departure,#arrivals').typeahead(
	{
	  minLength:2, 
	}, 
	 {
	  displayKey: 'label',
	  source: locationList.ttAdapter(),
	});

});




