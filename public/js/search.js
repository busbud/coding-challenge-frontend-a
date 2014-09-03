var search = {
    // Const
    SPEED: 200,
    URL: "//busbud-napi-prod.global.ssl.fastly.net/search",
    // $elements    
    $el: null,
    $from: null,
    $to: null,
    // Vars
    last_value: {
        from: null,
        to: null
    },
    
    /**
     * Constructor
     */
    __init: function() {
        search.$el = $("#search-form");
        search.$from = $("#from", search.$el);
        search.$to = $("#to", search.$el);

        search.load_events();
    },
    
    /**
     * Load events
     */
    load_events: function() {
        
        // Proposals
        search.$el.on('keyup', 'input[type=text]', search.input_change);
        search.$el.on('mouseenter', '.proposals li', search.proposal_mouseenter);
        search.$el.on('mousedown', '.proposals li', search.proposal_click);
        search.$el.on('touchstart', '.proposals li', search.proposal_click);
        $(document).keydown(search.keypress); 
        
        // Tooltip events
        search.$el.on('click', 'label', search.label_clicked);        
        search.$el.on('focus', 'input[type=text]', search.input_focused);
        search.$el.on('blur', 'input[type=text]', search.input_blured);
        search.$el.on('mouseenter', 'input[type=text]', search.input_mouseenter);
        search.$el.on('mouseleave', 'input[type=text]', search.input_mouseleave);
        
    },
    
    /*
     * Events 
     *********************************************/
    label_clicked: function(e) {
        if ($(this).parent().hasClass('open') === false) {
            $('input', $(this).parent()).focus();
        }
    },
    input_focused: function(e) {
        $(this).parent().addClass('focused');
        search.open_tooltip($(this).parent());
    },
    input_blured: function(e) {
        var $column = $(this).parent();
        $column.removeClass('focused');
        search.close_tooltip($column);
        search.close_proposals($column);
    },
    input_mouseenter: function(e) {
        var hasValue = $('input', $(this).parent()).val() ? true : false;
        if (hasValue === true) {
            search.open_tooltip($(this).parent());
        }
    },
    input_mouseleave: function(e) {
        var hasValue = $('input', $(this).parent()).val() ? true : false;
        if (hasValue === true
                && $(this).parent().hasClass('focused') === false) {
            search.close_tooltip($(this).parent());
        }
    },
    proposal_mouseenter: function(e){
        var $proposals = $(this).parent();
        var $column = $proposals.parent();
        var proposal_index = $('li', $column).index( $(this) );
        
        search.change_selected_proposal($column, proposal_index);
    },
    proposal_click: function(e){
        var $proposals = $(this).parent();
        var $column = $proposals.parent();
        var proposal_index = $('li', $column).index( $(this) );
        
        search.select_proposal($column, proposal_index);
    },
    input_change: function(e){
        var $column = $(this).parent();
        var value = $('input', $column).val();
        var type = $(this).parent().hasClass("from-colum") ? "from" : "to";
        
        if(value.length >= 2 && value !== search.last_value[type]){
            search.last_value[type] = value;
            search.open_proposals($(this).parent());
            search.search_cities(value, function(cities){
                search.change_proposals($column, cities);
            });
        }
    }, 
    keypress: function(e) {
        if($('.proposals-opened').length >= 1){
            var index, current_index = $('.proposals-opened li').index($('.proposals-opened li.selected'));
        
            if((e.which === 38 || e.which === 40)){

                if(e.which === 38){
                    index = current_index > 0 
                        ? current_index-1 
                        : 0;
                }
                else{
                    var max = $('.proposals-opened li').length;
                    index = current_index < max-1
                        ? current_index+1 
                        : max-1;
                }
                search.change_selected_proposal($('.proposals-opened'), index);
            }
            else if(e.which === 13){
                search.select_proposal($('.proposals-opened'), current_index);
                return false;
            }
        }
    },
    
    /**
     * Search cities
     * @param {string} search User request 
     * @returns {array} List of  city
     */
    search_cities: function(val, next){
        $.ajax(search.URL+"?q="+val).done(function(cities){
            if(typeof next === "function"){
                next(cities);
            }
        }, "json");
    },
    
    /*
     * Tooltips functions
     *********************************************/
    open_tooltip: function($column) {
        if ($column.hasClass('tooltip-opened') === false) {
            $column.addClass('tooltip-opened');
            $('label, .tooltip', $column)
                    .stop()
                    .animate({
                        top: 0
                    }, {
                        duration: search.SPEED,
                        complete: function() {
                        }
                    });
        }
    },
    close_tooltip: function($column) {
        var hasValue = $('input', $column).val() ? true : false;        
        $('label', $column)[hasValue?'addClass':'removeClass']('label-hidden');
        $('label, .tooltip', $column)
                .stop()
                .animate({
                    top: '32px'
                }, {
                    duration: search.SPEED,
                    complete: function() {
                        $column.removeClass('tooltip-opened');
                    }
                });
    },    
    
    /*
     * Proposals functions
     *********************************************/   
    open_proposals: function($column){
        if ($column.hasClass('proposals-opened') === false) {
            $column.addClass('proposals-opened');
        }
    },    
    close_proposals: function($column){
        $column.removeClass('proposals-opened');  
        search.change_proposals($column, {});
    },
    change_proposals: function($column, cities){
        var $proposals = $(".proposals", $column),
            current_value = $("input", $column).val(),
            first = true;
        $proposals.html("");
        
        if(cities.length > 0){
            if(cities.length > 1 
                || cities[0].full_name !== current_value){
            
                for(c in cities){
                    var $city = $("<li>"+cities[c].full_name+"</li>");
                    $proposals.append($city);

                    $city.attr('data-city-id', cities[c].city_id);
                    $city.attr('data-city-url', cities[c].city_url);
                    $city.attr('data-full-name', cities[c].full_name);
                    
                    if(first){
                        $city.addClass('selected');
                        first = false;
                    }
                }
            } 
        }
    },
    change_selected_proposal: function($column, index){
        $(".proposals li", $column).removeClass("selected")
                .eq(index).addClass("selected");
    },
    select_proposal: function($column, index){
        var $proposal = $(".proposals li", $column).eq(index);
        if($proposal.length > 0){
            $('input', $column).val($proposal.attr('data-full-name'));            
        }
        search.close_proposals($column);
    }
    
};
$(document).ready(function() {
    search.__init();
});