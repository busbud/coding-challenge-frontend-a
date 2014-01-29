# FrontEnd Challenge A

Implement a form with two autocomplete text-boxes (sourced from a location suggestion endpoint) to help users formulate a search for departures and destinations.

## Functional requirements
* Suggestions are sourced from http://www.busbud.com/en/complete/locations/{prefix}?callback={fn}.
* User must be able to type a few (minimum 2) letters and obtain suggestions
* Selection can be made via mouse, touch or keyboard
* Form can only be submitted (for javascript enabled clients) if both text-box values were selected from the suggestion list
    * If user cannot submit form due to such an error, a message must be displayed to help the user correct the problem
* Form should be styled to match [design](http://f.cl.ly/items/0Y3f0L3d2B470h283136/Screen%20Shot%202013-07-05%20at%2010.10.40%20PM.png)
* Feature is cross-browser compatible (Recent Chrome, Safari, Firefox and IE10-7) with [graceful degradation](http://en.wikipedia.org/wiki/Graceful_degradation) as appropriate

## Non-functional requirements
* The code should be hosted on github, and the repo should be shared with Busbud and submitted as a pull request

### Remarks

* Feel free to refactor or restructure as needed
* CSS and JS added to support feature may be included in separate files
* CSS can be written using LESS or similar higher-level language

## Suggestion endpoint details
The endpoint has the following format

http://www.busbud.com/en/complete/locations/{prefix}?callback={fn}
Where

* `prefix` is the suggestion search prefix, like 'New' for a user typing 'New York'
* `fn` is the javascript function injected into the response to support callbacks, if omitted the function `_ac` is injected
* 
Here's a sample

```bash
$ curl http://www.busbud.com/en/complete/locations/Mon?callback=fn 

fn([
    {
        "label": "Montevideo, Montevideo, Uruguay",
        "norm": "Montevideo,Montevideo,Uruguay"
    },
    {
        "label": "Montreal, Quebec, Canada",
        "norm": "Montreal,Quebec,Canada"
    },
    {
        "label": "Monroeville, Pennsylvania, United States",
        "norm": "Monroeville,Pennsylvania,UnitedStates"
    },
    {
        "label": "Monteagudo de las Vicarías, Castille and León, Spain",
        "norm": "MonteagudodelasVicarias,CastilleandLeon,Spain"
    },
    {
        "label": "Mont-Laurier, Quebec, Canada",
        "norm": "MontLaurier,Quebec,Canada"
    }
]);
```
    
## What we're looking for
1. Using high-quality existing libraries or small amounts of custom code
1. Showing your work through your commit history
1. Polish
1. Pride in craftsmanship

# Getting Started

    # install NVM, NodeJS Version Manager
    curl https://raw.github.com/creationix/nvm/master/install.sh | sh

    # clone the repo
    git clone git://github.com/busbud/coding-challenge-frontend-a.git
    cd coding-challenge-frontend-a

    # install the right version of node and the app depdencies
    nvm install $(cat .nvmrc)
    npm install
    npm start
    
    
