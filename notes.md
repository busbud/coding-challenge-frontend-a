###quick notes as reminders

* These are only notes, not guidelines or documentation of what's been done or will be done. I might skip some of these or change how they work entirely.  
* I'm keeping the compiled css (and other assets) in the repo instead of putting it into the gitignore'd list of files. It will be easier for whoever to view this without installing gulp since it's not a part of the original README.md's installation instructions, I figured I'd adhere to that for simplicity for the viewers sake.

Functionality
=============

* On proper matches for JS-enabled clients, redirect them to http://www.busbud.com/en/bus-schedules/{locationFrom}/{locationTo} wherere locationFrom/To is city_url from the API  
* On browsers that don't have JS enabled, redirect them to http://www.busbud.com/en/search-not-found?from={locationFrom}&to={locationTo} on submission, where locationFrom/To is the raw user input that couldn't be matched. There's a "closest match" on that page, that should suffice.  
* Use a lightweight 2-way data binding library for JS to bring JSON matched city results to the view.  
* We can't include custom http headers through JSONP requests, so create a proxy route at /search or something
* Use regular html, no view rendering engine. knockouts data-bindings is really ugly to use in jade

Design
======

* Pull the 3 font icons for icon-from, icon-to and icon-search from http://fontello.com/. Avoid using entire font icons (like font-awesome, etc), we only need 3 here.  
* Use Gulp + Sass to keep styles organized and separated.  
* The images from the CDN included by default in the index.jade inline css are missing, just mimic the actual busbud.com website style.  

Credits
=======
* Background image provided by https://twitter.com/jakegivens from http://unsplash.com under a CC0 license