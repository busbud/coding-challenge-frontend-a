# FrontEnd Challenge A

Implement a form with two autocomplete text-boxes (sourced from a location suggestion endpoint) to help users formulate a search for departures and destinations.

See requirements here: [REQUIREMENTS.md](REQUIREMENTS.md)


## Environment Requirement & Installation

```
# Install NVV (Node.js Version Manager)
curl https://raw.github.com/creationix/nvm/master/install.sh | sh

# Clone the repo/branch
git clone -b autocomplete git://github.com/emagnier/coding-challenge-frontend-a.git
cd coding-challenge-frontend-a

# Install the right version of Node.js and the App dependencies
nvm install $(cat .nvmrc)
npm install -g grunt-cli
npm install -g bower
npm install
bower install

# Install the Ruby Gem dependencies
sudo gem install bundler
bundle install
- or -
sudo gem install sass
sudo gem install scss-lint
```


## Start the Website & Grunt Tasks


#### Start
```
grunt
```
* Build the sources.
* Start the website: [http://localhost:5000](http://localhost:5000)
* Watch the source files.


#### Build
```
grund build
```
* This only build the sources.


#### Heroku
```
grunt heroku
```
* Build the sources for Heroku.
