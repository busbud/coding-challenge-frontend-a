# Budbud FrontEnd Challenge A

The Busbud front-end programming challenge

This app is a simple landing-page form that allows the use to select a starting location and a destination for their trip. Form completion is assisted by an auto-complete feature similar to the one on Google.com, and is built using the Bloodhound and Typeahead.js libraries, with suggestions being loaded asynchronously from a custom Busbud endpoint. The design and markup was simplified from the original app to match the one of Busbud.com.

## Commit history

Due to an error (I hosted the project in another non-forked repo), you can find the commit history [here](https://github.com/mac-adam-chaieb/busbud-challenge/commits/master)

## Running the app

Clone the repo to a local directory. Once in that directory, run:

    nvm install $(cat .nvmrc)
    npm install
    npm start
    
You can then access the app at:
	
	http://localhost:5000 

## Libraries used:

- [Bloodhound](https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md), an auto-complete engine
- [Typeahead.js](https://github.com/twitter/typeahead.js/), a UI auto-complete that wraps around Bloodhound
- [jQuery](http://jquery.com/) (for dependencies)

