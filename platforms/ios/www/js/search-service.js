angular.module('starter.search-service', [])

.factory('SearchService',function($http,$cordovaGeolocation) {

         var products = {};
  
  return {
     //get data
     getDataProduct : function(nameProduct) {
         var keySearch = nameProduct;
         var currentPage = 1;
         var pageSize = 100;
         var APIKey = "szs7vf536k5kaddhu3wtjs9v";
         var url = "http://api.bestbuy.com/v1/products(longDescription=" + keySearch + "*)?show=sku,name,salePrice,image&pageSize=" + pageSize + "&page=" + currentPage +"&apiKey=" + APIKey + "&format=json";
         return $http.get(url);
     },
     //search store
     getDataSearchStore : function(currentLat,currentLong) {
         var APIKey = "szs7vf536k5kaddhu3wtjs9v";
         var url = "http://api.bestbuy.com/v1/stores(area(" + currentLat + "," + currentLong + ",1000))?format=json&apiKey=" + APIKey;
         console.log(url);
         return $http.get(url);
     },
     //search store by city
     getDataSearchStoreByCity : function(city) {
     var APIKey = "szs7vf536k5kaddhu3wtjs9v";
     var url = "http://api.bestbuy.com/v1/stores(city=" + city + ")?format=json&apiKey=" + APIKey;
     console.log(url);
     return $http.get(url);
     }
         
  };
});
