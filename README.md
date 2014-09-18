# FrontEnd Challenge A

Implement a form with two autocomplete text-boxes (sourced from a location suggestion endpoint) to help users formulate a search for departures and destinations.

## Functional requirements
* Suggestions are sourced from http://busbud-napi-prod.global.ssl.fastly.net/search?q={prefix}&callback={fn}.
* User must be able to type a few (minimum 2) letters and obtain suggestions
* Selection can be made via mouse, touch or keyboard
* Form can only be submitted (for javascript enabled clients) if both text-box values were selected from the suggestion list
    * If user cannot submit form due to such an error, a message must be displayed to help the user correct the problem
* Form should be styled to match [design](https://www.evernote.com/shard/s7/sh/71b5f7bd-f1d2-4ecc-8c64-e1865f0a060e/61a1aa9e277820fe653cf4bfb1a5ae29/deep/0/Schedules-and-ticket-info-for-worldwide-bus-travel---Busbud.png)
* Feature is cross-browser compatible (Recent Chrome, Safari, Firefox and IE10-7) with [graceful degradation](http://en.wikipedia.org/wiki/Graceful_degradation) as appropriate

## Non-functional requirements
* The code should be hosted on github, and the repo should be shared with Busbud and submitted as a pull request
* Style guide: https://github.com/busbud/js-style-guide

### Bonus
* Localization: support for multiple languages (English, French, ...)
* Responsive design

### Remarks

* Feel free to refactor or restructure as needed
* In order to issue an authorized request against the suggestion endpoint, a long-lived guest token must be obtained from `http://busbud-napi-prod.global.ssl.fastly.net/auth/guest` and passed as the value to the `x-busbud-token` HTTP Header
* CSS and JS added to support feature may be included in separate files
* CSS can be written using SASS, LESS or similar higher-level language

## Suggestion endpoint details
The endpoint has the following format

http://busbud-napi-prod.global.ssl.fastly.net/search?q={prefix}&callback={fn}
Where

* `prefix` is the suggestion search prefix, like 'New' for a user typing 'New York'
* `fn` is the javascript function injected into the response to support JSONP-style callbacks, if omitted the response is returned as JSON
* 
Here's a sample

```bash
$ curl http://busbud-napi-prod.global.ssl.fastly.net/search?q=Mon&callback=fn 

typeof fn === 'function' && fn(([
  {
    "city_id": "375dd5879001acbd84a4683dedfb933e",
    "city_url": "Montreal,Quebec,Canada",
    "full_name": "Montreal, Quebec, Canada"
  },
  {
    "city_id": "375dd5879001acbd84a4683dedaab0e1",
    "city_url": "Montevideo,Montevideo,Uruguay",
    "full_name": "Montevideo, Departamento de Montevideo, Uruguay"
  },
  {
    "city_id": "1bd27fec73a7b466133eaba87d314682",
    "city_url": "Monterrey,NuevoLeon,Mexico",
    "full_name": "Monterrey, Nuevo León, Mexico"
  },
  {
    "city_id": "8359ea19b60b6c5b8200638f641fc77f",
    "city_url": "Monchengladbach,GallicEmpire,Germany",
    "full_name": "Mönchengladbach, Gallic Empire, Germany"
  },
  {
    "city_id": "375dd5879001acbd84a4683ded682175",
    "city_url": "Montpellier,LanguedocRoussillon,France",
    "full_name": "Montpellier, Languedoc-Roussillon, France"
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
    
    
