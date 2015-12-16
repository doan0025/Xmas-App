# Xmas-App
Final project - Create an Xmas Shopping iOS app

**Basic Functions**
Social Login (FaceBook)
Public API integration (Best Buy API)
Geo Location 
This project also has bonus points for advanced usage. Following is the breakdown of project.

**Requirement Background**
**Navigation**
Search: I can search products here
My Store: I can use find stores closest to me. Default is geo location
Logs: I can see all the critical errors stored in local storage

**Authentication**
For Authentication we will allow users to login either with custom username/password or Facebook login. 
For customer username/password all usernames are accepted exception "guest" and password must be 5 characters long or longer. 
For Facebook you have already registered your app however you are going to use http://ngcordova.com/docs/plugins/oauth/

**Search**
For product backend we are going to use https://developer.bestbuy.com/documentation
For search we will actually use the following Search HTTP services (https://developer.bestbuy.com/documentation/products-api

App will return the name, sku, sale price and image so the URL will look like the following;
http://api.bestbuy.com/v1/products((search=apple))?show=name,sku,salePrice,image&format=json&apiKey={your_api_key}

**Find Store**
We will be using store search API https://developer.bestbuy.com/documentation/stores-api
By default the app will use geo-location cordova plugin http://ngcordova.com/docs/plugins/geolocation/ to find the closets store. 

However we will allow to search by city.

**Logs**
This will show all the logs from the logs from local storage. Any errors from the app should show up. 
For example; if I type guest/guest for login then the critical errors will be logged in local storage.

**Use Cases**
1. I cannot browse to any pages in the site unless I login (so as soon as I open my app login should be the first page). When I logout it should drop me to the login page
2. For non-social login I can login with any username except guest and it should log that error in the local storage
3. When I login it must change the login option to logout and must display the name. For facebook it is the display name for the other ones it is just the username you typed
4. Search results must handle when no search results found 
5. Find closest store @ bare minimum must give me store name, location, hours and phone numbers 
All deployment must be managed by bower 

**Design Suggestions**
For Login you should you an app controller and use the eventing model covered in class to redirect user to login page 
To separate the code you should use three components folder under js (search, store, log) and under search you should have a searchController, searchService the controller is handling the interaction and the searchService handles the $http interactions) the same goes for the other two components
When installing things from bower you should use --save-dev to ensure that your JSON file is updated 

**Bonus Points (301  Group)**
**Grunt Task automation - 5 Points**
Generate a production package which is skinny in size (so it should be around 2MB as opposed to 8-10MB)

Use this grunt file and it has development (default) task flow and then (release) flow which is building out android and the ios targets. it assumes that you have your js files outside the www and then uses the watch task to hint, concat and uglify the min version in the www/dist/*.min.js folder. 

This way you can still test your site with ionic serve without have to refresh anything regardless of your editor.

Here is the Ionic Grunt File Gruntfile-1.jsView in a new window

**Logging Enhancements - 5 Points**

We covered in one of the $log decorators in one of our classes. Remember the bare minimum is that you must log errors and store them in local storage. However if you can also mention the time stamp, potentially user name, and the stack then you get extra 5 points.
