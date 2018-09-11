# Food2fork-app

This is a single page recipe application that provides over 1000000 recipes for multiple different foods within categories.The data/recipe are being fetch from food2fork public API. The user will then select the food he/she likes and the recipe view will be shown with much more details. The user will then be able to add the necessary ingredients to shopping cart.The app allows user to like the recipe and stores the like locally in the browser so he/she can later visit and find the liked recipe.

## Screenshots
![app1](https://user-images.githubusercontent.com/17953528/45334106-fbdbad80-b596-11e8-849e-47b4f5756623.png)


![app2](https://user-images.githubusercontent.com/17953528/45334116-06964280-b597-11e8-9c29-cfc6cbe7d0c4.png)


![app3](https://user-images.githubusercontent.com/17953528/45334128-144bc800-b597-11e8-9753-78413da85017.png)

## Built With

* [Babel](https://babeljs.io/) - The Javasript compiler used to execute/convert ES6 code to ES5 for browser support.
* [Webpack](https://webpack.js.org/) - JavaScript module bundler used to bundle javascript files and css files together.
* [Babel-polyfill](https://babeljs.io/docs/en/babel-polyfill) - support browser for ES6 new features that were not present in previous specifications



## Programming paradigm

### Achitecture design
The project follows the MVC(Model-View-Controller ) design implemented through latest ECMA Script 6 modules features.

### Library/module used
Axios -to make AJAX calls to the API by XHR request to fetch data in json,and parse the json data into javascript object.

Factional- used to generate perfect fraction no.

Uniqid- used to generate unique id/value.

### ECMA script 6,7,8 
The application has been programmed following the latest ES6,7,8 featurs and specifications like arrow functions, string template ,modules import/export, async-await,promises etc and thus require dependencies like babel ,webpack and babel polyfill for browser support.

## Getting Started

To set up the project in your local enivironment ,first clone the repository and save it on your local environment/machine.
once you've downloaded the project ,navigate to the src/js directory in the project and edit the config.js file.

To edit the config file you'll need to visit to food2fork site and register for their public API and paste your API key in the config.js
```
https://www.food2fork.com/about/api
```

NOTE -that the free account have a call limit of 50 calls/day , so depending on the no of key you're registering also edit the recipe.js and search.js file in src/js/model directory.

Edit this line by changing the index manually of ${key(2) in both search.jsand recipe.js, set it to 1,2,3,4 or more if you like as per your keys in config.js, this key function in string template gets you the API key from config.js
```
const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key(2)}&rId=${this.rid}`);

```

### Prerequisites

Now to build the project locally you'll need to install npm dependencies and prior to it node and npm if you don not already have it,
download node from here:-
```
https://nodejs.org
```
after sucessfully installing node/npm ,navigate to the project directory and open/run terminal/bash/CLI there and execute:-
```
npm install
```
this would install all the development and built dependencies for your project and necessary npm library for this project,after sucessfull installation you would see a node_module directory in your project directory containing all the necessary module.

Now to run the app on your localhost execute:-
```
npm run start
```
This will run the app on your localhost and build the html and javascript files on the fly.(recommended).

To built the project in distribution directory execute:-
```
npm run dev
```
This would build the project in development mode, the javascript and css file would be bundled by webpack and mutated by babel to ES5 specification code. 


```
npm run build
```
This would do the same thing as the prior step but the bundled file would be built in production mode and thus will have comprably small size and less irrelevant code.






## Acknowledgments

* Udemy
* MDN Web Docs(https://developer.mozilla.org/en-US/)
* stackoverflow
* etc
