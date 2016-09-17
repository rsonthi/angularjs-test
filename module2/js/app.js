(function () {
    'use strict';

    // Set the AngularJS module and controller
    angular
        .module('ShoppingListCheckOff', [])
        .controller('ToBuyShoppingController', ToBuyShoppingController)
        .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController(ShoppingListCheckOffService) {
        var tobuy = this;

        tobuy.items = ShoppingListCheckOffService.getToBuyItems();
        tobuy.moveToBought = function (index) {
            ShoppingListCheckOffService.moveToBought(index);
        }
    }

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var bought = this;

        bought.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var itemstobuy = [
            { quantity: '10 bags', name: 'Cookies' },
            { quantity: '3 packets', name: 'Cookies' },
            { quantity: '2 cans', name: '2% Milk' },
            { quantity: '2 cans', name: '4% Milk' },
            { quantity: '1 bag', name: 'Chips' },
            { quantity: '1 bag', name: 'Carrots' }
        ];

        var itemsbought = [];

        service.getBoughtItems = function () {
            return itemsbought;
        }

        service.getToBuyItems = function () {
            return itemstobuy;
        }

        service.moveToBought = function (index) {
            if (0 <= index && index < itemstobuy.length) {
                var movedItemsList = itemstobuy.splice(index, 1);
                //console.table(movedItemsList);
                itemsbought.push(movedItemsList[0]);
            }
            else {
                throw new Error("Item index(" + index + ") is out of bounds.");
            }
        }
    }


})();