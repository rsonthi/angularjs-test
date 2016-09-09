(function () {
    'use strict';

    // Create a function called isEmpty on String prototype
    String.prototype.isEmpty = function () {
        return (!this || this.length === 0 || !this.trim());
    };

    // Set the AngularJS module and controller
    angular
        .module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.message = "";
        $scope.lunchmenu = "";

        $scope.checkLunch = function () {
            // Trim the menu string first
            $scope.message = String.prototype.trim($scope.message);

            // Check if the string is empty
            if ($scope.lunchmenu.isEmpty()) {
                setStyle('red');
                $scope.message = "Please enter data first";
            }
            else {
                setStyle('green');
                // Check the number of menu items
                $scope.message = (numMenuItems()<=3) ? "Enjoy!" : "Too much!";
            }
        };

        // Function to set the text style
        function setStyle(textcolor) {
            $scope.messageStyle = {
                    'color': textcolor,
                    'border-style': 'solid',
                    'padding': '5px'
                };
        };

        // Function to tokenize the lunchmenu and check the number of
        // menu items
        function numMenuItems() {
            var menuitems = $scope.lunchmenu.split(',');
            return menuitems.length;
        };
    };
})();