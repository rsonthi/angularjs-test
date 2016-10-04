(function () {
    'use strict';
    // Create a function called isEmpty on String prototype
    String.prototype.isEmpty = function () {
        return (!this || this.length === 0 || !this.trim());
    };

    angular.module('NarrowItDownApp',[])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItems);

    function FoundItems() {
        var ddo = {
            templateUrl: "founditems.html",
            scope: {
                items: '=items',
                onRemove: '&'
            }
        };

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var list = this;

        list.searchterm = "";
        list.errormessage = "";

        list.narrowItDown = function(){
            list.found = [];
            if(list.searchterm.isEmpty()){
                list.errormessage = "Nothing found";
                return;
            } 
            var promise = MenuSearchService.getMatchedMenuItems(list.searchterm);
            
            promise.then(function(result){
                // Go through the menu items and filter out
                // those that do not match
                var menuitems = result.data.menu_items;
                for(var i =0; i < menuitems.length; i++){
                    var item = menuitems[i];
                    if(item.description.toLowerCase().includes(list.searchterm.toLowerCase())){
                        list.found.push(item);
                    }
                }
                if(list.found.length===0){
                    list.errormessage = "Nothing found";
                }
                else list.errormessage = "";
            });
        };

        list.removeItem = function(index){
            list.found.splice(index,1);
        };

    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchterm){
            var promise = $http.get(ApiBasePath + "/menu_items.json");
            return promise;
        };

    }
})();